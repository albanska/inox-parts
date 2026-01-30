"use client";

import Image from "next/image";
import mainImg from "@/public/inox/home/laser.jpg";
import { Hammer, Handshake, Phone, Ruler, Shield, Zap } from "lucide-react";

function Laser() {
  return (
    <div className="min-h-dvh pb-10 border-b-2 border-[#0000003e]">
      <div className="relative w-full">
        <Image
          src={mainImg}
          alt="unsere-arbeit"
          className="h-[60vh] object-cover"
        />
      </div>
      <div className="mt-8 md:mt-12 lg:mt-20 px-4 md:pl-10 md:pr-14">
        <h2 className="text-[#4a4e69] text-[32px] font-extrabold tracking-tight leading-8 uppercase lg:text-[45px] lg:leading-11 md:mb-3 lg:mb-4 text-center">
          EFFIZIENZ UND PRÄZISION BEI JEDEM SCHNITT
        </h2>
        <h2
          lang="de"
          className={`text-[#9a8c98] text-sm leading-4 mt-3 font-semibold md:leading-3.5 md:text-base lg:text-lg lg:font-semibold lg:leading-4 text-justify lg:text-center lg:my-2 lg:w-[70vw] lg:mx-auto`}
          style={{
            hyphens: "manual",
            overflowWrap: "break-word",
            wordBreak: "break-word",
          }}
        >
          In einer Branche, in der jeder Millimeter zählt, bieten wir Schnitte
          mit maximaler Präzision und unvergleichlicher Effizienz. Mit
          modernster Laserschneidtechnologie garantieren wir perfekte Ergebnisse
          – unabhängig von der Komplexität der Formen oder der Materialstärke
        </h2>
        <div className="lg:flex lg:justify-center lg:gap-20 lg:mt-8">
          <h2
            lang="de"
            className={`text-[#9a8c98] text-sm leading-4 mt-3 font-semibold md:leading-3.5 md:text-base lg:font-semibold lg:leading-4 md:mt-3 lg:my-2 lg:w-[600px]`}
            style={{
              hyphens: "auto",
            }}
          >
            Wir bearbeiten Edelstahl, Stahl, Aluminium und andere Metalle. Dabei
            gewährleisten wir saubere Kanten sowie verzugsfreie Schnitte. Dank
            unserer hochmodernen Technologie realisieren wir einzigartige
            Designs – von einfachen Konturen bis hin zu hochkomplexen Formen -
            stets mit absoluter Präzision.
          </h2>
          <h2
            lang="de"
            className={`text-[#9a8c98] text-sm leading-4 mt-3 font-semibold md:leading-3.5 md:text-base lg:font-semibold lg:leading-4 md:mt-3 lg:my-2 lg:w-[600px]`}
            style={{
              hyphens: "auto",
            }}
          >
            Qualität und Effizienz stehen bei uns an erster Stelle. Durch
            automatisierte Prozesse und ein Team aus erfahrenen Fachkräften
            bieten wir massgeschneiderte Lösungen, die höchsten
            Industrieanforderungen gerecht werden. Jedes Projekt, das in unseren
            Händen entsteht, ist eine Kombination aus Innovation, Engagement und
            technischer Perfektion.
          </h2>
        </div>
        <div className="lg:flex lg:justify-center lg:items-center lg:gap-20 lg:mt-8">
          <h2
            lang="de"
            className={`text-[#9a8c98] text-sm leading-4 mt-3 font-semibold md:leading-3.5 md:text-base lg:text-xl lg:font-semibold lg:leading-6 md:mt-3 lg:my-2 lg:w-[600px] lg:text-right text-justify `}
            style={{
              hyphens: "auto",
            }}
          >
            Vertrauen Sie auf uns für präzise und langlebige <br /> Schnitte –
            denn die Details machen den Unterschied!
          </h2>

          <ul className="mt-8 flex flex-col gap-1.5 lg:w-[600px]">
            <li className="flex items-center gap-2">
              <Phone fill="#259ed3" /> Nehmen Sie noch heute mit uns Kontakt
              auf!
            </li>
            <li className="bgColor w-full h-0.5" />
            <li className="flex items-center gap-2">
              <Shield fill="#259ed3" /> Unsere Erfahrung ist Ihre Garantie für
              höchste Qualität!
            </li>
            <li className="bgColor w-full h-0.5" />
            <li className="flex items-center gap-2">
              <Hammer fill="#259ed3" /> Modernste Technologie für überlegene
              Ergebnisse!
            </li>
            <li className="bgColor w-full h-0.5" />
            <li className="flex items-center gap-2">
              <Ruler fill="#259ed3" /> Präzise Schnitte für jede Anforderung und
              Branche!
            </li>
            <li className="bgColor w-full h-0.5" />
            <li className="flex items-center gap-2">
              <Zap fill="#259ed3" /> Schneller und effizienter Service für
              grosse und kleine Projekte!
            </li>
            <li className="bgColor w-full h-0.5" />
            <li className="flex items-center gap-2">
              <Handshake fill="#259ed3" /> Ihr verlässlicher Partner für
              innovative Lösungen!
            </li>
            <li className="bgColor w-full h-0.5" />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Laser;
