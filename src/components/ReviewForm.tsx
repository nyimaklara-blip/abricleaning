import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const HONEYPOT_FIELD = "website";

export interface SubmittedReview {
  id: string;
  name: string;
  location?: string;
  rating: number;
  text: string;
  date: string;
}

interface Props {
  onPosted?: (review: SubmittedReview) => void;
}

const ReviewForm = ({ onPosted }: Props) => {
  const { toast } = useToast();
  const [hoveredStar, setHoveredStar] = useState(0);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (data.get(HONEYPOT_FIELD)) return;

    if (rating === 0) {
      toast({ title: "Bitte wählen Sie eine Bewertung (1–5 Sterne).", variant: "destructive" });
      return;
    }

    const name = (data.get("name") as string || "").trim();
    const text = (data.get("text") as string || "").trim();

    if (!name || !text) {
      toast({ title: "Bitte füllen Sie alle Pflichtfelder aus.", variant: "destructive" });
      return;
    }

    if (text.length < 10) {
      toast({ title: "Bitte schreiben Sie mindestens 10 Zeichen.", variant: "destructive" });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          location: data.get("location") || "",
          rating,
          text,
        }),
      });

      const result = await res.json();

      if (!res.ok || !result.ok) {
        throw new Error(result.error || "send failed");
      }

      onPosted?.(result.review as SubmittedReview);
      setSubmitted(true);
    } catch (err) {
      toast({
        title: "Fehler beim Senden.",
        description: err instanceof Error ? err.message : "Bitte versuchen Sie es später erneut.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8 px-4">
        <div className="text-4xl mb-3">🎉</div>
        <h3 className="font-heading text-xl font-bold text-foreground mb-2">Vielen Dank!</h3>
        <p className="text-muted-foreground text-sm">
          Ihre Bewertung wurde veröffentlicht.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-background rounded-xl border border-border shadow-soft p-6 max-w-lg mx-auto">
      <h3 className="font-heading text-lg font-bold text-foreground mb-1">Bewertung schreiben</h3>
      <p className="text-sm text-muted-foreground mb-5">Teilen Sie Ihre Erfahrung mit uns.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name={HONEYPOT_FIELD} style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

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
          {loading ? "Wird veröffentlicht..." : "Bewertung veröffentlichen"}
        </Button>
      </form>
    </div>
  );
};

export default ReviewForm;
