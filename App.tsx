import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import ProgramsPage from './pages/ProgramsPage';
import ProfessionalPage from './pages/ProfessionalPage';
import KidsPage from './pages/KidsPage';
import PreKidsPage from './pages/PreKidsPage';
import ResultsPage from './pages/ResultsPage';
import SedesPage from './pages/SedesPage';
import EsParaTiPage from './pages/EsParaTiPage';
import ContactPage from './pages/ContactPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-background-light">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/programas" element={<ProgramsPage />} />
          <Route path="/programas/profesional" element={<ProfessionalPage />} />
          <Route path="/programas/kids" element={<KidsPage />} />
          <Route path="/programas/pre-kids" element={<PreKidsPage />} />
          <Route path="/resultados" element={<ResultsPage />} />
          <Route path="/sedes" element={<SedesPage />} />
          <Route path="/es-para-ti" element={<EsParaTiPage />} />
          <Route path="/contacto" element={<ContactPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;