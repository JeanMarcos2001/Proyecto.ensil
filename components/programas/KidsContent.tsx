import React from 'react';

// ==========================================
// CONFIGURACIÓN DE IMAGEN PRINCIPAL (HERO)
// ==========================================
// SUSTITUYE el enlace entre comillas debajo por tu enlace de imagen para Niños (Programa Kids)
const MAIN_IMAGE_URL = "/img/programas/kids.png";

const KidsContent: React.FC = () => {
    return (
        <div className="w-full font-jakarta text-slate-800 min-h-full pb-12 bg-white">
            {/* UNIFORM HERO SECTION: Increased height by 50% */}
            {/* UNIFORM HERO SECTION: Standardized height across all cards */}
            <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-3xl shadow-sm group bg-slate-100 mx-auto mt-2 max-w-[98%]">
                <img
                    alt="Niños Leyendo"
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    src={MAIN_IMAGE_URL}
                />
                {/* Gradient Overlay Uniform */}
                <div className="absolute inset-0 bg-gradient-to-t from-red-900/90 via-red-800/20 to-transparent"></div>

                {/* Text Content Position Uniform */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold tracking-widest uppercase mb-3 w-fit">
                        <span className="material-icons-round text-sm">rocket_launch</span> Programa Kids
                    </div>
                    <h1 className="font-fraunces text-3xl md:text-4xl font-bold leading-none mb-2 text-white drop-shadow-md">
                        <span className="text-yellow-300">Despegue</span> Lector
                    </h1>
                    <p className="text-sm md:text-base text-red-50 font-medium max-w-lg leading-snug">
                        Convertimos la lectura en su superpoder escolar y personal. Energía y enfoque.
                    </p>
                </div>
            </div>

            <main className="px-5 md:px-8 py-8 space-y-8">

                {/* Intro Grid */}
                <div className="grid md:grid-cols-2 gap-6 items-center">
                    <div>
                        <h3 className="text-xl font-bold text-red-900 mb-2 font-fraunces">El hábito que define su futuro</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Entre los 6 y 9 años se consolidan las bases del aprendizaje. Nuestro programa Kids utiliza el color, la gamificación y la estructura para capturar su atención.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                        <div className="flex items-center gap-3 p-3 rounded-2xl bg-red-50 border border-red-100">
                            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600 flex-shrink-0">
                                <span className="material-icons-round text-lg">cake</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-red-900 text-sm">Edad Ideal: 6 a 9 años</h4>
                                <p className="text-xs text-red-700/80">Adaptación según diagnóstico.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-2xl bg-yellow-50 border border-yellow-100">
                            <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center text-yellow-700 flex-shrink-0">
                                <span className="material-icons-round text-lg">stairs</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-yellow-900 text-sm">3 Niveles Progresivos</h4>
                                <p className="text-xs text-yellow-800/80">Kids 1, Kids 2 y Kids 3.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Materials Grid */}
                <div className="bg-slate-50 rounded-3xl p-5 border border-slate-100">
                    <h3 className="font-fraunces text-lg text-slate-900 mb-4 flex items-center gap-2">
                        <span className="material-icons-round text-red-600 bg-red-100 p-1.5 rounded-lg text-lg">backpack</span>
                        Kit de Misión Kids
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-sm text-center hover:scale-105 transition-transform duration-300">
                            <span className="material-icons-round text-red-500 text-2xl mb-1 block">auto_stories</span>
                            <p className="text-xs font-bold text-slate-700">8 Libros</p>
                        </div>
                        <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-sm text-center hover:scale-105 transition-transform duration-300">
                            <span className="material-icons-round text-yellow-500 text-2xl mb-1 block">view_module</span>
                            <p className="text-xs font-bold text-slate-700">Módulo Kids</p>
                        </div>
                        <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-sm text-center hover:scale-105 transition-transform duration-300">
                            <span className="material-icons-round text-purple-500 text-2xl mb-1 block">visibility</span>
                            <p className="text-xs font-bold text-slate-700">Velóptico</p>
                        </div>
                        <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-sm text-center hover:scale-105 transition-transform duration-300">
                            <span className="material-icons-round text-blue-500 text-2xl mb-1 block">work</span>
                            <p className="text-xs font-bold text-slate-700">Maletín</p>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="bg-red-700 rounded-3xl p-6 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 rounded-full blur-3xl opacity-30 -mr-6 -mt-6"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-400 rounded-full blur-3xl opacity-30 -ml-6 -mb-6"></div>

                    <h4 className="font-fraunces font-bold text-lg mb-2 relative z-10">¿Listo para la aventura?</h4>
                    <p className="text-red-100 text-sm mb-4 max-w-md mx-auto relative z-10">
                        Regálale a tu hijo la herramienta de aprendizaje más poderosa.
                    </p>
                    <a href="#contacto" className="inline-flex items-center justify-center gap-2 bg-yellow-400 text-red-900 px-8 py-3.5 rounded-full font-bold text-base hover:bg-yellow-300 transition-colors shadow-lg relative z-10 hover:-translate-y-1 w-full">
                        Iniciar Diagnóstico Kids
                        <span className="material-icons-round text-lg">arrow_forward</span>
                    </a>
                </div>
            </main>
        </div>
    );
};

export default KidsContent;