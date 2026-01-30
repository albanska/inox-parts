import { motion } from "motion/react";

function SecSect({ id, active }: any) {
  return (
    <div className="w-full h-svh overflow-hidden relative" id={id}>
      <div
        style={{
          backgroundImage: `url(/inox/home/laser.jpg)`,
          backgroundSize: "cover",
        }}
        className="w-full h-full  absolute top-0 inset-0 -z-10 bg-top md:bg-bottom"
      />
      <div className="w-full h-full flex items-end">
        <div className="mb-24 ml-5 md:ml-16 md:mb-10 lg:ml-24 lg:mb-24 z-10">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={active && { opacity: 1 }}
            transition={{ type: "tween", duration: 0.7, delay: 0.5 }}
            className="lg:text-3xl lg:font-normal lg:mt-1 text-white  pointer-events-none select-none"
          >
            INOXPARTS
          </motion.h2>
          <motion.h2
            className="text-xl lg:text-[37px] uppercase font-bold lg:leading-10 text-white"
            initial={{ x: "-100%", opacity: 0 }}
            animate={
              active && {
                x: "0%",
                opacity: 1,
              }
            }
            transition={{ type: "tween", duration: 0.4, delay: 0.1 }}
          >
            Kraft und Präzision <br /> bei jedem Schnitt!
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={active && { opacity: 1 }}
            transition={{ type: "tween", duration: 0.7, delay: 0.5 }}
            className="size-fit"
          >
            <a
              href={"/laser"}
              className={` text-[15px] tracking-tighter font-semibold border-2 border-[#259ed3] lg:rounded-[8px] px-4 py-2 block w-fit mt-3 textColor`}
            >
              Überprüfen Sie die Arbeiten
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default SecSect;
