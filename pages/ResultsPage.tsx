import React from 'react';
import Navbar from '../components/Navbar';
import ResultsContent from '../components/resultados/ResultsContent';
import Footer from '../components/Footer';

const ResultsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-light pt-20"> {/* pt-20 to account for fixed navbar */}
      <Navbar />
      <ResultsContent />
      <Footer />
    </div>
  );
};

export default ResultsPage;