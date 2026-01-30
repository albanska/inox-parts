"use client";

import { Edit } from "lucide-react";
import React, { useState } from "react";
import { updateUser } from "@/lib/updateInfo";

import EditAccountForm from "@/app/components/admin/form/EditAccountForm";

function Profile({ user }) {
  const [isAccEditOpen, setIsAccEditOpen] = useState(false);
  return (
    <div>
      <div>
        <h2 className="text-[25px] font-semibold tracking-wide leading-7">
          Profile
        </h2>
        <p className="leading-4 text-[#858688] text-sm font-bold">
          Manage your account
        </p>
      </div>
      <div className="w-[100%] bg-black/30 h-[1px] mx-auto mt-5 shadow-sm" />
      <div className="mt-3">
        <h2 className="font-bold tracking-wider">Your Account Information</h2>
        <div className="flex items-baseline gap-15">
          <div className="flex-1/2 pt-3 relative h-[120px]">
            <h2 className="font-bold tracking-wider">Account</h2>
            <div className="flex items-center gap-2 px-3 pb-1">
              <div className="w-[100px]">Full Name:</div>
              <div className="text-[#858688]">{user.name}</div>
            </div>
            <div className="flex items-center gap-2 px-3 pb-1">
              <div className="w-[100px]">Email:</div>
              <div className="text-[#858688]">{user.email}</div>
            </div>
            <div className="flex items-center gap-2 px-3 pb-1">
              <div className="w-[100px]">Acc. Status:</div>
              <div className="text-[#858688] capitalize">
                {user.status === "main" ? "Admin" : "Support"}
              </div>
            </div>
            <button
              className="absolute bottom-0 right-0 w-[60px] h-[30px] flex justify-center items-center rounded-sm bg-green-500/20 shadow-xl hover:scale-105 transition-all"
              onClick={() => setIsAccEditOpen(true)}
            >
              <div className="w-[40px]">
                <Edit className="w-full text-green-600" />
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="w-[100%] bg-black/30 h-[1px] mx-auto mt-5 shadow-sm" />
      {isAccEditOpen && (
        <EditAccountForm
          id={user.id}
          fullName={user.name}
          email={user.email}
          status={user.status}
          close={() => setIsAccEditOpen(false)}
          actionF={updateUser}
        />
      )}
    </div>
  );
}

export default Profile;
