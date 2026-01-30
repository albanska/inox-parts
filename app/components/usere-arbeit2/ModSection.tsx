import Image from "next/image";
import { motion } from "motion/react";

function ModSection({ title, text, imgs, ref, inView }: any) {
  return (
    <div className="mt-8 md:flex md:items-center" ref={ref}>
      <div className="ml-4 mr-3 md:w-1/2 md:pr-8 lg:pl-20 lg:pr-48">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-[28px] font-extrabold tracking-tight leading-7 uppercase lg:text-[44px] lg:leading-10 lg:mb-4 text-[#4a4e69] text-center md:text-left"
        >
          {title}
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          lang="de"
          className={`text-[#9a8c98] text-sm leading-4 mt-3 font-semibold md:leading-3.5 lg:text-lg lg:leading-5 lg:font-semibold md:mt-1 lg:my-2`}
          style={{
            hyphens: "auto",
            fontSize: "clamp(0.875rem, 2vw, 1.125rem)"
          }}
        >
          {text}
        </motion.h2>
      </div>
      <motion.div
        initial={{ opacity: 0.2, x: 100 }}
        animate={{ opacity: inView ? 1 : 0.2, x: inView ? 0 : 100 }}
        transition={{duration: 0.5, delay: 0.2, type: "tween"}}
        className="flex flex-col mt-4"
      >
        <div className="flex justify-between flex-wrap mx-2 mb-2">
          <Image
            src={imgs.first}
            alt="1"
            className="w-[49%] h-[40vh] object-cover"
          />
          <Image
            src={imgs.sec}
            alt="1"
            className="w-[49%] h-[40vh] object-cover object-center"
          />
        </div>

        <div className="mx-2">
          <Image
            src={imgs.third}
            alt="1"
            className="w-full h-[25vh] md:h-[40vh] object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
}

export default ModSection;
