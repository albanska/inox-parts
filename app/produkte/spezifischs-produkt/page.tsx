"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import ProductInfoMobile from "@/app/components/specific-product/ProductInfoMobile";
import ProductInfo from "@/app/components/specific-product/ProductInfo";
import ProductTable from "@/app/components/specific-product/ProductTable";
import Loader from "@/app/components/loader/Loader";
import ErrorState from "@/app/components/specific-product/ErrorState";
import getSpecificProduct from "@/helpers/getSpecificProduct";

// ---------------- VARIANT ROW FINDER (same logic as ProductTable) ----------------
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

function formatTitle(name: any) {
  return String(name || "")
    .replace(/-/g, " ")
    .trim()
    .toUpperCase();
}

// ---------------- UI: horizontal variant strip ----------------
function HorizontalVariants({ product }: { product: any }) {
  const rows = pickRowsDeep(product);

  if (!rows || rows.length === 0) return null;

  return (
    <div className="w-full bg-white mt-4">
      <div className="px-4 md:px-0 pt-4">
        <div className="text-xs text-gray-500">Varianten</div>
      </div>

      <div className="mt-2 overflow-x-auto">
        <div className="flex gap-4 px-4 md:px-0 pb-4 snap-x snap-mandatory">
          {rows.map((row: any, idx: number) => {
            const id = getVal(row, ID_KEYS);
            const l = getVal(row, LEN_KEYS, "");
            const b = getVal(row, WID_KEYS, "");
            const h = getVal(row, HEI_KEYS, "");
            const price = getVal(row, PRI_KEYS, "");

            return (
              <div
                key={`${id}-${idx}`}
                className="min-w-[260px] max-w-[260px] bg-[#f5f5f5] border border-gray-200 rounded-lg p-4 snap-start"
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">ID</div>
                  <div className="text-sm font-semibold text-gray-800">{id}</div>
                </div>

                <div className="mt-3 space-y-2 text-sm">
                  {l !== "" && (
                    <div className="flex justify-between border-b border-dashed border-[#1f86d6] pb-2">
                      <span className="text-gray-600">L</span>
                      <span className="font-medium text-gray-800">{l} mm</span>
                    </div>
                  )}
                  {b !== "" && (
                    <div className="flex justify-between border-b border-dashed border-[#1f86d6] pb-2">
                      <span className="text-gray-600">B</span>
                      <span className="font-medium text-gray-800">{b} mm</span>
                    </div>
                  )}
                  {h !== "" && (
                    <div className="flex justify-between border-b border-dashed border-[#1f86d6] pb-2">
                      <span className="text-gray-600">H</span>
                      <span className="font-medium text-gray-800">{h} mm</span>
                    </div>
                  )}

                  <div className="flex justify-between pt-1">
                    <span className="text-gray-600">CHF</span>
                    <span className="font-semibold text-gray-900">{price}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [productId, setProductId] = useState<string | null>(null);
  const [resp, setResp] = useState<any>(null);

  useEffect(() => {
    let id = productId;

    if (!id && typeof window !== "undefined") {
      id = window.location.hash.replace("#", "");
    }
    if (!id) return;

    async function run() {
      try {
        const res = await getSpecificProduct(id as string);
        setResp(res);

        if (typeof window !== "undefined") window.location.hash = id as string;
      } catch (e) {
        setResp({ status: "500", error: String(e) });
      }
    }

    run();
  }, [productId]);

  if (resp === null) return <Loader />;
  if (resp?.status === "404") return <ErrorState errorStatus={resp} />;

  const product = resp?.product ?? null;
  const prevProduct = resp?.prevProduct ?? null;
  const nextProduct = resp?.nextProduct ?? null;

  if (!product) {
    return (
      <div className="p-6 text-red-600 font-bold">
        Product data missing or invalid response.
      </div>
    );
  }

  function handleProductIdChange(direction: "left" | "right") {
    if (direction === "right") {
      const id = nextProduct?.id;
      if (id) setProductId(id);
    } else {
      const id = prevProduct?.id;
      if (id) setProductId(id);
    }
  }

  return (
    <div className="w-full min-h-dvh lg:mb-10 relative">
      <div className="relative w-full max-w-[1200px] mx-auto px-4 md:px-10 pt-6">
        {/* ✅ TITLE ON TOP */}
        <div className="bg-white p-4 md:p-6">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2d3142]">
            {formatTitle(product?.name)}
          </h1>
          {product?.description && (
            <div className="text-sm text-gray-500 mt-1 uppercase">
              {String(product.description)}
            </div>
          )}

          {product?.info && (
            <div className="mt-3 text-sm font-medium text-gray-700 border-b-2 border-[#1f86d6] inline-block">
              {String(product.info)}
            </div>
          )}
        </div>

        {/* Arrows (desktop) */}
        {!!prevProduct?.id && (
          <div className="hidden md:block absolute top-28 -left-6 lg:-left-14 z-10 hover:scale-105 transition-all hover:bg-[#259fd332] rounded-md shadow-xl group bg-white">
            <button
              onClick={() => handleProductIdChange("left")}
              className="h-28 w-8 flex justify-center items-center hover:-translate-x-0.5 transition-all"
            >
              <ArrowLeft strokeWidth={3} className="text-[#9a8c98]" />
            </button>
          </div>
        )}

        {!!nextProduct?.id && (
          <div className="hidden md:block absolute top-28 -right-6 lg:-right-14 z-10 hover:scale-105 transition-all hover:bg-[#259fd332] rounded-md shadow-xl group bg-white">
            <button
              onClick={() => handleProductIdChange("right")}
              className="h-28 w-8 flex justify-center items-center hover:translate-x-0.5 transition-all"
            >
              <ArrowRight strokeWidth={3} className="text-[#9a8c98]" />
            </button>
          </div>
        )}

        {/* Keep your existing product image/info components (safe) */}
        <ProductInfoMobile product={product} />
        <div className="hidden md:block bg-white">
          <ProductInfo
            product={product}
            handleProductIdChange={(dir: string) =>
              handleProductIdChange(dir === "right" ? "right" : "left")
            }
            leftId={prevProduct?.id ?? null}
          />
        </div>

        {/* ✅ VARIANTS HORIZONTAL */}
        <HorizontalVariants product={product} />

        {/* ✅ TABLE (PDF style) */}
        <ProductTable product={product} />
      </div>
    </div>
  );
}
