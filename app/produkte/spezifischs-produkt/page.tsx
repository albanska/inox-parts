"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import Loader from "@/app/components/loader/Loader";
import ErrorState from "@/app/components/specific-product/ErrorState";
import ProductTable from "@/app/components/specific-product/ProductTable";
import getSpecificProduct from "@/helpers/getSpecificProduct";

function safeText(v: any): string {
  if (v === null || v === undefined) return "";
  if (typeof v === "string") return v;
  if (typeof v === "number") return String(v);
  return "";
}

function formatTitle(name: any) {
  return safeText(name).replace(/-/g, " ").trim().toUpperCase();
}

function normalizeUrl(src: string) {
  if (!src) return "";
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  if (src.startsWith("/")) return src;
  return `/${src}`;
}

// ✅ Stronger image picker
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

    // common nested shapes
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

  // last fallback: find any string containing image extension (shallow)
  try {
    const s = JSON.stringify(product);
    const m = s.match(/(https?:\/\/[^"']+\.(png|jpg|jpeg|webp|gif|svg)|\/[^"']+\.(png|jpg|jpeg|webp|gif|svg))/i);
    if (m?.[1]) return normalizeUrl(m[1]);
  } catch {}

  return "";
}

export default function Page() {
  const [productId, setProductId] = useState<string>("");
  const [resp, setResp] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hashId = window.location.hash.replace("#", "");
    if (hashId) setProductId(hashId);
    else setLoading(false);
  }, []);

  useEffect(() => {
    if (!productId) return;

    (async () => {
      setLoading(true);
      try {
        const res = await getSpecificProduct(productId);
        setResp(res);
      } catch (e) {
        setResp({ status: "500", error: String(e) });
      } finally {
        setLoading(false);
      }
    })();

    window.location.hash = productId;
  }, [productId]);

  const handleNavigate = (newId?: string) => {
    if (newId) setProductId(newId);
  };

  if (loading || !resp) return <Loader />;
  if (resp?.status === "404") return <ErrorState errorStatus={resp} />;

  const product = resp?.product;
  const title = formatTitle(product?.name || product?.title || "PRODUCT");
  const subtitle = safeText(product?.subtitle || product?.description || "");
  const material = safeText(product?.material || product?.werkstoff || "");
  const materialNr = safeText(product?.materialNr || product?.werkstoffNr || "");
  const thickness = safeText(product?.thickness || product?.materialstaerke || "");
  const length = safeText(product?.length || product?.laenge || "");

  const imgSrc = useMemo(() => getImageSrc(product), [product]);

  return (
    <div className="w-full min-h-screen bg-white text-[#2d3142] px-4 md:px-12 py-10">
      <div className="max-w-[1100px] mx-auto relative">
        {/* Nav Arrows */}
        <div className="absolute top-28 -left-12 hidden lg:block">
          <button
            onClick={() => handleNavigate(resp?.prevProduct?.id)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft size={32} className="text-gray-300" />
          </button>
        </div>

        <div className="absolute top-28 -right-12 hidden lg:block">
          <button
            onClick={() => handleNavigate(resp?.nextProduct?.id)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowRight size={32} className="text-gray-300" />
          </button>
        </div>

        <div className="text-center text-gray-400 text-[10px] mb-10 uppercase tracking-widest">
          Produktkatalog &amp; Preisliste 2026
        </div>

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between gap-10 items-start">
          <div className="flex-1">
            <h1 className="text-3xl font-bold uppercase">{title}</h1>

            {subtitle ? (
              <h2 className="text-2xl text-gray-400 mb-8">{subtitle}</h2>
            ) : (
              <div className="text-2xl text-gray-200 mb-8"> </div>
            )}

            <div className="grid grid-cols-[220px_1fr] gap-y-2 text-sm">
              <span className="font-bold">
                Werkstoff <span className="text-gray-300 font-normal">/ Matériau</span>
              </span>
              <span>{material || "-"}</span>

              <span className="font-bold">
                Werkstoff-Nr. <span className="text-gray-300 font-normal">/ N° de matière</span>
              </span>
              <span>{materialNr || "-"}</span>

              <span className="font-bold">
                Materialstärke <span className="text-gray-300 font-normal">/ Épaisseur</span>
              </span>
              <span>{thickness || "-"}</span>

              <span className="font-bold">
                Länge <span className="text-gray-300 font-normal">/ Longueur</span>
              </span>
              <span>{length || "-"}</span>
            </div>
          </div>

          {/* IMAGE */}
          <div className="w-full md:w-1/2 flex justify-end">
            {imgSrc ? (
              <img
                src={imgSrc}
                alt={title}
                className="max-w-full max-h-[320px] object-contain border border-gray-100 p-2"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            ) : (
              <div className="w-full h-[260px] border border-gray-100 flex items-center justify-center text-gray-300">
                No image found
              </div>
            )}
          </div>
        </div>

        {/* ✅ ONLY TABLE (if you still see vertical cards, they're coming from another page/component) */}
        <div className="mt-12">
          <ProductTable product={product} />
        </div>
      </div>
    </div>
  );
}
