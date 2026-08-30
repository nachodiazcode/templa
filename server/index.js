import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildApi, initServices, serverStatus } from './app.js';
import { isServerless } from './lib/env.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 8787;

async function main() {
  const { app, orders } = buildApi();
  await initServices(orders);

  if (isServerless) {
    console.warn('[index] Modo serverless detectado: este entry solo es para desarrollo local.');
  }

  app.listen(PORT, () => {
    const status = serverStatus();
    console.log(`Templa API en http://localhost:${PORT}`);
    console.log(
      status.mode === 'production'
        ? 'Webpay Plus en MODO PRODUCCIÓN.'
        : 'Webpay Plus en MODO INTEGRACIÓN (credenciales públicas de prueba).',
    );
    console.log(`Persistencia: ${status.db}. Storage assets: ${status.storage}.`);
  });
}

main();