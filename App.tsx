import React, { Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

// Lazy-loaded pages — only downloaded when the user navigates to them
const Home = React.lazy(() => import('./pages/Home'));
const ProgramsPage = React.lazy(() => import('./pages/ProgramsPage'));
const ResultsPage = React.lazy(() => import('./pages/ResultsPage'));
const SedesPage = React.lazy(() => import('./pages/SedesPage'));
const EsParaTiPage = React.lazy(() => import('./pages/EsParaTiPage'));
const FaqPage = React.lazy(() => import('./pages/FaqPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));

// Minimal loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="w-10 h-10 border-4 border-ensil-green-200 border-t-ensil-green-700 rounded-full animate-spin"></div>
  </div>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/programas" element={<ProgramsPage />} />
            <Route path="/resultados" element={<ResultsPage />} />
            <Route path="/sedes" element={<SedesPage />} />
            <Route path="/es-para-ti" element={<EsParaTiPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/contacto" element={<ContactPage />} />
          </Routes>
        </Suspense>
      </div>
    </HashRouter>
  );
};

export default App;