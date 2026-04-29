import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { useContent } from "@/context/ContentContext";
import ReviewForm, { type SubmittedReview } from "./ReviewForm";

interface FileReview {
  id: string;
  name: string;
  location?: string;
  rating: number;
  text: string;
  date?: string;
}

const StarRow = ({ rating }: { rating: number }) => (
  <div className="flex gap-1 mb-4">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "fill-primary text-primary" : "text-muted-foreground/20"}`}
      />
    ))}
  </div>
);

const TestimonialsSection = () => {
  const { content } = useContent();
  const { heading, subtext, testimonials } = content.testimonials;
  const [fileReviews, setFileReviews] = useState<FileReview[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("/data/reviews.json")
      .then((r) => (r.ok ? r.json() : []))
      .then((data: FileReview[]) => {
        if (Array.isArray(data)) setFileReviews(data);
      })
      .catch(() => {});
  }, []);

  return (
    <section id="referenzen" className="section-padding bg-card">
      <div className="container-narrow">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            {heading}
          </h2>
          <p className="text-muted-foreground">{subtext}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-background rounded-lg p-6 shadow-soft border border-border"
            >
              <StarRow rating={t.rating} />
              <p className="text-sm text-foreground/80 leading-relaxed mb-4 italic">&ldquo;{t.text}&rdquo;</p>
              <div>
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.location}</p>
              </div>
            </div>
          ))}

          {fileReviews.map((r) => (
            <div
              key={r.id}
              className="bg-background rounded-lg p-6 shadow-soft border border-border"
            >
              <StarRow rating={r.rating} />
              <p className="text-sm text-foreground/80 leading-relaxed mb-4 italic">&ldquo;{r.text}&rdquo;</p>
              <div>
                <p className="text-sm font-semibold text-foreground">{r.name}</p>
                {r.location && <p className="text-xs text-muted-foreground">{r.location}</p>}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors shadow-md"
            >
              <Star className="w-4 h-4 fill-current" />
              Bewertung schreiben
            </button>
          ) : (
            <div className="mt-4 max-w-lg mx-auto">
              <ReviewForm
                onPosted={(r: SubmittedReview) =>
                  setFileReviews((prev) => [r, ...prev])
                }
              />
              <button
                onClick={() => setShowForm(false)}
                className="mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Abbrechen
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
