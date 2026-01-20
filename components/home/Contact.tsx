import React from 'react';
import { ArrowRight } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contacto" className="py-24 px-4 pb-48"> 
    {/* Added padding bottom to account for the overlapping footer card if needed, though footer handles it with negative margin */}
      <div className="max-w-7xl mx-auto bg-blue-50/50 rounded-[3rem] p-8 md:p-16 relative overflow-hidden border border-blue-100">
        
        {/* Background Blur Decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl md:text-5xl text-gray-900 font-bold mb-6 leading-tight">
              Enciende tu potencial de aprendizaje. <br/>
              <span className="text-primary">Únete a la élite lectora.</span>
            </h2>
            <p className="text-gray-600 mb-10 max-w-md text-lg font-light">
              Agenda una clase de demostración gratuita y evalúa tu velocidad actual de lectura sin compromiso.
            </p>
            <button className="bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-green-800 transition-colors flex items-center gap-3 group shadow-lg">
              Reservar mi cupo
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
          </div>

          <div className="flex gap-4 h-80">
            <img 
              alt="Joven con laptop" 
              className="w-1/2 h-full object-cover rounded-3xl transform translate-y-6 shadow-xl" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6w3TSMgwDjLGIAlOueJIiABwddFDyCov-QHEPrOO_T2bEpfx2juIWkOFlwL9rAFWFso2tYwO6VPNfXFMUCQW-A2iHxgOdrCO4n2ap-HuhMy1D9frnpeASEJerQ8jgiRx5jG0wM7sJ4h_q-ub27fMN3MQ1XQJQinFnrtjo_-56HEY4malffz01KQLvVRDcOf11r6PcjXpzMsZVR48WAZI-XRYsPxXY5gr-7MG4yRQZHuUSXnW7k-zdIxiYzGBOFH70KLEdSFM_nss"
            />
            <img 
              alt="Mujer con libro" 
              className="w-1/2 h-full object-cover rounded-3xl transform -translate-y-6 shadow-xl" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGC9hkta6rWLs3z1mB1YP_XVdZF0sj_wB6kO8Re3pgTwrOknwfjQncQuubiBfymc2OqHuw4KTkfQUuyyhkKwKR0_h_OgjGtBhZjY1bt-yo7wyBm77cTjaymcymETKxNRFgPf5lID__0hU0xVmgFuou5Xhq7YpJf0N4q7R1TAJKholmO9e8QON_Fep0QahDnt6Md9MndyHF7pf-4YJaak5OVtUXHkR2mE-VKqRK-FbF0HzVulkyBOttH3VVEmRdfQUbrBH60WjYgQ0"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;