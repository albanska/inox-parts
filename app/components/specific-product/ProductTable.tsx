import Image from "next/image";
import typ from "@/public/svgs/typ.svg";
import diam from "@/public/svgs/diam.svg";
import lange from "@/public/svgs/lange.svg";
import breite from "@/public/svgs/breite.svg";
import hohe from "@/public/svgs/hohe.svg";
import chf from "@/public/svgs/chf.svg";

function ProductTable({ product }: any) {
  return product?.ids.map((item: any, index: number) => {
    return (
      <div
        className={`mt-5 md:mt-0 block mb-10 lg:w-[300px] ${
          index === 0
            ? "md:h-[300px] lg:max-h-fit md:flex md:items-center md:mb-0 lg:block lg:h-fit lg:mb-10"
            : "block mb-10 md:pt-2 md:border-t md:border-[#1d779e] lg:border-0"
        }`}
        key={index}
      >
        <div className="w-full md:w-[90%] px-4 md:px-0 lg:w-full">
          <div className="flex justify-between items-center md:justify-end">
            <h2 className="font-semibold text-sm tracking-tight text-[#9A8C98] leading-3.5 lg:hidden">
              ID:{" "}
              <span className="font-bold text-[#4A4E69]">
                {product.ids[index][0]}{" "}
              </span>{" "}
            </h2>
            <div className="hidden lg:flex w-full justify-center items-center gap-1 flex-row-reverse">
              <h2 className="font-semibold text-sm tracking-tight text-[#9A8C98]">
                ID:{" "}
                <span className="font-bold text-[#4A4E69]">
                  {product.ids[index][0]}{" "}
                </span>{" "}
              </h2>
              <div className="flex-1 h-0.5 bg-[#1d779e]" />
            </div>
          </div>

          {product?.tags.map((item: any, idx: number) => {
            const { title } = item;

            if (title === "produkt nr.") {
              return;
            }

            const imageMap: any = {
              "länge mm": lange,
              "breite mm": breite,
              "höhe mm": hohe,
              typ: typ,
            };

            const img = title.includes("preis") ? chf : imageMap[title] || diam;

            const findId = product?.ids.find(
              (item: any) => item[0] === product.ids[index][0]
            );

            return (
              <div
                className="pb-1 flex items-center hover:bg-[#1d779e1f] transition-all gap-8 mt-2"
                key={idx}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='1.5' y='100%25' fill='none' stroke='%231D779E' stroke-width='2' stroke-dasharray='10%2c3'/%3e%3c/svg%3e")`,
                }}
              >
                <div className="size-[27px] ">
                  <Image
                    src={img}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between flex-1">
                  <h2 className="text-sm font-semibold text-[#9a8c98] uppercase leading-4">
                    {/* @ts-ignore */}
                    {findId[idx]}
                  </h2>
                  {title !== "typ" && (
                    <h2 className="text-sm font-semibold text-[#4A4E69] uppercase leading-4">
                      {title.split(" ").pop()}
                    </h2>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  });
}

export default ProductTable;
