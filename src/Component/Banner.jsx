import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoArrowBack, IoArrowForward, IoPlay, IoPause } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

// Enhanced Slider Data
const slides = [
  {
    id: 1,
    image: "https://i.ibb.co/LDRb1KDs/63f0b74f569337001d9208c7.jpg",
    title: "Pay Your Bills Easily",
    subtitle: "Manage your utility bills seamlessly from anywhere, anytime.",
    cta: "Get Started",
    gradient: "from-blue-600/80 to-purple-600/80"
  },
  {
    id: 2,
    image: "https://i.ibb.co/SX2VnMRm/How-To-Keep-Track-Of-Invoices-And-Payments-1-Asset-2-2x-1024x618.png",
    title: "Track Your Payments",
    subtitle: "Keep track of all your payment history with detailed analytics.",
    cta: "View Dashboard",
    gradient: "from-green-600/80 to-blue-600/80"
  },
  {
    id: 3,
    image: "https://i.ibb.co/DPngM2Gy/images.png",
    title: "Secure & Fast",
    subtitle: "Your data is protected with bank-level security and lightning-fast processing.",
    cta: "Learn More",
    gradient: "from-purple-600/80 to-pink-600/80"
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const { isDark } = useTheme();

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isPlaying]);

  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const togglePlayPause = () => setIsPlaying(!isPlaying);

  const scrollToNext = () => {
    const nextSection = document.querySelector('#next-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full h-[60vh] md:h-[65vh] lg:h-[70vh] overflow-hidden rounded-2xl shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current].id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image */}
          <div className="w-full h-full overflow-hidden">
            <img
              src={slides[current].image}
              alt={slides[current].title}
              className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-[3000ms]"
            />
          </div>

          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-r ${slides[current].gradient}`} />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 md:px-16">
            <motion.div
              key={`content-${slides[current].id}`}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-4xl"
            >
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-2xl mb-4 leading-tight">
                {slides[current].title}
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-white/90 drop-shadow-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                {slides[current].subtitle}
              </p>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl"
              >
                {slides[current].cta}
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
        <motion.button
          whileHover={{ scale: 1.1, x: -2 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevSlide}
          className="text-white text-2xl md:text-3xl p-3 bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/50 transition-all duration-300 shadow-lg"
          aria-label="Previous slide"
        >
          <IoArrowBack />
        </motion.button>
      </div>
      
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
        <motion.button
          whileHover={{ scale: 1.1, x: 2 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextSlide}
          className="text-white text-2xl md:text-3xl p-3 bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/50 transition-all duration-300 shadow-lg"
          aria-label="Next slide"
        >
          <IoArrowForward />
        </motion.button>
      </div>

      {/* Play/Pause Control */}
      <div className="absolute top-4 right-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={togglePlayPause}
          className="text-white text-xl p-2 bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/50 transition-all duration-300"
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isPlaying ? <IoPause /> : <IoPlay />}
        </motion.button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === index 
                ? "bg-white shadow-lg scale-125" 
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20">
        <motion.div
          key={current}
          initial={{ width: "0%" }}
          animate={{ width: isPlaying ? "100%" : "0%" }}
          transition={{ duration: 5, ease: "linear" }}
          className="h-full bg-white/80"
        />
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={scrollToNext}
      >
        <div className="flex flex-col items-center text-white/80 hover:text-white transition-colors">
          <span className="text-sm mb-2 hidden md:block">Scroll Down</span>
          <FaChevronDown className="text-xl" />
        </div>
      </motion.div>
    </div>
  );
};

export default Banner;
