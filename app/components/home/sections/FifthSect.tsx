"use client";
import Image from "next/image";
import mainImg from "@/public/inox/jeder-bedarf.jpg";
import { motion } from "motion/react";

function FirstSect({ id, active }: any) {
  return (
    <div
      className="w-full h-svh flex flex-col relative md:flex-row md:justify-between md:items-center "
      id={id}
    >
      <div className="relative h-1/3 md:h-full md:mt-0 md:w-1/2">
        <motion.div
          className="absolute top-0 size-full"
          initial={{ opacity: 0.5 }}
          animate={active && { opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        >
          <Image
            src={mainImg}
            alt="logo"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      </div>

      <div className="ml-4 mr-3 my-12 md:mr-0 md:w-1/2 md:px-6 lg:pl-20 lg:pr-48 ">
        <motion.h2
          className="text-[20px] font-semibold textColor"
          initial={{ opacity: 0 }}
          animate={active && { opacity: 1 }}
          transition={
            active && {
              duration: 0.5,
              ease: "easeOut",
              delay: 0.2,
            }
          }
        >
          PREIS
        </motion.h2>
        <motion.h2
          className="text-[#4a4e69] text-[32px] font-extrabold tracking-tight leading-8 uppercase lg:text-[45px] lg:leading-11 lg:mb-4 lg:text-nowrap"
          initial={{ opacity: 0 }}
          animate={active && { opacity: 1 }}
          transition={
            active && {
              duration: 0.5,
              ease: "easeOut",
              delay: 0.5,
            }
          }
          style={{
            hyphens: "auto",
            overflowWrap: "break-word",
            wordBreak: "break-word",
            msHyphens: "auto",
          }}
        >
          KURZE WERTSCHÖPFUNGSKETTE,
          <br /> KONKURRENZLOSES ANGEBOT
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={active && { opacity: 1 }}
          transition={
            active && {
              duration: 0.5,
              ease: "easeOut",
              delay: 0.8,
            }
          }
          lang="de"
          className={`text-[#9a8c98] text-sm leading-4 mt-3 font-semibold md:leading-3.5 lg:text-lg lg:leading-5 lg:font-semibold md:mt-2 lg:my-2`}
          style={{
            hyphens: "auto",
          }}
        >
          Die kurze Wertschöpfungskette beginnt mit der Beschaffung der
          Rohmaterialien bei einem langjährigen vertrauensvollen Partner. Alle
          Arbeitsschritte werden nach ISO 9001 intern abgewickelt. Die
          Herstellungskosten basieren bei jedem Produkt auf wertschöpfenden
          internen Arbeitsschritten. Der angebotene Preis ermöglicht der
          Vertriebsorganisation einen großzügigen Deckungsbeitrag ermöglicht
          eine individuelle und flexible Preisgestaltung.
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={active && { opacity: 1, y: 0 }}
          transition={
            active && {
              duration: 0.5,
              ease: "easeOut",
              delay: 1,
            }
          }
          className="size-fit"
        >
          <a
            href={"/jeder-bedarf"}
            className={`text-[#4a4e69] text-[15px] tracking-tight font-semibold border-2 border-[#259ed3] mt-10 md:mt-6 lg:mt-10 lg:rounded-[8px] px-6 py-1.5 block w-fit`}
          >
            ERFAHREN SIE MEHR
          </a>
        </motion.div>
      </div>
    </div>
  );
}

export default FirstSect;
