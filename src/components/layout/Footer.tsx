import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

export const Footer = () => {
  const { t } = useLanguage();

  const footerLinks = {
    collections: [
      { nameKey: "necklaces", href: "#" },
      { nameKey: "rings", href: "#" },
      { nameKey: "earrings", href: "#" },
      { nameKey: "bracelets", href: "#" },
    ],
    services: [
      { nameKey: "bespokeDesign", href: "#" },
      { nameKey: "diamondEducation", href: "#" },
      { nameKey: "ringSizing", href: "#" },
      { nameKey: "aftercare", href: "#" },
    ],
    company: [
      { nameKey: "ourStory", href: "#" },
      { nameKey: "sustainability", href: "#" },
      { nameKey: "careers", href: "#" },
      { nameKey: "press", href: "#" },
    ],
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <a href="#" className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <img
                src={logo}
                alt="Surat Diamond Logo"
                className="w-12 h-12 sm:w-14 sm:h-14 object-contain bg-white p-2 rounded-full border border-border/10"
              />
            </a>
            <p className="text-muted-foreground font-body leading-relaxed max-w-sm mb-4 sm:mb-6 text-xs sm:text-sm">
              {t("footerDescription")}
            </p>
            <p className="text-[10px] sm:text-xs tracking-wider text-muted-foreground uppercase font-body">
              Elizabetes iela 22, Riga LV-1050
            </p>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-display text-foreground mb-4 sm:mb-6 text-sm sm:text-base">{t("collections")}</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.collections.map((link) => (
                <li key={link.nameKey}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 text-xs sm:text-sm font-body"
                  >
                    {t(link.nameKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-foreground mb-4 sm:mb-6 text-sm sm:text-base">{t("services")}</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.nameKey}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 text-xs sm:text-sm font-body"
                  >
                    {t(link.nameKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-foreground mb-4 sm:mb-6 text-sm sm:text-base">{t("company")}</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.nameKey}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 text-xs sm:text-sm font-body"
                  >
                    {t(link.nameKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-10 sm:mt-16 pt-6 sm:pt-8 flex flex-col justify-between items-center gap-4">
          <div className="text-center space-y-2 mb-4 sm:mb-0">
            <p className="text-muted-foreground text-[10px] sm:text-xs font-body">
              {t("companyName")} | {t("regNo")} | {t("legalAddress")}
            </p>
            <p className="text-muted-foreground text-[10px] sm:text-xs font-body italic">
              {t("assayOffice")}
            </p>
            <p className="text-muted-foreground text-[10px] sm:text-xs font-body mt-2">
              © {new Date().getFullYear()} Surat Diamond Latvia. {t("allRightsReserved")}
            </p>
          </div>

          <div className="flex gap-4 sm:gap-6 text-[10px] sm:text-xs font-body">
            <Link to="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">
              {t("privacyPolicy")}
            </Link>
            <Link to="/terms-of-service" className="text-muted-foreground hover:text-primary transition-colors">
              {t("termsOfService")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
