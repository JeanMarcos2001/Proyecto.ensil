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
          {/* Colored Logo (Always Visible) */}
          <img
            src="/img/LOGO_ENSIL.webp"
            alt="ENSIL PERÚ"
            className="absolute inset-0 h-full w-full object-contain object-left"
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

      {/* Mobile Menu Slide-in Drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {/* Dark Backdrop Overlay */}
        <div
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>

        {/* Drawer Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-[80%] max-w-sm bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          {/* Drawer Header with Close Button */}
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <span className="font-fraunces font-bold text-lg text-slate-800">Menú</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Drawer Links */}
          <div className="flex flex-col p-4 gap-2 overflow-y-auto">
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
                className={`py-3.5 px-4 rounded-xl text-sm font-medium transition-all ${item.isButton
                  ? 'bg-ensil-green text-white font-bold mt-4 text-center shadow-md'
                  : isActive(item.href)
                    ? 'bg-green-50 text-ensil-green font-bold'
                    : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;