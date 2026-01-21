import React from 'react';
import { Brain, BookOpen, MapPin, ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToPrograms = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('programa');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-paper-texture">
        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/50 to-white/80 pointer-events-none"></div>
      </div>

      <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-20">
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-slate-900 font-bold mb-6 leading-tight drop-shadow-sm">
          Transforma Tu Lectura en <br />
          <span className="text-green-700 relative inline-block transition-all duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-green-600 hover:via-green-400 hover:to-green-600">
            Tu Mayor Superpoder
            <svg className="absolute w-full h-3 -bottom-1 left-0 text-yellow-400 opacity-80" fill="none" viewBox="0 0 200 9" xmlns="http://www.w3.org/2000/svg"><path d="M2.00025 6.99997C25.7509 3.03352 65.0886 -0.99975 198.001 2.99996" stroke="currentColor" strokeLinecap="round" strokeWidth="3"></path></svg>
          </span>
        </h1>

        <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium">
          Desbloquea el potencial oculto de tu mente. Aprende a absorber conocimiento a una velocidad que nunca creíste posible.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-2xl p-6 text-slate-800 shadow-lg border border-slate-100 transform hover:-translate-y-1 transition-transform duration-300 group">
            <BookOpen className="w-10 h-10 text-green-700 mb-4 mx-auto" />
            <div className="font-display text-4xl font-bold">200</div>
            <div className="text-xs font-bold tracking-widest uppercase text-slate-500 mt-1">Páginas en 5 min</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-slate-800 shadow-lg border border-slate-100 transform hover:-translate-y-1 transition-transform duration-300 group">
            <Brain className="w-10 h-10 text-green-700 mb-4 mx-auto" />
            <div className="font-display text-4xl font-bold">100%</div>
            <div className="text-xs font-bold tracking-widest uppercase text-slate-500 mt-1">de Comprensión</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-slate-800 shadow-lg border border-slate-100 transform hover:-translate-y-1 transition-transform duration-300 group">
            <MapPin className="w-10 h-10 text-green-700 mb-4 mx-auto" />
            <div className="font-display text-4xl font-bold">16</div>
            <div className="text-xs font-bold tracking-widest uppercase text-slate-500 mt-1">Sedes en todo Perú</div>
          </div>
        </div>

        <a
          href="#programa"
          onClick={scrollToPrograms}
          className="inline-flex flex-col items-center text-slate-600 hover:text-green-700 transition-colors group cursor-pointer"
        >
          <span className="text-xs font-bold tracking-[0.2em] uppercase mb-2">Descubre cómo funciona</span>
          <ChevronDown className="w-8 h-8 animate-bounce group-hover:text-green-700" />
        </a>
      </div>
    </section>
  );
};

export default Hero;