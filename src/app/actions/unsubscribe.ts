"use server";

import { type UnsubscribeState, unsubscribeSignup } from "@/lib/waitlist-confirmation";

export async function unsubscribeWaitlist(token: string): Promise<UnsubscribeState> {
	return unsubscribeSignup(token);
}
