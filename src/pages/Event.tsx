import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Event = () => (
  <>
    <Header />
    <main>
      <section className="section-padding pt-32 md:pt-40 bg-background">
        <div className="container-narrow px-6 md:px-12">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
                Events
              </h1>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                Vorwerk Kobold live testen und erleben.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card px-6 py-12 text-center shadow-sm md:px-12">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-3">
                Aktuell sind keine Events geplant
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Neue Termine werden hier veröffentlicht.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default Event;
