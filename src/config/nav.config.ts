export interface NavLink {
  href: string;
  label: string;
}

export const navLinks: NavLink[] = [
  { href: "#hero", label: "Download" },
  { href: "#about", label: "About" },
  { href: "#features", label: "Features" },
  { href: "#install-guide", label: "How to install?" },
  { href: "#faq", label: "FAQ" },
  { href: "#support", label: "Support & Contact" },
];

export default navLinks;
