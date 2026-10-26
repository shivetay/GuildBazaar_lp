-- Double opt-in for the waitlist: consent record + e-mail confirmation.
-- Tokens are issued and checked only by the server with the secret key
-- (src/lib/waitlist-confirmation.ts); the public key can neither set nor read them.
-- Additive: the currently deployed code keeps inserting the same columns.

alter table public.waitlist_signups
  add column if not exists consent_version text,
  add column if not exists consent_at timestamptz,
  add column if not exists confirm_token_hash text,
  add column if not exists confirm_sent_at timestamptz,
  add column if not exists confirmed_at timestamptz;

alter table public.waitlist_signups
  drop constraint if exists waitlist_signups_consent_version_len;
alter table public.waitlist_signups
  add constraint waitlist_signups_consent_version_len
    check (consent_version is null or char_length(consent_version) <= 32);

create unique index if not exists waitlist_signups_confirm_token_hash_unique
  on public.waitlist_signups (confirm_token_hash);

-- consent_at is the server clock at insert time, never a client-supplied value
create or replace function public.waitlist_signups_set_consent_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.consent_at := case when new.consent_version is not null then now() end;
  return new;
end;
$$;

revoke all on function public.waitlist_signups_set_consent_at() from public, anon, authenticated;

drop trigger if exists waitlist_signups_set_consent_at on public.waitlist_signups;
create trigger waitlist_signups_set_consent_at
  before insert on public.waitlist_signups
  for each row execute function public.waitlist_signups_set_consent_at();

-- Public roles may only insert the form fields, not token / confirmation columns
revoke insert on public.waitlist_signups from anon, authenticated;
grant insert (
  name, email, role, message, locale,
  utm_source, utm_medium, utm_campaign, referrer,
  consent_version
) on public.waitlist_signups to anon, authenticated;
