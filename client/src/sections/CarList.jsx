import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import CarCard from '../components/CarCard';

const CarList = ({ title, subtitle, cars, id, variant }) => {
  const [startIndex, setStartIndex] = useState(0);

  const getStep = () => {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  const nextSlide = () => {
    const step = getStep();
    if (startIndex + step < cars.length) {
      setStartIndex((prev) => Math.min(prev + step, cars.length - step));
    }
  };

  const prevSlide = () => {
    const step = getStep();
    if (startIndex > 0) {
      setStartIndex((prev) => Math.max(prev - step, 0));
    }
  };

  return (
    <section id={id} className={`py-24 overflow-hidden ${variant === 'light' ? 'bg-white' : 'bg-light'}`}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <h4 className="text-primary font-bold tracking-widest uppercase mb-3">{subtitle}</h4>
            <h2 className="text-4xl md:text-5xl font-black text-dark leading-tight">{title}</h2>
          </div>

          <div className="flex gap-4">
            <button
              onClick={prevSlide}
              disabled={startIndex === 0}
              className={`p-4 rounded-2xl border transition-all ${startIndex === 0
                ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                : 'border-dark text-dark hover:bg-dark hover:text-white active:scale-90 shadow-lg'
                }`}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              disabled={startIndex + getStep() >= cars.length}
              className={`p-4 rounded-2xl border transition-all ${startIndex + getStep() >= cars.length
                ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                : 'border-dark text-dark hover:bg-dark hover:text-white active:scale-90 shadow-lg'
                }`}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div
            className="flex transition-transform duration-700 ease-in-out gap-6"
            style={{
              transform: `translateX(-${startIndex * (100 / getStep())}%)`,
            }}
          >
            {cars.map((car) => (
              <div
                key={car._id || car.id}
                className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex-shrink-0"
              >
                <CarCard car={car} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarList;
