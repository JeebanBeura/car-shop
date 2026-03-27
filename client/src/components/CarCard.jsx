import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Gauge, Fuel, Settings } from 'lucide-react';

const CarCard = ({ car }) => {
  const [currentImg, setCurrentImg] = useState(0);

  const nextImg = (e) => {
    e.stopPropagation();
    setCurrentImg((prev) => (prev === car.images.length - 1 ? 0 : prev + 1));
  };

  const prevImg = (e) => {
    e.stopPropagation();
    setCurrentImg((prev) => (prev === 0 ? car.images.length - 1 : prev - 1));
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group border border-gray-100 h-full flex flex-col">
      {/* Image Slider */}
      <div className="relative h-64 overflow-hidden">
        {car.images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentImg ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={img}
              alt={car.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>
        ))}
        
        {/* Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent"></div>

        {/* Controls */}
        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={prevImg}
            className="p-1.5 bg-white/20 hover:bg-white/40 text-white backdrop-blur-md rounded-full border border-white/30 transition-all"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={nextImg}
            className="p-1.5 bg-white/20 hover:bg-white/40 text-white backdrop-blur-md rounded-full border border-white/30 transition-all"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-4 left-4 flex gap-1.5">
          {car.images.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentImg ? 'w-4 bg-primary' : 'w-1.5 bg-white/50'
              }`}
            />
          ))}
        </div>
        
        {/* Type Badge */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-white text-xs font-bold rounded-full uppercase tracking-wider">
          {car.type}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-dark group-hover:text-primary transition-colors mb-1 truncate">
            {car.name}
          </h3>
          <div className="flex items-center gap-1 text-2xl font-black text-dark">
            <span className="text-primary">$</span>
            {car.price}
          </div>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-3 gap-2 mb-6 text-sm text-gray-500">
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded-2xl">
            <Gauge size={16} className="mb-1 text-primary" />
            <span>{car.specs?.mileage || '2.5k mi'}</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded-2xl">
            <Fuel size={16} className="mb-1 text-primary" />
            <span>{car.specs?.fuel || 'Hybrid'}</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded-2xl">
            <Settings size={16} className="mb-1 text-primary" />
            <span>{car.specs?.transmission || 'Auto'}</span>
          </div>
        </div>

        <button className="w-full py-3.5 bg-dark text-white font-bold rounded-2xl hover:bg-primary transition-all duration-300 transform active:scale-95 mt-auto">
          View Details
        </button>
      </div>
    </div>
  );
};

export default CarCard;
