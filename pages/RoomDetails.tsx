
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ROOMS } from '../constants';
import { Reservation } from '../types';

const RoomDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const room = ROOMS.find(r => r.id === id);

  const [activeImg, setActiveImg] = useState(0);
  const [isBooked, setIsBooked] = useState(false);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: '2'
  });

  if (!room) {
    return (
      <div className="pt-40 pb-24 text-center">
        <h2 className="text-3xl font-display font-bold">Room Not Found</h2>
        <Link to="/rooms" className="text-primary hover:underline mt-4 inline-block">Back to Rooms</Link>
      </div>
    );
  }

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newReservation: Reservation = {
      id: Math.random().toString(36).substr(2, 9),
      roomId: room.id,
      roomName: room.name,
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      guests: parseInt(bookingData.guests),
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    const existing = JSON.parse(localStorage.getItem('elizabeta_reservations') || '[]');
    localStorage.setItem('elizabeta_reservations', JSON.stringify([newReservation, ...existing]));

    setIsBooked(true);
  };

  return (
    <div className="pt-24 pb-24 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8 pt-8">
          <Link to="/rooms" className="hover:text-primary transition-colors">Our Rooms</Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-slate-900 dark:text-white font-bold">{room.name}</span>
        </nav>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Gallery Section */}
          <div className="lg:col-span-7 space-y-6">
            <div className="aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border border-slate-100 dark:border-zinc-800">
              <img 
                src={room.galleryImages[activeImg]} 
                alt={room.name} 
                className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-500"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {room.galleryImages.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveImg(idx)}
                  className={`aspect-[16/10] rounded-2xl overflow-hidden border-2 transition-all ${
                    activeImg === idx ? 'border-primary shadow-lg shadow-primary/20' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${room.name} thumb ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <div className="pt-12">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-6">{room.name}</h1>
              <div className="flex flex-wrap gap-4 mb-8">
                <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">square_foot</span> {room.size}
                </span>
                <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">shower</span> {room.bathroom} Bathroom
                </span>
                <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">wifi</span> High Speed WiFi
                </span>
              </div>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                {room.longDescription}
              </p>

              <h3 className="font-display text-2xl font-bold mb-6 text-slate-900 dark:text-white">Included Services</h3>
              <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-12">
                {room.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">{feature.icon}</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">{feature.name}</span>
                  </div>
                ))}
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">local_cafe</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">Daily Breakfast</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">dry_cleaning</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">Linens & Towels</span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 shadow-2xl border border-slate-100 dark:border-zinc-800">
                {!isBooked ? (
                  <>
                    <div className="flex justify-between items-end mb-8">
                      <div>
                        <span className="text-3xl font-bold text-slate-900 dark:text-white">${room.price}</span>
                        <span className="text-slate-500 text-sm ml-1">/ night</span>
                      </div>
                      <div className="flex items-center gap-1 text-primary">
                        <span className="material-symbols-outlined fill-1">star</span>
                        <span className="font-bold">4.9</span>
                        <span className="text-xs text-slate-400 font-medium">(24 reviews)</span>
                      </div>
                    </div>

                    <form onSubmit={handleBookingSubmit} className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Check In</label>
                          <input 
                            type="date" 
                            required
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-primary text-sm"
                            value={bookingData.checkIn}
                            onChange={(e) => setBookingData({...bookingData, checkIn: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Check Out</label>
                          <input 
                            type="date" 
                            required
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-primary text-sm"
                            value={bookingData.checkOut}
                            onChange={(e) => setBookingData({...bookingData, checkOut: e.target.value})}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Number of Guests</label>
                        <select 
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-primary text-sm appearance-none"
                          value={bookingData.guests}
                          onChange={(e) => setBookingData({...bookingData, guests: e.target.value})}
                        >
                          <option value="1">1 Person</option>
                          <option value="2">2 People</option>
                          <option value="3">3 People</option>
                          <option value="4">4 People</option>
                        </select>
                      </div>

                      <button 
                        type="submit" 
                        className="w-full bg-secondary text-white py-5 rounded-2xl font-bold text-lg hover:bg-opacity-90 shadow-xl shadow-secondary/20 transition-all active:scale-[0.98]"
                      >
                        Book This Room
                      </button>

                      <div className="pt-4 space-y-3">
                        <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                          <span>Service fee</span>
                          <span>$0.00</span>
                        </div>
                        <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 font-bold border-t border-slate-100 dark:border-zinc-800 pt-3">
                          <span className="text-slate-900 dark:text-white">Total</span>
                          <span className="text-slate-900 dark:text-white">${room.price}</span>
                        </div>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-4 animate-in zoom-in-95 duration-500">
                    <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="material-symbols-outlined text-primary text-5xl">check_circle</span>
                    </div>
                    <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white mb-4">Reservation Sent!</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-8 px-4">Your stay at {room.name} has been requested. We'll confirm shortly.</p>
                    
                    <div className="bg-slate-50 dark:bg-zinc-800 rounded-2xl p-6 text-left space-y-4 mb-8">
                       <div className="flex justify-between items-center text-sm">
                         <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Room</span>
                         <span className="font-bold text-slate-800 dark:text-slate-200">{room.name}</span>
                       </div>
                       <div className="flex justify-between items-center text-sm">
                         <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Dates</span>
                         <span className="font-bold text-slate-800 dark:text-slate-200">{bookingData.checkIn} - {bookingData.checkOut}</span>
                       </div>
                    </div>

                    <button 
                      onClick={() => setIsBooked(false)}
                      className="text-primary font-bold text-sm hover:underline"
                    >
                      Modify Reservation
                    </button>
                    <Link 
                      to="/rooms" 
                      className="block w-full mt-6 bg-primary text-white py-4 rounded-xl font-bold"
                    >
                      Back to All Rooms
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
