import type { SiteContent } from "@/types/content";
import prodVk7Desc from "@/assets/prod-vk7-desc.png";
import prodVk7Eb7Set from "@/assets/prod-vk7-eb7-set.png";
import prodSp7Desc from "@/assets/prod-sp7-desc.png";
import prodPb7Desc from "@/assets/prod-pb7-desc.png";
import prodVg100Desc from "@/assets/prod-vg100-desc.png";
import prodVr7Rb7Desc from "@/assets/prod-vr7-rb7-desc.png";
import prodHd7Desc from "@/assets/prod-hd7-desc.png";
import heroNew1 from "@/assets/hero-new-1.jpg";
import heroNew2 from "@/assets/hero-new-2.jpg";
import heroNew3 from "@/assets/hero-new-3.jpg";
import heroNew4 from "@/assets/hero-new-4.jpg";
import heroNew5 from "@/assets/hero-new-5.jpg";
import portraitRedNecklace from "@/assets/portrait-red-necklace.png";
import dreamTeamPolsterboyPlant from "@/assets/dream-team-explained-color.jpg";

export const defaultContent: SiteContent = {
  // Image URLs are populated after uploading to Supabase Storage.
  // Empty strings here cause components to fall back to the bundled static assets.
  images: {
    logo: "",
    hero: ["", "", "", "", ""],
    christaPortrait: "",
    dreamTeam: "",
  },

  header: {
    ctaLabel: "Jetzt Vorführung buchen",
    navItems: [
      { label: "Produkte", href: "#produkte" },
      { label: "Vorteile", href: "#vorteile" },
      { label: "Promotionen", href: "#promotionen" },
      { label: "Referenzen", href: "#referenzen" },
      { label: "Team", href: "#team" },
      { label: "Kontakt", href: "#kontakt" },
    ],
  },

  hero: {
    headline: "Moderne Reinigung",
    bullets: ["Einfach", "Effizient", "Komfortabel"],
    subtext:
      "Teste das modulare Reinigungssystem von Vorwerk ganz unverbindlich bei dir zu Hause.",
    ctaLabel: "Kostenlose Produktvorführung buchen",
  },

  about: {
    heading: "Willkommen bei abricleaning",
    body1:
      "Mit über 10 Jahren Erfahrung als Kobold Beraterin begleite ich Sie persönlich auf dem Weg zu einer effizienten und modernen Reinigungslösung.",
    body2:
      "Ich berate Sie individuell – bei Ihnen zu Hause oder auf Wunsch im Showroom. Gemeinsam finden wir die optimale Lösung für Ihre Bedürfnisse.",
    badgeName: "Christa Abrigada",
    badgeRole: "Kobold Beraterin im Zürcher Oberland",
    trustItems: [
      { iconName: "shield", text: "Herstellung in Deutschland" },
      { iconName: "award", text: "10 Jahre Ersatzteilgarantie" },
      { iconName: "heart", text: "Persönliche Betreuung" },
    ],
  },

  why: {
    heading: "Warum abricleaning",
    subtext: "Vertrauen Sie auf Erfahrung, Qualität und persönlichen Service.",
    benefits: [
      {
        iconName: "users",
        title: "Persönliche Beratung",
        desc: "Individuelle Betreuung für Ihre Bedürfnisse",
      },
      {
        iconName: "settings",
        title: "Individuelle Lösungen",
        desc: "Massgeschneiderte Reinigungskonzepte",
      },
      {
        iconName: "sparkles",
        title: "Effiziente Reinigung",
        desc: "Maximale Sauberkeit mit minimalem Aufwand",
      },
      {
        iconName: "clock",
        title: "Zeitersparnis",
        desc: "Mehr Zeit für die wichtigen Dinge im Leben",
      },
      {
        iconName: "headphones",
        title: "Betreuung nach dem Kauf",
        desc: "Langfristiger Support und Service",
      },
      {
        iconName: "lightbulb",
        title: "Innovative Systeme",
        desc: "Modernste Technologie von Vorwerk Schweiz AG",
      },
    ],
  },

  product: {
    heading: "Unsere Kobold Produkte im Überblick",
    subtext: "Entdecken Sie das modulare Reinigungssystem von Vorwerk Schweiz AG.",
    products: [
      {
        id: "vk7",
        name: "Kobold VK7 Akku-Staubsauger",
        desc: "Der kabellose Kobold Akku-Staubsauger für maximale Flexibilität auf allen Böden.",
        benefits: [
          "Kabellos und leicht",
          "Starke Saugleistung auf allen Böden",
          "Intelligente Bodenautomatik",
          "Lange Akkulaufzeit",
          "Für Allergiker geeignet",
        ],
        image: prodVk7Desc,
      },
      {
        id: "eb7",
        name: "Kobold EB7 Elektrobürste",
        desc: "Die perfekte Ergänzung für Teppiche und Polster.",
        benefits: [
          "Tiefenreinigung für Teppichböden",
          "Entfernt Tierhaare mühelos",
          "Einfach aufzusetzen",
        ],
        image: prodVk7Eb7Set,
      },
      {
        id: "sp7",
        name: "Kobold SP7 Saugwischer",
        desc: "Saugen und Wischen in einem Arbeitsgang.",
        benefits: [
          "Saugt und wischt gleichzeitig",
          "Perfekt für Hartböden",
          "Selbstreinigungsfunktion",
          "Frischer Duft dank Duftperlen",
        ],
        image: prodSp7Desc,
      },
      {
        id: "pb7",
        name: "Kobold PB7 Polsterbürste",
        desc: "Sanfte und gründliche Reinigung aller Polstermöbel.",
        benefits: [
          "Schonende Tiefenreinigung",
          "Ideal für Matratzen & Sofas",
          "Entfernt Milben und Allergene",
        ],
        image: prodPb7Desc,
      },
      {
        id: "vg100",
        name: "Kobold VG100+ Fensterreiniger",
        desc: "Streifenfreie Fenster im Handumdrehen.",
        benefits: [
          "Sprühen und absaugen in einem Schritt",
          "Streifenfreie Ergebnisse",
          "Auch für Spiegel und Fliesen",
        ],
        image: prodVg100Desc,
      },
      {
        id: "vr7rb7",
        name: "Kobold VR7 Saugroboter mit Kobold RB7 Absaugstation",
        desc: "Saugen und Wischen auf Knopfdruck – auch wenn Sie nicht zu Hause sind.",
        benefits: [
          "Vollautomatisches Saugen (Kobold VR7 Saugroboter)",
          "Automatische Absaugstation (Kobold RB7)",
          "App-Steuerung",
          "Perfekt aufeinander abgestimmt",
        ],
        image: prodVr7Rb7Desc,
      },
      {
        id: "hd7",
        name: "Kobold HD7 Hartbodendüse",
        desc: "Erreicht Ecken und schwierige Stellen mühelos – der ideale Aufsatz für jeden Boden.",
        benefits: [
          "Schnelle Reinigung auf allen Böden",
          "Stellen unter Möbeln mühelos erreichbar",
          "90°-Schwenkfunktion",
          "Innovatives flexibles Gelenk",
          "Auch im Aussenbereich einsetzbar",
        ],
        image: prodHd7Desc,
      },
    ],
  },

  dreamTeam: {
    heading: "Das Kobold Dream-Team für Ihr Zuhause",
    body: "Perfekt aufeinander abgestimmt:",
    bodyItems: [
      "Kobold VR7 Saugroboter mit der Kobold RB7 Absaugstation",
      "Kobold VK7 Akku-Staubsauger und Kobold EB7 Elektrobürste",
      "Kobold SP7 Saugwischer",
      "Kobold PB7 Polsterbürste",
      "Kobold VG100+ Flächen- und Fensterreiniger",
    ],
    bodyFooter: "für ein rundum sauberes Zuhause",
    ctaLabel: "Jetzt testen",
  },

  promotions: {
    heading: "Aktuelle Promotionen",
    subtext: "Limitierte Angebote — jetzt zugreifen!",
    promotions: [
      {
        title: "Frühlings-Aktion: Kobold SP7 Saugwischer",
        description:
          "Profitieren Sie von einem Sonderangebot auf den Kobold SP7 Saugwischer. Inklusive kostenlosem Zubehörpaket bei einer Vorführung.",
        cta: "Jetzt anfragen",
        active: true,
      },
      {
        title: "Kobold VK7 Akku-Staubsauger Starter-Set zum Vorzugspreis",
        description:
          "Das komplette Kobold VK7 Akku-Staubsauger Starter-Set mit Kobold EB7 Elektrobürste und Kobold PB7 Polsterbürste zum attraktiven Kennenlernpreis.",
        cta: "Mehr erfahren",
        active: true,
      },
    ],
  },

  testimonials: {
    heading: "Das sagen unsere Kunden",
    subtext: "Echte Bewertungen von zufriedenen Kunden aus der Region.",
    testimonials: [
      {
        name: "Sandra M.",
        location: "Uster",
        rating: 5,
        text: "Christa hat sich enorm viel Zeit genommen und alles geduldig erklärt. Der SP7 ist ein Gamechanger!",
      },
      {
        name: "Thomas K.",
        location: "Wetzikon",
        rating: 5,
        text: "Professionell, freundlich und kompetent. Die Vorführung bei uns zu Hause war super bequem.",
      },
      {
        name: "Maria L.",
        location: "Volketswil",
        rating: 5,
        text: "Ich war skeptisch, aber nach der Demo war ich überzeugt. Beste Entscheidung für unser Zuhause!",
      },
    ],
  },

  bookingForm: {
    heading: "Kostenlose Produktdemonstration anfragen",
    subtext:
      "Kontaktieren Sie uns unverbindlich für mehr Informationen zum Kobold Reinigungssystem von Vorwerk Schweiz AG.",
    fields: {
      name: { label: "Vorname / Name *", placeholder: "Ihr Name" },
      address: { label: "Adresse", placeholder: "Strasse, PLZ, Ort" },
      email: { label: "E-Mail *", placeholder: "ihre@email.ch" },
      phone: { label: "Telefonnummer", placeholder: "+41 79 ..." },
      message: { label: "Nachricht", placeholder: "Ihre Nachricht (optional)" },
    },
    gdprText:
      "Ich stimme der Verarbeitung meiner Daten gemäss der Datenschutzerklärung zu. *",
    submitLabel: "Kostenlose Produktdemonstration anfragen",
    submitLoadingLabel: "Wird gesendet...",
  },

  team: {
    heading: "Christas saugstarke Crew",
    subtext:
      "Persönliche Beratung mit Leidenschaft – Christa Abrigada und ihr Team begleiten Sie auf dem Weg zu einem saubereren Zuhause.",
    leadName: "Christa Abrigada",
    leadRole: "Kobold Beraterin im Zürcher Oberland",
    leadBio:
      "Mit über 10 Jahren Erfahrung als Kobold Beraterin kenne ich die Produkte in- und auswendig. Meine Leidenschaft ist es, Menschen zu helfen, die für sie perfekte Reinigungslösung zu finden – persönlich, geduldig und mit echtem Herzblut.",
    crewCaption:
      "Unser Team freut sich auf Sie – gemeinsam machen wir Ihr Zuhause sauberer.",
  },

  footer: {
    tagline:
      "Ihre persönliche Kobold Beraterin in Uster & Zürcher Oberland. Moderne Reinigungslösungen für Ihr Zuhause.",
    navLabel: "Navigation",
    contactLabel: "Kontakt",
    contactName: "Christa Abrigada",
    contactRole: "Kobold Beraterin & Teamleiterin",
    contactAddress: "",
    contactPhone: "+41 79 456 18 75",
    contactEmail: "abriclean99@gmail.com",
    navItems: [
      { label: "Start", href: "#start" },
      { label: "Produkte", href: "#produkte" },
      { label: "Vorteile", href: "#vorteile" },
      { label: "Promotionen", href: "#promotionen" },
      { label: "Referenzen", href: "#referenzen" },
      { label: "Team", href: "#team" },
      { label: "Kontakt", href: "#kontakt" },
    ],
  },
};

// Named exports for components that need fallback images directly
export { portraitRedNecklace, dreamTeamPolsterboyPlant, heroNew1, heroNew2, heroNew3, heroNew4, heroNew5 };
