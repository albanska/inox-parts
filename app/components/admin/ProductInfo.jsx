import { ImageOff } from "lucide-react";
import Image from "next/image";

function ProductInfo({ product }) {
  return (
    <>
      <div className={`h-fit md:h-[300px] lg:h-[500px] md:flex ${product.ids.length > 1 ? "items-center" : ""} justify-center  lg:row-span-3 lg:col-span-2 my-10 relative`}>
        <div className="w-full md:w-[75%] h-fit overflow-hidden flex justify-center items-center">
          {product?.img ? (
            <Image
              src={product.img.url}
              alt={product.name}
              className="object-contain w-fit"
              width={400}
              height={400}
            />
          ) : (
            <ImageOff className="w-[100px] md:w-[200px] lg:w-[300px] mx-auto pt-6 h-full text-[#1d779e] opacity-40 md:pt-0" />
          )}
        </div>

        <div className="uppercase pb-1 block md:hidden">
          <h2 className="text-2xl font-semibold tracking-tight text-[#4a4e69] px-4">
            {product?.name}
          </h2>
          <h2 className=" text-sm font-semibold tracking-tight text-[#9a8c98] leading-3 px-4">
            {product?.subName}
          </h2>
          <div className="border-b-2 border-[#1D779E] flex w-full justify-between items-end px-4 mt-8">
            <h2 className="text-sm font-semibold tracking-tight text-[#9a8c98]">
              {product?.info}
            </h2>
            {product?.addOn && (
              <div className="text-right">
                <h2 className="text-xs font-bold tracking-tight text-[#4A4E69] leading-2 uppercase">
                  {product?.addOn[0]}
                </h2>
                <h2 className="text-[10px] font-semibold tracking-tight text-[#9a8c98]">
                  {product?.addOn[1]}
                </h2>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="hidden lg:block mb-8">
        <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight text-[#4a4e69] leading-7">
          {product?.name}
        </h2>
        <h2 className="text-sm lg:text-base font-semibold tracking-tight text-[#9a8c98] leading-4">
          {product?.subName}
        </h2>
        <div className="border-b-2 border-[#1D779E] flex w-[300px] justify-between items-end mt-8">
          <h2 className="text-sm lg:text-base font-semibold tracking-tight text-[#9a8c98] text-nowrap">
            {product?.info}
          </h2>
          {product?.addOn && (
            <div className="text-right">
              <h2 className="text-xs font-bold tracking-tight text-[#4A4E69] leading-3 uppercase lg:text-sm ml-auto w-fit">
                {product?.addOn[0]}
              </h2>
              <h2 className="text-[10px] md:text-[12px] font-semibold tracking-tight text-[#9a8c98] leading-3">
                {product?.addOn[1]}
              </h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductInfo;
