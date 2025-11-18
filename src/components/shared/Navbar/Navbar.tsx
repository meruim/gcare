import { useState, useEffect, useRef } from "react";
import { NavConfig } from "@/config";

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.includes("#")) {
      e.preventDefault();

      const [path, hash] = href.split("#");
      const currentPath = window.location.pathname;

      if (
        !path ||
        path === currentPath ||
        path === window.location.origin + currentPath
      ) {
        const element = document.getElementById(hash);
        if (element) {
          const navHeight = menuRef.current?.offsetHeight || 56;
          const elementPosition =
            element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
          window.history.pushState(null, "", href);
        }
      } else {
        window.location.href = href;
      }
    }

    setActiveLink(href);
    setIsMenuOpen(false);
  };

  const normalize = (s: string) => {
    if (!s) return "/";
    try {
      const [path, hash] = s.split("#");
      let p = path.replace(/\/+$/, "");
      if (p === "") p = "/";
      return hash ? `${p}#${hash}` : p;
    } catch {
      return s;
    }
  };

  const isLinkActive = (href: string) => {
    const a = normalize(activeLink);
    const b = normalize(href);
    return a === b || a.startsWith(b + "/") || a.startsWith(b + "#");
  };

  const updateIndicator = () => {
    if (!navRef.current) return;

    const activeElement = navRef.current.querySelector('[data-active="true"]');
    if (activeElement) {
      const navRect = navRef.current.getBoundingClientRect();
      const activeRect = activeElement.getBoundingClientRect();
      setIndicatorStyle({
        left: activeRect.left - navRect.left,
        width: activeRect.width,
      });
    }
  };

  useEffect(() => {
    const current = window.location.pathname + (window.location.hash || "");
    setActiveLink(current);

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    const handleScroll = () => {
      const sections = NavConfig.map((link) => {
        if (link.href.includes("#")) {
          const hash = link.href.split("#")[1];
          return { href: link.href, element: document.getElementById(hash) };
        }
        return null;
      }).filter(Boolean);

      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section?.element) {
          const offsetTop = section.element.offsetTop;
          if (scrollPosition >= offsetTop) {
            setActiveLink(section.href);
            break;
          }
        }
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeLink]);

  return (
    <header className="bg-primary sticky top-0 z-50 text-white" ref={menuRef}>
      <div className="max-w-6xl mx-auto px-3 sm:px-5 lg:px-6">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <a
            href="/"
            className="text-lg sm:text-xl font-bold hover:opacity-80 transition-opacity"
            onClick={(e) => handleLinkClick(e, "/")}
          >
            GCare
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:block" aria-label="Main navigation">
            <div
              className="ml-6 flex items-baseline space-x-4 relative"
              ref={navRef}
            >
              {/* Smooth sliding indicator */}
              <span
                className="absolute -bottom-[2px] h-[2px] bg-white rounded-full transition-all duration-300 ease-out"
                style={{
                  left: `${indicatorStyle.left}px`,
                  width: `${indicatorStyle.width}px`,
                }}
                aria-hidden="true"
              />

              {NavConfig.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    data-active={active}
                    aria-current={active ? "page" : undefined}
                    className={`relative px-2 py-1.5 text-sm font-medium transition-opacity ${
                      active ? "opacity-100" : "opacity-80 hover:opacity-100"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>
          </nav>

          {/* Mobile Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden hover:opacity-80 transition-opacity"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-controls="mobile-menu"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu with animation */}
        <nav
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
            isMenuOpen
              ? "max-h-60 opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-2"
          }`}
          aria-label="Mobile navigation"
          aria-hidden={!isMenuOpen}
        >
          <div className="px-2 pt-1 pb-2 space-y-1 bg-[#27287A] border-t border-white/20 rounded-b-lg">
            {NavConfig.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  aria-current={active ? "page" : undefined}
                  className={`relative flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    active
                      ? "bg-white/10 text-white"
                      : "hover:bg-white/10 text-white/80 hover:text-white"
                  }`}
                >
                  {active && (
                    <span
                      className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full bg-white"
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-20">{link.label}</span>
                </a>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
