import { useEffect } from "react";
import { GitHubHook } from "@/hooks";
import { GitHubConfig } from "@/config";

const SEOStructuredData = () => {
  const { releaseInfo, isLoading } = GitHubHook({
    githubOwner: GitHubConfig.owner,
    githubRepo: GitHubConfig.studnet_repo,
  });

  useEffect(() => {
    if (!isLoading && releaseInfo.version) {
      updateStructuredData();
      updateMetaDescription();
    }
  }, [releaseInfo, isLoading]);

  const updateStructuredData = () => {
    const scripts = document.querySelectorAll(
      'script[type="application/ld+json"]'
    );

    scripts.forEach((script) => {
      try {
        const data = JSON.parse(script.textContent || "{}");

        if (data["@type"] === "MobileApplication") {
          data.softwareVersion = releaseInfo.version;

          if (releaseInfo.downloadUrl && releaseInfo.downloadUrl !== "#") {
            data.downloadUrl = releaseInfo.downloadUrl;
          }

          if (releaseInfo.isPrerelease) {
            data.releaseNotes = `Pre-release version ${releaseInfo.version} (Build ${releaseInfo.buildNumber})`;
          }

          script.textContent = JSON.stringify(data);
        }
      } catch (err) {
        console.error("Error updating structured data:", err);
      }
    });
  };

  const updateMetaDescription = () => {
    if (releaseInfo.version && releaseInfo.version !== "1.0") {
      const metaDescription = document.querySelector(
        'meta[name="description"]'
      );
      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          `Download GCare ${releaseInfo.version} for Android. Book JRMSU Guidance appointments with QR code verification. Easy, secure, and fast scheduling for students.`
        );
      }

      const ogDescription = document.querySelector(
        'meta[property="og:description"]'
      );
      if (ogDescription) {
        ogDescription.setAttribute(
          "content",
          `Download GCare ${releaseInfo.version} for Android. Book and manage JRMSU Guidance appointments with QR code technology. Secure and convenient appointment scheduling for students.`
        );
      }
    }
  };

  return null;
};

export default SEOStructuredData;
