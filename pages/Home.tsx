
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ROOMS } from '../constants';
import { Room } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const Home: React.FC = () => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  
  const { t, language } = useLanguage();
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleCheckAvailability = () => {
    // Simple logic: filter rooms by capacity
    const filtered = ROOMS.filter(room => room.capacity >= parseInt(guests));
    setAvailableRooms(filtered);
    setHasSearched(true);
    
    // Smooth scroll to results
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover scale-105"
            poster="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=2000"
          >
            <source src="https://videos.pexels.com/video-files/2454661/2454661-hd_1920_1080_30fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 hero-gradient bg-black/40"></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <h2 className="text-white font-handwritten text-4xl md:text-6xl mb-4 drop-shadow-md">{t('home.hero.welcome')}</h2>
          <h1 className="text-white font-display text-5xl md:text-8xl font-bold mb-6 tracking-tight drop-shadow-lg">{t('home.hero.title')}</h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light drop-shadow">
            {t('home.hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              className="bg-primary text-white px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl shadow-primary/30" 
              to="/rooms"
            >
              {t('home.hero.explore')}
            </Link>
            <Link 
              className="bg-white/10 backdrop-blur-md text-white border border-white/40 px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all" 
              to="/gallery"
            >
              {t('home.hero.story')}
            </Link>
          </div>
        </div>

        {/* Floating Search Bar */}
        <div className="absolute bottom-0 left-0 w-full px-4 pb-12 translate-y-6 md:translate-y-12">
          <div className="max-w-6xl mx-auto bg-white dark:bg-zinc-900 shadow-2xl rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-end md:items-center gap-6 border border-slate-100 dark:border-zinc-800">
            <div className="flex-1 w-full">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">{t('home.search.checkin')}</label>
              <div className="relative">
                <span className="material-icons-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">calendar_today</span>
                <input 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-primary" 
                  type="date" 
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1 w-full">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">{t('home.search.checkout')}</label>
              <div className="relative">
                <span className="material-icons-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">calendar_today</span>
                <input 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-primary" 
                  type="date" 
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1 w-full">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">{t('home.search.guests')}</label>
              <div className="relative">
                <span className="material-icons-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">person</span>
                <select 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-primary appearance-none"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                >
                  <option value="1">{t('home.search.guest1')}</option>
                  <option value="2">{t('home.search.guest2')}</option>
                  <option value="3">{t('home.search.guest3')}</option>
                </select>
              </div>
            </div>
            <button 
              onClick={handleCheckAvailability}
              className="w-full md:w-auto bg-secondary text-white px-10 py-4 rounded-xl font-bold hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
            >
              {t('home.search.check')}
              <span className="material-icons-outlined">search</span>
            </button>
          </div>
        </div>
      </header>

      {/* Availability Results Section */}
      <div ref={resultsRef} className={`transition-all duration-700 ${hasSearched ? 'opacity-100 py-40' : 'opacity-0 h-0 overflow-hidden'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-bold uppercase tracking-widest text-sm inline-block mb-4">{t('home.results.title')}</span>
            <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white">{t('home.results.available')}</h2>
            <p className="text-slate-500 mt-4">{t('home.results.found').replace('{count}', availableRooms.length.toString())}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {availableRooms.map(room => (
              <div key={room.id} className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-xl border border-slate-100 dark:border-zinc-800 flex flex-col animate-in slide-in-from-bottom-4 duration-500">
                <div className="relative h-64">
                  <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold">
                    ${room.price}{t('details.book.night')}
                  </div>
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <h3 className="text-2xl font-display font-bold mb-3 text-slate-900 dark:text-white">
                    {language === 'es' ? room.name_es || room.name : room.name}
                  </h3>
                  <p className="text-sm text-slate-500 mb-6 flex-grow">
                     {language === 'es' ? room.description_es || room.description : room.description}
                  </p>
                  
                  <div className="flex gap-4 mb-6">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <span className="material-symbols-outlined text-sm">group</span>
                      <span className="text-xs font-bold">{t('home.results.max').replace('{count}', room.capacity.toString())}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <span className="material-symbols-outlined text-sm">wifi</span>
                      <span className="text-xs font-bold">{t('home.results.wifi')}</span>
                    </div>
                  </div>

                  <Link 
                    to={`/rooms/${room.id}`}
                    className="w-full bg-primary text-white py-3 rounded-xl font-bold text-center hover:bg-opacity-90 transition-all"
                  >
                    {t('home.results.details')}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {availableRooms.length === 0 && (
            <div className="text-center py-20 bg-slate-50 dark:bg-zinc-900 rounded-[2rem] border border-dashed border-slate-200 dark:border-zinc-800">
              <span className="material-icons-outlined text-6xl text-slate-300 mb-4">sentiment_dissatisfied</span>
              <h3 className="text-xl font-bold text-slate-600 dark:text-slate-400">No rooms match your criteria</h3>
              <p className="text-slate-500 mt-2">Try adjusting the number of guests or check different dates.</p>
            </div>
          )}
        </div>
      </div>

      {/* Heritage Section */}
      <section className="py-40 bg-background-light dark:bg-background-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="relative group">
              <div className="absolute -top-12 -left-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors"></div>
              <img 
                alt="Interior of Hostal Elizabeta" 
                className="rounded-3xl shadow-2xl relative z-10 w-full aspect-[4/5] object-cover hover:scale-[1.02] transition-transform duration-500" 
                src="https://images.unsplash.com/photo-1582719478250-c89cae4df85b?auto=format&fit=crop&q=80&w=1000"
              />
              <div className="absolute -bottom-10 -right-10 bg-secondary p-8 rounded-2xl shadow-2xl hidden lg:block z-20 max-w-[240px]">
                <p className="text-white font-display italic text-lg leading-relaxed">"Warmth in every cup, home in every room."</p>
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <span className="text-primary font-bold uppercase tracking-widest text-sm inline-block mb-4">{t('home.heritage.badge')}</span>
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-slate-900 dark:text-white leading-tight">{t('home.heritage.title')}</h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t('home.heritage.desc')}
                </p>
              </div>
              
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="material-icons-outlined text-primary">local_cafe</span>
                  </div>
                  <span className="font-medium">{t('home.heritage.coffee')}</span>
                </li>
                <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="material-icons-outlined text-primary">landscape</span>
                  </div>
                  <span className="font-medium">{t('home.heritage.tours')}</span>
                </li>
                <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="material-icons-outlined text-primary">wifi</span>
                  </div>
                  <span className="font-medium">High-speed WiFi</span>
                </li>
                <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="material-icons-outlined text-primary">restaurant</span>
                  </div>
                  <span className="font-medium">{t('home.heritage.breakfast')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img alt="Coffee farm background" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=2000" />
          <div className="absolute inset-0 bg-secondary/80 mix-blend-multiply"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-8">{t('home.cta.title')}</h2>
          <p className="text-white/80 text-lg mb-12 max-w-2xl mx-auto">{t('home.cta.desc')}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/join" className="bg-primary text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-opacity-90 shadow-2xl shadow-primary/40 transition-all">{t('home.cta.book')}</Link>
            <Link to="/location" className="bg-transparent border-2 border-white text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-secondary transition-all">{t('home.cta.contact')}</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
