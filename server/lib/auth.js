import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const JWT_SECRET = process.env.JWT_SECRET || '';
const TOKEN_TTL = process.env.JWT_TTL || '7d';

if (!JWT_SECRET) {
  console.warn('[auth] JWT_SECRET no definido — usando secreto de desarrollo. Define uno en .env para producción.');
}

const SECRET = JWT_SECRET || 'templa-dev-secret-no-usar-en-produccion';

export async function hashPassword(plain) {
  return bcrypt.hash(plain, 10);
}

export async function checkPassword(plain, hash) {
  if (!plain || !hash) return false;
  return bcrypt.compare(plain, hash);
}

export function signToken(user) {
  return jwt.sign({ sub: user.id, email: user.email, role: user.role || 'user' }, SECRET, { expiresIn: TOKEN_TTL });
}

function verify(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}

export function authRequired(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  const payload = token && verify(token);

  if (!payload?.sub) {
    return res.status(401).json({ error: 'Sesión no válida. Inicia sesión de nuevo.' });
  }

  req.user = { id: payload.sub, email: payload.email };
  next();
}

export function optionalUser(req, _res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  const payload = token && verify(token);
  if (payload?.sub) req.user = { id: payload.sub, email: payload.email, role: payload.role || 'user' };
  next();
}

export function adminRequired(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  const payload = token && verify(token);

  if (!payload?.sub) {
    return res.status(401).json({ error: 'Sesión no válida.' });
  }

  if (payload.role !== 'admin') {
    return res.status(403).json({ error: 'No tienes permisos de administrador.' });
  }

  req.user = { id: payload.sub, email: payload.email, role: 'admin' };
  next();
}

/* ---------- usuarios en modo local (sin Supabase) ---------- */
const USERS_FILE = path.join(__dirname, '..', 'data', 'users.json');

if (!fs.existsSync(path.dirname(USERS_FILE))) fs.mkdirSync(path.dirname(USERS_FILE), { recursive: true });
if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, '{}');

export function localFindUserByEmail(email) {
  const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
  return users[email.toLowerCase()] || null;
}

export function localInsertUser({ email, name, passwordHash }) {
  const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
  const user = {
    id: crypto.randomUUID(),
    email: email.toLowerCase(),
    name: name || null,
    passwordHash,
    createdAt: new Date().toISOString(),
  };
  users[user.email] = user;
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  return user;
}

export function localGetUserById(id) {
  const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
  return Object.values(users).find((u) => u.id === id) || null;
}

export function localListUsers() {
  const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
  return Object.values(users).map((u) => ({
    id: u.id,
    email: u.email,
    name: u.name ?? null,
    role: u.role || 'user',
    createdAt: u.createdAt,
  }));
}

export function localSetUserRole(id, role) {
  const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
  const user = Object.values(users).find((u) => u.id === id);
  if (!user) return null;
  user.role = role;
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  return { id: user.id, email: user.email, name: user.name, role: user.role };
}

export async function seedLocalAdmin() {
  const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
  const hasAdmin = Object.values(users).some((u) => u.role === 'admin');
  if (hasAdmin) return null;

  const admin = {
    id: crypto.randomUUID(),
    email: 'admin@templa.cl',
    name: 'Admin Templa',
    passwordHash: await hashPassword('admin123'),
    role: 'admin',
    createdAt: new Date().toISOString(),
  };
  users[admin.email] = admin;
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  console.warn('╔══════════════════════════════════════════════╗');
  console.warn('║  ADMIN AUTO-CREADO                           ║');
  console.warn('║  Email:    admin@templa.cl                   ║');
  console.warn('║  Password: admin123                          ║');
  console.warn('║  ⚠  Cambia esta contraseña en producción     ║');
  console.warn('╚══════════════════════════════════════════════╝');
  return admin;
}
