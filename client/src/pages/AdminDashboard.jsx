import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { carService, blogService } from '../services/api';
import CarModal from '../components/admin/CarModal';
import BlogModal from '../components/admin/BlogModal';
import { 
  Plus, Edit2, Trash2, LayoutDashboard, Car, FileText, 
  LogOut, PlusCircle, Search, Filter, Image as ImageIcon 
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('cars');
  const [cars, setCars] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'cars') {
        const { data } = await carService.getAll();
        setCars(data);
      } else {
        const { data } = await blogService.getAll();
        setBlogs(data);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    navigate('/admin/login');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      if (activeTab === 'cars') {
        await carService.delete(id);
        setCars(cars.filter(c => c._id !== id));
      } else {
        await blogService.delete(id);
        setBlogs(blogs.filter(b => b._id !== id));
      }
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedItem(null);
    setIsModalOpen(true);
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r border-gray-100 flex flex-col p-8 fixed h-full">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="p-2.5 bg-primary rounded-xl text-white">
            <LayoutDashboard size={24} />
          </div>
          <h1 className="text-xl font-black text-dark tracking-tight italic">Admin <span className="text-primary italic">Panel</span></h1>
        </div>

        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => { setActiveTab('cars'); setIsModalOpen(false); }}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${
              activeTab === 'cars' ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-gray-400 hover:bg-gray-50 hover:text-dark'
            }`}
          >
            <Car size={20} /> Manage Cars
          </button>
          <button 
            onClick={() => { setActiveTab('blogs'); setIsModalOpen(false); }}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${
              activeTab === 'blogs' ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-gray-400 hover:bg-gray-50 hover:text-dark'
            }`}
          >
            <FileText size={20} /> Manage Blogs
          </button>
        </nav>

        <button 
          onClick={handleLogout}
          className="mt-auto flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-red-400 hover:bg-red-50 hover:text-red-500 transition-all border border-transparent hover:border-red-100"
        >
          <LogOut size={20} /> Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-80 p-12">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black text-dark mb-2 capitalize">{activeTab} <span className="text-primary">Management</span></h2>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Total items: {activeTab === 'cars' ? cars.length : blogs.length}</p>
          </div>
          <button 
            onClick={handleAddNew}
            className="flex items-center gap-3 bg-dark text-white px-8 py-4 rounded-2xl font-black shadow-2xl active:scale-95 transition-all text-sm"
          >
            <Plus size={20} /> Add New {activeTab === 'cars' ? 'Car' : 'Article'}
          </button>
        </header>

        {/* List */}
        <div className="grid grid-cols-1 gap-6">
          {loading ? (
            <div className="h-64 flex items-center justify-center font-bold text-gray-400 uppercase tracking-widest text-sm animate-pulse">
              Syncing with database...
            </div>
          ) : (activeTab === 'cars' ? cars : blogs).length === 0 ? (
            <div className="bg-white rounded-[2.5rem] p-16 text-center border-2 border-dashed border-gray-100 italic">
              <p className="text-gray-400 font-medium text-lg">No {activeTab} found. Start by adding your first one!</p>
            </div>
          ) : (
            (activeTab === 'cars' ? cars : blogs).map((item) => (
              <div key={item._id} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center gap-8 group hover:shadow-xl hover:shadow-gray-200/50 transition-all">
                <div className="w-24 h-24 rounded-3xl overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-50">
                  <img src={activeTab === 'cars' ? item.images[0] : item.image} alt={item.name || item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-black text-dark leading-tight">{item.name || item.title}</h3>
                    <span className="px-3 py-1 bg-gray-50 rounded-full text-[10px] font-black text-gray-400 uppercase tracking-wider border border-gray-100">
                      {item.type || 'Article'}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-primary">{activeTab === 'cars' ? `$${item.price}` : item.date}</p>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(item)}
                    className="p-4 bg-gray-50 text-gray-400 hover:bg-primary hover:text-white rounded-2xl transition-all shadow-sm active:scale-90"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(item._id)}
                    className="p-4 bg-gray-50 text-gray-400 hover:bg-red-500 hover:text-white rounded-2xl transition-all shadow-sm active:scale-90"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Modals */}
      {activeTab === 'cars' ? (
        <CarModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={fetchData}
          initialData={selectedItem}
        />
      ) : (
        <BlogModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={fetchData}
          initialData={selectedItem}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
