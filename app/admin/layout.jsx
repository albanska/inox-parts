import TestNav from "../components/admin/TestNav";
import { verifySession } from "@/lib/session/session";
import getDataSupa, { getUserBasedOnIdSupa } from "@/lib/supabase-server/createSupaBaseClient";

export const metadata = {
  title: "INOXPARTS - Admin",
  description: "Admin Dashboard for INOXPARTS"
};

export default async function RootLayout({ children }) {
  const session = await verifySession();
  const userId = session?.session?.userId;

  const user = await getUserBasedOnIdSupa(userId);

  if (user && user.code === "22P02") {
    console.log("User is not logged in")
  }

  const { data } = await getDataSupa()

  const arr = JSON.parse(data[0].data)
  return (
    <div className="flex">
      <TestNav fullName={user.fullname} length={arr.length} />
      {children}
    </div>
  );
}
