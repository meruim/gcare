import { GitHubConfig } from "@/config";
import { GitHubReleaseParams } from "@/types";

export interface GitHubRelease {
  tag_name: string;
  name: string;
  body: string;
  html_url: string;
  prerelease: boolean;
  assets: Array<{
    name: string;
    browser_download_url: string;
    size: number;
  }>;
}

export const githubService = {
  async getLatestRelease({
    githubOwner,
    githubRepo,
  }: GitHubReleaseParams): Promise<GitHubRelease> {
    const url = `${GitHubConfig.apiBaseUrl}/repos/${githubOwner}/${githubRepo}/releases`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch release: ${response.statusText}`);
    }

    const releases = await response.json();

    if (!releases || releases.length === 0) {
      throw new Error("No releases found");
    }
    return releases[0];
  },
};
