"use client";

import React from "react";

function toNumberString(v: any) {
  if (v === null || v === undefined) return "-";
  if (typeof v === "number") return String(v);
  if (typeof v === "string") return v.trim();
  return "-";
}

function pickRows(product: any) {
  // dataset yt real: product.ids është array of arrays
  // p.sh. [ ["21.100","Eckig","1000","78","20","CHF 35.00"], ... ]
  const ids = product?.ids;
  return Array.isArray(ids) ? ids : [];
}

export default function ProductTable({ product }: { product: any }) {
  const rows = pickRows(product);

  if (!rows.length) {
    return (
      <div className="bg-white p-6 text-sm text-gray-500">
        No variants found.
      </div>
    );
  }

  // këto headera duhet me u përshtat me rendin e kolonave që i ke në ids[][]
  // shumica e produkteve i kanë: [id, typ, länge, breite, höhe, preis]
  return (
    <div className="w-full bg-white overflow-x-auto border border-gray-200">
      <table className="min-w-[860px] w-full border-collapse text-sm">
        <thead>
          <tr className="bg-[#1e88d3] text-white">
            <th className="p-3 text-left border-r border-blue-400">Art.-Nr.</th>
            <th className="p-3 text-left border-r border-blue-400">Länge mm</th>
            <th className="p-3 text-left border-r border-blue-400">Breite mm</th>
            <th className="p-3 text-left border-r border-blue-400">Höhe mm</th>
            <th className="p-3 text-left">Netto Preis CHF / Meter</th>
          </tr>
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
          {rows.map((r: any, i: number) => {
            const row = Array.isArray(r) ? r : [];

            // Rendi tipik: [id, typ, länge, breite, höhe, price]
            const artNr = toNumberString(row[0]);
            const lange = toNumberString(row[2] ?? row[1]); // nëse s’ke typ, bie te [1]
            const breite = toNumberString(row[3]);
            const hohe = toNumberString(row[4]);
            const price = toNumberString(row[row.length - 1]); // e fundit zakonisht çmimi

            return (
              <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="p-3 border-r border-gray-100 font-medium">{artNr}</td>
                <td className="p-3 border-r border-gray-100">{lange}</td>
                <td className="p-3 border-r border-gray-100">{breite}</td>
                <td className="p-3 border-r border-gray-100">{hohe}</td>
                <td className="p-3 font-bold">{price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
