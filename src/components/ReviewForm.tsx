import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

const ReviewForm = () => {
  const { toast } = useToast();
  const [hoveredStar, setHoveredStar] = useState(0);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rating === 0) {
      toast({ title: "Bitte wählen Sie eine Bewertung (1–5 Sterne).", variant: "destructive" });
      return;
    }
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);

    const { error } = await supabase.from("reviews").insert({
      name: data.get("name") as string,
      location: data.get("location") as string,
      rating,
      text: data.get("text") as string,
    });

    setLoading(false);

    if (error) {
      toast({ title: "Fehler", description: "Ihre Bewertung konnte nicht gesendet werden.", variant: "destructive" });
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-8 px-4">
        <div className="text-4xl mb-3">🙏</div>
        <h3 className="font-heading text-xl font-bold text-foreground mb-2">Vielen Dank!</h3>
        <p className="text-muted-foreground text-sm">
          Ihre Bewertung wurde eingereicht und wird nach Prüfung veröffentlicht.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-background rounded-xl border border-border shadow-soft p-6 max-w-lg mx-auto">
      <h3 className="font-heading text-lg font-bold text-foreground mb-1">Bewertung schreiben</h3>
      <p className="text-sm text-muted-foreground mb-5">Teilen Sie Ihre Erfahrung mit uns.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Star rating */}
        <div>
          <Label className="mb-2 block">Ihre Bewertung *</Label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                className="p-1 transition-transform hover:scale-110 focus:outline-none"
                aria-label={`${star} Sterne`}
              >
                <Star
                  className={`w-8 h-8 transition-colors ${
                    star <= (hoveredStar || rating)
                      ? "fill-primary text-primary"
                      : "text-muted-foreground/40"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Name + Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="review-name">Name *</Label>
            <Input id="review-name" name="name" required maxLength={80} placeholder="Ihr Name" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="review-location">Ort</Label>
            <Input id="review-location" name="location" maxLength={80} placeholder="z. B. Uster" />
          </div>
        </div>

        {/* Review text */}
        <div className="space-y-1">
          <Label htmlFor="review-text">Ihre Erfahrung *</Label>
          <Textarea
            id="review-text"
            name="text"
            required
            maxLength={500}
            rows={4}
            placeholder="Was hat Ihnen besonders gut gefallen?"
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Wird gesendet..." : "Bewertung einreichen"}
        </Button>
      </form>
    </div>
  );
};

export default ReviewForm;
