/**
 * Rate limit simple en memoria (sin dependencias). Protege endpoints
 * sensibles (auth, cupones, checkout) contra abuso/fuerza bruta.
 */
export function rateLimit({ windowMs = 15 * 60 * 1000, max = 20 } = {}) {
  const hits = new Map(); // key -> { count, resetAt }

  const sweep = setInterval(() => {
    const now = Date.now();
    for (const [key, h] of hits) {
      if (h.resetAt < now) hits.delete(key);
    }
  }, Math.min(windowMs, 60 * 1000) + 1000);
  sweep.unref();

  return (req, res, next) => {
    const now = Date.now();
    const ip = req.ip || req.socket?.remoteAddress || 'unknown';
    const key = String(ip);

    let entry = hits.get(key);
    if (!entry || entry.resetAt < now) {
      entry = { count: 0, resetAt: now + windowMs };
      hits.set(key, entry);
    }
    entry.count += 1;

    if (entry.count > max) {
      res.setHeader('Retry-After', String(Math.ceil((entry.resetAt - now) / 1000)));
      return res.status(429).json({ error: 'Demasiados intentos. Intenta de nuevo en un momento.' });
    }
    next();
  };
}