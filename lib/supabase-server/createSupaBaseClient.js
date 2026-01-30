import { createClient } from "@supabase/supabase-js";
import { decrypt } from "../utils/crypto";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://cllflpbxueepywvkouue.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsbGZscGJ4dWVlcHl3dmtvdXVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4MTI2NDgsImV4cCI6MjA2NDM4ODY0OH0.OhwG3ClOL2qWzyj6iKWbT7z-JKDq_2AbrdN9vlQCK1A"
);

export default async function getDataSupa() {
  const { data, error } = await supabase.from("items").select();

  return { data, error };
}

export async function loginUserSupa(data) {
  try {
    const { data: rows, error } = await supabase
      .from("admin")
      .select("*")
      .eq("email", data.email.trim())
      .single(); // fetch only one record

    if (error || !rows) {
      return { error: "Invalid email or password." };
    }

    const decryptedPassword = decrypt(rows.password);

    if (!decryptedPassword || decryptedPassword !== data.password) {
      return { error: "Invalid email or password." };
    }

    return { success: true, id: rows.id };
  } catch (error) {
    console.error("Login error:", error);
    return { error: "Database error during login." };
  }
}

export async function getUserBasedOnIdSupa(id) {
  const { data, error } = await supabase
    .from("admin")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return { error: "Invalid user ID." };
  }

  return data;
}

export async function addDataSupa(id, newArr) {
  const { data, error } = await supabase
    .from("items")
    .update({ data: JSON.stringify(newArr) })
    .eq("id", id);

  if (error) {
    return { error: error };
  }
}

export async function getMembersSupa() {
  const { data: rows, error } = await supabase.from("admin").select("*");

  if (error) {
    throw new Error("Error fetching members: " + error.message);
  }

  if (!rows || rows.length === 0) {
    throw new Error("No members found");
  }

  const members = rows.map((row) => ({
    ...row,
    password: decrypt(row.password), // decrypt the password like in the original
  }));

  return members;
}

export async function updateUserBasedOnIdSupa(data) {
  try {
    const { error, data: updatedRows } = await supabase
      .from("admin")
      .update({
        fullname: data.fullName,
        email: data.email,
        password: data.password,
        status: data.role, // assuming "status" in DB = "role" in UI
      })
      .eq("id", data.id)
      .select(); // optional: return updated row(s)

    if (error) {
      console.error("Supabase update error:", error);
      return { error: "Supabase error during user update." };
    }

    return {
      success: true,
      message: "User updated successfully",
      updated: updatedRows,
    };
  } catch (err) {
    console.error("Update user error:", err);
    return { error: "Unexpected error during user update." };
  }
}

export async function insertUserSupa(data) {
  try {
    const { data: insertedData, error } = await supabase
      .from("admin")
      .insert([
        {
          fullname: data.fullName,
          email: data.email,
          password: data.password,
          status: data.role,
        },
      ])
      .select(); // to get the inserted rows back

    if (error) {
      console.error("Supabase insert error:", error);
      return { error: "Supabase error during user insertion." };
    }

    // insertedData is an array of inserted rows, typically with id
    return { success: true, insertedUser: insertedData[0] };
  } catch (error) {
    console.error("Insert user error:", error);
    return { error: "Unexpected error during user insertion." };
  }
}

export async function deleteUserSupa(id) {
  try {
    const { data, error, count } = await supabase
      .from("admin")
      .delete()
      .eq("id", id)
      .select(); // optionally select deleted rows (can remove if not needed)

    if (error) {
      console.error("Supabase delete error:", error);
      return { error: "Supabase error during user deletion." };
    }

    if (!data || data.length === 0) {
      return { error: `No user found with id ${id}` };
    }

    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    console.error("Delete user error:", error);
    return { error: "Unexpected error during user deletion." };
  }
}
