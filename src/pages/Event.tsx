import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock } from "lucide-react";
import ruetihofFlyer from "@/assets/flyer-image-6.jpeg";
import seedammFlyer from "@/assets/flyer-image-9.jpeg";

const Event = () => (
  <>
    <Header />
    <main>
      <section className="section-padding pt-32 md:pt-40 bg-background">
        <div className="container-narrow px-6 md:px-12">
          <div className="max-w-3xl mx-auto space-y-12">

            {/* ── Event 1: Tag der offenen Tür Rütihof ───────────── */}
            <div>
              <div className="rounded-2xl overflow-hidden shadow-lg mb-8">
                <img
                  src={ruetihofFlyer}
                  alt="Tag der offenen Tür bei Gülsah – 02.05.2026"
                  className="w-full h-auto"
                />
              </div>

              <div className="border border-border rounded-lg bg-card shadow-sm text-center px-8 md:px-16 py-10">
                <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                  Tag der offenen Tür
                </h1>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
                  Erleben Sie unsere Produkte live und persönlich. Wir laden Sie herzlich ein!
                </p>

                <div className="space-y-4 mb-8 text-left max-w-md mx-auto">
                  <div className="flex items-center gap-3 text-foreground">
                    <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-base">Samstag, 02. Mai 2026</span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground">
                    <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-base">14:00 – 17:00 Uhr</span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-base">bei Zentrum Arche, Moosstrasse 30, 5406 Rütihof</span>
                  </div>
                </div>

                <a href="https://wa.me/41794561875" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="px-10 h-12 text-base font-semibold shadow-lg">
                    Jetzt anmelden
                  </Button>
                </a>
              </div>
            </div>

            {/* ── Event 2: Seedamm Center Mai 2026 ───────────────── */}
            <div>
              <div className="rounded-2xl overflow-hidden shadow-lg mb-8">
                <img
                  src={seedammFlyer}
                  alt="Seedamm Center Mai 2026 – Vorwerk Kobold live testen"
                  className="w-full h-auto"
                />
              </div>

              <div className="border border-border rounded-lg bg-card shadow-sm text-center px-8 md:px-16 py-10">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
                  Vorwerk Kobold im Seedamm Center
                </h2>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
                  Live testen &amp; erleben — kommen Sie vorbei! Karin Büchel und Christa Abrigada freuen sich auf Sie.
                </p>

                <div className="space-y-3 mb-8 text-left max-w-md mx-auto">
                  <div className="flex items-center gap-3 text-foreground">
                    <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-base">Freitag, 01.05.2026 — 09:00 – 21:00 Uhr</span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground">
                    <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-base">Donnerstag, 07.05.2026 — 09:00 – 21:00 Uhr</span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground">
                    <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-base">Freitag, 15.05.2026 — 09:00 – 21:00 Uhr</span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground">
                    <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-base">Samstag, 16.05.2026 — 08:00 – 18:00 Uhr</span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground pt-2">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-base">Seedamm Center, Gwattstrasse 11, 8808 Pfäffikon</span>
                  </div>
                </div>

                <a href="https://wa.me/41794561875" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="px-10 h-12 text-base font-semibold shadow-lg">
                    Jetzt anmelden
                  </Button>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default Event;
