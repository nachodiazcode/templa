import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Directorio del módulo actual, seguro en bundles serverless (esbuild en formato
 * CJS anula `import.meta.url`). En ese caso cae a `process.cwd()` — solo se
 * usa para datos locales; en serverless todo va por Storage/Supabase.
 */
export function moduleDir() {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.url) {
      return path.dirname(fileURLToPath(import.meta.url));
    }
  } catch {
    /* bundle CJS */
  }
  const candidates = [
    process.cwd(),
    path.resolve(process.cwd(), 'server'),
  ];
  for (const c of candidates) {
    if (fs.existsSync(path.join(c, 'package.json'))) return c;
  }
  return process.cwd();
}