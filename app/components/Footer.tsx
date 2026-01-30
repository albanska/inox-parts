"use client";
import Image from "next/image";
import firstImg from "@/public/inox/footer/01.jpg";
import secImg from "@/public/inox/footer/02.jpg";
import thirdImg from "@/public/inox/footer/03.jpg";
import FooterForm from "./FooterForm";
import { usePathname } from "next/navigation";

export function FooterImg({ src, alt }: any) {
  return (
    <div className="flex-1 border-3 border-[#259ed3] rounded-sm overflow-hidden ">
      <Image
        src={src}
        alt={alt}
        className="w-full h-[180px] md:h-[100px] lg:h-[180px] object-cover hover:scale-125 transition-all"
      />
    </div>
  );
}

function Footer() {
  const pathname = usePathname();
  const isAdmin = pathname.includes("/admin");

  if (isAdmin) {
    return;
  }
  return (
    <div
      className="w-full min-h-svh md:h-fit md:flex overflow-hidden"
      id="footer"
    >
      <div className="h-svh w-full px-6 bg-[#F7F7F7] flex flex-col justify-end pb-8 md:justify-center lg:px-40 relative">
        <div className="flex gap-4 items-center justify-center mb-5 lg:mb-10">
          <FooterImg src={firstImg} alt="footer1" />
          <FooterImg src={secImg} alt="footer2" />
          <FooterImg src={thirdImg} alt="footer2" />
        </div>
        <FooterForm />
      </div>
      <div
        id="kontakt"
        className="h-svh flex-1/3 bg-[#004360] text-white flex flex-col justify-center   lg:justify-center lg:pb-0 pl-10 md:pl-8 lg:pl-10 gap-6 md:gap-2 lg:gap-6"
      >
        <h2 className="uppercase text-[28px] md:text-[20px] lg:text-[28px] font-bold leading-8 md:leading-5 lg:leading-8">
          NEHMEN SIE MIT <br /> UNS KONTAKT AUF!
        </h2>

        <div>
          <h2 className="font-semibold text-lg tracking-wider text-[#e0a95b] mb-2 md:mb-0 lg:mb-2">
            Telefon:
          </h2>
          <h2 className="font-semibold tracking-wide mb-1">061 311 13 24</h2>
          <h2 className="font-semibold tracking-wide">079 251 47 33</h2>
        </div>
        <div>
          <h2 className="font-semibold text-lg tracking-wider text-[#e0a95b] mb-2 md:mb-0 lg:mb-2">
            Email:
          </h2>
          <h2 className="font-semibold tracking-wide">info@inoxparts.ch</h2>
        </div>
        <div>
          <h2 className="font-semibold text-lg tracking-wider text-[#e0a95b]">
            Büro:
          </h2>
          <h2 className="font-semibold text-lg md:text-base lg:text-lg tracking-wide mb-3 md:mb-0.5 lg:md-3">
            INOXPARTS GmbH
          </h2>
          <a
            href={"https://maps.app.goo.gl/guppqN9MnSETJFdz6"}
            className="font-semibold tracking-wide hover:text-gray-500 transition-all text-base md:text-sm lg:text-base"
            target="_blank"
          >
            Langenhagstrasse 20 <br /> 4127 Birsfelden
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
