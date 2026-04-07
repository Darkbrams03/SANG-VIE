import React from 'react';

const StatsSection = () => {
  // Tu peux changer cette valeur pour ajuster ton rouge partout d'un coup
  const customRed = "bg-[#CC0000]"; 
  const textRed = "text-[#CC0000]";
  const borderRed = "hover:border-[#CC0000]/30";
  const shadowRed = "shadow-[#CC0000]/20";

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* BLOC ROUGE : CHIFFRES NATIONAUX */}
        <div className={`md:col-span-1 ${customRed} rounded-2xl p-8 flex flex-col justify-between min-h-[400px] text-white shadow-xl`}>
          <div>
            <h3 className="text-2xl font-black leading-tight uppercase tracking-tighter">
              Chiffres du Stock National
            </h3>
            <p className="mt-4 text-white/80 text-sm leading-relaxed">
              Données mises à jour en temps réel pour l'ensemble des centres de transfusion du Bénin.
            </p>
            <div className="mt-6 flex items-center gap-2 font-bold cursor-pointer hover:translate-x-1 transition-transform">
              <span>Voir le rapport complet</span>
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </div>
          </div>
          <div className="mt-auto opacity-20 flex justify-center">
            <i className="fa-solid fa-droplet text-6xl"></i>
          </div>
        </div>

        {/* GRILLE DES 4 CARTES DE STATS */}
        <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Carte 1 : Inventaire */}
          <div className={`bg-slate-50 rounded-2xl p-8 flex flex-col justify-between border border-gray-100 ${borderRed} transition-all group`}>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Inventaire Global</span>
              <h3 className="text-3xl font-black text-slate-800 mt-2">1,284</h3>
              <p className="text-sm text-slate-500 font-medium">Pochettes de sang sécurisées</p>
            </div>
            <div className="mt-6">
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                <i className="fa-solid fa-chart-line"></i>
                <span>+12% cette semaine</span>
              </div>
            </div>
          </div>

          {/* Carte 2 : Besoins Critiques */}
          <div className="bg-slate-50 rounded-2xl p-8 flex flex-col justify-between border border-gray-100">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Besoins Critiques</span>
              <h3 className={`text-3xl font-black ${textRed} mt-2`}>42</h3>
              <p className="text-sm text-slate-500 font-medium">Demandes urgentes non comblées</p>
            </div>
            <div className="mt-6">
              <button className={`${customRed} text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-lg ${shadowRed} hover:opacity-90 transition`}>
                Répondre à l'urgence
              </button>
            </div>
          </div>

          {/* Carte 3 : Réseau */}
          <div className="bg-slate-50 rounded-2xl p-8 flex flex-col justify-between border border-gray-100">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Réseau</span>
              <h3 className="text-3xl font-black text-slate-800 mt-2">18</h3>
              <p className="text-sm text-slate-500 font-medium">Hôpitaux & Centres connectés</p>
            </div>
            <div className="mt-6">
              <p className={`flex items-center gap-2 font-black ${textRed} text-sm cursor-pointer`}>
                Localiser sur la carte <i className="fa-solid fa-location-dot text-xs"></i>
              </p>
            </div>
          </div>

          {/* Carte 4 : Communauté */}
          <div className="bg-slate-50 rounded-2xl p-8 flex flex-col justify-between border border-gray-100">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Communauté</span>
              <h3 className="text-3xl font-black text-slate-800 mt-2">8,500+</h3>
              <p className="text-sm text-slate-500 font-medium">Héros enregistrés au Bénin</p>
            </div>
            <div className="mt-6">
              <div className="flex -space-x-3">
                <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200"></div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-300"></div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-400"></div>
                <div className={`w-8 h-8 rounded-full border-2 border-white ${customRed} flex items-center justify-center text-[8px] text-white font-bold`}>+</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default StatsSection;