import serverless from 'serverless-http';
import { buildApi, initServices } from '../../server/app.js';

/* Tipos de respuesta binaria: serverless-http codifica en base64 y Netlify
   lo sirve correctamente con su Content-Type. */
const binary = [
  'application/zip',
  'application/octet-stream',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

let apiHandler = null;

export const handler = async (event, context) => {
  /* La app (routes + cachés) se construye una vez por instancia (cold start). */
  if (!apiHandler) {
    const { app, orders } = buildApi();
    await initServices(orders);
    apiHandler = serverless(app, { binary });
  }
  return apiHandler(event, context);
};