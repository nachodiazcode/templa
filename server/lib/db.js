import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const dbEnabled = Boolean(SUPABASE_URL && SERVICE_KEY);

let client = null;

export function initDb() {
  if (!dbEnabled) return null;
  client = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false },
  });
  return client;
}

/* ---------- templates ---------- */
export async function seedTemplates(catalog) {
  if (!dbEnabled) return false;

  const rows = catalog.map((t) => ({
    id: t.id,
    name: t.name,
    price: t.price,
    tagline: t.tagline ?? null,
    pages: t.pages ?? 1,
    tech: t.tech ?? [],
    colors: t.colors ?? [],
    features: t.features ?? [],
  }));

  const { error } = await client
    .from('templates')
    .upsert(rows, { onConflict: 'id' });

  if (error) {
    console.error('[db] seed templates:', error.message);
    return false;
  }
  console.log(`[db] ${rows.length} plantillas sincronizadas en public.templates`);
  return true;
}

export async function getTemplatePrice(id) {
  if (!dbEnabled) return null;
  const { data, error } = await client
    .from('templates')
    .select('price')
    .eq('id', id)
    .maybeSingle();

  if (error) return null;
  return data?.price ?? null;
}

/* ---------- users ---------- */
export async function findUserByEmail(email) {
  if (!dbEnabled) return null;
  const { data, error } = await client
    .from('users')
    .select('*')
    .eq('email', email.toLowerCase())
    .maybeSingle();
  if (error) {
    console.error('[db] findUser:', error.message);
    return null;
  }
  return data;
}

export async function insertUser({ email, name, passwordHash }) {
  if (!dbEnabled) return null;
  const { data, error } = await client
    .from('users')
    .insert({ email: email.toLowerCase(), name: name || null, password_hash: passwordHash })
    .select('id, email, name')
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function getUserById(id) {
  if (!dbEnabled) return null;
  const { data } = await client
    .from('users')
    .select('id, email, name')
    .eq('id', id)
    .maybeSingle();
  return data;
}

/* ---------- orders ---------- */
function toRow(order) {
  return {
    order_id: order.orderId,
    buy_order: order.buyOrder ?? null,
    user_id: order.userId ?? null,
    email: order.email,
    amount: order.amount,
    currency: order.currency ?? 'CLP',
    status: order.status,
    items: order.items ?? [],
    webpay_token: order.webpayToken ?? null,
    webpay_url: order.webpayUrl ?? null,
    authorization_code: order.authorizationCode ?? null,
    commit_detail: order.commitDetail ?? null,
    fulfilled: Boolean(order.fulfilled),
    created_at: order.createdAt ?? new Date().toISOString(),
    paid_at: order.paidAt ?? null,
  };
}

function fromRow(row) {
  return {
    orderId: row.order_id,
    buyOrder: row.buy_order ?? undefined,
    userId: row.user_id ?? undefined,
    email: row.email,
    amount: row.amount,
    currency: row.currency,
    status: row.status,
    items: row.items ?? [],
    webpayToken: row.webpay_token ?? undefined,
    webpayUrl: row.webpay_url ?? undefined,
    authorizationCode: row.authorization_code ?? undefined,
    commitDetail: row.commit_detail ?? undefined,
    fulfilled: row.fulfilled,
    createdAt: row.created_at,
    paidAt: row.paid_at ?? undefined,
  };
}

export async function loadAllOrders() {
  if (!dbEnabled) return null;

  const { data, error } = await client.from('orders').select('*');
  if (error) {
    console.error('[db] load orders:', error.message);
    return null;
  }

  const map = {};
  for (const row of data) map[row.order_id] = fromRow(row);
  console.log(`[db] ${data.length} órdenes cargadas desde Supabase`);
  return map;
}

export async function persistOrder(order) {
  if (!dbEnabled) return false;

  const { error } = await client
    .from('orders')
    .upsert(toRow(order), { onConflict: 'order_id' });

  if (error) {
    console.error('[db] persist order:', error.message);
    return false;
  }
  return true;
}

/* ================================================================
   ADMIN — funciones para el panel de administración
   ================================================================ */

/* ---------- dashboard ---------- */
export async function getDashboardStats() {
  const [ordersRes, usersRes, templatesRes] = await Promise.all([
    client.from('orders').select('order_id, status, amount, email, items, created_at, paid_at'),
    client.from('users').select('id', { count: 'exact', head: true }),
    client.from('templates').select('id', { count: 'exact', head: true }),
  ]);

  const all = ordersRes.data || [];
  const now = new Date();
  const today = now.toISOString().slice(0, 10);

  const totalRevenue = all
    .filter((o) => o.status === 'paid')
    .reduce((s, o) => s + (o.amount || 0), 0);

  const ordersToday = all.filter((o) => o.created_at?.startsWith(today)).length;

  const byStatus = { pending: 0, paid: 0, rejected: 0, canceled: 0 };
  for (const o of all) {
    if (byStatus[o.status] !== undefined) byStatus[o.status]++;
  }

  const revenueByMonth = {};
  for (const o of all) {
    if (o.status === 'paid' && o.paid_at) {
      const m = o.paid_at.slice(0, 7);
      revenueByMonth[m] = (revenueByMonth[m] || 0) + o.amount;
    }
  }

  return {
    totalRevenue,
    totalOrders: all.length,
    ordersToday,
    byStatus,
    totalTemplates: templatesRes.count || 0,
    totalUsers: usersRes.count || 0,
    recentOrders: all
      .sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''))
      .slice(0, 10)
      .map((o) => ({
        orderId: o.order_id,
        email: o.email,
        amount: o.amount,
        status: o.status,
        items: o.items ?? [],
        createdAt: o.created_at,
      })),
    revenueByMonth,
  };
}

/* ---------- orders (admin) ---------- */
export async function listAllOrders({ status, search, page = 1, limit = 20 } = {}) {
  let query = client.from('orders').select('*', { count: 'exact' });

  if (status && status !== 'all') {
    query = query.eq('status', status);
  }
  if (search) {
    query = query.or(`order_id.ilike.%${search}%,email.ilike.%${search}%`);
  }

  const from = (Math.max(1, page) - 1) * limit;
  const to = from + limit - 1;

  const { data, count, error } = await query
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    console.error('[db] listAllOrders:', error.message);
    return { items: [], total: 0, page, limit, pages: 0 };
  }

  return {
    items: (data || []).map(fromRow),
    total: count || 0,
    page,
    limit,
    pages: Math.ceil((count || 0) / limit),
  };
}

export async function getOrderById(orderId) {
  const { data } = await client
    .from('orders')
    .select('*')
    .eq('order_id', orderId)
    .maybeSingle();
  return data ? fromRow(data) : null;
}

export async function updateOrderStatus(orderId, status) {
  const patch = { status };
  if (status === 'paid') {
    patch.paid_at = new Date().toISOString();
    patch.fulfilled = true;
  }
  const { error } = await client
    .from('orders')
    .update(patch)
    .eq('order_id', orderId);
  if (error) throw new Error(error.message);
}

/* ---------- templates (admin) ---------- */
export async function listAllTemplates() {
  const { data, error } = await client
    .from('templates')
    .select('*')
    .order('name');
  if (error) {
    console.error('[db] listAllTemplates:', error.message);
    return [];
  }
  return data || [];
}

export async function insertTemplate(t) {
  const { error } = await client.from('templates').insert({
    id: t.id,
    name: t.name,
    price: t.price,
    tagline: t.tagline || null,
    description: t.description || null,
    category: t.category || null,
    pages: t.pages || 1,
    tech: t.tech || [],
    colors: t.colors || [],
    accent: t.accent || null,
    features: t.features || [],
    rating: t.rating || 0,
    reviews: t.reviews || 0,
    sales: t.sales || 0,
    is_new: t.isNew || false,
    is_featured: t.isFeatured || false,
    released_at: t.releasedAt || null,
  });
  if (error) throw new Error(error.message);
}

export async function updateTemplate(id, patch) {
  const dbPatch = {};
  if (patch.name !== undefined) dbPatch.name = patch.name;
  if (patch.price !== undefined) dbPatch.price = patch.price;
  if (patch.tagline !== undefined) dbPatch.tagline = patch.tagline;
  if (patch.description !== undefined) dbPatch.description = patch.description;
  if (patch.category !== undefined) dbPatch.category = patch.category;
  if (patch.pages !== undefined) dbPatch.pages = patch.pages;
  if (patch.tech !== undefined) dbPatch.tech = patch.tech;
  if (patch.colors !== undefined) dbPatch.colors = patch.colors;
  if (patch.accent !== undefined) dbPatch.accent = patch.accent;
  if (patch.features !== undefined) dbPatch.features = patch.features;
  if (patch.isFeatured !== undefined) dbPatch.is_featured = patch.isFeatured;
  if (patch.isNew !== undefined) dbPatch.is_new = patch.isNew;

  const { error } = await client
    .from('templates')
    .update(dbPatch)
    .eq('id', id);
  if (error) throw new Error(error.message);
}

export async function deleteTemplate(id) {
  const { error } = await client
    .from('templates')
    .delete()
    .eq('id', id);
  if (error) throw new Error(error.message);
}

/* ---------- users (admin) ---------- */
export async function listAllUsers({ page = 1, limit = 20 } = {}) {
  const from = (Math.max(1, page) - 1) * limit;
  const to = from + limit - 1;

  const { data, count, error } = await client
    .from('users')
    .select('id, email, name, role, created_at', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    console.error('[db] listAllUsers:', error.message);
    return { items: [], total: 0, page, limit, pages: 0 };
  }

  return {
    items: (data || []).map((u) => ({
      id: u.id,
      email: u.email,
      name: u.name,
      role: u.role || 'user',
      createdAt: u.created_at,
    })),
    total: count || 0,
    page,
    limit,
    pages: Math.ceil((count || 0) / limit),
  };
}

export async function getUserByIdWithOrders(id) {
  const { data: user } = await client
    .from('users')
    .select('id, email, name, role, created_at')
    .eq('id', id)
    .maybeSingle();

  if (!user) return null;

  const { data: orders } = await client
    .from('orders')
    .select('order_id, email, amount, status, items, created_at')
    .eq('user_id', id)
    .order('created_at', { ascending: false });

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role || 'user',
    createdAt: user.created_at,
    orders: (orders || []).map((o) => ({
      orderId: o.order_id,
      email: o.email,
      amount: o.amount,
      status: o.status,
      items: o.items ?? [],
      createdAt: o.created_at,
    })),
  };
}

export async function setUserRoleDb(id, role) {
  const { error } = await client
    .from('users')
    .update({ role })
    .eq('id', id);
  if (error) throw new Error(error.message);
}

/* ---------- audit log ---------- */
export async function insertAuditLog({ userId, adminEmail, action, entity, entityId, detail }) {
  if (!dbEnabled) {
    const { logAuditLocal } = await import('./vault.js');
    logAuditLocal({ userId, adminEmail, action, entity, entityId, detail });
    return;
  }
  const { error } = await client.from('audit_log').insert({
    user_id: userId || null,
    action,
    entity,
    entity_id: entityId || null,
    detail: detail || null,
  });
  if (error) console.error('[db] audit log:', error.message);
}

export async function listAuditLogs({ page = 1, limit = 30, entity } = {}) {
  let query = client
    .from('audit_log')
    .select('*, users:user_id (email, name)', { count: 'exact' });

  if (entity) {
    query = query.eq('entity', entity);
  }

  const from = (Math.max(1, page) - 1) * limit;
  const to = from + limit - 1;

  const { data, count, error } = await query
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    console.error('[db] listAuditLogs:', error.message);
    return { items: [], total: 0, page, limit, pages: 0 };
  }

  return {
    items: (data || []).map((l) => ({
      id: l.id,
      userId: l.user_id,
      adminEmail: l.users?.email ?? null,
      adminName: l.users?.name ?? null,
      action: l.action,
      entity: l.entity,
      entityId: l.entity_id,
      detail: l.detail,
      createdAt: l.created_at,
    })),
    total: count || 0,
    page,
    limit,
    pages: Math.ceil((count || 0) / limit),
  };
}

/* ================================================================
   REVIEWS — tabla public.reviews (Supabase)
   Tacita de "fuente": vault.js mantiene la caché en memoria; estas
   funciones hidratan y persisten writes.
   ================================================================ */
export async function loadReviewsDb() {
  if (!dbEnabled) return {};

  const { data, error } = await client.from('reviews').select('*');
  if (error) {
    console.error('[db] reviews:', error.message);
    return {};
  }

  const map = {};
  for (const r of data || []) {
    const rec = {
      id: String(r.id),
      templateId: r.template_id,
      author: r.author,
      email: r.email,
      rating: r.rating,
      title: r.title,
      body: r.body,
      date: r.date,
      verified: r.verified,
    };
    (map[rec.templateId] ||= []).push(rec);
  }
  for (const k of Object.keys(map)) {
    map[k].sort((a, b) => b.date.localeCompare(a.date));
  }
  return map;
}

export async function addReviewDb(review) {
  if (!dbEnabled) return;
  const { error } = await client.from('reviews').insert({
    id: review.id,
    template_id: review.templateId,
    author: review.author,
    email: review.email ?? null,
    rating: review.rating,
    title: review.title ?? '',
    body: review.body ?? '',
    date: review.date,
    verified: Boolean(review.verified),
  });
  if (error) throw new Error(error.message);
}

export async function deleteReviewDb(templateId, reviewId) {
  if (!dbEnabled) return;
  const { error } = await client.from('reviews').delete().eq('id', reviewId);
  if (error) throw new Error(error.message);
}

/* ================================================================
   CUPONES — tabla public.coupons
   ================================================================ */
export async function loadCouponsDb() {
  if (!dbEnabled) return [];

  const { data, error } = await client.from('coupons').select('*');
  if (error) {
    console.error('[db] coupons:', error.message);
    return [];
  }
  return (data || []).map((r) => ({
    code: r.code,
    type: r.type,
    value: r.value,
    minAmount: r.min_amount,
    maxUses: r.max_uses,
    used: r.used,
    active: r.active,
    expiresAt: r.expires_at,
    createdAt: r.created_at,
  }));
}

export async function saveCouponDb(coupon) {
  if (!dbEnabled) return;
  const { error } = await client.from('coupons').upsert(
    {
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      min_amount: coupon.minAmount ?? null,
      max_uses: coupon.maxUses ?? null,
      used: coupon.used ?? 0,
      active: coupon.active ?? true,
      expires_at: coupon.expiresAt ?? null,
    },
    { onConflict: 'code' },
  );
  if (error) throw new Error(error.message);
}

export async function deleteCouponDb(code) {
  if (!dbEnabled) return;
  const { error } = await client.from('coupons').delete().eq('code', code);
  if (error) throw new Error(error.message);
}

/* ---------- seed admin (supabase) ---------- */
export async function seedSupabaseAdmin() {
  if (!dbEnabled) return;

  const { data } = await client
    .from('users')
    .select('id')
    .eq('role', 'admin')
    .limit(1);

  if (data && data.length > 0) return;

  const { hashPassword } = await import('./auth.js');
  const { error } = await client.from('users').upsert({
    email: 'admin@templa.cl',
    name: 'Admin Templa',
    password_hash: await hashPassword('admin123'),
    role: 'admin',
  }, { onConflict: 'email' });

  if (error) {
    console.error('[db] seed admin:', error.message);
    return;
  }

  console.warn('╔══════════════════════════════════════════════╗');
  console.warn('║  ADMIN AUTO-CREADO (Supabase)                ║');
  console.warn('║  Email:    admin@templa.cl                   ║');
  console.warn('║  Password: admin123                          ║');
  console.warn('║  ⚠  Cambia esta contraseña en producción     ║');
  console.warn('╚══════════════════════════════════════════════╝');
}
