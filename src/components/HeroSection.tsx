import { Button } from "@/components/ui/button";
import { useContent } from "@/context/ContentContext";
import { heroNew1, heroNew2, heroNew3, heroNew4, heroNew5 } from "@/content/defaults";

const fallbacks = [heroNew1, heroNew2, heroNew3, heroNew4, heroNew5];


const HeroSection = () => {
  const { content } = useContent();
  const { headline, bullets, subtext, ctaLabel } = content.hero;

  const slides = content.images.hero.length > 0
    ? content.images.hero.map((url, i) => url || fallbacks[i] || fallbacks[0])
    : fallbacks;

  return (
    <section id="start" className="relative h-[70vh] sm:h-[78vh] md:h-[88vh] min-h-[560px] overflow-hidden">

      {/* Background slides */}
      {slides.map((src, i) => (
        <div
          key={i}
          className={`absolute inset-0 hero-slide-${i}`}
          style={{ opacity: i === 0 ? 1 : 0 }}
        >
          <img
            src={src}
            alt={`Modernes Reinigungssystem Vorführung ${i + 1}`}
            className="w-full h-full object-cover object-right"
            loading={i === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      {/* Left-panel overlay: very dark on the left, fades out toward right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, hsla(210,30%,7%,0.93) 0%, hsla(210,30%,7%,0.82) 32%, hsla(210,30%,7%,0.45) 58%, hsla(210,30%,7%,0.05) 100%)",
        }}
      />

      {/* Text content — hard left, offset down for fixed header */}
      <div className="relative z-10 h-full flex items-center" style={{ paddingTop: "4rem" }}>
        <div className="w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-md lg:max-w-lg">

            {/* Green accent bar */}
            <div className="w-10 h-[3px] bg-primary rounded-full mb-6" />

            {/* Headline */}
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.05] tracking-normal mb-4">
              {headline}
            </h1>

            {/* Bullet points */}
            {bullets && bullets.length > 0 && (
              <ul className="mb-7 space-y-2">
                {bullets.map((b) => (
                  <li key={b} className="flex items-center gap-3">
                    <span className="text-primary text-lg sm:text-2xl font-bold leading-none flex-shrink-0">•</span>
                    <span className="text-lg sm:text-2xl md:text-3xl lg:text-[2rem] font-heading font-semibold text-white/90 leading-snug">
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {/* Subtext */}
            <p className="text-white/65 text-sm md:text-base leading-relaxed mb-8 max-w-xs">
              {subtext}
            </p>

            {/* CTA */}
            <a href="#kontakt">
              <Button size="lg" className="text-sm md:text-base px-8 h-12 shadow-lg font-semibold">
                {ctaLabel}
              </Button>
            </a>

          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
