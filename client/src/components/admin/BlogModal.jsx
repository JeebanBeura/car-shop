import React, { useState, useEffect } from 'react';
import { X, Save, FileText, Image as ImageIcon } from 'lucide-react';
import { blogService } from '../../services/api';

const BlogModal = ({ isOpen, onClose, onSuccess, initialData }) => {
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    excerpt: '',
    content: '',
    author: 'Admin',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        title: '',
        image: '',
        excerpt: '',
        content: '',
        author: 'Admin',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (initialData?._id) {
        await blogService.update(initialData._id, formData);
      } else {
        await blogService.create(formData);
      }
      onSuccess();
      onClose();
    } catch (err) {
      alert('Operation failed');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-dark/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white w-full max-w-3xl rounded-[3rem] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in duration-300">
        <header className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-2xl font-black text-dark italic">
            {initialData ? 'Edit' : 'Create'} <span className="text-primary italic">Article</span>
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-400">
            <X size={24} />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="p-8 max-h-[80vh] overflow-y-auto space-y-6 custom-scrollbar">
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Article Title</label>
            <input
              className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-primary/20 rounded-2xl outline-none font-bold transition-all"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="The Future of Electric Sports Cars..."
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Featured Image URL</label>
            <input
              className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-primary/20 rounded-2xl outline-none font-bold transition-all"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://..."
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Short Excerpt</label>
            <textarea
              rows="2"
              className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-primary/20 rounded-2xl outline-none font-bold transition-all resize-none"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="What is this article about?"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Full Content</label>
            <textarea
              rows="8"
              className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-primary/20 rounded-2xl outline-none font-bold transition-all resize-none"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Write your article here..."
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-dark text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-2xl hover:bg-primary shadow-primary/10"
            >
              <Save size={20} /> {initialData ? 'Update Article' : 'Publish Now'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-10 bg-gray-100 text-gray-500 rounded-2xl font-black text-lg hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogModal;
