import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Testimonials = () => {
  const { isDark } = useTheme();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Small Business Owner",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "UBM System has revolutionized how I manage my business utility bills. The automated reminders and easy payment process save me hours every month."
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Homeowner",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "I love the analytics feature that shows my spending patterns. It's helped me reduce my utility costs by 20% over the past year."
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Property Manager",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Managing bills for multiple properties was a nightmare before UBM System. Now everything is organized and automated. Highly recommended!"
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Retiree",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "The customer support is exceptional. They helped me set up everything and I've never missed a payment since. Peace of mind at its best."
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className={`section-padding ${isDark ? 'bg-gray-800' : 'bg-gradient-to-br from-gray-50 to-blue-50'}`}>
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-4">What Our Customers Say</h2>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Don't just take our word for it. Here's what real customers have to say about their experience with UBM System.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className={`card p-8 md:p-12 text-center ${isDark ? 'bg-gray-700' : 'bg-white'}`}
            >
              <FaQuoteLeft className={`text-4xl mb-6 mx-auto ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              
              <p className={`text-lg md:text-xl leading-relaxed mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                "{testimonials[currentTestimonial].text}"
              </p>

              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-xl mx-1" />
                ))}
              </div>

              <div className="flex items-center justify-center gap-4">
                <img
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="text-left">
                  <h4 className={`font-semibold text-lg ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {testimonials[currentTestimonial].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full transition-all ${
              isDark 
                ? 'bg-gray-600 hover:bg-gray-500 text-white' 
                : 'bg-white hover:bg-gray-50 text-gray-700 shadow-lg'
            }`}
          >
            <FaChevronLeft />
          </button>
          
          <button
            onClick={nextTestimonial}
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full transition-all ${
              isDark 
                ? 'bg-gray-600 hover:bg-gray-500 text-white' 
                : 'bg-white hover:bg-gray-50 text-gray-700 shadow-lg'
            }`}
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentTestimonial === index 
                  ? 'bg-blue-600 scale-125' 
                  : `${isDark ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'}`
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;