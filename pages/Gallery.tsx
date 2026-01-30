
import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

const Gallery: React.FC = () => {
  const { t, language } = useLanguage();
  const [filter, setFilter] = useState('All');
  
  // Create localized categories dynamically
  const allCategory = t('gallery.all');
  const categories = [allCategory, 'Architecture', 'Interiors', 'Region', 'Experience', 'Accommodation', 'Common Areas'];

  const getLocalizedCategory = (cat: string) => {
     if (cat === allCategory) return allCategory;
     // Map specific category names if needed, or rely on them being keys in the item
     // For this simple implementation, we will filter based on the English category but display localized names if available
     return cat; 
  };

  const filteredItems = filter === allCategory 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => {
        // This is a simplified filter logic. In a real app, we might map IDs.
        // Here we try to match the category either in English or Spanish.
        const catEn = item.category;
        const catEs = item.category_es || item.category;
        
        // We need to know which language the filter button is displaying
        // But the filter state holds the string displayed on the button.
        // Let's reverse map or just check if the item has this category string.
        if (language === 'es') return catEs === filter;
        return catEn === filter;
    });

  // Unique categories from items for buttons
  const uniqueCategories = [allCategory, ...Array.from(new Set(GALLERY_ITEMS.map(item => language === 'es' ? (item.category_es || item.category) : item.category)))];

  return (
    <div className="pt-32 pb-24 animate-in fade-in duration-1000">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-4 block">{t('gallery.visual')}</span>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-slate-900 dark:text-white mb-8">{t('gallery.title')}</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            {t('gallery.subtitle')}
          </p>
          
          <div className="flex justify-center gap-3 mt-12 overflow-x-auto pb-4 no-scrollbar">
            {uniqueCategories.map((cat) => (
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
                  <p className="text-xs uppercase tracking-[0.2em] mb-2 font-bold">{language === 'es' ? item.category_es : item.category}</p>
                  <h3 className="text-2xl font-display italic leading-tight">{language === 'es' ? item.title_es : item.title}</h3>
                </div>
                <div className="ml-auto w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                  <span className="material-symbols-outlined">zoom_in</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 text-center py-20 bg-slate-50 dark:bg-zinc-900/50 rounded-[3rem] border border-slate-100 dark:border-zinc-800">
          <h2 className="text-3xl font-display font-bold mb-10 text-slate-900 dark:text-white">{t('gallery.social.title')}</h2>
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
