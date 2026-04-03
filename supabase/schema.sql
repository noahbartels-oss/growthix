-- ReplyFlow AI Database Schema
-- Run this in your Supabase SQL Editor

-- Businesses (linked to auth.users)
create table if not exists businesses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null unique,
  name text not null,
  type text check (type in ('hair_salon', 'beauty_studio', 'coaching', 'other')) default 'other',
  address text,
  phone text,
  email text,
  website text,
  ai_prompt text default 'Du bist ein freundlicher Assistent für ein lokales Business. Ziel: Termine vereinbaren, kurz und klar antworten. Wenn möglich, schlage konkrete Zeiten vor.',
  services text,
  plan text check (plan in ('trial', 'starter', 'pro')) default 'trial',
  subscription_id text,                          -- PayPal subscription ID
  subscription_status text check (subscription_status in ('trial', 'active', 'cancelled', 'expired')) default 'trial',
  trial_ends_at timestamptz default (now() + interval '7 days'),
  subscription_starts_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Customers
create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id) on delete cascade not null,
  name text,
  phone text,
  instagram_handle text,
  channel text check (channel in ('whatsapp', 'instagram')) not null,
  created_at timestamptz default now()
);

-- Conversations
create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id) on delete cascade not null,
  customer_id uuid references customers(id) on delete cascade not null,
  channel text check (channel in ('whatsapp', 'instagram')) not null,
  status text check (status in ('active', 'closed')) default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Messages
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references conversations(id) on delete cascade not null,
  sender text check (sender in ('customer', 'ai', 'business')) not null,
  content text not null,
  ai_generated boolean default false,
  created_at timestamptz default now()
);

-- Appointments
create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id) on delete cascade not null,
  customer_id uuid references customers(id) on delete cascade not null,
  conversation_id uuid references conversations(id) on delete set null,
  service text,
  date date not null,
  time time not null,
  status text check (status in ('pending', 'confirmed', 'done', 'cancelled')) default 'pending',
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Channels (connected accounts)
create table if not exists channels (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id) on delete cascade not null,
  type text check (type in ('whatsapp', 'instagram')) not null,
  external_id text,
  access_token text,
  status text check (status in ('connected', 'disconnected')) default 'disconnected',
  created_at timestamptz default now()
);

-- Row Level Security
alter table businesses enable row level security;
alter table customers enable row level security;
alter table conversations enable row level security;
alter table messages enable row level security;
alter table appointments enable row level security;
alter table channels enable row level security;

-- Policies: users can only access their own business data
create policy "Users can view own business" on businesses
  for select using (auth.uid() = user_id);

create policy "Users can update own business" on businesses
  for update using (auth.uid() = user_id);

create policy "Users can insert own business" on businesses
  for insert with check (auth.uid() = user_id);

create policy "Users can view own customers" on customers
  for all using (business_id in (select id from businesses where user_id = auth.uid()));

create policy "Users can manage own conversations" on conversations
  for all using (business_id in (select id from businesses where user_id = auth.uid()));

create policy "Users can manage own messages" on messages
  for all using (conversation_id in (
    select id from conversations where business_id in (
      select id from businesses where user_id = auth.uid()
    )
  ));

create policy "Users can manage own appointments" on appointments
  for all using (business_id in (select id from businesses where user_id = auth.uid()));

create policy "Users can manage own channels" on channels
  for all using (business_id in (select id from businesses where user_id = auth.uid()));

-- Auto-create business on user signup (trigger)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.businesses (user_id, name)
  values (new.id, coalesce(new.raw_user_meta_data->>'business_name', 'My Business'));
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
