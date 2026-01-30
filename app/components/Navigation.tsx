"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import logo from "@/public/inox/logoInox.svg";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";

function Navigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isAdmin = pathname.includes("/admin")
  if(isAdmin) {
    return
  }
  const listsArr = [
    {
      name: "home",
      link: "/#home",
      active: pathname === "/",
    },
    {
      name: "unsere-arbeit",
      link: "/unsere-arbeit2",
      active: pathname === "/unsere-arbeit2",
    },
    {
      name: "Bestellung / Offerte",
      link: "/pdf/Bestellung-Offerte.pdf",
      pdf: true,
      active: false,
    },
    {
      name: "Katalog",
      link: "/katalog",
      active: pathname === "/katalog",
    },
    {
      name: "produkte",
      link: "/produkte",
      active: pathname.includes("/produkte"),
    },
    {
      name: "kontakt",
      link: "/kontakt",
      active: pathname === "/kontakt",
    },
  ];

  return (
    <motion.div
      initial={{ y: -80, opacity: 0.5 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "tween", duration: 0.6 }}
      className="flex justify-between items-center px-3 py-4 z-50 fixed w-full pointer-events-auto md:px-5 md:py-3 lg:py-4"
    >
      <a href={"/#home"} className="w-28 md:w-32 md:ml-1">
        <Image src={logo} alt="logo" style={{ mixBlendMode: "exclusion" }} />
      </a>
      <div className="flex justify-center items-center h-full gap-4">
        <h2 className="text-white font-semibold hover:text-[#259ed3] transition-all cursor-default [text-shadow:0px_0px_3px_#000000] hover:text-shadow-none ">
           MENÜ
        </h2>
        <div className="opacity-45 h-8 w-[1.5px] bg-white hover:bg-[#259ed3] transition-all [box-shadow:0px_0px_3px_#000000]" />
        <button
          className="size-fit cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
        >
          <Menu className="size-8 text-white hover:text-[#259ed3] transition-all [filter:drop-shadow(0px_0px_4px_rgba(66,68,90,1))]" />


        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { delay: 0.1 } }}
              className="fixed inset-0 z-50 h-lvh bg-[#00000066] flex justify-end"
            >
              <div
                className="absolute inset-0 -z-30"
                onClick={() => setOpen(false)}
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: "0%", transition: { delay: 0.1, type: "tween" } }}
                exit={{ x: "100%", transition: { delay: 0, duration: 0.2 } }}
                transition={{}}
                className=" h-full w-2/3 bg-white flex items-center md:w-1/3 px-10"
              >
                <button
                  className="absolute right-3 top-4 md:right-8 md:top-8 lg:top-12 lg:right-8 size-fit cursor-pointer"
                  onClick={() => setOpen((prev) => !prev)}
                >
                  <X className="size-8 text-black" />
                </button>
                <div>
                  <div className="w-1/2 md:w-2/3 lg:w-full">
                    <Image src={logo} alt="logo" className="mb-4" />
                  </div>
                  <ul className="z-50">
                    {listsArr.map((list, idx) => {
                      return (
                        <List
                          text={list.name}
                          active={list.active}
                          link={list.link}
                          key={idx}
                          setOpen={setOpen}
                          pdf={list.pdf}
                        />
                      );
                    })}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default Navigation;

export function List({ text, active, link, setOpen, pdf = false }: any) {
  const [isHovering, setIsHovering] = useState(false);
  const fixedText = text.includes("-") ? text.replace("-", " ") : text;
  return (
    <>
      <li className=" md:mb-1.5 lg:mb-2">
        <a
          target={pdf ? "_blank" : "_self"}
          href={link}
          className={`font-bold text-xl lg:text-3xl capitalize ${
            active ? "textColor" : "text-[#a8a9ac]"
          } `}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onClick={() => setOpen(false)}
        >
          {fixedText}
        </a>
        <AnimatePresence>
          <motion.div
            className="h-[3px] bgColor mb-0.5 lg:mb-0 lg:mt-1"
            animate={
              active
                ? { width: "100%" }
                : isHovering
                ? { width: "100%" }
                : { width: 0 }
            }
            initial={{ width: 0 }}
            transition={{ duration: 0.3 }}
            exit={active ? { width: "0" } : { width: "100%" }}
          />
        </AnimatePresence>
      </li>
    </>
  );
}
