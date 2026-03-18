import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { NavConfig } from "@/config";

const FULL_NAV_PATHS = ["/", "/faculty"];
const MINIMAL_NAV_PATHS = ["/docs", "/terms", "/privacy"];
const CONTENT_SUBDOMAINS = [
  "privacy.jrmsu-gcare.com",
  "terms.jrmsu-gcare.com",
  "docs.jrmsu-gcare.com",
  "faculty.jrmsu-gcare.com",
];

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  const navigate = useNavigate();
  const location = useLocation();

  const navRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const activeLink = location.pathname + location.hash;

  const showFullNav = FULL_NAV_PATHS.some((p) => location.pathname === p);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();

    if (href.includes("#")) {
      const [path, hash] = href.split("#");
      const currentPath = location.pathname;

      if (!path || path === currentPath) {
        const element = document.getElementById(hash);
        if (element) {
          const navHeight = menuRef.current?.offsetHeight || 56;
          const offsetPosition =
            element.getBoundingClientRect().top +
            window.pageYOffset -
            navHeight;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
          navigate("#" + hash, { replace: true });
        }
      } else {
        navigate(href);
      }
    } else {
      navigate(href);
    }

    setIsMenuOpen(false);
  };

  const handleBack = () => navigate(-1);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (CONTENT_SUBDOMAINS.includes(window.location.hostname)) {
      window.location.href = "https://www.jrmsu-gcare.com";
    } else if (
      MINIMAL_NAV_PATHS.some(
        (p: string) =>
          location.pathname === p || location.pathname.startsWith(p + "/")
      )
    ) {
      // On docs/terms/privacy: go back (e.g. faculty → docs → logo = faculty)
      navigate(-1);
    } else {
      // On home or faculty: go to home
      navigate("/");
    }
  };

  const normalize = (s: string) => {
    if (!s) return "/";

    try {
      const [path, hash] = s.split("#");
      let p = path.replace(/\/+$/, "") || "/";

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
    requestAnimationFrame(() => {
      if (!navRef.current) return;
      const activeElement = navRef.current.querySelector(
        '[data-active="true"]'
      );
      if (activeElement) {
        const navRect = navRef.current.getBoundingClientRect();
        const activeRect = activeElement.getBoundingClientRect();
        setIndicatorStyle({
          left: activeRect.left - navRect.left,
          width: activeRect.width,
        });
      }
    });
  };
  useEffect(() => {
    const hash = location.hash.substring(1);

    if (!hash) return;

    requestAnimationFrame(() => {
      setTimeout(() => {
        const element = document.getElementById(hash);

        if (element) {
          const navHeight = menuRef.current?.offsetHeight || 56;

          const offsetPosition =
            element.getBoundingClientRect().top +
            window.pageYOffset -
            navHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 100);
    });
  }, [location.hash]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = NavConfig.map((link) => {
        if (link.href.includes("#")) {
          const hash = link.href.split("#")[1];

          return {
            href: link.href,
            element: document.getElementById(hash),
          };
        }

        return null;
      }).filter(Boolean);

      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];

        if (section?.element && scrollPosition >= section.element.offsetTop) {
          break;
        }
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    if (isMenuOpen) document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);

      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    updateIndicator();
    window.addEventListener("resize", updateIndicator);

    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeLink]);

  // MINIMAL NAVIGATION — /terms, /privacy, /docs, etc.
  if (!showFullNav) {
    return (
      <header
        className="bg-white border-b border-gray-200 sticky top-0 z-50"
        ref={menuRef}
      >
        <div className="max-w-6xl mx-auto px-3 sm:px-5 lg:px-6">
          <div className="flex justify-between items-center h-14">
            <a
              href="/"
              onClick={handleLogoClick}
              className="text-lg sm:text-xl font-bold text-primary hover:opacity-80 transition-opacity"
            >
              GCare
            </a>

            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-sm font-medium text-primary hover:opacity-80 transition-opacity"
              aria-label="Go back"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span className="hidden sm:inline">Back</span>
            </button>
          </div>
        </div>
      </header>
    );
  }

  // FULL NAVIGATION — / and /faculty
  return (
    <header
      className="bg-white border-b border-gray-200 sticky top-0 z-50"
      ref={menuRef}
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-5 lg:px-6">
        <div className="flex justify-between items-center h-14">
          <a
            href="/"
            onClick={handleLogoClick}
            className="text-lg sm:text-xl font-bold text-primary hover:opacity-80 transition-opacity"
          >
            GCare
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:block" aria-label="Main navigation">
            <div
              className="ml-6 flex items-baseline space-x-4 relative"
              ref={navRef}
            >
              <span
                className="absolute -bottom-[2px] h-[2px] bg-primary rounded-full transition-all duration-300 ease-out"
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
                    className={`relative px-2 py-1.5 text-sm font-medium transition-colors ${
                      active
                        ? "text-primary"
                        : "text-gray-600 hover:text-primary"
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
            className="md:hidden text-primary hover:opacity-80 transition-opacity"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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

        {/* Mobile Menu */}
        <nav
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
            isMenuOpen
              ? "max-h-60 opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-2"
          }`}
          {...(!isMenuOpen && ({ inert: "" } as any))}
        >
          <div className="px-2 pt-1 pb-2 space-y-1 bg-gray-50 border-t border-gray-200 rounded-b-lg">
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
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-gray-100 text-gray-600 hover:text-primary"
                  }`}
                >
                  {active && (
                    <span
                      className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full bg-primary"
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
