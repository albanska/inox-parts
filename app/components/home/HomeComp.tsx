"use client";

import VidComp from "@/app/components/home/VidComp";
import FirstSect from "@/app/components/home/sections/FirstSect";
import SecSect from "@/app/components/home/sections/SecSect";
import FourthSect from "@/app/components/home/sections/FourthSect";
import FifthSect from "@/app/components/home/sections/FifthSect";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ThirdSect from "./sections/ThirdSect";

function HomeComp({ idArr, activeHash }: any) {
  const router = useRouter();
  const [activeId, setActiveId] = useState<number>(activeHash);
  const waitRef = useRef(false);
  const activeIdRef = useRef(0);

  const touchStartY = useRef<number | null>(null);
  const touchEndY = useRef<number | null>(null);

  useEffect(() => {
    if (activeHash !== null) {
      setActiveId(activeHash);
      activeIdRef.current = activeHash;
    }
  }, [activeHash]);

  useEffect(() => {
    const scrollUp = () => {
      if (waitRef.current || activeIdRef.current === 0) return;
      document.documentElement.style.scrollBehavior = "smooth";
      setActiveId((prev) => {
        const newId = prev - 1;
        activeIdRef.current = newId;
        return newId;
      });
    };
    const scrollDown = () => {
      if (waitRef.current || activeIdRef.current === idArr.length - 1) return;
      document.documentElement.style.scrollBehavior = "smooth";
      setActiveId((prev) => {
        const newId = prev + 1;
        activeIdRef.current = newId;
        return newId;
      });
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") scrollDown();
      else if (e.key === "ArrowUp") scrollUp();
    };
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) scrollDown();
      else if (e.deltaY < 0) scrollUp();
    };
    //@ts-ignore
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      touchEndY.current = e.changedTouches[0].clientY;
      handleSwipe();
    };
    const handleSwipe = () => {
      if (
        touchStartY.current === null ||
        touchEndY.current === null ||
        waitRef.current
      )
        return;

      const diffY = touchStartY.current - touchEndY.current;

      if (Math.abs(diffY) > 50) {
        if (diffY > 0) scrollDown();
        else scrollUp();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleWheel);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [idArr]);


  // Scroll to section and start cooldown
  useEffect(() => {
    router.push(`#${idArr[activeId]}`);
    waitRef.current = true;
    const timer = setTimeout(() => {
      waitRef.current = false;
    }, 800);

    return () => clearTimeout(timer);
  }, [activeId]);

  return (
    <div className="relative">
      <VidComp id={idArr[0]} />
      <FirstSect id={idArr[1]} active={activeId === 1} />
      <SecSect id={idArr[2]} active={activeId === 2} />
      <ThirdSect id={idArr[3]} />
      <FourthSect id={idArr[4]} active={activeId === 4} />
      <FifthSect id={idArr[5]} active={activeId === 5} />
    </div>
  );
}

export default HomeComp;
