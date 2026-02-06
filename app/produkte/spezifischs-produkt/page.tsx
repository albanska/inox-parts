"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import Loader from "@/app/components/loader/Loader";
import ErrorState from "@/app/components/specific-product/ErrorState";

import ProductInfoMobile from "@/app/components/specific-product/ProductInfoMobile";
import ProductInfo from "@/app/components/specific-product/ProductInfo";

import getSpecificProduct from "@/helpers/getSpecificProduct";

function safeText(v: any): string {
  if (v === null || v === undefined) return "";
  if (typeof v === "string") return v;
  if (typeof v === "number") return String(v);
  return "";
}

function formatTitle(name: any) {
  const s = safeText(name).replace(/-/g, " ").trim();
  return s ? s.toUpperCase() : "PRODUCT";
}

function normalizeUrl(src: string) {
  if (!src) return "";
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  if (src.startsWith("/")) return src;
  return `/${src}`;
}

// ✅ strong image picker (tries many keys, also shallow JSON fallback)
function getImageSrc(product: any): string {
  const candidates: any[] = [
    product?.image,
    product?.img,
    product?.imageUrl,
    product?.imageURL,
    product?.image_url,
    product?.photo,
    product?.photoUrl,
    product?.thumbnail,
    product?.thumb,
    product?.src,
    product?.url,

    // nested common:
    product?.media?.url,
    product?.media?.src,
    product?.media?.image,
    product?.media?.[0]?.url,
    product?.media?.[0]?.src,

    product?.images?.[0],
    product?.images?.[0]?.url,
    product?.images?.[0]?.src,
  ];

  for (const c of candidates) {
    if (!c) continue;
    if (typeof c === "string") return normalizeUrl(c);
    if (typeof c === "object") {
      if (typeof c?.url === "string") return normalizeUrl(c.url);
      if (typeof c?.src === "string") return normalizeUrl(c.src);
    }
  }

  // last fallback: find any image-like path inside product JSON (shallow)
  try {
    const s = JSON.stringify(product);
    const m = s.match(
      /(https?:\/\/[^"']+\.(png|jpg|jpeg|webp|gif|svg)|\/[^"']+\.(png|jpg|jpeg|webp|gif|svg))/i
    );
    if (m?.[1]) return normalizeUrl(m[1]);
  } catch {}

  return "";
}

export default function Page() {
  const [productId, setProductId] = useState<string | null>(null);
  const [resp, setResp] = useState<any>(null);

  useEffect(() => {
    let id = productId;

    if (!id && typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      id = hash;
    }

    if (!id) return;

    (async () => {
      try {
        const res = await getSpecificProduct(id as string);
        setResp(res);
        if (typeof window !== "undefined") window.location.hash = id as string;
      } catch (e) {
        setResp({ status: "500", error: String(e) });
      }
    })();
  }, [productId]);

  if (resp === null) return <Loader />;
  if (resp?.status === "404") return <ErrorState errorStatus={resp} />;

  const product = resp?.product;
  if (!product) {
    return (
      <div className="p-6 text-red-600 font-bold">
        Product data missing.
      </div>
    );
  }

  const prevId = resp?.prevProduct?.id ?? null;
  const nextId = resp?.nextProduct?.id ?? null;

  function handleProductIdChange(direction: "left" | "right") {
    if (direction === "left" && prevId) setProductId(prevId);
    if (direction === "right" && nextId) setProductId(nextId);
  }

  // ✅ header fields
  const title = formatTitle(product?.name || product?.title);
  const subtitle = safeText(product?.subtitle || product?.subTitle || product?.description || "");
  const infoLine = safeText(product?.info || product?.material || product?.thickness || "");

  const imgSrc = useMemo(() => getImageSrc(product), [product]);

  return (
    <div className="w-full min-h-dvh relative">
      {/* keep mobile layout from old system */}
      <ProductInfoMobile product={product} />

      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-10 py-8 relative">
        {/* Left Arrow */}
        {prevId && (
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

        {/* Right Arrow */}
        {nextId && (
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

        {/* ✅ HEADER (left text, right image) */}
        <div className="bg-white p-6">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_420px] gap-8 items-start">
            {/* LEFT */}
            <div>
              <div className="text-center text-gray-300 text-[10px] uppercase tracking-widest mb-6 hidden md:block">
                PRODUKTKATALOG &amp; PREISLISTE 2026
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-[#2d3142] uppercase">
                {title}
              </h1>

              {subtitle ? (
                <div className="mt-1 text-xl text-gray-400">
                  {subtitle}
                </div>
              ) : null}

              {/* blue underline */}
              <div className="mt-5 border-b-2 border-[#1f86d6] w-[220px]" />

              {infoLine ? (
                <div className="mt-3 text-sm text-gray-700 font-medium">
                  {infoLine}
                </div>
              ) : null}
            </div>

            {/* RIGHT IMAGE */}
            <div className="w-full">
              <div className="w-full border border-gray-200 bg-white">
                {imgSrc ? (
                  <img
                    src={imgSrc}
                    alt={title}
                    className="w-full h-[260px] md:h-[320px] object-contain p-2"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <div className="w-full h-[260px] md:h-[320px] flex items-center justify-center text-sm text-gray-300">
                    No image found
                  </div>
                )}
              </div>

              {/* DEBUG (optional): show what image URL we found) */}
              {/* <div className="mt-2 text-xs text-gray-400 break-all">{imgSrc}</div> */}
            </div>
          </div>
        </div>

        {/* ✅ OLD VERTICAL BOXES - keep them exactly as before */}
        <div className="mt-6">
          <ProductInfo
            product={product}
            handleProductIdChange={(dir: string) =>
              handleProductIdChange(dir === "right" ? "right" : "left")
            }
            leftId={prevId}
          />
        </div>
      </div>
    </div>
  );
}
