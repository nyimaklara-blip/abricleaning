import flyer11 from "@/assets/flyer-image-11.jpeg";
import flyer4 from "@/assets/flyer-image-4.jpeg";
import flyer5 from "@/assets/flyer-image-5.jpeg";
import flyer7 from "@/assets/flyer-image-7.jpeg";

const PromotionsSection = () => {
  return (
    <section id="promotionen" className="section-padding" style={{ background: "var(--section-gradient)" }}>
      <div className="container-narrow">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Aktuelle Promotionen
          </h2>
          <p className="text-muted-foreground">Jetzt zugreifen!</p>
        </div>

        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
          {/* NEW: Kobold All-In-One / Dream Team Angebot — full width */}
          <a href="#kontakt" className="block group">
            <div className="rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-[1.01]">
              <img
                src={flyer11}
                alt="Unser Kobold Angebot: VM7 Hand-Akkusauger gratis – 01.04. bis 17.05.2026"
                className="w-full h-auto object-cover"
              />
            </div>
          </a>

          {/* VM7 — full width landscape */}
          <a href="#kontakt" className="block group">
            <div className="rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-[1.01]">
              <img
                src={flyer4}
                alt="Kobold VM7 Hand-Akku Sauger gratis – 01.04. bis 17.05.2026"
                className="w-full h-auto object-cover"
              />
            </div>
          </a>

          {/* Black is back + Black Limited Edition info side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <a href="#kontakt" className="block group">
              <div className="rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-[1.01]">
                <img
                  src={flyer5}
                  alt="Kobold VK7 Black Limited Edition – Auf vielfachen Wunsch zurück"
                  className="w-full h-auto object-cover"
                />
              </div>
            </a>
            <a href="#kontakt" className="block group">
              <div className="rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-[1.01]">
                <img
                  src={flyer7}
                  alt="Kobold VK7 Black Limited Edition"
                  className="w-full h-auto object-cover"
                />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionsSection;
