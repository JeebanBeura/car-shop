import React from 'react';
import { Send } from 'lucide-react';

const Newsletter = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-primary rounded-[3rem] p-12 md:p-24 text-center">
          {/* Abstract background shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Never Miss a Great Deal Again
            </h2>
            <p className="text-blue-100 text-lg mb-10 leading-relaxed">
              Subscribe to our newsletter and be the first to know about new arrivals, price drops, and exclusive offers.
            </p>
            
            <form 
              className="flex flex-col sm:flex-row gap-4 p-2 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-white px-8 py-5 rounded-2xl outline-none text-dark focus:ring-4 ring-white/20 transition-all font-medium"
                required
              />
              <button className="bg-dark hover:bg-gray-900 text-white px-10 py-5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xl">
                Subscribe <Send size={20} />
              </button>
            </form>
            
            <p className="mt-8 text-blue-200 text-sm italic">
              * We promise not to spam. You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
