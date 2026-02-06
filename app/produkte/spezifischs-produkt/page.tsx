"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import Loader from "@/app/components/loader/Loader";
import ErrorState from "@/app/components/specific-product/ErrorState";
import ProductTable from "@/app/components/specific-product/ProductTable";
import getSpecificProduct from "@/helpers/getSpecificProduct";

// Ensures we only render strings or numbers to avoid React Error #310
function safeText(v: any): string {
  if (v === null || v === undefined) return "";
  if (typeof v === "string") return v;
  if (typeof v === "number") return String(v);
  return "";
}

function formatTitle(name: any) {
  return safeText(name).replace(/-/g, " ").trim().toUpperCase();
}

function normalizeImg(product: any) {
  const src = product?.image || product?.img || product?.imageUrl || "";
  if (!src) return "";
  if (typeof src !== "string") return "";
  if (src.startsWith("http")) return src;
  return src.startsWith("/") ? src : `/${src}`;
}

export default function Page() {
  const [productId, setProductId] = useState<string>("");
  const [resp, setResp] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 1. Get initial ID from Hash
  useEffect(() => {
    const hashId = window.location.hash.replace("#", "");
    if (hashId) {
      setProductId(hashId);
    } else {
      setLoading(false); // No ID found, stop loader
    }
  }, []);

  // 2. Fetch data when productId changes
  useEffect(() => {
    if (!productId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getSpecificProduct(productId);
        setResp(res);
      } catch (e) {
        setResp({ status: "500", error: String(e) });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    window.location.hash = productId;
  }, [productId]);

  const handleNavigate = (newId: string | undefined) => {
    if (newId) setProductId(newId);
  };

  if (loading || !resp) return <Loader />;
  if (resp?.status === "404") return <ErrorState errorStatus={resp} />;

  const product = resp?.product;
  const title = formatTitle(product?.name || "PRODUCT");
  const imgSrc = normalizeImg(product);

  return (
    <div className="w-full min-h-screen bg-white text-[#2d3142] p-4 md:p-12">
      <div className="max-w-[1100px] mx-auto relative">
        
        {/* Nav Arrows */}
        <div className="absolute top-1/4 -left-12 hidden lg:block">
          <button onClick={() => handleNavigate(resp?.prevProduct?.id)} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft size={32} className="text-gray-300" />
          </button>
        </div>
        <div className="absolute top-1/4 -right-12 hidden lg:block">
          <button onClick={() => handleNavigate(resp?.nextProduct?.id)} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowRight size={32} className="text-gray-300" />
          </button>
        </div>

        <div className="text-center text-gray-400 text-[10px] mb-10 uppercase tracking-widest">
          Produktkatalog & Preisliste 2026
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div className="flex-1">
            <h1 className="text-3xl font-bold uppercase">{title}</h1>
            <h2 className="text-2xl text-gray-400 mb-8">{safeText(product?.subtitle || "Gouttiére plate")}</h2>

            <div className="grid grid-cols-[200px_1fr] gap-y-2 text-sm">
              <span className="font-bold">Werkstoff <span className="text-gray-300 font-normal">/ Matériau</span></span>
              <span>{safeText(product?.material || "40 = CrNi")}</span>
              
              <span className="font-bold">Werkstoff-Nr. <span className="text-gray-300 font-normal">/ N° de matière</span></span>
              <span>{safeText(product?.materialNr || "1.4301")}</span>
              
              <span className="font-bold">Materialstärke <span className="text-gray-300 font-normal">/ Épaisseur</span></span>
              <span>{safeText(product?.thickness || "0.8 mm")}</span>
              
              <span className="font-bold">Länge <span className="text-gray-300 font-normal">/ Longueur</span></span>
              <span>{safeText(product?.length || "2000 mm")}</span>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex justify-end">
            {imgSrc && <img src={imgSrc} alt="product" className="max-w-full h-auto object-contain" />}
          </div>
        </div>

        <div className="mt-12">
          <ProductTable product={product} />
        </div>
      </div>
    </div>
  );
}
