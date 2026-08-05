import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

// Custom TikTok SVG Icon as Lucide doesn't have it natively
const TikTok = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

interface FooterProps {
  variant?: 'light' | 'dark';
  showCta?: boolean;
}

const Footer: React.FC<FooterProps> = ({ variant = 'light', showCta = true }) => {
  const isDark = variant === 'dark';

  // LOGO URLs
  const logoColor = "/img/LOGO_ENSIL.webp";
  const logoWhite = "/img/LOGO_ENSIL-19.png";

  // Styles based on variant
  const bgClass = isDark
    ? 'bg-transparent border-t border-white/10'
    : 'bg-transparent border-t-0 shadow-none';

  const textClass = isDark ? 'text-white' : 'text-gray-900';
  const subTextClass = isDark ? 'text-gray-300' : 'text-gray-500';
  const linkClass = isDark
    ? 'text-gray-300 hover:text-ensil-gold'
    : 'text-gray-500 hover:text-primary';

  const iconContainerClass = isDark
    ? 'bg-white/10 text-white hover:bg-white hover:text-primary border-white/10'
    : 'bg-green-50 text-primary hover:bg-primary hover:text-white border-transparent';

  const socialIconClass = isDark
    ? 'bg-white/10 text-white hover:text-primary hover:bg-white border-white/10'
    : 'bg-gray-50 text-gray-600 hover:text-primary hover:bg-green-50 border-gray-100';

  return (
    <div className={`w-full flex flex-col items-center justify-end pb-0 relative`}>
      <div className="w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Main Footer Content */}
        <footer className={`${bgClass} pt-12 pb-10 px-8 md:px-12 w-full relative z-0 transition-colors duration-300`}>

          <div className={`flex flex-col md:flex-row justify-between items-start md:items-center ${isDark ? 'border-white/10' : 'border-gray-200'} border-b pb-10 mb-10`}>
            <div className="flex items-center gap-3 mb-6 md:mb-0">
              <img
                src={isDark ? logoWhite : logoColor}
                alt="ENSIL PERÚ"
                className="h-12 w-auto object-contain"
              />
            </div>
            <div className="text-left md:text-right">
              <p className={`font-serif text-2xl italic ${isDark ? 'text-white' : 'text-gray-800'}`}>
                "La mejor herencia... la felicidad"
              </p>
              <p className={`text-sm mt-2 font-medium ${subTextClass}`}>
                Transformación intelectual que realmente funciona.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div className="flex flex-col space-y-5">
              <h3 className={`font-display text-lg font-bold ${textClass}`}>El Programa</h3>

              <ul className="space-y-3">
                <li><Link className={`${linkClass} transition-colors text-sm font-medium`} to="/programas">Beneficios</Link></li>
                <li><Link className={`${linkClass} transition-colors text-sm font-medium`} to="/programas">Metodología</Link></li>
                <li><Link className={`${linkClass} transition-colors text-sm font-medium`} to="/resultados">Testimonios</Link></li>
                <li><Link className={`${linkClass} transition-colors text-sm font-medium`} to="/programas?section=garantia">Garantía</Link></li>
              </ul>
            </div>

            <div className="flex flex-col space-y-4">
              <h3 className={`font-display text-lg font-bold ${textClass}`}>Explorar</h3>
              <ul className="space-y-3">
                <li><Link className={`${linkClass} transition-colors text-sm font-medium`} to="/resultados">Resultados</Link></li>
                <li><Link className={`${linkClass} transition-colors text-sm font-medium`} to="/sedes">Sedes</Link></li>
                <li><Link className={`${linkClass} transition-colors text-sm font-medium`} to="/es-para-ti">Es para ti</Link></li>
                <li><Link className={`${linkClass} transition-colors text-sm font-medium`} to="/faq">Preguntas Frecuentes</Link></li>
              </ul>
            </div>

            <div className="flex flex-col space-y-4 lg:col-span-1">
              <h3 className={`font-display text-lg font-bold ${textClass}`}>Contacto</h3>
              <div className="flex flex-col space-y-4">
                <a className="flex items-center group" href="mailto:lecturaintegral@ensilperu.com">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 transition-colors ${iconContainerClass}`}>
                    <Mail size={18} />
                  </div>
                  <span className={`${linkClass} transition-colors text-sm font-medium`}>lecturaintegral@ensilperu.com</span>
                </a>
                <a className="flex items-center group" href="tel:960508686">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 transition-colors ${iconContainerClass}`}>
                    <Phone size={18} />
                  </div>
                  <span className={`${linkClass} transition-colors text-sm font-medium`}>960 508 686</span>
                </a>
                <div className="flex items-start group">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 mt-1 shrink-0 ${iconContainerClass}`}>
                    <MapPin size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className={`${textClass} text-sm font-bold`}>Sede San Isidro</span>
                    <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm font-medium mt-0.5`}>Calle Francisco de Zela #2575</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-end space-y-6 lg:items-end">
              <div className="flex space-x-4">
                <a className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 shadow-sm border ${socialIconClass}`} href="https://www.facebook.com/profile.php?id=61557499991606" target="_blank" rel="noopener noreferrer" title="Facebook">
                  <Facebook size={20} className="fill-current" />
                </a>
                <a className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 shadow-sm border ${socialIconClass}`} href="#" title="TikTok">
                  <TikTok size={20} />
                </a>
                <a className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 shadow-sm border ${socialIconClass}`} href="#" title="Instagram">
                  <Instagram size={20} />
                </a>
                <a className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 shadow-sm border ${socialIconClass}`} href="https://www.youtube.com/@EnsilLecturaIntegral" target="_blank" rel="noopener noreferrer" title="YouTube">
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className={`${isDark ? 'border-white/10' : 'border-gray-200'} border-t pt-8 flex flex-col md:flex-row justify-between items-center text-sm ${subTextClass} gap-4`}>
            <div>
              © 2025 ENSIL PERÚ. Todos los derechos reservados.
            </div>
            <div className="flex space-x-6">
              <a className="hover:text-ensil-gold transition-colors" href="#">Términos y Condiciones</a>
              <a className="hover:text-ensil-gold transition-colors" href="#">Política de Privacidad</a>
              <a className="hover:text-ensil-gold transition-colors" href="#">Cookies</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;