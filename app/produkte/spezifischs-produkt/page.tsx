"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import Loader from "@/app/components/loader/Loader";
import ErrorState from "@/app/components/specific-product/ErrorState";
import ProductTable from "@/app/components/specific-product/ProductTable";
import getSpecificProduct from "@/helpers/getSpecificProduct";

function formatTitle(name: any) {
  return String(name || "")
    .replace(/-/g, " ")
    .trim()
    .toUpperCase();
}

function findStrings(obj: any, max = 80): string[] {
  const out: string[] = [];
  const seen = new WeakSet<object>();

  function walk(node: any) {
    if (out.length >= max) return;
    if (node === null || node === undefined) return;

    if (typeof node === "string") {
      const s = node.trim();
      if (s && s.length <= 300) out.push(s);
      return;
    }

    if (Array.isArray(node)) {
      for (const it of node) walk(it);
      return;
    }

    if (typeof node !== "object") return;
    if (seen.has(node)) return;
    seen.add(node);

    for (const k of Object.keys(node)) walk(node[k]);
  }

  walk(obj);
  return out;
}

function guessImageUrl(product: any) {
  // most likely keys first
  const candidates = [
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
    product?.images?.[0],
    product?.imgs?.[0],
    product?.photos?.[0],
  ]
    .flat()
    .filter(Boolean);

  // if object → try .url/.src
  for (const c of candidates) {
    if (typeof c === "string") return c;
    if (typeof c === "object") {
      if (typeof c?.url === "string") return c.url;
      if (typeof c?.src === "string") return c.src;
    }
  }

  // fallback: search any string that looks like image url/path
  const strings = findStrings(product, 200);
  const imgLike = strings.find((s) =>
    /\.(png|jpg|jpeg|webp|gif|svg)(\?.*)?$/i.test(s)
  );
  return imgLike || "";
}

function normalizeImg(src: string) {
  if (!src) return "";
  // Already absolute
  if (src.startsWith("http://") || src.startsWith("https://")) return src;

  // If it starts with / it's same-domain
  if (src.startsWith("/")) return src;

  // If it's relative like "uploads/..." → make it /uploads/...
  return `/${src}`;
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

  const title = formatTitle(product?.name || product?.title || "PRODUCT");

  // ✅ subtitle: try a bunch of keys (we don't guess only "description" anymore)
  const subtitle =
    product?.subtitle ||
    product?.subTitle ||
    product?.type ||
    product?.category ||
    product?.categoryName ||
    product?.family ||
    product?.group ||
    product?.description ||
    "";

  // ✅ info line (material/thickness)
  const info =
    product?.info ||
    product?.material ||
    product?.thickness ||
    product?.spec ||
    product?.specs ||
    "";

  // ✅ image
  const rawImg = useMemo(() => guessImageUrl(product), [product]);
  const imgSrc = normalizeImg(String(rawImg || ""));

  // ✅ DEBUG
  const debugKeys = Object.keys(product || {}).slice(0, 40);
  const debugImgCandidates = useMemo(() => {
    const strings = findStrings(product, 200);
    return strings.filter((s) => /\.(png|jpg|jpeg|webp|gif|svg)(\?.*)?$/i.test(s)).slice(0, 20);
  }, [product]);

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

        {/* HEADER (PDF style) */}
        <div className="bg-white p-6">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-6 items-start">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#2d3142]">{title}</h1>

              {subtitle ? (
                <div className="mt-1 text-sm text-gray-500 uppercase">{String(subtitle)}</div>
              ) : null}

              <div className="mt-4 text-sm font-medium text-gray-700 border-b-2 border-[#1f86d6] inline-block pb-1">
                {String(info || "")}
              </div>
            </div>

            <div className="w-full">
              <div className="w-full bg-white border border-gray-200">
                {imgSrc ? (
                  <img
                    src={imgSrc}
                    alt={title}
                    className="w-full h-[220px] object-contain p-2"
                    loading="lazy"
                    onError={(e) => {
                      // shows broken, but keeps page alive
                      (e.currentTarget as HTMLImageElement).style.opacity = "0.4";
                    }}
                  />
                ) : (
                  <div className="w-full h-[220px] flex items-center justify-center text-sm text-gray-400">
                    No image detected
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ✅ TABLE ONLY */}
        <div className="bg-white mt-6">
          <ProductTable product={product} />
        </div>

        {/* ✅ DEBUG BOX (temporary) */}
        <div className="mt-6 bg-white border border-gray-200 p-4 text-xs text-gray-700">
          <div className="font-semibold mb-2">DEBUG</div>
          <div>
            <span className="font-semibold">imgSrc:</span> {imgSrc || "(empty)"}{" "}
            {rawImg ? (
              <span className="text-gray-400">(raw: {String(rawImg)})</span>
            ) : null}
          </div>
          <div className="mt-2">
            <span className="font-semibold">product keys:</span> {debugKeys.join(", ")}
          </div>
          <div className="mt-2">
            <span className="font-semibold">image-like strings found:</span>{" "}
            {debugImgCandidates.length ? debugImgCandidates.join(" | ") : "(none)"}
          </div>
        </div>
      </div>
    </div>
  );
}
