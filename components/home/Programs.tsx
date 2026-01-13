import React, { useState } from 'react';
import { Zap, Brain, Infinity as InfinityIcon, Focus } from 'lucide-react';

const Programs: React.FC = () => {
  // Estado para controlar qué tarjeta está activa. 
  // 1 corresponde al índice de la segunda tarjeta (Comprensión Total) que es la activa por defecto.
  const [activeIndex, setActiveIndex] = useState<number>(1);

  const cards = [
    {
      icon: Zap,
      title: "Lectura Integral",
      description: "Elimina la subvocalización y expande tu campo visual, logrando que no solo entiendas, sino que disfrutes cada lectura."
    },
    {
      icon: Brain,
      title: "Comprensión Total",
      description: "Entiende conceptos complejos al primer vistazo. Profundidad analítica sin sacrificar velocidad."
    },
    {
      icon: InfinityIcon,
      title: "Memoria Eterna",
      description: "Desarrolla una retención profunda que te permite interiorizar información clave a largo plazo sin trucos mecánicos."
    },
    {
      icon: Focus,
      title: "Foco Absoluto",
      description: "Entrena tu mente para bloquear distracciones y entrar en estados de flujo profundo instantáneamente."
    }
  ];

  return (
    <section id="programa" className="py-24 px-4 bg-background-light">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl text-gray-900 font-bold leading-tight">
            Eleva tu <span className="text-primary">Intelecto.</span><br/>
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
                p-8 rounded-xl border transition-all duration-300 cursor-default flex flex-col
                ${activeIndex === index
                  ? 'bg-[#285626] border-[#285626] text-white shadow-xl -translate-y-2'
                  : 'bg-white border-gray-100 text-gray-900 shadow-sm hover:shadow-lg'
                }
              `}
            >
              <div className={`
                w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300
                ${activeIndex === index
                  ? 'bg-white/20 text-white'
                  : 'bg-green-50 text-[#285626]'
                }
              `}>
                <card.icon size={32} strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-2xl font-bold mb-3">
                {card.title}
              </h3>
              <p className={`text-sm leading-relaxed ${activeIndex === index ? 'text-white/90' : 'text-gray-600'}`}>
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;