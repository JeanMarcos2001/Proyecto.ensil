import React, { useState, useRef } from 'react';
import { Brain, BookOpen, MapPin, ChevronDown } from 'lucide-react';
import { smoothScrollTo } from '../../utils/scroll';

const Hero: React.FC = () => {

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (textRef.current) {
      const rect = textRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <section id="inicio" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-green-50 via-green-100 to-white">
        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/50 to-white/80 pointer-events-none"></div>
      </div>

      <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-20">
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-slate-900 font-bold mb-6 leading-tight drop-shadow-sm">
          Transforma Tu Lectura en <br />
          <span
            ref={textRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative inline-block cursor-default select-none py-2"
          >
            {/* Base Text (Dark Rich Gradient) */}
            <span className="bg-gradient-to-r from-green-900 via-emerald-800 to-green-900 bg-clip-text text-transparent relative z-10">
              Tu Mayor Superpoder
            </span>

            {/* Spotlight Overlay (Vibrant Multi-tone Gradient) */}
            <span
              className="absolute top-0 left-0 bg-gradient-to-r from-lime-400 via-emerald-500 to-green-600 bg-clip-text text-transparent z-20 pointer-events-none py-2"
              style={{
                opacity: isHovered ? 1 : 0,
                maskImage: `radial-gradient(150px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
                WebkitMaskImage: `radial-gradient(150px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
                transition: 'opacity 0.2s ease',
              }}
            >
              Tu Mayor Superpoder
            </span>
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
          onClick={(e) => {
            e.preventDefault();
            smoothScrollTo('programa', 1200);
          }}
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