"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import Loader from "@/app/components/loader/Loader";
import ErrorState from "@/app/components/specific-product/ErrorState";
import ProductTable from "@/app/components/specific-product/ProductTable";
import getSpecificProduct from "@/helpers/getSpecificProduct";

function getStr(obj: any, keys: string[], fallback = "") {
  for (const k of keys) {
    const v = obj?.[k];
    if (v !== undefined && v !== null && String(v).trim() !== "") return String(v);
  }
  return fallback;
}

function getImg(obj: any) {
  // provo disa field-e të zakonshme
  const direct = getStr(obj, [
    "image",
    "img",
    "imageUrl",
    "imageURL",
    "image_url",
    "photo",
    "photoUrl",
    "thumbnail",
    "thumb",
    "src",
    "url",
  ]);

  if (direct) return direct;

  // ndonjëherë është objekt
  const nested =
    obj?.image?.src ||
    obj?.image?.url ||
    obj?.img?.src ||
    obj?.img?.url ||
    obj?.photo?.src ||
    obj?.photo?.url;

  return nested || "";
}

function formatTitle(name: any) {
  return String(name || "")
    .replace(/-/g, " ")
    .trim()
    .toUpperCase();
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

  const title = formatTitle(getStr(product, ["name", "title"], "PRODUCT"));
  const subtitle = getStr(product, ["description", "subTitle", "subtitle"], "");
  const info = getStr(product, ["info", "material", "thickness"], "");
  const imgSrc = getImg(product);

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
    <div className="w-full min-h-dvh relative">
      <div className="relative w-full max-w-[1200px] mx-auto px-4 md:px-10 py-6">
        {/* Arrows */}
        {!!prevProduct?.id && (
          <div className="hidden md:block absolute top-24 -left-6 lg:-left-14 z-10 hover:scale-105 transition-all hover:bg-[#259fd332] rounded-md shadow-xl bg-white">
            <button
              onClick={() => handleProductIdChange("left")}
              className="h-28 w-8 flex justify-center items-center hover:-translate-x-0.5 transition-all"
              aria-label="Previous product"
            >
              <ArrowLeft strokeWidth={3} className="text-[#9a8c98]" />
            </button>
          </div>
        )}

        {!!nextProduct?.id && (
          <div className="hidden md:block absolute top-24 -right-6 lg:-right-14 z-10 hover:scale-105 transition-all hover:bg-[#259fd332] rounded-md shadow-xl bg-white">
            <button
              onClick={() => handleProductIdChange("right")}
              className="h-28 w-8 flex justify-center items-center hover:translate-x-0.5 transition-all"
              aria-label="Next product"
            >
              <ArrowRight strokeWidth={3} className="text-[#9a8c98]" />
            </button>
          </div>
        )}

        {/* ✅ PDF HEADER BLOCK */}
        <div className="bg-white p-6">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-6 items-start">
            {/* LEFT TEXT */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#2d3142]">
                {title}
              </h1>

              {subtitle ? (
                <div className="mt-1 text-sm text-gray-500 uppercase">
                  {subtitle}
                </div>
              ) : null}

              {info ? (
                <div className="mt-4 text-sm font-medium text-gray-700 border-b-2 border-[#1f86d6] inline-block pb-1">
                  {info}
                </div>
              ) : (
                <div className="mt-4 border-b-2 border-[#1f86d6] w-[140px]" />
              )}
            </div>

            {/* RIGHT IMAGE (small like PDF) */}
            <div className="w-full">
              <div className="w-full bg-white border border-gray-200">
                {imgSrc ? (
                  <img
                    src={imgSrc}
                    alt={title}
                    className="w-full h-[220px] object-contain p-2"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-[220px] flex items-center justify-center text-sm text-gray-400">
                    No image
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ✅ PDF TABLE (only this, no vertical cards) */}
        <div className="bg-white mt-6">
          <ProductTable product={product} />
        </div>
      </div>
    </div>
  );
}
