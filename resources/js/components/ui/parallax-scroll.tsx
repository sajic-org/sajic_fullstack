"use client";
import { useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import SpeakerDialog from "../speaker-drawer";

export const ParallaxScroll = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  const gridRef = useRef<any>(null);
  const { scrollYProgress } = useScroll();

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const third = Math.ceil(images.length / 3);

  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);

  const speaker = {
    name: 'Gladimir  Catarino',
    description:
        'Suspendisse vel neque in risus dignissim euismod. Vivamus quis erat sapien. Aliquam ac est vitae ligula commodo convallis vel sit amet enim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec mattis libero et lectus vehicula rhoncus. Phasellus quis tellus quis ipsum consequat malesuada. Praesent eleifend, neque eget porta elementum, arcu diam hendrerit velit, eu ornare urna erat et sem. Aliquam commodo justo quis nunc feugiat, nec semper dolor lacinia. Donec porttitor lacinia ipsum vel tincidunt. Etiam malesuada ex diam, ut faucibus sapien scelerisque sit amet.',
    image: 'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80',
    lectures: [
        {
            title: 'Introduction to Backend Devin',
            date: '2023-10-15',
        },
        {
            title: 'Advanced Machine Something',
            date: '2023-11-20',
        },
    ],
};

  return (
    <div
      className={cn("items-start w-full", className)}
      ref={gridRef}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start  max-w-6xl mx-auto gap-10 my-16 px-4"
        ref={gridRef}
      >
        {/* Coluna 1 */}
        <div className="grid gap-10">
          {firstPart.map((el, idx) => (
<SpeakerDialog speaker={speaker}>
            <motion.div
              style={{ y: translateFirst }} // Apply the translateY motion value here
              key={"grid-1" + idx}
              className="group cursor-pointer aspect-[4/5]"
            >
              <img
                src={el}
                className="h-full w-full group-hover:brightness-75 group-hover:scale-105 ease-in-out duration-500 object-cover object-left-top rounded-lg gap-10 !m-0 !p-0"

                alt="thumbnail"
              />
              <span className="relative left-4 bottom-8 font-semibold text-white text-lg">Ednacio</span>
            </motion.div>
            </SpeakerDialog>
          ))}

        </div>

        {/* Coluna 2*/}

        <div className="grid gap-10">
          {secondPart.map((el, idx) => (
            <SpeakerDialog speaker={speaker}>
            <motion.div style={{ y: translateSecond }} key={"grid-2" + idx}   className="group cursor-pointer aspect-[4/5]">

              <img
                src={el}
                className="h-full w-full group-hover:brightness-75 group-hover:scale-105 ease-in-out duration-500 object-cover object-left-top rounded-lg gap-10 !m-0 !p-0"

                alt="thumbnail"
                />
              <span className="relative left-4 bottom-8 font-semibold text-white text-lg">Ednacio</span>

            </motion.div>
                </SpeakerDialog>
          ))}
        </div>

        {/* Coluna 3 */}
        <div className="grid gap-10">
          {thirdPart.map((el, idx) => (
            <SpeakerDialog speaker={speaker}>
            <motion.div style={{ y: translateThird }} key={"grid-3" + idx}   className="group cursor-pointer aspect-[4/5]">
              <img
                src={el}
                className="h-full w-full group-hover:brightness-75 group-hover:scale-105 ease-in-out duration-500 object-cover object-left-top rounded-lg gap-10 !m-0 !p-0"


                alt="thumbnail"
                />
              <span className="relative left-4 bottom-8 font-semibold text-white text-lg">Ednacio</span>

            </motion.div>
                </SpeakerDialog>
          ))}
        </div>
      </div>
    </div>
  );
};
