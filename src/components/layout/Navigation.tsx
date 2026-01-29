import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ShoppingBag, User, LogOut } from "lucide-react";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import logo from "@/assets/logo.png";

const languages: { code: Language; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "lv", label: "LV" },
  { code: "ru", label: "RU" },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { totalItems } = useCart();
  const { user, signOut } = useAuth();
  const { isAdmin } = useAdminAuth();
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  // Smooth scroll handler with offset for fixed header
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const headerOffset = 80; // Account for fixed header
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
      setIsOpen(false);
    }
  };

  const navLinks = isHomePage
    ? [
      { name: t("home"), href: "#hero" },
      { name: t("about"), href: "#about" },
      { name: t("bespoke"), href: "#bespoke" },
      { name: t("contact"), href: "#contact" },
    ]
    : [
      { name: t("home"), href: "/", isLink: true },
      { name: t("about"), href: "/#about", isLink: true },
      { name: t("bespoke"), href: "/#bespoke", isLink: true },
      { name: t("contact"), href: "/#contact", isLink: true },
    ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setLangMenuOpen(false);
      setUserMenuOpen(false);
    };
    if (langMenuOpen || userMenuOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [langMenuOpen, userMenuOpen]);

  const NavLink = ({ link }: { link: { name: string; href: string; isLink?: boolean } }) => {
    if (link.isLink) {
      return (
        <Link
          to={link.href}
          className="text-sm tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300 font-body"
        >
          {link.name}
        </Link>
      );
    }
    return (
      <a
        href={link.href}
        onClick={(e) => handleSmoothScroll(e, link.href)}
        className="text-sm tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300 font-body"
      >
        {link.name}
      </a>
    );
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? "bg-background/95 backdrop-blur-md border-b border-border/50"
        : "bg-transparent"
        }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
            <img
              src={logo}
              alt="Surat Diamond Logo"
              className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-contain bg-white p-2 rounded-full transition-transform duration-500 group-hover:scale-105 border border-border/10"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => (
              <NavLink key={link.name} link={link} />
            ))}
            <Link
              to="/shop"
              className="text-sm tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300 font-body"
            >
              Shop
            </Link>
          </div>

          {/* Right Side: Language + User + Cart */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLangMenuOpen(!langMenuOpen);
                  setUserMenuOpen(false);
                }}
                className="flex items-center gap-1 px-3 py-2 text-sm tracking-wider uppercase text-muted-foreground hover:text-primary transition-colors duration-300 font-body border border-border/50 hover:border-primary/50"
              >
                {language.toUpperCase()}
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${langMenuOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {langMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 bg-card border border-border/50 shadow-lg"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={(e) => {
                          e.stopPropagation();
                          setLanguage(lang.code);
                          setLangMenuOpen(false);
                        }}
                        className={`block w-full px-6 py-3 text-sm tracking-wider uppercase font-body text-left transition-colors duration-300 ${language === lang.code
                          ? "text-primary bg-primary/5"
                          : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                          }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setUserMenuOpen(!userMenuOpen);
                    setLangMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300 border border-border/50 hover:border-primary/50"
                >
                  <User className="w-4 h-4" />
                  <span className="max-w-24 truncate">{user.email?.split("@")[0]}</span>
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-2 bg-card border border-border/50 shadow-lg min-w-40"
                    >
                      <Link
                        to="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 w-full px-4 py-3 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors duration-300"
                      >
                        <User className="w-4 h-4" />
                        {t("profile")}
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 w-full px-4 py-3 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors duration-300"
                        >
                          <User className="w-4 h-4" />
                          Admin
                        </Link>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          signOut();
                          setUserMenuOpen(false);
                        }}
                        className="flex items-center gap-2 w-full px-4 py-3 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors duration-300"
                      >
                        <LogOut className="w-4 h-4" />
                        {t("signOut")}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/auth"
                className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300 border border-border/50 hover:border-primary/50"
              >
                <User className="w-4 h-4" />
                {t("signIn")}
              </Link>
            )}

            {/* Cart Icon */}
            <Link
              to="/checkout"
              className="relative p-2 text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile: Language + Cart + Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Mobile Language Switcher */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLangMenuOpen(!langMenuOpen);
                }}
                className="flex items-center gap-1 px-2 py-1.5 text-xs tracking-wider uppercase text-muted-foreground font-body border border-border/50"
              >
                {language.toUpperCase()}
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${langMenuOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {langMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 bg-card border border-border/50 shadow-lg z-50"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={(e) => {
                          e.stopPropagation();
                          setLanguage(lang.code);
                          setLangMenuOpen(false);
                        }}
                        className={`block w-full px-4 py-2 text-xs tracking-wider uppercase font-body text-left transition-colors duration-300 ${language === lang.code
                          ? "text-primary bg-primary/5"
                          : "text-muted-foreground hover:text-primary"
                          }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Cart */}
            <Link
              to="/checkout"
              className="relative p-2 text-muted-foreground"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-background/98 backdrop-blur-md border-t border-border/50"
          >
            <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-4 sm:gap-6">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {link.isLink ? (
                    <Link
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-base sm:text-lg tracking-[0.15em] uppercase text-foreground hover:text-primary transition-colors font-body"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      onClick={(e) => handleSmoothScroll(e, link.href)}
                      className="text-base sm:text-lg tracking-[0.15em] uppercase text-foreground hover:text-primary transition-colors font-body"
                    >
                      {link.name}
                    </a>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
              >
                <Link
                  to="/shop"
                  onClick={() => setIsOpen(false)}
                  className="text-base sm:text-lg tracking-[0.15em] uppercase text-foreground hover:text-primary transition-colors font-body"
                >
                  Shop
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};