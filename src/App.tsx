import type React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/layouts";
import {
  Docs,
  Faculty,
  Home,
  NotFound,
  PrivacyPolicy,
  TermsCondition,
} from "@/pages";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SEOData } from "./components/SEO";

const SUBDOMAIN_ROUTES: Record<string, React.ReactNode> = {
  "privacy.jrmsu-gcare.com": <PrivacyPolicy />,
  "terms.jrmsu-gcare.com": <TermsCondition />,
  "docs.jrmsu-gcare.com": <Docs />,
  "faculty.jrmsu-gcare.com": <Faculty />,
};

function SubdomainRoute() {
  const hostname = window.location.hostname;
  const subdomainContent = SUBDOMAIN_ROUTES[hostname];
  return subdomainContent ?? <Home />;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <SEOData />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<SubdomainRoute />} />
          <Route path="/terms" element={<TermsCondition />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/docs/:slug" element={<Docs />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
