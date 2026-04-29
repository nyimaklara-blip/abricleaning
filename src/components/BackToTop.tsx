import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollToTop}
      aria-label="Nach oben scrollen"
      className={`fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border text-muted-foreground shadow-sm flex items-center justify-center transition-all duration-300 hover:text-primary hover:border-primary/40 hover:shadow-md ${
        visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none"
      }`}
    >
      <ArrowUp size={16} />
    </button>
  );
};

export default BackToTop;
