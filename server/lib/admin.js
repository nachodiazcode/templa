import { Router } from 'express';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import multer from 'multer';
import AdmZip from 'adm-zip';
import { dbEnabled } from './db.js';
import { adminRequired } from './auth.js';
import { invalidateTemplateCache } from './template-assets.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATES_SRC = path.resolve(__dirname, '..', 'templates-src');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'application/zip' || file.originalname.endsWith('.zip')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos .zip'));
    }
  },
});
import {
  getDashboardStats,
  listAllOrders,
  getOrderById,
  updateOrderStatus,
  listAllTemplates,
  insertTemplate,
  updateTemplate,
  deleteTemplate,
  listAllUsers,
  getUserByIdWithOrders,
  setUserRoleDb,
  insertAuditLog,
  listAuditLogs,
} from './db.js';
import {
  localListUsers,
  localSetUserRole,
  localGetUserById,
} from './auth.js';
import { getCatalog } from './catalog.js';
import {
  listCoupons,
  getCoupon,
  saveCoupon,
  deleteCoupon,
  listAllReviews,
  deleteReview,
  reviewSummary,
} from './vault.js';

const router = Router();
router.use(adminRequired);

/* ---------- helpers ---------- */
function readLocalOrders(ordersRef) {
  return ordersRef;
}

/* Se pasa orders como referencia para el modo local */
let ordersRef = null;
export function setOrdersRef(ref) {
  ordersRef = ref;
}

/* ---------- DASHBOARD ---------- */
router.get('/dashboard', async (_req, res) => {
  try {
    if (dbEnabled) {
      const stats = await getDashboardStats();
      return res.json(stats);
    }

    const all = ordersRef ? Object.values(ordersRef) : [];
    const now = new Date();
    const today = now.toISOString().slice(0, 10);
    const thisMonth = now.toISOString().slice(0, 7);

    const totalRevenue = all
      .filter((o) => o.status === 'paid')
      .reduce((s, o) => s + o.amount, 0);

    const ordersToday = all.filter((o) => o.createdAt?.startsWith(today)).length;

    const byStatus = { pending: 0, paid: 0, rejected: 0, canceled: 0 };
    for (const o of all) {
      if (byStatus[o.status] !== undefined) byStatus[o.status]++;
    }

    const revenueByMonth = {};
    for (const o of all) {
      if (o.status === 'paid' && o.paidAt) {
        const m = o.paidAt.slice(0, 7);
        revenueByMonth[m] = (revenueByMonth[m] || 0) + o.amount;
      }
    }

    res.json({
      totalRevenue,
      totalOrders: all.length,
      ordersToday,
      byStatus,
      totalTemplates: getCatalog().length,
      totalUsers: localListUsers().length,
      recentOrders: all
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        .slice(0, 10)
        .map((o) => ({
          orderId: o.orderId,
          email: o.email,
          amount: o.amount,
          status: o.status,
          items: o.items,
          createdAt: o.createdAt,
        })),
      revenueByMonth,
    });
  } catch (err) {
    console.error('[admin/dashboard]', err.message);
    res.status(500).json({ error: 'Error cargando dashboard' });
  }
});

/* ---------- ORDERS ---------- */
router.get('/orders', async (req, res) => {
  try {
    const { status, search, page = 1, limit = 20 } = req.query;

    if (dbEnabled) {
      const result = await listAllOrders({ status, search, page: +page, limit: +limit });
      return res.json(result);
    }

    let list = ordersRef ? Object.values(ordersRef) : [];
    if (status && status !== 'all') {
      list = list.filter((o) => o.status === status);
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (o) => o.orderId?.toLowerCase().includes(q) || o.email?.toLowerCase().includes(q),
      );
    }
    list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    const total = list.length;
    const pg = Math.max(1, +page);
    const lm = Math.min(100, Math.max(1, +limit));
    const start = (pg - 1) * lm;
    const items = list.slice(start, start + lm).map((o) => ({
      orderId: o.orderId,
      email: o.email,
      amount: o.amount,
      status: o.status,
      items: o.items,
      createdAt: o.createdAt,
      paidAt: o.paidAt ?? null,
    }));

    res.json({ items, total, page: pg, limit: lm, pages: Math.ceil(total / lm) });
  } catch (err) {
    console.error('[admin/orders]', err.message);
    res.status(500).json({ error: 'Error listando órdenes' });
  }
});

router.get('/orders/:id', async (req, res) => {
  try {
    if (dbEnabled) {
      const order = await getOrderById(req.params.id);
      if (!order) return res.status(404).json({ error: 'Orden no encontrada' });
      return res.json(order);
    }

    const order = ordersRef?.[req.params.id];
    if (!order) return res.status(404).json({ error: 'Orden no encontrada' });
    res.json(order);
  } catch (err) {
    console.error('[admin/order]', err.message);
    res.status(500).json({ error: 'Error' });
  }
});

router.patch('/orders/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['paid', 'canceled', 'pending'].includes(status)) {
      return res.status(400).json({ error: 'Status inválido' });
    }

    if (dbEnabled) {
      const order = await getOrderById(req.params.id);
      if (!order) return res.status(404).json({ error: 'Orden no encontrada' });
      const old = order.status;
      await updateOrderStatus(req.params.id, status);
      await insertAuditLog({
        userId: req.user.id,
      adminEmail: req.user.email,
        action: 'status_change',
        entity: 'order',
        entityId: req.params.id,
        detail: { from: old, to: status },
      });
      return res.json({ ok: true, status });
    }

    const order = ordersRef?.[req.params.id];
    if (!order) return res.status(404).json({ error: 'Orden no encontrada' });
    const old = order.status;
    order.status = status;
    if (status === 'paid') {
      order.paidAt = new Date().toISOString();
      order.fulfilled = true;
    }
    await insertAuditLog({
      userId: req.user.id,
      adminEmail: req.user.email,
      action: 'status_change',
      entity: 'order',
      entityId: req.params.id,
      detail: { from: old, to: status },
    });
    res.json({ ok: true, status });
  } catch (err) {
    console.error('[admin/orders/status]', err.message);
    res.status(500).json({ error: 'Error actualizando status' });
  }
});

/* ---------- TEMPLATES ---------- */

/* PUBLISH — sube ZIP + metadata */
router.post('/templates/publish', upload.single('zipFile'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Archivo ZIP requerido' });

    const meta = req.body.metadata ? JSON.parse(req.body.metadata) : {};
    const id = meta.id || crypto.randomUUID().slice(0, 12);
    const name = String(meta.name || req.body.name || '').trim();

    if (!name) return res.status(400).json({ error: 'Nombre requerido' });

    /* Descomprimir ZIP a templates-src/<id>/ */
    const destDir = path.join(TEMPLATES_SRC, id);
    if (fs.existsSync(destDir)) fs.rmSync(destDir, { recursive: true });
    fs.mkdirSync(destDir, { recursive: true });

    const zip = new AdmZip(req.file.buffer);
    zip.extractAllTo(destDir, true);

    /* Nuevos assets en disco: descarta cualquiera cacheado del id. */
    invalidateTemplateCache(id);

    /* Contar páginas (archivos .html) */
    let pages = 0;
    const countHtml = (dir) => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        if (entry.isDirectory()) countHtml(path.join(dir, entry.name));
        else if (entry.name.endsWith('.html')) pages++;
      }
    };
    countHtml(destDir);

    const t = {
      id,
      name,
      price: Number(meta.price) || 0,
      tagline: meta.tagline || '',
      description: meta.description || '',
      category: meta.category || 'landing',
      pages: Number(meta.pages) || pages || 1,
      tech: meta.tech || [],
      colors: meta.colors || ['#7c3aed', '#06b6d4'],
      accent: meta.accent || '#7c3aed',
      features: meta.features || [],
      rating: 0,
      reviews: 0,
      sales: 0,
      isNew: true,
      isFeatured: !!meta.isFeatured,
      releasedAt: new Date().toISOString(),
    };

    if (dbEnabled) await insertTemplate(t);

    await insertAuditLog({
      userId: req.user.id,
      adminEmail: req.user.email,
      action: 'publish',
      entity: 'template',
      entityId: t.id,
      detail: { name: t.name, price: t.price, files: req.file.originalname },
    });

    res.json(t);
  } catch (err) {
    console.error('[admin/templates/publish]', err.message);
    res.status(500).json({ error: 'Error publicando plantilla' });
  }
});

/* List files of a published template */
router.get('/templates/:id/files', (req, res) => {
  const dir = path.join(TEMPLATES_SRC, req.params.id);
  if (!fs.existsSync(dir)) return res.json({ files: [] });

  const files = [];
  const walk = (base, relative) => {
    for (const entry of fs.readdirSync(base, { withFileTypes: true })) {
      const rel = path.join(relative, entry.name);
      if (entry.isDirectory()) walk(path.join(base, entry.name), rel);
      else files.push(rel);
    }
  };
  walk(dir, '');
  res.json({ files });
});

router.get('/templates', async (_req, res) => {
  try {
    if (dbEnabled) {
      const templates = await listAllTemplates();
      return res.json(templates);
    }
    res.json(getCatalog());
  } catch (err) {
    console.error('[admin/templates]', err.message);
    res.status(500).json({ error: 'Error listando plantillas' });
  }
});

router.post('/templates', async (req, res) => {
  try {
    const t = {
      id: crypto.randomUUID().slice(0, 12),
      name: String(req.body?.name || '').trim(),
      price: Number(req.body?.price) || 0,
      tagline: req.body?.tagline || '',
      description: req.body?.description || '',
      category: req.body?.category || 'landing',
      pages: Number(req.body?.pages) || 1,
      tech: req.body?.tech || [],
      colors: req.body?.colors || ['#7c3aed', '#06b6d4'],
      accent: req.body?.accent || '#7c3aed',
      features: req.body?.features || [],
      rating: 0,
      reviews: 0,
      sales: 0,
      isNew: true,
      isFeatured: false,
      releasedAt: new Date().toISOString(),
    };

    if (!t.name) return res.status(400).json({ error: 'Nombre requerido' });

    if (dbEnabled) {
      await insertTemplate(t);
    }

    await insertAuditLog({
      userId: req.user.id,
      adminEmail: req.user.email,
      action: 'create',
      entity: 'template',
      entityId: t.id,
      detail: { name: t.name, price: t.price },
    });

    res.json(t);
  } catch (err) {
    console.error('[admin/templates/post]', err.message);
    res.status(500).json({ error: 'Error creando plantilla' });
  }
});

router.put('/templates/:id', async (req, res) => {
  try {
    const allowed = ['name', 'price', 'tagline', 'description', 'category', 'pages', 'tech', 'colors', 'accent', 'features', 'isFeatured', 'isNew'];
    const patch = {};
    for (const k of allowed) {
      if (req.body?.[k] !== undefined) patch[k] = req.body[k];
    }

    if (dbEnabled) {
      await updateTemplate(req.params.id, patch);
    }

    await insertAuditLog({
      userId: req.user.id,
      adminEmail: req.user.email,
      action: 'update',
      entity: 'template',
      entityId: req.params.id,
      detail: patch,
    });

    res.json({ ok: true, id: req.params.id, ...patch });
  } catch (err) {
    console.error('[admin/templates/put]', err.message);
    res.status(500).json({ error: 'Error actualizando plantilla' });
  }
});

router.delete('/templates/:id', async (req, res) => {
  try {
    if (dbEnabled) {
      await deleteTemplate(req.params.id);
    }
    invalidateTemplateCache(req.params.id);

    await insertAuditLog({
      userId: req.user.id,
      adminEmail: req.user.email,
      action: 'delete',
      entity: 'template',
      entityId: req.params.id,
    });

    res.json({ ok: true });
  } catch (err) {
    console.error('[admin/templates/delete]', err.message);
    res.status(500).json({ error: 'Error eliminando plantilla' });
  }
});

/* ---------- USERS ---------- */
router.get('/users', async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    if (dbEnabled) {
      const result = await listAllUsers({ page: +page, limit: +limit });
      return res.json(result);
    }

    let list = localListUsers();
    const total = list.length;
    const pg = Math.max(1, +page);
    const lm = Math.min(100, Math.max(1, +limit));
    const start = (pg - 1) * lm;

    res.json({
      items: list.slice(start, start + lm),
      total,
      page: pg,
      limit: lm,
      pages: Math.ceil(total / lm),
    });
  } catch (err) {
    console.error('[admin/users]', err.message);
    res.status(500).json({ error: 'Error listando usuarios' });
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    if (dbEnabled) {
      const user = await getUserByIdWithOrders(req.params.id);
      if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
      return res.json(user);
    }

    const user = localGetUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const userOrders = ordersRef
      ? Object.values(ordersRef).filter(
          (o) => o.userId === user.id || o.email.toLowerCase() === user.email.toLowerCase(),
        )
      : [];

    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role || 'user',
      createdAt: user.createdAt,
      orders: userOrders.map((o) => ({
        orderId: o.orderId,
        amount: o.amount,
        status: o.status,
        items: o.items,
        createdAt: o.createdAt,
      })),
    });
  } catch (err) {
    console.error('[admin/users/:id]', err.message);
    res.status(500).json({ error: 'Error' });
  }
});

router.patch('/users/:id/role', async (req, res) => {
  try {
    const { role } = req.body;
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ error: 'Rol inválido' });
    }

    if (dbEnabled) {
      await setUserRoleDb(req.params.id, role);
    } else {
      localSetUserRole(req.params.id, role);
    }

    await insertAuditLog({
      userId: req.user.id,
      adminEmail: req.user.email,
      action: 'role_change',
      entity: 'user',
      entityId: req.params.id,
      detail: { role },
    });

    res.json({ ok: true, role });
  } catch (err) {
    console.error('[admin/users/role]', err.message);
    res.status(500).json({ error: 'Error cambiando rol' });
  }
});

/* ---------- AUDIT ---------- */
router.get('/audit', async (req, res) => {
  try {
    const { page = 1, limit = 30, entity, action } = req.query;

    if (dbEnabled) {
      // filtro por action si se indica; si no por entity (compat)
      let result;
      if (action) {
        const dbList = await listAuditLogs({ page: +page, limit: +limit });
        result = {
          ...dbList,
          items: dbList.items.filter((l) => l.action === action),
          total: dbList.items.filter((l) => l.action === action).length,
        };
      } else {
        result = await listAuditLogs({ page: +page, limit: +limit, entity });
      }
      return res.json(result);
    }

    const { listAuditLocal } = await import('./vault.js');
    const result = listAuditLocal({ page: +page, limit: +limit, action: action || entity });
    return res.json(result);
  } catch (err) {
    console.error('[admin/audit]', err.message);
    res.status(500).json({ error: 'Error' });
  }
});

/* ---------- reviews (admin) ---------- */
router.get('/reviews', (_req, res) => {
  try {
    res.json({ items: listAllReviews() });
  } catch (err) {
    console.error('[admin/reviews]', err.message);
    res.status(500).json({ error: 'Error' });
  }
});

router.delete('/reviews/:templateId/:reviewId', async (req, res) => {
  try {
    const ok = deleteReview(req.params.templateId, req.params.reviewId);
    if (!ok) return res.status(404).json({ error: 'Reseña no encontrada' });
    res.json({ ok: true, summary: reviewSummary(req.params.templateId) });
  } catch (err) {
    console.error('[admin/reviews]', err.message);
    res.status(500).json({ error: 'Error' });
  }
});

/* ---------- COUPONS (admin) ---------- */
router.get('/coupons', (_req, res) => {
  res.json({ items: listCoupons() });
});

router.post('/coupons', (req, res) => {
  try {
    const code = String(req.body?.code || '').trim().toUpperCase();
    if (!code) return res.status(400).json({ error: 'Código requerido' });
    if (!['percent', 'fixed'].includes(req.body?.type)) {
      return res.status(400).json({ error: 'Tipo debe ser percent o fixed' });
    }
    const value = Number(req.body?.value);
    if (!value || value <= 0) return res.status(400).json({ error: 'Valor inválido' });

    const coupon = {
      code,
      type: req.body.type,
      value,
      minAmount: req.body?.minAmount ? Number(req.body.minAmount) : null,
      maxUses: req.body?.maxUses ? Number(req.body.maxUses) : null,
      used: 0,
      active: req.body?.active !== false,
      expiresAt: req.body?.expiresAt || null,
    };
    saveCoupon(coupon);
    res.status(201).json(coupon);
  } catch (err) {
    console.error('[admin/coupons]', err.message);
    res.status(500).json({ error: 'Error guardando cupón' });
  }
});

router.patch('/coupons/:code', (req, res) => {
  try {
    const existing = getCoupon(req.params.code);
    if (!existing) return res.status(404).json({ error: 'Cupón no encontrado' });

    if (['percent', 'fixed'].includes(req.body?.type)) existing.type = req.body.type;
    if (req.body?.value !== undefined) existing.value = Number(req.body.value) || existing.value;
    if (req.body?.minAmount !== undefined) existing.minAmount = req.body.minAmount ? Number(req.body.minAmount) : null;
    if (req.body?.maxUses !== undefined) existing.maxUses = req.body.maxUses ? Number(req.body.maxUses) : null;
    if (req.body?.active !== undefined) existing.active = !!req.body.active;
    if (req.body?.expiresAt !== undefined) existing.expiresAt = req.body.expiresAt || null;
    saveCoupon(existing);
    res.json(existing);
  } catch (err) {
    console.error('[admin/coupons]', err.message);
    res.status(500).json({ error: 'Error actualizando cupón' });
  }
});

router.delete('/coupons/:code', (req, res) => {
  deleteCoupon(req.params.code);
  res.json({ ok: true });
});

/* ---------- SETTINGS ---------- */
router.get('/settings', (_req, res) => {
  res.json({
    paymentMode: process.env.WEBPAY_COMMERCE_CODE ? 'production' : 'integration',
    mail: process.env.SMTP_HOST ? 'smtp' : 'outbox',
    db: dbEnabled ? 'supabase' : 'local-json',
    jwtTtl: process.env.JWT_TTL || '7d',
  });
});

export default router;
