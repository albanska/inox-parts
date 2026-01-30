import { EmblaOptionsType } from "embla-carousel";
import EmblaCarousel from "./embla/EmblaCarousel";
import { useEffect, useState } from "react";
import getDataSupa from "@/lib/supabase-server/createSupaBaseClient";

const OPTIONS: EmblaOptionsType = { loop: true };

function ThirdSect({ id }: any) {
  const [images, setImages] = useState<any[]>([]);

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
  }, []);
  
  if (images.length === 0) return null;

  const SLIDE_COUNT = images.length;
  const SLIDES = Array.from({ length: SLIDE_COUNT }, (_, i) => i);

  return (
    <div
      id={id}
      className="h-svh flex justify-center items-center md:items-end md:pb-4 lg:items-center lg:pb-0 relative"
    >
      <EmblaCarousel slides={SLIDES} options={OPTIONS} arr={images} />
    </div>
  );
}

export default ThirdSect;
