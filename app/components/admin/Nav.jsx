"use client";

import { logout } from "@/lib/logout";
import { LogOut, Settings } from "lucide-react";

function Nav() {
  return (
    <div className="h-screen w-[200px]">
      <div className="h-full w-full relative">
        <div className="absolute bottom-0 w-full h-10 flex justify-end gap-4 items-center">
          <div className="border size-10 rounded-t-lg hover:scale-110 transition-all">
            <a href="/" className="size-full flex justify-center items-center">
              <Settings />
            </a>
          </div>
          <form
            action={logout}
            className="border size-10 rounded-t-lg hover:scale-110 transition-all"
          >
            <button
              className="size-full flex justify-center items-center cursor-pointer "
              type="submit"
            >
              <LogOut />
            </button>
          </form>
        </div>

        <div className="w-full h-18 flex justify-center items-center bg-[#259ed3]/50 rounded-br-md">
          <h2 className="uppercase tracking-wider text-2xl font-semibold text-[#fefefe] ">
            Admin
          </h2>
        </div>
        <div className="w-full">
          <div className="pt-2 bg-blue-100">
            <a
              href="/admin"
              className=" w-full flex h-10 mb-2 justify-center items-center text-xl font-semibold tracking-wide text-[#fefefe] bg-[#259fd3] hover:bg-[#259fd3]/40 transition-all rounded-r-md hover:rounded-r-none"
            >
              Produkte
            </a>
            <a
              href="/admin/add-product"
              className=" w-full flex h-10 mb-2 justify-center items-center text-xl font-semibold tracking-wide text-[#fefefe] bg-[#259fd3] hover:bg-[#259fd3]/40 transition-all rounded-r-md hover:rounded-r-none"
            >
              Add Product
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
