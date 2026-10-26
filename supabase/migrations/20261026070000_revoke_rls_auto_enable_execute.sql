-- rls_auto_enable() is the platform's event-trigger function that turns on RLS for
-- new public tables. It is SECURITY DEFINER and was executable via /rest/v1/rpc by
-- anon/authenticated (advisor lints 0028/0029). Event triggers fire regardless of
-- EXECUTE, so revoking it does not change behaviour.

do $$
begin
  if to_regprocedure('public.rls_auto_enable()') is not null then
    revoke execute on function public.rls_auto_enable() from public, anon, authenticated;
  end if;
end;
$$;
