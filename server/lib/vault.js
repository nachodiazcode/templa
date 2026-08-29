import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { invalidateCatalog } from './catalog.js';
import { SEED_REVIEWS } from './seed-reviews.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data');

/* ============================================================
   Vault: contenido dinámico que hace el marketplace "real"
   - Reviews / valoraciones por plantilla
   - Cupones de descuento
   Persistencia en JSON local (data/) para que funcione SIEMPRE,
   sin depender de credenciales de Supabase.

   Los datos se cargan UNA vez en memoria y se escriben a disco al
   mutar (write-through), evitando leer JSON en cada request.
   ============================================================ */

const REVIEWS_FILE = path.join(DATA_DIR, 'reviews.json');
const COUPONS_FILE = path.join(DATA_DIR, 'coupons.json');
const AUDIT_FILE = path.join(DATA_DIR, 'audit.json');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

function readJson(file, fallback) {
  try {
    if (!fs.existsSync(file)) return fallback;
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return fallback;
  }
}

function writeJson(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

/* Al cambiar reviews, el catálogo enriquecido (rating) queda obsoleto. */
function notifyContentChanged() {
  invalidateCatalog();
}

/* ---------- reviews ---------- */
let reviewsStore = null;

function loadReviews() {
  if (reviewsStore === null) reviewsStore = readJson(REVIEWS_FILE, SEED_REVIEWS);
  return reviewsStore;
}

export function listReviews(templateId) {
  const list = loadReviews()[templateId] || [];
  return [...list].sort((a, b) => b.date.localeCompare(a.date));
}

export function reviewSummary(templateId) {
  const list = listReviews(templateId);
  if (!list.length) return { rating: 0, reviews: 0, distribution: {} };
  const sum = list.reduce((s, r) => s + r.rating, 0);
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  for (const r of list) distribution[r.rating] = (distribution[r.rating] || 0) + 1;
  return {
    rating: Math.round((sum / list.length) * 10) / 10,
    reviews: list.length,
    distribution,
  };
}

export function addReview({ templateId, author, email, rating, title, body }) {
  const store = loadReviews();
  const list = store[templateId] || [];
  const review = {
    id: crypto.randomUUID(),
    templateId,
    author,
    email: email ?? null,
    rating: Math.min(5, Math.max(1, Math.round(rating))),
    title: title || '',
    body: body || '',
    date: new Date().toISOString(),
    verified: Boolean(email),
  };
  list.push(review);
  store[templateId] = list;
  writeJson(REVIEWS_FILE, store);

  notifyContentChanged();
  const summary = reviewSummary(templateId);
  return { review, summary };
}

export function deleteReview(templateId, reviewId) {
  const store = loadReviews();
  const list = store[templateId] || [];
  const idx = list.findIndex((r) => r.id === reviewId);
  if (idx === -1) return false;
  list.splice(idx, 1);
  store[templateId] = list;
  writeJson(REVIEWS_FILE, store);
  notifyContentChanged();
  return true;
}

export function listAllReviews() {
  const store = loadReviews();
  const out = [];
  for (const templateId of Object.keys(store)) {
    for (const r of store[templateId]) out.push(r);
  }
  return out.sort((a, b) => b.date.localeCompare(a.date));
}

/* ---------- cupones ---------- */
let couponsStore = null;

function loadCoupons() {
  if (couponsStore === null) couponsStore = readJson(COUPONS_FILE, []);
  return couponsStore;
}

export function listCoupons() {
  return loadCoupons();
}

export function getCoupon(code) {
  const normalized = String(code || '').trim().toUpperCase();
  return loadCoupons().find((c) => c.code.toUpperCase() === normalized) || null;
}

export function saveCoupon(coupon) {
  const all = loadCoupons();
  const idx = all.findIndex((c) => c.code.toUpperCase() === coupon.code.toUpperCase());
  if (idx === -1) all.push(coupon);
  else all[idx] = coupon;
  writeJson(COUPONS_FILE, all);
}

export function deleteCoupon(code) {
  const all = loadCoupons().filter((c) => c.code.toUpperCase() !== String(code || '').toUpperCase());
  writeJson(COUPONS_FILE, all);
  couponsStore = all;
}

function isCouponActive(c) {
  if (!c.active) return false;
  if (c.maxUses && c.used >= c.maxUses) return false;
  if (c.expiresAt && new Date(c.expiresAt).getTime() < Date.now()) return false;
  return true;
}

/* Devuelve el descuento (en pesos) para un cupón sobre un monto. */
export function computeDiscount(coupon, amount) {
  if (!coupon || !isCouponActive(coupon)) return 0;
  if (coupon.minAmount && amount < coupon.minAmount) return 0;
  if (coupon.type === 'percent') {
    return Math.round((amount * coupon.value) / 100);
  }
  return Math.min(coupon.value, amount);
}

export function applyCouponUsage(code) {
  const c = getCoupon(code);
  if (!c) return;
  c.used = (c.used || 0) + 1;
  saveCoupon(c);
}

/* ---------- audit log (local) ---------- */
let auditStore = null;

function loadAudit() {
  if (auditStore === null) auditStore = readJson(AUDIT_FILE, []);
  return auditStore;
}

export function logAuditLocal({ userId, adminEmail, action, entity, entityId, detail }) {
  const all = loadAudit();
  all.push({
    id: crypto.randomUUID(),
    userId: userId ?? null,
    adminEmail: adminEmail ?? null,
    action,
    entity,
    entityId: entityId ?? null,
    detail: detail ?? null,
    createdAt: new Date().toISOString(),
  });
  writeJson(AUDIT_FILE, all);
}

export function listAuditLocal({ page = 1, limit = 30, action } = {}) {
  let all = loadAudit();
  if (action && action !== 'all') {
    all = all.filter((l) => l.action === action);
  }
  all.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const total = all.length;
  const pg = Math.max(1, +page);
  const lm = Math.min(100, Math.max(1, +limit));
  const start = (pg - 1) * lm;
  return {
    items: all.slice(start, start + lm),
    total,
    page: pg,
    limit: lm,
    pages: Math.ceil(total / lm),
  };
}