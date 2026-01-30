import React, { useEffect, useState, useCallback } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import EmblaImgRender from "./EmblaImgRender";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
  arr: any;
};

const EmblaCarousel: React.FC<PropType> = ({ slides, options, arr }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [windowWidth, setWindowWidth] = useState<null | number>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!window) return;
    const mdSize = window.innerWidth >= 768;
    const lgSize = window.innerWidth >= 1024;
    const realWindowWidth = window.innerWidth;

    if (!mdSize) {
      setWindowWidth(realWindowWidth / 2);
    } else if(mdSize && !lgSize ) {
      setWindowWidth(realWindowWidth / 4)
    } else if(lgSize) {
      setWindowWidth(realWindowWidth / 5)
    }
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(); // run on init
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom">
          {slides.map((index) => (
            <EmblaImgRender
              key={index}
              imgInfo={arr[index]}
              windowWidth={windowWidth}
              isCentered={selectedIndex === index}
            />
          ))}
        </div>
        <div className="w-full h-9 mt-15 flex justify-center items-center md:mt-5 lg:mt-15">
          <a
            href={"/produkte"}
            className="border-[2px] border-[#259ed3] rounded-sm h-full flex justify-center items-center px-4 text-[#259ed3] text-lg font-semibold tracking-wide hover:text-white hover:bg-[#259ed3] transition-all"
          >
            Unsere Produkte entdecken
          </a>
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
