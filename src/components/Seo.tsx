import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const seoByPath: Record<string, { title: string; description: string; canonical: string }> = {
  "/": {
    title: "Vorwerk Kobold Beratung Zürich & Uster | Abricleaning VK7 Vorführung",
    description:
      "Abricleaning: persönliche Vorwerk Kobold Beratung in Zürich, Uster & Zürcher Oberland. VK7 Akku-Staubsauger, SP7 Saugwischer, VR7 Roboter und kostenlose Vorführung zu Hause.",
    canonical: "https://www.abricleaning.com/",
  },
  "/jobs": {
    title: "Vorwerk Nebenjob Zürich & Uster | Kobold Beraterin werden",
    description:
      "Flexibler Nebenjob im Vorwerk Kobold Team von Abricleaning. Persönliche Unterstützung, Schulungen und attraktive Verdienstmöglichkeiten in Zürich und Uster.",
    canonical: "https://www.abricleaning.com/jobs",
  },
  "/thermomix": {
    title: "Thermomix Beratung Zürich & Uster | Abricleaning",
    description:
      "Persönliche Thermomix Beratung und Vorführung im Raum Zürich, Uster und Zürcher Oberland. Termin unverbindlich anfragen.",
    canonical: "https://www.abricleaning.com/thermomix",
  },
};

const setMeta = (selector: string, attr: "content" | "href", value: string) => {
  const element = document.head.querySelector(selector);
  if (element) element.setAttribute(attr, value);
};

const Seo = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = seoByPath[pathname] ?? seoByPath["/"];

    document.title = seo.title;
    setMeta('meta[name="description"]', "content", seo.description);
    setMeta('link[rel="canonical"]', "href", seo.canonical);
    setMeta('meta[property="og:title"]', "content", seo.title);
    setMeta('meta[property="og:description"]', "content", seo.description);
    setMeta('meta[property="og:url"]', "content", seo.canonical);
    setMeta('meta[name="twitter:title"]', "content", seo.title);
    setMeta('meta[name="twitter:description"]', "content", seo.description);
  }, [pathname]);

  return null;
};

export default Seo;
