"use server";

import { after } from "next/server";
import { type Attribution, sanitizeAttribution } from "@/lib/attribution";
import { CONSENT_VERSION, issueConfirmation } from "@/lib/waitlist-confirmation";
import { ALLOWED_ROLES, WAITLIST_PLACEMENTS } from "@/utils/constants";
import { createAdminClient } from "@/utils/supabase/admin";

type Role = (typeof ALLOWED_ROLES)[number];
type Placement = (typeof WAITLIST_PLACEMENTS)[number];

export type WaitlistResult =
	| { ok: true }
	| { ok: false; error: "validation" | "consent" | "rate_limited" | "server" };

// Humans need a few seconds to fill the form; bots usually submit instantly
const MIN_FILL_MS = 3000;

function isRole(value: string): value is Role {
	return (ALLOWED_ROLES as readonly string[]).includes(value);
}

function toPlacement(value: string | undefined): Placement | null {
	return (WAITLIST_PLACEMENTS as readonly string[]).includes(value ?? "")
		? (value as Placement)
		: null;
}

export async function submitWaitlist(input: {
	name?: string;
	email: string;
	role: string;
	message?: string;
	locale?: string;
	website?: string;
	startedAt?: number;
	attribution?: Attribution;
	consent?: boolean;
	placement?: string;
}): Promise<WaitlistResult> {
	// Honeypot filled or form submitted too fast: pretend success, store nothing
	const elapsed = Date.now() - (input.startedAt ?? 0);
	if (input.website || !Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) {
		return { ok: true };
	}

	// name is optional since the short form (#51)
	const name = input.name?.trim() || null;
	const email = input.email?.trim().toLowerCase() ?? "";
	const role = input.role?.trim() ?? "";
	const message = input.message?.trim() || null;
	const locale = input.locale?.trim() || null;

	if (
		(name !== null && (name.length < 2 || name.length > 120)) ||
		email.length < 3 ||
		email.length > 254 ||
		!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
		!isRole(role) ||
		(message !== null && message.length > 2000)
	) {
		return { ok: false, error: "validation" };
	}

	if (input.consent !== true) {
		return { ok: false, error: "consent" };
	}

	try {
		// Server-only insert: the table is closed to the publishable key, so the
		// checks above cannot be skipped and duplicates cannot be probed directly.
		const supabase = createAdminClient();
		if (!supabase) {
			console.error("waitlist insert skipped: SUPABASE_SECRET_KEY not set");
			return { ok: false, error: "server" };
		}
		const source = sanitizeAttribution(input.attribution);

		const { error } = await supabase.from("waitlist_signups").insert({
			name,
			email,
			role,
			message,
			locale,
			utm_source: source.utmSource ?? null,
			utm_medium: source.utmMedium ?? null,
			utm_campaign: source.utmCampaign ?? null,
			referrer: source.referrer ?? null,
			consent_version: CONSENT_VERSION,
			placement: toPlacement(input.placement),
		});

		// 23505 = already signed up: answer like a new signup (no e-mail enumeration)
		// and re-send the link if the address is still unconfirmed
		if (error && error.code !== "23505") {
			// raised by the waitlist_signups_throttle trigger
			if (error.code === "GB429") {
				return { ok: false, error: "rate_limited" };
			}
			console.error("waitlist insert failed", error.message);
			return { ok: false, error: "server" };
		}

		// Sent after the response, so the answer time does not tell whether the
		// address was new, unconfirmed or already confirmed.
		after(async () => {
			try {
				await issueConfirmation(email);
			} catch (err) {
				// the signup is saved; the user can re-submit to get a new link
				console.error("waitlist confirmation unexpected error", err);
			}
		});

		return { ok: true };
	} catch (err) {
		console.error("waitlist unexpected error", err);
		return { ok: false, error: "server" };
	}
}
