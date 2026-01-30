
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Reservation } from '../types';

const Admin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [error, setError] = useState('');

  // Initial load of reservations
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('elizabeta_reservations') || '[]');
    setReservations(stored);
  }, [isLoggedIn]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid credentials. Hint: use admin/admin');
    }
  };

  // Fixed the type error by allowing 'pending' status in updateStatus
  const updateStatus = (id: string, newStatus: 'pending' | 'accepted' | 'rejected') => {
    const updated = reservations.map(res => 
      res.id === id ? { ...res, status: newStatus } : res
    );
    setReservations(updated);
    localStorage.setItem('elizabeta_reservations', JSON.stringify(updated));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'accepted':
        return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase">Accepted</span>;
      case 'rejected':
        return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold uppercase">Rejected</span>;
      default:
        return <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold uppercase">Pending</span>;
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex items-center justify-center p-6">
        <div className="max-w-md w-full animate-in zoom-in-95 duration-500">
          <div className="bg-white dark:bg-zinc-900 p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-zinc-800 text-center">
            <div className="bg-primary/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <span className="material-symbols-outlined text-primary text-3xl font-bold">admin_panel_settings</span>
            </div>
            <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white mb-2">Admin Portal</h1>
            <p className="text-slate-500 dark:text-slate-400 mb-8">Access Hostal Elizabeta management</p>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <input 
                type="text" 
                placeholder="Username"
                className="w-full px-5 py-3 bg-slate-50 dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-primary"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input 
                type="password" 
                placeholder="Password"
                className="w-full px-5 py-3 bg-slate-50 dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className="text-red-500 text-xs font-bold italic">{error}</p>}
              <button 
                type="submit" 
                className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-opacity-90 shadow-xl shadow-primary/20 transition-all"
              >
                Sign In
              </button>
            </form>
            <Link to="/" className="inline-block mt-8 text-sm text-slate-400 hover:text-primary transition-colors">
              Return to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 p-6 md:p-12 animate-in fade-in duration-700">
      <div className="max-w-6xl mx-auto">
        {/* Admin Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-primary font-bold uppercase tracking-[0.2em] text-xs mb-2 block">Management Dashboard</span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white">Reservation Queue</h1>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setIsLoggedIn(false)}
              className="px-6 py-2.5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors"
            >
              Sign Out
            </button>
            <Link 
              to="/"
              className="px-6 py-2.5 bg-secondary text-white rounded-xl font-bold text-sm shadow-lg shadow-secondary/20 hover:bg-opacity-90 transition-all"
            >
              Live Site
            </Link>
          </div>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Requests', val: reservations.length, icon: 'list_alt', color: 'bg-blue-500' },
            { label: 'Pending', val: reservations.filter(r => r.status === 'pending').length, icon: 'pending_actions', color: 'bg-amber-500' },
            { label: 'Accepted', val: reservations.filter(r => r.status === 'accepted').length, icon: 'check_circle', color: 'bg-green-500' },
            { label: 'Rejected', val: reservations.filter(r => r.status === 'rejected').length, icon: 'cancel', color: 'bg-red-500' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white dark:bg-zinc-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-zinc-800 flex items-center gap-4">
              <div className={`${stat.color} w-10 h-10 rounded-xl flex items-center justify-center text-white`}>
                <span className="material-symbols-outlined text-xl">{stat.icon}</span>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-slate-400">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.val}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Reservation Grid */}
        <div className="space-y-6">
          {reservations.length > 0 ? (
            reservations.map((res) => (
              <div 
                key={res.id} 
                className="bg-white dark:bg-zinc-900 rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-100 dark:border-zinc-800 flex flex-col md:flex-row items-center gap-8 transition-all hover:shadow-md animate-in slide-in-from-bottom-4 duration-500"
              >
                {/* Guest Info */}
                <div className="flex-grow w-full md:w-auto grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Room</p>
                    <p className="font-bold text-slate-800 dark:text-slate-200">{res.roomName}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Dates</p>
                    <p className="font-medium text-slate-600 dark:text-slate-400 text-sm">{res.checkIn} — {res.checkOut}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Guests</p>
                    <p className="font-medium text-slate-600 dark:text-slate-400 text-sm">{res.guests} People</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Status</p>
                    {getStatusBadge(res.status)}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 w-full md:w-auto">
                  {res.status === 'pending' ? (
                    <>
                      <button 
                        onClick={() => updateStatus(res.id, 'accepted')}
                        className="flex-1 md:flex-none bg-green-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                      >
                        <span className="material-symbols-outlined text-lg">check</span>
                        Accept
                      </button>
                      <button 
                        onClick={() => updateStatus(res.id, 'rejected')}
                        className="flex-1 md:flex-none bg-red-50 dark:bg-red-900/20 text-red-500 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors flex items-center justify-center gap-2"
                      >
                        <span className="material-symbols-outlined text-lg">close</span>
                        Reject
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={() => updateStatus(res.id, 'pending')}
                      className="w-full md:w-auto text-slate-400 hover:text-primary font-bold text-sm transition-colors"
                    >
                      Reset to Pending
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-32 bg-white dark:bg-zinc-900 rounded-[3rem] border-2 border-dashed border-slate-100 dark:border-zinc-800">
              <span className="material-symbols-outlined text-6xl text-slate-200 mb-4">inbox</span>
              <h3 className="text-xl font-bold text-slate-400">No reservations yet</h3>
              <p className="text-slate-300">Bookings from the front end will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
