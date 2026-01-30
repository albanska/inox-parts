"use client";

import Image from "next/image";
import mainImg from "@/public/inox/unsere-arbeit.jpg";

function UnsereArbeit() {
  return (
    <div className="min-h-dvh pb-10 border-b-2 border-[#0000003e]">
      <div className="relative w-full">
        <Image
          src={mainImg}
          alt="unsere-arbeit"
          className="h-[60vh] md:h-[70vh] lg:h-[60vh] object-cover"
        />
      </div>
      <div className="mt-8 md:mt-12 lg:mt-20 px-4 md:pl-10 md:pr-14">
        <h2 className="text-[#4a4e69] text-[32px] font-extrabold tracking-tight leading-8 uppercase lg:text-[45px] lg:leading-11 md:mb-3 lg:mb-4 text-center">
          Qualität -Und Perfektion
        </h2>
        <div className="lg:flex lg:justify-center lg:gap-20">
          <h2
            lang="de"
            className={`text-[#9a8c98] text-sm leading-4 mt-3 font-semibold md:leading-3.5 md:text-base lg:font-semibold lg:leading-4 lg:my-2 lg:w-[600px]`}
            style={{
              hyphens: "auto",
            }}
          >
            InoxParts ist ein Unternehmen, das sich durch ein starkes Engagement
            für Qualität und Langlebigkeit auszeichnet und sich auf Produkte und
            Dienstleistungen für Flachdächer und Entwässerungssysteme
            spezialisiert hat. Durch die Verwendung erstklassiger Materialien
            wie V2A-Stahl (X5CrNi18-10), bekannt für seine aussergewöhnliche
            Beständigkeit gegen Korrosion und mechanische Einflüsse,
            gewährleistet InoxParts eine langfristige Leistung für jedes
            Projekt. Das Unternehmen bietet eine breite Palette von Produkten,
            einschliesslich Entwässerungsrinnen, Gittern, Kiesrahmen,
            Randsteinen und anderem Zubehör, die an die spezifischen Bedürfnisse
            jedes Kunden angepasst werden.
          </h2>
          <h2
            lang="de"
            className={`text-[#9a8c98] text-sm leading-4 mt-3 font-semibold md:leading-3.5 md:text-base lg:font-semibold lg:leading-4 md:mt-3 lg:my-2 lg:w-[600px]`}
            style={{
              hyphens: "auto",
            }}
          >
            InoxParts hat zahlreichen Unternehmen und Privatpersonen geholfen,
            komplexe Projekte mit aussergewöhnlichem Engagement für
            Kundenservice und Arbeitsqualität zu realisieren. Jedes Produkt wird
            unter Berücksichtigung der spezifischen Marktbedürfnisse und der
            Anforderungen der Kunden nach{" "}
            <span className="text-[#4a4e69] font-extrabold">ISO 9001</span>{" "}
            hergestellt, wobei modernste Technologie und innovative
            Fertigungsmethoden eingesetzt werden. Das Unternehmen verfolgt eine
            klare Philosophie, um sicherzustellen, dass jedes Projekt ein
            Spiegelbild hervorragender Arbeit ist und jede angebotene Lösung
            eine Investition in die Zukunft darstellt. Mit einem
            unerschütterlichen Engagement für Qualität und einem individuellen
            Ansatz für die Kundenbetreuung hat InoxParts das Vertrauen vieler
            Partner gewonnen und zahlreiche erfolgreiche Projekte umgesetzt.
          </h2>
        </div>
      </div>
    </div>
  );
}

export default UnsereArbeit;
