"use client";

import { deleteFile } from "@/utils/actions";
import { UploadDropzone } from "@uploadthing/react";
import Image from "next/image";

function ImageSelector({ product, setProduct }) {
  const imageSelected = product.img;


  const handleDelete = async () => {
    const formData = new FormData();
    formData.append("key", imageSelected.key);
    await deleteFile(formData);
    setProduct((prev) => ({
      ...prev,
      img: { url: "", key: "" },
    }));
  };

  return (
    <div className="flex-2/5 flex flex-col justify-center items-center">
      <div className="w-[60%] h-fit mx-auto overflow-hidden rounded-2xl">
        {imageSelected.url === "" ? (
          <div className="size-full flex justify-center items-center">
            <h2>No Image Selected!</h2>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <Image
              src={imageSelected.url}
              alt="Uploaded"
              width={300}
              height={300}
              className="object-contain"
              unoptimized={true}
            />
          </div>
        )}
      </div>

      {imageSelected.url === "" ? (
        <div className="w-[60%] mx-auto mt-10 ">
          <div className="flex items-center justify-center w-full">
            <div className="border border-dashed border-gray-900/25 rounded-md py-4 px-2 cursor-pointer">
              <UploadDropzone
                endpoint="imageUploader"
                className="h-fit !mt-0 !border-0 !px-0 !py-0"
                onClientUploadComplete={(res) => {
                  setProduct((prev) => ({
                    ...prev,
                    img: { url: res[0].ufsUrl, key: res[0].key },
                  }));
                }}
                onUploadError={(error) => {
                  alert(`ERROR! ${error.message}`);
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-[60%] mx-auto mt-10">
          <div className="flex items-center justify-center w-full">
            <button
              className="rounded-lg cursor-pointer bg-green-400 hover:bg-green-300 transition-colors text-white w-[100px]"
              type="button"
              onClick={handleDelete}
            >
              Change
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageSelector;
