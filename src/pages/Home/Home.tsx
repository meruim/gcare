import {
  Hero,
  Features,
  About,
  FAQ,
  InstallGuide,
  Support,
} from "@/components/Home";

export const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <InstallGuide />
      <Features />
      <About />
      <FAQ />
      <Support />
    </div>
  );
};

export default Home;
