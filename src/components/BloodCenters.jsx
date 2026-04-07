import React from 'react';

const BloodCenters = () => {
  // Données des centres pour rendre le code plus propre
  const centers = [
    {
      id: 1,
      name: "CNTS - Antenne Littoral",
      location: "Zone résidentielle, Cotonou",
      status: "Ouvert 24h/24",
      statusColor: "text-emerald-600 bg-emerald-50",
      mapUrl: "https://api.maptiler.com/maps/basic-v2/static/2.42,6.37,12/400x200.png?key=YOUR_KEY", // Remplace par ta clé
      icon: "fa-route"
    },
    {
      id: 2,
      name: "CHD Ouémé-Plateau",
      location: "Quartier Accron, Porto-Novo",
      status: "Ferme à 18h00",
      statusColor: "text-slate-400 bg-slate-100",
      mapUrl: "https://api.maptiler.com/maps/basic-v2/static/2.60,6.49,12/400x200.png?key=YOUR_KEY",
      icon: "fa-phone"
    },
    {
      id: 3,
      name: "CHD Borgou",
      location: "Quartier Hubu, Parakou",
      status: "Ouvert 24h/24",
      statusColor: "text-emerald-600 bg-emerald-50",
      mapUrl: "https://api.maptiler.com/maps/basic-v2/static/2.62,9.33,12/400x200.png?key=YOUR_KEY",
      icon: "fa-route"
    }
  ];

  return (
    <section id="centres" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* COLONNE GAUCHE : RECHERCHE */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-custom-red rounded-3xl p-8 text-white shadow-xl transform active:scale-95 transition-transform cursor-pointer group">
            <i className="fa-solid fa-map-location-dot text-4xl opacity-40"></i>
            <h3 className="text-2xl font-black mt-4 leading-tight uppercase tracking-tighter font-montserrat">
              Trouver un centre
            </h3>
            <p className="text-sm text-red-100 mt-2 font-light">
              Localisez la banque de sang la plus proche de votre position actuelle au Bénin.
            </p>
            <div className="mt-6 flex items-center gap-2 font-bold text-xs uppercase tracking-widest">
              <span>Activer la Géolocalisation</span>
              <i className="fa-solid fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
            </div>
          </div>

          <div className="relative">
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input 
              type="text" 
              placeholder="Ville, département..." 
              className="w-full bg-slate-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-custom-red/20 focus:border-custom-red transition outline-none"
            />
          </div>
        </div>

        {/* COLONNE DROITE : LISTE DES CENTRES */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {centers.map((center) => (
            <div key={center.id} className="group bg-slate-50 rounded-3xl p-6 border border-gray-100 hover:shadow-2xl hover:border-custom-red/10 transition-all duration-300">
              <div className="aspect-video bg-white rounded-2xl mb-5 flex items-center justify-center relative overflow-hidden shadow-inner">
                <img 
                  src={center.mapUrl} 
                  alt={center.name} 
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" 
                />
                <i className="fa-solid fa-location-dot absolute text-3xl text-custom-red drop-shadow-md"></i>
              </div>
              
              <h4 className="text-sm font-black text-slate-800 uppercase tracking-tighter">{center.name}</h4>
              <p className="text-xs text-slate-500 mt-1">
                <i className="fa-solid fa-map-marker-alt mr-1"></i> {center.location}
              </p>
              
              <div className="mt-4 flex justify-between items-center border-t border-gray-100 pt-4">
                <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase ${center.statusColor}`}>
                  {center.status}
                </span>
                <button className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center hover:bg-black active:scale-90 transition shadow-md">
                  <i className={`fa-solid ${center.icon} text-xs`}></i>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BloodCenters;