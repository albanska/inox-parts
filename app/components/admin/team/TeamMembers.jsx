import { deleteUserSupa } from "@/lib/supabase-server/createSupaBaseClient";
import { Edit, Eye, EyeClosed, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function TeamMembers({
  count,
  id,
  name,
  email,
  password,
  role,
  setSelectedUserId,
  status,
}) {
  const [isPassVisible, setIsPassVisible] = useState(false);
  const router = useRouter()
  const headerBoxClassSmall =
    "font-semibold tracking-wide border-r w-[200px] border-r-black/30 h-[35px] flex justify-center items-center text-sm";

  const dotString = Array(password.length).fill("•").join(" ");

  function handleDelete() {
    const confirmDelete = confirm(
      `Are you sure you want to delete ${name}? This action cannot be undone.`
    );

    if (confirmDelete) {
      deleteUserSupa(id)
        .then((response) => {
          if (response.success) {
            alert(`${name} has been deleted successfully.`);
            router.refresh()
          } else {
            alert(`Failed to delete ${name}: ${response.error}`);
          }
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          alert(`An error occurred while deleting ${name}.`);
        });
    }
  }
  return (
    <div className="flex items-center justify-center border-b border-black/30 last:border-b-0">
      <h2 className={`${headerBoxClassSmall} !w-[60px]`}>{count}</h2>
      <h2 className={headerBoxClassSmall}>{name}</h2>
      <h2 className={`${headerBoxClassSmall} !w-[300px]`}>{email}</h2>
      {status === "main" && (
        <div className="w-[200px] relative">
          <h2 className={headerBoxClassSmall}>
            {isPassVisible ? password : dotString}
          </h2>
          <div className="absolute right-2 top-0 h-full flex justify-center items-center">
            <button
              className=" size-[25px] flex justify-center items-center bg-[#259ed3]/20 hover:bg-[#259ed3]/30 transition-all rounded-md shadow-sm hover:scale-105 group"
              onClick={() => setIsPassVisible(!isPassVisible)}
            >
              {isPassVisible ? (
                <Eye className="size-[18px] text-[#259ed3] group-hover:scale-105" />
              ) : (
                <EyeClosed className="size-[18px] text-[#259ed3] group-hover:scale-105" />
              )}
            </button>
          </div>
        </div>
      )}

      <h2 className={headerBoxClassSmall}>
        {role === "main" ? "Admin" : "Support"}
      </h2>
      {status === "main" && (
        <div className="w-[150px] flex justify-center items-center gap-4">
          <button
            className="size-[25px] flex justify-center items-center bg-[#259ed3]/20 hover:bg-[#259ed3]/30 transition-all rounded-md shadow-sm hover:scale-105 group"
            onClick={() => setSelectedUserId(id)}
          >
            <Edit className="size-[18px] text-[#259ed3] group-hover:scale-105" />
          </button>
          <button
            className="size-[25px] flex justify-center items-center bg-red-500/20 hover:bg-red-500/30 transition-all rounded-md shadow-sm hover:scale-105 group"
            onClick={handleDelete}
          >
            <X className="size-[18px] text-red-600 group-hover:scale-105" />
          </button>
        </div>
      )}
    </div>
  );
}

export default TeamMembers;
