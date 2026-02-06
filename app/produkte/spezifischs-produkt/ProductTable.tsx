"use client";

import React from "react";

function toNumber(v: any): number | null {
  if (v === null || v === undefined) return null;
  if (typeof v === "number") return Number.isFinite(v) ? v : null;
  if (typeof v === "string") {
    const n = Number(v.replace(",", ".").trim());
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

function pickRows(product: any): any[] {
  // common keys
  const direct =
    product?.items ||
    product?.variants ||
    product?.rows ||
    product?.products ||
    product?.data;

  if (Array.isArray(direct)) return direct;

  // try to find first array of objects that looks like variants
  if (product && typeof product === "object") {
    for (const key of Object.keys(product)) {
      const v = (product as any)[key];
      if (Array.isArray(v) && v.length && typeof v[0] === "object") {
        const sample = v[0];
        const hasId =
          "id" in sample ||
          "Id" in sample ||
          "artNr" in sample ||
          "articleNumber" in sample;
        const hasSize =
          "length" in sample ||
          "laenge" in sample ||
          "width" in sample ||
          "breite" in sample ||
          "height" in sample ||
          "hoehe" in sample;
        const hasPrice = "price" in sample || "preis" in sample || "netPrice" in sample;
        if (hasId && (hasSize || hasPrice)) return v;
      }
    }
  }

  return [];
}

function getVal(row: any, keys: string[], fallback: any = "") {
  for (const k of keys) {
    const v = row?.[k];
    if (v !== undefined && v !== null && v !== "") return v;
  }
  return fallback;
}

export default function ProductTable({ product }: { product: any }) {
  const rows = pickRows(product);

  if (!rows || rows.length === 0) {
    return (
      <div className="bg-white border border-gray-200 p-6 text-sm text-gray-400">
        No variants found.
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto bg-white border border-gray-200">
      <table className="w-full border-collapse text-sm min-w-[860px]">
        <thead>
          {/* DE header */}
          <tr className="bg-[#1e88d3] text-white">
            <th className="p-3 text-left border-r border-blue-400">Art.-Nr.</th>
            <th className="p-3 text-left border-r border-blue-400">Länge mm</th>
            <th className="p-3 text-left border-r border-blue-400">Breite mm</th>
            <th className="p-3 text-left border-r border-blue-400">Höhe mm</th>
            <th className="p-3 text-left">Netto Preis CHF / Meter</th>
          </tr>

          {/* FR header */}
          <tr className="bg-[#89c4f4] text-white">
            <th className="p-2 text-left border-r border-blue-200 text-xs font-normal">
              N° d&apos;art
            </th>
            <th className="p-2 text-left border-r border-blue-200 text-xs font-normal">
              Longueur mm
            </th>
            <th className="p-2 text-left border-r border-blue-200 text-xs font-normal">
              Largeur mm
            </th>
            <th className="p-2 text-left border-r border-blue-200 text-xs font-normal">
              Hauteur mm
            </th>
            <th className="p-2 text-left text-xs font-normal">
              Prix net CHF / mètre
            </th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row: any, i: number) => {
            const id = getVal(row, ["id", "Id", "artNr", "art_nr", "articleNumber", "article"]);

            const length = getVal(row, ["length", "laenge", "Länge", "lengthMm", "l"], "");
            const width = getVal(row, ["width", "breite", "Breite", "widthMm", "b"], "");
            const height = getVal(row, ["height", "hoehe", "Höhe", "heightMm", "h"], "");

            const priceRaw = getVal(row, ["price", "preis", "netPrice", "netto"], "");
            const priceNum = toNumber(priceRaw);

            return (
              <tr key={`${id}-${i}`} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="p-3 border-r border-gray-100 font-medium">{String(id)}</td>
                <td className="p-3 border-r border-gray-100">{String(length || "-")}</td>
                <td className="p-3 border-r border-gray-100">{String(width || "-")}</td>
                <td className="p-3 border-r border-gray-100">{String(height || "-")}</td>
                <td className="p-3 font-bold">
                  {priceNum !== null ? priceNum.toFixed(2) : String(priceRaw || "-")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
