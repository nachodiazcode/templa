import zlib from 'node:zlib';
import { isServerless } from './env.js';

const COMPRESSIBLE_TYPES = /(?:text|json|javascript|xml|svg)/i;

/**
 * Middleware de compresión gzip sin dependencias externas. Comprime
 * respuestas de texto/JSON cuando el cliente lo acepta y el resultado
 * es más pequeño que el original.
 *
 * En serverless (Netlify) se omite: la CDN ya comprime en el edge y el
 * wrapper de funciones no debe emitir buffers gzip.
 */
export function compressGzip() {
  return (req, res, next) => {
    if (isServerless) return next();

    const accept = req.headers['accept-encoding'] || '';
    if (!/\bgzip\b/i.test(accept) || req.method === 'HEAD') return next();

    const sendImpl = res.send.bind(res);
    res.send = (body) => {
      const type = String(res.getHeader('Content-Type') || '');
      const canCompress = typeof body === 'string' && COMPRESSIBLE_TYPES.test(type);
      if (!canCompress) return sendImpl(body);

      zlib.gzip(body, (err, gz) => {
        if (err || gz.length >= Buffer.byteLength(body)) {
          res.removeHeader('Content-Encoding');
          return sendImpl(body);
        }
        res.setHeader('Content-Encoding', 'gzip');
        res.setHeader('Content-Length', gz.length);
        res.setHeader('Vary', 'Accept-Encoding');
        sendImpl(gz);
      });
      return res;
    };
    next();
  };
}