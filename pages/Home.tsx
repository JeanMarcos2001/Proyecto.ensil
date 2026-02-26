import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/home/Hero';
import Programs from '../components/home/Programs';
import PromiseSection from '../components/home/PromiseSection';
import FAQ from '../components/home/FAQ';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <div className="w-full relative">
      <Navbar />
      <main>
        <Hero />
        <Programs />
        <PromiseSection />
        <FAQ />
        <section id="sedes">
          {/* Note: Sedes info is technically inside FAQ item #2 in the provided HTML, but the menu links to it. 
               In a full app, this might be a map section. For this request, the content matches the provided HTML 
               where 'Sedes' appears in the FAQ or Hero stats. I will rely on the anchor in FAQ or Hero 
               since no dedicated Sedes section HTML was provided other than mentioned in text.
               I will leave the ID hook here if expansion is needed.
           */}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;