"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import Loader from "@/app/components/loader/Loader";
import ErrorState from "@/app/components/specific-product/ErrorState";
import getSpecificProduct from "@/helpers/getSpecificProduct";

/* ---------------- helpers ---------------- */

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
    product?.media?.url,
    product?.media?.src,
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

  return "";
}

/* ---------------- page ---------------- */

export default function Page() {
  const [productId, setProductId] = useState<string>("");
  const [resp, setResp] = useState<any>(null);

  // get id from hash
  useEffect(() => {
    const hashId = window.location.hash.replace("#", "");
    if (hashId) setProductId(hashId);
    else setResp({ status: "404" });
  }, []);

  // fetch product
  useEffect(() => {
    if (!productId) return;

    (async () => {
      try {
        const res = await getSpecificProduct(productId);
        setResp(res);
        window.location.hash = productId;
      } catch (e) {
        setResp({ status: "500", error: String(e) });
      }
    })();
  }, [productId]);

  if (!resp) return <Loader />;
  if (resp?.status === "404") return <ErrorState errorStatus={resp} />;

  const product = resp?.product || {};
  const prevId = resp?.prevProduct?.id ?? null;
  const nextId = resp?.nextProduct?.id ?? null;

  /* ✅ EXACT mapping from admin:
     Name        -> title
     Description -> subtitle
     Info        -> infoLine
  */
  const title = formatTitle(product?.name);
  const subtitle = safeText(product?.description);
  const infoLine = safeText(product?.info);

  const imgSrc = getImageSrc(product);

  return (
    <div className="w-full min-h-screen bg-[#f2f2f2] py-10 px-4">
      <div className="max-w-[1100px] mx-auto relative">

        {/* arrows */}
        {prevId && (
          <div className="hidden md:block absolute top-24 -left-14 z-10 bg-white shadow-xl rounded-md">
            <button
              onClick={() => setProductId(prevId)}
              className="h-28 w-10 flex items-center justify-center"
            >
              <ArrowLeft strokeWidth={3} className="text-[#9a8c98]" />
            </button>
          </div>
        )}

        {nextId && (
          <div className="hidden md:block absolute top-24 -right-14 z-10 bg-white shadow-xl rounded-md">
            <button
              onClick={() => setProductId(nextId)}
              className="h-28 w-10 flex items-center justify-center"
            >
              <ArrowRight strokeWidth={3} className="text-[#9a8c98]" />
            </button>
          </div>
        )}

        {/* HEADER CARD */}
        <div className="bg-white p-8">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_420px] gap-8 items-start">

            {/* LEFT TEXT */}
            <div>
              <div className="text-gray-300 text-[10px] uppercase tracking-widest mb-6">
                PRODUKTKATALOG &amp; PREISLISTE 2026
              </div>

              <h1 className="text-4xl font-bold text-[#2d3142] uppercase">
                {title}
              </h1>

              {subtitle && (
                <div className="mt-2 text-2xl text-gray-400">
                  {subtitle}
                </div>
              )}

              <div className="mt-6 border-b-2 border-[#1f86d6] w-[240px]" />

              {infoLine && (
                <div className="mt-3 text-sm text-gray-700 font-medium">
                  {infoLine}
                </div>
              )}
            </div>

            {/* RIGHT IMAGE */}
            <div className="w-full">
              <div className="w-full border border-gray-200 bg-white flex items-center justify-center">
                {imgSrc ? (
                  <img
                    src={imgSrc}
                    alt={title}
                    className="w-full h-[320px] object-contain p-2"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <div className="w-full h-[320px] flex items-center justify-center text-sm text-gray-300">
                    No image found
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* nothing else yet */}
      </div>
    </div>
  );
}
