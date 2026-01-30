import Image from "next/image";
import React from "react";
import { ImageOff } from "lucide-react";

function ProductGallery({ imgInfo }: any) {
  const fixedText = imgInfo.text.includes("/") ? (
    <>
      {imgInfo.text.split("/")[0]}
      <br />
      {imgInfo.text.split("/")[1]}
    </>
  ) : (
    imgInfo.text
  );
  return (
    <>
      <h2 className="text-center pt-4 text-white font-bold uppercase text-xl leading-5">
        {fixedText}
      </h2>
      <div>
        <div className="mx-6">
          {!imgInfo.img.url ? (
            <div className="w-[50%] mx-auto aspect-square">
              <ImageOff
                className="w-full h-full text-[#259fd36f]"
                strokeWidth={0.75}
              />
            </div>
          ) : (
            <div className="w-[80%] mx-auto aspect-square">
              <Image
                src={imgInfo.img.url}
                alt="img"
                className="w-full h-full object-contain"
                loading="lazy"
                width={200}
                height={200}
              />
            </div>
          )}
        </div>
      </div>
      <h2 className="text-center pb-4 text-white font-bold uppercase text-xl leading-5">
        PRODUKT NR.: {imgInfo.id}
      </h2>
    </>
  );
}

export default ProductGallery;
