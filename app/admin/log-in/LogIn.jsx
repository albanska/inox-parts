"use client";

import Image from "next/image";
import bgImg from "@/public/inox/footer/02.jpg";
import logo from "@/public/inox/logoInox.svg";
import LoginForm from "@/app/components/admin/login/LoginForm.jsx";

function LogIn() {
  return (
    <div className="w-full h-screen overflow-hidden flex justify-center items-center relative">
      <div className="h-full flex-2/3 relative bgColor">
        <Image
          src={bgImg}
          alt="bgimg"
          className="size-full object-cover object-left mix-blend-multiply"
        />
      </div>
      <div className="bg-[#fefefe] h-full flex-1/3 flex flex-col gap-4 justify-center items-center px-14">
        <div className="mb-4">
          <Image src={logo} alt="logo" />
        </div>
        <LoginForm />
      </div>
    </div>
  );
}

export default LogIn;
