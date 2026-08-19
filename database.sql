-- Create a table for public profiles
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  email text,
  name text,
  
  primary key (id)
);

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( (select auth.uid()) = id );

create policy "Users can update own profile."
  on profiles for update
  using ( (select auth.uid()) = id );

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- It reads the "name" from the raw_user_meta_data we sent during sign up.
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name)
  values (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'name'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create a table for assessment history
create table public.assessment_history (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  overall_score numeric not null,
  classification text not null,
  details jsonb not null
);

-- Set up Row Level Security (RLS) for assessment_history
alter table public.assessment_history enable row level security;

-- Users can view their own assessment history
create policy "Users can view own assessment history"
  on assessment_history for select
  using ( (select auth.uid()) = user_id );

-- Users can insert their own assessment history
create policy "Users can insert own assessment history"
  on assessment_history for insert
  with check ( (select auth.uid()) = user_id );