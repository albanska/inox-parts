"use client";

import React, { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import { Volume2, VolumeOff } from "lucide-react";
import { motion } from "motion/react";

function VidComp({ id }: any) {
  const [isMuted, setIsMuted] = useState(true);
  return (
    <div className="relative h-svh" id={id}>
      <div className="absolute inset-0 -z-20">
        <VideoPlayer isMuted={isMuted} />
      </div>
      <div className="z-20 absolute bottom-10 flex justify-between items-end w-full px-3 py-4 md:px-10 lg:px-22 lg:pb-18">
        <div className="font-semibold tracking-tight text-white">
          <motion.h2
            initial={{ x: "-100%", opacity: 0.5 }}
            animate={{ x: "0%", opacity: 1 }}
            transition={{ type: "tween", duration: 0.4, delay: 0.1 }}
            className="text-2xl leading-7 lg:text-[40px] uppercase font-bold lg:leading-10 md:text-3xl md:leading-8"
          >
            LEIDENSCHAFT UND
            <br />
            PERFEKTION!
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "tween", duration: 0.7, delay: 0.5 }}
            className="lg:text-base lg:font-semibold lg:mt-1 md:text-sm md:py-0.5 md:font-bold md:tracking-wide text-[#259ed3]  pointer-events-none select-none uppercase"
          >
            mehr entdecken:
          </motion.h2>
          <motion.div
            className="flex flex-col md:flex-row gap-0 md:gap-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "tween", duration: 0.5, delay: 0.7 }}
          >
            <div className="border-2 md:border border-[#259ed3] w-fit h-fit uppercase rounded-md mt-2">
              <a
                href="/katalog" 
                className="lg:text-sm md:py-2 md:px-4 textColor font-semibold block tracking-wide md:text-xs md:font-bold text-xs py-1.5 px-2.5 cursor-pointer"
              >
                Katalog
              </a>
            </div>
            <div className="border-2 md:border border-[#259ed3] w-fit h-fit uppercase rounded-md mt-2">
              <a
                href="/pdf/Bestellung-Offerte.pdf"
                className="lg:text-sm md:py-2 md:px-4 textColor lg:font-semibold block tracking-wide md:text-xs md:font-bold text-xs py-1.5 px-2.5 cursor-pointer"
                target="_blank"
              >
                ANGEBOT / BESTELLUNG
              </a>
            </div>
          </motion.div>
        </div>
        <motion.button
          initial={{ opacity: 0.5 }}
          whileTap={{ opacity: 1 }}
          onClick={() => {
            setIsMuted((prev) => !prev);
          }}
        >
          {isMuted ? (
            <VolumeOff className="text-white size-9" />
          ) : (
            <Volume2 className="text-white size-9" />
          )}
        </motion.button>
      </div>
    </div>
  );
}

export default VidComp;
