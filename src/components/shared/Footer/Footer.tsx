import React from "react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-gray-400 text-sm">
            Developed by{" "}
            <a
              href="https://facebook.com/gerald.c.villaver"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-medium hover:text-blue-400 transition-colors"
            >
              Gerald C. Villaver
            </a>
          </p>
          <p className="text-gray-400 text-sm">
            © {currentYear} GCare (Guidance Care). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
