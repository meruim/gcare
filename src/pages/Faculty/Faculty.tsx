import { About, Features, InstallGuide, FAQ, Support } from "@/components";
import { FacultyHero } from "@/components/Faculty";

export const Faculty = () => {
  return (
    <div className="faculty-page">
      <FacultyHero />
      <About />
      <Features />
      <InstallGuide />
      <FAQ />
      <Support />
    </div>
  );
};

export default Faculty;
