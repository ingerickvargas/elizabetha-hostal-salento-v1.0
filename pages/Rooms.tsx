
import React from 'react';
import { Link } from 'react-router-dom';
import { ROOMS } from '../constants';

const Rooms: React.FC = () => {
  return (
    <div className="pt-32 pb-24 animate-in slide-in-from-bottom-8 duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-slate-900 dark:text-white">Our Rooms & Suites</h1>
          <div className="w-24 h-1.5 bg-primary mx-auto mb-8 rounded-full"></div>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Each room is thoughtfully designed with natural materials and local craftsmanship to provide ultimate comfort and connection with nature.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {ROOMS.map((room) => (
            <div 
              key={room.id} 
              className="group bg-white dark:bg-zinc-800/50 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-zinc-800"
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img 
                  alt={room.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  src={room.image}
                />
                <div className="absolute top-5 right-5 bg-white/95 dark:bg-zinc-900/95 px-4 py-1.5 rounded-full text-sm font-bold text-secondary shadow-lg">
                  {room.tag}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-display font-bold mb-3 text-slate-900 dark:text-white">{room.name}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed">{room.description}</p>
                <div className="flex items-center gap-4 text-slate-400 mb-8 border-t border-slate-50 dark:border-zinc-800 pt-6">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-xl">square_foot</span>
                    <span className="text-xs font-medium">{room.size}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-xl">shower</span>
                    <span className="text-xs font-medium">{room.bathroom}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-xl">wifi</span>
                    <span className="text-xs font-medium">{room.amenity}</span>
                  </div>
                </div>
                <Link 
                  to="/join" 
                  className="w-full inline-block text-center py-4 border-2 border-primary text-primary font-bold rounded-2xl hover:bg-primary hover:text-white transition-all shadow-sm hover:shadow-primary/20"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Amenities Grid */}
        <div className="mt-40 bg-slate-50 dark:bg-zinc-900/50 rounded-[3rem] p-12 md:p-20 text-center border border-slate-100 dark:border-zinc-800">
           <h2 className="font-display text-4xl text-secondary dark:text-primary mb-4">Hostel Amenities</h2>
           <p className="text-slate-600 dark:text-slate-400 mb-16">Everything you need for a comfortable stay in Salento.</p>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
             {[
               { icon: 'restaurant', name: 'Communal Kitchen' },
               { icon: 'local_laundry_service', name: 'Laundry Service' },
               { icon: 'map', name: 'Local Tours' },
               { icon: 'coffee_maker', name: '24/7 Coffee' }
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
