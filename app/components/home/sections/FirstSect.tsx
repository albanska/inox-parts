"use client";
import Image from "next/image";
import mainImg from "@/public/inox/unsere-arbeit.jpg";
import { motion } from "motion/react";

function FirstSect({ id, active }: any) {
  return (
    <div
      className="w-full h-svh flex flex-col relative justify-end md:flex-row md:justify-between md:items-center"
      id={id}
    >
      <div className="ml-4 mr-3 md:w-1/2 md:pr-8 lg:pl-20 lg:pr-48">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={active && { opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="text-[20px] font-semibold textColor"
        >
          QUALITÄT
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={active && { opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
          className="text-[#4a4e69] text-[32px] font-extrabold tracking-tight leading-8 uppercase lg:text-[45px] lg:leading-11 lg:mb-4"
        >
          INOXPARTS - QUALITÄT UND PERFEKTION
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={active && { opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.8 }}
          lang="de"
          className={`text-[#9a8c98] text-sm leading-4 mt-3 font-semibold md:leading-3.5 lg:text-lg lg:leading-5 lg:font-semibold md:mt-1 lg:my-2`}
          style={{
            hyphens: "auto",
          }}
        >
          <span className="text-[#4a4e69] font-extrabold">INOXPARTS</span> ist
          ein Unternehmen, das sich auf Produkte und Dienstleistungen für
          Flachdächer und Terrassen mit Entwässerungssystemen spezialisiert hat.
          Mit langjähriger Erfahrung in der Verarbeitung von Edelstahl setzt das
          Unternehmen hochwertige Materialien wie V2A-Stahl (X5CrNi18-10) ein,
          um Langlebigkeit und hervorragende Leistung zu gewährleisten.
          INOXPARTS bietet eine Produktpalette, die Entwässerungsrinnen, Gitter,
          Kiesrahmen und weiteres Zubehör umfasst, das an die spezifischen
          Bedürfnisse der Kunden angepasst wird. Das Unternehmen engagiert sich
          für Qualität und exzellenten Service und liefert nachhaltige und
          dekorative Lösungen.
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={active && { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 1 }}
          className="size-fit"
        >
          <a
            href={"/unsere-arbeit"}
            className={`text-[#4a4e69] text-[15px] tracking-tight font-semibold border-2 border-[#259ed3] lg:rounded-[8px] px-6 py-1.5 block w-fit mt-4`}
          >
            Erfahren Sie mehr über uns
          </a>
        </motion.div>
      </div>
      <div className="relative h-1/3 mt-4 md:h-full md:mt-0 md:w-1/2">
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={active && { opacity: 1 }}
          className="absolute top-0 size-full "
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <Image
            src={mainImg}
            alt="logo"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      </div>
    </div>
  );
}

export default FirstSect;
