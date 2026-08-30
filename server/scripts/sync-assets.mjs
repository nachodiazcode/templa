import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import AdmZip from 'adm-zip';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = process.env.TEMPLA_BUCKET || 'templates';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const TEMPLATES_SRC = path.join(root, 'templates-src');
const OFFICE_ASSETS = path.join(root, 'office', 'assets');

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Faltan SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY (server/.env).');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function ensureBucket() {
  const { data, error } = await supabase.storage.getBucket(BUCKET);
  if (error?.message?.includes('not found')) {
    const { error: createError } = await supabase.storage.createBucket(BUCKET, {
      public: false,
      fileSizeLimit: 52428800,
    });
    if (createError) {
      console.error(`No se pudo crear el bucket "${BUCKET}":`, createError.message);
      process.exit(1);
    }
    console.log(`Bucket privado "${BUCKET}" creado.`);
  } else if (error) {
    console.error('Revisando bucket:', error.message);
    process.exit(1);
  }
}

async function upsertObject(storagePath, buffer, contentType) {
  const { error } = await supabase.storage.from(BUCKET).upload(storagePath, buffer, {
    contentType,
    upsert: true,
    cacheControl: '3600',
  });
  return error;
}

function officeContentType(fileName) {
  if (fileName.endsWith('.pptx')) return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
  if (fileName.endsWith('.docx')) return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  return 'application/octet-stream';
}

async function main() {
  await ensureBucket();

  /* 1) Plantillas -> templates/<id>/bundle.zip */
  if (fs.existsSync(TEMPLATES_SRC)) {
    const ids = fs.readdirSync(TEMPLATES_SRC, { withFileTypes: true })
      .filter((e) => e.isDirectory())
      .map((e) => e.name);

    for (const id of ids) {
      const dir = path.join(TEMPLATES_SRC, id);
      const zip = new AdmZip();
      zip.addLocalFolder(dir);
      const buffer = zip.toBuffer();
      const storagePath = `templates/${id}/bundle.zip`;
      const error = await upsertObject(storagePath, buffer, 'application/zip');
      console.log(
        error
          ? `[error] ${id} -> ${storagePath}: ${error.message}`
          : `[ok] ${id} (${(buffer.length / 1024).toFixed(1)} kB) -> ${storagePath}`,
      );
    }
  } else {
    console.log('No existe server/templates-src: sin plantillas para subir.');
  }

  /* 2) Office -> office/<archivo> */
  if (fs.existsSync(OFFICE_ASSETS)) {
    const files = fs.readdirSync(OFFICE_ASSETS);
    for (const fileName of files) {
      const storagePath = `office/${fileName}`;
      const buffer = fs.readFileSync(path.join(OFFICE_ASSETS, fileName));
      const error = await upsertObject(storagePath, buffer, officeContentType(fileName));
      console.log(
        error
          ? `[error] office/${fileName}: ${error.message}`
          : `[ok] office/${fileName} (${(buffer.length / 1024).toFixed(1)} kB)`,
      );
    }
  } else {
    console.log('No existe server/office/assets: sin archivos office para subir.');
  }

  console.log('Sincronización de assets finalizada.');
}

main();