"use client";

import ProductGallery from "./ProductGallery";
import { useEffect, useState } from "react";
import { removeData } from "@/lib/server/removeData";
import { Edit2, X } from "lucide-react";
import { deleteFile } from "@/utils/actions";
import getDataSupa from "@/lib/supabase-server/createSupaBaseClient";

export default function Gallery({ isAdmin }: { isAdmin: boolean }) {
  const [images, setImages] = useState<any>([]);
  const [refreshCheck, setRefreshCheck] = useState(false);

  useEffect(() => {
    async function getImgArr() {
      const {data} = await getDataSupa();
      // @ts-ignore
      const arr = JSON.parse(data[0].data)

      const newArr = arr.map((item: any) => ({
        img: item.img,
        text: `${item.name}/${item.subName}`,
        id: item.ids[0][0],
      }));

      setImages(newArr);
    }

    getImgArr();
  }, [refreshCheck]);

  async function deleteProduct(idx: any, key: any) {
    const formData = new FormData();
    formData.append("key", key);
    await deleteFile(formData);
    await removeData(idx);

    setRefreshCheck(!refreshCheck);
  }

  return (
    <div className="mt-10 animate-[fadeIn_0.5s_ease-in-out_forwards]">
      <div className="flex gap-8 flex-wrap mb-10 md:justify-center">
        {images.map((img: any, index: any) => (
          <div key={index} className="relative">
            <a
              href={`produkte/spezifischs-produkt#${img.id}`}
              className="rounded-3xl bg-gradient-custom mx-6 w-full md:mx-0 md:w-[40%] h-[400px] md:h-[85dvh] lg:w-[350px] lg:h-[400px] flex flex-col justify-between cursor-pointer hover:scale-105 transition-all "
              //@ts-ignore
              key={index}
            >
              <ProductGallery imgInfo={img} />
            </a>
            {isAdmin && (
              <a
                href={`admin/edit/${img.id}`}
                className="rounded-full size-10 flex justify-center items-center absolute -top-3 -right-3 bg-green-300 hover:scale-110 transition-all"
              >
                <Edit2 />
              </a>
            )}
            {isAdmin && (
              <button
                className="rounded-full size-10 flex justify-center items-center absolute -top-3 -left-3 bg-red-300 hover:scale-110 transition-all cursor-pointer"
                type="button"
                onClick={() => deleteProduct(index, img.img.key)}
              >
                <X />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
