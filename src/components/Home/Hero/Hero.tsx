import React from "react";
import { GitHubHook } from "@/hooks";
import hero_interface from "@/assets/img/hero_interface.webp";
import guidance_logo from "@/assets/img/guidance_logo.webp";
import jrmsu_logo from "@/assets/img/jrmsu_logo.webp";
import { GitHubConfig } from "@/config";

export const Hero: React.FC = () => {
  const { releaseInfo, isLoading, hasDownloaded, downloadApp } = GitHubHook({
    githubOwner: GitHubConfig.owner,
    githubRepo: GitHubConfig.studnet_repo,
  });

  return (
    <div
      id="hero"
      className="w-full min-h-[calc(100vh-64px)] flex items-center justify-center px-6 py-12 sm:py-16 lg:py-20"
    >
      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16">
        {/* Left Content Section */}
        <div className="flex-1 text-center lg:text-left animate-fade-in-up">
          {/* Logos */}
          <div className="flex justify-center lg:justify-start items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-4 sm:mb-6 md:mb-7 lg:mb-8">
            <img
              src={jrmsu_logo}
              alt="JRMSU Logo"
              width="96"
              height="96"
              loading="eager"
              className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain"
            />
            <img
              src={guidance_logo}
              alt="Guidance Logo"
              width="96"
              height="96"
              loading="eager"
              className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain"
            />
          </div>

          {/* University Name */}
          <h2 className="text-primary text-base sm:text-lg md:text-xl lg:text-xl font-bold mb-1 sm:mb-2">
            Jose Rizal Memorial State University
          </h2>

          {/* Subtitle */}
          <p className="text-red-600 text-sm sm:text-base md:text-base italic mb-6 sm:mb-7 md:mb-8 lg:mb-8">
            The Premier University in Zamboanga del Norte
          </p>

          {/* Main Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-6 sm:mb-7 md:mb-8 lg:mb-8 leading-tight text-gray-900">
            Guidance Care (GCare)
          </h1>

          {/* Location */}
          <div className="flex items-center justify-center lg:justify-start gap-2 mb-8 sm:mb-9 md:mb-10 lg:mb-10">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"
              fill="#c2410c"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-orange-700 font-semibold text-sm sm:text-base md:text-base">
              Katipunan Campus, Katipunan Z.N
            </p>
          </div>

          {/* Download Button */}
          <div className="flex flex-col items-center lg:items-start gap-2 sm:gap-3">
            <button
              onClick={downloadApp}
              disabled={isLoading}
              className="bg-primary text-white font-bold py-3.5 px-10 sm:py-4 sm:px-12 md:py-4 md:px-14 rounded-lg text-sm sm:text-base md:text-base disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
              aria-label={
                isLoading
                  ? "Loading download"
                  : hasDownloaded
                  ? "Click here if download not started"
                  : `Download version ${releaseInfo.version}`
              }
            >
              <span className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                {isLoading
                  ? "Loading..."
                  : hasDownloaded
                  ? "Click here if not started"
                  : `Download${
                      releaseInfo.size ? ` (${releaseInfo.size})` : ""
                    }`}
              </span>
            </button>

            {/* Download Status */}
            {hasDownloaded && (
              <p
                className="text-sm sm:text-base font-semibold text-primary"
                role="status"
              >
                Your download is starting...
              </p>
            )}

            {/* Version Info */}
            <p className="text-sm sm:text-base text-gray-600">
              {isLoading ? (
                "Checking for latest version..."
              ) : (
                <span className="flex items-center gap-2">
                  Version {releaseInfo.version} (Build {releaseInfo.buildNumber}
                  )
                  {releaseInfo.isPrerelease && (
                    <span className="text-xs px-2 py-1 rounded-full font-bold bg-orange-600 text-white">
                      PRE-RELEASE
                    </span>
                  )}
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex justify-center lg:justify-end w-full lg:w-auto relative">
          <div className="relative w-40 sm:w-48 md:w-56 lg:w-64 xl:w-72 flex items-center justify-center">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-pulse"
              style={{
                width: "160%",
                height: "160%",
                background:
                  "radial-gradient(circle, rgba(147, 197, 253, 0.4) 0%, rgba(191, 219, 254, 0.2) 35%, transparent 65%)",
                borderRadius: "50%",
                filter: "blur(40px)",
              }}
            ></div>

            <img
              src={hero_interface}
              alt="GCare mockup"
              className="w-64 lg:w-72 xl:w-80 h-auto object-contain relative z-10 transition-transform duration-300 hover:scale-105 animate-fade-in-scale"
              style={{
                filter: "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.15))",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
