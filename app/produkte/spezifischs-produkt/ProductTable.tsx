"use client";

import React from "react";

const ID_KEYS = ["id", "Id", "artNr", "art_nr", "article", "articleNumber"];
const LEN_KEYS = ["length", "laenge", "Länge", "Lange", "lengthMm", "l"];
const WID_KEYS = ["width", "breite", "Breite", "widthMm", "b"];
const HEI_KEYS = ["height", "hoehe", "Höhe", "heightMm", "h"];
const PRI_KEYS = ["price", "preis", "Price", "netto", "netPrice"];

function hasAnyKey(obj: any, keys: string[]) {
  if (!obj || typeof obj !== "object") return false;
  return keys.some((k) => obj[k] !== undefined && obj[k] !== null && obj[k] !== "");
}

function isRowCandidate(x: any) {
  if (!x || typeof x !== "object") return false;
  const hasId = hasAnyKey(x, ID_KEYS);
  const hasDim = hasAnyKey(x, LEN_KEYS) || hasAnyKey(x, WID_KEYS) || hasAnyKey(x, HEI_KEYS);
  const hasPrice = hasAnyKey(x, PRI_KEYS);
  return hasId && (hasDim || hasPrice);
}

function pickRowsDeep(root: any): any[] {
  const visited = new WeakSet<object>();
  const candidates: any[][] = [];

  function walk(node: any) {
    if (!node) return;

    if (Array.isArray(node)) {
      const good = node.filter(isRowCandidate);
      if (good.length >= 1) candidates.push(good);
      for (const item of node) walk(item);
      return;
    }

    if (typeof node !== "object") return;
    if (visited.has(node)) return;
    visited.add(node);

    for (const k of Object.keys(node)) walk(node[k]);
  }

  walk(root);
  candidates.sort((a, b) => b.length - a.length);
  return candidates[0] || [];
}

function getVal(row: any, keys: string[], fallback: any = "-") {
  for (const k of keys) {
    const v = row?.[k];
    if (v !== undefined && v !== null && v !== "") return v;
  }
  return fallback;
}

export default function ProductTable({ product }: { product: any }) {
  const rows = pickRowsDeep(product);

  if (!rows || rows.length === 0) {
    return <div className="p-6 text-sm text-gray-500">No variants found.</div>;
  }

  return (
    <div className="w-full bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-[860px] w-full border-collapse">
          <thead>
            <tr className="bg-[#1f86d6] text-white">
              <th className="px-4 py-3 text-left text-sm font-semibold">Art.-Nr.</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Länge mm</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Breite mm</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Höhe mm</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Netto Preis CHF / Meter
              </th>
            </tr>

            <tr className="bg-[#4aa6e6] text-white">
              <th className="px-4 py-2 text-left text-xs font-medium">N° d&apos;art</th>
              <th className="px-4 py-2 text-left text-xs font-medium">Longueur mm</th>
              <th className="px-4 py-2 text-left text-xs font-medium">Largeur mm</th>
              <th className="px-4 py-2 text-left text-xs font-medium">Hauteur mm</th>
              <th className="px-4 py-2 text-left text-xs font-medium">Prix net CHF / mètre</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row: any, idx: number) => {
              const id = getVal(row, ID_KEYS);
              const length = getVal(row, LEN_KEYS);
              const width = getVal(row, WID_KEYS);
              const height = getVal(row, HEI_KEYS);
              const price = getVal(row, PRI_KEYS);

              const priceNum =
                typeof price === "string" ? Number(price.replace(",", ".")) : Number(price);

              return (
                <tr key={`${id}-${idx}`} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="px-4 py-2 text-sm">{id}</td>
                  <td className="px-4 py-2 text-sm">{length}</td>
                  <td className="px-4 py-2 text-sm">{width}</td>
                  <td className="px-4 py-2 text-sm">{height}</td>
                  <td className="px-4 py-2 text-sm">
                    {Number.isFinite(priceNum) ? priceNum.toFixed(2) : price}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
