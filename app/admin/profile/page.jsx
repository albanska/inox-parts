import Profile from "@/app/components/profile/Profile";
import { verifySession } from "@/lib/session/session";
import Team from "@/app/components/admin/team/Team";
import { getMembers } from "@/lib/supabase-server/getMembers";


async function page() {
  const session = await verifySession();
  const team = await getMembers();

  const userId = session?.session?.userId;
  const getUser = team.find((member) => member.id === userId);

  const user = {
    id: getUser.id,
    name: getUser.fullname,
    email: getUser.email,
    status: getUser.status,
  };

  const teamMembers = team.filter(obj => obj.id !== getUser.id);


  return (
    <div className="shrink-0 flex-1 pt-5 px-5">
      <Profile user={user} />
      <Team team={teamMembers} status={user.status} />
    </div>
  );
}

export default page;
