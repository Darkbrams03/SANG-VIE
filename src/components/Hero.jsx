import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = ["assets/I1.jpg", "assets/I2.jpg", "assets/I3.jpg"];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (

    <section className="relative flex-1 w-full flex items-center justify-center overflow-hidden bg-black">
      {/* BACKGROUND CAROUSEL */}
      <div className="absolute inset-0 w-full h-full z-0">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img src={img} alt="" className="w-full h-full object-cover object-center" />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/60 z-10"></div>
      </div>

      
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 text-center">
        <div className="flex flex-col items-center">
          <h1 className="flex flex-col mb-4">
            <span className="text-white text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
              Une poche de
            </span>
            <span className="text-white text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
              sang.
            </span>
            <span className="text-gray-300 text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mt-2">
              Une vie préservée.
            </span>
          </h1>
          
          <p className="text-gray-200 text-base md:text-xl max-w-2xl font-light leading-relaxed mb-10 opacity-90">
            La première plateforme interconnectée de gestion des stocks de sang au Bénin. 
            <br className="hidden md:block" /> Trouvez, donnez, sauvez.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {/* Bouton Affiné : py-3 au lieu de py-4 et texte plus petit */}
            <button className="bg-[#b91c1c] text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-red-700 transition-all shadow-lg">
              Trouver du sang <span className="text-sm">→</span>
            </button>
            <button className="bg-white/10 backdrop-blur-md text-white border border-white/10 px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-white/20 transition-all">
              Devenir donneur
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 opacity-30">
        <svg className="w-6 h-6 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;