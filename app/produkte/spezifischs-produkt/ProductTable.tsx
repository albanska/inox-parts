"use client";

import React from "react";

function pickRows(product: any) {
  return (
    product?.items ||
    product?.variants ||
    product?.rows ||
    product?.products ||
    product?.data ||
    []
  );
}

function getVal(row: any, keys: string[], fallback: any = "-") {
  for (const k of keys) {
    const v = row?.[k];
    if (v !== undefined && v !== null && v !== "") return v;
  }
  return fallback;
}

export default function ProductTable({ product }: { product: any }) {
  const rows = pickRows(product);

  return (
    <div className="w-full bg-white mt-6">
      {/* 🔴 TEST BANNER – duhet të shihet patjetër */}
      <div className="p-6 bg-red-500 text-white font-bold text-xl">
        NEW TABLE VERSION LOADED
      </div>

      {(!rows || rows.length === 0) && (
        <div className="p-6 text-sm text-gray-500">
          No variants found.
        </div>
      )}

      {rows && rows.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-[860px] w-full border-collapse">
            <thead>
              {/* Header row 1 – DE */}
              <tr className="bg-[#1f86d6] text-white">
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Art.-Nr.
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Länge mm
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Breite mm
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Höhe mm
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Netto Preis CHF / Meter
                </th>
              </tr>

              {/* Header row 2 – FR */}
              <tr className="bg-[#4aa6e6] text-white">
                <th className="px-4 py-2 text-left text-xs font-medium">
                  N° d&apos;art
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium">
                  Longueur mm
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium">
                  Largeur mm
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium">
                  Hauteur mm
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium">
                  Prix net CHF / mètre
                </th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row: any, idx: number) => {
                const id = getVal(row, [
                  "id",
                  "Id",
                  "artNr",
                  "art_nr",
                  "article",
                  "articleNumber",
                ]);

                const length = getVal(row, [
                  "length",
                  "laenge",
                  "Länge",
                  "lengthMm",
                  "l",
                ]);

                const width = getVal(row, [
                  "width",
                  "breite",
                  "Breite",
                  "widthMm",
                  "b",
                ]);

                const height = getVal(row, [
                  "height",
                  "hoehe",
                  "Höhe",
                  "heightMm",
                  "h",
                ]);

                const price = getVal(row, [
                  "price",
                  "preis",
                  "netPrice",
                  "netto",
                ]);

                const priceNum =
                  typeof price === "string"
                    ? Number(price.replace(",", "."))
                    : Number(price);

                return (
                  <tr
                    key={`${id}-${idx}`}
                    className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="px-4 py-2 text-sm">{id}</td>
                    <td className="px-4 py-2 text-sm">{length}</td>
                    <td className="px-4 py-2 text-sm">{width}</td>
                    <td className="px-4 py-2 text-sm">{height}</td>
                    <td className="px-4 py-2 text-sm">
                      {Number.isFinite(priceNum)
                        ? priceNum.toFixed(2)
                        : price}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
