-- Shorter waitlist form (#51): name becomes optional, a role for newcomers,
-- and which form on the page the signup came from (hero / bottom section).
-- Additive and relaxing only, so the currently deployed code keeps working.

alter table public.waitlist_signups
  alter column name drop not null;

alter table public.waitlist_signups
  drop constraint if exists waitlist_signups_name_len;
alter table public.waitlist_signups
  add constraint waitlist_signups_name_len
    check (name is null or char_length(trim(name)) between 2 and 120);

-- keep in sync with ALLOWED_ROLES in src/utils/constants.ts
alter table public.waitlist_signups
  drop constraint if exists waitlist_signups_role_allowed;
alter table public.waitlist_signups
  add constraint waitlist_signups_role_allowed
    check (role in (
      'newcomer',
      'participant',
      'reconstructor',
      'larp',
      'cosplayer',
      'artisan',
      'vendor',
      'association',
      'organizer'
    ));

-- keep in sync with WAITLIST_PLACEMENTS in src/utils/constants.ts
alter table public.waitlist_signups
  add column if not exists placement text;
alter table public.waitlist_signups
  drop constraint if exists waitlist_signups_placement_allowed;
alter table public.waitlist_signups
  add constraint waitlist_signups_placement_allowed
    check (placement is null or placement in ('hero', 'section'));

-- Column-level INSERT for public roles (see 20261026110000), plus the new column
grant insert (placement) on public.waitlist_signups to anon, authenticated;
