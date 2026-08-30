import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const storageEnabled = Boolean(SUPABASE_URL && SERVICE_KEY);
export const TEMPLA_BUCKET = process.env.TEMPLA_BUCKET || 'templates';

let sb = null;
function client() {
  if (!sb) {
    sb = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });
  }
  return sb;
}

let bucketReady = null;

async function ensureBucket() {
  if (!storageEnabled) return false;
  if (bucketReady === null) {
    bucketReady = (async () => {
      try {
        const { error } = await client().storage.createBucket(TEMPLA_BUCKET, {
          /* privado: los zips de plantillas de pago NO deben ser públicos */
          public: false,
        });
        if (error && !/already exists/i.test(String(error.message))) {
          console.error('[storage] createBucket:', error.message);
        }
        return true;
      } catch (err) {
        console.error('[storage] ensureBucket:', err.message);
        return false;
      }
    })();
  }
  return bucketReady;
}

/* ---------- zip por plantilla (producto) ---------- */
const zipCache = new Map(); // id -> Buffer | null

export async function getTemplateZipBuffer(id) {
  if (!storageEnabled) return null;
  if (zipCache.has(id)) return zipCache.get(id);
  if (!(await ensureBucket())) return null;

  try {
    const { data, error } = await client()
      .storage.from(TEMPLA_BUCKET)
      .download(`templates/${id}/bundle.zip`);
    if (error || !data) {
      zipCache.set(id, null);
      return null;
    }
    const buf = Buffer.from(await data.arrayBuffer());
    zipCache.set(id, buf);
    return buf;
  } catch (err) {
    console.error('[storage] getTemplateZip:', err.message);
    zipCache.set(id, null);
    return null;
  }
}

export async function saveTemplateZip(id, buffer) {
  if (!storageEnabled) return false;
  if (!(await ensureBucket())) return false;

  const { error } = await client()
    .storage.from(TEMPLA_BUCKET)
    .upload(`templates/${id}/bundle.zip`, buffer, {
      contentType: 'application/zip',
      upsert: true,
    });
  if (error) {
    console.error('[storage] saveTemplateZip:', error.message);
    return false;
  }
  zipCache.set(id, Buffer.from(buffer));
  return true;
}

export async function deleteTemplateZip(id) {
  zipCache.delete(id);
  if (!storageEnabled) return true;

  const { error } = await client()
    .storage.from(TEMPLA_BUCKET)
    .remove([`templates/${id}/bundle.zip`]);
  if (error) console.error('[storage] deleteTemplateZip:', error.message);
  return !error;
}

export function clearTemplateZipCache(id) {
  zipCache.delete(id);
}

/* ---------- assets office (descargas gratuitas) ---------- */
const officeCache = new Map(); // key -> Buffer | null

export function officeAssetKey(id, kind) {
  return `office/${id}.${kind}`;
}

export async function getOfficeAssetBuffer(key) {
  if (!storageEnabled) return null;
  if (officeCache.has(key)) return officeCache.get(key);
  if (!(await ensureBucket())) return null;

  try {
    const { data, error } = await client().storage.from(TEMPLA_BUCKET).download(key);
    if (error || !data) {
      officeCache.set(key, null);
      return null;
    }
    const buf = Buffer.from(await data.arrayBuffer());
    officeCache.set(key, buf);
    return buf;
  } catch (err) {
    console.error('[storage] getOfficeAsset:', err.message);
    officeCache.set(key, null);
    return null;
  }
}

export async function saveOfficeAsset(key, buffer, contentType) {
  if (!storageEnabled) return false;
  if (!(await ensureBucket())) return false;

  const { error } = await client()
    .storage.from(TEMPLA_BUCKET)
    .upload(key, buffer, { contentType, upsert: true });
  if (error) {
    console.error('[storage] saveOfficeAsset:', error.message);
    return false;
  }
  officeCache.set(key, Buffer.from(buffer));
  return true;
}