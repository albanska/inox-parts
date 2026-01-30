"use client";

import Image from "next/image";
import mainImg from "@/public/inox/jeder-bedarf.jpg"

function UnsereArbeit() {
  return (
    <div className="min-h-dvh pb-10 border-b-2 border-[#0000003e]">
      <div className="relative w-full">
        <Image
          src={mainImg}
          alt="unsere-arbeit"
          className="h-[60vh] md:h-[70vh] lg:h-[60vh] object-cover w-full object-center"
        />
      </div>
      <div className="mt-8 md:mt-12 lg:mt-20 px-4 md:pl-10 md:pr-14">
        <h2 className="text-[#4a4e69] text-[32px] font-extrabold tracking-tight leading-8 uppercase lg:text-[45px] lg:leading-11 md:mb-3 lg:mb-4 text-center">
          INOXPARTS - Qualität Und Perfection
        </h2>
        <div className="lg:flex lg:justify-center lg:gap-20">
          <h2
            lang="de"
            className={`text-[#9a8c98] text-sm leading-4 mt-3 font-semibold md:leading-3.5 md:text-base lg:font-semibold lg:leading-4 lg:my-2 lg:w-[600px]`}
            style={{
              hyphens: "manual",
              overflowWrap: "break-word",
              wordBreak: "break-word",
              textAlign: "justify",
            }}
          >
            Bei InoxParts steht unser Engagement für Qualität und Innovation im
            Mittelpunkt, sodass wir einzigartige Designs und zahlreiche Teile
            für jeden Bedarf anbieten können. Mit einer breiten Palette
            langlebiger Materialien und präziser Fertigung sorgen wir dafür,
            dass jedes Produkt funktional, ästhetisch ansprechend und
            widerstandsfähig gegenüber unterschiedlichen Einsatzbedingungen ist.
          </h2>
          <h2
            lang="de"
            className={`text-[#9a8c98] text-sm leading-4 mt-3 font-semibold md:leading-3.5 md:text-base lg:font-semibold lg:leading-4 md:mt-3 lg:my-2 lg:w-[600px]`}
            style={{
              hyphens: "manual",
              overflowWrap: "break-word",
              wordBreak: "break-word",
              textAlign: "justify",
            }}
          >
            Egal, ob Sie Standardteile oder maßgeschneiderte Lösungen benötigen
            – unsere moderne Technologie und unser erfahrenes Team garantieren
            eine präzise Verarbeitung und eine hochwertige Endfertigung. Wir
            schätzen die Anforderungen unserer Kunden und arbeiten eng mit ihnen
            zusammen, um Produkte zu entwickeln, die perfekt zu ihren Projekten
            passen.
          </h2>
        </div>
        <div className="lg:flex lg:justify-center md:mb-3 lg:mb-4">
          <h2
            lang="de"
            className={`text-[#9a8c98] text-sm leading-4 mt-3 font-semibold md:leading-3.5 md:text-base lg:mt-10 lg:font-semibold lg:leading-4  lg:w-[1200px]`}
            style={{
              hyphens: "manual",
              overflowWrap: "break-word",
              wordBreak: "break-word",
              textAlign: "justify",
            }}
          >
            Von den kleinsten Details bis hin zu komplexen Strukturen durchläuft
            jedes Teil eine strenge Qualitätskontrolle, um maximale
            Langlebigkeit und Effizienz zu gewährleisten. InoxParts ist Ihr
            verlässlicher Partner für spezialisierte Bauteile, die
            Funktionalität, Ästhetik und Innovation vereinen.
          </h2>
        </div>
      </div>
    </div>
  );
}

export default UnsereArbeit;
