"use client";
import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import ProductInfoMobile from "@/app/components/specific-product/ProductInfoMobile";
import ProductInfo from "@/app/components/specific-product/ProductInfo";
import ProductTable from "@/app/components/specific-product/ProductTable";
import Loader from "@/app/components/loader/Loader";
import ErrorState from "@/app/components/specific-product/ErrorState";
import getSpecificProduct from "@/helpers/getSpecificProduct"

function Page() {
  const [productId, setProductId] = useState<string | null>(null);
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    let id = productId;

    if (!id && typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      id = hash;
    }

    if (id) {

      async function getProduct() {
        const product = await getSpecificProduct(id)
        setProduct(product);
        
      }
      getProduct()
  
      // ✅ Set the URL hash to the current product ID
      if (typeof window !== "undefined") {
        window.location.hash = id;
      }
    }
  }, [productId]);

  if (product === null) return <Loader />;
  if (product.status === "404")
    return (
      <ErrorState errorStatus={product} />
    );

  const formatName = (name: string) =>
    name
      .replace("-", " ")
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  function handleProductIdChange(direction: string) {
    if (direction === "right") {
      setProductId(product.nextProduct.id);
    } else if (direction === "left") {
      setProductId(product.prevProduct.id);
    }
  }

  return (
    <div className="w-full min-h-dvh lg:mb-10 relative ">
      <ProductInfoMobile product={product.product} />

      <div className="-mt-6 lg:mt-0 w-full h-fit justify-center auto-cols-fr md:grid-cols-2 grid-rows md:px-10 grid lg:items-center lg:grid-cols-[1fr_1fr_300px] lg:mx-auto lg:max-w-[1200px] relative">
        {/* Left Arrow */}
        {product.prevProduct.id !== null && (
          <div className="hidden md:block absolute md:top-6 lg:top-auto md:bottom-0 lg:bottom-auto lg:-left-15 lg:hover:scale-105 transition-all hover:bg-[#259fd332] md:rounded-r-md lg:rounded-md lg:shadow-xl group md:bg-[#f4f3f3]/50 lg:bg-white">
            <button
              onClick={() => handleProductIdChange("left")}
              className="md:h-full md:w-10 lg:h-28 lg:w-8 flex justify-center items-center lg:hover:-translate-x-0.5 transition-all"
            >
              <ArrowLeft strokeWidth="3" className="text-[#9a8c98]" />
            </button>
            <div className="absolute text-sm px-2 py-1 rounded top-0 right-full mr-2 hidden group-hover:flex transition justify-center items-center h-full w-fit">
              <div className="bg-gray-100 text-xs text-center px-4 py-2">
                <h2 className="font-semibold text-[#9a8c98] text-nowrap">
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
        {product.nextProduct.id !== null && (
          <div className="hidden md:block absolute md:top-6 lg:top-auto md:bottom-0 lg:bottom-auto md:right-0 lg:-right-15 lg:hover:scale-105 transition-all hover:bg-[#259fd332] md:rounded-l-md lg:rounded-md lg:shadow-xl group md:bg-[#f4f3f3]/50 lg:bg-white">
            <button
              onClick={() => handleProductIdChange("right")}
              className="md:h-full md:w-10 lg:h-28 lg:w-8 flex justify-center items-center lg:hover:translate-x-0.5 transition-all"
            >
              <ArrowRight strokeWidth="3" className="text-[#9a8c98]" />
            </button>
            <div className="absolute text-sm px-2 py-1 rounded top-0 left-full ml-2 hidden group-hover:flex transition justify-center items-center h-full w-fit">
              <div className="bg-gray-100 text-xs text-center px-4 py-2">
                <h2 className="font-semibold text-[#9a8c98] text-nowrap">
                  {product.nextProduct.count + 2}.{" "}
                  <span className="text-wrap">
                    {formatName(product.nextProduct.name)}
                  </span>
                </h2>
              </div>
            </div>
          </div>
        )}

        <ProductInfo
          product={product.product}
          handleProductIdChange={handleProductIdChange}
          leftId={product.prevProduct.id}
          // rightId={product.nextProduct.id}
        />
        <ProductTable product={product.product} />
      </div>
    </div>
  );
}

export default Page;
