import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-white/5 text-white block w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          
          {/* LOGO & MISSION */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img 
                src="assets/LG1.png" 
                alt="SANG-VIE Logo" 
                className="h-12 w-auto brightness-0 invert" 
              />
              <span className="text-2xl font-black tracking-tighter uppercase font-montserrat">
                Sang-Vie
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed font-light">
              Plateforme nationale de monitoring des stocks de sang au Bénin. 
              Notre mission est de connecter chaque don à une vie sauvée.
            </p>
          </div>

          {/* LIENS PLATEFORME */}
          <div>
            <h4 className="font-black text-white mb-8 uppercase text-[11px] tracking-[0.2em] border-l-2 border-custom-red pl-3">
              Plateforme
            </h4>
            <ul className="space-y-4 text-sm text-slate-400 font-medium">
              <li><a href="#stocks" className="hover:text-custom-red transition-colors">Stocks en direct</a></li>
              <li><a href="#centres" className="hover:text-custom-red transition-colors">Centres de collecte</a></li>
              <li><a href="#urgences" className="hover:text-custom-red transition-colors">Urgences vitales</a></li>
              <li><a href="#devenir-donneur" className="hover:text-custom-red transition-colors">Devenir donneur</a></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="font-black text-white mb-8 uppercase text-[11px] tracking-[0.2em] border-l-2 border-custom-red pl-3">
              Contact Rapide
            </h4>
            <div className="space-y-6 text-sm">
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase mb-1 text-slate-500">Email Assistance</span>
                <a href="mailto:support@sangvie.bj" className="font-bold text-white hover:text-custom-red transition-colors">
                  support@sangvie.bj
                </a>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase mb-1 text-slate-500">Ligne d'Urgence</span>
                <a href="tel:+22900000000" className="font-black text-xl text-custom-red tracking-tight">
                  +229 00 00 00 00
                </a>
              </div>
            </div>
          </div>

          {/* CARTE SIÈGE */}
          <div id="siege">
            <h4 className="font-black text-white mb-8 uppercase text-[11px] tracking-[0.2em] border-l-2 border-custom-red pl-3">
              Siège Social
            </h4>
            <div className="w-full h-40 bg-slate-900 rounded-[2.5rem] relative overflow-hidden border border-white/10 group cursor-pointer">
              <img 
                src="https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/2.35,6.37,12,0/400x300?access_token=TON_TOKEN_ICI" 
                alt="Carte Cotonou" 
                className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.4] group-hover:brightness-75 group-hover:scale-110 transition-all duration-700" 
              />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 bg-slate-950/20 backdrop-blur-[1px]">
                <div className="w-10 h-10 bg-custom-red rounded-full flex items-center justify-center shadow-lg shadow-custom-red/40 animate-bounce">
                  <i className="fa-solid fa-location-dot text-white text-sm"></i>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-black text-white uppercase tracking-widest drop-shadow-md">Cotonou, Bénin</p>
                  <p className="text-[9px] text-slate-400 font-medium italic">Zone Aéroportuaire</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* COPYRIGHT BAR */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 text-center md:text-left">
            © 2026 <span className="text-white">SANG-VIE BENIN</span>. TOUS DROITS RÉSERVÉS.
          </div>
          <div className="flex gap-8 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;