import React from 'react';
import { Link } from 'react-router-dom';
import ContactContent from '../components/contacto/ContactContent';
import Footer from '../components/Footer';

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-jakarta text-slate-800 selection:bg-ensil-gold selection:text-white flex flex-col">
      {/* Custom Minimal Header */}
      <header className="relative z-50 w-full py-8 mt-4 flex items-center justify-center">
        {/* Centered Logo */}
        <Link to="/" className="transition-transform hover:scale-105">
          <img
            src="/img/LOGO_ENSIL.webp"
            alt="ENSIL PERÚ"
            className="h-12 md:h-16 w-auto object-contain"
          />
        </Link>
      </header>

      <ContactContent />

      {/* Footer Container - Standardized */}
      <Footer showCta={false} />
    </div>
  );
};

export default ContactPage;