import React from "react";

interface DownloadSectionProps {
  isLoading: boolean;
  hasDownloaded: boolean;
  releaseInfo: {
    version: string;
    buildNumber: string;
    size?: string;
    isPrerelease?: boolean;
  };
  onDownload: () => void;
}

export const DownloadSection: React.FC<DownloadSectionProps> = ({
  isLoading,
  hasDownloaded,
  releaseInfo,
  onDownload,
}) => {
  return (
    <div className="flex flex-col items-center lg:items-start gap-2 sm:gap-3">
      <button
        onClick={onDownload}
        disabled={isLoading}
        className="bg-primary text-white font-bold py-3.5 px-10 sm:py-4 sm:px-12 md:py-4 md:px-14 rounded-lg text-sm sm:text-base md:text-base disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
      >
        <span className="flex items-center gap-2">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
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
            : `Download${releaseInfo.size ? ` (${releaseInfo.size})` : ""}`}
        </span>
      </button>

      {/* Download Status */}
      {hasDownloaded && (
        <p className="text-sm sm:text-base font-semibold text-primary">
          Your download is starting...
        </p>
      )}

      {/* Version Info */}
      <p className="text-sm sm:text-base text-gray-600">
        {isLoading ? (
          "Checking for latest version..."
        ) : (
          <span className="flex items-center gap-2">
            Version {releaseInfo.version} (Build {releaseInfo.buildNumber})
            {releaseInfo.isPrerelease && (
              <span className="text-xs px-2 py-1 rounded-full font-bold bg-orange-600 text-white">
                PRE-RELEASE
              </span>
            )}
          </span>
        )}
      </p>
    </div>
  );
};
