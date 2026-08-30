-- Reseñas de clientes (legibles públicamente, escritas por la API con service role)
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  template_id text not null references public.templates (id) on delete cascade,
  author text not null default 'Usuario Templa',
  email text,
  rating smallint not null check (rating between 1 and 5),
  title text not null default '',
  body text not null default '',
  date timestamptz not null default now(),
  verified boolean not null default false
);

create index if not exists reviews_template_idx on public.reviews (template_id, date desc);

alter table public.reviews enable row level security;

drop policy if exists reviews_select on public.reviews;
create policy reviews_select on public.reviews for select using (true);

-- Cupones de descuento (administrado por la API con service role)
create table if not exists public.coupons (
  code text primary key,
  type text not null check (type in ('percent', 'fixed')),
  value integer not null check (value > 0),
  min_amount integer,
  max_uses integer,
  used integer not null default 0,
  active boolean not null default true,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.coupons enable row level security;

drop policy if exists coupons_select on public.coupons;
create policy coupons_select on public.coupons for select using (true);