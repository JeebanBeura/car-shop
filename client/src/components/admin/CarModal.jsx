import React, { useState, useEffect } from 'react';
import { X, Save, Image as ImageIcon, Plus, Trash2 } from 'lucide-react';
import { carService } from '../../services/api';

const CarModal = ({ isOpen, onClose, onSuccess, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    type: 'New',
    images: [''],
    specs: {
      mileage: '2.5k mi',
      fuel: 'Petrol',
      transmission: 'Auto'
    }
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: '',
        price: '',
        type: 'New',
        images: [''],
        specs: {
          mileage: '2.5k mi',
          fuel: 'Petrol',
          transmission: 'Auto'
        }
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (initialData?._id) {
        await carService.update(initialData._id, formData);
      } else {
        await carService.create(formData);
      }
      onSuccess();
      onClose();
    } catch (err) {
      alert('Operation failed');
    }
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ''] });
  };

  const updateImage = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const removeImage = (index) => {
    setFormData({ ...formData, images: formData.images.filter((_, i) => i !== index) });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-dark/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in duration-300">
        <header className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-2xl font-black text-dark italic">
            {initialData ? 'Edit' : 'Add'} <span className="text-primary italic">Car</span>
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-400">
            <X size={24} />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="p-8 max-h-[80vh] overflow-y-auto space-y-8 custom-scrollbar">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Car Name</label>
              <input
                className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-primary/20 rounded-2xl outline-none font-bold transition-all"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Porsche 911 GT3"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Price ($)</label>
              <input
                type="number"
                className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-primary/20 rounded-2xl outline-none font-bold transition-all"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="e.g. 150000"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Type</label>
              <select
                className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-primary/20 rounded-2xl outline-none font-bold transition-all"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="New">New Arrival</option>
                <option value="Used">Pre-Owned</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Mileage</label>
              <input
                className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-primary/20 rounded-2xl outline-none font-bold transition-all"
                value={formData.specs.mileage}
                onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, mileage: e.target.value } })}
              />
            </div>
          </div>

          {/* Images */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Image URLs</label>
              <button 
                type="button" 
                onClick={addImageField}
                className="text-primary text-xs font-black uppercase tracking-widest hover:underline flex items-center gap-1"
              >
                <Plus size={14} /> Add Image
              </button>
            </div>
            {formData.images.map((img, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  className="flex-1 px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-primary/20 rounded-2xl outline-none font-bold transition-all"
                  value={img}
                  onChange={(e) => updateImage(idx, e.target.value)}
                  placeholder="https://..."
                />
                <button 
                  type="button" 
                  onClick={() => removeImage(idx)}
                  className="p-4 bg-red-50 text-red-400 hover:bg-red-500 hover:text-white rounded-2xl transition-all"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-dark text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-2xl hover:bg-primary shadow-primary/10"
            >
              <Save size={20} /> {initialData ? 'Update Car' : 'Save Car'}
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

export default CarModal;
