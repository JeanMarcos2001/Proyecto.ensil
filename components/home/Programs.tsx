import React from 'react';
import { Zap, Brain, Infinity as InfinityIcon, Focus } from 'lucide-react';

const Programs: React.FC = () => {
  return (
    <section id="programa" className="py-24 px-4 bg-background-light">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl text-gray-900 font-bold leading-tight">
            Eleva tu <span className="text-primary">Intelecto.</span><br/>
            Domina el conocimiento.
          </h2>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed font-light">
            Nuestro programa integral no solo aumenta tu velocidad, sino que reprograma la forma en que tu cerebro procesa la información.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 group">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
              <Zap size={32} strokeWidth={1.5} />
            </div>
            <h3 className="font-display text-2xl font-bold text-gray-900 mb-3">Lectura Veloz</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Elimina la subvocalización y expande tu campo visual para consumir libros enteros en minutos.
            </p>
          </div>

          {/* Card 2 (Highlighted) */}
          <div className="bg-primary p-8 rounded-3xl shadow-xl transition-shadow border border-primary text-white transform md:-translate-y-4">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6 text-white">
              <Brain size={32} strokeWidth={1.5} />
            </div>
            <h3 className="font-display text-2xl font-bold mb-3">Comprensión Total</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Entiende conceptos complejos al primer vistazo. Profundidad analítica sin sacrificar velocidad.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 group">
            <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-6 text-primary">
              <InfinityIcon size={32} strokeWidth={1.5} />
            </div>
            <h3 className="font-display text-2xl font-bold text-gray-900 mb-3">Memoria Eterna</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Técnicas avanzadas de mnemotecnia para retener información clave a largo plazo.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 group">
            <div className="w-14 h-14 bg-yellow-50 rounded-2xl flex items-center justify-center mb-6 text-yellow-600">
              <Focus size={32} strokeWidth={1.5} />
            </div>
            <h3 className="font-display text-2xl font-bold text-gray-900 mb-3">Foco Absoluto</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Entrena tu mente para bloquear distracciones y entrar en estados de flujo profundo instantáneamente.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;