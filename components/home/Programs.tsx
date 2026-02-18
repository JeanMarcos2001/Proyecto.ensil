import React, { useState } from 'react';
import { Zap, Brain, Infinity as InfinityIcon, Focus, ChevronDown } from 'lucide-react';

const Programs: React.FC = () => {
  // Estado para controlar qué tarjeta está activa. 
  // 1 corresponde al índice de la segunda tarjeta (Comprensión Total) que es la activa por defecto.
  const [activeIndex, setActiveIndex] = useState<number>(1);

  const cards = [
    {
      icon: Zap,
      title: "Lectura Integral",
      description: "Elimina la subvocalización y expande tu campo visual, logrando que no solo entiendas, sino que disfrutes cada lectura.",
      image: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80&w=800"
    },
    {
      icon: Brain,
      title: "Comprensión Total",
      description: "Entiende conceptos complejos al primer vistazo. Profundidad analítica sin sacrificar velocidad.",
      image: "https://images.unsplash.com/photo-1555445054-d166d1295a55?auto=format&fit=crop&q=80&w=800"
    },
    {
      icon: InfinityIcon,
      title: "Memoria Eterna",
      description: "Desarrolla una retención profunda que te permite interiorizar información clave a largo plazo sin trucos mecánicos.",
      image: "https://images.unsplash.com/photo-1564325724739-bae0bd08762c?auto=format&fit=crop&q=80&w=800"
    },
    {
      icon: Focus,
      title: "Foco Absoluto",
      description: "Entrena tu mente para bloquear distracciones y entrar en estados de flujo profundo instantáneamente.",
      image: "https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <section id="programa" className="min-h-screen py-24 px-4 bg-white flex flex-col justify-center relative">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl text-gray-900 font-bold leading-tight">
            Eleva tu <span className="text-primary">Intelecto.</span><br />
            Domina el conocimiento.
          </h2>
          <p className="mt-6 text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed font-light">
            Nuestro programa integral enfatiza la comprensión y reprograma la forma en que tu cerebro procesa la información, transformando la lectura en un hábito de alto rendimiento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(1)} // Vuelve a activar la tarjeta por defecto (índice 1) al salir
              className={`
                rounded-2xl border transition-all duration-300 cursor-default flex flex-col overflow-hidden h-full group
                ${activeIndex === index
                  ? 'bg-[#285626] border-[#285626] text-white shadow-xl -translate-y-2'
                  : 'bg-white border-gray-100 text-gray-900 shadow-sm hover:shadow-lg'
                }
              `}
            >
              <div className="h-48 overflow-hidden relative w-full mb-6">
                <div className={`absolute inset-0 z-10 transition-colors duration-300 ${activeIndex === index ? 'bg-black/20' : 'bg-black/0'}`}></div>
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`
                  absolute bottom-4 left-4 z-20 w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 backdrop-blur-md
                  ${activeIndex === index
                    ? 'bg-white/20 text-white border border-white/30'
                    : 'bg-white/90 text-[#285626] shadow-md'
                  }
                `}>
                  <card.icon size={24} strokeWidth={1.5} />
                </div>
              </div>

              <div className="px-6 pb-8 flex-1 flex flex-col">
                <h3 className="font-display text-2xl font-bold mb-3">
                  {card.title}
                </h3>
                <p className={`text-sm leading-relaxed ${activeIndex === index ? 'text-white/90' : 'text-gray-600'}`}>
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Down Button */}
      <div className="flex justify-center mt-12 md:mt-16 animate-bounce">
        <a
          href="#promesa"
          onClick={(e) => {
            e.preventDefault();
            const element = document.getElementById('promesa');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="group flex flex-col items-center gap-2 text-gray-400 hover:text-primary transition-colors duration-300 cursor-pointer"
        >
          <span className="text-xs font-bold uppercase tracking-widest">Seguir Bajando</span>
          <div className="w-10 h-10 rounded-full border border-current flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
            <ChevronDown size={20} />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Programs;