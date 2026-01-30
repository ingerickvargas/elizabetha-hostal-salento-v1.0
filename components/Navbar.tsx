
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Rooms', path: '/rooms' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Location', path: '/location' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-slate-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center space-x-2">
            <Link to="/">
              <div className="bg-primary/20 p-2 rounded-lg">
                <span className="material-symbols-outlined text-primary font-bold">cottage</span>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className="text-sm font-medium hover:text-primary transition-colors text-slate-600 dark:text-slate-300"
              >
                {link.name}
              </Link>
            ))}
            <button 
              onClick={() => navigate('/join')}
              className="bg-primary hover:bg-opacity-90 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg shadow-primary/20"
            >
              Book Now
            </button>
            <button 
              onClick={() => document.documentElement.classList.toggle('dark')}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-500"
            >
              <span className="material-icons-outlined text-xl">dark_mode</span>
            </button>
          </div>

          <div className="md:hidden flex items-center">
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
              key={link.name} 
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
            Book Now
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
