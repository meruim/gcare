import React from "react";
import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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

          <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
            <Link
              to="/terms"
              className="text-gray-400 hover:text-white transition-colors underline"
            >
              Terms and Conditions
            </Link>

            <span className="text-gray-600">|</span>

            <Link
              to="/privacy"
              className="text-gray-400 hover:text-white transition-colors underline"
            >
              Privacy Policy
            </Link>
          </div>

          <p className="text-gray-400 text-sm">
            © {currentYear} GCare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
