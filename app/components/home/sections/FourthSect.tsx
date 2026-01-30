import Image from "next/image";
import mainImg from "@/public/inox/home/unsere-arbeit2.jpg";
import { motion } from "motion/react";

function FourthSect({ id, active }: any) {
  return (
    <div
      className="w-full h-svh flex flex-col justify-center relative md:flex-row md:items-end md:justify-between overflow-hidden"
      id={id}
    >
      <div className="px-8 z-30 lg:pl-20 lg:pr-0 md:w-1/2 lg:w-[680px] ">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={active && { opacity: 1 }}
          transition={{ type: "tween", duration: 0.7, delay: 0.5 }}
          className="text-[20px] font-semibold textColor"
        >
          VERFÜGBARKEIT
        </motion.h2>
        <motion.h2
          initial={{ x: "-100%", opacity: 0 }}
          animate={
            active && {
              x: "0%",
              opacity: 1,
            }
          }
          transition={{ type: "tween", duration: 0.4, delay: 0.1 }}
          className={`text-[32px] font-extrabold tracking-tight leading-8 uppercase lg:text-[50px] lg:leading-12 lg:mb-4 text-white text-nowrap`}
        >
          EFFIZIENZ UND PRÄZISION <br /> BEI JEDEM SCHNITT
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={active && { opacity: 1 }}
          transition={{ type: "tween", duration: 0.7, delay: 0.7 }}
          lang="de"
          className={`text-[#c5c5c5] text-sm leading-4 mt-3 font-semibold md:leading-3.5 lg:text-lg lg:leading-5 lg:font-semibold md:mt-1 lg:my-2`}
          style={{
            hyphens: "manual",
            overflowWrap: "break-word",
            wordBreak: "break-word",
            textAlign: "justify",
          }}
        >
          Wir engagieren uns dafür, hochqualitative Dienstleistungen anzubieten,
          die auf Langlebigkeit ausgelegt sind. Jedes Projekt, das wir nach{" "}
          <span className="textColor font-extrabold">ISO 9001</span> umsetzen,
          spiegelt unser Engagement für Präzision und langfristige Möglichkeiten
          wider. Mit einem engagierten Team und der Verwendung der besten
          Materialien stellen wir sicher, dass jedes Detail perfekt ist. Unser
          Fokus liegt stets auf den Bedürfnissen unserer Kunden und der
          Bereitstellung von Produkten, die ihre Erwartungen übertreffen.
        </motion.h2>
        <motion.div
          className="size-fit"
          initial={{ opacity: 0 }}
          animate={active && { opacity: 1 }}
          transition={{ type: "tween", duration: 0.7, delay: 0.9 }}
        >
          <a
            href={"/unsere-arbeit2"}
            className={`text-[15px] tracking-tight font-semibold border-2 border-[#259ed3] lg:rounded-[8px] px-6 py-1.5 block w-fit mt-8 md:mb-8 lg:mt-10 lg:mb-20 textColor`}
          >
            ERFAHREN SIE MEHR!
          </a>
        </motion.div>
      </div>
      <div className="absolute top-0 size-full border">
        <Image
          src={mainImg}
          alt="logo"
          className="w-full h-full object-cover object-center"
        />
      </div>
    </div>
  );
}

export default FourthSect;
