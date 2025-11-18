import React from "react";
import { Plus, Minus } from "lucide-react";

interface FAQItemProps {
  faq: {
    question: string;
    answer: string;
  };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

export const FAQItem: React.FC<FAQItemProps> = ({ faq, isOpen, onToggle }) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-4 sm:px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors bg-white"
      >
        <span
          className={`text-base sm:text-lg pr-4 ${
            isOpen ? "text-primary font-medium" : "text-gray-900 font-normal"
          }`}
        >
          {faq.question}
        </span>
        <div className="w-7 h-7 rounded-full border-2 border-gray-300 flex items-center justify-center flex-shrink-0">
          {isOpen ? (
            <Minus className="w-4 h-4 text-primary" />
          ) : (
            <Plus className="w-4 h-4 text-gray-400" />
          )}
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out bg-white ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-4 sm:px-6 pb-4">
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
};
