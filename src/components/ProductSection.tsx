import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useContent } from "@/context/ContentContext";
import prodVk7Desc from "@/assets/prod-vk7-desc.png";
import prodVk7Eb7Plant from "@/assets/prod-vk7-eb7-plant.png";
import prodSp7Desc from "@/assets/prod-sp7-desc.png";
import prodPb7Desc from "@/assets/prod-pb7-desc.png";
import prodVg100Desc from "@/assets/prod-vg100-desc.png";
import prodVr7Rb7Desc from "@/assets/prod-vr7-rb7-desc.png";
import prodHd7Desc from "@/assets/prod-hd7-desc.png";

// Local fallback images keyed by product ID.
// Used when Supabase product data doesn't carry an image field.
const productImageFallbacks: Record<string, string> = {
  vk7: prodVk7Desc,
  eb7: prodVk7Eb7Plant,
  sp7: prodSp7Desc,
  pb7: prodPb7Desc,
  vg100: prodVg100Desc,
  vr7rb7: prodVr7Rb7Desc,
  hd7: prodHd7Desc,
};

const ProductSection = () => {
  const { content } = useContent();
  const { heading, subtext, products } = content.product;

  return (
    <section id="produkte" className="section-padding bg-card">
      <div className="container-narrow">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            {heading}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{subtext}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {products.map((p) => (
              <AccordionItem
                key={p.id}
                value={p.id}
                className="bg-background rounded-lg border border-border px-6 shadow-soft"
              >
                <AccordionTrigger className="font-heading text-lg font-semibold hover:no-underline py-5">
                  {p.name}
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="grid md:grid-cols-2 gap-6 items-start">
                    {/* Text side */}
                    <div>
                      <p className="text-muted-foreground mb-4">{p.desc}</p>
                      <ul className="space-y-2 mb-5">
                        {p.benefits.map((b) => (
                          <li key={b} className="flex items-start gap-2 text-sm text-foreground">
                            <span className="text-primary mt-0.5">✓</span>
                            {b}
                          </li>
                        ))}
                      </ul>
                      <a href="#kontakt">
                        <Button size="sm">Jetzt testen</Button>
                      </a>
                    </div>
                    {/* Image side — use stored image or local fallback by product id */}
                    {(p.image || productImageFallbacks[p.id]) && (
                      <div className="rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                        <img
                          src={p.image || productImageFallbacks[p.id]}
                          alt={p.name}
                          className="w-full h-auto object-contain max-h-64"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
