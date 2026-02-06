
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { api } from '../src/lib/api';
import { Room } from '../types';
import { DateRangePicker } from '../components/DateRangePicker';

const Join: React.FC = () => {
  const { t, language } = useLanguage();
  const [isBooked, setIsBooked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availabilityError, setAvailabilityError] = useState(''); 
  const [bookedRanges, setBookedRanges] = useState<any[]>([]);
  const [range, setRange] = useState<any>(undefined);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [bookingData, setBookingData] = useState({
	checkIn: '',
	checkOut: '',
	guests: '2',
	roomType: '',
	name: '',
	email: '',
	phone: ''
  });

  React.useEffect(() => {
	const loadBooked = async () => {
		if (!bookingData.roomType) return;
		const res = await fetch(`http://localhost:3001/api/booked-dates?roomId=${bookingData.roomType}`);
		setBookedRanges(await res.json());
	};
	loadBooked();
	}, [bookingData.roomType]);

	const handleBookingSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setAvailabilityError('');

		if (bookingData.checkOut <= bookingData.checkIn) {
			setAvailabilityError(
			language === 'es'
			? 'Las fechas de salida deben ser posteriores a las de llegada.'
			: 'Check-out date must be after check-in date.'
		);
			return;
		}

		setIsSubmitting(true);

		try {
			const availability = await api.checkAvailability(
			bookingData.roomType,
			bookingData.checkIn,
			bookingData.checkOut
			);

			if (!(availability as any).available) {
			setAvailabilityError(
				language === 'es'
				? 'Las fechas seleccionadas no están disponibles.'
				: 'Selected dates are not available.'
			);
			setIsSubmitting(false);
			return;
			}

			await api.createBooking({
			roomId: bookingData.roomType,
			checkIn: bookingData.checkIn,
			checkOut: bookingData.checkOut,
			guests: Number(bookingData.guests),
			guestName: bookingData.name,
			guestEmail: bookingData.email,
			guestPhone: bookingData.phone,
			});

			setIsBooked(true);

		} catch (error) {
			console.error(error);
			setAvailabilityError(language === 'es'
				? 'Error al crear la reserva.'
				: 'Error creating booking.'
			);
		} finally {
			setIsSubmitting(false);
		}
	};

  const selectedRoom = rooms.find(r => r.id === bookingData.roomType);
  const selectedRoomName = language === 'es' ? selectedRoom?.name_es || selectedRoom?.name : selectedRoom?.name;

  return (
    <div className="flex min-h-screen animate-in slide-in-from-right duration-700 bg-white dark:bg-zinc-950 overflow-hidden">
      <div className="hidden lg:block lg:w-1/2 relative">
        <img 
          alt="Salento Coffee Farm" 
          className="absolute inset-0 w-full h-full object-cover" 
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1200" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
        <div className="absolute bottom-20 left-20 right-20 text-white space-y-4">
          <p className="font-handwritten text-5xl mb-6">{t('join.hero.title')}</p>
          <h2 className="font-display text-6xl font-bold leading-tight drop-shadow-lg">{t('join.hero.subtitle')}</h2>
        </div>
        <Link 
          to="/"
          className="absolute top-10 left-10 flex items-center gap-2 text-white bg-black/20 backdrop-blur-xl px-6 py-3 rounded-full hover:bg-black/40 transition-all font-semibold"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          <span>{t('join.back')}</span>
        </Link>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col items-center p-8 sm:p-20 overflow-y-auto no-scrollbar">
        <div className="max-w-md w-full py-12 flex flex-col justify-center min-h-full">
          
          <section className="bg-slate-50 dark:bg-zinc-900/50 p-8 rounded-[2rem] border border-slate-100 dark:border-zinc-800 shadow-xl relative overflow-hidden">
            {!isBooked ? (
              <div className="animate-in fade-in duration-500">
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-primary">event_available</span>
                    <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">{t('join.title')}</h2>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{t('join.subtitle')}</p>
                </div>

                <form className="space-y-4" onSubmit={handleBookingSubmit}>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">{t('home.search.dates')}</label>
						<DateRangePicker
							value={range}
							numberOfMonths={1}
							onChange={(r) => {
								setRange(r);
								setBookingData(prev => ({
								...prev,
								checkIn: r?.from ? r.from.toISOString().slice(0,10) : "",
								checkOut: r?.to ? r.to.toISOString().slice(0,10) : "",
								}));
							}}
							bookedRanges={bookedRanges}
						/>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">{t('join.room')}</label>
                    <select 
                      className="w-full px-4 py-3 bg-white dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-primary text-sm appearance-none"
                      value={bookingData.roomType}
                      onChange={(e) => setBookingData({...bookingData, roomType: e.target.value})}
                    >
                    {rooms.map(room => (
						<option key={room.id} value={room.id}>
							{language === 'es' ? (room.name_es || room.name) : room.name}
							{' '}– ${room.price}{t('details.book.night')}
						</option>
					))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">{t('join.guests')}</label>
                    <select 
                      className="w-full px-4 py-3 bg-white dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-primary text-sm appearance-none"
                      value={bookingData.guests}
                      onChange={(e) => setBookingData({...bookingData, guests: e.target.value})}
                    >
                      <option value="1">{t('home.search.guest1')}</option>
                      <option value="2">{t('home.search.guest2')}</option>
                      <option value="3">{t('home.search.guest3')}</option>
                      <option value="4">4 {t('join.guests')}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">{t('join.fullname')}</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Juan Perez"
                      className="w-full px-4 py-3 bg-white dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-primary text-sm"
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
                      className="w-full px-4 py-3 bg-white dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-primary text-sm"
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
                      className="w-full px-4 py-3 bg-white dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-primary text-sm"
                      value={bookingData.phone}
                      onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                      disabled={isSubmitting}
                    />
                  </div>
					{availabilityError && (
						<div className="bg-red-50 text-red-600 text-xs font-bold p-3 rounded-xl">
							{availabilityError}
						</div>
					)}
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={`w-full bg-secondary text-white py-4 rounded-xl font-bold text-base shadow-lg shadow-secondary/20 transition-all ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-opacity-90 active:scale-[0.98]'}`}
                  >
                    {isSubmitting ? 'Processing...' : t('join.button.confirm')}
                  </button>
                </form>
              </div>
            ) : (
              <div className="animate-in zoom-in-95 duration-500 text-center py-4">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="material-symbols-outlined text-primary text-5xl">check_circle</span>
                </div>
                <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white mb-4">{t('join.confirmed')}</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-8 px-4">{t('join.confirmed.desc')}</p>
                
                <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 text-left space-y-4 border border-slate-100 dark:border-zinc-700 mb-8">
                  <div className="flex justify-between items-center border-b border-slate-50 dark:border-zinc-700 pb-3">
                    <span className="text-xs font-bold uppercase text-slate-400">{t('join.room')}</span>
                    <span className="font-bold text-slate-800 dark:text-slate-100">{selectedRoomName}</span>
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
                    <span className="text-xs font-bold uppercase text-slate-400">{t('join.guests')}</span>
                    <span className="font-bold text-slate-800 dark:text-slate-100">{bookingData.guests}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Link 
                    to="/" 
                    className="block w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-opacity-90 transition-all shadow-lg shadow-primary/20"
                  >
                    {t('join.home')}
                  </Link>
                  <button 
                    onClick={() => setIsBooked(false)}
                    className="text-primary font-bold text-sm hover:underline"
                  >
                    {t('join.another')}
                  </button>
                </div>
              </div>
            )}
          </section>

          <div className="mt-8 text-center">
            <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">Hostal Elizabetha &copy; 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Join;
