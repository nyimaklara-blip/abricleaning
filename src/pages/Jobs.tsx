import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Clock, TrendingUp, RefreshCw, GraduationCap, Star, Users } from "lucide-react";
import jobImage from "@/assets/job-offer-image.jpg";

const benefits = [
  {
    icon: Clock,
    title: "Flexible Arbeitszeiten",
    desc: "Du entscheidest, wann du arbeitest – ideal für Familie, Studium oder Hobbys.",
  },
  {
    icon: TrendingUp,
    title: "Attraktive Provisionen",
    desc: "Leistungsbasierte Vergütung mit Bonusmöglichkeiten – dein Einsatz zahlt sich aus.",
  },
  {
    icon: RefreshCw,
    title: "Nebenjob oder Wiedereinstieg",
    desc: "Perfekt als flexibler Nebenjob oder für den Wiedereinstieg ins Berufsleben.",
  },
  {
    icon: GraduationCap,
    title: "Professionelle Schulungen",
    desc: "Wir begleiten dich von Anfang an mit persönlicher Unterstützung und Trainings.",
  },
  {
    icon: Star,
    title: "Premium-Produkte",
    desc: "Arbeiten mit innovativen Vorwerk Kobold Produkten – überzeugend und beliebt.",
  },
  {
    icon: Users,
    title: "Starkes Team",
    desc: "Du bist Teil eines motivierten Teams, das zusammenhält und gemeinsam wächst.",
  },
];

const Jobs = () => (
  <>
    <Header />
    <main className="pt-28">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="section-padding" style={{ background: "var(--section-gradient)" }}>
        <div className="container-narrow">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="flex justify-center">
              <img
                src={jobImage}
                alt="Wir suchen dich – Vorwerk Kobold Team"
                className="w-full max-w-sm rounded-2xl shadow-lg object-cover"
              />
            </div>

            {/* Text */}
            <div>
              <div className="flex flex-wrap gap-2 mb-5">
                {["Nebenjob", "Teilzeit", "Quereinstieg möglich"].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
                Flexibel Geld verdienen und deine Zeit selbst bestimmen?
              </h1>
              <p className="text-xl font-semibold text-primary mb-4">Wir suchen dich!</p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Werde Teil unseres Vorwerk Kobold Teams und starte in eine flexible, gut vergütete
                Tätigkeit – ganz nach deinen Bedingungen. Ob Nebenjob, Teilzeit oder Quereinstieg –
                bei uns bist du herzlich willkommen.
              </p>
              <a href="#kontakt-job">
                <Button size="lg">Jetzt unverbindlich anfragen</Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Benefits ─────────────────────────────────────────────── */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Deine Vorteile
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Was dich bei uns erwartet – ein Job, der sich deinem Leben anpasst, nicht umgekehrt.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-card rounded-2xl p-6 shadow-card border border-border flex gap-4"
              >
                <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon size={20} className="text-primary" />
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

      {/* ── Highlight ────────────────────────────────────────────── */}
      <section className="section-padding" style={{ background: "var(--section-gradient)" }}>
        <div className="container-narrow">
          <div className="bg-primary rounded-2xl px-8 py-10 text-center text-primary-foreground shadow-lg max-w-2xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3 opacity-80">
              Das Beste
            </p>
            <p className="font-heading text-2xl md:text-3xl font-bold leading-snug">
              Mit deinem Einsatz kannst du dir sogar deinen eigenen Kobold verdienen!
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA / Contact ─────────────────────────────────────────── */}
      <section id="kontakt-job" className="section-padding bg-background">
        <div className="container-narrow text-center max-w-xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Interesse?</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Melde dich für ein unverbindliches Gespräch und erfahre mehr über deine Möglichkeiten
            bei Vorwerk. Wir freuen uns auf dich!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+41794561875">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                +41 79 456 18 75
              </Button>
            </a>
            <a href="mailto:abriclean99@gmail.com">
              <Button size="lg" className="w-full sm:w-auto">
                E-Mail schreiben
              </Button>
            </a>
          </div>
        </div>
      </section>

    </main>
    <Footer />
  </>
);

export default Jobs;
