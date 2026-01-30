import React from "react";
import { useRouter } from "next/navigation";

function ErrorState({ errorStatus }: any) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
    setTimeout(() => {
      location.reload();
    }, 100); 
  };
  return (
    <div className="h-fit mb-30 w-full flex justify-center  text-xl text-[#4a4e69] font-semibold">
      <div className="text-center">
        <h1 className="text-5xl text-red-500 animate-pulse mb-4">
          {errorStatus.status}
        </h1>
        <h2>
          Produkt mit ID:{" "}
          <span className="font-bold mx-0.5 textColor">{errorStatus.id}</span>{" "}
          wurde nicht gefunden.
        </h2>
        <div>
          <button className="px-4 py-2 text-base mt-10 text-white bg-[#4a4e69] rounded-xl hover:scale-105 hover:bg-[#4a4e69]/70 transition-all" onClick={handleBack}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorState;
