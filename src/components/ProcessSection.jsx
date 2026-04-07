import React from 'react';

const ProcessSection = () => {
  return (
    <section className="bg-slate-900 py-20 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16">
          <h2 className="text-4xl font-black uppercase tracking-tighter">
            Comment devenir un <span className="text-custom-red">Héros</span> ?
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl">
            Le processus de don est simple, sécurisé et ne prend qu'une quarantaine de minutes de votre temps pour sauver trois vies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          <div className="relative group">
            <div className="absolute -top-6 -left-4 text-8xl font-black text-white/5 group-hover:text-custom-red/20 transition-colors">01</div>
            <div className="relative">
              <h4 className="text-xl font-bold mb-4">L'Entretien</h4>
              <p className="text-slate-400 leading-relaxed">
                Un court questionnaire et un entretien confidentiel avec un professionnel de santé pour s'assurer que vous pouvez donner en toute sécurité.
              </p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -top-6 -left-4 text-8xl font-black text-white/5 group-hover:text-custom-red/20 transition-colors">02</div>
            <div className="relative">
              <h4 className="text-xl font-bold mb-4">Le Prélèvement</h4>
              <p className="text-slate-400 leading-relaxed">
                Le don lui-même dure environ 10 minutes. Nous utilisons uniquement du matériel stérile et à usage unique.
              </p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -top-6 -left-4 text-8xl font-black text-white/5 group-hover:text-custom-red/20 transition-colors">03</div>
            <div className="relative">
              <h4 className="text-xl font-bold mb-4">Le Repos & Collation</h4>
              <p className="text-slate-400 leading-relaxed">
                Après le don, une collation vous est offerte. C'est un moment de détente indispensable pour recharger les batteries.
              </p>
            </div>
          </div>

        </div>

        <div className="mt-20 p-1 bg-gradient-to-r from-custom-red to-orange-500 rounded-3xl">
          <div className="bg-slate-900 rounded-[22px] p-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-bold">Prêt à faire la différence ?</h3>
              <p className="text-slate-400 mt-2">Vérifiez votre éligibilité en 2 minutes chrono.</p>
            </div>
            <div className="flex gap-4">
              <button className="bg-custom-red hover:bg-red-600 px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-custom-red/20">
                Prendre rendez-vous
              </button>
              <button className="border border-slate-700 hover:bg-slate-800 px-8 py-4 rounded-xl font-bold transition-all">
                Centres proches
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProcessSection;