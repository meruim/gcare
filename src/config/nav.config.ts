export interface NavLink {
  href: string;
  label: string;
}

export const navLinks: NavLink[] = [
  { href: "#hero", label: "Download" },
  { href: "#install-guide", label: "How to install?" },
  { href: "#features", label: "Features" },
  { href: "#about", label: "About" },
  { href: "#faq", label: "FAQ" },
  { href: "#support", label: "Support & Contact" },
  { href: "/docs", label: "Documentation" },
];

export default navLinks;
