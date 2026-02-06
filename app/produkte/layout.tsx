import { Metadata } from "next";
import Image from "next/image";
import React from "react";
import underline from "@/public/inox/underline.svg";
import impImg from "@/public/inox/home/laser.jpg";

export const metadata: Metadata = {
  title: "INOXPARTS - Produkte",
  icons: { icon: "/inox/logoInox.svg" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  // ✅ Detect specific-product route on server via headers is annoying.
  // Simple approach: move hero into /produkte/page.tsx only.
  // But if you insist keeping it here, we do it client-side below.
  return (
    <>
      <HeroGate />
      {children}
    </>
  );
}

// ✅ Client-only gate: hide hero when we're in spezifischs-produkt
function HeroGate() {
  "use client";
  const [hide, setHide] = React.useState(false);

  React.useEffect(() => {
    const p = window.location.pathname || "";
    if (p.includes("/produkte/spezifischs-produkt")) setHide(true);
  }, []);

  if (hide) return null;

  return (
    <div
      className="w-full h-[30dvh] md:h-[60dvh] relative"
      style={{
        backgroundImage: `url(${impImg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
      }}
    >
      <div className="w-full h-1/3 absolute bottom-0">
        <Image src={underline} alt="underline" className="object-cover w-full h-full" />
      </div>
    </div>
  );
}
