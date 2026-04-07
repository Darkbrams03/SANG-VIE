import React from 'react';

const LoginModal = ({ isOpen, onClose, loginData, setLoginData, handleLogin }) => {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay avec flou */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Contenu du Modal */}
      <div className="relative w-full max-w-lg transform overflow-hidden rounded-[2.5rem] bg-white/10 backdrop-blur-3xl p-10 border border-white/20 shadow-2xl animate-in fade-in zoom-in duration-300">
        
        {/* Bouton Retour */}
        <button 
          onClick={onClose}
          className="absolute left-8 top-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-90"
        >
          <i className="fa-solid fa-chevron-left text-xs"></i>
        </button>

        <div className="text-center mb-10">
          <h3 className="text-xl font-bold text-white tracking-tight font-montserrat uppercase">Espace Agent ANTS</h3>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            
            {/* Matricule Agent */}
            <div className="bg-white/5 rounded-3xl p-5 border border-white/10 hover:bg-white/10 transition-all group">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-[10px] uppercase font-bold text-white/30 tracking-widest mb-1">Matricule Agent</label>
                  <input 
                    type="text" 
                    name="matricule"
                    value={loginData.matricule}
                    onChange={handleChange}
                    required
                    placeholder="Identifiant unique" 
                    className="w-full bg-transparent border-none p-0 text-sm font-semibold text-white placeholder:text-white/20 focus:ring-0 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Mot de passe */}
            <div className="bg-white/5 rounded-3xl p-5 border border-white/10 hover:bg-white/10 transition-all group">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-[10px] uppercase font-bold text-white/30 tracking-widest mb-1">Mot de passe</label>
                  <input 
                    type="password" 
                    name="password"
                    value={loginData.password}
                    onChange={handleChange}
                    required
                    placeholder="••••••••" 
                    className="w-full bg-transparent border-none p-0 text-sm font-semibold text-white placeholder:text-white/20 focus:ring-0 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-white text-black py-5 rounded-[2rem] font-bold text-sm hover:bg-gray-200 transition-all active:scale-[0.98] shadow-xl mt-4 uppercase tracking-widest"
          >
            Se connecter
          </button>

          <p className="text-[10px] text-center text-white/20 px-10 leading-relaxed uppercase font-bold tracking-tighter">
            Système de monitoring SANG-VIE. Accès restreint.
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;