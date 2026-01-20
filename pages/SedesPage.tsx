import React from 'react';
import Navbar from '../components/Navbar';
import SedesContent from '../components/sedes/SedesContent';
import Footer from '../components/Footer';

const SedesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-light pt-20">
      <Navbar />
      <SedesContent />
      <Footer />
    </div>
  );
};

export default SedesPage;