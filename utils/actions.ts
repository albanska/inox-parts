"use server";

import { utapi } from "@/lib/server/uploadthing";

export async function deleteFile(formData: FormData) {
  const key = formData.get("key") as string;
  if (!key) return;

  try {
    await utapi.deleteFiles(key);
  } catch (error) {
    console.error("Failed to delete file:", error);
  }
}
