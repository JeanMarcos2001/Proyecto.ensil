import React from 'react';

const PreKidsContent: React.FC = () => {
  return (
    <div className="w-full font-jakarta text-slate-800">
        <header className="mb-12 md:mb-16 pt-12 px-6 md:px-12 max-w-7xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-6 bg-green-50 px-4 py-1.5 rounded-full border border-green-100">
                <span className="w-2 h-2 rounded-full bg-ensil-green animate-pulse"></span>
                <span className="text-ensil-green text-xs font-bold uppercase tracking-widest">Programa Especializado</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <h1 className="font-fraunces font-bold text-5xl md:text-7xl text-ensil-green leading-[1]">
                    PRE KIDS: <br/><span className="text-ensil-gold italic">La Semilla</span> del Lector
                </h1>
                <p className="font-sans text-lg md:text-xl text-slate-600 leading-relaxed font-medium max-w-md mb-2">
                    Desarrollo de habilidades tempranas con metodología lúdica para los más pequeños.
                </p>
            </div>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-7xl mx-auto px-6 md:px-12 pb-24">
            <div className="lg:col-span-7 order-1 lg:order-2">
                <div className="relative w-full h-[600px] lg:h-[750px] rounded-[2.5rem] overflow-hidden shadow-2xl group">
                    <img alt="Niños de 4-5 años en ambiente colorido y lúdico interactuando con flashcards" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcwojmSyPlptLXgCKcoFYOB1UcKQV56RWAeJQB58mFlkniHeV4mFA03BomDsKG6fTAwhfgRLbnu7oA6ecpZ69UtylByIPwpVNwKAPr4Qy5LKO7J-2uAy6DBTKg6hCdvNu--jLuLN3yjBXGrNMzROkZT-Hm7hnLtoPIzPoLLBBX9wlD8JyCJqWjexGXZjrK19NjjwuPMI1K3TXqf5R8eQu5Uy4VVeK7tZ26PN9Li9DgHOh5uhkX4ubrp-YFb0CUtpgk2-8mWj807rs"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-ensil-green/90 via-transparent to-transparent opacity-80"></div>
                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-10 flex flex-col justify-end h-full pointer-events-none">
                        <div className="mt-auto transform transition-transform duration-500 group-hover:-translate-y-2">
                            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white text-xs font-bold uppercase tracking-wider mb-4">
                                Metodología Activa
                            </span>
                            <h2 className="font-fraunces text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight">
                                Aprendizaje que se <br/> <span className="italic text-secondary font-light">siente como juego</span>
                            </h2>
                            <p className="text-white/90 text-lg md:text-xl font-light max-w-lg mb-8 leading-relaxed">
                                Nuestros espacios están diseñados para estimular la curiosidad natural de los niños de 4 y 5 años a través de materiales didácticos exclusivos.
                            </p>
                            <div className="bg-white/95 backdrop-blur-xl p-5 rounded-2xl shadow-lg border border-white/50 inline-flex items-center gap-4 max-w-sm pointer-events-auto">
                                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-ensil-green shrink-0 shadow-sm">
                                    <span className="material-icons-round text-2xl">emoji_objects</span>
                                </div>
                                <div>
                                    <h4 className="font-display font-bold text-lg text-ensil-green mb-0.5">Diagnóstico Gratuito</h4>
                                    <p className="text-xs text-slate-600 leading-snug">
                                        Identifica el potencial de lectura de tu hijo hoy.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 shadow-sm z-20">
                        <span className="text-white font-bold text-sm tracking-wide flex items-center gap-2">
                            <span className="material-icons-round text-secondary text-base">verified</span>
                            Certificado ENSIL
                        </span>
                    </div>
                </div>
                <div className="absolute -z-10 top-20 -right-12 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"></div>
                <div className="absolute -z-10 bottom-20 -left-12 w-72 h-72 bg-ensil-green/10 rounded-full blur-3xl"></div>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-8 order-2 lg:order-1 pt-4">
                <div className="bg-white rounded-3xl p-6 shadow-soft border border-slate-100 flex flex-col sm:flex-row items-center sm:items-start gap-5 transition-transform hover:scale-[1.01]">
                    <div className="w-14 h-14 rounded-2xl bg-ensil-green text-white flex items-center justify-center shrink-0 shadow-lg shadow-ensil-green/20">
                        <span className="material-icons-round text-3xl">child_care</span>
                    </div>
                    <div>
                        <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 text-center sm:text-left">Público Objetivo</span>
                        <div className="font-fraunces font-bold text-slate-900 text-2xl text-center sm:text-left">
                            Mayormente 4 y 5 años
                        </div>
                        <p className="text-sm font-medium text-slate-500 mt-1 text-center sm:text-left">
                            Adaptado según diagnóstico inicial para maximizar resultados.
                        </p>
                    </div>
                </div>
                <div className="bg-slate-50 rounded-[2.5rem] p-6 md:p-8 border border-slate-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-ensil-gold/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <h3 className="font-fraunces text-3xl text-slate-900 mb-8 flex items-center gap-3 relative z-10">
                        <span className="w-8 h-8 rounded-full bg-ensil-green/10 flex items-center justify-center">
                            <span className="material-icons-round text-ensil-green text-lg">inventory_2</span>
                        </span>
                        Materiales Incluidos
                    </h3>
                    <div className="space-y-4 relative z-10">
                        <div className="group bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-transparent hover:border-ensil-green/20 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                                <span className="material-icons-round text-2xl">menu_book</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-base">Lecturas de Comprensión</h4>
                                <p className="text-xs text-slate-500">Formato A3, letras grandes e ilustradas</p>
                            </div>
                        </div>
                        <div className="group bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-transparent hover:border-ensil-green/20 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center text-pink-600 group-hover:scale-110 transition-transform">
                                <span className="material-icons-round text-2xl">draw</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-base">Cuaderno de Diversión</h4>
                                <p className="text-xs text-slate-500">Formato A4, entrenamientos básicos</p>
                            </div>
                        </div>
                        <div className="group bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-transparent hover:border-ensil-green/20 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                                <span className="material-icons-round text-2xl">style</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-base">Flashcards Ilustradas</h4>
                                <p className="text-xs text-slate-500">29.7 x 10.5 cm, alta visibilidad</p>
                            </div>
                        </div>
                        <div className="group bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-transparent hover:border-ensil-green/20 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
                                <span className="material-icons-round text-2xl">backpack</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-base">Maletín ENSIL</h4>
                                <p className="text-xs text-slate-500">Kit personalizado del alumno</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-4 mt-auto">
                    <div className="p-6 bg-ensil-green/5 rounded-3xl border border-ensil-green/10">
                        <p className="text-sm text-center text-slate-600 mb-4 font-medium">
                            ¿Listo para comenzar la aventura?
                        </p>
                        <button className="bg-ensil-green text-white font-bold py-4 px-8 rounded-full hover:bg-[#052e16] transition-all flex items-center justify-center gap-2 shadow-xl shadow-ensil-green/20 w-full transform hover:-translate-y-1">
                            Agenda tu diagnóstico gratuito
                            <span className="material-icons-round">arrow_forward</span>
                        </button>
                        <div className="flex items-center justify-center gap-2 mt-4 text-xs text-slate-500">
                            <span className="w-2 h-2 bg-secondary rounded-full"></span>
                            <span>Cupos limitados por sede este mes</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  );
};

export default PreKidsContent;