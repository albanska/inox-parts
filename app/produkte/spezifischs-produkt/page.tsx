"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import ProductInfoMobile from "@/app/components/specific-product/ProductInfoMobile";
import ProductInfo from "@/app/components/specific-product/ProductInfo";
import ProductTable from "@/app/components/specific-product/ProductTable";
import Loader from "@/app/components/loader/Loader";
import ErrorState from "@/app/components/specific-product/ErrorState";
import getSpecificProduct from "@/helpers/getSpecificProduct";

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
      <ProductInfoMobile product={product} />

      <div className="relative w-full max-w-[1200px] mx-auto px-4 md:px-10 -mt-6 lg:mt-0">
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

        <div className="hidden md:block bg-white">
          <ProductInfo
            product={product}
            handleProductIdChange={(dir: string) =>
              handleProductIdChange(dir === "right" ? "right" : "left")
            }
            leftId={prevProduct?.id ?? null}
          />
        </div>

        <ProductTable product={product} />
      </div>
    </div>
  );
}
