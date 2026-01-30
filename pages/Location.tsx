
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Location: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="animate-in fade-in duration-700">
      <header className="relative py-32 bg-slate-100 dark:bg-slate-900/50 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <h1 className="font-display text-5xl md:text-7xl text-secondary dark:text-primary mb-8">{t('location.title')}</h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-light">
            {t('location.subtitle')}
          </p>
        </div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      </header>

      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-16 items-start">
            <div className="lg:col-span-2 relative">
               <div className="rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] border-8 border-white dark:border-zinc-800 h-[500px]">
                <iframe 
                  title="Salento Map"
                  loading="lazy" 
                  className="w-full h-full grayscale-[0.2]"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15911.649980645672!2d-75.57866531393655!3d4.637375276633604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e38f654f15d9685%3A0x6476b70176d6c95c!2sSalento%2C%20Quind%C3%ADo!5e0!3m2!1sen!2sco!4v1700000000000!5m2!1sen!2sco"
                ></iframe>
              </div>
              <div className="absolute bottom-8 left-8 bg-white/95 dark:bg-zinc-900/95 p-6 rounded-2xl shadow-2xl max-w-xs border border-primary/20 backdrop-blur-md">
                <h3 className="font-display text-secondary dark:text-primary font-bold text-xl mb-1">Hostal Elizabeta</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Calle 6 #4-22, Salento, Quindío, Colombia</p>
              </div>
            </div>

            <div className="space-y-10">
              <h2 className="font-display text-4xl text-secondary dark:text-primary">{t('location.getting.title')}</h2>
              
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                    <span className="material-icons-outlined text-2xl">directions_bus</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">{t('location.getting.bus.title')}</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      {t('location.getting.bus.desc')}
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                    <span className="material-icons-outlined text-2xl">directions_car</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">{t('location.getting.car.title')}</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      {t('location.getting.car.desc')}
                    </p>
                  </div>
                </div>

                <div className="bg-primary/5 dark:bg-white/5 p-8 rounded-3xl border border-primary/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <span className="material-symbols-outlined text-6xl rotate-12">lightbulb</span>
                  </div>
                  <h4 className="font-display text-2xl text-secondary dark:text-primary mb-4">{t('location.tip.title')}</h4>
                  <p className="text-sm italic text-slate-600 dark:text-slate-400 leading-relaxed">
                    {t('location.tip.desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Discover Section */}
      <section className="py-24 bg-slate-50 dark:bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl text-secondary dark:text-primary mb-4">{t('location.discover.title')}</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">{t('location.discover.subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { title: t('location.poi.cocora'), img: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=600', desc: t('location.poi.cocora.desc') },
              { title: t('location.poi.coffee'), img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=600', desc: t('location.poi.coffee.desc') },
              { title: t('location.poi.filandia'), img: 'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&q=80&w=600', desc: t('location.poi.filandia.desc') }
            ].map(poi => (
              <div key={poi.title} className="group cursor-pointer rounded-3xl overflow-hidden bg-white dark:bg-zinc-800 shadow-xl border border-slate-100 dark:border-zinc-700">
                <div className="h-64 overflow-hidden">
                  <img alt={poi.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={poi.img} />
                </div>
                <div className="p-8">
                  <h3 className="font-display text-2xl mb-3 text-slate-900 dark:text-white">{poi.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">{poi.desc}</p>
                  <button className="text-primary font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                    {t('location.learn')} <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Location;
