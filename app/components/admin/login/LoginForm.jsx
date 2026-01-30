"use client";

import { useActionState, useEffect } from "react";
import { loginAction } from "@/lib/login";
import { useRouter } from "next/navigation";

function LoginForm() {
  const [state, action] = useActionState(loginAction);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push("/admin");
    }
  }, [state, router]);

  return (
    <form action={action} className="w-full">
      <div className="mb-6">
        <label htmlFor="email" className="text-sm font-semibold">
          Email:
        </label>
        <input
          type="text"
          id="email"
          name="email"
          className="block border-[1px] w-full h-9 rounded-sm border-[#259ed3]/40 focus:border-[#259ed3] focus:border-[2px] focus:outline-0 transition-all ps-4 mt-1.5 shadow-md"
          placeholder="Email"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="text-sm font-semibold">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="block border-[1px] w-full h-9 rounded-sm border-[#259ed3]/40 focus:border-[#259ed3] focus:border-[2px] focus:outline-0 transition-all ps-4 mt-1.5 shadow-md"
          placeholder="• • • • • •"
          required
        />
      </div>
      <div className="w-full flex justify-center mt-10">
        <button className="w-full h-9 bg-[#259ed3] text-white font-semibold tracking-wide rounded-sm hover:bg-[#259ed3]/80 transition-all shadow-lg">
          Log in
        </button>
      </div>
      {state && state.error && (
        <p className="mt-1 text-[14px] text-red-500 font-semibold text-right">
          {state.error}
        </p>
      )}
    </form>
  );
}

export default LoginForm;
