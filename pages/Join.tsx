
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Join: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen animate-in slide-in-from-right duration-700 bg-white dark:bg-zinc-950 overflow-hidden">
      {/* Left Column: Visual */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img 
          alt="Salento Coffee Farm" 
          className="absolute inset-0 w-full h-full object-cover" 
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1200" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
        <div className="absolute bottom-20 left-20 right-20 text-white space-y-4">
          <p className="font-handwritten text-5xl mb-6">Escape to Quindío</p>
          <h2 className="font-display text-6xl font-bold leading-tight drop-shadow-lg">Begin your journey in the heart of coffee country.</h2>
        </div>
        <Link 
          to="/"
          className="absolute top-10 left-10 flex items-center gap-2 text-white bg-black/20 backdrop-blur-xl px-6 py-3 rounded-full hover:bg-black/40 transition-all font-semibold"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Right Column: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-20 overflow-y-auto no-scrollbar">
        <div className="max-w-md w-full py-12">
          <div className="mb-12 text-center lg:text-left">
            <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-10 mx-auto lg:mx-0">
               <span className="material-symbols-outlined text-primary text-4xl">cottage</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">Join the Family</h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg">Create an account to manage your reservations and receive exclusive member benefits.</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); navigate('/'); }}>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">person</span>
                <input 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 rounded-2xl focus:ring-2 focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-white" 
                  placeholder="John Doe" 
                  type="text" 
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">mail</span>
                <input 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 rounded-2xl focus:ring-2 focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-white" 
                  placeholder="hello@example.com" 
                  type="email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Password</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">lock</span>
                <input 
                  className="w-full pl-12 pr-12 py-4 bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 rounded-2xl focus:ring-2 focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-white" 
                  placeholder="••••••••" 
                  type="password"
                  required
                />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <span className="material-symbols-outlined">visibility</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 py-2">
              <input type="checkbox" className="h-5 w-5 rounded-lg border-slate-300 text-primary focus:ring-primary cursor-pointer" id="terms" required />
              <label htmlFor="terms" className="text-sm text-slate-500 dark:text-slate-400 cursor-pointer">
                I agree to the <a href="#" className="text-primary font-bold hover:underline">Terms of Service</a> and <a href="#" className="text-primary font-bold hover:underline">Privacy Policy</a>.
              </label>
            </div>

            <button 
              type="submit" 
              className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg hover:bg-opacity-90 shadow-2xl shadow-primary/30 transition-all active:scale-[0.98]"
            >
              Create Account
            </button>
          </form>

          <div className="mt-12 text-center">
             <p className="text-slate-500">Already have an account? <a href="#" className="font-bold text-secondary dark:text-primary hover:underline ml-1">Log in here</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Join;
