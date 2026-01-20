import React from 'react';
import Navbar from '../components/Navbar';
import ProfessionalContent from '../components/programas/ProfessionalContent';
import Footer from '../components/Footer';

const ProfessionalPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-light pt-20">
      <Navbar />
      <ProfessionalContent />
      <Footer />
    </div>
  );
};

export default ProfessionalPage;