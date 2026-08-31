import express from 'express';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { moduleDir } from './lib/resolve.js';
import catalogJson from './catalog.json' with { type: 'json' };
import officeCatalogJson from './office/catalog.json' with { type: 'json' };
import tbkPkg from 'transbank-sdk';
import { buildTemplateBundle } from './lib/bundle.js';
import { sendFulfillmentEmail, mailConfigured } from './lib/mailer.js';
import { getCatalog, getCatalogItem } from './lib/catalog.js';
import { getPreviewHtml } from './lib/template-assets.js';
import { compressGzip } from './lib/compress.js';
import { rateLimit } from './lib/rate-limit.js';
import {
  listReviews,
  reviewSummary,
  addReview,
  deleteReview,
  getCoupon,
  computeDiscount,
  applyCouponUsage,
  loadAllFromSource,
} from './lib/vault.js';
import {
  initDb,
  dbEnabled,
  seedTemplates,
  loadAllOrders,
  persistOrder,
  findUserByEmail,
  insertUser,
  getUserById,
} from './lib/db.js';
import {
  hashPassword,
  checkPassword,
  signToken,
  authRequired,
  optionalUser,
  localFindUserByEmail,
  localInsertUser,
  localGetUserById,
  seedLocalAdmin,
} from './lib/auth.js';
import { seedSupabaseAdmin } from './lib/db.js';
import { getOfficeAssetBuffer, officeAssetKey, storageEnabled } from './lib/storage.js';
import { isServerless } from './lib/env.js';
import adminRouter, { setOrdersRef } from './lib/admin.js';

const {
  WebpayPlus,
  Environment,
  Options,
  IntegrationCommerceCodes,
  IntegrationApiKeys,
} = tbkPkg;

const __dirname = moduleDir();

const PORT = process.env.PORT || 8787;
const WEBPAY_COMMERCE_CODE = process.env.WEBPAY_COMMERCE_CODE || '';
const WEBPAY_API_KEY = process.env.WEBPAY_API_KEY || '';
const APP_URL = (process.env.APP_URL || 'http://localhost:4300').replace(/\/$/, '');
const SERVER_URL = (process.env.SERVER_URL || `http://localhost:${PORT}`).replace(/\/$/, '');
const PUBLIC_URL = (process.env.PUBLIC_URL || SERVER_URL).replace(/\/$/, '');
const DATA_DIR = path.join(__dirname, 'data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');

const ALLOWED_ORIGINS = new Set(
  [APP_URL, SERVER_URL, ...(process.env.ALLOWED_ORIGINS || '').split(',').filter(Boolean)].map((o) => o.replace(/\/$/, '')),
);
const isDevOrigin = (origin) => /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin);

const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20 });
const genericLimiter = rateLimit({ windowMs: 60 * 1000, max: 120 });

const IS_PROD = Boolean(WEBPAY_COMMERCE_CODE && WEBPAY_API_KEY);

function makeTransaction() {
  const options = IS_PROD
    ? new Options(WEBPAY_COMMERCE_CODE, WEBPAY_API_KEY, Environment.Production)
    : new Options(
        IntegrationCommerceCodes.WEBPAY_PLUS,
        IntegrationApiKeys.WEBPAY,
        Environment.Integration,
      );
  return new WebpayPlus.Transaction(options);
}

/* ---------- lectura resilient de archivos del proyecto ---------- */
function readFileFromCandidates(rel) {
  const candidates = [
    path.join(__dirname, rel),
    path.join(__dirname, 'server', rel),
    path.join(process.cwd(), 'server', rel),
    path.join(process.cwd(), rel),
  ];
  for (const p of candidates) {
    try {
      return fs.readFileSync(p);
    } catch {
      /* siguiente candidato */
    }
  }
  return null;
}

const catalog = catalogJson;
const catalogById = new Map(catalog.map((t) => [t.id, t]));
const officeCatalog = Array.isArray(officeCatalogJson) ? officeCatalogJson : officeCatalogJson.items;

export function serverStatus() {
  return {
    ok: true,
    mode: IS_PROD ? 'production' : 'integration',
    returnUrl: `${SERVER_URL}/api/webpay/return`,
    mail: mailConfigured ? 'smtp' : 'outbox',
    db: dbEnabled ? 'supabase' : 'local-json',
    storage: storageEnabled ? 'supabase' : 'disk',
  };
}

/* ---------- órdenes ---------- */
function readLocalOrders() {
  if (isServerless) return {};
  try {
    return JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8'));
  } catch {
    return {};
  }
}

function saveOrdersToDisk(orders) {
  if (isServerless) return;
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
  } catch (err) {
    console.error('[orders] saveOrdersToDisk:', err.message);
  }
}

function publicOrder(o) {
  return {
    orderId: o.orderId,
    status: o.status,
    amount: o.amount,
    currency: o.currency,
    gross: o.gross ?? o.amount,
    discount: o.discount ?? 0,
    couponCode: o.couponCode ?? null,
    items: o.items.map((i) => ({ id: i.id, name: i.name, price: i.price })),
    createdAt: o.createdAt,
    paidAt: o.paidAt || null,
    authorizationCode: o.authorizationCode || null,
  };
}

function downloadLinks(order) {
  return order.items.map((i) => ({
    id: i.id,
    name: i.name,
    url: `${PUBLIC_URL}/api/download/order/${order.orderId}/${i.id}`,
  }));
}

async function fulfill(order, orders) {
  if (order.fulfilled) return;
  order.fulfilled = true;
  await saveAndSync(order, orders);
  const result = await sendFulfillmentEmail(order, downloadLinks(order));
  console.log(`[fulfillment] orden ${order.orderId}: email via ${result.mode}`);
}

async function saveAndSync(order, orders) {
  saveOrdersToDisk(orders);
  await persistOrder(order);
}

/* ---------- app ---------- */
export function buildApi() {
  const orders = {};

  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(compressGzip());

  /* CORS con allowlist */
  app.use((req, res, next) => {
    const origin = req.headers.origin;
    const isWebpay = req.path.startsWith('/api/webpay/');
    if (origin && !isWebpay) {
      if (!ALLOWED_ORIGINS.has(origin) && !isDevOrigin(origin)) {
        return res.status(403).json({ error: 'Origen no permitido' });
      }
      res.header('Access-Control-Allow-Origin', origin);
      res.header('Vary', 'Origin');
    }
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
  });

  app.get('/api/health', (_req, res) => res.json(serverStatus()));

  /* ---------- descargas ---------- */
  app.get('/api/download/order/:orderId/:itemId', async (req, res) => {
    const order = orders[req.params.orderId];

    if (!order) return res.status(404).json({ error: 'Orden no encontrada' });
    if (order.status !== 'paid') {
      return res.status(403).json({ error: 'La orden no está pagada' });
    }

    const item = order.items.find((i) => i.id === req.params.itemId);
    if (!item) return res.status(403).json({ error: 'Esta plantilla no pertenece a la orden' });

    const zip = await buildTemplateBundle(catalogById.get(item.id), {
      buyerEmail: order.email,
      orderId: order.orderId,
    });

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="${item.id}-templa.zip"`);
    res.send(zip);
  });

  app.get('/api/download/free/:itemId', async (req, res) => {
    const item = catalogById.get(req.params.itemId);

    if (!item) return res.status(404).json({ error: 'Plantilla no encontrada' });
    if (item.price !== 0) {
      return res.status(403).json({ error: 'Esta plantilla requiere compra' });
    }

    const zip = await buildTemplateBundle(item, { buyerEmail: '', orderId: 'gratuita' });

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="${item.id}-templa-gratis.zip"`);
    res.send(zip);
  });

  /* ---------- plantillas de office (PowerPoint / Word) ---------- */
  app.get('/api/office', (_req, res) => {
    res.json({ items: officeCatalog });
  });

  app.get('/api/office/:id', (req, res) => {
    const item = officeCatalog.find((o) => o.id === req.params.id);
    if (!item) return res.status(404).json({ error: 'Plantilla office no encontrada' });
    res.json(item);
  });

  app.get('/api/office/:id/download', async (req, res) => {
    const item = officeCatalog.find((o) => o.id === req.params.id);
    if (!item) return res.status(404).json({ error: 'Plantilla office no encontrada' });

    const fileName = `${item.id}.${item.kind}`;
    const contentType =
      item.kind === 'pptx'
        ? 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
        : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

    const buffer =
      (await getOfficeAssetBuffer(officeAssetKey(item.id, item.kind))) ||
      readFileFromCandidates(path.join('office', 'assets', fileName));

    if (!buffer) {
      return res.status(404).json({ error: 'Archivo no disponible' });
    }

    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.send(buffer);
  });

  /* ---------- catálogo público (enriquecido) ---------- */
  app.get('/api/templates', (_req, res) => {
    res.json({ items: getCatalog() });
  });

  app.get('/api/templates/:id', (req, res) => {
    const t = getCatalogItem(req.params.id);
    if (!t) return res.status(404).json({ error: 'Plantilla no encontrada' });
    res.json({ item: t, summary: reviewSummary(t.id) });
  });

  /* ---------- preview real (HTML inline de templates-src o Storage) ---------- */
  app.get('/api/templates/:id/preview-html', async (req, res) => {
    const id = req.params.id;
    const html = await getPreviewHtml(id);

    if (html === null) {
      return res.status(404).json({ error: 'Preview real no disponible para esta plantilla' });
    }
    res.json({ id, html });
  });

  /* ---------- preview directo (HTML servido como página, para screenshots) -- */
  app.get('/api/templates/:id/preview', async (req, res) => {
    const html = await getPreviewHtml(req.params.id);
    if (html === null) {
      return res.status(404).send('Preview no disponible');
    }
    res.type('html').send(html);
  });

  /* ---------- reviews ---------- */
  app.get('/api/templates/:id/reviews', (req, res) => {
    const t = catalogById.get(req.params.id);
    if (!t) return res.status(404).json({ error: 'Plantilla no encontrada' });
    res.json({
      templateId: req.params.id,
      summary: reviewSummary(req.params.id),
      items: listReviews(req.params.id),
    });
  });

  app.post('/api/templates/:id/reviews', authRequired, async (req, res) => {
    try {
      const t = catalogById.get(req.params.id);
      if (!t) return res.status(404).json({ error: 'Plantilla no encontrada' });

      const rating = Number(req.body?.rating);
      const body = String(req.body?.body || '').trim();
      const title = String(req.body?.title || '').trim();

      if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'Calificación entre 1 y 5 requerida' });
      }
      if (!body || body.length < 10) {
        return res.status(400).json({ error: 'Escribe una reseña de al menos 10 caracteres' });
      }

      // Un usuario ya no puede volver a valorar la misma plantilla (edita la suya)
      const existing = listReviews(req.params.id).find(
        (r) => r.email && r.email.toLowerCase() === req.user.email.toLowerCase(),
      );
      if (existing) {
        return res.status(409).json({ error: 'Ya valoraste esta plantilla' });
      }

      const result = await addReview({
        templateId: req.params.id,
        author: req.user.name || 'Usuario Templa',
        email: req.user.email,
        rating,
        title,
        body,
      });

      console.log(`[reviews] ${req.user.email} valoró ${req.params.id} con ${rating}★`);
      res.status(201).json(result);
    } catch (err) {
      console.error('[reviews]', err.message);
      res.status(500).json({ error: 'Error guardando la reseña' });
    }
  });

  /* ---------- cupones ---------- */
  app.post('/api/coupons/validate', genericLimiter, (req, res) => {
    try {
      const code = String(req.body?.code || '').trim();
      const amount = Number(req.body?.amount) || 0;
      if (!code) return res.json({ valid: false, error: 'Ingresa un código' });

      const coupon = getCoupon(code);
      if (!coupon) return res.json({ valid: false, error: 'Cupón no válido' });

      const discount = computeDiscount(coupon, amount);
      if (discount <= 0) {
        return res.json({
          valid: false,
          error: coupon.expiresAt && new Date(coupon.expiresAt) < Date.now()
            ? 'Este cupón expiró'
            : 'Este cupón no aplica a este carrito',
        });
      }

      res.json({
        valid: true,
        code: coupon.code,
        type: coupon.type,
        value: coupon.value,
        discount,
        total: Math.max(0, amount - discount),
      });
    } catch (err) {
      console.error('[coupons/validate]', err.message);
      res.status(500).json({ error: 'Error validando cupón' });
    }
  });

  app.post('/api/checkout', optionalUser, genericLimiter, async (req, res) => {
    try {
      const ids = Array.isArray(req.body?.items) ? req.body.items : [];
      const email = String(req.body?.email || '').trim();

      if (!ids.length) return res.status(400).json({ error: 'Carrito vacío' });
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        return res.status(400).json({ error: 'Email inválido' });
      }

      const items = [];
      for (const id of ids) {
        const t = catalogById.get(id);
        if (!t) return res.status(400).json({ error: `Plantilla desconocida: ${id}` });
        items.push(t);
      }

      const gross = items.reduce((sum, i) => sum + i.price, 0);
      if (gross <= 0) {
        return res.status(400).json({ error: 'No hay productos pagables en el carrito' });
      }

      // Cupón opcional
      const couponCode = String(req.body?.coupon || '').trim().toUpperCase();
      let coupon = null;
      let discount = 0;
      if (couponCode) {
        coupon = getCoupon(couponCode);
        discount = computeDiscount(coupon, gross);
        if (!coupon || discount <= 0) {
          return res.status(400).json({ error: 'Cupón no válido para este carrito' });
        }
      }

      const amount = gross - discount;

      const orderId = `T${Date.now().toString(36)}${crypto.randomBytes(2).toString('hex')}`;
      const buyOrder = orderId.slice(0, 26);
      const sessionId = crypto.randomUUID().replace(/-/g, '').slice(0, 61);

      const created = await makeTransaction().create(
        buyOrder,
        sessionId,
        amount,
        `${SERVER_URL}/api/webpay/return`,
      );

      orders[orderId] = {
        orderId,
        buyOrder,
        email,
        amount,
        currency: 'CLP',
        status: 'pending',
        createdAt: new Date().toISOString(),
        items,
        couponCode: couponCode || null,
        discount: discount || 0,
        gross: gross,
        webpayToken: created.token,
        webpayUrl: created.url,
        fulfilled: false,
        userId: req.user?.id ?? null,
      };
      await saveAndSync(orders[orderId], orders);

      res.json({ url: created.url, token: created.token, orderId });
    } catch (err) {
      console.error('[checkout]', err.message);
      res.status(502).json({ error: err.message || 'Error creando la transacción' });
    }
  });

  /*
   * Transbank hace POST (desde el navegador del pagador) a esta URL al terminar:
   *  - token_ws  -> flujo normal, hay que confirmar con commit()
   *  - TBK_TOKEN -> el usuario canceló o expiró la sesión
   * Responder siempre redirigiendo a la página de resultado de Angular.
   */
  app.post('/api/webpay/return', async (req, res) => {
    const { token_ws: tokenWs, TBK_TOKEN: tbkToken } = req.body;

    if (tbkToken && !tokenWs) {
      const order = Object.values(orders).find((o) => o.webpayToken === tbkToken);
      if (order) {
        order.status = 'canceled';
        await saveAndSync(order, orders);
        return res.redirect(302, `${APP_URL}/checkout/result?token=${order.orderId}`);
      }
      return res.redirect(302, `${APP_URL}/checkout/result?token=unknown`);
    }

    try {
      const commit = await makeTransaction().commit(tokenWs);
      const order = Object.values(orders).find((o) => o.webpayToken === tokenWs);

      if (order) {
        const authorized =
          commit.response_code === 0 &&
          ['AUTHORIZED', 'PARTIALLY_AUTHORIZED'].includes(commit.status);
        order.status = authorized ? 'paid' : 'rejected';
        if (authorized) {
          order.paidAt = new Date().toISOString();
          order.authorizationCode = commit.authorization_code;
          if (order.couponCode) await applyCouponUsage(order.couponCode);
        }
        order.commitDetail = {
          status: commit.status,
          responseCode: commit.response_code,
          paymentTypeCode: commit.payment_type_code,
          installments: commit.installments_number,
        };
        await saveAndSync(order, orders);
        if (authorized) await fulfill(order, orders);
        return res.redirect(302, `${APP_URL}/checkout/result?token=${order.orderId}`);
      }

      return res.redirect(302, `${APP_URL}/checkout/result?token=unknown`);
    } catch (err) {
      console.error('[webpay return]', err.message);
      return res.redirect(302, `${APP_URL}/checkout/result?token=error`);
    }
  });

  app.get('/api/order/:orderId', (req, res) => {
    const order = orders[req.params.orderId];
    if (!order) return res.status(404).json({ error: 'Orden no encontrada' });
    res.json(publicOrder(order));
  });

  /* ---------- auth ---------- */
  function publicUser(u) {
    return { id: u.id, email: u.email, name: u.name ?? null, role: u.role || 'user' };
  }

  app.post('/api/auth/register', authLimiter, async (req, res) => {
    try {
      const name = String(req.body?.name || '').trim();
      const email = String(req.body?.email || '').trim().toLowerCase();
      const password = String(req.body?.password || '');

      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        return res.status(400).json({ error: 'Email inválido' });
      }
      if (password.length < 6) {
        return res.status(400).json({ error: 'La contraseña necesita al menos 6 caracteres' });
      }

      const existing =
        (await findUserByEmail(email)) || localFindUserByEmail(email);
      if (existing) {
        return res.status(409).json({ error: 'Ese email ya está registrado. Inicia sesión.' });
      }

      const passwordHash = await hashPassword(password);
      let user;
      if (dbEnabled) {
        user = await insertUser({ email, name, passwordHash });
      } else {
        user = localInsertUser({ email, name, passwordHash });
      }

      const token = signToken(user);
      console.log(`[auth] registro: ${user.email} (${dbEnabled ? 'supabase' : 'local'})`);
      res.json({ token, user: publicUser(user) });
    } catch (err) {
      console.error('[register]', err.message);
      res.status(500).json({ error: 'No se pudo crear la cuenta' });
    }
  });

  app.post('/api/auth/login', authLimiter, async (req, res) => {
    try {
      const email = String(req.body?.email || '').trim().toLowerCase();
      const password = String(req.body?.password || '');

      const user =
        (await findUserByEmail(email)) || localFindUserByEmail(email);

      if (!user || !(await checkPassword(password, user.password_hash ?? user.passwordHash))) {
        return res.status(401).json({ error: 'Email o contraseña incorrectos' });
      }

      const token = signToken(user);
      console.log(`[auth] login: ${user.email}`);
      res.json({ token, user: publicUser(user) });
    } catch (err) {
      console.error('[login]', err.message);
      res.status(500).json({ error: 'No se pudo iniciar sesión' });
    }
  });

  app.get('/api/auth/me', authRequired, async (req, res) => {
    let user = req.user;
    if (dbEnabled) {
      user = (await getUserById(req.user.id)) || user;
    } else {
      user = localGetUserById(req.user.id) || user;
    }
    res.json({ user: publicUser(user) });
  });

  app.get('/api/my/orders', authRequired, (req, res) => {
    const list = Object.values(orders)
      .filter((o) => o.userId === req.user.id || o.email.toLowerCase() === req.user.email.toLowerCase())
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .map(publicOrder);
    res.json(list);
  });

  app.use('/api/admin', adminRouter);

  setOrdersRef(orders);
  return { app, orders };
}

/* ---------- init (seeds + hidratación de fuentes) ---------- */
export async function initServices(orders) {
  initDb();

  if (dbEnabled) {
    await seedTemplates(catalog);
    const fromDb = await loadAllOrders();
    if (fromDb) Object.assign(orders, fromDb);
    await seedSupabaseAdmin();
  } else {
    if (!isServerless) {
      try {
        if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
        if (!fs.existsSync(ORDERS_FILE)) fs.writeFileSync(ORDERS_FILE, '{}');
      } catch (err) {
        console.error('[init] local data:', err.message);
      }
    }
    await seedLocalAdmin();
  }

  if (!Object.keys(orders).length) {
    Object.assign(orders, readLocalOrders());
  }

  await loadAllFromSource();
}