import React, { useState } from 'react';
import { Zap, Brain, Infinity as InfinityIcon, Focus, ChevronDown } from 'lucide-react';
import { smoothScrollTo } from '../../utils/scroll';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const Programs: React.FC = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal(0.15);
  // Estado para controlar qué tarjeta está activa. null significa que ninguna lo está.
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const cards = [
    {
      icon: Zap,
      title: "Lectura Integral",
      description: "Elimina la subvocalización y expande tu campo visual, logrando que no solo entiendas, sino que disfrutes cada lectura.",
      image: "/img/sec1.4/Lectura Integral.webp"
    },
    {
      icon: Brain,
      title: "Comprensión Total",
      description: "Entiende conceptos complejos al primer vistazo. Profundidad analítica sin sacrificar velocidad.",
      image: "/img/sec1.4/Comprensión Total.webp"
    },
    {
      icon: InfinityIcon,
      title: "Memoria Eterna",
      description: "Desarrolla una retención profunda que te permite interiorizar información clave a largo plazo sin trucos mecánicos.",
      image: "/img/sec1.4/Memoria Eterna.webp"
    },
    {
      icon: Focus,
      title: "Foco Absoluto",
      description: "Entrena tu mente para bloquear distracciones y entrar en estados de flujo profundo instantáneamente.",
      image: "/img/sec1.4/Foco Absoluto.webp"
    }
  ];

  return (
    <section id="programa" className="w-full py-16 md:py-24 flex flex-col justify-center items-center overflow-x-clip relative z-10 bg-white">
      <div
        className="w-[95%] rounded-[36px] relative flex flex-col pt-12 lg:pt-20 pb-12 lg:pb-16"
        style={{ background: 'linear-gradient(135deg, #016A31 0%, #1a9e4a 40%, #5ec832 75%, #88d62c 100%)' }}
      >
        {/* Watermark */}
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none rounded-[36px] overflow-hidden">
          <img src="/img/niveles/sonrisas.webp" alt="" className="w-full h-full object-cover" loading="lazy" />
        </div>

        <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-display text-4xl md:text-5xl text-white font-bold leading-tight">
              Eleva tu <span className="text-yellow-300">Intelecto.</span><br />
              Domina el conocimiento.
            </h2>
            <p className="mt-6 text-white/80 max-w-3xl mx-auto text-lg leading-relaxed font-light">
              Nuestro programa integral enfatiza la comprensión y reprograma la forma en que tu cerebro procesa la información, transformando la lectura en un hábito de alto rendimiento.
            </p>
          </div>

          <div
            ref={sectionRef as React.RefObject<HTMLDivElement>}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {cards.map((card, index) => (
              <div
                key={`anim-${index}`}
                className="transition-all duration-[1000ms] ease-out transform"
                style={{
                  transitionDelay: `${index * 200}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)'
                }}
              >
                <div
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)} // Vuelve a deseleccionar al salir
                  className={`
                    rounded-2xl border transition-all duration-300 cursor-default flex flex-col overflow-hidden h-full group
                    ${activeIndex === index
                      ? 'bg-white border-white text-slate-900 shadow-2xl -translate-y-3'
                      : 'bg-white/10 backdrop-blur-md border-white/20 text-white shadow-sm hover:shadow-lg hover:-translate-y-1'
                    }
                  `}
                >
                  <div className="h-[432px] overflow-hidden relative w-full mb-6 rounded-t-2xl transform-gpu">
                    <div className={`absolute inset-0 z-10 transition-colors duration-300 ${activeIndex === index ? 'bg-black/20' : 'bg-black/0'}`}></div>
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className={`
                    absolute bottom-4 left-4 z-20 w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 backdrop-blur-md
                    ${activeIndex === index
                        ? 'bg-[#016A31] text-white shadow-md'
                        : 'bg-white/90 text-[#016A31] shadow-md'
                      }
                  `}>
                      <card.icon size={24} strokeWidth={1.5} />
                    </div>
                  </div>

                  <div className="px-6 pb-8 flex-1 flex flex-col">
                    <h3 className={`font-display text-3xl font-semibold mb-3 ${activeIndex === index ? 'text-slate-900' : 'text-white'}`}>
                      {card.title}
                    </h3>
                    <p className={`text-sm leading-relaxed ${activeIndex === index ? 'text-slate-600' : 'text-white/80'}`}>
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Down Button */}
          <div className="flex justify-center mt-12 md:mt-16">
            <a
              href="#promesa"
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo('promesa', 1200);
              }}
              className="group flex flex-col items-center justify-center cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full border border-white/50 text-white/70 flex items-center justify-center group-hover:bg-white group-hover:text-green-800 group-hover:border-white transition-all duration-300 shadow-sm">
                <ChevronDown size={20} />
              </div>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Programs;