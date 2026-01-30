"use client";

import { Plus } from "lucide-react";
import TeamMembers from "./TeamMembers";
import Form from "./Form";
import { useState } from "react";
import { insertMember, updateUser } from "@/lib/updateInfo";

function Team({ team, status }) {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isInserting, setIsInserting] = useState(false);

  const headerBoxClass =
    "font-bold tracking-wider border-r w-[200px] text-[#858688] text-center border-r-black/30 h-[40px] flex justify-center items-center";

  return (
    <div>
      {selectedUserId || isInserting ? (
        <Form
          id={selectedUserId}
          team={team}
          close={() => {
            setSelectedUserId(null);
            setIsInserting(false);
          }}
          actionState={selectedUserId ? updateUser : insertMember}
        />
      ) : null}

      <div className="mt-3">
        <h2 className="font-bold tracking-wider">Your Team Members</h2>
        <div className="border border-black/30 w-fit mt-4 rounded-md  shadow-md relative">
          {status === "main" && (
            <button
              className="absolute size-[35px] bg-green-500/20 left-full ml-2 rounded-md shadow-md hover:bg-green-500/30 hover:scale-105 transition-all flex justify-center items-center group "
              onClick={() => setIsInserting(true)}
            >
              <Plus className="text-green-700 size-[25px] group-hover:scale-105" />
            </button>
          )}

          <div className="flex items-center justify-center border-b border-black/30 ">
            <h2 className={`${headerBoxClass} !w-[60px]`}>Id</h2>
            <h2 className={headerBoxClass}>Full Name</h2>
            <h2 className={`${headerBoxClass} !w-[300px]`}>Email</h2>
            {status === "main" && <h2 className={headerBoxClass}>Password</h2>}

            <h2 className={headerBoxClass}>Role</h2>
            {status === "main" && (
              <h2 className={`${headerBoxClass} !w-[150px] !border-0`}>
                Action
              </h2>
            )}
          </div>
          {team.length === 0 ? (
            <div className="text-center text-gray-500 py-2">
              No team members found.
            </div>
          ) : (
            <div>
              {team.map((member, index) => (
                <TeamMembers
                  key={index}
                  count={index + 1}
                  id={member.id}
                  name={member.fullname}
                  email={member.email}
                  password={member.password}
                  role={member.status}
                  setSelectedUserId={setSelectedUserId}
                  status={status}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Team;
