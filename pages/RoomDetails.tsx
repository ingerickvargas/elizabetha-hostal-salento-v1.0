
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ROOMS as DEFAULT_ROOMS } from '../constants';
import { Room, Reservation } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { sendConfirmationEmail } from '../utils/mockEmailService';
import { isDateRangeAvailable, getBookedRanges } from '../utils/availability';

const RoomDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  
  const [room, setRoom] = useState<Room | undefined>(undefined);
  const [activeImg, setActiveImg] = useState(0);
  const [isBooked, setIsBooked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookedDates, setBookedDates] = useState<{start: string, end: string}[]>([]);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: '2',
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    const stored = localStorage.getItem('elizabeta_rooms');
    const roomsSource = stored ? JSON.parse(stored) : DEFAULT_ROOMS;
    const foundRoom = (roomsSource as Room[]).find(r => r.id === id);
    setRoom(foundRoom);

    if (foundRoom) {
        const reservations = JSON.parse(localStorage.getItem('elizabeta_reservations') || '[]');
        setBookedDates(getBookedRanges(foundRoom.id, reservations));
    }
  }, [id]);

  if (!room) {
    return (
      <div className="pt-40 pb-24 text-center">
        <h2 className="text-3xl font-display font-bold">Room Not Found</h2>
        <Link to="/rooms" className="text-primary hover:underline mt-4 inline-block">Back to Rooms</Link>
      </div>
    );
  }

  const roomName = language === 'es' ? room.name_es || room.name : room.name;
  const roomDesc = language === 'es' ? room.longDescription_es || room.longDescription : room.longDescription;
  const roomSize = language === 'es' ? room.size_es : room.size;
  const roomBathroom = language === 'es' ? room.bathroom_es : room.bathroom;
  const roomAmenity = language === 'es' ? room.amenity_es : room.amenity;

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingData.checkIn || !bookingData.checkOut) {
       alert(language === 'es' ? 'Por favor seleccione las fechas.' : 'Please select check-in and check-out dates.');
       return;
    }

    if (bookingData.checkOut <= bookingData.checkIn) {
      alert(language === 'es' ? 'La fecha de salida debe ser posterior a la de llegada.' : 'Check-out date must be after check-in date.');
      return;
    }

    const reservations = JSON.parse(localStorage.getItem('elizabeta_reservations') || '[]');
    const isAvailable = isDateRangeAvailable(room.id, bookingData.checkIn, bookingData.checkOut, reservations);

    if (!isAvailable) {
        alert(language === 'es' 
            ? 'Las fechas seleccionadas no están disponibles para esta habitación. Por favor revise el calendario de fechas reservadas.' 
            : 'The selected dates are not available for this room. Please check the booked dates list.');
        return;
    }

    setBookingStep(2);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newReservation: Reservation = {
      id: Math.random().toString(36).substr(2, 9),
      roomId: room.id,
      roomName: roomName,
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      guests: parseInt(bookingData.guests),
      guestName: bookingData.name,
      guestEmail: bookingData.email,
      guestPhone: bookingData.phone,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    const existing = JSON.parse(localStorage.getItem('elizabeta_reservations') || '[]');
    localStorage.setItem('elizabeta_reservations', JSON.stringify([newReservation, ...existing]));

    try {
      await sendConfirmationEmail(newReservation);
    } catch (error) {
      console.error("Failed to send email", error);
    }

    setIsSubmitting(false);
    setIsBooked(true);
  };

  return (
    <div className="pt-24 pb-24 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8 pt-8">
          <Link to="/rooms" className="hover:text-primary transition-colors">{t('details.back')}</Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-slate-900 dark:text-white font-bold">{roomName}</span>
        </nav>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Gallery Section */}
          <div className="lg:col-span-7 space-y-6">
            <div className="aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border border-slate-100 dark:border-zinc-800">
              <img 
                src={room.galleryImages[activeImg]} 
                alt={roomName} 
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
                  <img src={img} alt={`${roomName} thumb ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <div className="pt-12">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-6">{roomName}</h1>
              <div className="flex flex-wrap gap-4 mb-8">
                <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">square_foot</span> {roomSize}
                </span>
                <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">shower</span> {roomBathroom}
                </span>
                <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">wifi</span> {roomAmenity}
                </span>
              </div>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                {roomDesc}
              </p>

              <h3 className="font-display text-2xl font-bold mb-6 text-slate-900 dark:text-white">{t('details.included')}</h3>
              <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-12">
                {room.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">{feature.icon}</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                        {language === 'es' ? feature.name_es || feature.name : feature.name}
                    </span>
                  </div>
                ))}
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">local_cafe</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">{t('details.breakfast')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">dry_cleaning</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">{t('details.linens')}</span>
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
                        <span className="text-slate-500 text-sm ml-1">{t('details.book.night')}</span>
                      </div>
                      <div className="flex items-center gap-1 text-primary">
                        <span className="material-symbols-outlined fill-1">star</span>
                        <span className="font-bold">4.9</span>
                        <span className="text-xs text-slate-400 font-medium">{t('details.book.reviews')}</span>
                      </div>
                    </div>

                    {bookingStep === 1 ? (
                      <form onSubmit={handleNextStep} className="space-y-6 animate-in fade-in duration-300">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">{t('home.search.checkin')}</label>
                            <input 
                              type="date" 
                              required
                              className="w-full px-4 py-3 bg-slate-50 dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-primary text-sm"
                              min={new Date().toISOString().split('T')[0]}
                              value={bookingData.checkIn}
                              onChange={(e) => setBookingData({...bookingData, checkIn: e.target.value})}
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">{t('home.search.checkout')}</label>
                            <input 
                              type="date" 
                              required
                              className="w-full px-4 py-3 bg-slate-50 dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-primary text-sm"
                              min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
                              value={bookingData.checkOut}
                              onChange={(e) => setBookingData({...bookingData, checkOut: e.target.value})}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">{t('home.search.guests')}</label>
                          <select 
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-primary text-sm appearance-none"
                            value={bookingData.guests}
                            onChange={(e) => setBookingData({...bookingData, guests: e.target.value})}
                          >
                            <option value="1">{t('home.search.guest1')}</option>
                            <option value="2">{t('home.search.guest2')}</option>
                            <option value="3">{t('home.search.guest3')}</option>
                            <option value="4">4 Guests</option>
                          </select>
                        </div>

                        {bookedDates.length > 0 && (
                          <div className="bg-slate-50 dark:bg-zinc-800/50 p-4 rounded-xl border border-slate-100 dark:border-zinc-700">
                            <span className="text-[10px] font-bold uppercase text-red-400 mb-2 block">Unavailable Dates</span>
                            <div className="flex flex-wrap gap-2">
                                {bookedDates.map((range, idx) => (
                                    <span key={idx} className="text-xs bg-white dark:bg-zinc-800 px-2 py-1 rounded-md text-slate-500 shadow-sm border border-slate-100 dark:border-zinc-700">
                                        {new Date(range.start).toLocaleDateString(undefined, {month:'short', day:'numeric'})} - {new Date(range.end).toLocaleDateString(undefined, {month:'short', day:'numeric'})}
                                    </span>
                                ))}
                            </div>
                          </div>
                        )}

                        <button 
                          type="submit" 
                          className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg hover:bg-opacity-90 shadow-xl shadow-primary/20 transition-all active:scale-[0.98]"
                        >
                          {t('details.book.title')}
                        </button>
                      </form>
                    ) : (
                      <form onSubmit={handleBookingSubmit} className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                        <button 
                          type="button" 
                          onClick={() => setBookingStep(1)}
                          disabled={isSubmitting}
                          className="text-xs font-bold text-primary flex items-center gap-1 hover:underline mb-4 disabled:opacity-50"
                        >
                          <span className="material-symbols-outlined text-sm">arrow_back</span>
                          Back to Dates
                        </button>
                        
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">{t('join.fullname')}</label>
                          <input 
                            type="text" 
                            required
                            placeholder="e.g. Juan Perez"
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-primary text-sm"
                            value={bookingData.name}
                            onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                            disabled={isSubmitting}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">{t('join.email')}</label>
                          <input 
                            type="email" 
                            required
                            placeholder="juan@example.com"
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-primary text-sm"
                            value={bookingData.email}
                            onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                            disabled={isSubmitting}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">{t('join.phone')}</label>
                          <input 
                            type="tel" 
                            required
                            placeholder="+57 312..."
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-primary text-sm"
                            value={bookingData.phone}
                            onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                            disabled={isSubmitting}
                          />
                        </div>

                        <button 
                          type="submit" 
                          disabled={isSubmitting}
                          className={`w-full bg-secondary text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-secondary/20 transition-all ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-opacity-90 active:scale-[0.98]'}`}
                        >
                          {isSubmitting ? 'Processing...' : t('join.button.confirm')}
                        </button>
                      </form>
                    )}

                    <div className="pt-4 space-y-3">
                      <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                        <span>{t('details.book.fee')}</span>
                        <span>$0.00</span>
                      </div>
                      <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 font-bold border-t border-slate-100 dark:border-zinc-800 pt-3">
                        <span className="text-slate-900 dark:text-white">{t('details.book.total')}</span>
                        <span className="text-slate-900 dark:text-white">${room.price}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4 animate-in zoom-in-95 duration-500">
                    <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="material-symbols-outlined text-primary text-5xl">check_circle</span>
                    </div>
                    <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white mb-4">{t('details.success.title')}</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-8 px-4">{t('details.success.desc').replace('{room}', roomName)}</p>
                    
                    <div className="bg-slate-50 dark:bg-zinc-800 rounded-2xl p-6 text-left space-y-4 mb-8">
                       <div className="flex justify-between items-center text-sm">
                         <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">{t('join.room')}</span>
                         <span className="font-bold text-slate-800 dark:text-slate-200">{roomName}</span>
                       </div>
                       <div className="flex justify-between items-center text-sm">
                         <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Dates</span>
                         <span className="font-bold text-slate-800 dark:text-slate-200">{bookingData.checkIn} - {bookingData.checkOut}</span>
                       </div>
                       <div className="flex justify-between items-center text-sm">
                         <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Guest</span>
                         <span className="font-bold text-slate-800 dark:text-slate-200">{bookingData.name}</span>
                       </div>
                    </div>

                    <button 
                      onClick={() => setIsBooked(false)}
                      className="text-primary font-bold text-sm hover:underline"
                    >
                      {t('details.success.modify')}
                    </button>
                    <Link 
                      to="/rooms" 
                      className="block w-full mt-6 bg-primary text-white py-4 rounded-xl font-bold"
                    >
                      {t('details.success.back')}
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
