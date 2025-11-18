import React from "react";
import { Mail, MessageCircle } from "lucide-react";

export const Support: React.FC = () => {
  return (
    <div id="support" className="min-h-screen">
      <div className="w-full flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl w-full">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Support & Contact
            </h1>
            <div className="w-20 h-1 bg-primary"></div>
          </div>

          {/* Introduction */}
          <section className="mb-16">
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              Need assistance? Our support team is here to help with any
              technical issues, account problems, or general inquiries you may
              have.
            </p>
          </section>

          {/* Contact Options */}
          <section className="mb-16">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
              How to Reach Us
            </h2>
            <div className="space-y-6">
              {/* Email Support */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                    Email Support
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base mb-2">
                    For technical issues, account problems, or general
                    inquiries.
                  </p>
                  <a
                    href="mailto:support@studentportal.edu"
                    className="text-primary hover:text-primary/80 font-medium text-sm sm:text-base"
                  >
                    guidance@jrmsu.edu
                  </a>
                </div>
              </div>

              {/* Best Practices */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                    When Contacting Support
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base mb-2">
                    Please include the following information to help us assist
                    you faster:
                  </p>
                  <ul className="text-gray-600 text-sm sm:text-base space-y-1">
                    <li>• Your student ID number</li>
                    <li>• A detailed description of your issue</li>
                    <li>• Any relevant screenshots or error messages</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
