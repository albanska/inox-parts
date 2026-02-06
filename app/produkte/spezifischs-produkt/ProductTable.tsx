"use client";

import React from "react";

function pickRows(product: any): any[] {
  const rows =
    product?.items ||
    product?.variants ||
    product?.rows ||
    product?.products ||
    product?.data ||
    [];

  return Array.isArray(rows) ? rows : [];
}

function getVal(row: any, keys: string[], fallback: string = "-"): string {
  for (const k of keys) {
    const v = row?.[k];
    if (v === undefined || v === null) continue;
    if (typeof v === "string" && v.trim() === "") continue;
    if (typeof v === "number") return String(v);
    if (typeof v === "string") return v;
  }
  return fallback;
}

function toNumber(v: any): number | null {
  if (v === undefined || v === null) return null;
  if (typeof v === "number") return Number.isFinite(v) ? v : null;
  if (typeof v === "string") {
    const n = Number(v.replace(",", ".").trim());
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

export default function ProductTable({ product }: { product: any }) {
  const rows = pickRows(product);

  if (!rows.length) {
    return (
      <div className="bg-white border border-gray-200 p-6 text-sm text-gray-500">
        No variants found.
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 overflow-x-auto">
      <table className="min-w-[860px] w-full border-collapse text-sm">
        <thead>
          {/* DE row */}
          <tr className="bg-[#1e88d3] text-white">
            <th className="p-3 text-left font-semibold border-r border-blue-400">Art.-Nr.</th>
            <th className="p-3 text-left font-semibold border-r border-blue-400">Länge mm</th>
            <th className="p-3 text-left font-semibold border-r border-blue-400">Breite mm</th>
            <th className="p-3 text-left font-semibold border-r border-blue-400">Höhe mm</th>
            <th className="p-3 text-left font-semibold">Netto Preis CHF / Meter</th>
          </tr>

          {/* FR row */}
          <tr className="bg-[#89c4f4] text-white">
            <th className="p-2 text-left text-xs font-normal border-r border-blue-200">N° d&apos;art</th>
            <th className="p-2 text-left text-xs font-normal border-r border-blue-200">Longueur mm</th>
            <th className="p-2 text-left text-xs font-normal border-r border-blue-200">Largeur mm</th>
            <th className="p-2 text-left text-xs font-normal border-r border-blue-200">Hauteur mm</th>
            <th className="p-2 text-left text-xs font-normal">Prix net CHF / mètre</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row: any, i: number) => {
            const id = getVal(row, ["id", "Id", "artNr", "art_nr", "articleNumber", "article"]);
            const length = getVal(row, ["length", "laenge", "Länge", "lengthMm", "l", "L"]);
            const width = getVal(row, ["width", "breite", "Breite", "widthMm", "b", "B"]);
            const height = getVal(row, ["height", "hoehe", "Höhe", "heightMm", "h", "H"]);
            const priceRaw = getVal(row, ["price", "preis", "netPrice", "netto", "net_price"], "-");
            const priceNum = toNumber(priceRaw);

            return (
              <tr key={`${id}-${i}`} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="p-3 border-r border-gray-100 font-medium">{id}</td>
                <td className="p-3 border-r border-gray-100">{length}</td>
                <td className="p-3 border-r border-gray-100">{width}</td>
                <td className="p-3 border-r border-gray-100">{height}</td>
                <td className="p-3 font-bold">
                  {priceNum !== null ? priceNum.toFixed(2) : priceRaw}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
