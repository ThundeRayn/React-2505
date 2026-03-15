-- ============================================
-- 2505Forever — Supabase Schema & Seed Data
-- ============================================
-- Run this in your Supabase SQL Editor after creating a new project.
-- IMPORTANT: Before running this, create the 4 users in Supabase Auth Dashboard:
--   1. shirong@codura.studio (password: 2505forever)
--   2. queenie@2505forever.com (password: 2505forever)
--   3. roy@2505forever.com (password: 2505forever)
--   4. chloe@2505forever.com (password: 2505forever)
-- Then replace the UUIDs below with the actual auth.users IDs.

-- ============================================
-- 1. PROFILES TABLE (extends auth.users)
-- ============================================
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  name text not null,
  email text not null,
  avatar_url text,
  city text,
  lat double precision,
  lon double precision,
  use_location boolean default false,
  created_at timestamptz default now()
);

-- Backfill new profile columns when updating an existing project
alter table public.profiles add column if not exists city text;
alter table public.profiles add column if not exists lat double precision;
alter table public.profiles add column if not exists lon double precision;
alter table public.profiles add column if not exists use_location boolean default false;

-- Auto-create profile when a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.email
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================
-- 2. TODOS TABLE
-- ============================================
create table if not exists public.todos (
  id uuid default gen_random_uuid() primary key,
  text text not null,
  completed boolean default false,
  assignee_id uuid references public.profiles(id),
  created_by uuid references public.profiles(id),
  created_at timestamptz default now()
);

-- ============================================
-- 3. ALBUMS TABLE
-- ============================================
create table if not exists public.albums (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  tags text[] default '{}',
  category text,
  created_by uuid references public.profiles(id),
  created_at timestamptz default now()
);

-- ============================================
-- 4. PHOTOS TABLE
-- ============================================
create table if not exists public.photos (
  id uuid default gen_random_uuid() primary key,
  album_id uuid references public.albums(id) on delete cascade,
  storage_path text not null,
  uploaded_by uuid references public.profiles(id),
  created_at timestamptz default now()
);

-- ============================================
-- 5. CATS TABLE
-- ============================================
create table if not exists public.cats (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  image_url text,
  mood text default 'happy' check (mood in ('happy', 'sad', 'sleepy', 'hungry', 'playful', 'angry')),
  updated_by uuid references public.profiles(id),
  updated_at timestamptz default now()
);

-- ============================================
-- 6. ROW LEVEL SECURITY
-- All authenticated users can read/write everything (4-user shared app)
-- ============================================

-- Profiles
alter table public.profiles enable row level security;
create policy "Authenticated users can view all profiles"
  on public.profiles for select
  to authenticated
  using (true);
create policy "Users can update own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id);

-- Todos
alter table public.todos enable row level security;
create policy "Authenticated users can do everything with todos"
  on public.todos for all
  to authenticated
  using (true)
  with check (true);

-- Albums
alter table public.albums enable row level security;
create policy "Authenticated users can do everything with albums"
  on public.albums for all
  to authenticated
  using (true)
  with check (true);

-- Photos
alter table public.photos enable row level security;
create policy "Authenticated users can do everything with photos"
  on public.photos for all
  to authenticated
  using (true)
  with check (true);

-- Cats
alter table public.cats enable row level security;
create policy "Authenticated users can do everything with cats"
  on public.cats for all
  to authenticated
  using (true)
  with check (true);

-- ============================================
-- 7. ENABLE REALTIME
-- ============================================
alter publication supabase_realtime add table public.todos;
alter publication supabase_realtime add table public.cats;

-- ============================================
-- 8. SEED DATA — Cats
-- ============================================
insert into public.cats (name, image_url, mood) values
  ('Mochi', null, 'happy'),
  ('Luna', null, 'sleepy');

-- ============================================
-- 9. STORAGE BUCKETS
-- Run these separately or create via Supabase Dashboard:
--   - Bucket "gallery" (public)
--   - Bucket "avatars" (public)
-- ============================================
-- insert into storage.buckets (id, name, public) values ('gallery', 'gallery', true);
-- insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true);
