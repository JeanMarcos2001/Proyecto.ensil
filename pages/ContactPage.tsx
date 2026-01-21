import React from 'react';
import { Link } from 'react-router-dom';
import ContactContent from '../components/contacto/ContactContent';
import Footer from '../components/Footer';

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-paper-texture font-jakarta text-slate-800 selection:bg-ensil-gold selection:text-white flex flex-col">
      {/* Custom Minimal Header */}
      <header className="relative z-50 px-6 lg:px-12 pt-20 pb-8 max-w-screen-2xl mx-auto flex items-center justify-center w-full">
        {/* Centered Logo */}
        <div className="flex-1 flex justify-center">
          <Link to="/" className="transition-transform hover:scale-105">
            <img
              src="https://fmbtcgilsicvvsltmzms.supabase.co/storage/v1/object/public/Image/LOGO_ENSIL-18.png"
              alt="ENSIL PERÚ"
              className="h-16 md:h-20 w-auto object-contain drop-shadow-lg"
            />
          </Link>
        </div>
      </header>

      <ContactContent />

      {/* Footer Container - Transparent/Dark Variant to blend with the main gradient */}
      <Footer variant="dark" showCta={false} />
    </div>
  );
};

export default ContactPage;