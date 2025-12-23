import React from 'react';
import Navbar from '../components/Navbar';
import EsParaTiContent from '../components/es-para-ti/EsParaTiContent';
import Footer from '../components/Footer';

const EsParaTiPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-light pt-20">
      <Navbar />
      <EsParaTiContent />
      <Footer />
    </div>
  );
};

export default EsParaTiPage;