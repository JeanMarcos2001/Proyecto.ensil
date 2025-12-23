import React from 'react';
import { BookOpen, Gauge, MapPin, ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          alt="Joven latina concentrada leyendo" 
          className="w-full h-full object-cover" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8OAPJCS_L_JWaegltAjImHpf7QCzTIDhux2Sqjp-f-hvmylZ7sjRX35TXHG_8ugBljN1IV0ToARD1SPfkr1yT4lc2VKhi_uLiyF0mv5EuulsZ21AheX-TcSXkpGtcYTXDj4Kz-gy8hFt5560nSeoQCP2ok_M1vQdqOfTXpHFbYNydSBduNDnp5c2XpHAqcXWWaitd2vnYmnBgoQF_XwkjsgX2tFMUJ3uF-pgzqCinZN6WUu40U9cV1MPwH1DUbYaPBfvjEABUYT0"
        />
        <div className="absolute inset-0 bg-[#1A4D2E]/85 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center mt-20">
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white font-bold mb-6 leading-tight drop-shadow-lg">
          Transforma Tu Lectura en <br/>
          <span className="text-accent relative inline-block">
            Tu Mayor Superpoder
             <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent opacity-60" fill="none" viewBox="0 0 200 9" xmlns="http://www.w3.org/2000/svg"><path d="M2.00025 6.99997C25.7509 3.03352 65.0886 -0.99975 198.001 2.99996" stroke="currentColor" strokeLinecap="round" strokeWidth="3"></path></svg>
          </span>
        </h1>
        
        <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light">
          Desbloquea el potencial oculto de tu mente. Aprende a absorber conocimiento a una velocidad que nunca creíste posible.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          <div className="glass-panel rounded-2xl p-6 text-white transform hover:-translate-y-1 transition-transform duration-300 group">
            <BookOpen className="w-10 h-10 text-accent mb-4 mx-auto" />
            <div className="font-display text-4xl font-bold">200</div>
            <div className="text-xs font-bold tracking-widest uppercase text-gray-300 mt-1">Páginas en 5 min</div>
          </div>
          <div className="glass-panel rounded-2xl p-6 text-white transform hover:-translate-y-1 transition-transform duration-300 group">
            <Gauge className="w-10 h-10 text-accent mb-4 mx-auto" />
            <div className="font-display text-4xl font-bold">2000</div>
            <div className="text-xs font-bold tracking-widest uppercase text-gray-300 mt-1">Palabras por Minuto</div>
          </div>
          <div className="glass-panel rounded-2xl p-6 text-white transform hover:-translate-y-1 transition-transform duration-300 group">
            <MapPin className="w-10 h-10 text-accent mb-4 mx-auto" />
            <div className="font-display text-4xl font-bold">16</div>
            <div className="text-xs font-bold tracking-widest uppercase text-gray-300 mt-1">Sedes en todo Perú</div>
          </div>
        </div>

        <a href="#programa" className="inline-flex flex-col items-center text-white hover:text-accent transition-colors group">
          <span className="text-xs font-bold tracking-[0.2em] uppercase mb-2">Descubre cómo funciona</span>
          <ChevronDown className="w-8 h-8 animate-bounce group-hover:text-accent" />
        </a>
      </div>
    </section>
  );
};

export default Hero;