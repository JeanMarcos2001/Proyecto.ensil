import React from 'react';

const ProfessionalContent: React.FC = () => {
    return (
        <div className="w-full bg-white text-slate-800 font-jakarta min-h-full pb-12">
            {/* UNIFORM HERO SECTION: Increased height by 50% */}
            {/* UNIFORM HERO SECTION: Standardized height across all cards */}
            <header className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-3xl shadow-sm group bg-slate-900 mx-auto mt-2 max-w-[98%]">
                <img
                    alt="Profesional Lectura"
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMPH8_QInqfiaazpOYxFbGXJLmx17yIoEWd4BS29iswkw7iKPlvbK4pquxjUej8Bnf95TTdGMExS1LBfBpe1iCIp9J_WushbPW2PDknMsf14h_B1Ljkza4-bXQmPHFrWoxWe6cu5Yo5klhkcWKXKbjv-1UtYypcoo4UKVPufRpunsBPDgOCoSSbmTDBe-dMgsrPf-as3-4HqCd4KJiC4QScA3_UMi1HsJEwCayizrIduSv5wXP8GyIBJRAjEmS_9dENVL1vhCiMnE"
                />
                {/* Gradient Overlay Uniform */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-800/40 to-transparent"></div>

                {/* Text Content Position Uniform */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 text-white">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-emerald-200 text-[10px] font-bold tracking-widest uppercase mb-3 border border-white/20 w-fit">
                        Nivel Superior
                    </div>
                    <h1 className="font-fraunces text-3xl md:text-4xl font-bold leading-none mb-3 drop-shadow-lg">
                        Profesional
                    </h1>
                    <p className="font-body text-sm md:text-base text-slate-200 font-light leading-snug max-w-2xl border-l-2 border-emerald-500 pl-3">
                        Maestría en lectura y gestión del conocimiento para la alta exigencia académica y laboral.
                    </p>
                </div>
            </header>

            <main className="px-5 md:px-8 py-8 space-y-8">

                {/* Key Stats Row - Spacious */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                        <div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">Perfil de Ingreso</span>
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-slate-900">9 años +</span>
                            </div>
                            <p className="text-[10px] text-slate-400 mt-0.5">Estudiantes y Ejecutivos</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white text-slate-700 border border-slate-200 flex items-center justify-center">
                            <span className="material-icons-round text-lg">person</span>
                        </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                        <div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">Duración</span>
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-slate-900">20 Módulos</span>
                            </div>
                            <p className="text-[10px] text-slate-400 mt-0.5">Avance por objetivos</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white text-slate-700 border border-slate-200 flex items-center justify-center">
                            <span className="material-icons-round text-lg">layers</span>
                        </div>
                    </div>
                </div>

                {/* Content Body */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div>
                        <h3 className="font-fraunces text-lg text-slate-900 mb-3 font-bold">Herramientas del Programa</h3>
                        <p className="text-slate-600 mb-4 leading-relaxed text-xs">
                            Un sistema diseñado para profesionales que no pueden permitirse perder tiempo. Optimizamos tu cerebro como un atleta de alto rendimiento.
                        </p>
                        <div className="space-y-2.5">
                            <div className="flex items-start gap-3 p-3 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500/30 transition-colors shadow-sm">
                                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0 text-white shadow-md">
                                    <span className="material-icons-round text-sm">library_books</span>
                                </div>
                                <div>
                                    <span className="text-xs font-bold text-slate-800 block">20 Módulos de Entrenamiento</span>
                                    <span className="text-[10px] text-slate-500">Estructura progresiva de dificultad.</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500/30 transition-colors shadow-sm">
                                <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center flex-shrink-0 text-white shadow-md">
                                    <span className="material-icons-round text-sm">visibility</span>
                                </div>
                                <div>
                                    <span className="text-xs font-bold text-slate-800 block">Gimnasia Ocular Avanzada</span>
                                    <span className="text-[10px] text-slate-500">Expansión del campo visual.</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500/30 transition-colors shadow-sm">
                                <div className="w-8 h-8 rounded-lg bg-slate-600 flex items-center justify-center flex-shrink-0 text-white shadow-md">
                                    <span className="material-icons-round text-sm">work</span>
                                </div>
                                <div>
                                    <span className="text-xs font-bold text-slate-800 block">Maletín Profesional</span>
                                    <span className="text-[10px] text-slate-500">Material físico exclusivo.</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {/* Warning / Methodology */}
                        <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-5 relative overflow-hidden h-full flex flex-col justify-center">
                            <div className="absolute -right-6 -top-6 text-emerald-200/50">
                                <span className="material-icons-round text-8xl">verified</span>
                            </div>
                            <h4 className="font-bold text-emerald-900 text-sm mb-2 relative z-10 flex items-center gap-2">
                                <span className="material-icons-round text-emerald-600">psychology</span>
                                Metodología de Logros
                            </h4>
                            <p className="text-emerald-800 text-xs leading-relaxed relative z-10 font-medium mb-2">
                                A diferencia de otros cursos, aquí <span className="bg-white px-1 rounded text-emerald-950 font-bold">no avanzas por tiempo</span>, avanzas por resultados.
                            </p>
                            <p className="text-emerald-700/80 text-[10px] leading-relaxed relative z-10">
                                Si en una sesión no alcanzas la meta de palabras por minuto (PPM) y comprensión (%), reforzamos el módulo sin costo adicional.
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="pt-2 text-center">
                    <a href="#contacto" className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 hover:-translate-y-1 group w-full">
                        Agendar Diagnóstico Profesional
                        <span className="material-icons-round text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </a>
                    <p className="text-center text-[10px] text-slate-400 mt-3">Evaluación gratuita de velocidad y comprensión</p>
                </div>
            </main>
        </div>
    );
};

export default ProfessionalContent;