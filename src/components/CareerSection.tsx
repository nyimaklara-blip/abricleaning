import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { CalendarCheck, GraduationCap, Briefcase } from "lucide-react";

const perks = [
  { icon: CalendarCheck, text: "Flexible Zeiteinteilung" },
  { icon: GraduationCap, text: "Kostenlose Schulungen" },
  { icon: Briefcase, text: "Ideal als Nebenjob" },
];

const CareerSection = () => {
  const { toast } = useToast();
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!agreed) {
      toast({ title: "Bitte akzeptieren Sie die Datenschutzbestimmungen.", variant: "destructive" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Bewerbung gesendet!",
        description: "Wir freuen uns auf Sie und melden uns bald.",
      });
      (e.target as HTMLFormElement).reset();
      setAgreed(false);
    }, 1000);
  };

  return (
    <section id="karriere" className="section-padding" style={{ background: "var(--section-gradient)" }}>
      <div className="container-narrow">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Werde Teil des Abricleaning Teams
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Starten Sie Ihre Karriere als Kobold Berater/in — flexibel, selbstbestimmt
            und mit umfassender Unterstützung.
          </p>
        </div>

        {/* Perks */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {perks.map((p) => (
            <div
              key={p.text}
              className="flex items-center gap-3 bg-card rounded-lg px-5 py-3 shadow-soft"
            >
              <p.icon className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-foreground">{p.text}</span>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto bg-card rounded-lg p-8 shadow-card">
          <h3 className="font-heading text-xl font-semibold text-foreground mb-6 text-center">
            Jetzt informieren
          </h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="career-name">Name *</Label>
                <Input id="career-name" name="name" required maxLength={100} placeholder="Ihr Name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="career-email">Email *</Label>
                <Input id="career-email" name="email" type="email" required maxLength={255} placeholder="ihre@email.ch" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="career-phone">Telefon</Label>
                <Input id="career-phone" name="phone" type="tel" maxLength={20} placeholder="+41 79 ..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="career-address">Adresse</Label>
                <Input id="career-address" name="address" maxLength={200} placeholder="Strasse, PLZ, Ort" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="career-message">Nachricht</Label>
              <Textarea id="career-message" name="message" maxLength={1000} rows={3} placeholder="Ihre Nachricht" />
            </div>
            <div className="flex items-start gap-3">
              <Checkbox
                id="career-gdpr"
                checked={agreed}
                onCheckedChange={(v) => setAgreed(v === true)}
              />
              <Label htmlFor="career-gdpr" className="text-sm text-muted-foreground leading-snug">
                Ich stimme der Verarbeitung meiner Daten gemäss der Datenschutzerklärung zu. *
              </Label>
            </div>
            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Wird gesendet..." : "Bewerbung senden"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CareerSection;
