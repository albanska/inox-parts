import { verifySession } from "@/lib/session/session";

import { redirect } from "next/navigation";

import Login from "./LogIn"

async function page() {
  const isLoggedIn = await verifySession();

  if (isLoggedIn) {
    redirect("/admin");
  }

  return (
    <Login />
  );
}

export default page;
