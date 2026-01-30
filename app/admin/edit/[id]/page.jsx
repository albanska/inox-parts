import FormWrapper from "@/app/components/admin/form/FormWrapper";
import { getDataBasedOnId } from "@/lib/server/getData";
import { verifySession } from "@/lib/session/session";
import { redirect } from "next/navigation";

async function page({ params }) {
  const isLoggedIn = await verifySession();

  if (!isLoggedIn) {
    redirect("/log-in");
  }
  const { id } = await params;

  const { index, product } = await getDataBasedOnId(id);


  return (
    <div className="shrink-0 flex-1 overflow-hidden h-dvh flex">
      <FormWrapper isEdit={true} id={index} editProduct={product} />
    </div>
  );
}

export default page;
