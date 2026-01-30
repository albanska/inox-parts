"use server";

import { decrypt, encrypt } from "./utils/crypto";
import {
  getUserBasedOnIdSupa,
  insertUserSupa,
  updateUserBasedOnIdSupa,
} from "./supabase-server/createSupaBaseClient";

export async function updateUser(state, formData) {
  const fullName = formData.get("fullName");
  const email = formData.get("email");
  const password = formData.get("oPassword");
  const id = formData.get("id");
  const newPassword = formData.get("nPassword");
  const passwordConfirm = formData.get("cPassword");
  const role = formData.get("role");

  const errors = [];

  if (typeof fullName !== "string" || fullName.trim() === "") {
    errors.push("Full name is required.");
  }

  if (typeof email !== "string" || email.trim() === "") {
    errors.push("Email is required.");
  }

  if (typeof password !== "string" || password.trim() === "") {
    errors.push("Current password is required.");
  }

  if (newPassword && newPassword !== passwordConfirm) {
    errors.push("New password and confirmation do not match.");
  }

  if (errors.length > 0) {
    return errors;
  }

  // Fetch current user to validate password
  const existingUser = await getUserBasedOnIdSupa(id);
  if (existingUser.error) {
    return { error: "User not found." };
  }

  if (password !== decrypt(existingUser.password)) {
    errors.push("Current password is incorrect");
  }

  if (errors.length > 0) {
    return errors;
  } else {
    const hashedPassword = newPassword
      ? encrypt(newPassword) // encrypt new password
      : existingUser.password; // keep existing password

    const data = {
      id: Number(id),
      fullName: fullName.trim(),
      email: email.trim(),
      password: hashedPassword,
      role,
    };

    const result = await updateUserBasedOnIdSupa(data);
    if (result.error) {
      return { error: result.error };
    } else {
      return { success: true, message: "User updated successfully" };
    }
  }
}

export async function insertMember(state, formData) {
  const fullName = formData.get("fullName");
  const email = formData.get("email");
  const role = formData.get("role");
  const password = formData.get("nPassword");
  const passwordConfirm = formData.get("cPassword");

  const errors = [];

  if (typeof fullName !== "string" || fullName.trim() === "") {
    errors.push("Full name is required.");
  }

  if (typeof email !== "string" || email.trim() === "") {
    errors.push("Email is required.");
  }

  if (typeof role !== "string" || role.trim() === "") {
    errors.push("Role is required.");
  }

  if (typeof password !== "string" || password.trim() === "") {
    errors.push("Password is required.");
  }

  if (password !== passwordConfirm) {
    errors.push("Password and confirmation do not match.");
  }

  if (errors.length > 0) {
    return errors;
  } else {
    const hashedPassword = encrypt(password.trim());

    const data = {
      fullName: fullName.trim(),
      email: email.trim(),
      password: hashedPassword,
      role: role.trim(),
    };

    const result = await insertUserSupa(data);

    if (result.error) {
      return { error: result.error };
    } else {
      return { success: true, message: "user inserted successfully" };
    }
  }
}