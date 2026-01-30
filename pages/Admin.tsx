
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Reservation, Room } from '../types';
import { ROOMS } from '../constants';

type AdminSection = 'dashboard' | 'reservations' | 'rooms' | 'settings';

const Admin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [error, setError] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        return <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-[10px] font-bold uppercase tracking-wider">Accepted</span>;
      case 'rejected':
        return <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-[10px] font-bold uppercase tracking-wider">Rejected</span>;
      default:
        return <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-[10px] font-bold uppercase tracking-wider">Pending</span>;
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
            <p className="text-slate-500 dark:text-slate-400 mb-8">Management Login</p>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">person</span>
                <input 
                  type="text" 
                  placeholder="Username"
                  className="w-full pl-12 pr-5 py-3.5 bg-slate-50 dark:bg-zinc-800 border-none rounded-2xl focus:ring-2 focus:ring-primary text-sm"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">lock</span>
                <input 
                  type="password" 
                  placeholder="Password"
                  className="w-full pl-12 pr-5 py-3.5 bg-slate-50 dark:bg-zinc-800 border-none rounded-2xl focus:ring-2 focus:ring-primary text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-red-500 text-xs font-bold italic">{error}</p>}
              <button 
                type="submit" 
                className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg hover:bg-opacity-90 shadow-xl shadow-primary/20 transition-all active:scale-[0.98]"
              >
                Sign In
              </button>
            </form>
            <Link to="/" className="inline-block mt-8 text-sm text-slate-400 hover:text-primary transition-colors font-medium">
              ← Return to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'reservations', label: 'Reservations', icon: 'calendar_today' },
    { id: 'rooms', label: 'Rooms', icon: 'bed' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex font-sans">
      {/* Sidebar - Desktop */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-zinc-900 border-r border-slate-100 dark:border-zinc-800 transform transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center gap-3 mb-12 px-2">
            <div className="bg-primary/20 p-2 rounded-xl">
              <span className="material-symbols-outlined text-primary font-bold">cottage</span>
            </div>
            <span className="font-display text-xl font-bold text-slate-900 dark:text-white">Admin Panel</span>
          </div>

          <nav className="flex-grow space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id as AdminSection);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${
                  activeSection === item.id 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-zinc-800'
                }`}
              >
                <span className="material-symbols-outlined text-xl">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-6 space-y-2">
            <Link 
              to="/"
              className="flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-bold text-slate-500 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-all"
            >
              <span className="material-symbols-outlined text-xl">visibility</span>
              View Website
            </Link>
            <button 
              onClick={() => setIsLoggedIn(false)}
              className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all"
            >
              <span className="material-symbols-outlined text-xl">logout</span>
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow lg:ml-72 min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-slate-100 dark:border-zinc-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-500"
            >
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
            <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white capitalize">
              {activeSection}
            </h2>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden sm:flex flex-col items-end mr-2">
                <span className="text-sm font-bold text-slate-900 dark:text-white">Admin User</span>
                <span className="text-[10px] uppercase font-bold text-slate-400">Hostel Manager</span>
             </div>
             <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-zinc-800 flex items-center justify-center">
                <span className="material-symbols-outlined text-slate-500">person</span>
             </div>
          </div>
        </header>

        <div className="p-6 md:p-10 max-w-7xl mx-auto">
          {/* Section: DASHBOARD */}
          {activeSection === 'dashboard' && (
            <div className="animate-in fade-in duration-500 space-y-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Total Booking Requests', value: reservations.length, icon: 'receipt_long', color: 'text-blue-500', bg: 'bg-blue-500/10' },
                  { label: 'Pending Approvals', value: reservations.filter(r => r.status === 'pending').length, icon: 'hourglass_empty', color: 'text-amber-500', bg: 'bg-amber-500/10' },
                  { label: 'Upcoming Stays', value: reservations.filter(r => r.status === 'accepted').length, icon: 'check_circle', color: 'text-green-500', bg: 'bg-green-500/10' },
                  { label: 'Total Rooms', value: ROOMS.length, icon: 'hotel', color: 'text-primary', bg: 'bg-primary/10' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white dark:bg-zinc-900 p-6 rounded-[2rem] border border-slate-100 dark:border-zinc-800 shadow-sm">
                    <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-4`}>
                      <span className="material-symbols-outlined text-2xl">{stat.icon}</span>
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-slate-100 dark:border-zinc-800 shadow-sm">
                  <h3 className="text-xl font-display font-bold mb-6 text-slate-900 dark:text-white">Recent Activity</h3>
                  <div className="space-y-6">
                    {reservations.slice(0, 4).map((res) => (
                      <div key={res.id} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-500">
                           <span className="material-symbols-outlined text-xl">event</span>
                        </div>
                        <div className="flex-grow">
                          <p className="text-sm font-bold text-slate-800 dark:text-slate-200">New request for {res.roomName}</p>
                          <p className="text-xs text-slate-400">{new Date(res.createdAt).toLocaleDateString()}</p>
                        </div>
                        {getStatusBadge(res.status)}
                      </div>
                    ))}
                    {reservations.length === 0 && <p className="text-slate-400 text-center py-10">No recent activity.</p>}
                  </div>
                </div>

                <div className="bg-primary text-white p-8 rounded-[2rem] shadow-xl shadow-primary/20 relative overflow-hidden flex flex-col justify-center">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <span className="material-symbols-outlined text-9xl">notifications_active</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-4 relative z-10">Occupancy Alert</h3>
                  <p className="text-white/80 mb-8 relative z-10">Your suite rooms are seeing high demand for next month. Consider adjusting seasonal rates.</p>
                  <button onClick={() => setActiveSection('rooms')} className="bg-white text-primary px-6 py-3 rounded-xl font-bold text-sm w-fit hover:scale-105 transition-transform relative z-10">
                    Manage Rooms
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Section: RESERVATIONS */}
          {activeSection === 'reservations' && (
            <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-6">
              <div className="flex items-center justify-between mb-8">
                <div className="relative w-full max-w-md">
                   <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                   <input 
                     type="text" 
                     placeholder="Search guests or rooms..."
                     className="w-full pl-12 pr-4 py-3 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl focus:ring-2 focus:ring-primary text-sm shadow-sm"
                   />
                </div>
              </div>

              {reservations.length > 0 ? (
                reservations.map((res) => (
                  <div key={res.id} className="bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-[2rem] border border-slate-100 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row items-center gap-8 group hover:shadow-md transition-all">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-grow w-full">
                      <div>
                        <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Room</p>
                        <p className="font-bold text-slate-900 dark:text-white">{res.roomName}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Stay Duration</p>
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                          {new Date(res.checkIn).toLocaleDateString()} — {new Date(res.checkOut).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Occupancy</p>
                        <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-300">
                          <span className="material-symbols-outlined text-sm">group</span>
                          {res.guests} Guests
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Status</p>
                        {getStatusBadge(res.status)}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                      {res.status === 'pending' ? (
                        <>
                          <button 
                            onClick={() => updateStatus(res.id, 'accepted')}
                            className="flex-1 md:flex-none bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:opacity-90 shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
                          >
                            <span className="material-symbols-outlined text-lg">check_circle</span>
                            Accept
                          </button>
                          <button 
                            onClick={() => updateStatus(res.id, 'rejected')}
                            className="flex-1 md:flex-none bg-red-50 dark:bg-red-900/10 text-red-500 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors flex items-center justify-center gap-2"
                          >
                            <span className="material-symbols-outlined text-lg">cancel</span>
                            Reject
                          </button>
                        </>
                      ) : (
                        <button 
                          onClick={() => updateStatus(res.id, 'pending')}
                          className="w-full md:w-auto text-slate-400 hover:text-primary font-bold text-sm transition-colors py-2"
                        >
                          Mark as Pending
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-32 bg-white dark:bg-zinc-900 rounded-[3rem] border-2 border-dashed border-slate-100 dark:border-zinc-800">
                   <div className="w-20 h-20 bg-slate-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="material-symbols-outlined text-4xl text-slate-200">inbox</span>
                   </div>
                   <h3 className="text-xl font-bold text-slate-400">Empty Queue</h3>
                   <p className="text-slate-300 text-sm mt-2">No reservation requests at the moment.</p>
                </div>
              )}
            </div>
          )}

          {/* Section: ROOMS */}
          {activeSection === 'rooms' && (
            <div className="animate-in slide-in-from-right-4 duration-500 space-y-8">
              <div className="flex justify-between items-center">
                <p className="text-slate-500 font-medium">Manage your {ROOMS.length} active room listings.</p>
                <button className="bg-secondary text-white px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 shadow-xl shadow-secondary/20 transition-all flex items-center gap-2">
                   <span className="material-symbols-outlined text-lg">add</span>
                   Add Room
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {ROOMS.map((room) => (
                  <div key={room.id} className="bg-white dark:bg-zinc-900 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-zinc-800 shadow-sm flex flex-col h-full group">
                    <div className="relative h-48">
                      <img src={room.image} alt={room.name} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-6">
                        <h4 className="text-xl font-display font-bold text-white">{room.name}</h4>
                        <p className="text-white/70 text-xs">${room.price} / night</p>
                      </div>
                    </div>
                    <div className="p-8 flex-grow space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 dark:bg-zinc-800/50 p-3 rounded-2xl">
                           <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Capacity</p>
                           <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{room.capacity} Guests</p>
                        </div>
                        <div className="bg-slate-50 dark:bg-zinc-800/50 p-3 rounded-2xl">
                           <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Status</p>
                           <div className="flex items-center gap-2">
                             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                             <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Active</p>
                           </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                         <button className="flex-1 py-3 border-2 border-slate-100 dark:border-zinc-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-zinc-800 transition-all">Edit Details</button>
                         <button className="px-4 border-2 border-red-50 dark:border-red-900/10 text-red-500 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 transition-all">
                            <span className="material-symbols-outlined text-lg">delete</span>
                         </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: SETTINGS */}
          {activeSection === 'settings' && (
            <div className="animate-in slide-in-from-left-4 duration-500 max-w-2xl space-y-10">
              <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-zinc-800 shadow-sm space-y-8">
                <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white border-b border-slate-50 dark:border-zinc-800 pb-4">Hostel Profile</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Hostel Name</label>
                    <input 
                      type="text" 
                      defaultValue="Hostal Elizabeta"
                      className="w-full px-5 py-3.5 bg-slate-50 dark:bg-zinc-800 border-none rounded-2xl focus:ring-2 focus:ring-primary text-sm font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Contact Email</label>
                    <input 
                      type="email" 
                      defaultValue="hola@hostalelizabeta.com"
                      className="w-full px-5 py-3.5 bg-slate-50 dark:bg-zinc-800 border-none rounded-2xl focus:ring-2 focus:ring-primary text-sm font-medium"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Check-in Time</label>
                      <input 
                        type="time" 
                        defaultValue="14:00"
                        className="w-full px-5 py-3.5 bg-slate-50 dark:bg-zinc-800 border-none rounded-2xl focus:ring-2 focus:ring-primary text-sm font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Check-out Time</label>
                      <input 
                        type="time" 
                        defaultValue="11:00"
                        className="w-full px-5 py-3.5 bg-slate-50 dark:bg-zinc-800 border-none rounded-2xl focus:ring-2 focus:ring-primary text-sm font-medium"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-zinc-800 shadow-sm space-y-8">
                <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white border-b border-slate-50 dark:border-zinc-800 pb-4">Security</h3>
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-2xl">
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Admin Password</p>
                    <p className="text-xs text-slate-400">Last changed 3 months ago</p>
                  </div>
                  <button className="text-primary font-bold text-sm hover:underline">Change</button>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="px-10 py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all">Save Changes</button>
                <button className="px-10 py-4 border-2 border-slate-100 dark:border-zinc-800 text-slate-400 rounded-2xl font-bold hover:bg-slate-50 transition-all">Discard</button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden animate-in fade-in duration-300"
        ></div>
      )}
    </div>
  );
};

export default Admin;
