"use server";
import { deleteSession } from "./session/session";

export async function logout(state, formData) {
  await deleteSession();
}