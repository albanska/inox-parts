"use server";

import { createSession } from "./session/session";
import { loginUserSupa } from "./supabase-server/createSupaBaseClient";

export async function loginAction(state, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return { error: "Invalid form data." };
  }

  const result = await loginUserSupa({email, password})


  if (result?.success) {
    await createSession(result.id);
  }

  return result;
}
