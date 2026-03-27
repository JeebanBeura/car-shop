import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group border border-gray-100 flex flex-col h-full">
      <div className="relative h-64 overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 px-4 py-2 bg-white/90 backdrop-blur-md text-dark text-xs font-bold rounded-xl shadow-sm">
          Latest News
        </div>
      </div>
      
      <div className="p-8 flex-1 flex flex-col">
        <div className="flex items-center gap-4 text-xs text-gray-500 font-bold uppercase tracking-wider mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} className="text-primary" />
            {blog.date}
          </div>
          <div className="flex items-center gap-1.5 font-bold">
            <User size={14} className="text-primary" />
            {blog.author}
          </div>
        </div>
        
        <h3 className="text-2xl font-black text-dark mb-4 leading-tight group-hover:text-primary transition-colors italic">
          {blog.title}
        </h3>
        <p className="text-gray-600 mb-8 flex-1 line-clamp-3 leading-relaxed">
          {blog.excerpt}
        </p>
        
        <Link 
          to={`/blog/${blog._id || blog.id}`}
          className="inline-flex items-center gap-2 text-dark font-black hover:text-primary transition-all group/btn mt-auto"
        >
          Read Full Story 
          <span className="p-2 bg-gray-100 rounded-lg group-hover/btn:bg-primary group-hover/btn:text-white transition-all transform group-hover/btn:translate-x-1">
            <ArrowRight size={18} />
          </span>
        </Link>
      </div>
    </div>
  );
};

const Blog = ({ blogs = [] }) => {
  return (
    <section id="blog" className="py-24 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h4 className="text-primary font-bold tracking-widest uppercase mb-3">Insights</h4>
          <h2 className="text-4xl md:text-5xl font-black text-dark leading-tight mb-6">Latest from Our <span className="italic underline decoration-primary decoration-8 underline-offset-8">Magazine</span></h2>
          <p className="text-gray-600 text-lg">Stay updated with the latest trends, tips, and news from the automotive world.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <BlogCard key={blog._id || blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
