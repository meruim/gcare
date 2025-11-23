import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { GitHubHook } from "@/hooks";
import { GitHubConfig } from "@/config";
import { getSubdomain } from "@/utils/subdomain";

const SEOStructuredData = () => {
  const subdomain = getSubdomain();

  const { releaseInfo, isLoading } = GitHubHook({
    githubOwner: GitHubConfig.owner,
    githubRepo: GitHubConfig.studnet_repo,
  });

  // base SEO configuration for each subdomain
  const seoConfig: Record<string, any> = {
    main: {
      title:
        releaseInfo.version && releaseInfo.version !== "1.0"
          ? `Download GCare ${releaseInfo.version} APK - JRMSU Guidance QR Scheduling`
          : "Download GCare APK - JRMSU Guidance QR Scheduling",
      description:
        releaseInfo.version && releaseInfo.version !== "1.0"
          ? `Download GCare ${releaseInfo.version} for Android. Book JRMSU Guidance appointments with QR code verification. Easy, secure, and fast scheduling for students.`
          : "Download GCare APK for Android. Book JRMSU Guidance appointments with QR code verification. Easy, secure, and fast scheduling for students.",
      url: "https://www.jrmsu-gcare.com",
      keywords:
        "gcare, guidance care, gcare app, download gcare apk, qr code appointment, jrmsu guidance, jrmsu appointment booking, qr code scheduling",
      noindex: false,
    },
    faculty: {
      title: "Faculty - GCare JRMSU",
      description: "JRMSU Faculty information and guidance services",
      url: "https://faculty.jrmsu-gcare.com",
      keywords: "jrmsu faculty, guidance counselors, faculty information",
      noindex: true,
    },
    terms: {
      title: "Terms & Conditions - GCare JRMSU",
      description: "Terms and conditions for using GCare appointment system",
      url: "https://terms.jrmsu-gcare.com",
      keywords: "terms, conditions, gcare terms",
      noindex: true,
    },
    privacy: {
      title: "Privacy Policy - GCare JRMSU",
      description: "Privacy policy for GCare appointment scheduling system",
      url: "https://privacy.jrmsu-gcare.com",
      keywords: "privacy policy, data protection, gcare privacy",
      noindex: true,
    },
  };

  const config = seoConfig[subdomain] || seoConfig.main;

  useEffect(() => {
    if (subdomain === "main" && !isLoading && releaseInfo.version) {
      updateStructuredData();
    }
  }, [releaseInfo, isLoading, subdomain]);

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
      {/* Primary Meta Tags */}
      <title>{config.title}</title>
      <meta name="title" content={config.title} />
      <meta name="description" content={config.description} />
      <meta name="keywords" content={config.keywords} />
      <meta name="author" content="GCare - JRMSU" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

      {/* Robots */}
      {config.noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
      )}

      {/* Canonical Link */}
      <link rel="canonical" href={config.url} />

      {/* Open Graph / Facebook */}
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

      {/* Twitter Card */}
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

      {/* Geo Tags */}
      <meta name="geo.region" content="PH" />
      <meta name="geo.placename" content="Philippines" />
    </Helmet>
  );
};

export default SEOStructuredData;
