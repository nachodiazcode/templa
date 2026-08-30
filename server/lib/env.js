/* Detecta ejecución en funciones serverless (Netlify/FaaS): el filesystem
   fuera de /tmp es de solo lectura y no persiste entre invocaciones. */
export const isServerless = Boolean(
  process.env.NETLIFY ||
    process.env.FUNCTIONS_EMULATOR ||
    process.env.AWS_LAMBDA_FUNCTION_NAME,
);