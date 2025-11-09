import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

// Slider Data
const slides = [
  {
    id: 1,
    image: "https://i.ibb.co/LDRb1KDs/63f0b74f569337001d9208c7.jpg",
    title: "Pay Your Bills Easily",
    subtitle: "Manage your utility bills seamlessly from anywhere.",
  },
  {
    id: 2,
    image: "https://i.ibb.co/SX2VnMRm/How-To-Keep-Track-Of-Invoices-And-Payments-1-Asset-2-2x-1024x618.png",
    title: "Track Your Payments",
    subtitle: "Keep track of all your payment history at a glance.",
  },
  {
    id: 3,
    image: "https://i.ibb.co/DPngM2Gy/images.png",
    title: "Secure & Fast",
    subtitle: "Your data is safe and transactions are lightning fast.",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  // Autoplay every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg shadow-lg">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current].id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Image Container with fixed aspect ratio */}
          <div className="w-full h-full overflow-hidden">
            <img
              src={slides[current].image}
              alt={slides[current].title}
              className="w-full h-full object-cover object-center max-w-full max-h-full"
            />
          </div>

          {/* Centered Text Overlay */}
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4 md:px-16">
            <motion.h2
              key={slides[current].title}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg mb-2"
            >
              {slides[current].title}
            </motion.h2>
            <motion.p
              key={slides[current].subtitle}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm md:text-lg text-white drop-shadow-md"
            >
              {slides[current].subtitle}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-3xl p-2 bg-black/30 rounded-full hover:bg-black/50 transition"
      >
        <IoArrowBack />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-3xl p-2 bg-black/30 rounded-full hover:bg-black/50 transition"
      >
        <IoArrowForward />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              current === index ? "bg-primary" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
