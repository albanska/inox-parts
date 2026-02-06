"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import Loader from "@/app/components/loader/Loader";
import ErrorState from "@/app/components/specific-product/ErrorState";
import ProductTable from "@/app/components/specific-product/ProductTable";

import getSpecificProduct from "@/helpers/getSpecificProduct";
import { transformProduct } from "@/helpers/transformProduct";

function safeText(v: any): string {
  if (v === null || v === undefined) return "";
  if (typeof v === "string") return v;
  if (typeof v === "number") return String(v);
  return "";
}

function formatTitle(v: any) {
  const s = safeText(v).trim();
  return s ? s.toUpperCase() : "PRODUCT";
}

export default function Page() {
  const [productId, setProductId] = useState<string>("");
  const [resp, setResp] = useState<any>(null);

  // read hash once
  useEffect(() => {
    const hashId = window.location.hash.replace("#", "");
    if (hashId) setProductId(hashId);
    else setResp({ status: "404" });
  }, []);

  // fetch when id changes
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

  // raw product from supabase
  const rawProduct = resp?.product || {};
  // ✅ normalize to table-friendly structure
  const product = transformProduct(rawProduct);

  const prevId = resp?.prevProduct?.id ?? null;
  const nextId = resp?.nextProduct?.id ?? null;

  const title = formatTitle(product?.name);
  const description = safeText(product?.description); // subName
  const info = safeText(product?.info); // info
  const imgSrc = safeText(product?.img); // img

  return (
    <div className="w-full min-h-screen bg-[#f2f2f2] py-10 px-4">
      <div className="max-w-[1100px] mx-auto relative">
        {/* arrows */}
        {prevId && (
          <div className="hidden md:block absolute top-24 -left-14 z-10 bg-white shadow-xl rounded-md hover:scale-105 transition">
            <button
              onClick={() => setProductId(prevId)}
              className="h-28 w-10 flex items-center justify-center"
              aria-label="Previous"
            >
              <ArrowLeft strokeWidth={3} className="text-[#9a8c98]" />
            </button>
          </div>
        )}

        {nextId && (
          <div className="hidden md:block absolute top-24 -right-14 z-10 bg-white shadow-xl rounded-md hover:scale-105 transition">
            <button
              onClick={() => setProductId(nextId)}
              className="h-28 w-10 flex items-center justify-center"
              aria-label="Next"
            >
              <ArrowRight strokeWidth={3} className="text-[#9a8c98]" />
            </button>
          </div>
        )}

        {/* header card */}
        <div className="bg-white p-8">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_420px] gap-8 items-start">
            {/* LEFT */}
            <div>
              <div className="text-gray-300 text-[10px] uppercase tracking-widest mb-6">
                PRODUKTKATALOG &amp; PREISLISTE 2026
              </div>

              <h1 className="text-4xl font-bold text-[#2d3142] uppercase">
                {title}
              </h1>

              {description ? (
                <div className="mt-2 text-2xl text-gray-400">{description}</div>
              ) : null}

              <div className="mt-6 border-b-2 border-[#1f86d6] w-[240px]" />

              {info ? (
                <div className="mt-3 text-sm text-gray-700 font-medium">
                  {info}
                </div>
              ) : null}
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
                  />
                ) : (
                  <div className="w-full h-[320px] flex items-center justify-center text-sm text-gray-300">
                    No image
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="mt-6">
          <ProductTable product={product} />
        </div>
      </div>
    </div>
  );
}
