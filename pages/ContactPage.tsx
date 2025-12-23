import React from 'react';
import Navbar from '../components/Navbar';
import ContactContent from '../components/contacto/ContactContent';
import Footer from '../components/Footer';

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-light pt-20">
      <Navbar />
      <ContactContent />
      <Footer />
    </div>
  );
};

export default ContactPage;