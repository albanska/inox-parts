import React from "react";
import { verifySession } from "@/lib/session/session";
import { redirect } from "next/navigation";
import Produkte from "@/app/components/Produkte";

async function page() {
  const isLoggedIn = await verifySession();

  if (!isLoggedIn) {
    redirect("admin/log-in");
  }

  return (
    <div className="shrink-0 flex-1 pt-10 overflow-y-scroll">
      <Produkte isAdmin={true} />
    </div>
  );
}

export default page;
