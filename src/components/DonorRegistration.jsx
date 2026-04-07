import React from 'react';

const DonorRegistration = ({ formData, setFormData, handleSubmit, isSubmitted }) => {
  
  // Fonction pour mettre à jour l'état dans Home.jsx
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section id="devenir-donneur" className="w-full py-20 bg-custom-red mt-20 shadow-2xl relative overflow-hidden">
      {/* Éléments de design (Cercles flous) */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-black/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* TEXTE DE GAUCHE */}
          <div className="text-white space-y-8">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight font-montserrat">
              Prêt à devenir <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-100 to-white">
                un héros local ?
              </span>
            </h2>
            
            <p className="text-red-100 text-lg font-light leading-relaxed max-w-md">
              Enregistrez-vous en moins de 2 minutes. Votre don peut sauver jusqu'à trois vies au Bénin.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-shield-heart text-red-200"></i>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Confidentialité</h4>
                  <p className="text-[11px] text-red-100/60">Vos données sont sécurisées et cryptées.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-bell text-red-200"></i>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Alertes SMS</h4>
                  <p className="text-[11px] text-red-100/60">Notifications en cas d'urgence absolue.</p>
                </div>
              </div>
            </div>
          </div>

          {/* FORMULAIRE (CARTE VITRÉE) */}
          <div className="bg-white/10 backdrop-blur-3xl rounded-[3rem] p-8 md:p-12 border border-white/20 shadow-2xl transform lg:rotate-1 hover:rotate-0 transition-all duration-500">
            {isSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <i className="fa-solid fa-check text-white text-3xl"></i>
                </div>
                <h3 className="text-2xl font-black text-white uppercase">Merci Héros !</h3>
                <p className="text-red-100">Votre inscription a été enregistrée avec succès.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2 group">
                    <label className="text-[11px] font-black uppercase text-white ml-1 tracking-[0.15em] drop-shadow-sm">
                      Nom complet
                    </label>
                    <input 
                      type="text" 
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleChange}
                      required
                      placeholder="Ex: Ricardo Bouraima" 
                      className="w-full bg-white/5 border border-white/20 rounded-2xl py-4 px-6 text-sm text-white placeholder:text-white/30 focus:ring-2 focus:ring-white/40 focus:bg-white/10 transition-all outline-none"
                    />
                  </div>
                  
                  <div className="space-y-2 group">
                    <label className="text-[11px] font-black uppercase text-white ml-1 tracking-[0.15em] drop-shadow-sm">
                      Groupe Sanguin
                    </label>
                    <div className="relative">
                       <select 
                        name="blood_group"
                        value={formData.blood_group}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/20 rounded-2xl py-4 px-6 text-sm text-white focus:ring-2 focus:ring-white/40 focus:bg-white/10 transition-all cursor-pointer outline-none appearance-none"
                      >
                        <option className="bg-slate-900" value="" disabled>Choisir...</option>
                        {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-', 'Inconnu'].map(group => (
                          <option key={group} className="bg-slate-900" value={group}>{group}</option>
                        ))}
                      </select>
                      {/* Flèche personnalisée pour le select car appearance-none est utilisé */}
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/40">
                        <i className="fa-solid fa-chevron-down text-[10px]"></i>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 group">
                  <label className="text-[11px] font-black uppercase text-white ml-1 tracking-[0.15em] drop-shadow-sm">
                    Téléphone (WhatsApp)
                  </label>
                  <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-sm font-bold text-white/60">+229</span>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="00 00 00 00" 
                      className="w-full bg-white/5 border border-white/20 rounded-2xl py-4 pl-16 pr-6 text-sm text-white placeholder:text-white/30 focus:ring-2 focus:ring-white/40 focus:bg-white/10 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2 group">
                  <label className="text-[11px] font-black uppercase text-white ml-1 tracking-[0.15em] drop-shadow-sm">
                    Localisation
                  </label>
                  <input 
                    type="text" 
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    placeholder="Ville ou quartier (ex: Calavi)" 
                    className="w-full bg-white/5 border border-white/20 rounded-2xl py-4 px-6 text-sm text-white placeholder:text-white/30 focus:ring-2 focus:ring-white/40 focus:bg-white/10 transition-all outline-none"
                  />
                </div>

                <button type="submit" className="w-full bg-white text-custom-red py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-xl hover:bg-red-50 hover:scale-[1.02] transition-all active:scale-95 duration-300">
                  Rejoindre la communauté
                </button>
                
                <p className="text-center text-[10px] text-white/50 font-medium px-4 leading-relaxed">
                  En rejoignant le réseau <span className="text-white font-bold">SANG-VIE</span>, vous acceptez d'être contacté uniquement pour des nécessités de don de sang.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonorRegistration;