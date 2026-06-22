import type { SiteContent } from "@/types/content";
import prodVk7Desc from "@/assets/prod-vk7-desc.png";
import prodEb7Desc from "@/assets/prod-eb7-desc.jpeg";
import prodVm7Desc from "@/assets/prod-vm7-desc.jpeg";
import prodMf7Desc from "@/assets/prod-mf7-desc.jpeg";
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
    headline: "Vorwerk Kobold Beratung Zürich & Uster",
    bullets: ["VK7 testen", "SP7 erleben", "Zuhause vorführen"],
    subtext:
      "Teste das modulare Reinigungssystem von Vorwerk ganz unverbindlich bei dir zu Hause im Raum Zürich, Uster und Zürcher Oberland.",
    ctaLabel: "Kostenlose Produktvorführung buchen",
  },

  about: {
    heading: "Ihre Kobold Beraterin im Zürcher Oberland",
    body1:
      "Mit über 10 Jahren Erfahrung als Vorwerk Kobold Beraterin begleite ich Sie persönlich auf dem Weg zu einer effizienten und modernen Reinigungslösung für Hartboden, Teppich, Polster und Matratzen.",
    body2:
      "Ich berate Sie individuell in Uster, Zürich, Wetzikon, Volketswil, Wallisellen und Umgebung – bei Ihnen zu Hause oder auf Wunsch im Showroom. Gemeinsam finden wir die passende Kobold Lösung für Ihre Bedürfnisse.",
    badgeName: "Christa Abrigada",
    badgeRole: "Kobold Beraterin im Zürcher Oberland",
    trustItems: [
      { iconName: "shield", text: "Herstellung in Deutschland" },
      { iconName: "award", text: "10 Jahre Ersatzteilgarantie" },
      { iconName: "heart", text: "Persönliche Betreuung" },
    ],
  },

  why: {
    heading: "Warum Abricleaning für Ihre Vorwerk Beratung",
    subtext: "Lokale Erfahrung, echte Produktvorführung und persönliche Betreuung vor und nach dem Kauf.",
    benefits: [
      {
        iconName: "users",
        title: "Persönliche Kobold Beratung",
        desc: "Individuelle Betreuung für Ihr Zuhause im Raum Zürich und Uster",
      },
      {
        iconName: "settings",
        title: "Individuelle Reinigungslösung",
        desc: "Passende Kobold Module für Hartboden, Teppich, Polster und Haustiere",
      },
      {
        iconName: "sparkles",
        title: "Effiziente Reinigung mit VK7",
        desc: "Starke Saugleistung und smarte Aufsätze für den Alltag",
      },
      {
        iconName: "clock",
        title: "Zeitersparnis",
        desc: "Saugen, Wischen und Polster reinigen mit weniger Aufwand",
      },
      {
        iconName: "headphones",
        title: "Betreuung nach dem Kauf",
        desc: "Langfristiger Support, Tipps und Service durch Christa Abrigada",
      },
      {
        iconName: "lightbulb",
        title: "Vorwerk Schweiz Technologie",
        desc: "VK7, SP7, PB7, VG100+ und VR7 verständlich erklärt",
      },
    ],
  },

  product: {
    heading: "Vorwerk Kobold Produkte im Überblick",
    subtext: "Entdecken Sie VK7, SP7, PB7, VR7 und weitere Module bei einer persönlichen Vorführung.",
    products: [
      {
        id: "vk7",
        name: "Kobold VK7 Akku-Staubsauger",
        desc: "Der kabellose Kobold VK7 Akku-Staubsauger für starke Saugleistung, maximale Flexibilität und gründliche Reinigung auf Hartboden und Teppich.",
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
        id: "vm7",
        name: "Kobold VM7 Hand-Akkusauger",
        desc: "Immer und überall einsatzbereit – der praktische Hand-Akkusauger für die schnelle Reinigung zwischendurch.",
        benefits: [
          "Praktisch für die schnelle Reinigung zwischendurch",
          "Volle Akku-Power mit 2 Saugstufen und Boost-Funktion",
          "Angenehme Handhabung durch perfekte Gewichtsverteilung",
          "Vergrösserbare Düse für mehr Saugfläche",
          "Entleerung des Staubbehälters auf Knopfdruck – ohne Schmutzkontakt",
        ],
        image: prodVm7Desc,
      },
      {
        id: "eb7",
        name: "Kobold EB7 Elektrobürste",
        desc: "Schnelle und einfache Tiefenreinigung – die perfekte Ergänzung für Teppiche und Hartböden.",
        benefits: [
          "Automatische Erkennung von Böden",
          "Intelligente Anpassung der Rotationsgeschwindigkeit und Saugleistung",
          "Gründliche Entfernung von Schmutz und Staub",
          "Staubsaugen unter niedrigen Möbeln problemlos möglich",
          "Sanfte Reinigung von Hartböden und Teppichen",
        ],
        image: prodEb7Desc,
      },
      {
        id: "sp7",
        name: "Kobold SP7 Saugwischer",
        desc: "Der Kobold SP7 Saugwischer saugt und wischt Hartböden in einem Arbeitsgang.",
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
        desc: "Die Kobold PB7 Polsterbürste reinigt Sofa, Polster und Matratzen gründlich und allergikerfreundlich.",
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
      {
        id: "mf7",
        name: "Kobold MF7 Motorschutzfilter",
        desc: "Schütze das Herzstück deines Kobold VK7 – verlängert die Lebensdauer und sorgt für frischen Duft.",
        benefits: [
          "Schützt den Motor zuverlässig vor Verschmutzungen",
          "Gibt deinem Kobold VK7-Akkusauger eine lange Lebensdauer",
          "Leicht einzusetzen und auszuwechseln",
          "Integrierte Halterung für airumo Duftchips – für einen angenehm frischen Duft",
        ],
        image: prodMf7Desc,
      },
    ],
  },

  dreamTeam: {
    heading: "Das Vorwerk Kobold Dream-Team für Ihr Zuhause",
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
    heading: "Kundenstimmen aus Uster, Wetzikon und Volketswil",
    subtext: "Echte Bewertungen von zufriedenen Kunden aus Zürich und dem Zürcher Oberland.",
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
    heading: "Kostenlose Vorwerk Kobold Produktdemonstration anfragen",
    subtext:
      "Kontaktieren Sie uns unverbindlich für mehr Informationen zum Kobold Reinigungssystem von Vorwerk Schweiz AG in Zürich, Uster und Umgebung.",
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
      "Ihre persönliche Vorwerk Kobold Beraterin in Uster, Zürich & Zürcher Oberland. Moderne Reinigungslösungen für Ihr Zuhause.",
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
