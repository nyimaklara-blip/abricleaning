import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { defaultContent } from "@/content/defaults";
import { useContent } from "@/context/ContentContext";
import type {
  SiteContent,
  NavItem,
  TrustItem,
  Benefit,
  Product,
  Promotion,
  Testimonial,
  TeamContent,
} from "@/types/content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// ─── Login Screen ─────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm bg-card rounded-xl shadow-card p-8">
        <h1 className="font-heading text-2xl font-bold text-foreground mb-2">
          abricleaning Admin
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          Melden Sie sich an, um Inhalte zu bearbeiten.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="email">E-Mail</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Passwort</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Anmelden..." : "Anmelden"}
          </Button>
        </form>
      </div>
    </div>
  );
}

// ─── Reusable field components ────────────────────────────────────────────────

function Field({
  label,
  value,
  onChange,
  multiline = false,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  rows?: number;
}) {
  return (
    <div className="space-y-1">
      <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        {label}
      </Label>
      {multiline ? (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          className="text-sm"
        />
      ) : (
        <Input value={value} onChange={(e) => onChange(e.target.value)} className="text-sm" />
      )}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-heading text-lg font-semibold text-foreground border-b border-border pb-2 mb-4">
      {children}
    </h2>
  );
}

function ListCard({ children, onRemove }: { children: React.ReactNode; onRemove: () => void }) {
  return (
    <div className="border border-border rounded-lg p-4 space-y-3 bg-background relative">
      {children}
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-3 right-3 text-xs text-destructive hover:underline"
      >
        Entfernen
      </button>
    </div>
  );
}

// ─── Section editors ──────────────────────────────────────────────────────────

function HeaderEditor({
  draft,
  onChange,
}: {
  draft: SiteContent;
  onChange: (d: SiteContent) => void;
}) {
  const h = draft.header;
  const set = (patch: Partial<typeof h>) => onChange({ ...draft, header: { ...h, ...patch } });

  const updateNavItem = (i: number, patch: Partial<NavItem>) => {
    const items = h.navItems.map((item, idx) => (idx === i ? { ...item, ...patch } : item));
    set({ navItems: items });
  };

  return (
    <div className="space-y-6">
      <SectionTitle>Navigation & Header</SectionTitle>
      <Field label="CTA Button Text" value={h.ctaLabel} onChange={(v) => set({ ctaLabel: v })} />
      <div>
        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
          Navigationslinks
        </Label>
        <div className="space-y-2">
          {h.navItems.map((item, i) => (
            <div key={i} className="flex gap-2">
              <Input
                value={item.label}
                onChange={(e) => updateNavItem(i, { label: e.target.value })}
                placeholder="Label"
                className="text-sm"
              />
              <Input
                value={item.href}
                onChange={(e) => updateNavItem(i, { href: e.target.value })}
                placeholder="#anker"
                className="text-sm w-36"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HeroEditor({
  draft,
  onChange,
}: {
  draft: SiteContent;
  onChange: (d: SiteContent) => void;
}) {
  const h = draft.hero;
  const set = (patch: Partial<typeof h>) => onChange({ ...draft, hero: { ...h, ...patch } });
  const bullets = h.bullets ?? [];

  const updateBullet = (i: number, value: string) => {
    const updated = bullets.map((b, idx) => (idx === i ? value : b));
    set({ bullets: updated });
  };

  const addBullet = () => set({ bullets: [...bullets, ""] });
  const removeBullet = (i: number) => set({ bullets: bullets.filter((_, idx) => idx !== i) });

  return (
    <div className="space-y-4">
      <SectionTitle>Hero-Bereich</SectionTitle>
      <Field
        label="Hauptüberschrift"
        value={h.headline}
        onChange={(v) => set({ headline: v })}
      />
      <div>
        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
          Aufzählungspunkte (• Einfach • Effizient • Komfortabel)
        </Label>
        <div className="space-y-1">
          {bullets.map((b, i) => (
            <div key={i} className="flex gap-2">
              <Input
                value={b}
                onChange={(e) => updateBullet(i, e.target.value)}
                className="text-sm"
                placeholder="z.B. Einfach"
              />
              <button
                type="button"
                onClick={() => removeBullet(i)}
                className="text-xs text-destructive hover:underline whitespace-nowrap"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addBullet}
          className="mt-2 text-xs text-primary hover:underline"
        >
          + Punkt hinzufügen
        </button>
      </div>
      <Field
        label="Untertitel"
        value={h.subtext}
        onChange={(v) => set({ subtext: v })}
        multiline
        rows={2}
      />
      <Field label="CTA Button Text" value={h.ctaLabel} onChange={(v) => set({ ctaLabel: v })} />
    </div>
  );
}

function AboutEditor({
  draft,
  onChange,
}: {
  draft: SiteContent;
  onChange: (d: SiteContent) => void;
}) {
  const a = draft.about;
  const set = (patch: Partial<typeof a>) => onChange({ ...draft, about: { ...a, ...patch } });

  const updateTrust = (i: number, patch: Partial<TrustItem>) => {
    const items = a.trustItems.map((item, idx) => (idx === i ? { ...item, ...patch } : item));
    set({ trustItems: items });
  };

  return (
    <div className="space-y-4">
      <SectionTitle>Über mich</SectionTitle>
      <Field label="Überschrift" value={a.heading} onChange={(v) => set({ heading: v })} />
      <Field label="Absatz 1" value={a.body1} onChange={(v) => set({ body1: v })} multiline />
      <Field label="Absatz 2" value={a.body2} onChange={(v) => set({ body2: v })} multiline />
      <Field label="Badge: Name" value={a.badgeName} onChange={(v) => set({ badgeName: v })} />
      <Field label="Badge: Rolle" value={a.badgeRole} onChange={(v) => set({ badgeRole: v })} />
      <div>
        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
          Vertrauenspunkte
        </Label>
        <div className="space-y-2">
          {a.trustItems.map((item, i) => (
            <Input
              key={i}
              value={item.text}
              onChange={(e) => updateTrust(i, { text: e.target.value })}
              className="text-sm"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function WhyEditor({
  draft,
  onChange,
}: {
  draft: SiteContent;
  onChange: (d: SiteContent) => void;
}) {
  const w = draft.why;
  const set = (patch: Partial<typeof w>) => onChange({ ...draft, why: { ...w, ...patch } });

  const updateBenefit = (i: number, patch: Partial<Benefit>) => {
    const items = w.benefits.map((item, idx) => (idx === i ? { ...item, ...patch } : item));
    set({ benefits: items });
  };

  const addBenefit = () =>
    set({ benefits: [...w.benefits, { iconName: "sparkles", title: "", desc: "" }] });

  const removeBenefit = (i: number) =>
    set({ benefits: w.benefits.filter((_, idx) => idx !== i) });

  return (
    <div className="space-y-4">
      <SectionTitle>Vorteile</SectionTitle>
      <Field label="Überschrift" value={w.heading} onChange={(v) => set({ heading: v })} />
      <Field label="Untertitel" value={w.subtext} onChange={(v) => set({ subtext: v })} />
      <div className="space-y-3">
        {w.benefits.map((b, i) => (
          <ListCard key={i} onRemove={() => removeBenefit(i)}>
            <Field label="Titel" value={b.title} onChange={(v) => updateBenefit(i, { title: v })} />
            <Field
              label="Beschreibung"
              value={b.desc}
              onChange={(v) => updateBenefit(i, { desc: v })}
            />
          </ListCard>
        ))}
      </div>
      <Button type="button" variant="outline" size="sm" onClick={addBenefit}>
        + Vorteil hinzufügen
      </Button>
    </div>
  );
}

function ProductEditor({
  draft,
  onChange,
}: {
  draft: SiteContent;
  onChange: (d: SiteContent) => void;
}) {
  const p = draft.product;
  const set = (patch: Partial<typeof p>) => onChange({ ...draft, product: { ...p, ...patch } });

  const updateProduct = (i: number, patch: Partial<Product>) => {
    const items = p.products.map((item, idx) => (idx === i ? { ...item, ...patch } : item));
    set({ products: items });
  };

  const updateBenefit = (pi: number, bi: number, value: string) => {
    const products = p.products.map((prod, idx) => {
      if (idx !== pi) return prod;
      const benefits = prod.benefits.map((b, bidx) => (bidx === bi ? value : b));
      return { ...prod, benefits };
    });
    set({ products });
  };

  const addBenefit = (pi: number) => {
    const products = p.products.map((prod, idx) =>
      idx === pi ? { ...prod, benefits: [...prod.benefits, ""] } : prod
    );
    set({ products });
  };

  const removeBenefit = (pi: number, bi: number) => {
    const products = p.products.map((prod, idx) =>
      idx === pi ? { ...prod, benefits: prod.benefits.filter((_, bidx) => bidx !== bi) } : prod
    );
    set({ products });
  };

  const addProduct = () =>
    set({
      products: [
        ...p.products,
        { id: `product-${Date.now()}`, name: "", desc: "", benefits: [] },
      ],
    });

  const removeProduct = (i: number) =>
    set({ products: p.products.filter((_, idx) => idx !== i) });

  return (
    <div className="space-y-4">
      <SectionTitle>Produkte</SectionTitle>
      <Field label="Überschrift" value={p.heading} onChange={(v) => set({ heading: v })} />
      <Field label="Untertitel" value={p.subtext} onChange={(v) => set({ subtext: v })} />
      <div className="space-y-4">
        {p.products.map((prod, i) => (
          <ListCard key={prod.id} onRemove={() => removeProduct(i)}>
            <Field label="Name" value={prod.name} onChange={(v) => updateProduct(i, { name: v })} />
            <Field
              label="Beschreibung"
              value={prod.desc}
              onChange={(v) => updateProduct(i, { desc: v })}
              multiline
              rows={2}
            />
            <div>
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
                Vorteile
              </Label>
              <div className="space-y-1">
                {prod.benefits.map((b, bi) => (
                  <div key={bi} className="flex gap-2">
                    <Input
                      value={b}
                      onChange={(e) => updateBenefit(i, bi, e.target.value)}
                      className="text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => removeBenefit(i, bi)}
                      className="text-xs text-destructive hover:underline whitespace-nowrap"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => addBenefit(i)}
                className="mt-2 text-xs text-primary hover:underline"
              >
                + Vorteil hinzufügen
              </button>
            </div>
          </ListCard>
        ))}
      </div>
      <Button type="button" variant="outline" size="sm" onClick={addProduct}>
        + Produkt hinzufügen
      </Button>
    </div>
  );
}

function DreamTeamEditor({
  draft,
  onChange,
}: {
  draft: SiteContent;
  onChange: (d: SiteContent) => void;
}) {
  const d = draft.dreamTeam;
  const set = (patch: Partial<typeof d>) =>
    onChange({ ...draft, dreamTeam: { ...d, ...patch } });

  return (
    <div className="space-y-4">
      <SectionTitle>Dream-Team Sektion</SectionTitle>
      <Field label="Überschrift" value={d.heading} onChange={(v) => set({ heading: v })} />
      <Field label="Text" value={d.body} onChange={(v) => set({ body: v })} multiline rows={3} />
      <Field label="Button Text" value={d.ctaLabel} onChange={(v) => set({ ctaLabel: v })} />
    </div>
  );
}

function PromotionsEditor({
  draft,
  onChange,
}: {
  draft: SiteContent;
  onChange: (d: SiteContent) => void;
}) {
  const p = draft.promotions;
  const set = (patch: Partial<typeof p>) =>
    onChange({ ...draft, promotions: { ...p, ...patch } });

  const updatePromo = (i: number, patch: Partial<Promotion>) => {
    const promotions = p.promotions.map((item, idx) =>
      idx === i ? { ...item, ...patch } : item
    );
    set({ promotions });
  };

  const addPromo = () =>
    set({
      promotions: [
        ...p.promotions,
        { title: "", description: "", cta: "Jetzt anfragen", active: true },
      ],
    });

  const removePromo = (i: number) =>
    set({ promotions: p.promotions.filter((_, idx) => idx !== i) });

  return (
    <div className="space-y-4">
      <SectionTitle>Promotionen</SectionTitle>
      <Field label="Überschrift" value={p.heading} onChange={(v) => set({ heading: v })} />
      <Field label="Untertitel" value={p.subtext} onChange={(v) => set({ subtext: v })} />
      <div className="space-y-4">
        {p.promotions.map((promo, i) => (
          <ListCard key={i} onRemove={() => removePromo(i)}>
            <div className="flex items-center gap-2 mb-1">
              <input
                type="checkbox"
                id={`promo-active-${i}`}
                checked={promo.active}
                onChange={(e) => updatePromo(i, { active: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor={`promo-active-${i}`} className="text-xs text-muted-foreground">
                Aktiv (wird auf der Website angezeigt)
              </label>
            </div>
            <Field
              label="Titel"
              value={promo.title}
              onChange={(v) => updatePromo(i, { title: v })}
            />
            <Field
              label="Beschreibung"
              value={promo.description}
              onChange={(v) => updatePromo(i, { description: v })}
              multiline
              rows={3}
            />
            <Field
              label="Button Text"
              value={promo.cta}
              onChange={(v) => updatePromo(i, { cta: v })}
            />
          </ListCard>
        ))}
      </div>
      <Button type="button" variant="outline" size="sm" onClick={addPromo}>
        + Promotion hinzufügen
      </Button>
    </div>
  );
}

function TestimonialsEditor({
  draft,
  onChange,
}: {
  draft: SiteContent;
  onChange: (d: SiteContent) => void;
}) {
  const t = draft.testimonials;
  const set = (patch: Partial<typeof t>) =>
    onChange({ ...draft, testimonials: { ...t, ...patch } });

  const updateTestimonial = (i: number, patch: Partial<Testimonial>) => {
    const testimonials = t.testimonials.map((item, idx) =>
      idx === i ? { ...item, ...patch } : item
    );
    set({ testimonials });
  };

  const addTestimonial = () =>
    set({
      testimonials: [
        ...t.testimonials,
        { name: "", location: "", rating: 5, text: "" },
      ],
    });

  const removeTestimonial = (i: number) =>
    set({ testimonials: t.testimonials.filter((_, idx) => idx !== i) });

  return (
    <div className="space-y-4">
      <SectionTitle>Kundenbewertungen</SectionTitle>
      <Field label="Überschrift" value={t.heading} onChange={(v) => set({ heading: v })} />
      <Field label="Untertitel" value={t.subtext} onChange={(v) => set({ subtext: v })} />
      <div className="space-y-4">
        {t.testimonials.map((testimonial, i) => (
          <ListCard key={i} onRemove={() => removeTestimonial(i)}>
            <div className="grid grid-cols-2 gap-3">
              <Field
                label="Name"
                value={testimonial.name}
                onChange={(v) => updateTestimonial(i, { name: v })}
              />
              <Field
                label="Ort"
                value={testimonial.location}
                onChange={(v) => updateTestimonial(i, { location: v })}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Bewertung (1–5 Sterne)
              </Label>
              <select
                value={testimonial.rating}
                onChange={(e) => updateTestimonial(i, { rating: Number(e.target.value) })}
                className="border border-input rounded-md px-3 py-2 text-sm bg-background w-full"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n} Stern{n !== 1 ? "e" : ""}
                  </option>
                ))}
              </select>
            </div>
            <Field
              label="Bewertungstext"
              value={testimonial.text}
              onChange={(v) => updateTestimonial(i, { text: v })}
              multiline
              rows={3}
            />
          </ListCard>
        ))}
      </div>
      <Button type="button" variant="outline" size="sm" onClick={addTestimonial}>
        + Bewertung hinzufügen
      </Button>
    </div>
  );
}

function ContactFormEditor({
  draft,
  onChange,
}: {
  draft: SiteContent;
  onChange: (d: SiteContent) => void;
}) {
  const f = draft.bookingForm;
  const set = (patch: Partial<typeof f>) =>
    onChange({ ...draft, bookingForm: { ...f, ...patch } });

  const setField = (
    key: keyof typeof f.fields,
    patch: Partial<{ label: string; placeholder: string }>
  ) =>
    set({ fields: { ...f.fields, [key]: { ...f.fields[key], ...patch } } });

  return (
    <div className="space-y-4">
      <SectionTitle>Kontaktformular</SectionTitle>
      <Field label="Überschrift" value={f.heading} onChange={(v) => set({ heading: v })} />
      <Field
        label="Untertitel"
        value={f.subtext}
        onChange={(v) => set({ subtext: v })}
        multiline
        rows={2}
      />
      <div className="grid grid-cols-2 gap-3">
        {(Object.keys(f.fields) as Array<keyof typeof f.fields>).map((key) => (
          <div key={key} className="border border-border rounded-lg p-3 space-y-2">
            <p className="text-xs font-semibold text-foreground capitalize">{key}</p>
            <Field
              label="Label"
              value={f.fields[key].label}
              onChange={(v) => setField(key, { label: v })}
            />
            <Field
              label="Platzhalter"
              value={f.fields[key].placeholder}
              onChange={(v) => setField(key, { placeholder: v })}
            />
          </div>
        ))}
      </div>
      <Field
        label="Datenschutz-Text"
        value={f.gdprText}
        onChange={(v) => set({ gdprText: v })}
        multiline
        rows={2}
      />
      <Field
        label="Absenden-Button"
        value={f.submitLabel}
        onChange={(v) => set({ submitLabel: v })}
      />
      <Field
        label="Ladetext (beim Senden)"
        value={f.submitLoadingLabel}
        onChange={(v) => set({ submitLoadingLabel: v })}
      />
    </div>
  );
}

function FooterEditor({
  draft,
  onChange,
}: {
  draft: SiteContent;
  onChange: (d: SiteContent) => void;
}) {
  const fo = draft.footer;
  const set = (patch: Partial<typeof fo>) => onChange({ ...draft, footer: { ...fo, ...patch } });

  return (
    <div className="space-y-4">
      <SectionTitle>Footer</SectionTitle>
      <Field label="Slogan" value={fo.tagline} onChange={(v) => set({ tagline: v })} multiline rows={2} />
      <Field label="Name" value={fo.contactName} onChange={(v) => set({ contactName: v })} />
      <Field label="Rolle" value={fo.contactRole} onChange={(v) => set({ contactRole: v })} />
      <Field label="Adresse" value={fo.contactAddress} onChange={(v) => set({ contactAddress: v })} />
      <Field label="Telefon" value={fo.contactPhone} onChange={(v) => set({ contactPhone: v })} />
      <Field label="E-Mail" value={fo.contactEmail} onChange={(v) => set({ contactEmail: v })} />
    </div>
  );
}

// ─── Reviews Admin ────────────────────────────────────────────────────────────

function ReviewsAdmin() {
  const [reviews, setReviews] = useState<{ id: string; name: string; location: string; rating: number; text: string; approved: boolean; created_at: string }[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setReviews(data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const approve = async (id: string) => {
    await supabase.from("reviews").update({ approved: true }).eq("id", id);
    setReviews((prev) => prev.map((r) => r.id === id ? { ...r, approved: true } : r));
  };

  const remove = async (id: string) => {
    await supabase.from("reviews").delete().eq("id", id);
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const pending = reviews.filter((r) => !r.approved);
  const approved = reviews.filter((r) => r.approved);

  return (
    <div className="space-y-6">
      <SectionTitle>Kundenrezensionen verwalten</SectionTitle>
      {loading && <p className="text-sm text-muted-foreground">Wird geladen…</p>}
      {!loading && reviews.length === 0 && (
        <p className="text-sm text-muted-foreground">Noch keine Rezensionen vorhanden.</p>
      )}
      {pending.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Ausstehend ({pending.length})</p>
          <div className="space-y-3">
            {pending.map((r) => (
              <div key={r.id} className="border border-amber-300 bg-amber-50 dark:bg-amber-950/20 rounded-lg p-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">{r.name}{r.location && <span className="text-muted-foreground font-normal"> – {r.location}</span>}</p>
                    <p className="text-xs text-primary my-1">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</p>
                    <p className="text-sm italic text-foreground/80">"{r.text}"</p>
                    <p className="text-xs text-muted-foreground mt-1">{new Date(r.created_at).toLocaleDateString("de-CH")}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button size="sm" onClick={() => approve(r.id)}>Genehmigen</Button>
                    <Button size="sm" variant="destructive" onClick={() => remove(r.id)}>Löschen</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {approved.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Veröffentlicht ({approved.length})</p>
          <div className="space-y-3">
            {approved.map((r) => (
              <div key={r.id} className="border border-border bg-background rounded-lg p-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">{r.name}{r.location && <span className="text-muted-foreground font-normal"> – {r.location}</span>}</p>
                    <p className="text-xs text-primary my-1">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</p>
                    <p className="text-sm italic text-foreground/80">"{r.text}"</p>
                    <p className="text-xs text-muted-foreground mt-1">{new Date(r.created_at).toLocaleDateString("de-CH")}</p>
                  </div>
                  <Button size="sm" variant="destructive" onClick={() => remove(r.id)}>Löschen</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Image upload helper ──────────────────────────────────────────────────────

function ImageUploadButton({
  currentUrl,
  fallbackLabel,
  storagePath,
  onUploaded,
}: {
  currentUrl: string;
  fallbackLabel: string;
  storagePath: string;
  onUploaded: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    const ext = file.name.split(".").pop();
    const path = `${storagePath}-${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage
      .from("site-images")
      .upload(path, file, { upsert: true });
    if (upErr) {
      setError(upErr.message);
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("site-images").getPublicUrl(path);
    onUploaded(data.publicUrl);
    setUploading(false);
    // reset input so same file can be re-selected
    e.target.value = "";
  };

  return (
    <div className="space-y-2">
      {currentUrl ? (
        <img
          src={currentUrl}
          alt="Vorschau"
          className="w-full max-h-48 object-contain rounded-lg border border-border bg-muted"
        />
      ) : (
        <div className="w-full h-24 rounded-lg border border-dashed border-border bg-muted flex items-center justify-center text-xs text-muted-foreground">
          {fallbackLabel}
        </div>
      )}
      <label className="inline-flex items-center gap-2 cursor-pointer">
        <span className="text-xs bg-secondary text-secondary-foreground rounded-md px-3 py-1.5 hover:bg-secondary/80 transition-colors">
          {uploading ? "Wird hochgeladen..." : "Bild ändern"}
        </span>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          disabled={uploading}
          onChange={handleFile}
        />
      </label>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

// ─── Images editor ────────────────────────────────────────────────────────────

function ImagesEditor({
  draft,
  onChange,
}: {
  draft: SiteContent;
  onChange: (d: SiteContent) => void;
}) {
  const img = draft.images;
  const set = (patch: Partial<typeof img>) =>
    onChange({ ...draft, images: { ...img, ...patch } });

  const setHeroUrl = (i: number, url: string) => {
    const hero = [...img.hero];
    hero[i] = url;
    set({ hero });
  };

  const addHeroSlide = () => set({ hero: [...img.hero, ""] });

  const removeHeroSlide = (i: number) =>
    set({ hero: img.hero.filter((_, idx) => idx !== i) });

  return (
    <div className="space-y-8">
      <SectionTitle>Bilder verwalten</SectionTitle>

      {/* Logo */}
      <div className="space-y-2">
        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide block">
          Logo
        </Label>
        <ImageUploadButton
          currentUrl={img.logo}
          fallbackLabel="Aktuelles Logo (eingebettet)"
          storagePath="logo/logo"
          onUploaded={(url) => set({ logo: url })}
        />
      </div>

      {/* Hero Slideshow */}
      <div className="space-y-3">
        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide block">
          Hero-Bilder (Slideshow)
        </Label>
        {img.hero.map((url, i) => (
          <div key={i} className="border border-border rounded-lg p-4 space-y-2 bg-background relative">
            <p className="text-xs text-muted-foreground font-medium">Bild {i + 1}</p>
            <ImageUploadButton
              currentUrl={url}
              fallbackLabel={`Standard-Bild ${i + 1}`}
              storagePath={`hero/hero-${i + 1}`}
              onUploaded={(url) => setHeroUrl(i, url)}
            />
            {img.hero.length > 1 && (
              <button
                type="button"
                onClick={() => removeHeroSlide(i)}
                className="text-xs text-destructive hover:underline"
              >
                Bild entfernen
              </button>
            )}
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={addHeroSlide}>
          + Bild hinzufügen
        </Button>
      </div>

      {/* Christa Portrait */}
      <div className="space-y-2">
        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide block">
          Portrait (Über mich)
        </Label>
        <ImageUploadButton
          currentUrl={img.christaPortrait}
          fallbackLabel="Aktuelles Portrait (eingebettet)"
          storagePath="portrait/christa"
          onUploaded={(url) => set({ christaPortrait: url })}
        />
      </div>

      {/* Dream Team */}
      <div className="space-y-2">
        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide block">
          Dream-Team Produktbild
        </Label>
        <ImageUploadButton
          currentUrl={img.dreamTeam}
          fallbackLabel="Aktuelles Dream-Team Bild (eingebettet)"
          storagePath="dreamteam/dream-team"
          onUploaded={(url) => set({ dreamTeam: url })}
        />
      </div>
    </div>
  );
}

function TeamEditor({
  draft,
  onChange,
}: {
  draft: SiteContent;
  onChange: (d: SiteContent) => void;
}) {
  const t = draft.team;
  const set = (patch: Partial<TeamContent>) => onChange({ ...draft, team: { ...t, ...patch } });

  return (
    <div className="space-y-4">
      <SectionTitle>Team</SectionTitle>
      <Field label="Überschrift" value={t.heading} onChange={(v) => set({ heading: v })} />
      <Field label="Untertitel" value={t.subtext} onChange={(v) => set({ subtext: v })} multiline rows={2} />
      <Field label="Name (Teamleiterin)" value={t.leadName} onChange={(v) => set({ leadName: v })} />
      <Field label="Rolle (Teamleiterin)" value={t.leadRole} onChange={(v) => set({ leadRole: v })} />
      <Field label="Biografie" value={t.leadBio} onChange={(v) => set({ leadBio: v })} multiline rows={4} />
      <Field label="Bildunterschrift Crew-Foto" value={t.crewCaption} onChange={(v) => set({ crewCaption: v })} multiline rows={2} />
    </div>
  );
}

// ─── Sidebar tabs config ──────────────────────────────────────────────────────

const TABS = [
  { id: "images", label: "🖼 Bilder" },
  { id: "header", label: "Navigation" },
  { id: "hero", label: "Hero" },
  { id: "about", label: "Über mich" },
  { id: "why", label: "Vorteile" },
  { id: "product", label: "Produkte" },
  { id: "dreamTeam", label: "Dream-Team" },
  { id: "promotions", label: "Promotionen" },
  { id: "testimonials", label: "Bewertungen" },
  { id: "reviews", label: "⭐ Rezensionen" },
  { id: "team", label: "Team" },
  { id: "bookingForm", label: "Kontaktformular" },
  { id: "footer", label: "Footer" },
] as const;

type TabId = (typeof TABS)[number]["id"];

// ─── Admin Panel ──────────────────────────────────────────────────────────────

function AdminPanel({ onLogout }: { onLogout: () => void }) {
  const { content: liveContent, refetch } = useContent();
  const [draft, setDraft] = useState<SiteContent>(liveContent);
  const [activeTab, setActiveTab] = useState<TabId>("images");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Sync draft when live content loads from Supabase
  useEffect(() => {
    setDraft(liveContent);
  }, [liveContent]);

  const handleChange = useCallback((updated: SiteContent) => {
    setDraft(updated);
    setHasChanges(true);
    setSaveSuccess(false);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaveError("");
    setSaveSuccess(false);
    const { error } = await supabase
      .from("site_content")
      .update({ data: draft })
      .eq("id", 1);
    setSaving(false);
    if (error) {
      setSaveError(error.message);
    } else {
      setHasChanges(false);
      setSaveSuccess(true);
      refetch();
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handleLogout = async () => {
    if (hasChanges && !window.confirm("Sie haben ungespeicherte Änderungen. Wirklich abmelden?")) {
      return;
    }
    await supabase.auth.signOut();
    onLogout();
  };

  const renderEditor = () => {
    switch (activeTab) {
      case "images":
        return <ImagesEditor draft={draft} onChange={handleChange} />;
      case "header":
        return <HeaderEditor draft={draft} onChange={handleChange} />;
      case "hero":
        return <HeroEditor draft={draft} onChange={handleChange} />;
      case "about":
        return <AboutEditor draft={draft} onChange={handleChange} />;
      case "why":
        return <WhyEditor draft={draft} onChange={handleChange} />;
      case "product":
        return <ProductEditor draft={draft} onChange={handleChange} />;
      case "dreamTeam":
        return <DreamTeamEditor draft={draft} onChange={handleChange} />;
      case "promotions":
        return <PromotionsEditor draft={draft} onChange={handleChange} />;
      case "testimonials":
        return <TestimonialsEditor draft={draft} onChange={handleChange} />;
      case "reviews":
        return <ReviewsAdmin />;
      case "team":
        return <TeamEditor draft={draft} onChange={handleChange} />;
      case "bookingForm":
        return <ContactFormEditor draft={draft} onChange={handleChange} />;
      case "footer":
        return <FooterEditor draft={draft} onChange={handleChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4 md:px-6 flex-shrink-0">
        <div className="flex items-center gap-3">
          <span className="font-heading font-bold text-foreground">abricleaning Admin</span>
          {hasChanges && (
            <span className="text-xs bg-amber-100 text-amber-700 rounded-full px-2 py-0.5">
              Ungespeichert
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Website ansehen ↗
          </a>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            Abmelden
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-44 border-r border-border bg-card flex-shrink-0 overflow-y-auto">
          <nav className="p-2 space-y-0.5">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-foreground/70 hover:bg-accent hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Editor area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-2xl mx-auto">
            {renderEditor()}

            {/* Save controls */}
            <div className="mt-8 pt-6 border-t border-border flex items-center gap-4">
              <Button onClick={handleSave} disabled={saving || !hasChanges}>
                {saving ? "Wird gespeichert..." : "Änderungen speichern"}
              </Button>
              {saveSuccess && (
                <span className="text-sm text-green-600 font-medium">
                  Gespeichert!
                </span>
              )}
              {saveError && (
                <span className="text-sm text-destructive">{saveError}</span>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// ─── Root Admin component ─────────────────────────────────────────────────────

const Admin = () => {
  const [session, setSession] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(!!data.session);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(!!s);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (session === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-muted-foreground text-sm">Laden...</span>
      </div>
    );
  }

  if (!session) {
    return <LoginScreen onLogin={() => setSession(true)} />;
  }

  return <AdminPanel onLogout={() => setSession(false)} />;
};

export default Admin;
