import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/layouts";
import {
  Faculty,
  Home,
  NotFound,
  PrivacyPolicy,
  TermsCondition,
} from "@/pages";
import { SEOData } from "./components/SEO";
import { getSubdomain } from "@/utils/subdomain";

const subdomainRoutes: Record<string, React.ReactNode> = {
  main: <Route path="/" element={<Home />} />,
  faculty: <Route path="/" element={<Faculty />} />,
  terms: <Route path="/" element={<TermsCondition />} />,
  privacy: <Route path="/" element={<PrivacyPolicy />} />,
};

function App() {
  const [subdomain, setSubdomain] = useState<string>("main");

  useEffect(() => {
    setSubdomain(getSubdomain());
  }, []);

  return (
    <Router>
      <SEOData />
      <Routes>
        <Route element={<MainLayout />}>
          {subdomainRoutes[subdomain] || subdomainRoutes.main}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
