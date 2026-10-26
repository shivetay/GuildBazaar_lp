# Supabase migrations

| Env  | Project ref            | Used by                      |
| ---- | ---------------------- | ---------------------------- |
| dev  | `pbunolpbxqcfwamlnzlm` | `.env.local`, Vercel Preview |
| prod | `gfbvjmghrcbatblqedol` | Vercel Production            |

`supabase/migrations/` is the source of truth. Never change the schema by hand in
the dashboard; if you must, capture it with `supabase db diff` and commit it.

## Pipeline (`.github/workflows/supabase-migrations.yml`)

Triggers only on changes to `supabase/migrations/**` or `supabase/config.toml`.

- **Pull request:** applies all migrations to a fresh local Postgres and lints it,
  then `db push` to **dev** and `db push --dry-run` against **prod** (shows what the
  merge will apply).
- **Push to `main`:** `db push` to **prod**, behind the `production` environment.
- **Manual:** `workflow_dispatch` on `main` re-runs the prod push.

### Required GitHub settings

Secrets (Settings → Secrets and variables → Actions):

- `SUPABASE_ACCESS_TOKEN`: personal access token (supabase.com/dashboard/account/tokens)
- `SUPABASE_DB_PASSWORD_DEV`, `SUPABASE_DB_PASSWORD_PROD`: database passwords

Environment `production` (Settings → Environments): add yourself as a required
reviewer so every prod push waits for approval.

## Writing a migration

```bash
npx supabase migration new <name>   # creates supabase/migrations/<timestamp>_<name>.sql
npx supabase db start               # local Postgres (needs Docker), applies migrations
```

Rules:

- Keep migrations backward compatible (add first, remove in a later release). Vercel
  deploys the code and the pipeline pushes the migration at the same time on merge.
- Never edit or rename a migration that already ran on prod; add a new one.
- Prefer idempotent SQL (`if not exists`, `drop ... if exists`).
