"use client";

import React from "react";

export default function ProductTable({ product }: { product: any }) {
  const rows = product?.items || product?.variants || [];

  if (!rows.length) return <div className="text-gray-400 py-10">No data available.</div>;

  return (
    <div className="w-full overflow-x-auto border border-gray-200">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-[#1e88d3] text-white">
            <th className="p-3 text-left border-r border-blue-400">Art.-Nr.</th>
            <th className="p-3 text-left border-r border-blue-400">Länge mm</th>
            <th className="p-3 text-left border-r border-blue-400">Breite mm</th>
            <th className="p-3 text-left border-r border-blue-400">Höhe mm</th>
            <th className="p-3 text-left">Netto Preis CHF / Meter</th>
          </tr>
          <tr className="bg-[#89c4f4] text-white italic">
            <th className="p-2 text-left border-r border-blue-200 text-xs font-normal">N° d&apos;art</th>
            <th className="p-2 text-left border-r border-blue-200 text-xs font-normal">Longueur mm</th>
            <th className="p-2 text-left border-r border-blue-200 text-xs font-normal">Largeur mm</th>
            <th className="p-2 text-left border-r border-blue-200 text-xs font-normal">Hauteur mm</th>
            <th className="p-2 text-left text-xs font-normal">Prix net CHF / mètre</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row: any, i: number) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="p-3 border-r border-gray-100 font-medium">{row.id || row.artNr}</td>
              <td className="p-3 border-r border-gray-100">{row.length || "2000"}</td>
              <td className="p-3 border-r border-gray-100">{row.width || "-"}</td>
              <td className="p-3 border-r border-gray-100">{row.height || "-"}</td>
              <td className="p-3 font-bold">{(row.price || 0).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
