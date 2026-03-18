import React, { useState } from "react";
import { InstallStep } from "./Install-Step";
import { INSTALL_STEPS } from "./constant";

export const InstallGuide: React.FC = () => {
  const [openStep, setOpenStep] = useState<number | null>(1);

  const toggleStep = (step: number) => {
    setOpenStep(openStep === step ? null : step);
  };

  return (
    <div
      id="install-guide"
      className="w-full flex items-center justify-center px-6 py-20"
    >
      <div className="max-w-6xl w-full">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Installation Guide
          </h1>
          <div className="w-20 h-1 bg-primary" aria-hidden="true"></div>
        </header>

        {/* Steps */}
        <div className="space-y-3" role="list">
          {INSTALL_STEPS.map((step) => (
            <InstallStep
              key={step.id}
              step={step}
              isOpen={openStep === step.id}
              onToggle={() => toggleStep(step.id)}
            />
          ))}
        </div>

        {/* Note */}
        <aside className="bg-primary/10 border border-primary/20 rounded-lg p-4 mt-6">
          <p className="text-gray-700 text-sm sm:text-base">
            <span className="font-semibold">⚠️ Note:</span> You may see a
            security warning - this is normal.
          </p>
          <p className="text-gray-700 text-sm sm:text-base mt-2">
            <span className="font-semibold">✓</span> The app is safe to use.
          </p>
        </aside>
      </div>
    </div>
  );
};
