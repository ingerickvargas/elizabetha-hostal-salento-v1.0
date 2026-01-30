
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROOMS } from '../constants';
import { Reservation } from '../types';

const Join: React.FC = () => {
  const [isBooked, setIsBooked] = useState(false);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: '2',
    roomType: ROOMS[0].id
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedRoom = ROOMS.find(r => r.id === bookingData.roomType);
    
    // Create reservation object
    const newReservation: Reservation = {
      id: Math.random().toString(36).substr(2, 9),
      roomId: bookingData.roomType,
      roomName: selectedRoom?.name || 'Unknown Room',
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      guests: parseInt(bookingData.guests),
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('elizabeta_reservations') || '[]');
    localStorage.setItem('elizabeta_reservations', JSON.stringify([newReservation, ...existing]));

    setIsBooked(true);
  };

  const selectedRoom = ROOMS.find(r => r.id === bookingData.roomType);

  return (
    <div className="flex min-h-screen animate-in slide-in-from-right duration-700 bg-white dark:bg-zinc-950 overflow-hidden">
      {/* Left Column: Visual */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img 
          alt="Salento Coffee Farm" 
          className="absolute inset-0 w-full h-full object-cover" 
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1200" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
        <div className="absolute bottom-20 left-20 right-20 text-white space-y-4">
          <p className="font-handwritten text-5xl mb-6">Escape to Quindío</p>
          <h2 className="font-display text-6xl font-bold leading-tight drop-shadow-lg">Begin your journey in the heart of coffee country.</h2>
        </div>
        <Link 
          to="/"
          className="absolute top-10 left-10 flex items-center gap-2 text-white bg-black/20 backdrop-blur-xl px-6 py-3 rounded-full hover:bg-black/40 transition-all font-semibold"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Right Column: Form Container */}
      <div className="w-full lg:w-1/2 flex flex-col items-center p-8 sm:p-20 overflow-y-auto no-scrollbar">
        <div className="max-w-md w-full py-12 flex flex-col justify-center min-h-full">
          
          {/* Booking Section */}
          <section className="bg-slate-50 dark:bg-zinc-900/50 p-8 rounded-[2rem] border border-slate-100 dark:border-zinc-800 shadow-xl relative overflow-hidden">
            {!isBooked ? (
              <div className="animate-in fade-in duration-500">
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-primary">event_available</span>
                    <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Quick Booking</h2>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Secure your room in Salento today.</p>
                </div>

                <form className="space-y-4" onSubmit={handleBookingSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Check In</label>
                      <input 
                        type="date" 
                        required
                        className="w-full px-4 py-3 bg-white dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-primary text-sm"
                        value={bookingData.checkIn}
                        onChange={(e) => setBookingData({...bookingData, checkIn: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Check Out</label>
                      <input 
                        type="date" 
                        required
                        className="w-full px-4 py-3 bg-white dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-primary text-sm"
                        value={bookingData.checkOut}
                        onChange={(e) => setBookingData({...bookingData, checkOut: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Room Type</label>
                    <select 
                      className="w-full px-4 py-3 bg-white dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-primary text-sm appearance-none"
                      value={bookingData.roomType}
                      onChange={(e) => setBookingData({...bookingData, roomType: e.target.value})}
                    >
                      {ROOMS.map(room => (
                        <option key={room.id} value={room.id}>{room.name} - ${room.price}/night</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Guests</label>
                    <select 
                      className="w-full px-4 py-3 bg-white dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-primary text-sm appearance-none"
                      value={bookingData.guests}
                      onChange={(e) => setBookingData({...bookingData, guests: e.target.value})}
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                    </select>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-secondary text-white py-4 rounded-xl font-bold text-base hover:bg-opacity-90 shadow-lg shadow-secondary/20 transition-all active:scale-[0.98]"
                  >
                    Book Now
                  </button>
                </form>
              </div>
            ) : (
              <div className="animate-in zoom-in-95 duration-500 text-center py-4">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="material-symbols-outlined text-primary text-5xl">check_circle</span>
                </div>
                <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white mb-4">Stay Confirmed!</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-8 px-4">We've reserved your space at Hostal Elizabeta. A confirmation email is on its way.</p>
                
                <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 text-left space-y-4 border border-slate-100 dark:border-zinc-700 mb-8">
                  <div className="flex justify-between items-center border-b border-slate-50 dark:border-zinc-700 pb-3">
                    <span className="text-xs font-bold uppercase text-slate-400">Room</span>
                    <span className="font-bold text-slate-800 dark:text-slate-100">{selectedRoom?.name}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-50 dark:border-zinc-700 pb-3">
                    <span className="text-xs font-bold uppercase text-slate-400">Check-in</span>
                    <span className="font-bold text-slate-800 dark:text-slate-100">{bookingData.checkIn}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-50 dark:border-zinc-700 pb-3">
                    <span className="text-xs font-bold uppercase text-slate-400">Check-out</span>
                    <span className="font-bold text-slate-800 dark:text-slate-100">{bookingData.checkOut}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold uppercase text-slate-400">Guests</span>
                    <span className="font-bold text-slate-800 dark:text-slate-100">{bookingData.guests} People</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Link 
                    to="/" 
                    className="block w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-opacity-90 transition-all shadow-lg shadow-primary/20"
                  >
                    Go to Homepage
                  </Link>
                  <button 
                    onClick={() => setIsBooked(false)}
                    className="text-primary font-bold text-sm hover:underline"
                  >
                    Book another stay
                  </button>
                </div>
              </div>
            )}
          </section>

          <div className="mt-8 text-center">
            <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">Hostal Elizabeta &copy; 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Join;
