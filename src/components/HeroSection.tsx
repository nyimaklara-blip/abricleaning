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
    <section
      id="start"
      className="relative min-h-[680px] overflow-hidden sm:min-h-[720px] md:min-h-[820px]"
    >

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
      <div className="relative z-10 flex min-h-[680px] items-start pb-8 pt-24 sm:min-h-[720px] sm:pb-10 sm:pt-24 md:min-h-[820px]">
        <div className="w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-md md:max-w-xl lg:max-w-2xl">

            {/* Green accent bar */}
            <div className="mb-4 h-[3px] w-10 rounded-full bg-primary sm:mb-6" />

            {/* Headline */}
            <h1 className="mb-4 font-heading text-[2.6rem] font-semibold leading-[1.08] tracking-normal text-white sm:text-5xl md:text-[3.5rem] lg:text-[4rem]">
              {headline}
            </h1>

            {/* Bullet points */}
            {bullets && bullets.length > 0 && (
              <ul className="mb-5 space-y-1.5 sm:mb-7 sm:space-y-2">
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
            <p className="mb-6 max-w-xs text-sm leading-relaxed text-white/70 sm:mb-8 md:text-base">
              {subtext}
            </p>

            {/* CTA */}
            <a href="#kontakt">
              <Button size="lg" className="h-12 px-5 text-[13px] font-semibold shadow-lg sm:px-8 sm:text-sm md:text-base">
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
