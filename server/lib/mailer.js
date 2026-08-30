import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import nodemailer from 'nodemailer';
import { isServerless } from './env.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SMTP_HOST = process.env.SMTP_HOST || '';
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const MAIL_FROM = process.env.MAIL_FROM || 'Templa <hola@templa.app>';

const OUTBOX_DIR = path.join(__dirname, '..', 'data', 'outbox');

export const mailConfigured = Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS);

let transport = null;

function transporter() {
  if (!transport) {
    transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
  }
  return transport;
}

function deliveryHtml(order, links) {
  const rows = links
    .map(
      (l) => `
      <tr>
        <td style="padding:10px 0;color:#1f2937;font-weight:600">${l.name}</td>
        <td style="padding:10px 0;text-align:right">
          <a href="${l.url}" style="background:#7c3aed;color:#fff;padding:9px 18px;border-radius:9px;text-decoration:none;font-weight:700;font-size:13px">Descargar</a>
        </td>
      </tr>`,
    )
    .join('');

  return `<!doctype html><html><body style="margin:0;background:#f4f5fa;padding:32px;font-family:-apple-system,'Segoe UI',Roboto,sans-serif">
  <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb">
    <div style="background:linear-gradient(135deg,#7c3aed,#06b6d4);padding:28px 28px">
      <h1 style="color:#fff;margin:0;font-size:20px">¡Gracias por tu compra!</h1>
      <p style="color:#ffffffcc;margin:6px 0 0;font-size:13.5px">Orden ${order.orderId} · ${order.items.length} plantilla(s)</p>
    </div>
    <div style="padding:26px 28px">
      <table style="width:100%;border-collapse:collapse">${rows}</table>
      <p style="color:#6b7280;font-size:12.5px;line-height:1.6;margin-top:22px">
        Los enlaces no expiran. Guarda este correo para re-descargar cuando quieras,
        o recupera tus archivos en Templa con el código de orden
        <b>${order.orderId}</b>.
      </p>
      <p style="color:#9ca3af;font-size:11.5px;margin-top:18px">Licencia de por vida · Actualizaciones incluidas · © Templa</p>
    </div>
  </div>
</body></html>`;
}

async function sendViaSmtp(order, links) {
  await transporter().sendMail({
    from: MAIL_FROM,
    to: order.email,
    subject: `Tus plantillas Templa — Orden ${order.orderId}`,
    html: deliveryHtml(order, links),
  });
}

async function saveToOutbox(order, links) {
  /* En serverless no hay disco persistente: sin SMTP el email se descarta. */
  if (isServerless) {
    console.warn('[mailer] SMTP no configurado — outbox no disponible en serverless, email omitido.');
    return;
  }
  if (!fs.existsSync(OUTBOX_DIR)) fs.mkdirSync(OUTBOX_DIR, { recursive: true });
  const file = path.join(OUTBOX_DIR, `${order.orderId}.html`);
  fs.writeFileSync(file, deliveryHtml(order, links));
}

/**
 * Envía el email de entrega. Sin credenciales SMTP funciona en modo outbox:
 * guarda el email como HTML en server/data/outbox para inspección local.
 */
export async function sendFulfillmentEmail(order, links) {
  try {
    if (mailConfigured) {
      await sendViaSmtp(order, links);
      return { sent: true, mode: 'smtp' };
    }
    await saveToOutbox(order, links);
    console.log(`[mailer] SMTP no configurado — email guardado en data/outbox/${order.orderId}.html`);
    return { sent: false, mode: 'outbox' };
  } catch (err) {
    console.error('[mailer]', err.message);
    return { sent: false, mode: 'error' };
  }
}
