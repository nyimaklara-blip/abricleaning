import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logoFallback from "@/assets/abricleaning-logo.png";
import { useContent } from "@/context/ContentContext";
import { useLocation } from "react-router-dom";

const Header = () => {
  const { content } = useContent();
  const { navItems } = content.header;
  const logo = content.images.logo || logoFallback;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  // On non-home pages, anchor links must be prefixed with "/" to work
  const resolveHref = (href: string) =>
    isHome ? href : href.startsWith("#") ? `/${href}` : href;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-card ${
        scrolled ? "shadow-card" : ""
      }`}
    >
      <div className="container-narrow flex items-center justify-between px-4 py-2 md:px-8">
        {/* Logo */}
        <a href={isHome ? "#start" : "/"} className="flex items-center">
          <img src={logo} alt="abricleaning" className="h-11 md:h-12 w-auto" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={resolveHref(item.href)}
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="/thermomix"
            className={`text-sm font-medium transition-colors ${
              pathname === "/thermomix"
                ? "text-primary font-semibold"
                : "text-foreground/70 hover:text-primary"
            }`}
          >
            Thermomix
          </a>
          <a
            href="/jobs"
            className={`text-sm font-medium transition-colors ${
              pathname === "/jobs"
                ? "text-primary font-semibold"
                : "text-foreground/70 hover:text-primary"
            }`}
          >
            Jobs
          </a>
          <a
            href="/event"
            className={`text-sm font-medium transition-colors ${
              pathname === "/event"
                ? "text-primary font-semibold"
                : "text-foreground/70 hover:text-primary"
            }`}
          >
            Event
          </a>
        </nav>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/41794561875"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-semibold px-4 h-9 rounded-md transition-colors shadow-sm"
            aria-label="WhatsApp"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-foreground"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="lg:hidden border-t border-border bg-card px-4 py-4 space-y-3">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={resolveHref(item.href)}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-medium text-foreground/70 hover:text-primary"
            >
              {item.label}
            </a>
          ))}
          <a href="/thermomix" onClick={() => setMobileOpen(false)}
            className="block text-sm font-medium text-foreground/70 hover:text-primary">
            Thermomix
          </a>
          <a href="/jobs" onClick={() => setMobileOpen(false)}
            className="block text-sm font-medium text-foreground/70 hover:text-primary">
            Jobs
          </a>
          <a href="/event" onClick={() => setMobileOpen(false)}
            className="block text-sm font-medium text-foreground/70 hover:text-primary">
            Event
          </a>
          <a
            href="https://wa.me/41794561875"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-semibold px-4 h-10 rounded-md transition-colors w-full mt-2"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;
