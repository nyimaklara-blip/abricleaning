import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock } from "lucide-react";
import eventFlyer from "@/assets/flyer-image-6.jpeg";

const Event = () => (
  <>
    <Header />
    <main>
      <section className="section-padding pt-32 md:pt-40 bg-background">
        <div className="container-narrow px-6 md:px-12">
          <div className="max-w-3xl mx-auto">
            {/* Flyer image */}
            <div className="rounded-2xl overflow-hidden shadow-lg mb-8">
              <img
                src={eventFlyer}
                alt="Tag der offenen Tür bei Gülsah – 02.05.2026"
                className="w-full h-auto"
              />
            </div>

            {/* Event details */}
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
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default Event;
