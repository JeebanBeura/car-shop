import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Car, Menu, X, ChevronDown, BookOpen } from 'lucide-react';
import { blogs } from '../data/blogs';
import ContactModal from './ContactModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBlogHovered, setIsBlogHovered] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Cars', path: '/#cars' },
    { name: 'Used Cars', path: '/#used-cars' },
    { name: 'Blog', path: '/#blog', hasSubmenu: true },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 glass shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <NavLink to="/" className="flex items-center space-x-2 group">
                <div className="p-2 bg-primary rounded-xl text-white transform group-hover:rotate-12 transition-transform duration-300">
                  <Car size={32} />
                </div>
                <span className="text-2xl font-bold tracking-tight text-dark">
                  Car<span className="text-primary italic">Shop</span>
                </span>
              </NavLink>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <div 
                  key={link.name} 
                  className="relative h-20 flex items-center"
                  onMouseEnter={() => link.hasSubmenu && setIsBlogHovered(true)}
                  onMouseLeave={() => link.hasSubmenu && setIsBlogHovered(false)}
                >
                  <a
                    href={link.path}
                    className="text-gray-600 hover:text-primary font-bold transition-all duration-200 flex items-center gap-1.5"
                  >
                    {link.name}
                    {link.hasSubmenu && <ChevronDown size={16} className={`transition-transform duration-300 ${isBlogHovered ? 'rotate-180' : ''}`} />}
                  </a>

                  {/* Blog Submenu */}
                  {link.hasSubmenu && isBlogHovered && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-80 bg-white border border-gray-100 rounded-[2rem] shadow-2xl p-4 animate-in slide-in-from-top-2 fade-in duration-300">
                      <div className="space-y-2">
                        <div className="px-4 py-2 text-xs font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 mb-2">
                          Recent Articles
                        </div>
                        {blogs.map((blog) => (
                          <Link
                            key={blog.id}
                            to={`/blog/${blog.id}`}
                            className="block px-4 py-3 hover:bg-blue-50 rounded-2xl group/item transition-all"
                          >
                            <div className="flex items-start gap-3">
                              <BookOpen size={16} className="mt-1 text-primary opacity-0 group-hover/item:opacity-100 transition-opacity" />
                              <div>
                                <h4 className="text-sm font-bold text-dark group-hover/item:text-primary transition-colors line-clamp-2 leading-tight">
                                  {blog.title}
                                </h4>
                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{blog.date}</span>
                              </div>
                            </div>
                          </Link>
                        ))}
                        <div className="pt-2 border-t border-gray-50 mt-2">
                          <Link to="/#blog" className="block text-center text-xs font-bold text-primary hover:underline py-1">
                            View All Posts
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop User Actions */}
            <div className="hidden md:flex items-center gap-4">
              <Link 
                to="/admin/login"
                className="px-6 py-2.5 bg-gray-50 text-dark font-black rounded-xl text-sm hover:bg-gray-200 transition-all uppercase tracking-widest border border-gray-100"
              >
                Admin
              </Link>
              <button
                onClick={() => setIsContactOpen(true)}
                className="px-8 py-3 bg-primary text-white font-black rounded-full text-sm hover:bg-blue-600 transition-all duration-300 shadow-xl shadow-blue-500/20 active:scale-95 italic"
              >
                Contact Us
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-dark p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-xl overflow-hidden animate-in slide-in-from-top duration-300">
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <a
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-4 text-base font-bold text-dark hover:text-primary hover:bg-blue-50 rounded-2xl transition-all"
                  >
                    {link.name}
                  </a>
                  {link.hasSubmenu && (
                    <div className="pl-6 space-y-1 pb-4">
                      {blogs.map((blog) => (
                        <Link
                          key={blog.id}
                          to={`/blog/${blog.id}`}
                          onClick={() => setIsOpen(false)}
                          className="block py-2 text-sm font-medium text-gray-500 hover:text-primary truncate"
                        >
                          • {blog.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 px-3">
                <button 
                  onClick={() => { setIsOpen(false); setIsContactOpen(true); }}
                  className="w-full bg-primary text-white px-6 py-4 rounded-2xl font-black shadow-lg shadow-blue-500/10 active:scale-95 transition-all text-center italic"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Component Modals */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
};

export default Navbar;
