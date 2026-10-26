-- Signup source: UTM tags and external referrer host (src/lib/attribution.ts).
-- Additive and nullable, so the currently deployed code keeps working.

alter table public.waitlist_signups
  add column if not exists utm_source text,
  add column if not exists utm_medium text,
  add column if not exists utm_campaign text,
  add column if not exists referrer text;

alter table public.waitlist_signups
  drop constraint if exists waitlist_signups_attribution_len;
alter table public.waitlist_signups
  add constraint waitlist_signups_attribution_len check (
    coalesce(char_length(utm_source), 0) <= 200
    and coalesce(char_length(utm_medium), 0) <= 200
    and coalesce(char_length(utm_campaign), 0) <= 200
    and coalesce(char_length(referrer), 0) <= 200
  );
