import React, { useState, useEffect, useRef } from 'react';
import { NavItem } from '../types';
import { Menu, X, ChevronDown, BookOpen, Star, Rocket } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems: NavItem[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Programas', href: '/programas' }, // This will now handle hover/click for dropdown
  { label: 'Resultados', href: '/resultados' },
  { label: 'Sedes', href: '/sedes' },
  { label: '¿Es para ti?', href: '/es-para-ti' },
  { label: '¿Qué estás esperando?', href: '/contacto', isButton: true },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProgramDropdownOpen, setIsProgramDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProgramDropdownOpen(false);
  }, [location]);

  const isActive = (href: string) => {
    if (href === '/' && location.pathname === '/') return true;
    if (href !== '/' && location.pathname.startsWith(href)) {
      return true;
    }
    return false;
  };

  const handleMouseEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setIsProgramDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setIsProgramDropdownOpen(false);
    }, 200);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 px-3 py-3`}>
      <div className={`max-w-7xl mx-auto rounded-full px-5 py-2.5 flex items-center justify-between transition-all duration-300 ${
        isScrolled || location.pathname !== '/'
          ? 'bg-white/95 backdrop-blur-md shadow-lg border border-gray-200' 
          : 'bg-white/90 backdrop-blur-md shadow-md'
      }`}>
        <Link to="/" className="flex items-center">
          <img 
            src="/img/ENSIL_PERU.webp" 
            alt="ENSIL PERÚ" 
            className="h-10 md:h-12 w-auto object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => {
            if (item.isButton) {
              return (
                 <Link
                  key={item.label}
                  to={item.href}
                  className="bg-primary hover:bg-green-800 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105 shadow-md hover:shadow-lg"
                >
                  {item.label}
                </Link>
              );
            }

            if (item.label === 'Programas') {
                return (
                    <div 
                        key={item.label}
                        className="relative group h-full flex items-center"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Link
                            to={item.href}
                            className={`text-sm font-medium transition-all flex items-center gap-1 ${
                            isActive(item.href)
                                ? 'text-primary font-bold' 
                                : 'text-gray-700 hover:text-primary hover:font-semibold'
                            }`}
                        >
                            {item.label}
                            <ChevronDown size={14} className={`transition-transform duration-200 ${isProgramDropdownOpen ? 'rotate-180' : ''}`} />
                        </Link>

                        {/* Dropdown Menu */}
                        <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 transform origin-top ${isProgramDropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                             {/* Bridge to prevent closing when moving mouse down */}
                             <div className="absolute -top-6 left-0 w-full h-6 bg-transparent"></div>
                             
                             <div className="p-2 flex flex-col gap-1">
                                {/* Profesional - Serious Style */}
                                <Link to="/programas/profesional" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors group/item">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                                        <BookOpen size={20} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-800 text-sm">Profesional</div>
                                        <div className="text-xs text-gray-500">Nivel Superior</div>
                                    </div>
                                </Link>

                                {/* Kids - Playful Style */}
                                <Link to="/programas/kids" className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-xl transition-colors group/item">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover/item:bg-blue-500 group-hover/item:text-white transition-colors">
                                        <Rocket size={20} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-blue-900 text-sm font-jakarta">KIDS</div>
                                        <div className="text-xs text-blue-600/80">El Despegue Lector</div>
                                    </div>
                                </Link>

                                {/* Pre-Kids - Very Playful Style */}
                                <Link to="/programas/pre-kids" className="flex items-center gap-3 p-3 hover:bg-yellow-50 rounded-xl transition-colors group/item">
                                    <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 group-hover/item:bg-yellow-500 group-hover/item:text-white transition-colors">
                                        <Star size={20} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-yellow-800 text-sm font-fraunces italic">Pre Kids</div>
                                        <div className="text-xs text-yellow-600/80">La Semilla del Lector</div>
                                    </div>
                                </Link>
                             </div>
                        </div>
                    </div>
                )
            }

            return (
              <Link
                key={item.label}
                to={item.href}
                className={`text-sm font-medium transition-all ${
                  isActive(item.href)
                    ? 'text-primary font-bold' 
                    : 'text-gray-700 hover:text-primary hover:font-semibold'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 left-4 right-4 bg-white rounded-2xl shadow-xl p-6 flex flex-col gap-4 lg:hidden animate-fade-in z-40 border border-gray-100 max-h-[80vh] overflow-y-auto">
          {navItems.map((item) => {
            if (item.label === 'Programas') {
                 return (
                    <div key={item.label} className="flex flex-col gap-2 border-b border-gray-100 pb-2">
                        <div className={`font-medium text-center ${isActive(item.href) ? 'text-primary' : 'text-gray-700'}`}>Programas</div>
                        <div className="grid grid-cols-1 gap-2 pl-4">
                             <Link to="/programas/profesional" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-sm text-gray-600 hover:text-primary flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-primary"></span> Profesional
                             </Link>
                             <Link to="/programas/kids" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-sm text-blue-600 font-medium flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-500"></span> Kids
                             </Link>
                             <Link to="/programas/pre-kids" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-sm text-yellow-600 font-medium font-serif italic flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-yellow-500"></span> Pre Kids
                             </Link>
                        </div>
                    </div>
                 )
            }
            return (
                <Link
                key={item.label}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-center py-2 ${
                    item.isButton
                    ? 'bg-primary text-white rounded-full font-bold'
                    : `font-medium border-b border-gray-100 pb-2 ${isActive(item.href) ? 'text-primary' : 'text-gray-700'}`
                }`}
                >
                {item.label}
                </Link>
            )
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;