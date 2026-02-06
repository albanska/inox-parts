"use client";

import React from "react";
import { transformProduct } from "@/helpers/transformProduct";

type Row = {
  productId?: string;
  typ?: string;
  lange?: string;
  breite?: string;
  hohe?: string;
  price?: string;
};

function toMoney(v: any) {
  if (v === null || v === undefined) return "-";
  const s = String(v).replace(",", ".").replace(/[^\d.]/g, "");
  const n = Number(s);
  if (!Number.isFinite(n)) return String(v);
  return n.toFixed(2);
}

function getRows(product: any): { rows: Row[]; priceUnit: string } {
  // 1) Primary: your real structure (tags + ids) via transformProduct()
  try {
    if (product?.tags && Array.isArray(product.tags) && product?.ids && Array.isArray(product.ids)) {
      const t = transformProduct(product);
      const rows = Array.isArray(t?.ids) ? (t.ids as Row[]) : [];
      const unit = (t?.priceOption || "").toString().toUpperCase(); // "M" or "STK"
      return { rows, priceUnit: unit || "" };
    }
  } catch (e) {
    // ignore and fallback below
  }

  // 2) Fallback: if later you have items/variants
  const fallbackRows = (product?.items || product?.variants || []) as any[];
  const rows: Row[] = fallbackRows.map((r) => ({
    productId: r?.id || r?.artNr || r?.articleNumber,
    lange: r?.length || r?.lange,
    breite: r?.width || r?.breite,
    hohe: r?.height || r?.hohe,
    price: r?.price || r?.netPrice,
  }));

  return { rows, priceUnit: "" };
}

export default function ProductTable({ product }: { product: any }) {
  const { rows, priceUnit } = getRows(product);

  if (!rows || rows.length === 0) {
    return (
      <div className="w-full bg-white border border-gray-200 p-6 text-sm text-gray-500">
        No variants found.
      </div>
    );
  }

  // Transpose: rows become columns
  const attributes = [
    { deLabel: "Art.-Nr.", frLabel: "N° d'art", key: "productId" },
    { deLabel: "Länge mm", frLabel: "Longueur mm", key: "lange" },
    { deLabel: "Breite mm", frLabel: "Largeur mm", key: "breite" },
    { deLabel: "Höhe mm", frLabel: "Hauteur mm", key: "hohe" },
    { deLabel: `Netto Preis CHF / ${priceUnit || "Einheit"}`, frLabel: `Prix net CHF / ${priceUnit ? (priceUnit === "M" ? "mètre" : "pièce") : "unité"}`, key: "price" },
  ];

  return (
    <div className="w-full bg-white border border-gray-200 overflow-x-auto">
      <table className="border-collapse text-sm">
        <thead>
          {/* Header row (Fixed column + Article numbers) */}
          <tr className="bg-[#1f86d6] text-white">
            {/* <th className="px-4 py-3 text-left font-semibold sticky left-0 bg-[#1f86d6] min-w-[140px]">Attribute</th> */}
            {rows.map((r, i) => (
              <th key={`header-${i}`} className="px-4 py-3 text-center font-semibold min-w-[120px]">
                {r.productId || "-"}
              </th>
            ))}
          </tr>
          
          {/* Subheader row (FR translations) */}
          <tr className="bg-[#4aa6e6] text-white">
            <th className="px-4 py-2 text-left text-xs font-medium sticky left-0 bg-[#4aa6e6] min-w-[140px]">Attribut</th>
            {rows.map((r, i) => (
              <th key={`subheader-${i}`} className="px-4 py-2 text-center text-xs font-medium min-w-[120px]">
                {r.productId || "-"}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {attributes.map((attr, attrIdx) => (
            <tr key={`attr-${attrIdx}`} className={attrIdx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="px-4 py-3 font-medium text-[#2d3142] sticky left-0 bg-inherit min-w-[140px]">
                <div>{attr.deLabel}</div>
                <div className="text-xs text-gray-600">{attr.frLabel}</div>
              </td>
              {rows.map((r, rowIdx) => {
                let value = r[attr.key as keyof Row] || "-";
                if (attr.key === "price") {
                  value = toMoney(value);
                }
                return (
                  <td key={`cell-${attrIdx}-${rowIdx}`} className="px-4 py-3 text-center font-medium min-w-[120px]">
                    {value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
