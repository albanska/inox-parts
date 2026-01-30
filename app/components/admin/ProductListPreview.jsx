"use client";

import React, { useEffect, useState } from "react";
import ProductInfo from "./ProductInfo";
import ProductTable from "./ProductTable";

function ProductListPreview({ product }) {
  const [fixedProduct, setFixedProduct] = useState(null);

  useEffect(() => {
    if (!product) return;

    const tagMap = {
      productId: { title: "produkt nr.", subTitle: "Numéro de produit" },
      typ: { title: "typ", subTitle: "type" },
      mm0: { title: "Ø MM", subTitle: "Ø MM" },
      lange: { title: "länge mm", subTitle: "longueur mm" },
      breite: { title: "breite mm", subTitle: "largeur mm" },
      hohe: { title: "höhe mm", subTitle: "hauteur mm" },
      price: {
        title: `preis pro ${
          product.priceOption === "stk" ? product.priceOption : "m"
        }.`,
        subTitle: `prix par ${product.priceOption === "stk" ? "pcs" : "m"}.`,
      },
    };

    const availableKeys = Object.keys(tagMap).filter((key) =>
      product.ids[0]?.hasOwnProperty(key)
    );

    const fixedData = {
      name: product.name,
      subName: product.description,
      info: product.info,
      addOn: product.addOn,
      img: product.img,
      tags: availableKeys.map((key) => tagMap[key]),
      ids: product.ids.map((item) =>
        availableKeys.map((key) =>
          key === "price" ? `CHF ${item[key]}` : item[key]
        )
      ),
    };

    setFixedProduct(fixedData);
  }, [product]);

  if (!fixedProduct) return null;
  return (
    <div className="w-full scale-80 flex justify-center items-center min-h-dvh lg:mb-10 relative border border-black/20 rounded-md">
      <div className="-mt-6 lg:mt-0 w-full h-fit justify-center auto-cols-fr md:grid-cols-2 grid-rows md:px-10 grid lg:items-center lg:grid-cols-[1fr_1fr_300px] lg:mx-auto lg:max-w-[1200px] relative">
        <ProductInfo
          product={fixedProduct}
        />
        <ProductTable product={fixedProduct} /> 
      </div>
    </div>
  );
}

export default ProductListPreview;
