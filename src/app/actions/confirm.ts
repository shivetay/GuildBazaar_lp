"use server";

import { type ConfirmState, confirmSignup } from "@/lib/waitlist-confirmation";

export async function confirmWaitlist(token: string): Promise<ConfirmState> {
	return confirmSignup(token);
}
