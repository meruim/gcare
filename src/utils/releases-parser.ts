import { GithubService } from "@/services";

export interface ReleaseInfo {
  version: string;
  buildNumber: string;
  downloadUrl: string;
  isPrerelease: boolean;
  size: string;
}

export const releaseParser = {
  extractVersion(tagName: string): string {
    return tagName.replace(/^v/, "");
  },

  extractBuildNumber(text: string): string {
    const patterns = [
      /build(\d+)/i, // matches "build2", "Build2"
      /build[:\s]+(\d+)/i, // matches "Build: 2", "build 2"
      /\(build\s+(\d+)\)/i, // matches "(Build 2)"
      /#(\d+)/, // matches "#2"
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        return match[1];
      }
    }

    return "";
  },

  findAssetUrl(release: GithubService.GitHubRelease): string {
    const apkAsset = release.assets.find((asset) =>
      asset.name.toLowerCase().endsWith(".apk")
    );

    return apkAsset ? apkAsset.browser_download_url : release.html_url;
  },

  findAssetSize(release: GithubService.GitHubRelease): string {
    const apkAsset = release.assets.find((asset) =>
      asset.name.toLowerCase().endsWith(".apk")
    );

    if (!apkAsset || !apkAsset.size) {
      return "";
    }

    const sizeInMB = (apkAsset.size / (1024 * 1024)).toFixed(1);
    return `${sizeInMB}MB`;
  },

  parseRelease(release: GithubService.GitHubRelease): ReleaseInfo {
    const version = this.extractVersion(release.tag_name);

    const releaseText = `${release.name || ""} ${release.body || ""}`;
    const buildNumber = this.extractBuildNumber(releaseText);

    const downloadUrl = this.findAssetUrl(release);
    const size = this.findAssetSize(release);

    return {
      version,
      buildNumber: buildNumber || "1",
      downloadUrl,
      isPrerelease: release.prerelease,
      size,
    };
  },
};
