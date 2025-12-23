import React from 'react';

const SedesContent: React.FC = () => {
  return (
    <div className="w-full bg-slate-50 text-slate-800 font-jakarta">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider mb-4">
            Nuestras Sedes
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
            Encuéntranos en <span className="relative inline-block text-green-700">Tu Ciudad
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-yellow-500 opacity-70" preserveAspectRatio="none" viewBox="0 0 100 10">
                <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="8"></path>
              </svg>
            </span>
          </h1>
          <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Estamos presentes en las principales ciudades del Perú. Visita nuestras sedes y potencia tus habilidades de lectura integral.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex overflow-x-auto gap-3 md:gap-4 pb-4 mb-8 justify-start md:justify-center no-scrollbar">
          <button className="whitespace-nowrap px-6 py-3 rounded-full bg-green-700 text-white font-semibold shadow-lg shadow-green-500/30 transform scale-105 transition-all">
            Todo el Perú
          </button>
          <button className="whitespace-nowrap px-6 py-3 rounded-full bg-white text-slate-600 font-medium hover:bg-green-50 transition-colors border border-slate-200">
            Lima Metropolitana
          </button>
          <button className="whitespace-nowrap px-6 py-3 rounded-full bg-white text-slate-600 font-medium hover:bg-green-50 transition-colors border border-slate-200">
            Costa Norte
          </button>
          <button className="whitespace-nowrap px-6 py-3 rounded-full bg-white text-slate-600 font-medium hover:bg-green-50 transition-colors border border-slate-200">
            Sierra Central
          </button>
          <button className="whitespace-nowrap px-6 py-3 rounded-full bg-white text-slate-600 font-medium hover:bg-green-50 transition-colors border border-slate-200">
            Sur del País
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Locations List */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Highlighted Card (Lima) */}
            <div className="group bg-green-700 rounded-3xl p-6 shadow-soft hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="material-icons-round text-9xl">location_city</span>
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-icons-round text-yellow-400">star</span>
                  <span className="text-sm font-bold uppercase tracking-wider opacity-90 text-yellow-400">Sede Principal</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Lima - Miraflores</h3>
                <p className="opacity-90 text-sm mb-4 leading-relaxed">Av. José Pardo 456, Oficina 302.<br/>Ref: Frente a Saga Falabella.</p>
                <div className="flex flex-col gap-2 mb-6">
                  <div className="flex items-center gap-2 text-sm opacity-90">
                    <span className="material-icons-round text-base">phone</span>
                    <span>(01) 241-5588</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm opacity-90">
                    <span className="material-icons-round text-base">smartphone</span>
                    <span>987 654 321</span>
                  </div>
                </div>
                <a className="inline-flex items-center gap-2 bg-white text-green-700 px-5 py-2.5 rounded-full text-sm font-bold hover:bg-green-50 transition-colors w-full justify-center md:w-auto" href="#">
                  Ver en Google Maps
                  <span className="material-icons-round text-sm">arrow_outward</span>
                </a>
              </div>
            </div>

            {/* Standard Card (Trujillo) */}
            <div className="group bg-white border border-transparent rounded-3xl p-6 shadow-soft hover:shadow-lg transition-all duration-300 hover:border-green-200">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-green-700 transition-colors">Trujillo</h3>
                <span className="bg-green-50 text-green-700 rounded-full p-2 flex items-center justify-center">
                  <span className="material-icons-round text-lg">place</span>
                </span>
              </div>
              <p className="text-slate-500 text-sm mb-4 leading-relaxed h-12">Av. Larco 890, Urb. La Merced.<br/>Ref: Cerca a la UNT.</p>
              <div className="space-y-2 mb-6 border-t border-slate-100 pt-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="material-icons-round text-green-700 text-base">phone</span>
                  <span>(044) 223-344</span>
                </div>
              </div>
              <a className="inline-flex items-center justify-center w-full gap-2 border border-slate-200 text-slate-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-700 hover:text-white hover:border-green-700 transition-all" href="#">
                Ver Mapa
              </a>
            </div>

            {/* Standard Card (Arequipa) */}
            <div className="group bg-white border border-transparent rounded-3xl p-6 shadow-soft hover:shadow-lg transition-all duration-300 hover:border-green-200">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-green-700 transition-colors">Arequipa</h3>
                <span className="bg-green-50 text-green-700 rounded-full p-2 flex items-center justify-center">
                  <span className="material-icons-round text-lg">place</span>
                </span>
              </div>
              <p className="text-slate-500 text-sm mb-4 leading-relaxed h-12">Calle Mercaderes 321, Cercado.<br/>Ref: A media cuadra de la Plaza.</p>
              <div className="space-y-2 mb-6 border-t border-slate-100 pt-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="material-icons-round text-green-700 text-base">phone</span>
                  <span>(054) 202-020</span>
                </div>
              </div>
              <a className="inline-flex items-center justify-center w-full gap-2 border border-slate-200 text-slate-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-700 hover:text-white hover:border-green-700 transition-all" href="#">
                Ver Mapa
              </a>
            </div>

            {/* Standard Card (Piura) */}
            <div className="group bg-white border border-transparent rounded-3xl p-6 shadow-soft hover:shadow-lg transition-all duration-300 hover:border-green-200">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-green-700 transition-colors">Piura</h3>
                <span className="bg-green-50 text-green-700 rounded-full p-2 flex items-center justify-center">
                  <span className="material-icons-round text-lg">place</span>
                </span>
              </div>
              <p className="text-slate-500 text-sm mb-4 leading-relaxed h-12">Av. Grau 450, Centro.<br/>Ref: Costado del Banco de la Nación.</p>
              <div className="space-y-2 mb-6 border-t border-slate-100 pt-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="material-icons-round text-green-700 text-base">phone</span>
                  <span>(073) 331-122</span>
                </div>
              </div>
              <a className="inline-flex items-center justify-center w-full gap-2 border border-slate-200 text-slate-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-700 hover:text-white hover:border-green-700 transition-all" href="#">
                Ver Mapa
              </a>
            </div>

            {/* Standard Card (Cusco) */}
            <div className="group bg-white border border-transparent rounded-3xl p-6 shadow-soft hover:shadow-lg transition-all duration-300 hover:border-green-200">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-green-700 transition-colors">Cusco</h3>
                <span className="bg-green-50 text-green-700 rounded-full p-2 flex items-center justify-center">
                  <span className="material-icons-round text-lg">place</span>
                </span>
              </div>
              <p className="text-slate-500 text-sm mb-4 leading-relaxed h-12">Av. El Sol 600, Wanchaq.<br/>Ref: Frente al Correo.</p>
              <div className="space-y-2 mb-6 border-t border-slate-100 pt-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="material-icons-round text-green-700 text-base">phone</span>
                  <span>(084) 225-566</span>
                </div>
              </div>
              <a className="inline-flex items-center justify-center w-full gap-2 border border-slate-200 text-slate-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-700 hover:text-white hover:border-green-700 transition-all" href="#">
                Ver Mapa
              </a>
            </div>

            {/* Standard Card (Chiclayo) */}
            <div className="group bg-white border border-transparent rounded-3xl p-6 shadow-soft hover:shadow-lg transition-all duration-300 hover:border-green-200">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-green-700 transition-colors">Chiclayo</h3>
                <span className="bg-green-50 text-green-700 rounded-full p-2 flex items-center justify-center">
                  <span className="material-icons-round text-lg">place</span>
                </span>
              </div>
              <p className="text-slate-500 text-sm mb-4 leading-relaxed h-12">Calle San José 800.<br/>Ref: A una cuadra del Parque Principal.</p>
              <div className="space-y-2 mb-6 border-t border-slate-100 pt-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="material-icons-round text-green-700 text-base">phone</span>
                  <span>(074) 228-899</span>
                </div>
              </div>
              <a className="inline-flex items-center justify-center w-full gap-2 border border-slate-200 text-slate-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-700 hover:text-white hover:border-green-700 transition-all" href="#">
                Ver Mapa
              </a>
            </div>
          </div>

          {/* Map Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-3xl p-3 shadow-soft border border-slate-100 h-[600px] flex flex-col">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-200">
                <iframe 
                  allowFullScreen 
                  className="absolute inset-0 grayscale-[0.2] hover:grayscale-0 transition-all duration-500 w-full h-full" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade" 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.666613320392!2d-77.03196292415707!3d-12.113063842270928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8172906e577%3A0x629c152431631551!2sAv.%20Jos%C3%A9%20Pardo%20456%2C%20Miraflores%2015074!5e0!3m2!1sen!2spe!4v1699999999999!5m2!1sen!2spe" 
                  title="Mapa de Sedes ENSIL"
                ></iframe>
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-lg border border-slate-100 flex justify-between items-center">
                  <div className="text-xs font-semibold text-slate-600">
                    Mostrando 6 sedes
                  </div>
                  <button className="text-green-700 hover:underline text-xs font-bold flex items-center gap-1">
                    Ampliar Mapa <span className="material-icons-round text-sm">open_in_new</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 bg-gradient-to-br from-green-700 to-green-800 rounded-3xl p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-yellow-500 opacity-20 rounded-full blur-2xl pointer-events-none"></div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">¿Buscas atención personalizada?</h2>
            <p className="text-green-50 text-lg">
              Nuestro compromiso es presencial. Agenda una visita guiada en la sede más cercana y conoce nuestro método de lectura integral en persona.
            </p>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <button className="bg-white text-green-700 px-8 py-3.5 rounded-full font-bold hover:bg-green-50 transition-colors shadow-lg whitespace-nowrap">
              Agendar Visita
            </button>
            <button className="bg-transparent border-2 border-white/30 text-white px-8 py-3.5 rounded-full font-bold hover:bg-white/10 transition-colors whitespace-nowrap">
              Llamar a Asesor
            </button>
          </div>
        </div>

      </main>
    </div>
  );
};

export default SedesContent;