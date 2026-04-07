
import React, { useState, useEffect } from 'react';
import { GALLERY_ITEMS } from '../constants';
import { GalleryItem } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const Gallery: React.FC = () => {
  const { t, language } = useLanguage();
  const [filter, setFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);
  
  // Create localized categories dynamically
  const allCategory = t('gallery.all');
  
  // Initialize filter correctly if needed, though simple string comparison works if we are consistent
  // Note: logic below attempts to handle language switching by checking against dynamic allCategory

  const filteredItems = filter === 'All' || filter === allCategory 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => {
        const catEn = item.category;
        const catEs = item.category_es || item.category;
        
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
                  filter === cat || (filter === 'All' && cat === allCategory)
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
              onClick={() => setSelectedImage(item)}
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
            <a href="https://instagram.com/elizabetha.hostal.salento"
				target="_blank"
				rel="noreferrer"
				className="flex items-center justify-center gap-3 px-10 py-4 rounded-2xl bg-white dark:bg-zinc-800 shadow-xl border border-slate-100 dark:border-zinc-700 transition-all hover:-translate-y-1">
              <span className="material-symbols-outlined text-primary text-2xl">photo_camera</span>
              <span className="font-bold text-slate-700 dark:text-slate-200">Instagram</span>
            </a>
            <a href="https://wa.me/573225379425"
				target="_blank"
				rel="noreferrer"
				className="flex items-center justify-center gap-3 px-10 py-4 rounded-2xl bg-white dark:bg-zinc-800 shadow-xl border border-slate-100 dark:border-zinc-700 transition-all hover:-translate-y-1">
              <span className="material-symbols-outlined text-primary text-2xl">phone</span>
              <span className="font-bold text-slate-700 dark:text-slate-200">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
            onClick={() => setSelectedImage(null)}
          >
            <span className="material-symbols-outlined text-4xl">close</span>
          </button>

          <div 
            className="relative max-w-7xl w-full max-h-screen flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage.image} 
              alt={selectedImage.title} 
              className="max-h-[85vh] w-auto object-contain rounded-xl shadow-2xl mb-6"
            />
            <div className="text-center animate-in slide-in-from-bottom-4 duration-500">
              <span className="text-primary font-bold uppercase tracking-widest text-sm block mb-2">
                {language === 'es' ? selectedImage.category_es : selectedImage.category}
              </span>
              <h3 className="text-3xl font-display italic text-white">
                {language === 'es' ? selectedImage.title_es : selectedImage.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
