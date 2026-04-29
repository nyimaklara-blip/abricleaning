import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useContent } from "@/context/ContentContext";
import { sendContactEmail } from "@/lib/emailService";

const BookingForm = () => {
  const { toast } = useToast();
  const { content } = useContent();
  const { heading, subtext, fields, gdprText, submitLabel, submitLoadingLabel } =
    content.bookingForm;
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!agreed) {
      toast({ title: "Bitte akzeptieren Sie die Datenschutzbestimmungen.", variant: "destructive" });
      return;
    }
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const contactData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      message: formData.get("message") as string,
    };

    try {
      const success = await sendContactEmail(contactData);
      if (success) {
        toast({
          title: "Vielen Dank!",
          description: "Ihre Anfrage wurde erfolgreich gesendet. Wir melden uns in Kürze bei Ihnen.",
        });
        (e.target as HTMLFormElement).reset();
        setAgreed(false);
      } else {
        toast({
          title: "Fehler",
          description: "Es gab ein Problem beim Senden Ihrer Anfrage. Bitte versuchen Sie es später erneut.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Fehler",
        description: "Es gab ein Problem beim Senden Ihrer Anfrage. Bitte versuchen Sie es später erneut.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="kontakt" className="section-padding bg-card">
      <div className="container-narrow">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              {heading}
            </h2>
            <p className="text-muted-foreground">{subtext}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="name">{fields.name.label}</Label>
                <Input
                  id="name"
                  name="name"
                  required
                  maxLength={100}
                  placeholder={fields.name.placeholder}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">{fields.address.label}</Label>
                <Input
                  id="address"
                  name="address"
                  maxLength={200}
                  placeholder={fields.address.placeholder}
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="email">{fields.email.label}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  maxLength={255}
                  placeholder={fields.email.placeholder}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{fields.phone.label}</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  maxLength={20}
                  placeholder={fields.phone.placeholder}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">{fields.message.label}</Label>
              <Textarea
                id="message"
                name="message"
                maxLength={1000}
                rows={4}
                placeholder={fields.message.placeholder}
              />
            </div>
            <div className="flex items-start gap-3">
              <Checkbox
                id="gdpr"
                checked={agreed}
                onCheckedChange={(v) => setAgreed(v === true)}
              />
              <Label htmlFor="gdpr" className="text-sm text-muted-foreground leading-snug">
                {gdprText}
              </Label>
            </div>
            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? submitLoadingLabel : submitLabel}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
