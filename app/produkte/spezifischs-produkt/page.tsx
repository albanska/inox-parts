"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import ProductInfoMobile from "@/app/components/specific-product/ProductInfoMobile";
import ProductInfo from "@/app/components/specific-product/ProductInfo";
import Loader from "@/app/components/loader/Loader";
import ErrorState from "@/app/components/specific-product/ErrorState";
import getSpecificProduct from "@/helpers/getSpecificProduct";

// ---- helpers to find variants deep inside product ----
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
  // Usually a row has id + at least one dimension OR price
  return hasId && (hasDim || hasPrice);
}

function pickRowsDeep(root: any): any[] {
  const visited = new WeakSet<object>();
  const candidates: any[][] = [];

  function walk(node: any) {
    if (!node) return;

    // arrays: if they look like rows, store
    if (Array.isArray(node)) {
      const good = node.filter(isRowCandidate);
      if (good.length >= 1) candidates.push(good);
      // still walk inside (sometimes arrays contain nested objects)
      for (const item of node) walk(item);
      return;
    }

    if (typeof node !== "object") return;

    if (visited.has(node)) return;
    visited.add(node);

    for (const k of Object.keys(node)) {
      walk(node[k]);
    }
  }

  walk(root);

  // return the longest candidate list
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

        if (typeof window !== "undefined") {
          window.location.hash = id as string;
        }
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

  // ✅ this is the key: find variants anywhere inside product object
  const rows = pickRowsDeep(product);

  const formatName = (name: string) =>
    String(name || "")
      .replace("-", " ")
      .toLowerCase()
      .split(" ")
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  function handleProductIdChange(direction: "left" | "right") {
    if (direction === "right") {
      const id = nextProduct?.id;
      if (id) setProductId(id);
    }
    if (direction === "left") {
      const id = prevProduct?.id;
      if (id) setProductId(id);
    }
  }

  return (
    <div className="w-full min-h-dvh lg:mb-10 relative">
      {/* Mobile header */}
      <ProductInfoMobile product={product} />

      <div className="relative w-full max-w-[1200px] mx-auto px-4 md:px-10 -mt-6 lg:mt-0">
        {/* Left Arrow */}
        {!!prevProduct?.id && (
          <div className="hidden md:block absolute top-24 -left-6 lg:-left-14 z-10 hover:scale-105 transition-all hover:bg-[#259fd332] rounded-md shadow-xl group bg-white">
            <button
              onClick={() => handleProductIdChange("left")}
              className="h-28 w-8 flex justify-center items-center hover:-translate-x-0.5 transition-all"
              aria-label="Previous product"
            >
              <ArrowLeft strokeWidth={3} className="text-[#9a8c98]" />
            </button>

            <div className="absolute px-2 py-1 top-0 right-full mr-2 hidden group-hover:flex justify-center items-center h-full w-fit">
              <div className="bg-gray-100 text-xs text-center px-4 py-2">
                <h2 className="font-semibold text-[#9a8c98]">
                  {prevProduct?.count ?? ""}.{" "}
                  <span className="text-wrap">{formatName(prevProduct?.name)}</span>
                </h2>
              </div>
            </div>
          </div>
        )}

        {/* Right Arrow */}
        {!!nextProduct?.id && (
          <div className="hidden md:block absolute top-24 -right-6 lg:-right-14 z-10 hover:scale-105 transition-all hover:bg-[#259fd332] rounded-md shadow-xl group bg-white">
            <button
              onClick={() => handleProductIdChange("right")}
              className="h-28 w-8 flex justify-center items-center hover:translate-x-0.5 transition-all"
              aria-label="Next product"
            >
              <ArrowRight strokeWidth={3} className="text-[#9a8c98]" />
            </button>

            <div className="absolute px-2 py-1 top-0 left-full ml-2 hidden group-hover:flex justify-center items-center h-full w-fit">
              <div className="bg-gray-100 text-xs text-center px-4 py-2">
                <h2 className="font-semibold text-[#9a8c98]">
                  {(typeof nextProduct?.count === "number" ? nextProduct.count + 2 : "")}.{" "}
                  <span className="text-wrap">{formatName(nextProduct?.name)}</span>
                </h2>
              </div>
            </div>
          </div>
        )}

        {/* Desktop header */}
        <div className="hidden md:block bg-white">
          <ProductInfo
            product={product}
            handleProductIdChange={(dir: string) =>
              handleProductIdChange(dir === "right" ? "right" : "left")
            }
            leftId={prevProduct?.id ?? null}
          />
        </div>

        {/* TABLE (PDF style) */}
        <div className="mt-6 w-full bg-white">
          {!rows || rows.length === 0 ? (
            <div className="p-6 text-sm text-gray-500">
              No variants found. (Rows not detected in product object)
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
}
