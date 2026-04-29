import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Layers, Zap, BookOpen, Globe, Users } from "lucide-react";
import thermomixTm7Img from "@/assets/thermomix-tm7.jpeg";

const features = [
  {
    icon: Layers,
    title: "Multifunktional",
    desc: "Er ersetzt zahlreiche Küchengeräte wie Mixer, Waage, Kochtopf, Dampfgarer und Knetmaschine.",
  },
  {
    icon: Zap,
    title: "Funktionen",
    desc: "Zerkleinern, mixen, pürieren, kochen, anbraten (bis 160 °C), dampfgaren, rühren, kneten, sous-vide-garen, fermentieren.",
  },
  {
    icon: BookOpen,
    title: "Guided Cooking",
    desc: "Über das Display führt das Gerät Schritt-für-Schritt durch Rezepte – besonders hilfreich für Anfänger.",
  },
  {
    icon: Globe,
    title: "Cookidoo",
    desc: "Das digitale Rezept-Portal bietet tausende Rezepte, die direkt auf das Gerät übertragen werden können.",
  },
  {
    icon: Users,
    title: "Vertrieb",
    desc: "Der Verkauf erfolgt über den Direktvertrieb durch Vorwerk-Repräsentantinnen – persönlich und kompetent.",
  },
];

const Thermomix = () => (
  <>
    <Header />
    <main>

      {/* ── Hero + Intro — bordered card matching screenshot ─────── */}
      <section className="section-padding pt-32 md:pt-40 bg-background">
        <div className="container-narrow px-6 md:px-12">
          <div className="border border-border rounded-lg bg-card shadow-sm max-w-3xl mx-auto text-center">

            {/* Top block: Thermomix® + taglines */}
            <div className="px-8 md:px-16 py-10 md:py-14">
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
                Thermomix<sup className="text-2xl md:text-3xl align-super">®</sup>
              </h1>
              <div className="text-muted-foreground text-base md:text-lg leading-relaxed space-y-1">
                <p>Kochen war noch nie so einfach</p>
                <p>Über 30 Funktionen in einer einzigen Küchenmaschine</p>
                <p>Perfekt für den modernen Alltag</p>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-border mx-8" />

            {/* Bottom block: Das smarteste Küchengerät */}
            <div className="px-8 md:px-16 py-10 md:py-14">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-5">
                Das smarteste Küchengerät der Welt
              </h2>
              <div className="text-muted-foreground text-base md:text-lg leading-relaxed space-y-1">
                <p>Er übernimmt viele Arbeitsschritte automatisch</p>
                <p>Man spart Zeit und das Zubereiten leckerer Gerichte ist einfacher und entspannter</p>
              </div>
            </div>

          </div>

          {/* CTA below card */}
          <div className="text-center mt-8">
            <a href="/#kontakt">
              <Button size="lg" className="px-10 h-12 text-base font-semibold shadow-lg">
                Jetzt Beratungstermin anfragen
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────────── */}
      <section className="section-padding" style={{ background: "var(--section-gradient)" }}>
        <div className="container-narrow px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Die wichtigsten Fakten
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-card rounded-xl p-6 shadow-card flex gap-4 items-start"
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-accent flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Personal consultation ───────────────────────────────── */}
      <section className="section-padding bg-card">
        <div className="container-narrow px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="rounded-xl overflow-hidden shadow-elevated">
              <img
                src={thermomixTm7Img}
                alt="Persönliche Thermomix Beratung"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="pt-2">
              <div className="w-10 h-[3px] bg-primary rounded-full mb-5" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-5">
                Erleben Sie den Thermomix persönlich
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8 md:text-lg">
                Meine Kollegin bietet Ihnen eine individuelle Beratung, eine ausführliche
                Vorführung sowie kompetente Informationen rund um den Thermomix – und steht
                Ihnen auch nach dem Kauf für eine persönliche Betreuung zur Verfügung.
              </p>
              <a href="/#kontakt">
                <Button size="lg" className="px-8">
                  Jetzt Termin anfragen
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
    <Footer />
  </>
);

export default Thermomix;
