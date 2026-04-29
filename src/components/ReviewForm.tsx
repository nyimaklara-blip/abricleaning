import { useRef, useState } from "react";
import { ImagePlus, Star, UserRound, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const HONEYPOT_FIELD = "website";
const MAX_AVATAR_BYTES = 2 * 1024 * 1024; // 2 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export interface SubmittedReview {
  id: string;
  name: string;
  location?: string;
  rating: number;
  text: string;
  date: string;
  avatarUrl?: string;
}

async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("file-read-failed"));
    reader.readAsDataURL(file);
  });
}

interface Props {
  onPosted?: (review: SubmittedReview) => void;
}

const ReviewForm = ({ onPosted }: Props) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast({ title: "Nur JPG, PNG oder WebP erlaubt.", variant: "destructive" });
      e.target.value = "";
      return;
    }

    if (file.size > MAX_AVATAR_BYTES) {
      toast({ title: "Das Foto darf maximal 2 MB gross sein.", variant: "destructive" });
      e.target.value = "";
      return;
    }

    setAvatarFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const removeAvatar = () => {
    setAvatarFile(null);
    setPreviewUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

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
      const avatarDataUrl = avatarFile ? await fileToDataUrl(avatarFile) : "";

      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          location: data.get("location") || "",
          rating,
          text,
          avatarDataUrl,
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
        <p className="text-muted-foreground text-sm">Ihre Bewertung wurde veröffentlicht.</p>
      </div>
    );
  }

  return (
    <div className="bg-background rounded-xl border border-border shadow-soft p-6 max-w-lg mx-auto">
      <h3 className="font-heading text-lg font-bold text-foreground mb-1">Bewertung schreiben</h3>
      <p className="text-sm text-muted-foreground mb-5">
        Teilen Sie Ihre Erfahrung mit uns. Profilbild ist optional.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name={HONEYPOT_FIELD} style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

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

        {/* Avatar upload */}
        <div>
          <Label className="mb-2 block">Profilbild (optional)</Label>
          <div className="flex items-center gap-3">
            <div className="relative h-14 w-14 rounded-full bg-muted border border-border overflow-hidden flex items-center justify-center flex-shrink-0">
              {previewUrl ? (
                <img src={previewUrl} alt="Vorschau" className="h-full w-full object-cover" />
              ) : (
                <UserRound className="w-6 h-6 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1 flex flex-wrap gap-2">
              <label className="inline-flex items-center gap-2 text-sm font-medium text-foreground cursor-pointer px-3 py-1.5 rounded-md border border-border hover:bg-muted transition-colors">
                <ImagePlus className="w-4 h-4" />
                {previewUrl ? "Anderes Bild" : "Bild auswählen"}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
              {previewUrl && (
                <button
                  type="button"
                  onClick={removeAvatar}
                  className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-destructive px-3 py-1.5 rounded-md transition-colors"
                >
                  <X className="w-4 h-4" />
                  Entfernen
                </button>
              )}
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-1.5">JPG, PNG oder WebP, max. 2 MB</p>
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
          {loading ? "Wird veröffentlicht..." : "Bewertung veröffentlichen"}
        </Button>
      </form>
    </div>
  );
};

export default ReviewForm;
