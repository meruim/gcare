import React from "react";
import { Building } from "lucide-react";
import { GitHubHook } from "@/hooks";
import guidance_logo from "@/assets/img/guidance_logo.webp";
import jrmsu_logo from "@/assets/img/jrmsu_logo.webp";
import { GitHubConfig } from "@/config";
import { DownloadSection } from "./Download-Section";

export const FacultyHero: React.FC = () => {
  const staffGithubHooks = GitHubHook({
    githubOwner: GitHubConfig.owner,
    githubRepo: GitHubConfig.staff_repo,
  });
  const counselorGithubHooks = GitHubHook({
    githubOwner: GitHubConfig.owner,
    githubRepo: GitHubConfig.counselor_repo,
  });

  return (
    <div
      id="hero"
      className="w-full min-h-[calc(100vh-64px)] px-6 py-12 sm:py-16 lg:py-20 relative"
    >
      {/* Faculty Badge - Top Right */}
      <div className="absolute top-6 right-6 inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full">
        <Building className="w-5 h-5 text-primary" />
        <span className="text-sm sm:text-base font-semibold text-primary">
          Faculty
        </span>
      </div>

      <div className="max-w-6xl w-full mx-auto">
        {/* Content Section */}
        <div className="text-center lg:text-left pt-8">
          {/* Logos */}
          <div className="flex justify-center lg:justify-start items-center gap-4 sm:gap-5 md:gap-6 lg:gap-6 mb-4 sm:mb-6 md:mb-7 lg:mb-8">
            <img
              src={jrmsu_logo}
              alt="JRMSU Logo"
              loading="lazy"
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-24 lg:h-24 object-contain"
            />
            <img
              src={guidance_logo}
              alt="Guidance Logo"
              loading="lazy"
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-24 lg:h-24 object-contain"
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
              fill="#ea580c"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-orange-600 font-semibold text-sm sm:text-base md:text-base">
              Katipunan Campus, Katipunan Z.N
            </p>
          </div>

          {/* Download Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 w-full">
            {/* Staff Download */}
            <div className="flex flex-col items-center lg:items-start">
              <h3 className="text-base sm:text-lg font-bold text-primary mb-3 flex items-center gap-2">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                For Staff
              </h3>
              <DownloadSection
                isLoading={staffGithubHooks.isLoading}
                hasDownloaded={staffGithubHooks.hasDownloaded}
                releaseInfo={staffGithubHooks.releaseInfo}
                onDownload={staffGithubHooks.downloadApp}
              />
            </div>

            {/* Counselor Download */}
            <div className="flex flex-col items-center lg:items-start">
              <h3 className="text-base sm:text-lg font-bold text-primary mb-3 flex items-center gap-2">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
                For Counselor
              </h3>
              <DownloadSection
                isLoading={counselorGithubHooks.isLoading}
                hasDownloaded={counselorGithubHooks.hasDownloaded}
                releaseInfo={counselorGithubHooks.releaseInfo}
                onDownload={counselorGithubHooks.downloadApp}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
