import React from "react";
import { ChevronDown } from "lucide-react";
import { InstallStep as InstallStepType } from "./types";

interface InstallStepProps {
  step: InstallStepType;
  isOpen: boolean;
  onToggle: () => void;
}

export const InstallStep: React.FC<InstallStepProps> = ({
  step,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 ease-out">
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
        aria-expanded={isOpen}
        aria-controls={`step-${step.id}-content`}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0 text-sm">
            {step.id}
          </div>
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 text-left">
            {step.title}
          </h2>
        </div>
        <div
          className={`transition-transform duration-300 ease-out ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
        </div>
      </button>

      {/* Content with smooth animation */}
      <div
        id={`step-${step.id}-content`}
        className={`grid transition-all duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden p-4 pt-0 bg-white">
          {step.description && (
            <p className="text-gray-600 mb-2 italic text-xs sm:text-sm">
              {step.description}
            </p>
          )}

          <div className="text-gray-700 text-sm sm:text-base mb-3 space-y-1">
            {step.instructions.map((instruction, idx) => (
              <p key={idx}>• {instruction}</p>
            ))}
          </div>

          <div className="flex flex-col items-center gap-3">
            {step.images.length > 0 ? (
              step.images.map((image, idx) => (
                <img
                  key={idx}
                  src={image}
                  alt={`${step.title} step ${idx + 1}`}
                  className="w-[280px] sm:w-[360px] lg:w-[420px] h-auto rounded-md border border-gray-200 object-contain transition-all duration-300 ease-out"
                />
              ))
            ) : step.note === "placeholder" ? (
              <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center border border-gray-200 w-full">
                <span className="text-gray-500 text-sm">Image placeholder</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
