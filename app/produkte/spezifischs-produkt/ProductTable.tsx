"use client";

import React from "react";

function safeText(v: any): string {
  if (v === null || v === undefined) return "";
  if (typeof v === "string") return v;
  if (typeof v === "number") return String(v);
  return "";
}

function toPrice(v: any) {
  const s = safeText(v).replace(",", ".").trim();
  const n = Number(s);
  if (!Number.isFinite(n)) return safeText(v);
  return n.toFixed(2);
}

export default function ProductTable({ product }: { product: any }) {
  // ✅ transformProduct already created product.ids as array of objects
  const rows = Array.isArray(product?.ids) ? product.ids : [];
  const unit = safeText(product?.priceOption || "m").toUpperCase(); // M or STK

  if (!rows.length) {
    return (
      <div className="bg-white p-6 text-sm text-gray-500">
        No variants found.
      </div>
    );
  }

  return (
    <div className="w-full bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-[860px] w-full border-collapse">
          <thead>
            {/* Header row 1 (DE) */}
            <tr className="bg-[#1e88d3] text-white">
              <th className="p-3 text-left border-r border-blue-400">Art.-Nr.</th>
              <th className="p-3 text-left border-r border-blue-400">Länge mm</th>
              <th className="p-3 text-left border-r border-blue-400">Breite mm</th>
              <th className="p-3 text-left border-r border-blue-400">Höhe mm</th>
              <th className="p-3 text-left">Netto Preis CHF / {unit}</th>
            </tr>

            {/* Header row 2 (FR) */}
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
                Prix net CHF / {unit === "M" ? "mètre" : "pièce"}
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r: any, i: number) => (
              <tr key={`${r?.productId || "row"}-${i}`} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="p-3 border-r border-gray-100 font-medium">
                  {safeText(r?.productId)}
                </td>
                <td className="p-3 border-r border-gray-100">
                  {safeText(r?.lange)}
                </td>
                <td className="p-3 border-r border-gray-100">
                  {safeText(r?.breite)}
                </td>
                <td className="p-3 border-r border-gray-100">
                  {safeText(r?.hohe)}
                </td>
                <td className="p-3 font-bold">
                  {toPrice(r?.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
