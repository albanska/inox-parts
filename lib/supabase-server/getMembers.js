"use server";

import { getMembersSupa } from "@/lib/supabase-server/createSupaBaseClient";

export async function getMembers() {
  const team = await getMembersSupa();

  return team;
}
