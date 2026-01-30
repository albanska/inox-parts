"use client";

import { useEffect, useState } from "react";
import ProductListPreview from "../ProductListPreview";
import Form from "@/app/components/admin/form/Form";
import ImageSelector from "./ImageSelector";
import ProductPreview from "../ProductPreview";

export default function FormWrapper({
  addData,
  isEdit = false,
  id = null,
  editProduct = null,
}) {
  const [isCard, setIsCard] = useState(false);
  const [isPreview, setPreview] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    info: "",
    addOn: [],
    img: {url: "", key: ""},
    priceOption: "",
    ids: [{ productId: "", price: "" }],
  });

  useEffect(() => {
    if (!isEdit) return;

    setProduct(editProduct);
  }, []);

  return (
    <div className="shrink-0 flex-1 ">
      <div className="h-fit flex relative">
        <div className="absolute top-5 left-5 flex gap-4 z-50">
          {!isPreview && (
            <button
              className="shadow-xl px-4 py-2 rounded-md cursor-pointer bg-white hover:scale-105 transition-all"
              onClick={() => setIsCard(!isCard)}
            >
              {isCard ? "Close" : "Open"} Card Preview
            </button>
          )}

          {!isCard && <button
            className="shadow-xl px-4 py-2 rounded-md cursor-pointer bg-white hover:scale-105 transition-all"
            onClick={() => setPreview(!isPreview)}
          >
            {isPreview ? "Close" : "Open"} Product Preview
          </button>}
        </div>

        {!isPreview && isCard && <ProductPreview product={product} />}

        {!isPreview && (
          <ImageSelector product={product} setProduct={setProduct} />
        )}
        {isPreview && <ProductListPreview product={product} />}
        <Form
          product={product}
          setProduct={setProduct}
          addData={addData}
          isPreview={isPreview || isCard}
          isEdit={isEdit}
          id={id}
        />
      </div>
    </div>
  );
}
