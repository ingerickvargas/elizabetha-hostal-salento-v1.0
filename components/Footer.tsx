
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-display font-bold text-white mb-6">Hostal Elizabeta</h3>
            <p className="text-slate-400 max-w-md leading-relaxed mb-6">
              Hostal Elizabeta offers a unique blend of modern comfort and traditional charm. Located in the heart of Salento, we are your gateway to the Cocora Valley and the world's finest coffee farms.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors">
                <span className="material-icons-outlined text-lg">facebook</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors">
                <span className="material-icons-outlined text-lg">camera_alt</span>
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link className="hover:text-primary transition-colors" to="/rooms">Our Rooms</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/location">Local Guides</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/">Sustainability</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/join">Booking Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <span className="material-icons-outlined text-primary text-xl">place</span>
                <span>Calle 5 #4-21,<br/>Salento, Quindío, Colombia</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <span className="material-icons-outlined text-primary text-xl">phone</span>
                <span>+57 (312) 456-7890</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <span className="material-icons-outlined text-primary text-xl">email</span>
                <span>hola@hostalelizabeta.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          <p>© 2024 Hostal Elizabeta. All rights reserved. Designed with love in Salento.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
