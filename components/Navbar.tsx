import React, { useState, useEffect } from 'react';
import { NavItem } from '../types';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems: NavItem[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Programas', href: '/programas' },
  { label: 'Resultados', href: '/resultados' },
  { label: 'Sedes', href: '/sedes' },
  { label: '¿Es para ti?', href: '/es-para-ti' },
  { label: '¿Qué estás esperando?', href: '/contacto', isButton: true },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

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
  }, [location]);

  const isActive = (href: string) => {
    if (href === '/' && location.pathname === '/') return true;
    if (href !== '/' && location.pathname.startsWith(href)) {
      return true;
    }
    return false;
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 px-3 py-3`}>
      <div className={`max-w-7xl mx-auto rounded-full px-5 py-2.5 flex items-center justify-between transition-all duration-300 ${isScrolled || location.pathname !== '/'
          ? 'bg-transparent'
          : 'bg-transparent'
        }`}>
        <Link to="/" className="flex items-center">
          <img
            src="https://fmbtcgilsicvvsltmzms.supabase.co/storage/v1/object/public/Image/LOGO_ENSIL-14.png"
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

            return (
              <Link
                key={item.label}
                to={item.href}
                className={`text-sm font-medium transition-all ${isActive(item.href)
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
            return (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-center py-2 ${item.isButton
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