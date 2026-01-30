import FormWrapper from "@/app/components/admin/form/FormWrapper";
import Nav from "@/app/components/admin/Nav";
import { addData } from "@/lib/server/addData";
import { verifySession } from "@/lib/session/session";
import { redirect } from "next/navigation";

async function page() {
  const isLoggedIn = await verifySession();

  if (!isLoggedIn) {
    redirect("/log-in");
  }

  async function add(data) {
    "use server";
    const addedData = await addData(data);
  }
  return (
    <div className="shrink-0 flex-1 overflow-hidden h-dvh flex">
      <FormWrapper addData={add} />
    </div>
  );
}

export default page;