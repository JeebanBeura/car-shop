import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Hero = () => {
  const images = [
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1170&auto=format&fit=crop"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <section className="relative h-[calc(100vh-80px)] overflow-hidden bg-dark">
      <div className="flex flex-col md:flex-row h-full">
        {/* Left Side - Text */}
        <div className="flex-1 flex items-center justify-center px-6 md:px-12 lg:px-24 z-10 py-12 md:py-0">
          <div className="max-w-2xl text-white">
            <h4 className="text-primary font-bold tracking-widest uppercase mb-4 animate-in slide-in-from-left duration-700">Premium Experience</h4>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight animate-in slide-in-from-left duration-1000 delay-100">
              Find Your <span className="text-primary italic">Dream Car</span> Today
            </h1>
            <p className="text-lg text-gray-400 mb-10 leading-relaxed animate-in slide-in-from-left duration-1000 delay-200">
              Discover the finest collection of luxury and performance vehicles.
              From the latest models to certified pre-owned classics, we bring you excellence on four wheels.
            </p>
            <div className="flex flex-wrap gap-4 animate-in slide-in-from-left duration-1000 delay-300">
              <button className="bg-primary hover:bg-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl shadow-blue-500/20 active:scale-95 transition-all">
                Explore Cars
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20 px-10 py-4 rounded-full font-bold text-lg active:scale-95 transition-all">
                Sell Car
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Image Slider */}
        <div className="flex-1 relative h-64 md:h-full overflow-hidden">
          {images.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${index === currentIndex ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-full scale-110'
                }`}
            >
              <img
                src={img}
                alt={`Car ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-dark to-transparent md:bg-gradient-to-l opacity-60"></div>
            </div>
          ))}

          {/* Controls */}
          <div className="absolute bottom-8 right-8 flex gap-3 z-20">
            <button
              onClick={prevSlide}
              className="p-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full backdrop-blur-md transition-all active:scale-90"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full backdrop-blur-md transition-all active:scale-90"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Dots */}
          <div className="absolute bottom-8 left-1/2 md:left-auto md:right-32 flex gap-2 z-20 -translate-x-1/2 md:translate-x-0">
            {images.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-white/30'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
