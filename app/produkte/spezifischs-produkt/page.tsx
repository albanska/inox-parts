"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import Loader from "@/app/components/loader/Loader";
import ErrorState from "@/app/components/specific-product/ErrorState";
import ProductTable from "@/app/components/specific-product/ProductTable";
import getSpecificProduct from "@/helpers/getSpecificProduct";

// Helper to prevent objects/arrays from crashing the text rendering
function safeText(v: any): string {
  if (v === null || v === undefined) return "";
  if (typeof v === "string") return v;
  if (typeof v === "number") return String(v);
  return "";
}

function formatTitle(name: any) {
  return safeText(name).replace(/-/g, " ").trim().toUpperCase();
}

function pickImage(product: any): string {
  const candidates: any[] = [
    product?.image,
    product?.img,
    product?.imageUrl,
    product?.imageURL,
    product?.image_url,
    product?.photo,
    product?.thumbnail,
  ];

  for (const c of candidates) {
    if (!c) continue;
    if (typeof c === "string") return c;
    if (typeof c === "object") {
      if (typeof c?.url === "string") return c.url;
      if (typeof c?.src === "string") return c.src;
    }
  }
  return "";
}

function normalizeImg(src: string) {
  if (!src) return "";
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  const clean = src.startsWith("/") ? src : `/${src}`;
  return clean;
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

  const product = resp?.product ?? null;
  const prevProduct = resp?.prevProduct ?? null;
  const nextProduct = resp?.nextProduct ?? null;

  if (!product) {
    return <div className="p-6 text-red-600 font-bold">Product data missing.</div>;
  }

  function handleProductIdChange(direction: "left" | "right") {
    const id = direction === "right" ? nextProduct?.id : prevProduct?.id;
    if (id) setProductId(id);
  }

  const title = formatTitle(product?.name || product?.title || "PRODUCT");
  const subtitle = safeText(product?.subtitle || product?.subTitle || "");
  
  // Use useMemo for the image to prevent flickering
  const imgSrc = useMemo(() => {
    try {
      return normalizeImg(pickImage(product));
    } catch {
      return "";
    }
  }, [product]);

  return (
    <div className="w-full min-h-screen bg-white text-[#2d3142] font-sans">
      <div className="relative w-full max-w-[1100px] mx-auto px-6 py-8">
        
        {/* Navigation Arrows */}
        {!!prevProduct?.id && (
          <button 
            onClick={() => handleProductIdChange("left")}
            className="hidden md:flex absolute top-40 -left-12 w-10 h-10 items-center justify-center bg-white shadow-md rounded-full hover:bg-gray-50 transition-all border border-gray-100"
          >
            <ArrowLeft size={20} className="text-gray-400" />
          </button>
        )}
        {!!nextProduct?.id && (
          <button 
            onClick={() => handleProductIdChange("right")}
            className="hidden md:flex absolute top-40 -right-12 w-10 h-10 items-center justify-center bg-white shadow-md rounded-full hover:bg-gray-50 transition-all border border-gray-100"
          >
            <ArrowRight size={20} className="text-gray-400" />
          </button>
        )}

        {/* Top Header Tagline */}
        <div className="text-center text-gray-400 text-[11px] mb-12 uppercase tracking-[0.2em]">
          Produktkatalog & Preisliste 2026
        </div>

        {/* Main Content: Split Layout */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          
          {/* Left: Info */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-[#2d3142] leading-none">
              {title}
            </h1>
            <h2 className="text-2xl font-medium text-gray-500 mt-2 mb-10">
              {subtitle || "Gouttiére plate"}
            </h2>

            {/* Specs Grid */}
            <div className="grid grid-cols-[180px_1fr] gap-y-1.5 text-[13px]">
              <div className="font-bold">Werkstoff <span className="text-gray-400 font-normal">/ Matériau</span></div>
              <div>{safeText(product?.material || "40 = CrNi")}</div>
              
              <div className="font-bold">Werkstoff-Nr. <span className="text-gray-400 font-normal">/ N° de matière</span></div>
              <div>{safeText(product?.materialNr || "1.4301")}</div>
              
              <div className="font-bold">Materialstärke <span className="text-gray-400 font-normal">/ Épaisseur matériau</span></div>
              <div>{safeText(product?.thickness || "0.8 mm")}</div>
              
              <div className="font-bold">Länge des Artikels <span className="text-gray-400 font-normal">/ Longueur des produits</span></div>
              <div>{safeText(product?.length || "2000 mm")}</div>
            </div>
          </div>

          {/* Right: Product Image */}
          <div className="w-full md:w-[45%] flex justify-center md:justify-end">
            <div className="w-full max-w-[400px]">
              {imgSrc ? (
                <img
                  src={imgSrc}
                  alt={title}
                  className="w-full h-auto object-contain"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }}
                />
              ) : (
                <div className="h-48 w-full bg-gray-50 rounded flex items-center justify-center text-gray-300 italic text-sm">
                  Image not found
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="mt-14">
          <ProductTable product={product} />
        </div>
      </div>
    </div>
  );
}
