-- Templa — panel de administración
-- Migración v3: roles de usuario, tabla de auditoría, expansión de templates

-- 1. Roles de usuario
alter table public.users add column if not exists role text not null default 'user';
alter table public.users add constraint users_role_check check (role in ('user', 'admin'));
create index if not exists users_role_idx on public.users (role);

-- 2. Tabla de auditoría
create table if not exists public.audit_log (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references public.users (id),
  action     text not null,
  entity     text not null,
  entity_id  text,
  detail     jsonb,
  created_at timestamptz not null default now()
);

create index if not exists audit_user_idx on public.audit_log (user_id);
create index if not exists audit_entity_idx on public.audit_log (entity, entity_id);
create index if not exists audit_created_idx on public.audit_log (created_at desc);

alter table public.audit_log enable row level security;

-- 3. Expandir templates con columnas del modelo completo
alter table public.templates add column if not exists description text;
alter table public.templates add column if not exists category text;
alter table public.templates add column if not exists accent text;
alter table public.templates add column if not exists old_price integer;
alter table public.templates add column if not exists rating real default 0;
alter table public.templates add column if not exists reviews integer default 0;
alter table public.templates add column if not exists sales integer default 0;
alter table public.templates add column if not exists is_new boolean default false;
alter table public.templates add column if not exists is_featured boolean default false;
alter table public.templates add column if not exists released_at timestamptz;

create index if not exists templates_category_idx on public.templates (category);
create index if not exists templates_featured_idx on public.templates (is_featured);
