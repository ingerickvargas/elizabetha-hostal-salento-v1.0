import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Reservation, Room, RoomFeature } from '../types';
import { api, ApiBookingStatus, status, UiBookingStatus } from '../src/lib/api';
import { useLanguage } from '../contexts/LanguageContext';

type AdminSection = 'dashboard' | 'reservations' | 'rooms' | 'settings';

const LS_TOKEN_KEY = 'elizabetha_admin_token';

const Admin: React.FC = () => {
  const [token, setToken] = useState<string>(() => localStorage.getItem(LS_TOKEN_KEY) || '');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => !!localStorage.getItem(LS_TOKEN_KEY));
  const [email, setEmail] = useState('admin@elizabetha.local');
  const [password, setPassword] = useState('');
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [error, setError] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { language } = useLanguage();

  	useEffect(() => {
		if (!isLoggedIn || !token) return;
		const load = async () => {
			try {
			const [roomsData, bookingsData] = await Promise.all([
				api.adminGetRooms(token),
				api.adminGetBookings(token),
			]);

			setRooms(roomsData as any);

      // `api.adminGetBookings` already converts API status to UI form
      setReservations(bookingsData as any);
			} catch (e) {
			console.error(e);
			localStorage.removeItem(LS_TOKEN_KEY);
			setToken('');
			setIsLoggedIn(false);
			setError('Sesión inválida. Inicia sesión nuevamente.');
			}
		};
	load();
	}, [isLoggedIn, token]);

  	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const res = await api.adminLogin(email, password);
			const tkn = (res as any).token as string;

			localStorage.setItem(LS_TOKEN_KEY, tkn);
			setToken(tkn);
			setIsLoggedIn(true);
			setError('');
		} catch (err) {
			console.error(err);
			setError('Credenciales inválidas.');
		}
	};

  const updateStatus = async (id: string, uiStatus: UiBookingStatus) => {
    try {
      console.log("UI status:", uiStatus);
      await api.updateBookingStatus(token, id, uiStatus);

      const fresh = await api.adminGetBookings(token);
      // adminGetBookings ya convierte los estados a minúsculas, no hace falta hacerlo de nuevo
      setReservations(fresh as any);
    } catch (err) {
      console.error(err);
      setError('No se pudo actualizar el estado de la reserva.');
    }
  };

  const handleSaveRoom = async (e: React.FormEvent) => {
	e.preventDefault();
	if (!editingRoom) return;

	try {
		const exists = rooms.some(r => r.id === editingRoom.id);
		if (!exists) {
		setError('Crear habitaciones nuevas aún no está habilitado. (Falta endpoint POST en backend)');
		return;
		}

		await api.adminUpdateRoom(token, editingRoom.id, {
		name: editingRoom.name,
		name_es: editingRoom.name_es,
		price: editingRoom.price,
		description: editingRoom.description,
		description_es: editingRoom.description_es,
		longDescription: editingRoom.longDescription,
		longDescription_es: editingRoom.longDescription_es,
		image: editingRoom.image,
		galleryImages: editingRoom.galleryImages,
		tag: editingRoom.tag,
		tag_es: editingRoom.tag_es,
		size: editingRoom.size,
		size_es: editingRoom.size_es,
		bathroom: editingRoom.bathroom,
		bathroom_es: editingRoom.bathroom_es,
		amenity: editingRoom.amenity,
		amenity_es: editingRoom.amenity_es,
		features: editingRoom.features,
		capacity: editingRoom.capacity,
		});

		const roomsData = await api.adminGetRooms(token);
		setRooms(roomsData as any);
		setEditingRoom(null);
		setError('');
	} catch (err) {
		console.error(err);
		setError('No se pudo guardar la habitación.');
	}
	};

  const handleAddRoomClick = () => {
    const newRoom: Room = {
      id: Math.random().toString(36).substr(2, 9),
      name: 'New Room',
      name_es: 'Nueva Habitación',
      price: 50,
      description: 'Short description for the card.',
      description_es: 'Descripción corta para la tarjeta.',
      longDescription: 'Detailed description of the room and its amenities.',
      longDescription_es: 'Descripción detallada de la habitación y sus comodidades.',
      image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=800',
      galleryImages: [],
      tag: 'From $50/night',
      tag_es: 'Desde $50/noche',
      size: '20m²',
      size_es: '20m²',
      bathroom: 'Private',
      bathroom_es: 'Privado',
      amenity: 'WiFi',
      amenity_es: 'WiFi',
      features: [
        { icon: 'bed', name: 'Queen Bed', name_es: 'Cama Queen' },
        { icon: 'wifi', name: 'High-speed WiFi', name_es: 'WiFi de alta velocidad' }
      ],
      capacity: 2
    };
    setEditingRoom(newRoom);
  };

  const handleDeleteRoom = (id: string) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      const updatedRooms = rooms.filter(r => r.id !== id);
      setRooms(updatedRooms);
      localStorage.setItem('elizabeta_rooms', JSON.stringify(updatedRooms));
    }
  };

  const updateEditingRoomFeature = (index: number, field: keyof RoomFeature, value: string) => {
    if (!editingRoom) return;
    const newFeatures = [...editingRoom.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setEditingRoom({ ...editingRoom, features: newFeatures });
  };

  const addFeature = () => {
    if (!editingRoom) return;
    setEditingRoom({
      ...editingRoom,
      features: [...editingRoom.features, { icon: 'star', name: 'New Service', name_es: 'Nuevo Servicio' }]
    });
  };

  const removeFeature = (index: number) => {
    if (!editingRoom) return;
    setEditingRoom({
      ...editingRoom,
      features: editingRoom.features.filter((_, i) => i !== index)
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isGallery: boolean) => {
    if (!editingRoom || !e.target.files) return;
    
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setEditingRoom(prev => {
          if (!prev) return null;
          if (isGallery) {
            return { ...prev, galleryImages: [...prev.galleryImages, result] };
          } else {
            return { ...prev, image: result };
          }
        });
      };
      reader.readAsDataURL(file as Blob);
    });
  };

  const removeGalleryImage = (index: number) => {
    if (!editingRoom) return;
    const newGallery = editingRoom.galleryImages.filter((_, i) => i !== index);
    setEditingRoom({ ...editingRoom, galleryImages: newGallery });
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
                  placeholder="Email"
                  className="w-full pl-12 pr-5 py-3.5 bg-slate-50 dark:bg-zinc-800 border-none rounded-2xl focus:ring-2 focus:ring-primary text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
      {/* Sidebar */}
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
                  setEditingRoom(null);
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
            <Link to="/" className="flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-bold text-slate-500 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-all">
              <span className="material-symbols-outlined text-xl">visibility</span>
              View Website
            </Link>
            <button onClick={() => { 
				localStorage.removeItem(LS_TOKEN_KEY); 
				setToken(''); 
				setIsLoggedIn(false);
			}} className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all">
              <span className="material-symbols-outlined text-xl">logout</span>
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-grow lg:ml-72 min-h-screen relative">
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-slate-100 dark:border-zinc-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-slate-500">
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
            <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white capitalize">
              {editingRoom ? (rooms.some(r => r.id === editingRoom.id) ? 'Editing Room' : 'Add New Room') : activeSection}
            </h2>
          </div>
        </header>

        <div className="p-6 md:p-10 max-w-7xl mx-auto">
          {activeSection === 'dashboard' && (
            <div className="animate-in fade-in duration-500 space-y-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Total Booking Requests', value: reservations.length, icon: 'receipt_long', color: 'text-blue-500', bg: 'bg-blue-500/10' },
                  { label: 'Pending Approvals', value: reservations.filter(r => r.status === 'pending').length, icon: 'hourglass_empty', color: 'text-amber-500', bg: 'bg-amber-500/10' },
                  { label: 'Upcoming Stays', value: reservations.filter(r => r.status === 'accepted').length, icon: 'check_circle', color: 'text-green-500', bg: 'bg-green-500/10' },
                  { label: 'Total Rooms', value: rooms.length, icon: 'hotel', color: 'text-primary', bg: 'bg-primary/10' },
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
            </div>
          )}

          {activeSection === 'reservations' && (
            <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-6">
              {reservations.length > 0 ? (
                reservations.map((res) => (
                  <div key={res.id} className="bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-[2rem] border border-slate-100 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row items-center gap-8 group hover:shadow-md transition-all">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8 flex-grow w-full">
                      <div>
                        <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Guest</p>
                        <p className="font-bold text-slate-900 dark:text-white">{res.guestName || 'Unknown'}</p>
                        <div className="text-[10px] text-slate-500 mt-1 space-y-0.5">
                          <p className="flex items-center gap-1"><span className="material-icons-outlined text-[10px]">email</span> {res.guestEmail}</p>
                          <p className="flex items-center gap-1"><span className="material-icons-outlined text-[10px]">phone</span> {res.guestPhone}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Room</p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{res.roomName}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Stay Duration</p>
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{res.checkIn} — {res.checkOut}</p>
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
                          <button onClick={() => updateStatus(res.id, "accepted")} className="flex-1 md:flex-none bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm">Accept</button>
                          <button onClick={() => updateStatus(res.id, "rejected")} className="flex-1 md:flex-none bg-red-50 text-red-500 px-6 py-2.5 rounded-xl font-bold text-sm">Reject</button>
                        </>
                      ) : (
                        <button onClick={() => updateStatus(res.id, "pending")} className="w-full text-slate-400 font-bold text-sm">Reset</button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-32 bg-white dark:bg-zinc-900 rounded-[3rem] border-2 border-dashed border-slate-100 dark:border-zinc-800">
                  <h3 className="text-xl font-bold text-slate-400">Empty Queue</h3>
                </div>
              )}
            </div>
          )}

          {activeSection === 'rooms' && !editingRoom && (
            <div className="animate-in slide-in-from-right-4 duration-500 space-y-8">
              <div className="flex justify-between items-center">
                <p className="text-slate-500 font-medium">Manage your {rooms.length} active room listings.</p>
                <button 
                  onClick={handleAddRoomClick}
                  className="bg-secondary text-white px-6 py-3 rounded-xl font-bold text-sm shadow-xl shadow-secondary/20 hover:scale-105 transition-transform"
                >
                  Add Room
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {rooms.map((room) => (
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
                           <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Services</p>
                           <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{room.features.length} Items</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                         <button onClick={() => setEditingRoom(room)} className="flex-1 py-3 border-2 border-slate-100 dark:border-zinc-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-zinc-800 transition-all">Edit Details</button>
                         <button onClick={() => handleDeleteRoom(room.id)} className="px-4 border-2 border-red-50 text-red-500 rounded-xl hover:bg-red-50">
                            <span className="material-symbols-outlined text-lg">delete</span>
                         </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'rooms' && editingRoom && (
            <div className="animate-in fade-in zoom-in-95 duration-500">
              <button onClick={() => setEditingRoom(null)} className="mb-6 flex items-center gap-2 text-slate-500 font-bold hover:text-primary transition-colors">
                <span className="material-symbols-outlined">arrow_back</span> Back to List
              </button>
              
              <form onSubmit={handleSaveRoom} className="grid lg:grid-cols-2 gap-10">
                {/* General Information */}
                <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-zinc-800 shadow-sm space-y-6">
                  <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white border-b border-slate-50 dark:border-zinc-800 pb-4">General Information</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Room Name (EN)</label>
                      <input 
                        type="text" 
                        value={editingRoom.name}
                        onChange={e => setEditingRoom({...editingRoom, name: e.target.value})}
                        className="w-full px-5 py-3 bg-slate-50 dark:bg-zinc-800 border-none rounded-xl text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Nombre (ES)</label>
                      <input 
                        type="text" 
                        value={editingRoom.name_es || ''}
                        onChange={e => setEditingRoom({...editingRoom, name_es: e.target.value})}
                        className="w-full px-5 py-3 bg-slate-50 dark:bg-zinc-800 border-none rounded-xl text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Price ($/night)</label>
                      <input 
                        type="number" 
                        value={editingRoom.price}
                        onChange={e => setEditingRoom({...editingRoom, price: parseInt(e.target.value)})}
                        className="w-full px-5 py-3 bg-slate-50 dark:bg-zinc-800 border-none rounded-xl text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Max Capacity</label>
                      <input 
                        type="number" 
                        value={editingRoom.capacity}
                        onChange={e => setEditingRoom({...editingRoom, capacity: parseInt(e.target.value)})}
                        className="w-full px-5 py-3 bg-slate-50 dark:bg-zinc-800 border-none rounded-xl text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Description (EN)</label>
                    <textarea 
                      value={editingRoom.longDescription}
                      onChange={e => setEditingRoom({...editingRoom, longDescription: e.target.value})}
                      rows={4}
                      className="w-full px-5 py-3 bg-slate-50 dark:bg-zinc-800 border-none rounded-xl text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Descripción (ES)</label>
                    <textarea 
                      value={editingRoom.longDescription_es || ''}
                      onChange={e => setEditingRoom({...editingRoom, longDescription_es: e.target.value})}
                      rows={4}
                      className="w-full px-5 py-3 bg-slate-50 dark:bg-zinc-800 border-none rounded-xl text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Cover Image</label>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={editingRoom.image}
                          onChange={e => setEditingRoom({...editingRoom, image: e.target.value})}
                          placeholder="Image URL"
                          className="flex-grow px-5 py-3 bg-slate-50 dark:bg-zinc-800 border-none rounded-xl text-sm"
                        />
                         <label className="cursor-pointer bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-300 px-4 py-3 rounded-xl hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors">
                          <span className="material-symbols-outlined text-xl">upload_file</span>
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, false)} 
                            className="hidden" 
                          />
                        </label>
                      </div>
                      {editingRoom.image && (
                         <div className="h-32 w-full rounded-xl overflow-hidden bg-slate-50">
                            <img src={editingRoom.image} alt="Cover Preview" className="w-full h-full object-cover" />
                         </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Gallery Section */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                       <label className="block text-xs font-bold uppercase text-slate-400">Gallery Images</label>
                       <label className="cursor-pointer text-xs font-bold text-primary flex items-center gap-1 hover:underline">
                          <span className="material-symbols-outlined text-sm">add_photo_alternate</span> Add Images
                          <input 
                            type="file" 
                            accept="image/*"
                            multiple
                            onChange={(e) => handleImageUpload(e, true)} 
                            className="hidden" 
                          />
                       </label>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {editingRoom.galleryImages.map((img, idx) => (
                        <div key={idx} className="relative aspect-square rounded-lg overflow-hidden group">
                           <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                           <button 
                              type="button"
                              onClick={() => removeGalleryImage(idx)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                           >
                             <span className="material-symbols-outlined text-xs">close</span>
                           </button>
                        </div>
                      ))}
                      {editingRoom.galleryImages.length === 0 && (
                        <div className="col-span-3 py-6 text-center border-2 border-dashed border-slate-100 dark:border-zinc-800 rounded-xl text-slate-400 text-xs">
                          No images in gallery
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Services & Features */}
                <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-zinc-800 shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-50 dark:border-zinc-800 pb-4">
                    <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white">Services & Features</h3>
                    <button type="button" onClick={addFeature} className="text-primary font-bold text-xs flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">add</span> Add New
                    </button>
                  </div>
                  
                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 no-scrollbar">
                    {editingRoom.features.map((feature, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-2xl relative group/feature">
                        <button type="button" onClick={() => removeFeature(idx)} className="absolute top-2 right-2 text-red-400 opacity-0 group-hover/feature:opacity-100 transition-opacity">
                          <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                        <div className="grid grid-cols-12 gap-3 items-center">
                          <div className="col-span-2">
                             <label className="block text-[8px] font-bold text-slate-400 mb-1">Icon</label>
                             <input 
                               type="text" 
                               value={feature.icon}
                               onChange={e => updateEditingRoomFeature(idx, 'icon', e.target.value)}
                               className="w-full p-2 bg-white dark:bg-zinc-700 border-none rounded-lg text-[10px]"
                               placeholder="e.icon"
                             />
                          </div>
                          <div className="col-span-5">
                             <label className="block text-[8px] font-bold text-slate-400 mb-1">Name (EN)</label>
                             <input 
                               type="text" 
                               value={feature.name}
                               onChange={e => updateEditingRoomFeature(idx, 'name', e.target.value)}
                               className="w-full p-2 bg-white dark:bg-zinc-700 border-none rounded-lg text-[10px]"
                             />
                          </div>
                          <div className="col-span-5">
                             <label className="block text-[8px] font-bold text-slate-400 mb-1">Nombre (ES)</label>
                             <input 
                               type="text" 
                               value={feature.name_es || ''}
                               onChange={e => updateEditingRoomFeature(idx, 'name_es', e.target.value)}
                               className="w-full p-2 bg-white dark:bg-zinc-700 border-none rounded-lg text-[10px]"
                             />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-slate-50 dark:border-zinc-800 flex gap-4">
                    <button type="submit" className="flex-1 bg-primary text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/20">
                      {rooms.some(r => r.id === editingRoom.id) ? 'Save Changes' : 'Create Room'}
                    </button>
                    <button type="button" onClick={() => setEditingRoom(null)} className="flex-1 border-2 border-slate-100 dark:border-zinc-800 text-slate-400 py-4 rounded-xl font-bold">Discard</button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {activeSection === 'settings' && (
            <div className="animate-in slide-in-from-left-4 duration-500 max-w-2xl space-y-10">
              <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-zinc-800 shadow-sm space-y-8">
                <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white border-b border-slate-50 dark:border-zinc-800 pb-4">Hostel Profile</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Hostel Name</label>
                    <input type="text" defaultValue="Hostal Elizabeta" className="w-full px-5 py-3.5 bg-slate-50 dark:bg-zinc-800 border-none rounded-2xl text-sm" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {isSidebarOpen && (
        <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"></div>
      )}
    </div>
  );
};

export default Admin;
