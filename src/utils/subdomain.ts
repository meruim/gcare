export function getSubdomain(): string {
  const hostname = window.location.hostname;

  // Development - use query param for testing
  // e.g., localhost:5173?subdomain=faculty
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    const params = new URLSearchParams(window.location.search);
    return params.get("subdomain") || "main";
  }

  // Production
  const parts = hostname.split(".");

  // If just domain.com (2 parts) or less
  if (parts.length <= 2) {
    return "main";
  }

  // subdomain.domain.com -> return 'subdomain'
  const subdomain = parts[0];
  return subdomain === "www" ? "main" : subdomain;
}

export function getSubdomainUrl(subdomain: string): string {
  const hostname = window.location.hostname;
  const isDevelopment = hostname === "localhost" || hostname === "127.0.0.1";

  if (isDevelopment) {
    return `http://localhost:5173?subdomain=${subdomain}`;
  }

  // Production
  if (subdomain === "main") {
    return "https://www.jrmsu-gcare.com";
  }

  return `https://${subdomain}.jrmsu-gcare.com`;
}
