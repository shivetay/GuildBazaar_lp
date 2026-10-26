-- Waitlist signups from the landing page form (src/app/actions/waitlist.ts).
-- Version matches the migration already recorded on prod (2026-07-29). Idempotent,
-- so it is also safe on projects where the table was created by hand.

create table if not exists public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  role text not null,
  message text,
  locale text,
  constraint waitlist_signups_name_len
    check (char_length(trim(name)) between 2 and 120),
  constraint waitlist_signups_email_format
    check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  constraint waitlist_signups_email_len
    check (char_length(email) <= 254),
  -- keep in sync with ALLOWED_ROLES in src/utils/constants.ts
  constraint waitlist_signups_role_allowed
    check (role in (
      'participant',
      'reconstructor',
      'larp',
      'cosplayer',
      'artisan',
      'vendor',
      'association',
      'organizer'
    )),
  constraint waitlist_signups_message_len
    check (message is null or char_length(message) <= 2000)
);

-- Unique e-mail, case-insensitive (the action maps 23505 to "duplicate")
create unique index if not exists waitlist_signups_email_unique
  on public.waitlist_signups (lower(email));

-- Public API may only INSERT: no SELECT / UPDATE / DELETE policies
alter table public.waitlist_signups enable row level security;

drop policy if exists "anon can insert waitlist signups" on public.waitlist_signups;
create policy "anon can insert waitlist signups"
  on public.waitlist_signups
  for insert
  to anon
  with check (true);

drop policy if exists "authenticated can insert waitlist signups" on public.waitlist_signups;
create policy "authenticated can insert waitlist signups"
  on public.waitlist_signups
  for insert
  to authenticated
  with check (true);

-- Explicit grants (older projects' default ACL also grants SELECT)
revoke all on public.waitlist_signups from anon, authenticated;
grant insert on public.waitlist_signups to anon, authenticated;
grant all on public.waitlist_signups to service_role;
