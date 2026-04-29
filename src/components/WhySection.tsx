import {
  Users,
  Settings,
  Sparkles,
  Clock,
  HeadphonesIcon,
  Lightbulb,
  LucideIcon,
} from "lucide-react";
import { useContent } from "@/context/ContentContext";

const iconMap: Record<string, LucideIcon> = {
  users: Users,
  settings: Settings,
  sparkles: Sparkles,
  clock: Clock,
  headphones: HeadphonesIcon,
  lightbulb: Lightbulb,
};

const WhySection = () => {
  const { content } = useContent();
  const { heading, subtext, benefits } = content.why;

  return (
    <section id="vorteile" className="section-padding" style={{ background: "var(--section-gradient)" }}>
      <div className="container-narrow">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            {heading}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{subtext}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b) => {
            const Icon = iconMap[b.iconName] ?? Sparkles;
            return (
              <div
                key={b.title}
                className="bg-card rounded-lg p-6 shadow-soft hover:shadow-card transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                  {b.title}
                </h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhySection;
