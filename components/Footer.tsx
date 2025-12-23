import React from 'react';
import { Mail, Phone, MapPin, Globe, ChevronDown, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <div className="w-full bg-background-light flex flex-col items-center justify-end pb-0 relative">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Floating CTA Card */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl cta-gradient text-white mb-[-80px] p-8 md:p-16 text-center transform translate-y-0 z-20">
          <div className="absolute top-0 left-0 w-full h-full bg-white opacity-5 mix-blend-overlay pointer-events-none"></div>
          <h2 className="font-serif text-3xl md:text-5xl mb-6 leading-tight relative z-10 font-medium">
            ¿Listo para transformar tu lectura?
          </h2>
          <p className="font-body text-gray-200 text-lg md:text-xl max-w-2xl mx-auto mb-10 relative z-10 font-light">
            Agenda una evaluación gratuita y descubre cómo ENSIL puede ayudarte a alcanzar tu máximo potencial intelectual.
          </p>
          <button className="bg-white text-primary hover:bg-gray-100 font-bold py-4 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white relative z-10">
            Agende ya una evaluación gratuita
          </button>
        </div>

        {/* Main Footer Content */}
        <footer className="bg-surface-light rounded-t-3xl shadow-xl pt-32 pb-10 px-8 md:px-12 w-full relative z-0 border-t border-gray-100">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200 pb-10 mb-10">
            <div className="flex items-center gap-3 mb-6 md:mb-0">
              <div className="flex items-center gap-2 text-primary">
                 <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-serif italic font-bold text-xl">E</div>
                <span className="font-display text-2xl font-bold text-primary tracking-wide">ENSIL PERÚ</span>
              </div>
            </div>
            <div className="text-left md:text-right">
              <p className="font-serif text-2xl text-gray-800 italic">
                "La mejor herencia... la felicidad"
              </p>
              <p className="text-sm text-gray-500 mt-2 font-medium">
                Transformación intelectual que realmente funciona.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div className="flex flex-col space-y-4">
              <h3 className="font-display text-lg text-gray-900 font-bold">El Programa</h3>
              <ul className="space-y-3">
                <li><a className="text-gray-500 hover:text-primary transition-colors text-sm font-medium" href="#">Beneficios</a></li>
                <li><a className="text-gray-500 hover:text-primary transition-colors text-sm font-medium" href="#">Metodología</a></li>
                <li><a className="text-gray-500 hover:text-primary transition-colors text-sm font-medium" href="#">Testimonios</a></li>
                <li><a className="text-gray-500 hover:text-primary transition-colors text-sm font-medium" href="#">Garantía</a></li>
              </ul>
            </div>

            <div className="flex flex-col space-y-4">
              <h3 className="font-display text-lg text-gray-900 font-bold">Explorar</h3>
              <ul className="space-y-3">
                <li><a className="text-gray-500 hover:text-primary transition-colors text-sm font-medium" href="#">Resultados</a></li>
                <li><a className="text-gray-500 hover:text-primary transition-colors text-sm font-medium" href="#">Sedes</a></li>
                <li><a className="text-gray-500 hover:text-primary transition-colors text-sm font-medium" href="#">Nuestra Historia</a></li>
                <li><a className="text-gray-500 hover:text-primary transition-colors text-sm font-medium" href="#">Blog</a></li>
              </ul>
            </div>

            <div className="flex flex-col space-y-4 lg:col-span-1">
              <h3 className="font-display text-lg text-gray-900 font-bold">Contacto</h3>
              <div className="flex flex-col space-y-4">
                <a className="flex items-center group" href="mailto:lecturaintegral@ensilperu.com">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mr-3 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                    <Mail size={18} />
                  </div>
                  <span className="text-gray-600 group-hover:text-primary transition-colors text-sm font-medium">lecturaintegral@ensilperu.com</span>
                </a>
                <a className="flex items-center group" href="tel:960508686">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mr-3 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                    <Phone size={18} />
                  </div>
                  <span className="text-gray-600 group-hover:text-primary transition-colors text-sm font-medium">960 508 686</span>
                </a>
                <div className="flex items-center group">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mr-3 text-primary">
                    <MapPin size={18} />
                  </div>
                  <span className="text-gray-600 text-sm font-medium">Lima, Perú</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between space-y-6 lg:items-end">
              <button className="flex items-center space-x-2 border border-gray-300 rounded-full px-4 py-2 text-gray-800 hover:border-primary hover:text-primary transition-colors bg-transparent w-fit">
                <Globe size={18} />
                <span className="text-sm font-bold">Español</span>
                <ChevronDown size={16} />
              </button>
              <div className="flex space-x-4">
                <a className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-600 hover:text-primary hover:bg-green-50 transition-all duration-300 shadow-sm border border-gray-100" href="#">
                  <Facebook size={20} className="fill-current" />
                </a>
                <a className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-600 hover:text-primary hover:bg-green-50 transition-all duration-300 shadow-sm border border-gray-100" href="#">
                  <Instagram size={20} />
                </a>
                 <a className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-600 hover:text-primary hover:bg-green-50 transition-all duration-300 shadow-sm border border-gray-100" href="#">
                  <Linkedin size={20} className="fill-current" />
                </a>
                 <a className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-600 hover:text-primary hover:bg-green-50 transition-all duration-300 shadow-sm border border-gray-100" href="#">
                  <Twitter size={20} className="fill-current" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
            <div>
              © 2025 ENSIL PERÚ. Todos los derechos reservados.
            </div>
            <div className="flex space-x-6">
              <a className="hover:text-primary transition-colors" href="#">Términos y Condiciones</a>
              <a className="hover:text-primary transition-colors" href="#">Política de Privacidad</a>
              <a className="hover:text-primary transition-colors" href="#">Cookies</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;