import React, { useState } from 'react';
import { Search, Menu, X, Hospital, Truck, LayoutGrid, User } from 'lucide-react';

// Uniformisation du nom de la prop : onOpenLogin
function Navbar({ onOpenLogin }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full border-b border-gray-100 sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 gap-4">
          
          {/* LOGO */}
          <a href="#" className="flex items-center gap-2 group">
            <img 
              src="assets/LG1.png" 
              alt="Logo SANG-VIE" 
              className="h-14 md:h-16 w-auto object-contain transform group-hover:scale-105 transition-transform origin-left" 
            />
          </a>

          {/* BARRE DE RECHERCHE (Desktop) */}
          <div className="hidden lg:flex flex-1 max-w-md relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <Search className="text-gray-400" size={18} />
            </span>
            <input 
              type="text" 
              placeholder="Rechercher un groupe sanguin..." 
              className="w-full bg-gray-50 border border-gray-100 text-sm rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all"
            />
          </div>

          {/* NAVIGATION (Desktop) */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#stocks" className="text-sm font-semibold text-gray-600 hover:text-red-600 transition">Stocks</a>
            <a href="#centres" className="text-sm font-semibold text-gray-600 hover:text-red-600 transition">Centres</a>
            <a href="#urgences" className="text-sm font-semibold text-gray-600 hover:text-red-600 transition">Urgences</a>
            
            <div className="flex items-center gap-3 ml-4">
              <button 
                onClick={onOpenLogin} // Utilisation du bon nom de prop
                className="bg-red-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md hover:bg-red-700 transition flex items-center gap-2"
              >
                <User size={16} />
                <span>Espace Agent</span>
              </button>
            </div>
          </div>

          {/* BOUTON MENU MOBILE */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-800 p-2 transition-transform active:scale-90"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* MENU MOBILE */}
        <div className={`${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'} md:hidden fixed inset-x-4 top-24 z-40 transition-all duration-300`}>
          <div className="bg-white/98 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
            <div className="p-6 space-y-6">
              
              <div className="relative lg:hidden">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Hôpital, groupe sanguin..." 
                  className="w-full bg-gray-100/50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-red-600/20 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 gap-2">
                <a href="#stocks" onClick={() => setIsOpen(false)} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-2xl transition group">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition">
                    <LayoutGrid size={20} />
                  </div>
                  <span className="font-bold text-gray-700">Stocks de sang</span>
                </a>
                <a href="#centres" onClick={() => setIsOpen(false)} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-2xl transition group">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition">
                    <Hospital size={20} />
                  </div>
                  <span className="font-bold text-gray-700">Centres de collecte</span>
                </a>
                <a href="#urgences" onClick={() => setIsOpen(false)} className="flex items-center gap-4 p-4 hover:bg-red-50 rounded-2xl transition group text-red-600">
                  <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                    <Truck size={20} />
                  </div>
                  <span className="font-bold">Urgences vitales</span>
                </a>
              </div>

              <hr className="border-gray-100" />

              <div className="space-y-3">
                <button 
                  onClick={() => { setIsOpen(false); onOpenLogin(); }} // Utilisation ici aussi
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-lg active:scale-95 transition flex items-center justify-center gap-2"
                >
                  <User size={18} />
                  Espace Agent ANTS
                </button>
                <a 
                  href="#devenir-donneur" 
                  onClick={() => setIsOpen(false)}
                  className="block w-full py-4 bg-red-600 text-white text-center rounded-2xl font-bold shadow-lg shadow-red-600/20 active:scale-95 transition"
                >
                  Devenir Donneur
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;