import React from 'react';
import { NavLink } from 'react-router-dom';
import { Car, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark pt-24 pb-12 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-8 transform hover:scale-105 transition-transform duration-300 cursor-pointer">
              <div className="p-2 bg-primary rounded-xl text-white">
                <Car size={32} />
              </div>
              <span className="text-2xl font-black tracking-tight text-white italic">
                Car<span className="text-primary">Shop</span>
              </span>
            </div>
            <p className="mb-8 leading-relaxed">
              We provide the most premium car buying experience. 
              Our commitment to quality and service is what sets us apart from the rest.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-3 bg-white/5 rounded-xl hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-3 bg-white/5 rounded-xl hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1">
                <Twitter size={20} />
              </a>
              <a href="#" className="p-3 bg-white/5 rounded-xl hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-3 bg-white/5 rounded-xl hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-black text-xl mb-8 italic">Quick Links</h4>
            <ul className="space-y-4 font-medium">
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-all"></span> Home</a></li>
              <li><a href="#cars" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-all"></span> New Cars</a></li>
              <li><a href="#used-cars" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-all"></span> Used Cars</a></li>
              <li><a href="#blog" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-all"></span> Our Blog</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-black text-xl mb-8 italic">Services</h4>
            <ul className="space-y-4 font-medium">
              <li><a href="#" className="hover:text-primary transition-colors">Car Financing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Trade-In Value</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Maintenance</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Insurance</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Customization</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-black text-xl mb-8 italic">Contact Info</h4>
            <ul className="space-y-6 font-medium">
              <li className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                  <MapPin size={20} />
                </div>
                <span>123 Performance Drive, Automotive City, AC 54321</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                  <Phone size={20} />
                </div>
                <span>+1 (234) 567-8900</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                  <Mail size={20} />
                </div>
                <span>contact@carshop.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 font-bold text-sm">
          <p>© 2026 CarShop. All Rights Reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <NavLink to="/admin/login" className="hover:text-primary transition-all text-xs border border-white/10 px-3 py-1 rounded-lg">Staff Login</NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
