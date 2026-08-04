alter table public.game_progress
  add column achievement_ids text[] not null default '{}'::text[];
