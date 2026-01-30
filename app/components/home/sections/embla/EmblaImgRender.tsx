import Image from "next/image";

function EmblaImgRender({ imgInfo, windowWidth, isCentered }: any) {

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
    <div
      className="flex px-4 select-none py-4"
      style={{
        transform: "translate3d(0, 0, 0)",
        flex: `0 0 ${windowWidth ? `${windowWidth}px` : "0px"}`,
      }}
    >
      <a
        href={`/produkte/spezifischs-produkt#${imgInfo.id}`}
        className="w-[70vw] mx-auto rounded-3xl py-4 flex flex-col justify-between bg-gradient-custom h-[50vh] md:w-[40vw] md:h-[60vh] lg:w-[20vw] lg:h-[25vw] lg:justify-around hover:scale-105 transition-all"
      >
        <h2 className="text-white uppercase font-semibold text-[13.5px] text-center px-6 lg:text-xl">
          {fixedText}
        </h2>
        <div>
          <div className="w-[95%] mx-auto aspect-[8/8] md:w-[35%] lg:w-[15vw] ">
            <Image
              src={imgInfo.img.url}
              alt="img"
              className="w-full h-full object-contain"
              loading="lazy"
              width={200}
              height={200}
            />
          </div>
          <div
            className={`h-0.5 w-[60%] mt-4 ${
              isCentered ? "bg-white" : "bgColor"
            } bg-white mx-auto`}
          />
          <h2 className="text-white uppercase font-semibold text-[13.5px] text-center mt-1 mb-3 lg:text-lg">
            PRODUKT NR.: {imgInfo.id}
          </h2>
        </div>
      </a>
    </div>
  );
}

export default EmblaImgRender;
