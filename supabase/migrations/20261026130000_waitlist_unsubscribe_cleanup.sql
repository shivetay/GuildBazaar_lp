-- 1. Self-service unsubscribe: hash of a long-lived token e-mailed with every
--    confirmation link (src/lib/waitlist-confirmation.ts). Server-only, like
--    confirm_token_hash: the public key has no INSERT/SELECT on this column.
-- 2. Retention: unconfirmed signups are deleted after 30 days (pg_cron, daily).
-- Additive: the currently deployed code keeps working.

alter table public.waitlist_signups
  add column if not exists manage_token_hash text;

create unique index if not exists waitlist_signups_manage_token_hash_unique
  on public.waitlist_signups (manage_token_hash);

create or replace function public.waitlist_delete_unconfirmed()
returns integer
language sql
security definer
set search_path = ''
as $$
  with deleted as (
    delete from public.waitlist_signups
    where confirmed_at is null
      and created_at < now() - interval '30 days'
    returning 1
  )
  select count(*)::integer from deleted;
$$;

revoke all on function public.waitlist_delete_unconfirmed() from public, anon, authenticated;

create extension if not exists pg_cron with schema pg_catalog;

-- cron.schedule upserts by job name, so re-running the migration is safe
select cron.schedule(
  'waitlist-delete-unconfirmed',
  '15 3 * * *',
  'select public.waitlist_delete_unconfirmed()'
);
