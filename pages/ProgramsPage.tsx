import React from 'react';
import Navbar from '../components/Navbar';
import ProgramsHub from '../components/programas/ProgramsHub';
import Footer from '../components/Footer';

const ProgramsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white pt-20">
      <Navbar />
      <ProgramsHub />
      <Footer />
    </div>
  );
};

export default ProgramsPage;