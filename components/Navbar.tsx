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
  { label: 'Separa tu cita', href: '/contacto', isButton: true },
];

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      // 95% de la altura de la pantalla (Hero section)
      setIsScrolled(window.scrollY > window.innerHeight * 0.95);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/' && location.pathname === '/') return true;
    if (href !== '/' && location.pathname.startsWith(href)) return true;
    return false;
  };

  const navLinks = navItems.filter(item => !item.isButton);
  const ctaButton = navItems.find(item => item.isButton);

  return (
    <nav className="fixed top-0 w-full z-50 py-3">
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">

        {/* Logo (Left) */}
        <Link to="/" className="flex items-center flex-shrink-0 z-20 relative h-10 md:h-11 w-[120px] md:w-[130px]">
          {/* White Logo (Visible at top) */}
          <img
            src="/img/LOGO_ENSIL-19.png"
            alt="ENSIL PERÚ"
            className={`absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-300 ${isScrolled ? 'opacity-0' : 'opacity-100'}`}
          />
          {/* Colored Logo (Visible when scrolled) */}
          <img
            src="/img/LOGO_ENSIL.webp"
            alt="ENSIL PERÚ"
            className={`absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-300 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}
          />
        </Link>

        {/* Desktop Nav — Pill Container */}
        <div className="hidden lg:flex items-center bg-white/80 backdrop-blur-md border border-gray-200/70 rounded-full shadow-sm px-1.5 py-1.5 gap-0.5">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              onClick={(e) => {
                if (isActive(item.href)) {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${isActive(item.href)
                ? 'bg-white text-gray-900 shadow-sm font-semibold'
                : 'text-gray-500 hover:text-gray-800 hover:bg-white/60'
                }`}
            >
              {isActive(item.href) && (
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary inline-block" />
              )}
              <span className={isActive(item.href) ? 'pl-3' : ''}>{item.label}</span>
            </Link>
          ))}
        </div>

        {/* CTA Button (Right) */}
        <div className="hidden lg:block z-20">
          {ctaButton && (
            <Link
              to={ctaButton.href}
              className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 px-5 py-2 rounded-full text-sm font-semibold transition-all hover:shadow-md shadow-sm"
            >
              {ctaButton.label}
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-gray-700 z-20 bg-white/80 backdrop-blur-md border border-gray-200 rounded-full p-2 shadow-sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-4 flex flex-col gap-2 lg:hidden z-40 border border-gray-100">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              onClick={(e) => {
                setIsMobileMenuOpen(false);
                if (isActive(item.href)) {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className={`text-center py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${item.isButton
                ? 'bg-primary text-white font-bold mt-1'
                : isActive(item.href)
                  ? 'bg-gray-100 text-gray-900 font-semibold'
                  : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;