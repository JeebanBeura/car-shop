import React from 'react';
import { Send } from 'lucide-react';
import newsletterBg from '../assets/newsletter_bg.png';

const Newsletter = () => {
  return (
    <section className="py-24 bg-light overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="relative rounded-[3.5rem] overflow-hidden min-h-[500px] flex items-center justify-center p-8 md:p-20 shadow-2xl">
          {/* Background Image with Parallax-like effect */}
          <div className="absolute inset-0 z-0">
            <img 
              src={newsletterBg} 
              alt="Newsletter Background" 
              className="w-full h-full object-cover scale-105 transition-transform duration-10000 linear animate-slow-zoom"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-dark/90 via-dark/60 to-transparent"></div>
          </div>
          
          <div className="relative z-10 w-full max-w-4xl grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-left">
              <h4 className="text-primary font-bold tracking-[0.2em] uppercase mb-4">Stay Ahead</h4>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-[1.1]">
                Get the <span className="text-primary italic">Best Deals</span> First
              </h2>
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-md">
                Join our elite community and receive early access to new arrivals, price drops, and member-only luxury events.
              </p>
            </div>
            
            {/* Glassmorphic Form Card */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
              {/* Subtle light effect on hover */}
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/20 rounded-full blur-[80px] group-hover:bg-primary/30 transition-all duration-700"></div>
              
              <form 
                className="relative z-10 flex flex-col gap-5"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="relative">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full bg-white/10 border border-white/20 px-8 py-5 rounded-2xl outline-none text-white placeholder:text-gray-400 focus:bg-white focus:text-dark focus:ring-4 ring-primary/20 transition-all font-medium text-lg"
                    required
                  />
                </div>
                <button className="bg-primary hover:bg-blue-600 text-white w-full py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-primary/25 text-lg group">
                  Subscribe Now 
                  <Send size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
              
              <div className="mt-8 flex items-center justify-center gap-2 text-gray-400 text-sm">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span>Weekly updates • No spam guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
