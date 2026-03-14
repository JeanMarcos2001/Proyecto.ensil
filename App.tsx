import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import ProgramsPage from './pages/ProgramsPage';
import ResultsPage from './pages/ResultsPage';
import SedesPage from './pages/SedesPage';
import EsParaTiPage from './pages/EsParaTiPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/programas" element={<ProgramsPage />} />
          <Route path="/resultados" element={<ResultsPage />} />
          <Route path="/sedes" element={<SedesPage />} />
          <Route path="/es-para-ti" element={<EsParaTiPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contacto" element={<ContactPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;