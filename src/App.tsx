import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/layouts";
import { Faculty, Home, NotFound } from "@/pages";
import { SEOData } from "./components/SEO";

function App() {
  return (
    <Router>
      <SEOData />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
