import React from 'react';
import { AlertTriangle, Zap } from 'lucide-react';

const UrgencyBanner = ({ alert }) => {
  if (!alert) return null;

  return (
    <div className="bg-red-600 text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-2 rounded-lg animate-pulse">
            <AlertTriangle size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80 leading-none mb-1">
              Alerte Sanitaire Critique
            </p>
            <p className="text-sm font-bold uppercase tracking-tight">
              Besoin urgent de <span className="underline decoration-2 underline-offset-4">{alert.needed_pockets} poches {alert.group}</span> au {alert.location}
            </p>
          </div>
        </div>
        
        <button className="bg-white text-red-600 px-6 py-2 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all flex items-center gap-2 shadow-xl">
          Donner maintenant <Zap size={14} fill="currentColor" />
        </button>
      </div>
      
      {/* Animation de fond */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shimmer_3s_infinite]"></div>
    </div>
  );
};

export default UrgencyBanner;