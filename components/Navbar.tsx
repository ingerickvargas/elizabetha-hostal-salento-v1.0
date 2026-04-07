
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.rooms'), path: '/rooms' },
    { name: t('nav.gallery'), path: '/gallery' },
    { name: t('nav.location'), path: '/location' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  return (
    <nav className="fixed w-full z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-slate-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center space-x-2">
            <Link to="/">
				  <img
					src="https://kooibbljmurrssrtiopw.supabase.co/storage/v1/object/sign/images/logo_header.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NTUxNDI5OC1hMTVlLTRkM2YtYmEwNi00ZTcyMjc5ZTQ0OTkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvbG9nb19oZWFkZXIucG5nIiwiaWF0IjoxNzc1NTE4ODk1LCJleHAiOjE4Mzg1OTA4OTV9.R4spVOC0J2ustjs4UNc5mmfF6-Z9m3Qkvx2J3vTUd5s"
					alt="Hostal Elizabetha"
					className="h-12 w-auto object-contain transition-transform duration-300 hover:scale-105"
				  />
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className="text-sm font-medium hover:text-primary transition-colors text-slate-600 dark:text-slate-300"
              >
                {link.name}
              </Link>
            ))}
            <button 
              onClick={() => navigate('/admin')}
              className="bg-primary hover:bg-opacity-90 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg shadow-primary/20"
            >
              {t('nav.admin')}
            </button>
            <div className="flex items-center gap-2 border-l border-slate-200 dark:border-zinc-700 pl-4 ml-2">
              <button 
                onClick={toggleLanguage}
                className="font-bold text-sm text-slate-600 dark:text-slate-300 hover:text-primary transition-colors uppercase w-8"
              >
                {language === 'es' ? 'ES' : 'EN'}
              </button>
              <button 
                onClick={() => document.documentElement.classList.toggle('dark')}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-500"
              >
                <span className="material-icons-outlined text-xl">dark_mode</span>
              </button>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-4">
             <button 
                onClick={toggleLanguage}
                className="font-bold text-sm text-slate-600 dark:text-slate-300 hover:text-primary transition-colors uppercase"
              >
                {language === 'es' ? 'ES' : 'EN'}
              </button>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 dark:text-slate-300"
            >
              <span className="material-icons-outlined text-3xl">{isOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-zinc-900 border-b border-slate-100 dark:border-zinc-800 py-4 px-6 space-y-4">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              onClick={() => setIsOpen(false)}
              className="block text-base font-medium text-slate-700 dark:text-slate-200"
            >
              {link.name}
            </Link>
          ))}
          <button 
            onClick={() => { setIsOpen(false); navigate('/join'); }}
            className="w-full bg-primary text-white py-3 rounded-xl font-bold"
          >
            {t('nav.book')}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
