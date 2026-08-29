-- Templa — autenticación de usuarios

create table if not exists public.users (
  id            uuid primary key default gen_random_uuid(),
  email         text unique not null,
  name          text,
  password_hash text not null,
  created_at    timestamptz not null default now()
);

create index if not exists users_email_idx on public.users (email);

alter table public.orders add column if not exists user_id uuid references public.users (id);
create index if not exists orders_user_idx on public.orders (user_id);

alter table public.users enable row level security;
