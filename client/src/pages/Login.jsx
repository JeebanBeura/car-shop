import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import { Lock, User, Key, ArrowRight, Car } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await authService.login(formData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('admin', JSON.stringify(data.admin));
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-light flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-primary/10 rounded-full blur-[100px]"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden p-10 md:p-12 border border-gray-100">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center p-4 bg-primary rounded-2xl text-white mb-6 shadow-xl shadow-primary/20">
              <Car size={32} />
            </div>
            <h1 className="text-4xl font-black text-dark mb-3 italic">Admin <span className="text-primary italic">Portal</span></h1>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Enter your credentials to manage shop</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-4 ring-primary/10 border-primary/20 outline-none transition-all font-medium"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400">
                  <Key size={18} />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-4 ring-primary/10 border-primary/20 outline-none transition-all font-medium"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 text-red-500 rounded-2xl text-sm font-bold flex items-center gap-2 animate-in fade-in duration-300">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div> {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-dark hover:bg-primary text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-2xl hover:shadow-primary/20"
            >
              {loading ? 'Authenticating...' : (
                <>Sign In <ArrowRight size={20} /></>
              )}
            </button>
          </form>

          <button onClick={() => navigate('/')} className="mt-8 w-full text-center text-gray-400 font-bold hover:text-dark transition-colors text-sm">
            Back to Website
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
