import { Metadata } from "next";
import Image from "next/image";
import React from "react";
import underline from "@/public/inox/underline.svg";
import impImg from "@/public/inox/home/laser.jpg";

export const metadata: Metadata = {
  title: "INOXPARTS - Produkte",
  icons: {
    icon: "/inox/logoInox.svg",
  },
};

function layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div
        className="w-full h-[30dvh] md:h-[60dvh] relative"
        style={{
          backgroundImage: `url(${impImg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
      >
        <div className="w-full h-1/3 absolute bottom-0">
          <Image
            src={underline}
            alt={"img"}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      {children}
    </>
  );
}

export default layout;
