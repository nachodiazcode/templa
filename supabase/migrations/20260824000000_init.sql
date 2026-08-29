-- Templa — esquema inicial Supabase
-- Ejecutar en el SQL Editor de Supabase o dejar que la integración
-- con GitHub aplique esta migración automáticamente al pushear.

create table if not exists public.templates (
  id        text primary key,
  name      text not null,
  price     integer not null default 0 check (price >= 0),
  tagline   text,
  pages     integer not null default 1,
  tech      jsonb not null default '[]'::jsonb,
  colors    jsonb not null default '[]'::jsonb,
  features  jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  order_id           text primary key,
  buy_order          text,
  email              text not null,
  amount             integer not null check (amount > 0),
  currency           text not null default 'CLP',
  status             text not null default 'pending'
                     check (status in ('pending', 'paid', 'rejected', 'canceled')),
  items              jsonb not null default '[]'::jsonb,
  webpay_token       text,
  webpay_url         text,
  authorization_code text,
  commit_detail      jsonb,
  fulfilled          boolean not null default false,
  created_at         timestamptz not null default now(),
  paid_at            timestamptz
);

create index if not exists orders_status_idx on public.orders (status);
create index if not exists orders_email_idx on public.orders (email);
create index if not exists orders_webpay_token_idx on public.orders (webpay_token);

-- RLS activado: el backend usa la service_role key que ignora RLS.
-- El frontend nunca debe acceder a estas tablas directamente con la anon key.
alter table public.templates enable row level security;
alter table public.orders enable row level security;
