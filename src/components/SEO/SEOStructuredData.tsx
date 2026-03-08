import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { GitHubHook } from "@/hooks";
import { GitHubConfig } from "@/config";

const SEOStructuredData = () => {
  const { pathname } = useLocation();
  const { releaseInfo, isLoading } = GitHubHook({
    githubOwner: GitHubConfig.owner,
    githubRepo: GitHubConfig.studnet_repo,
  });

  const seoConfig: Record<string, any> = {
    "/": {
      title:
        releaseInfo.version && releaseInfo.version !== "1.0"
          ? `Download GCare ${releaseInfo.version} APK - JRMSU Guidance QR Scheduling`
          : "Download GCare APK - JRMSU Guidance QR Scheduling",
      description:
        releaseInfo.version && releaseInfo.version !== "1.0"
          ? `Download GCare ${releaseInfo.version} for Android. Book JRMSU Guidance appointments with QR code verification.`
          : "Download GCare APK for Android. Book JRMSU Guidance appointments with QR code verification.",
      url: "https://www.jrmsu-gcare.com",
      keywords:
        "gcare, guidance care, gcare app, download gcare apk, qr code appointment, jrmsu guidance",
      noindex: false,
    },
    "/faculty": {
      title: "Faculty - GCare JRMSU",
      description: "JRMSU Faculty information and guidance services",
      url: "https://www.jrmsu-gcare.com/faculty",
      keywords: "jrmsu faculty, guidance counselors, faculty information",
      noindex: true,
    },
    "/terms": {
      title: "Terms & Conditions - GCare JRMSU",
      description: "Terms and conditions for using GCare appointment system",
      url: "https://www.jrmsu-gcare.com/terms",
      keywords: "terms, conditions, gcare terms",
      noindex: true,
    },
    "/privacy": {
      title: "Privacy Policy - GCare JRMSU",
      description: "Privacy policy for GCare appointment scheduling system",
      url: "https://www.jrmsu-gcare.com/privacy",
      keywords: "privacy policy, data protection, gcare privacy",
      noindex: true,
    },
  };

  const getConfig = () => {
    const exactMatch = seoConfig[pathname];
    if (exactMatch) return exactMatch;

    const prefixMatch = Object.keys(seoConfig)
      .filter((key) => key !== "/" && pathname.startsWith(key))
      .pop();

    return prefixMatch ? seoConfig[prefixMatch] : seoConfig["/"];
  };

  const config = getConfig();

  useEffect(() => {
    if (pathname === "/" && !isLoading && releaseInfo.version) {
      updateStructuredData();
    }
  }, [releaseInfo, isLoading, pathname]);

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

  return (
    <Helmet>
      <title>{config.title}</title>
      <meta name="title" content={config.title} />
      <meta name="description" content={config.description} />
      <meta name="keywords" content={config.keywords} />
      <meta name="author" content="GCare - JRMSU" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      {config.noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
      )}
      <link rel="canonical" href={config.url} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={config.url} />
      <meta property="og:title" content={config.title} />
      <meta property="og:description" content={config.description} />
      <meta
        property="og:image"
        content="https://www.jrmsu-gcare.com/og-image.png"
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="GCare - JRMSU Guidance" />
      <meta property="og:locale" content="en_PH" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={config.title} />
      <meta name="twitter:description" content={config.description} />
      <meta
        name="twitter:image"
        content="https://www.jrmsu-gcare.com/og-image.png"
      />
      <meta
        name="twitter:image:alt"
        content="GCare — JRMSU Guidance Appointment App"
      />
      <meta name="geo.region" content="PH" />
      <meta name="geo.placename" content="Philippines" />
    </Helmet>
  );
};

export default SEOStructuredData;
