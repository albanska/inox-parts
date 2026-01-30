"use client";

import React, { useEffect, useState } from "react";
import HomeComp from "./HomeComp";
import Loader from "../loader/Loader";
import { motion } from "motion/react";

function LoadingState() {
  const [idArr, setIdArr] = useState([
    "home",
    "unsere-arbeit",
    "laser",
    "produkte",
    "unsere-arbeit2",
    "jeder-bedarf",
    "footer",
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeId, setActiveId] = useState<null | number>(null);

  useEffect(() => {
    if (!window) return;
    if (window.innerWidth <= 768) {
      setIdArr((prev) => [...prev, "kontakt"]);
    }
    document.documentElement.style.scrollBehavior = "auto";
    if (window.location.hash) {
      const hash = window.location.hash.replace("#", "");

      const findHashIdx = idArr.findIndex((item) => hash === item);
      setActiveId(findHashIdx);
    } else {
      setActiveId(0)
    }

    document.body.style.overflowY = "hidden";
    setIsLoading(false);

    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);


  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <motion.div
            initial={{ opacity: 1, display: "block" }}
            animate={!isLoading && { opacity: 0, display: "none" }}
            transition={{ delay: 0.1, duration: 0.1, type: "tween" }}
            className="w-full h-full bg-white absolute top-0 z-[100]"
          ></motion.div>
          <HomeComp idArr={idArr} activeHash={activeId} />
        </>
      )}
    </>
  );
}

export default LoadingState;
