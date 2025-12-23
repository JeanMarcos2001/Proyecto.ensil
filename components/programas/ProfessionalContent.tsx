import React from 'react';

const ProfessionalContent: React.FC = () => {
  return (
    <div className="w-full bg-background-light text-slate-800 font-jakarta">
        <header className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
            <img alt="Profesionales exitosos demostrando habilidades analíticas y de liderazgo" className="absolute inset-0 w-full h-full object-cover object-center" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMPH8_QInqfiaazpOYxFbGXJLmx17yIoEWd4BS29iswkw7iKPlvbK4pquxjUej8Bnf95TTdGMExS1LBfBpe1iCIp9J_WushbPW2PDknMsf14h_B1Ljkza4-bXQmPHFrWoxWe6cu5Yo5klhkcWKXKbjv-1UtYypcoo4UKVPufRpunsBPDgOCoSSbmTDBe-dMgsrPf-as3-4HqCd4KJiC4QScA3_UMi1HsJEwCayizrIduSv5wXP8GyIBJRAjEmS_9dENVL1vhCiMnE"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute inset-0 flex flex-col justify-end max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-24 lg:pb-32 text-white">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-white text-xs font-bold tracking-wider uppercase mb-4 border border-green-400/30">
                    Nivel Superior
                </div>
                <h1 className="font-fraunces text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 drop-shadow-lg">
                    PROFESIONAL: <br/><span className="italic text-ensil-gold">La Maestría en Lectura</span>
                </h1>
                <p className="font-body text-xl md:text-2xl leading-relaxed max-w-3xl drop-shadow-md">
                    Un programa estructurado por niveles donde avanzas cumpliendo metas reales y demostrables, diseñado para la alta exigencia académica y laboral.
                </p>
            </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                <div className="lg:col-span-2 flex flex-col gap-12">
                    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-soft border border-slate-100 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                        <div>
                            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Edad Recomendada</span>
                            <div className="flex items-center gap-2">
                                <span className="material-icons-round text-ensil-gold">person</span>
                                <span className="text-lg font-bold text-slate-800">Desde 9 años en adelante</span>
                            </div>
                            <span className="text-sm text-slate-500 italic ml-8">(según diagnóstico)</span>
                        </div>
                        <div className="h-px sm:h-12 w-full sm:w-px bg-slate-200"></div>
                        <div>
                            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Estructura</span>
                            <div className="flex items-center gap-2">
                                <span className="material-icons-round text-ensil-gold">layers</span>
                                <span className="text-lg font-bold text-slate-800">20 Módulos Secuenciales</span>
                            </div>
                            <span className="text-sm text-slate-500 ml-8">Divididos en 4 etapas</span>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-fraunces text-2xl text-slate-800 mb-6">Materiales y Herramientas</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-100 hover:border-ensil-gold/50 transition-colors shadow-sm">
                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600">
                                    <span className="material-icons-round">library_books</span>
                                </div>
                                <span className="font-medium text-slate-700">20 Módulos de entrenamiento avanzado</span>
                            </div>
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-100 hover:border-ensil-gold/50 transition-colors shadow-sm">
                                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0 text-purple-600">
                                    <span className="material-icons-round">visibility</span>
                                </div>
                                <span className="font-medium text-slate-700">Módulo de Gimnasia Ocular</span>
                            </div>
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-100 hover:border-ensil-gold/50 transition-colors shadow-sm">
                                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0 text-amber-600">
                                    <span className="material-icons-round">trending_up</span>
                                </div>
                                <span className="font-medium text-slate-700">Módulo de Lectura Progresiva</span>
                            </div>
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-100 hover:border-ensil-gold/50 transition-colors shadow-sm">
                                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 text-emerald-600">
                                    <span className="material-icons-round">work</span>
                                </div>
                                <span className="font-medium text-slate-700">Maletín ENSIL profesional</span>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-fraunces text-2xl text-slate-800 mb-4">Sistema de Avance por Metas</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <span className="material-icons-round text-ensil-gold mt-0.5">check_circle</span>
                                    <span className="text-slate-600">Cada módulo requiere cumplir una meta específica de <strong>palabras por minuto</strong> + evaluación psicopedagógica.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="material-icons-round text-ensil-gold mt-0.5">school</span>
                                    <span className="text-slate-600">Graduación oficial al completar exitosamente el módulo 20.</span>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-ensil-warning border-l-4 border-ensil-warning-border p-5 rounded-r-lg flex gap-4 items-start">
                            <span className="material-icons-round text-orange-500 mt-1">warning_amber</span>
                            <div>
                                <p className="text-orange-800 font-medium text-sm leading-relaxed">
                                    Si no cumples la meta de palabras por minuto, permaneces en el mismo módulo. No avanzamos por tiempo, avanzamos por <span className="font-bold uppercase">LOGROS REALES</span>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-1 relative">
                    <div className="sticky top-24 space-y-8">
                        <div className="bg-white p-6 rounded-2xl shadow-soft border border-slate-100 text-center">
                            <h4 className="font-fraunces text-xl text-slate-800 mb-2">¿Listo para el siguiente nivel?</h4>
                            <p className="text-sm text-slate-500 mb-6">Comienza con una evaluación detallada de tus capacidades actuales.</p>
                            <button className="w-full bg-ensil-green text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group">
                                Agenda tu diagnóstico gratuito
                                <span className="material-icons-round group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </button>
                            <p className="text-xs text-slate-400 mt-4 flex items-center justify-center gap-1">
                                <span className="material-icons-round text-xs">lock</span> Sin compromiso de compra
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
  );
};

export default ProfessionalContent;