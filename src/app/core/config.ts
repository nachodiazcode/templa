declare global {
  interface Window {
    __TEMPLA_API__?: string;
  }
}

// La URL de la API se puede sobrescribir en producción inyectando
// window.__TEMPLA_API__ (p. ej. desde index.html o el env del host).
export const API_BASE_URL =
  (typeof window !== 'undefined' && window.__TEMPLA_API__) ||
  'http://localhost:8787';

export {};
