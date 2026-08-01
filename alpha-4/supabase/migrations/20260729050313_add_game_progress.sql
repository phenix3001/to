create table public.game_progress (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  level_id text not null default 'case-01',
  found_clue_ids text[] not null default '{}'::text[],
  matched_case_ids text[] not null default '{}'::text[],
  updated_at timestamptz not null default now(),
  primary key (user_id, level_id)
);

alter table public.game_progress enable row level security;

create policy "read own game progress"
  on public.game_progress for select
  using (auth.uid() = user_id);

create policy "insert own game progress"
  on public.game_progress for insert
  with check (auth.uid() = user_id);

create policy "update own game progress"
  on public.game_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

revoke all on table public.game_progress from anon;
grant select, insert, update on table public.game_progress to authenticated;
