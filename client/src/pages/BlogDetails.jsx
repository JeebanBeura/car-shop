import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { blogService } from '../services/api';
import { blogs as staticBlogs } from '../data/blogs';
import { ArrowLeft, Clock, User, Share2, Facebook, Twitter, Link as LinkIcon, ChevronRight } from 'lucide-react';
import Footer from '../sections/Footer';

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await blogService.getById(id);
        if (data) {
          setBlog(data);
        } else {
          // Fallback to static if API returns null
          const staticBlog = staticBlogs.find(b => String(b.id) === id);
          setBlog(staticBlog);
        }
      } catch (err) {
        console.error('API Error, searching static data:', err);
        const staticBlog = staticBlogs.find(b => String(b.id) === id);
        setBlog(staticBlog);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center font-bold text-gray-400 animate-pulse uppercase tracking-widest">
      Loading Article...
    </div>
  );

  if (!blog) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-3xl font-black text-dark mb-4 italic">Article Not <span className="text-primary italic">Found</span></h2>
      <p className="text-gray-400 font-bold mb-8">The blog post you're looking for might have been moved or deleted.</p>
      <Link to="/" className="bg-dark text-white px-8 py-3 rounded-full font-black text-sm active:scale-95 transition-all outline-none">
        Back to Home
      </Link>
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <button 
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-gray-400 hover:text-dark font-black text-xs uppercase tracking-widest mb-12 transition-colors outline-none"
        >
          <div className="p-2 border border-gray-100 rounded-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
            <ArrowLeft size={16} />
          </div>
          Back to browsing
        </button>

        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-4 py-1.5 bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest rounded-full border border-gray-100">
              Insight
            </span>
            <div className="flex items-center gap-2 text-gray-400 font-bold text-xs uppercase tracking-wider">
              <Clock size={14} /> {blog.date}
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-dark mb-8 leading-[1.1] italic">
            {blog.title}
          </h1>
          <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-[2rem] border border-gray-100">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white font-black text-xl italic shadow-lg shadow-primary/20">
              {blog.author?.[0] || 'A'}
            </div>
            <div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Article By</p>
              <h4 className="text-lg font-black text-dark leading-tight">{blog.author}</h4>
            </div>
          </div>
        </header>

        <div className="aspect-[16/9] rounded-[2.5rem] overflow-hidden mb-16 shadow-2xl border border-gray-100 group">
          <img 
            src={blog.image} 
            alt={blog.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
          />
        </div>

        <div className="prose prose-lg max-w-none text-gray-600 font-medium leading-loose">
          {blog.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="mb-8 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-20 pt-12 border-t border-gray-100 flex flex-wrap items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <h5 className="text-xs font-black text-gray-400 uppercase tracking-widest">Share this</h5>
            <div className="flex gap-2">
              <button className="p-3 bg-gray-50 hover:bg-primary hover:text-white rounded-2xl transition-all outline-none">
                <Facebook size={18} />
              </button>
              <button className="p-3 bg-gray-50 hover:bg-primary hover:text-white rounded-2xl transition-all outline-none">
                <Twitter size={18} />
              </button>
              <button className="p-3 bg-gray-50 hover:bg-primary hover:text-white rounded-2xl transition-all outline-none">
                <LinkIcon size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogDetails;
