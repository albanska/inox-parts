import React from "react";
import ProductGallery from "@/app/components/home/ProductGallery";

function ProductPreview({product}) {

  const img = {
    img: product.img === "" ? null : product.img,
    text: `${product.name}/${product.description}`,
    id: product.ids[0].productId,
  }

  return (
    <div className="flex-1/3 border-r border-black/20 flex justify-center items-center shrink-0 w-fit">
      <div
        className="rounded-3xl bg-gradient-custom mx-6 lg:w-[55%] lg:h-[400px] flex flex-col justify-between hover:scale-105 transition-all"
      >
        <ProductGallery imgInfo={img} />
      </div>
    </div>
  );
}

export default ProductPreview;
