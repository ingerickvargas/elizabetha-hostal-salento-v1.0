
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROOMS as DEFAULT_ROOMS } from '../constants';
import { Room } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { api } from '../src/lib/api';

const Rooms: React.FC = () => {
  const { t, language } = useLanguage();
  const [rooms, setRooms] = useState<Room[]>(DEFAULT_ROOMS);

  useEffect(() => {
  const load = async () => {
    // 1) Si hay cache, lo mostramos de inmediato (mejor UX)
    const cached = localStorage.getItem('elizabetha_rooms');
    if (cached) {
      try {
        setRooms(JSON.parse(cached));
      } catch {}
    }

    // 2) Traer desde API
    try {
      const data = await api.getRooms();
      setRooms(data as any);
      localStorage.setItem('elizabetha_rooms', JSON.stringify(data));
    } catch (e) {
      console.warn('API not available, using cache/constants', e);
      // fallback final
      if (!cached) setRooms(DEFAULT_ROOMS);
    }
  };

  load();
}, []);

  return (
    <div className="pt-32 pb-24 animate-in slide-in-from-bottom-8 duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-slate-900 dark:text-white">{t('rooms.title')}</h1>
          <div className="w-24 h-1.5 bg-primary mx-auto mb-8 rounded-full"></div>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            {t('rooms.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {rooms.map((room) => (
            <div 
              key={room.id} 
              className="group bg-white dark:bg-zinc-800/50 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-zinc-800 flex flex-col"
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img 
                  alt={room.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  src={room.image}
                />
                <div className="absolute top-5 right-5 bg-white/95 dark:bg-zinc-900/95 px-4 py-1.5 rounded-full text-sm font-bold text-secondary shadow-lg">
                  {language === 'es' ? room.tag_es : room.tag}
                </div>
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-2xl font-display font-bold mb-3 text-slate-900 dark:text-white">
                    {language === 'es' ? room.name_es || room.name : room.name}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                    {language === 'es' ? room.description_es || room.description : room.description}
                </p>
                
                {/* Specific Room Features */}
                <div className="mb-8 p-4 bg-slate-50 dark:bg-zinc-900/40 rounded-2xl border border-slate-100 dark:border-zinc-800">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">{t('rooms.highlights')}</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {room.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary text-lg">{feature.icon}</span>
                        <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                            {language === 'es' ? feature.name_es || feature.name : feature.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-slate-400 mb-8 border-t border-slate-50 dark:border-zinc-800 pt-6">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-xl">group</span>
                    <span className="text-xs font-medium">{language === 'es' ? room.capacity : room.capacity}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-xl">shower</span>
                    <span className="text-xs font-medium">{language === 'es' ? room.bathroom_es : room.bathroom}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-xl">wifi</span>
                    <span className="text-xs font-medium">{language === 'es' ? room.amenity_es : room.amenity}</span>
                  </div>
                </div>
                
                <Link 
                  to={`/rooms/${room.id}`} 
                  className="w-full mt-auto inline-block text-center py-4 border-2 border-primary text-primary font-bold rounded-2xl hover:bg-primary hover:text-white transition-all shadow-sm hover:shadow-primary/20"
                >
                  {t('home.results.details')}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Amenities Grid */}
        <div className="mt-40 bg-slate-50 dark:bg-zinc-900/50 rounded-[3rem] p-12 md:p-20 text-center border border-slate-100 dark:border-zinc-800">
           <h2 className="font-display text-4xl text-secondary dark:text-primary mb-4">{t('rooms.amenities.title')}</h2>
           <p className="text-slate-600 dark:text-slate-400 mb-16">{t('rooms.amenities.subtitle')}</p>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
             {[
               { icon: 'restaurant', name: t('rooms.amenities.kitchen') },
               { icon: 'local_laundry_service', name: t('rooms.amenities.laundry') },
               { icon: 'map', name: t('rooms.amenities.tours') },
               { icon: 'coffee_maker', name: t('rooms.amenities.coffee') }
             ].map((item) => (
               <div key={item.name} className="flex flex-col items-center group">
                 <div className="w-20 h-20 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-slate-200 dark:shadow-none border border-slate-50 dark:border-zinc-700 group-hover:scale-110 transition-transform">
                   <span className="material-symbols-outlined text-primary text-4xl">{item.icon}</span>
                 </div>
                 <h4 className="font-bold text-slate-700 dark:text-slate-200">{item.name}</h4>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
