import React, { useState } from "react";
import { FAQItem } from "./FAQ-item";
import { FaqData } from "@/data";

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="faq" className="min-h-screen">
      <div className="w-full flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl w-full">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <div className="w-20 h-1 bg-primary"></div>
          </div>

          {/* FAQ List */}
          <section>
            <div className="space-y-3">
              {FaqData.map((faq, index) => (
                <FAQItem
                  key={index}
                  faq={faq}
                  index={index}
                  isOpen={openIndex === index}
                  onToggle={() => handleToggle(index)}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
