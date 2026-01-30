"use client";

import React from "react";
import Image from "next/image";
import mainImg from "@/public/inox/home/unsere-arbeit2.jpg";
import ModSection from "./ModSection";
import { motion, useInView } from "motion/react";
import {
  firstSectImg,
  secSectImg,
  thirdSectImg,
} from "@/public/inox/unsere-arbeit/index";
import { useRef } from "react";

const inViewObj: any = {
  margin: "-100px 0px",
  amount: 0.2,
  once: true,
};

function Comp() {
  const firstSectRef = useRef(null);
  const secSectRef = useRef(null);
  const thirdSectRef = useRef(null);
  const firstSecInView = useInView(firstSectRef, inViewObj);
  const secSecInView = useInView(secSectRef, inViewObj);
  const thirdSecInView = useInView(thirdSectRef, inViewObj);
  return (
    <div>
      <div className="w-full h-[65vh] md:h-[80vh] flex justify-center items-end relative md:flex-row md:items-end md:justify-between overflow-hidden">
        <div className="px-8 pb-8 md:pb-10 z-30 lg:pl-20 lg:pr-0 md:w-full lg:w-[680px] lg:text-left text-center">
          <motion.h2
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "tween", duration: 0.7, delay: 0.5 }}
            className="mb-1.5 md:mb-0 lg:mb-2 text-[20px] font-semibold textColor"
          >
            IHRE VORTEILE:
          </motion.h2>
          <motion.h2
            initial={{ x: "-100%", opacity: 0.5 }}
            animate={{ x: "0%", opacity: 1 }}
            transition={{ type: "tween", duration: 0.4, delay: 0.1 }}
            className={`text-[32px] font-extrabold tracking-tight leading-8 uppercase lg:text-[40px] lg:leading-10 lg:mb-2 text-white lg:ml-4`}
          >
            QUALITÄT
          </motion.h2>
          <motion.h2
            initial={{ x: "-100%", opacity: 0.5 }}
            animate={{ x: "0%", opacity: 1 }}
            transition={{ type: "tween", duration: 0.4, delay: 0.1 }}
            className={`text-[32px] font-extrabold tracking-tight leading-8 uppercase lg:text-[40px] lg:leading-10 lg:mb-2 text-white lg:ml-4`}
          >
            VERFÜGBARKEIT
          </motion.h2>
          <motion.h2
            initial={{ x: "-100%", opacity: 0.5 }}
            animate={{ x: "0%", opacity: 1 }}
            transition={{ type: "tween", duration: 0.4, delay: 0.1 }}
            className={`text-[32px] font-extrabold tracking-tight leading-8 uppercase lg:text-[40px] lg:leading-10 lg:mb-2 text-white lg:ml-4`}
          >
            PREIS
          </motion.h2>
        </div>
        <div className="size-full bg-[#000] top-0 absolute z-10 mix-blend-darken  lg:mix-blend-overlay opacity-50 md:opacity-50" />
        <div className="absolute top-0 size-full border">
          <Image
            src={mainImg}
            alt="logo"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
      <ModSection
        title="Für uns steht Qualität immer an erster Stelle"
        text="Wir glauben, dass wahre Exzellenz nicht nur durch Innovation
            erreicht wird, sondern auch durch die Entschlossenheit, die besten
            Materialien und Techniken zu verwenden. Unser Team besteht aus
            Fachleuten, die über jahrelange Erfahrung verfügen und darauf
            fokussiert sind, Lösungen zu liefern, die sowohl funktional als auch
            ästhetisch ansprechend sind."
        imgs={firstSectImg}
        ref={firstSectRef}
        inView={firstSecInView}
      />
      <ModSection
        title="Langlebigkeit ist ein weiterer Grundpfeiler unserer Arbeit"
        text="Wir verstehen, dass jedes Projekt nicht nur kurzfristige Anforderungen erfüllen sollte, sondern auch langfristig bestehen muss. Daher setzen wir auf qualitativ hochwertige Materialien, die auch den härtesten Anforderungen standhalten. Egal ob es sich um grosse Bauprojekte oder spezialisierte Einzelanfertigungen handelt, unsere Lösungen sind darauf ausgelegt, den Test der Zeit zu bestehen."
        imgs={secSectImg}
        ref={secSectRef}
        inView={secSecInView}
      />
      <ModSection
        title="Zudem ist uns die enge Zusammenarbeit mit Kunden besonders wichtig"
        text="Wir hören aktiv auf ihre Wünsche und Bedürfnisse, um massgeschneiderte Lösungen zu entwickeln, die perfekt auf ihre Anforderungen abgestimmt sind. Wir streben stets danach, nicht nur die Erwartungen zu erfüllen, sondern sie zu übertreffen. Unser Engagement für Qualität und Langlebigkeit bedeutet, dass jedes Projekt, das wir umsetzen, eine Investition in die Zukunft unserer Kunden ist."
        imgs={thirdSectImg}
        ref={thirdSectRef}
        inView={thirdSecInView}
      />
      <div className="w-full text-white bgColor mt-10">
        <h2 className="text-center text-lg leading-4 px-2 py-3 font-semibold md:mb-8 ">
          Vertrauen Sie uns, und lassen Sie uns gemeinsam Projekte realisieren,
          die nicht nur heute, sondern auch morgen noch von Wert sind.
        </h2>
      </div>
    </div>
  );
}

export default Comp;
