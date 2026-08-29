# Templa

Marketplace de plantillas web: tienda con catálogo, detalle con vista previa real,
checkout con cupones, pago Webpay Plus, descargas con licencia, reviews, área de
clientes y panel de administración.

**Stack:** Angular 18 (frontend) + Node/Express (API) + Supabase opcional con
fallback a persistencia en JSON local.

## Arquitectura

```
src/                  Frontend Angular 18 (SCSS standalone, signals)
  app/core            Servicios, guards, interceptores, estrategia de preloading
  app/pages           Home, catálogo, detalle, checkout, área de cliente, admin
server/               API Express
  index.js            Rutas de la API (catálogo, auth, checkout, webpay, preview)
  catalog.json        Catálogo de plantillas público (metadatos y precios)
  lib/                Cachés en memoria, gzip, rate-limit, vault, mailer, bundle
  data/               Persistencia local (JSON, se genera al arrancar; ignorado por git)
  templates-src/      Assets de las plantillas (producto privado; ignorado por git)
supabase/migrations/  Migraciones SQL (solo cuando se usa Supabase)
```

## Requisitos

- Node.js 20+
- npm (Angular CLI se instala localmente con `npm install`)

## Puesta en marcha

```bash
npm install                # dependencias del frontend (Angular)
cd server && npm install   # dependencias de la API
```

En dos terminales:

```bash
# Terminal 1: API
npm run server             # http://localhost:8787

# Terminal 2: frontend
npm start                  # http://localhost:4300
```

La API arranca sin configuración en modo local: crea `server/data/` y siembra un
admin (`admin@templa.cl` / `admin123`, cámbialo en producción), junto con reviews
de ejemplo. Los correos de cumplimiento se escriben en `server/data/outbox/`
cuando no hay SMTP configurado.

## Configuración

Copia `server/.env.example` a `server/.env` para:

| Variable | Uso |
| --- | --- |
| `APP_URL`, `SERVER_URL`, `PORT` | Orígenes CORS y URLs públicas |
| `JWT_SECRET` | Firma de tokens (**obligatorio definir en producción**) |
| `SMTP_*`, `MAIL_FROM` | Envío de correos de cumplimiento (opcional) |
| `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | Persistencia en Supabase (opcional) |
| `WEBPAY_COMMERCE_CODE`, `WEBPAY_API_KEY` | Cobro por Webpay Plus (sin esto: modo integración de prueba) |
| `ALLOWED_ORIGINS` | Orígenes CORS adicionales separados por coma |

## Endpoints principales

- `GET /api/health` — estado del servidor
- `GET /api/templates` — catálogo con rating calculado (cacheado en memoria)
- `GET /api/templates/:id/preview-html` — HTML real de la plantilla, CSS/JS inline
- `POST /api/auth/register` · `POST /api/auth/login`
- `POST /api/coupons/validate` — valida un cupón de descuento
- `POST /api/checkout` — iniciar compra (Webpay)
- `GET /api/download/free/:templateId` · `GET /api/download/:orderId` — descargas
- `POST /api/templates/:id/reviews` — publicar una review (requiere login)
- `/api/admin/*` — panel de administración (requiere rol admin)

## Producto privado

`server/templates-src/` (los assets de las plantillas que se venden) y
`server/data/` (datos reales de clientes) están **excluidos de git**. Si vas a
desplegar tu propio marketplace, publica las plantillas desde el panel de admin.

## Scripts

```bash
npm run build   # build de producción del frontend (dist/)
npm run server  # levanta la API
npm test        # tests unitarios (Karma)
```

## Licencia

MIT — ver [LICENSE](LICENSE).