import React from 'react';

const PreKidsContent: React.FC = () => {
  return (
    <div className="w-full font-jakarta text-slate-800 min-h-full pb-12 bg-white">
        {/* UNIFORM HERO SECTION: Increased height by 50% */}
        <div className="relative w-full h-[480px] md:h-[570px] overflow-hidden rounded-b-[2.5rem] shadow-md group bg-slate-100">
             <img 
                alt="Pre Kids Jugando" 
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcwojmSyPlptLXgCKcoFYOB1UcKQV56RWAeJQB58mFlkniHeV4mFA03BomDsKG6fTAwhfgRLbnu7oA6ecpZ69UtylByIPwpVNwKAPr4Qy5LKO7J-2uAy6DBTKg6hCdvNu--jLuLN3yjBXGrNMzROkZT-Hm7hnLtoPIzPoLLBBX9wlD8JyCJqWjexGXZjrK19NjjwuPMI1K3TXqf5R8eQu5Uy4VVeK7tZ26PN9Li9DgHOh5uhkX4ubrp-YFb0CUtpgk2-8mWj807rs"
             />
             {/* Gradient Overlay Uniform */}
             <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-800/20 to-transparent"></div>
             
             {/* Text Content Position Uniform */}
             <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-bold tracking-widest uppercase mb-3 w-fit border border-white/30">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> Pre Kids
                </div>
                <h1 className="font-fraunces text-3xl md:text-4xl font-bold leading-none mb-2 text-white drop-shadow-md">
                    La Semilla
                </h1>
                <p className="text-sm md:text-base text-green-50 font-medium max-w-sm leading-snug">
                    Metodología lúdica para los más pequeños (4-5 años).
                </p>
             </div>
        </div>

        <main className="px-5 md:px-8 py-8 space-y-8">
            
            {/* Target Audience - Friendly Card */}
            <div className="bg-green-50 rounded-3xl p-5 border border-green-100 flex flex-col md:flex-row items-center gap-5">
                <div className="w-14 h-14 rounded-full bg-white text-green-500 flex items-center justify-center shrink-0 shadow-sm">
                     <span className="material-icons-round text-3xl">child_care</span>
                </div>
                <div>
                    <h4 className="font-bold text-green-900 text-lg mb-1 font-fraunces">Público: 4 y 5 años</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">Estimulación temprana a través del juego, la curiosidad y la asociación de imágenes. Preparamos su cerebro para la lectura formal.</p>
                </div>
            </div>

            {/* Materials List */}
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                     <h3 className="font-fraunces text-lg text-slate-900 mb-4 flex items-center gap-2">
                        <span className="material-icons-round text-green-500 text-xl">inventory_2</span>
                        Materiales Divertidos
                    </h3>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <span className="material-icons-round text-blue-400 text-lg">menu_book</span>
                            <span className="text-xs font-bold text-slate-700">Lecturas ilustradas gigantes (A3)</span>
                        </li>
                        <li className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <span className="material-icons-round text-pink-400 text-lg">draw</span>
                            <span className="text-xs font-bold text-slate-700">Cuaderno de diversión y trazos</span>
                        </li>
                        <li className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <span className="material-icons-round text-purple-400 text-lg">style</span>
                            <span className="text-xs font-bold text-slate-700">Flashcards de alta visibilidad</span>
                        </li>
                    </ul>
                </div>

                <div className="flex flex-col gap-4">
                    {/* Certificado Badge */}
                    <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-3xl p-6 text-white shadow-lg flex items-center justify-between h-full relative overflow-hidden">
                        <div className="relative z-10">
                            <p className="text-[10px] font-bold uppercase tracking-wider opacity-80 mb-1">Resultado Final</p>
                            <p className="font-fraunces text-xl font-bold">Certificado ENSIL</p>
                            <p className="text-[10px] mt-1 text-green-50">Primeros pasos lectores</p>
                        </div>
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm relative z-10">
                             <span className="material-icons-round text-2xl">verified</span>
                        </div>
                        
                        {/* Decorative circles */}
                        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/10 rounded-full"></div>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="pt-2 text-center">
                 <a href="#contacto" className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-green-700 transition-all shadow-lg hover:-translate-y-1 group w-full">
                    Comenzar Aventura Pre-Kids
                    <span className="material-icons-round text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </a>
                <p className="text-center text-[10px] text-slate-400 mt-3">Cupos limitados por sede</p>
            </div>

        </main>
    </div>
  );
};

export default PreKidsContent;