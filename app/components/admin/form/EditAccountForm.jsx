import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
function EditAccountForm({
  id,
  fullName = null,
  email,
  close,
  actionF,
  status,
}) {
  const [state, action] = useActionState(actionF);
  const [changePass, setChangePass] = useState(false);
  const router = useRouter()

  useEffect(() => {
    if (state && state.success) {
      close();
      router.refresh()
    }
  }, [state]);

  return (
    <div className="absolute w-full h-full inset-0 flex justify-center items-center bg-[#202020]/30 z-20">
      <div className="w-[500px] h-fit rounded-lg bg-[#202020] text-[#fefefe] px-6 py-4 shadow-xl">
        <div className="w-full flex justify-end items-center">
          <button className="cursor-pointer -scroll-mr-1.5" onClick={close}>
            <X />
          </button>
        </div>
        <div className="w-full ">
          <h2 className="text-[18px] font-semibold tracking-wide">
            Edit Your Account
          </h2>
        </div>
        {state && (
          <h2 className="text-red-500/50 hover:text-[#259ed3] transition-all text-xs  leading-2 text-right font-semibold">
            {state.error || state[0]}
          </h2>
        )}
        <form action={action}>
          <div className="w-full mt-4 mb-8 flex gap-2">
            <div className="grow">
              <input
                type="text"
                name="id"
                id="id"
                className="hidden"
                defaultValue={id}
              />
              {fullName && (
                <div className="flex justify-end flex-col mb-2">
                  <label
                    htmlFor="fullName"
                    className="text-[14px] font-semibold"
                  >
                    Full Name:
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    className="focus:outline-0 focus:border-b-[2px] focus:border-b-[#4cc2ff] bg-[#1f1f1f] rounded-md border border-[#282828] h-8 ps-2 text-[12px] tracking-wide transition-all"
                    placeholder="Full Name"
                    defaultValue={fullName}
                  />
                </div>
              )}
              <div className="flex justify-end flex-col mb-2">
                <label htmlFor="email" className="text-[14px] font-semibold">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="focus:outline-0 focus:border-b-[2px] focus:border-b-[#4cc2ff] bg-[#1f1f1f] rounded-md border border-[#282828] h-8 ps-2 text-[12px] tracking-wide transition-all"
                  placeholder="Email"
                  defaultValue={email}
                />
              </div>
              {status === "main" && (
                <div className="flex justify-end flex-col mb-2">
                  <label htmlFor="role" className="text-[14px] font-semibold">
                    Role:
                  </label>
                  <select
                    name="role"
                    id="role"
                    className="focus:outline-0 focus:border-b-[2px] focus:border-b-[#4cc2ff] bg-[#1f1f1f] rounded-md border border-[#282828] h-8 ps-2 text-[12px] tracking-wide transition-all"
                    defaultValue={status}
                  >
                    <option value="main">Admin</option>
                    <option value="support">Support</option>
                  </select>
                </div>
              )}

              <div className="flex justify-end flex-col mb-2">
                <label
                  htmlFor="oPassword"
                  className="text-[14px] font-semibold"
                >
                  Current Password:
                </label>
                <input
                  type="password"
                  name="oPassword"
                  id="oPassword"
                  className="focus:outline-0 focus:border-b-[2px] focus:border-b-[#4cc2ff] bg-[#1f1f1f] rounded-md border border-[#282828] h-8 ps-2 text-[12px] tracking-wide transition-all"
                  placeholder={`Current Password`}
                />
              </div>

              {fullName && changePass && (
                <div className="flex justify-end flex-col mb-2">
                  <label
                    htmlFor="nPassword"
                    className="text-[14px] font-semibold"
                  >
                    New Password:
                  </label>
                  <input
                    type="password"
                    name="nPassword"
                    id="nPassword"
                    className="focus:outline-0 focus:border-b-[2px] focus:border-b-[#4cc2ff] bg-[#1f1f1f] rounded-md border border-[#282828] h-8 ps-2 text-[12px] tracking-wide transition-all"
                    placeholder="New Password"
                  />
                </div>
              )}
              {fullName && changePass && (
                <div className="flex justify-end flex-col mb-2">
                  <label
                    htmlFor="cPassword"
                    className="text-[14px] font-semibold"
                  >
                    Confirm Password:
                  </label>
                  <input
                    type="password"
                    name="cPassword"
                    id="cPassword"
                    className="focus:outline-0 focus:border-b-[2px] focus:border-b-[#4cc2ff] bg-[#1f1f1f] rounded-md border border-[#282828] h-8 ps-2 text-[12px] tracking-wide transition-all"
                    placeholder="Confirm Password"
                  />
                </div>
              )}
              {fullName && (
                <button
                  className="text-[#259ed3]/50 hover:text-[#259ed3] transition-all text-xs underline leading-2"
                  onClick={() => setChangePass(!changePass)}
                  type="button"
                >
                  {changePass ? "Do not Change" : "Change"} Password?
                </button>
              )}
            </div>
          </div>
          <div className="w-full flex justify-end mb-4">
            <button className="w-[200px] h-8 rounded-lg bg-[#2d2d2d] hover:bg-[#2573d3] transition-all text-[14px] tracking-wider">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditAccountForm;
