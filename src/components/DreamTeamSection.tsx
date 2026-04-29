import { Button } from "@/components/ui/button";
import dreamTeamImgFallback from "@/assets/dream-team-explained-color.jpg";
import { useContent } from "@/context/ContentContext";

const DreamTeamSection = () => {
  const { content } = useContent();
  const { heading, body, bodyItems, bodyFooter, ctaLabel } = content.dreamTeam;
  const dreamTeamImg = content.images.dreamTeam || dreamTeamImgFallback;

  return (
    <section className="section-padding bg-background">
      <div className="container-narrow px-4 md:px-8">

        {/* Bordered content card — matches screenshot layout */}
        <div className="border border-border rounded-lg p-8 md:p-12 text-center max-w-3xl mx-auto mb-10 bg-card shadow-sm">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
            {heading}
          </h2>

          <p className="font-semibold text-foreground mb-3">{body}</p>

          {bodyItems && bodyItems.length > 0 && (
            <div className="space-y-1 mb-4">
              {bodyItems.map((item) => (
                <p key={item} className="text-muted-foreground text-sm md:text-base">
                  {item}
                </p>
              ))}
            </div>
          )}

          {bodyFooter && (
            <p className="font-bold text-foreground mt-3">{bodyFooter}</p>
          )}
        </div>

        {/* Image */}
        <div className="max-w-3xl mx-auto mb-10 rounded-lg overflow-hidden shadow-card">
          <img
            src={dreamTeamImg}
            alt="Kobold VR7 Saugroboter, RB7 Absaugstation, VK7 Akku-Staubsauger und EB7 Elektrobürste"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>

        <div className="text-center">
          <a href="#kontakt">
            <Button size="lg" className="text-base px-10">
              {ctaLabel}
            </Button>
          </a>
        </div>

      </div>
    </section>
  );
};

export default DreamTeamSection;
