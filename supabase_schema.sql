-- Starter schema. Review and tighten RLS policies before production.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  created_at timestamptz not null default now()
);

create table if not exists public.call_permissions (
  caller_id uuid not null references auth.users(id) on delete cascade,
  callee_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (caller_id, callee_id),
  check (caller_id <> callee_id)
);

alter table public.profiles enable row level security;
alter table public.call_permissions enable row level security;

-- IMPORTANT:
-- Add policies so authenticated users can only read their own profile
-- and approved call relationships. Do not use open policies in production.
