"use client";

import React from "react";

function safeCell(v: any) {
  if (v === null || v === undefined || v === "") return "-";
  if (typeof v === "string") return v;
  if (typeof v === "number") return String(v);
  return "-";
}

function priceToText(v: any) {
  const s = safeCell(v);
  if (s === "-") return "-";
  // s’po e bëjmë number strict se disa produkte mund t’kenë tekst
  return s;
}

export default function ProductTable({ product }: { product: any }) {
  // ✅ këtu tani ids është array objektesh (nga transformProduct)
  const rows = Array.isArray(product?.ids) ? product.ids : [];

  // 🔴 nëse s’po e sheh këtë tekst, nuk je duke përdor këtë file
  // (atëherë po renderohet komponent i vjetër diku tjetër)
  // mundesh me e lan 1 minutë për test
  // pastaj e heqim
  const DEBUG = false;

  if (!rows.length) {
    return (
      <div className="bg-white p-6 text-sm text-gray-500">
        {DEBUG ? "DEBUG: ProductTable loaded, but no rows." : "No variants found."}
      </div>
    );
  }

  return (
    <div className="w-full bg-white overflow-x-auto border border-gray-200">
      {DEBUG && (
        <div className="p-4 bg-red-500 text-white font-bold">
          ProductTable.tsx LOADED ✅
        </div>
      )}

      <table className="min-w-[860px] w-full border-collapse text-sm">
        <thead>
          <tr className="bg-[#1e88d3] text-white">
            <th className="p-3 text-left border-r border-blue-400">Art.-Nr.</th>
            <th className="p-3 text-left border-r border-blue-400">Länge mm</th>
            <th className="p-3 text-left border-r border-blue-400">Breite mm</th>
            <th className="p-3 text-left border-r border-blue-400">Höhe mm</th>
            <th className="p-3 text-left">
              Netto Preis CHF / {safeCell(product?.priceOption || "Meter").toUpperCase()}
            </th>
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
              Prix net CHF / {safeCell(product?.priceOption || "mètre")}
            </th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row: any, i: number) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="p-3 border-r border-gray-100 font-medium">
                {safeCell(row?.productId)}
              </td>
              <td className="p-3 border-r border-gray-100">{safeCell(row?.lange)}</td>
              <td className="p-3 border-r border-gray-100">{safeCell(row?.breite)}</td>
              <td className="p-3 border-r border-gray-100">{safeCell(row?.hohe)}</td>
              <td className="p-3 font-bold">{priceToText(row?.price)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
