import { useState, useEffect } from "react";
import { GithubService } from "@/services";
import { ReleaseParser } from "@/utils";
import { AppConfig } from "@/config";
import { GitHubReleaseParams } from "@/types";

const CACHE_DURATION = 5 * 60 * 1000;
let cachedReleaseData: {
  data: ReleaseParser.ReleaseInfo;
  timestamp: number;
  owner: string;
  repo: string;
} | null = null;

const useGitHubRelease = ({ githubOwner, githubRepo }: GitHubReleaseParams) => {
  const [releaseInfo, setReleaseInfo] = useState<ReleaseParser.ReleaseInfo>({
    version: AppConfig.defaultVersion,
    buildNumber: AppConfig.defaultBuildNumber,
    downloadUrl: "#",
    isPrerelease: false,
    size: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasDownloaded, setHasDownloaded] = useState(false);

  useEffect(() => {
    fetchLatestRelease();
  }, [githubOwner, githubRepo]);

  const fetchLatestRelease = async (bypassCache = false) => {
    try {
      setIsLoading(true);
      setError(null);

      // Check cache validity
      const now = Date.now();
      const isCacheValid =
        !bypassCache &&
        cachedReleaseData &&
        cachedReleaseData.owner === githubOwner &&
        cachedReleaseData.repo === githubRepo &&
        now - cachedReleaseData.timestamp < CACHE_DURATION;

      if (isCacheValid && cachedReleaseData) {
        // Use cached data
        setReleaseInfo(cachedReleaseData.data);
        setIsLoading(false);
        return;
      }

      // Fetch fresh data from GitHub
      const release = await GithubService.githubService.getLatestRelease({
        githubOwner: githubOwner,
        githubRepo: githubRepo,
      });
      const parsedInfo = ReleaseParser.releaseParser.parseRelease(release);

      // Update cache
      cachedReleaseData = {
        data: parsedInfo,
        timestamp: now,
        owner: githubOwner,
        repo: githubRepo,
      };

      setReleaseInfo(parsedInfo);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch release";
      setError(errorMessage);
      console.error("Error fetching release:", err);

      // If fetch fails but we have cached data, use it anyway
      if (
        cachedReleaseData &&
        cachedReleaseData.owner === githubOwner &&
        cachedReleaseData.repo === githubRepo
      ) {
        setReleaseInfo(cachedReleaseData.data);
        console.log("Using stale cache due to fetch error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const downloadApp = () => {
    if (releaseInfo.downloadUrl && releaseInfo.downloadUrl !== "#") {
      const link = document.createElement("a");
      link.href = releaseInfo.downloadUrl;
      link.download = `GCare-${releaseInfo.version}.apk`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setHasDownloaded(true);

      // Reset download status after 5 seconds
      setTimeout(() => {
        setHasDownloaded(false);
      }, 5000);
    }
  };

  return {
    releaseInfo,
    isLoading,
    error,
    hasDownloaded,
    downloadApp,
    refetch: () => fetchLatestRelease(true),
  };
};

export default useGitHubRelease;
