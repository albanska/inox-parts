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
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    let id = productId;

    if (!id && typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      id = hash;
    }

    if (!id) return;

    async function run() {
      const res = await getSpecificProduct(id as string);
      setProduct(res);

      if (typeof window !== "undefined") {
        window.location.hash = id as string;
      }
    }

    run();
  }, [productId]);

  if (product === null) return <Loader />;
  if (product?.status === "404") return <ErrorState errorStatus={product} />;

  const formatName = (name: string) =>
    name
      .replace("-", " ")
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  function handleProductIdChange(direction: "left" | "right") {
    if (direction === "right") setProductId(product?.nextProduct?.id);
    if (direction === "left") setProductId(product?.prevProduct?.id);
  }

  return (
    <div className="w-full min-h-dvh lg:mb-10 relative">
      {/* Mobile header */}
      <ProductInfoMobile product={product.product} />

      <div className="relative w-full max-w-[1200px] mx-auto px-4 md:px-10 -mt-6 lg:mt-0">
        {/* Left Arrow */}
        {product?.prevProduct?.id !== null && (
          <div className="hidden md:block absolute top-24 -left-6 lg:-left-14 z-10 hover:scale-105 transition-all hover:bg-[#259fd332] rounded-md shadow-xl group bg-white">
            <button
              onClick={() => handleProductIdChange("left")}
              className="h-28 w-8 flex justify-center items-center hover:-translate-x-0.5 transition-all"
            >
              <ArrowLeft strokeWidth={3} className="text-[#9a8c98]" />
            </button>

            <div className="absolute px-2 py-1 top-0 right-full mr-2 hidden group-hover:flex justify-center items-center h-full w-fit">
              <div className="bg-gray-100 text-xs text-center px-4 py-2">
                <h2 className="font-semibold text-[#9a8c98]">
                  {product.prevProduct.count}.{" "}
                  <span className="text-wrap">
                    {formatName(product.prevProduct.name)}
                  </span>
                </h2>
              </div>
            </div>
          </div>
        )}

        {/* Right Arrow */}
        {product?.nextProduct?.id !== null && (
          <div className="hidden md:block absolute top-24 -right-6 lg:-right-14 z-10 hover:scale-105 transition-all hover:bg-[#259fd332] rounded-md shadow-xl group bg-white">
            <button
              onClick={() => handleProductIdChange("right")}
              className="h-28 w-8 flex justify-center items-center hover:translate-x-0.5 transition-all"
            >
              <ArrowRight strokeWidth={3} className="text-[#9a8c98]" />
            </button>

            <div className="absolute px-2 py-1 top-0 left-full ml-2 hidden group-hover:flex justify-center items-center h-full w-fit">
              <div className="bg-gray-100 text-xs text-center px-4 py-2">
                <h2 className="font-semibold text-[#9a8c98]">
                  {product.nextProduct.count + 2}.{" "}
                  <span className="text-wrap">
                    {formatName(product.nextProduct.name)}
                  </span>
                </h2>
              </div>
            </div>
          </div>
        )}

        {/* Desktop header */}
        <div className="hidden md:block bg-white">
          <ProductInfo
            product={product.product}
            handleProductIdChange={(dir: string) =>
              handleProductIdChange(dir === "right" ? "right" : "left")
            }
            leftId={product?.prevProduct?.id}
          />
        </div>

        {/* Table full width */}
        <div className="mt-6">
          <ProductTable product={product.product} />
        </div>
      </div>
    </div>
  );
}
