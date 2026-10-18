-- Perfil, cartas y retos. Las etiquetas morfológicas forman un catálogo global
-- de solo lectura para las cuentas; las escrituras quedan limitadas al propietario.

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create or replace function private.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = pg_catalog.now();
  return new;
end;
$$;

revoke all on function private.set_updated_at() from public, anon, authenticated;

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  app_language text not null check (app_language in ('es', 'en')),
  writing_languages text[] not null default array[]::text[],
  last_challenge_language text,
  created_at timestamptz not null default pg_catalog.now(),
  updated_at timestamptz not null default pg_catalog.now()
);

create table public.word_cards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  added_by uuid not null default auth.uid() references auth.users (id),
  term text not null check (length(btrim(term)) > 0),
  language text not null check (length(btrim(language)) > 0),
  usage_note text check (usage_note is null or length(btrim(usage_note)) > 0),
  example text check (example is null or length(btrim(example)) > 0),
  created_at timestamptz not null default pg_catalog.now(),
  updated_at timestamptz not null default pg_catalog.now(),
  constraint word_cards_id_user_id_key unique (id, user_id)
);

create index word_cards_user_created_idx
  on public.word_cards (user_id, created_at desc);
create index word_cards_user_language_created_idx
  on public.word_cards (user_id, language, created_at desc);

create table public.morphological_tags (
  id uuid primary key default gen_random_uuid(),
  code text not null unique check (length(btrim(code)) > 0),
  created_at timestamptz not null default pg_catalog.now()
);

create table public.morphological_tag_translations (
  tag_id uuid not null references public.morphological_tags (id) on delete cascade,
  language_code text not null check (length(btrim(language_code)) > 0),
  name text not null check (length(btrim(name)) > 0),
  primary key (tag_id, language_code)
);

create table public.word_card_tags (
  word_card_id uuid not null,
  user_id uuid not null references auth.users (id) on delete cascade,
  tag_id uuid not null references public.morphological_tags (id) on delete restrict,
  assigned_order smallint not null check (assigned_order > 0),
  created_at timestamptz not null default pg_catalog.now(),
  primary key (word_card_id, tag_id),
  constraint word_card_tags_card_order_key unique (word_card_id, assigned_order),
  constraint word_card_tags_card_owner_fkey
    foreign key (word_card_id, user_id)
    references public.word_cards (id, user_id) on delete cascade
);

create index word_card_tags_tag_idx on public.word_card_tags (tag_id);

create table public.challenges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  language text not null check (length(btrim(language)) > 0),
  prompt text not null check (length(btrim(prompt)) > 0),
  status text not null default 'pending'
    check (status in ('pending', 'incorporated', 'discarded')),
  created_at timestamptz not null default pg_catalog.now(),
  resolved_at timestamptz,
  constraint challenges_id_user_id_key unique (id, user_id),
  constraint challenges_resolution_check check (
    (status = 'pending' and resolved_at is null)
    or (status in ('incorporated', 'discarded') and resolved_at is not null)
  )
);

create index challenges_user_created_idx
  on public.challenges (user_id, created_at desc);

create table public.challenge_cards (
  challenge_id uuid not null,
  word_card_id uuid not null,
  user_id uuid not null references auth.users (id) on delete cascade,
  position smallint not null default 1 check (position > 0),
  primary key (challenge_id, word_card_id),
  constraint challenge_cards_position_key unique (challenge_id, position),
  constraint challenge_cards_challenge_owner_fkey
    foreign key (challenge_id, user_id)
    references public.challenges (id, user_id) on delete cascade,
  constraint challenge_cards_word_owner_fkey
    foreign key (word_card_id, user_id)
    references public.word_cards (id, user_id) on delete cascade
);

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function private.set_updated_at();

create trigger word_cards_set_updated_at
before update on public.word_cards
for each row execute function private.set_updated_at();

alter table public.profiles enable row level security;
alter table public.word_cards enable row level security;
alter table public.morphological_tags enable row level security;
alter table public.morphological_tag_translations enable row level security;
alter table public.word_card_tags enable row level security;
alter table public.challenges enable row level security;
alter table public.challenge_cards enable row level security;

create policy profiles_select_own on public.profiles
  for select to authenticated
  using ((select auth.uid()) = id);
create policy profiles_insert_own on public.profiles
  for insert to authenticated
  with check ((select auth.uid()) = id);
create policy profiles_update_own on public.profiles
  for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create policy word_cards_select_own on public.word_cards
  for select to authenticated
  using ((select auth.uid()) = user_id);
create policy word_cards_insert_own on public.word_cards
  for insert to authenticated
  with check (
    (select auth.uid()) = user_id
    and (select auth.uid()) = added_by
  );
create policy word_cards_update_own on public.word_cards
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check (
    (select auth.uid()) = user_id
    and (select auth.uid()) = added_by
  );
create policy word_cards_delete_own on public.word_cards
  for delete to authenticated
  using ((select auth.uid()) = user_id);

create policy morphological_tags_read_authenticated on public.morphological_tags
  for select to authenticated using (true);
create policy morphological_tag_translations_read_authenticated
  on public.morphological_tag_translations
  for select to authenticated using (true);

create policy word_card_tags_select_own on public.word_card_tags
  for select to authenticated
  using ((select auth.uid()) = user_id);
create policy word_card_tags_insert_own on public.word_card_tags
  for insert to authenticated
  with check ((select auth.uid()) = user_id);
create policy word_card_tags_update_own on public.word_card_tags
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
create policy word_card_tags_delete_own on public.word_card_tags
  for delete to authenticated
  using ((select auth.uid()) = user_id);

create policy challenges_select_own on public.challenges
  for select to authenticated
  using ((select auth.uid()) = user_id);
create policy challenges_insert_own on public.challenges
  for insert to authenticated
  with check ((select auth.uid()) = user_id);
create policy challenges_update_own on public.challenges
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
create policy challenges_delete_own on public.challenges
  for delete to authenticated
  using ((select auth.uid()) = user_id);

create policy challenge_cards_select_own on public.challenge_cards
  for select to authenticated
  using ((select auth.uid()) = user_id);
create policy challenge_cards_insert_own on public.challenge_cards
  for insert to authenticated
  with check ((select auth.uid()) = user_id);
create policy challenge_cards_update_own on public.challenge_cards
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
create policy challenge_cards_delete_own on public.challenge_cards
  for delete to authenticated
  using ((select auth.uid()) = user_id);

-- Grant API table access explicitly. RLS still limits each user's rows.
revoke all on table
  public.profiles,
  public.word_cards,
  public.morphological_tags,
  public.morphological_tag_translations,
  public.word_card_tags,
  public.challenges,
  public.challenge_cards
from anon;

grant usage on schema public to authenticated;
grant select, insert, update, delete on table
  public.profiles,
  public.word_cards,
  public.word_card_tags,
  public.challenges,
  public.challenge_cards
to authenticated;
grant select on table
  public.morphological_tags,
  public.morphological_tag_translations
to authenticated;
