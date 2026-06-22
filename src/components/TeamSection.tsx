import teamRegionalMeeting from "@/assets/team-regional-meeting-gossau.webp";
import teamRegioMeetingTwo from "@/assets/team-regio-meeting-2026-02.webp";
import teamRegioMeetingFive from "@/assets/team-regio-meeting-2026-05.webp";
import { useContent } from "@/context/ContentContext";

const teamGallery = [
  {
    src: teamRegionalMeeting,
    alt: "Abricleaning Team beim Regional Meeting in Gossau",
    label: "Regional Meeting in Gossau",
    className: "lg:row-span-2",
    imageClassName: "aspect-[4/3] lg:aspect-auto lg:h-full object-[58%_center]",
  },
  {
    src: teamRegioMeetingTwo,
    alt: "Abricleaning Team am Regio Meeting vom 02.06.2026",
    label: "Team Regio Meeting",
    className: "",
    imageClassName: "aspect-[4/3] object-[center_34%]",
  },
  {
    src: teamRegioMeetingFive,
    alt: "Abricleaning Team mit Schweizer Motto am Regio Meeting",
    label: "Gemeinsam unterwegs",
    className: "",
    imageClassName: "aspect-[4/3] object-[center_28%]",
  },
];

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

        <div className="max-w-5xl mx-auto">
          <div className="grid gap-4 lg:grid-cols-[1.35fr_0.9fr] lg:grid-rows-2">
            {teamGallery.map((photo) => (
              <figure
                key={photo.label}
                className={`relative overflow-hidden rounded-lg border border-border bg-card shadow-card ${photo.className}`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className={`h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02] ${photo.imageClassName}`}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/70 to-transparent px-4 pb-4 pt-10 text-sm font-medium text-card">
                  {photo.label}
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-lg border border-border bg-card p-6 shadow-soft md:p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
                Persönlich vor Ort
              </p>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-2">{leadName}</h3>
              <p className="text-sm text-primary font-medium mb-5">{leadRole}</p>
              <div className="flex flex-wrap gap-2">
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

            <div className="rounded-lg border border-border bg-card p-6 shadow-soft md:p-8">
              <p className="text-muted-foreground leading-relaxed text-sm mb-5">{leadBio}</p>
              <p className="text-muted-foreground text-sm italic">{crewCaption}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
