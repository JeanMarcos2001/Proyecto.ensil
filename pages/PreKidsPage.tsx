import React from 'react';
import Navbar from '../components/Navbar';
import PreKidsContent from '../components/programas/PreKidsContent';
import Footer from '../components/Footer';

const PreKidsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-light pt-20">
      <Navbar />
      <PreKidsContent />
      <Footer />
    </div>
  );
};

export default PreKidsPage;