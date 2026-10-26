-- Flood brake for the public waitlist form: caps total signups per time window.
-- Stores no IP or other extra personal data. Raises SQLSTATE GB429, which
-- src/app/actions/waitlist.ts maps to "rate_limited".

create index if not exists waitlist_signups_created_at_idx
  on public.waitlist_signups (created_at);

-- security definer: anon has no SELECT on the table, but the count must see all rows
create or replace function public.waitlist_signups_throttle()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if (select count(*) from public.waitlist_signups
      where created_at > now() - interval '1 minute') >= 10
  or (select count(*) from public.waitlist_signups
      where created_at > now() - interval '1 hour') >= 100 then
    raise exception 'waitlist signup rate limit exceeded'
      using errcode = 'GB429';
  end if;
  return new;
end;
$$;

revoke all on function public.waitlist_signups_throttle() from public, anon, authenticated;

drop trigger if exists waitlist_signups_throttle on public.waitlist_signups;
create trigger waitlist_signups_throttle
  before insert on public.waitlist_signups
  for each row execute function public.waitlist_signups_throttle();
