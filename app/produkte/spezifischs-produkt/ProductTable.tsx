"use client";

import React, { useMemo } from "react";

const ID_KEYS = ["id", "Id", "artNr", "art_nr", "article", "articleNumber"];
const LEN_KEYS = ["length", "laenge", "Länge", "Lange", "lengthMm", "l"];
const WID_KEYS = ["width", "breite", "Breite", "widthMm", "b"];
const HEI_KEYS = ["height", "hoehe", "Höhe", "heightMm", "h"];
const PRI_KEYS = ["price", "preis", "Price", "netto", "netPrice"];

function safeCell(v: any): string {
  if (v === null || v === undefined || v === "") return "-";
  return String(v);
}

function getVal(row: any, keys: string[], fallback: any = "-") {
  for (const k of keys) {
    const v = row?.[k];
    if (v !== undefined && v !== null && v !== "") return v;
  }
  return fallback;
}

function pickRowsSimple(product: any): any[] {
  const r = product?.items || product?.variants || product?.rows || product?.products || product?.data || [];
  return Array.isArray(r) ? r : [];
}

export default function ProductTable({ product }: { product: any }) {
  const rows = useMemo(() => {
    try {
      return pickRowsSimple(product);
    } catch {
      return [];
    }
  }, [product]);

  if (rows.length === 0) {
    return <div className="p-6 text-sm text-gray-400 italic">Keine Varianten gefunden.</div>;
  }

  return (
    <div className="w-full overflow-hidden rounded-sm border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            {/* Dark Blue Header - German */}
            <tr className="bg-[#1f86d6] text-white">
              <th className="px-4 py-3 text-[13px] font-semibold border-r border-blue-400/30">Art.-Nr.</th>
              <th className="px-4 py-3 text-[13px] font-semibold border-r border-blue-400/30">Länge mm</th>
              <th className="px-4 py-3 text-[13px] font-semibold border-r border-blue-400/30">Breite mm</th>
              <th className="px-4 py-3 text-[13px] font-semibold border-r border-blue-400/30">Höhe mm</th>
              <th className="px-4 py-3 text-[13px] font-semibold">Netto Preis CHF / Meter</th>
            </tr>

            {/* Light Blue Header - French */}
            <tr className="bg-[#7eb6e7] text-white border-t border-blue-300">
              <th className="px-4 py-2 text-[11px] font-medium border-r border-blue-200/40 italic">N° d'art</th>
              <th className="px-4 py-2 text-[11px] font-medium border-r border-blue-200/40 italic">Longueur mm</th>
              <th className="px-4 py-2 text-[11px] font-medium border-r border-blue-200/40 italic">Largeur mm</th>
              <th className="px-4 py-2 text-[11px] font-medium border-r border-blue-200/40 italic">Hauteur mm</th>
              <th className="px-4 py-2 text-[11px] font-medium italic">Prix net CHF / mètre</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {rows.map((row: any, idx: number) => {
              const id = safeCell(getVal(row, ID_KEYS));
              const length = safeCell(getVal(row, LEN_KEYS));
              const width = safeCell(getVal(row, WID_KEYS));
              const height = safeCell(getVal(row, HEI_KEYS));
              const priceRaw = getVal(row, PRI_KEYS, "-");

              let price = safeCell(priceRaw);
              if (priceRaw !== "-" && !isNaN(Number(String(priceRaw).replace(",", ".")))) {
                price = Number(String(priceRaw).replace(",", ".")).toFixed(2);
              }

              return (
                <tr key={`${id}-${idx}`} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-2 text-[13px] font-medium border-r border-gray-100">{id}</td>
                  <td className="px-4 py-2 text-[13px] border-r border-gray-100">{length}</td>
                  <td className="px-4 py-2 text-[13px] border-r border-gray-100">{width}</td>
                  <td className="px-4 py-2 text-[13px] border-r border-gray-100">{height}</td>
                  <td className="px-4 py-2 text-[13px] font-bold">{price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
