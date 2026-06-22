import promoFinancing from "@/assets/promo-financing-2026.webp";
import promoBlackEdition from "@/assets/promo-black-edition-2026.webp";
import promoUeberbodenSet from "@/assets/promo-ueberboden-set-2026.webp";

const promotions = [
  {
    src: promoFinancing,
    alt: "0 Prozent Finanzierung in 6 Raten auf alle Kobold Sets vom 18.05.2026 bis 28.06.2026",
    className: "max-w-3xl",
  },
  {
    src: promoBlackEdition,
    alt: "VK7 Black Limited Edition mit AC7 Accessoires und zweitem Akku vom 18.05.2026 bis 28.06.2026",
    className: "max-w-4xl",
  },
  {
    src: promoUeberbodenSet,
    alt: "Kobold AC7 Accessoires Angebot vom 18.05.2026 bis 28.06.2026",
    className: "max-w-4xl",
  },
];

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

        <div className="flex flex-col items-center gap-6">
          {promotions.map((promotion) => (
            <a
              key={promotion.alt}
              href="#kontakt"
              className={`block w-full ${promotion.className} group`}
            >
              <div className="overflow-hidden rounded-lg border border-border bg-background shadow-lg transition-transform duration-300 group-hover:scale-[1.01]">
                <img
                  src={promotion.src}
                  alt={promotion.alt}
                  className="w-full h-auto object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotionsSection;
