import React from 'react';
import { X, Send, User, Mail, MessageSquare, Phone } from 'lucide-react';

const ContactModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-dark/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
        <div className="absolute top-6 right-6 z-10">
          <button 
            onClick={onClose}
            className="p-2 bg-gray-100 hover:bg-primary hover:text-white rounded-full transition-all active:scale-90"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-8 md:p-12">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-black text-dark mb-4 italic">Get in <span className="text-primary italic">Touch</span></h2>
            <p className="text-gray-500 font-medium leading-relaxed">
              Have a question about a car or want to book a test drive? 
              Fill out the form below and our team will get back to you within 24 hours.
            </p>
          </div>

          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 ring-primary/10 border-primary/20 outline-none transition-all font-medium"
                  required
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400">
                  <Phone size={18} />
                </div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 ring-primary/10 border-primary/20 outline-none transition-all font-medium"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400">
                <Mail size={18} />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 ring-primary/10 border-primary/20 outline-none transition-all font-medium"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute top-4 left-5 pointer-events-none text-gray-400">
                <MessageSquare size={18} />
              </div>
              <textarea
                placeholder="How can we help you?"
                rows="4"
                className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 ring-primary/10 border-primary/20 outline-none transition-all font-medium resize-none"
                required
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full bg-primary hover:bg-blue-600 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-xl shadow-blue-500/20"
            >
              Send Message <Send size={20} />
            </button>
          </form>

          <div className="mt-8 flex justify-center gap-8 text-sm font-bold text-gray-400 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div> Available Now
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div> Secure Portal
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
