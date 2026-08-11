import React, { useState, useEffect } from 'react';
import { NavItem } from '../types';
import { Menu, X, Phone, Facebook, Instagram, Youtube } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

// Custom TikTok SVG Icon
const TikTok = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const navItems: NavItem[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Programas', href: '/programas' },
  { label: 'Resultados', href: '/resultados' },
  { label: 'Sedes', href: '/sedes' },
  { label: '¿Es para ti?', href: '/es-para-ti' },
  { label: 'Admisión', href: '/contacto', isButton: true },
];

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Handle scroll detection and direction (Hide on scroll down, show on scroll up)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Set scrolled state if we are not at the very top
          setIsScrolled(currentScrollY > 50);

          // Determine scroll direction to hide/show navbar
          if (currentScrollY > 50) { // Only start hiding after scrolling past the very top
            if (currentScrollY > lastScrollY) {
              // Scrolling down
              setIsNavVisible(false);
              // Also close mobile menu if open when scrolling down
              if (isMobileMenuOpen) setIsMobileMenuOpen(false);
            } else {
              // Scrolling up
              setIsNavVisible(true);
            }
          } else {
            // At the top
            setIsNavVisible(true);
          }

          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === '/' && location.pathname === '/') return true;
    if (href !== '/' && location.pathname.startsWith(href)) return true;
    return false;
  };

  const navLinks = navItems.filter(item => !item.isButton);
  const ctaButton = navItems.find(item => item.isButton);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-[100] flex flex-col transition-transform duration-300 ease-in-out ${isNavVisible || isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
          } ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : ''}`}
      >
        {/* Top Contact Bar */}
        <div className="w-full bg-green-900 border-b border-white/10 hidden md:block">
          <div className="w-[95%] mx-auto flex items-center justify-between py-2 px-0">
            {/* Left: Phone */}
            <a href="tel:+51960508686" className="flex items-center gap-2 text-white/90 hover:text-white transition-colors text-xs font-semibold tracking-wide">
              <Phone size={14} className="text-green-400" />
              +51 960 508 686
            </a>

            {/* Right: Socials */}
            <div className="flex items-center gap-4">
              <a href="https://www.facebook.com/profile.php?id=61557499991606" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-400 transition-colors">
                <Facebook size={14} className="fill-current" />
              </a>
              <a href="#" className="text-white hover:text-green-400 transition-colors">
                <TikTok size={14} />
              </a>
              <a href="#" className="text-white hover:text-green-400 transition-colors">
                <Instagram size={14} />
              </a>
              <a href="https://www.youtube.com/@EnsilLecturaIntegral" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-400 transition-colors">
                <Youtube size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="w-full py-3">
          <div className="w-[95%] mx-auto flex items-center justify-between">

            {/* Left Side: Logo & Navigation */}
            <div className="flex items-center gap-10">
              {/* Logo */}
              <Link to="/" className="flex items-center flex-shrink-0 z-20 relative h-10 md:h-11 w-[120px] md:w-[130px]">
                {/* Colored Logo (Always Visible) */}
                <img
                  src="/img/LOGO_ENSIL.webp"
                  alt="ENSIL PERÚ"
                  className="absolute inset-0 h-full w-full object-contain object-left"
                />
              </Link>

              {/* Desktop Nav — Clean Left-Aligned Menu */}
              <div className="hidden lg:flex items-center gap-8 z-20">
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
                    className={`text-[15px] transition-all duration-300 hover:text-ensil-green-800 ${isActive(item.href)
                      ? 'text-ensil-green-900 font-bold'
                      : 'text-slate-800 font-medium'
                      }`}
                    style={{
                      fontWeight: isActive(item.href) ? 700 : undefined,
                      transition: 'color 0.3s, font-weight 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive(item.href)) {
                        (e.currentTarget as HTMLElement).style.fontWeight = '700';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive(item.href)) {
                        (e.currentTarget as HTMLElement).style.fontWeight = '';
                      }
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA Button (Right) */}
            <div className="hidden lg:block z-20">
              {ctaButton && (
                <Link
                  to={ctaButton.href}
                  className="admission-button"
                >
                  <span className="admission-fold"></span>

                  <div className="admission-points_wrapper">
                    <i className="admission-point"></i>
                    <i className="admission-point"></i>
                    <i className="admission-point"></i>
                    <i className="admission-point"></i>
                    <i className="admission-point"></i>
                    <i className="admission-point"></i>
                    <i className="admission-point"></i>
                    <i className="admission-point"></i>
                    <i className="admission-point"></i>
                    <i className="admission-point"></i>
                  </div>

                  <span className="admission-inner">
                    <svg
                      className="admission-icon"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                    >
                      <polyline
                        points="13.18 1.37 13.18 9.64 21.45 9.64 10.82 22.63 10.82 14.36 2.55 14.36 13.18 1.37"
                      ></polyline>
                    </svg>
                    {ctaButton.label}
                  </span>
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
        </div>
      </header>

      {/* Mobile Menu Slide-in Drawer */}
      <div
        className={`fixed inset-0 z-[110] lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
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
    </>
  );
};

export default Navbar;