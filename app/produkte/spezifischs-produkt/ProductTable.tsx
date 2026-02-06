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

  return (
    <div className="w-full bg-white border border-gray-200 overflow-x-auto">
      <table className="w-full min-w-[860px] border-collapse text-sm">
        <thead>
          {/* Header row 1 (DE) */}
          <tr className="bg-[#1f86d6] text-white">
            <th className="px-4 py-3 text-left font-semibold">Art.-Nr.</th>
            <th className="px-4 py-3 text-left font-semibold">Länge mm</th>
            <th className="px-4 py-3 text-left font-semibold">Breite mm</th>
            <th className="px-4 py-3 text-left font-semibold">Höhe mm</th>
            <th className="px-4 py-3 text-left font-semibold">
              Netto Preis CHF / {priceUnit || "Einheit"}
            </th>
          </tr>

          {/* Header row 2 (FR) */}
          <tr className="bg-[#4aa6e6] text-white">
            <th className="px-4 py-2 text-left text-xs font-medium">N° d&apos;art</th>
            <th className="px-4 py-2 text-left text-xs font-medium">Longueur mm</th>
            <th className="px-4 py-2 text-left text-xs font-medium">Largeur mm</th>
            <th className="px-4 py-2 text-left text-xs font-medium">Hauteur mm</th>
            <th className="px-4 py-2 text-left text-xs font-medium">
              Prix net CHF / {priceUnit ? (priceUnit === "M" ? "mètre" : "pièce") : "unité"}
            </th>
          </tr>
        </thead>

        <tbody>
          {rows.map((r, i) => (
            <tr key={`${r.productId || "row"}-${i}`} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="px-4 py-3 font-medium text-[#2d3142]">{r.productId || "-"}</td>
              <td className="px-4 py-3">{r.lange || "-"}</td>
              <td className="px-4 py-3">{r.breite || "-"}</td>
              <td className="px-4 py-3">{r.hohe || "-"}</td>
              <td className="px-4 py-3 font-semibold">{toMoney(r.price)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
