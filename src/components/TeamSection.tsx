import teamCrewImg from "@/assets/team-crew.png";
import { useContent } from "@/context/ContentContext";

const TeamSection = () => {
  const { content } = useContent();
  const { heading, subtext, leadName, leadRole, leadBio, crewCaption } = content.team;

  return (
    <section id="team" className="section-padding" style={{ background: "var(--section-gradient)" }}>
      <div className="container-narrow">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            {heading}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{subtext}</p>
        </div>

        {/* Crew photo — full width card */}
        <div className="bg-card rounded-xl shadow-card overflow-hidden max-w-3xl mx-auto">
          <div className="overflow-hidden">
            <img
              src={teamCrewImg}
              alt="Christas saugstarke Crew"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
          <div className="p-6 md:p-8">
            <h3 className="font-heading text-xl font-bold text-foreground mb-1">{leadName}</h3>
            <p className="text-sm text-primary font-medium mb-4">{leadRole}</p>
            <p className="text-muted-foreground leading-relaxed text-sm mb-5">{leadBio}</p>
            <p className="text-muted-foreground text-sm italic">{crewCaption}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-block bg-accent text-accent-foreground text-xs font-medium rounded-full px-3 py-1">
                10+ Jahre Erfahrung
              </span>
              <span className="inline-block bg-accent text-accent-foreground text-xs font-medium rounded-full px-3 py-1">
                Zürcher Oberland
              </span>
              <span className="inline-block bg-accent text-accent-foreground text-xs font-medium rounded-full px-3 py-1">
                Kobold zertifiziert
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
