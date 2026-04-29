import { Award, Shield, Heart, LucideIcon } from "lucide-react";
import christaImgFallback from "@/assets/portrait-black-top.png";
import award1Img from "@/assets/award-1.jpeg";
import award2Img from "@/assets/award-2.jpeg";
import award3Img from "@/assets/award-3.jpeg";
import { useContent } from "@/context/ContentContext";

const iconMap: Record<string, LucideIcon> = {
  shield: Shield,
  award: Award,
  heart: Heart,
};

const AboutSection = () => {
  const { content } = useContent();
  const { heading, body1, body2, badgeName, badgeRole, trustItems } = content.about;
  const christaImg = content.images.christaPortrait || christaImgFallback;

  return (
    <section className="section-padding bg-card">
      <div className="container-narrow">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left — Profile image */}
          <div className="relative">
            <div className="rounded-lg overflow-hidden shadow-elevated">
              <img
                src={christaImg}
                alt="Christa Abrigada – Ihre persönliche Kobold Beraterin im Zürcher Oberland"
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Badge */}
            <div className="absolute -bottom-4 -right-4 md:-right-6 bg-primary text-primary-foreground rounded-lg px-4 py-3 shadow-elevated">
              <p className="font-heading text-sm font-semibold">{badgeName}</p>
              <p className="text-xs text-primary-foreground/80">{badgeRole}</p>
            </div>
          </div>

          {/* Right — Content */}
          <div className="pt-2">
            {/* Green accent bar */}
            <div className="w-10 h-[3px] bg-primary rounded-full mb-5" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-5">
              {heading}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{body1}</p>
            <p className="text-muted-foreground leading-relaxed mb-8">{body2}</p>

            {/* Trust items */}
            <div className="flex flex-col gap-4">
              {trustItems.map((item) => {
                const Icon = iconMap[item.iconName] ?? Shield;
                return (
                  <div key={item.text} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                      <Icon className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Awards */}
            <div className="mt-8 pt-7 border-t border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-5">
                Auszeichnungen
              </p>
              <div className="flex justify-between items-start gap-2">

                {/* Award 1 – Beste Beraterin der Schweiz */}
                <div
                  className="flex flex-col items-center gap-3 text-center flex-1 group cursor-default"
                >
                  <div
                    className="w-[124px] h-[124px] rounded-full overflow-hidden flex-shrink-0"
                    style={{
                      border: "2px solid hsla(142,60%,36%,0.3)",
                      background: "hsl(var(--accent))",
                      boxShadow: "0 4px 14px 0 hsla(142,60%,36%,0.12)",
                      transition: "transform 0.25s ease, box-shadow 0.25s ease",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px 0 hsla(142,60%,36%,0.35)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 14px 0 hsla(142,60%,36%,0.12)";
                    }}
                  >
                    <img
                      src={award1Img}
                      alt="1. Platz Beste Beraterin der Schweiz 2024/25"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <p className="text-[11px] font-medium text-foreground/70 leading-snug">
                    1. Platz<br />Beste Beraterin<br />Schweiz 2024/25
                  </p>
                </div>

                {/* Award 2 – Black Panther Challenge */}
                <div
                  className="flex flex-col items-center gap-3 text-center flex-1 cursor-default"
                >
                  <div
                    className="w-[124px] h-[124px] rounded-full overflow-hidden flex-shrink-0"
                    style={{
                      border: "2px solid hsla(142,60%,36%,0.3)",
                      background: "hsl(var(--accent))",
                      boxShadow: "0 4px 14px 0 hsla(142,60%,36%,0.12)",
                      transition: "transform 0.25s ease, box-shadow 0.25s ease",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px 0 hsla(142,60%,36%,0.35)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 14px 0 hsla(142,60%,36%,0.12)";
                    }}
                  >
                    <img
                      src={award2Img}
                      alt="Top1 Beraterin Black Panther Challenge"
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <p className="text-[11px] font-medium text-foreground/70 leading-snug">
                    Top1 Beraterin<br />Black Panther<br />Challenge
                  </p>
                </div>

                {/* Award 3 – Testsieger 2025 */}
                <div
                  className="flex flex-col items-center gap-3 text-center flex-1 cursor-default"
                >
                  <div
                    className="w-[124px] h-[124px] rounded-full overflow-hidden flex-shrink-0"
                    style={{
                      border: "2px solid hsla(142,60%,36%,0.3)",
                      background: "hsl(var(--accent))",
                      boxShadow: "0 4px 14px 0 hsla(142,60%,36%,0.12)",
                      transition: "transform 0.25s ease, box-shadow 0.25s ease",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px 0 hsla(142,60%,36%,0.35)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 14px 0 hsla(142,60%,36%,0.12)";
                    }}
                  >
                    <img
                      src={award3Img}
                      alt="Kobold Testsieger 2025"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <p className="text-[11px] font-medium text-foreground/70 leading-snug">
                    Kobold<br />Testsieger<br />2025
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
