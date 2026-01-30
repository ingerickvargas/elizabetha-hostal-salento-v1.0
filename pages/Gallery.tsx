
import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../constants';

const Gallery: React.FC = () => {
  const [filter, setFilter] = useState('All Photos');
  const categories = ['All Photos', 'Architecture', 'Interiors', 'Cocora Valley', 'Experience'];

  const filteredItems = filter === 'All Photos' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === filter || (filter === 'Cocora Valley' && item.category === 'Region'));

  return (
    <div className="pt-32 pb-24 animate-in fade-in duration-1000">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Visual Journey</span>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-slate-900 dark:text-white mb-8">Hostal Gallery</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Discover the colonial soul of Salento. From our sun-drenched courtyard to the emerald peaks of the Cocora Valley, explore the essence of Hostal Elizabeta.
          </p>
          
          <div className="flex justify-center gap-3 mt-12 overflow-x-auto pb-4 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-8 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap border ${
                  filter === cat 
                  ? 'bg-secondary text-white border-secondary shadow-lg' 
                  : 'bg-white dark:bg-zinc-800 text-slate-500 border-slate-200 dark:border-zinc-700 hover:border-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="relative group cursor-pointer overflow-hidden rounded-[2rem] shadow-xl break-inside-avoid"
            >
              <img 
                alt={item.title} 
                className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110" 
                src={item.image}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-10">
                <div className="text-white">
                  <p className="text-xs uppercase tracking-[0.2em] mb-2 font-bold">{item.category}</p>
                  <h3 className="text-2xl font-display italic leading-tight">{item.title}</h3>
                </div>
                <div className="ml-auto w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                  <span className="material-symbols-outlined">zoom_in</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 text-center py-20 bg-slate-50 dark:bg-zinc-900/50 rounded-[3rem] border border-slate-100 dark:border-zinc-800">
          <h2 className="text-3xl font-display font-bold mb-10 text-slate-900 dark:text-white">Follow Our Story</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6 px-4">
            <a href="#" className="flex items-center justify-center gap-3 px-10 py-4 rounded-2xl bg-white dark:bg-zinc-800 shadow-xl border border-slate-100 dark:border-zinc-700 transition-all hover:-translate-y-1">
              <span className="material-symbols-outlined text-primary text-2xl">photo_camera</span>
              <span className="font-bold text-slate-700 dark:text-slate-200">Instagram</span>
            </a>
            <a href="#" className="flex items-center justify-center gap-3 px-10 py-4 rounded-2xl bg-white dark:bg-zinc-800 shadow-xl border border-slate-100 dark:border-zinc-700 transition-all hover:-translate-y-1">
              <span className="material-symbols-outlined text-primary text-2xl">movie</span>
              <span className="font-bold text-slate-700 dark:text-slate-200">TikTok</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
