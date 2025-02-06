import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.JQ4NhDXORDWb7i6xUHgPjwHaDt%26pid%3DApi&f=1&ipt=6786dcb52457d03b885daed6d30cafaedd0ec87323101e3a0e09988780afa755&ipo=images",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.gOY0OTDfGkUci-9UktwjYwHaDt%26pid%3DApi&f=1&ipt=5db1c372e1ba5b3aadfc12f0cf0abdb374754d26f52520b4e6738747ec2e26d6&ipo=images",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.t2ghlaiAlN_8wcB7Ry6P5AHaDr%26pid%3DApi&f=1&ipt=9443cfb90482d0eae51cb335c2c423f3c9668fd64208f40f882b32d0e65db62d&ipo=images",
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.UvbdVrB3QhQ6S9KSLPjmLQHaEB%26pid%3DApi&f=1&ipt=f32c73e2cc540841e3fc3a9df2aa120520128f42615e90c592b307dca1bd60b4&ipo=images",
];

const ImageSlider = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); 

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full max-w-xl overflow-hidden h-60">
      <AnimatePresence custom={direction} mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          alt="Sliding image"
          className="absolute w-full h-full object-cover rounded-lg"
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          custom={direction}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </AnimatePresence>
    </div>
  );
};

export default ImageSlider;
