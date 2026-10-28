// keep in sync with waitlist_signups_role_allowed in supabase/migrations
export const ALLOWED_ROLES = [
	"newcomer",
	"participant",
	"reconstructor",
	"larp",
	"cosplayer",
	"artisan",
	"vendor",
	"association",
	"organizer",
] as const;

// Which form on the landing page a signup came from
// keep in sync with waitlist_signups_placement_allowed in supabase/migrations
export const WAITLIST_PLACEMENTS = ["hero", "section"] as const;

export const DISCORD_URL = "https://discord.gg/FnJ8geS4u";
