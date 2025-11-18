import React from "react";
import { FeatureData } from "@/data";

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-20">
      <div className="w-full flex justify-center px-6">
        <div className="max-w-6xl w-full">
          {/* Title */}
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Features
            </h2>
            <div className="w-20 h-1 bg-primary"></div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FeatureData.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
