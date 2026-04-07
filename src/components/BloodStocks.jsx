import React, { useState } from 'react';

const BloodStocks = () => {
  const [filter, setFilter] = useState('all');

  const bloodData = [
    { group: 'A+', count: 142, rhesus: 'positif', status: 'OPTIMAL', color: 'bg-emerald-500' },
    { group: 'A-', count: 28, rhesus: 'negatif', status: 'BAS', color: 'bg-orange-400' },
    { group: 'B+', count: 65, rhesus: 'positif', status: 'OPTIMAL', color: 'bg-emerald-500' },
    { group: 'B-', count: '04', rhesus: 'negatif', status: 'CRITIQUE', color: 'bg-white text-custom-red animate-pulse', special: true },
    { group: 'AB+', count: 42, rhesus: 'positif', status: 'OPTIMAL', color: 'bg-emerald-500' },
    { group: 'AB-', count: 12, rhesus: 'negatif', status: 'BAS', color: 'bg-orange-400' },
    { group: 'O+', count: 210, rhesus: 'positif', status: 'OPTIMAL', color: 'bg-emerald-500' },
    { group: 'O-', count: '02', rhesus: 'negatif', status: 'CRITIQUE', color: 'bg-white text-custom-red animate-pulse', special: true },
  ];

  const filteredData = filter === 'all' 
    ? bloodData 
    : bloodData.filter(item => item.rhesus === filter);

  return (
    <section id="stocks" className="w-full py-16 bg-custom-red shadow-2xl overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 text-white text-center md:text-left">
          <h2 className="text-4xl font-black mb-6 uppercase tracking-tighter font-montserrat">
            Disponibilité Nationale
          </h2>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4 border-b border-white/20 pb-6">
            <button 
              onClick={() => setFilter('all')}
              className={`px-8 py-2.5 rounded-full text-sm font-bold shadow-lg transition-all ${filter === 'all' ? 'bg-white text-custom-red' : 'text-white/80 hover:bg-white/10'}`}
            >
              Tous les groupes
            </button>
            <button 
              onClick={() => setFilter('positif')}
              className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all ${filter === 'positif' ? 'bg-white text-custom-red' : 'text-white/80 hover:bg-white/10'}`}
            >
              Rhésus (+)
            </button>
            <button 
              onClick={() => setFilter('negatif')}
              className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all ${filter === 'negatif' ? 'bg-white text-custom-red' : 'text-white/80 hover:bg-white/10'}`}
            >
              Rhésus (-)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredData.map((blood, index) => (
            <div 
              key={index}
              className={`group bg-white/10 backdrop-blur-md rounded-[2.5rem] p-6 border border-white/20 transition-all hover:bg-white/20 ${blood.special ? 'border-l-4 border-l-white' : ''}`}
            >
              <div className={`aspect-square ${blood.special ? 'bg-white/20' : 'bg-white/10'} rounded-3xl mb-6 flex items-center justify-center relative border border-white/10 shadow-inner`}>
                <div className={`absolute top-4 right-4 text-[9px] font-black px-3 py-1 rounded-full shadow-lg ${blood.color}`}>
                  {blood.status}
                </div>
                <span className="text-7xl font-black text-white font-montserrat tracking-tighter">
                  {blood.group}
                </span>
              </div>
              <div className="flex justify-between items-end">
                <div className="text-white">
                  <span className="text-3xl font-black">{blood.count}</span>
                  <span className="text-xs font-bold opacity-60 ml-1">poches</span>
                </div>
                <button className="w-10 h-10 bg-white text-custom-red rounded-xl flex items-center justify-center hover:scale-110 transition shadow-md">
                  <i className={`fa-solid ${blood.status === 'CRITIQUE' ? 'fa-bell' : blood.status === 'BAS' ? 'fa-plus' : 'fa-share-nodes'} text-xs`}></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BloodStocks;