import React from 'react';
import Navbar from '../components/Navbar';
import KidsContent from '../components/programas/KidsContent';
import Footer from '../components/Footer';

const KidsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-light pt-20">
      <Navbar />
      <KidsContent />
      <Footer />
    </div>
  );
};

export default KidsPage;