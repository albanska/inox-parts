"use client";

import { logout } from "@/lib/logout";
import {
  Barcode,
  ChartNoAxesColumnDecreasingIcon,
  LogOut,
  Plus,
  User,
} from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

function TestNav({ fullName, length }) {
  const pathName = usePathname();

  if (pathName === "/admin/log-in") {
    return;
  }
  return (
    <div className="h-screen w-[280px] border-r border-black/30 shadow-sm">
      <div className="w-full h-18 border-b border-black/30 shadow-sm flex justify-between items-center pl-2">
        <div className="flex items-center gap-1">
          <a
            className="size-12 rounded-lg flex justify-center items-center bgColor shadow-lg hover:scale-105 transition-all"
            href="/"
          >
            <ChartNoAxesColumnDecreasingIcon className="size-8 text-white rotate-y-180" />
          </a>
          <div>
            <h2 className="leading-4 font-bold tracking-wide textColor text-sm">
              INOXPARTS
            </h2>
            <h2 className="leading-4 font-semibold text-sm">{fullName}</h2>
          </div>
        </div>

        <form
          action={logout}
          className="h-full flex justify-center items-center"
        >
          <button
            className="w-full h-full px-2 cursor-pointer group"
            type="submit"
          >
            <LogOut
              className="group-hover:text-red-500 group-hover:scale-105 transition-all"
              strokeWidth={"2.5px"}
            />
          </button>
        </form>
      </div>
      <div className="w-full border-b border-black/30 shadow-sm">
        <div className="px-2">
          <div className="mt-8 mb-4">
            <div>
              <h2 className={`leading-4 font-semibold text-[#858688]`}>Menu</h2>
            </div>
          </div>
        </div>
        <a
          className="flex justify-between px-2 items-center mb-1 hover:scale-101 transition-all"
          href="/admin"
        >
          <div className="flex items-center gap-1 h-9">
            <div>
              <Barcode
                className={`size-6 ${
                  pathName === "/admin" ? "textColor" : "text-[#a8a9ac]"
                }`}
              />
            </div>
            <div>
              <h2
                className={`leading-4 font-semibold ${
                  pathName === "/admin" ? "" : "text-[#a8a9ac]"
                } `}
              >
                Products
              </h2>
            </div>
          </div>
          <div className="size-6 rounded-md flex justify-center items-center bg-[#259ed3]/20">
            <h2 className="textColor font-extrabold text-sm">{length}</h2>
          </div>
        </a>
        <a
          className="flex justify-between px-2 items-center mb-8 hover:scale-101 transition-all"
          href="/admin/add-product"
        >
          <div className="flex items-center gap-1 h-9">
            <div>
              <Plus
                className={`size-6 ${
                  pathName === "/admin/add-product"
                    ? "textColor"
                    : "text-[#a8a9ac]"
                }`}
              />
            </div>
            <div>
              <h2
                className={`leading-4 font-semibold ${
                  pathName === "/admin/add-product" ? "" : "text-[#a8a9ac]"
                } `}
              >
                Add Product
              </h2>
            </div>
          </div>
        </a>
      </div>
      <div className="w-full border-b border-black/30 shadow-sm ">
        <div className="px-2">
          <div className="mt-8 mb-4">
            <div>
              <h2 className={`leading-4 font-semibold text-[#858688]`}>
                Settings
              </h2>
            </div>
          </div>
        </div>
        <a
          className="flex justify-between px-2 items-center mb-1 hover:scale-101 transition-all"
          href="/admin/profile"
        >
          <div className="flex items-center gap-1 h-9">
            <div>
              <User
                className={`size-6 ${
                  pathName === "/admin/profile" ? "textColor" : "text-[#a8a9ac]"
                }`}
              />
            </div>
            <div>
              <h2
                className={`leading-4 font-semibold ${
                  pathName === "/admin/profile" ? "" : "text-[#a8a9ac]"
                } `}
              >
                Profile
              </h2>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}

export default TestNav;
