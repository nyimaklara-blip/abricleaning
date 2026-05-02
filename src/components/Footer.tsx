import logoFallback from "@/assets/abricleaning-logo.png";
import { useContent } from "@/context/ContentContext";

const Footer = () => {
  const { content } = useContent();
  const logo = content.images.logo || logoFallback;
  const {
    tagline,
    navLabel,
    contactLabel,
    contactName,
    contactRole,
    contactAddress,
    contactPhone,
    contactEmail,
    navItems,
  } = content.footer;

  return (
    <footer className="bg-foreground text-card">
      <div className="container-narrow px-4 md:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <img src={logo} alt="abricleaning" className="h-11 w-auto mb-3" />
            <p className="text-card/60 text-sm leading-relaxed">{tagline}</p>
          </div>

          {/* Nav */}
          <div>
            <p className="font-heading font-semibold mb-3 text-sm">{navLabel}</p>
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-sm text-card/60 hover:text-card transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="font-heading font-semibold mb-3 text-sm">{contactLabel}</p>
            <div className="text-sm text-card/60 space-y-1">
              <p className="text-card font-medium">{contactName}</p>
              <p>{contactRole}</p>
              <p>{contactAddress}</p>
              <p className="mt-2">
                <a
                  href={`tel:${contactPhone.replace(/\s/g, "")}`}
                  className="hover:text-card transition-colors"
                >
                  {contactPhone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${contactEmail}`}
                  className="hover:text-card transition-colors"
                >
                  {contactEmail}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-card/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-card/40">
            © {new Date().getFullYear()} abricleaning. Alle Rechte vorbehalten.
          </p>
          <p className="text-xs text-card/40">
            Website design by{" "}
            <a
              href="https://karamotech.ch"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-300 transition-colors"
            >
              karamotech.ch
            </a>
          </p>
          <div className="flex gap-4 text-xs text-card/40">
            <a href="#" className="hover:text-card/60 transition-colors">Datenschutz</a>
            <a href="#" className="hover:text-card/60 transition-colors">Impressum</a>
            <a href="#" className="hover:text-card/60 transition-colors">Cookie-Einstellungen</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
