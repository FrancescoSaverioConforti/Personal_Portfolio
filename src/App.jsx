import CaseStudies from "./sections/caseStudies";
import Footer from "./sections/Footer";
import Contact from "./sections/Contact";
import TechStack from "./sections/TechStack";
import Experience from "./sections/Experience";
import Education from "./sections/Education";
import Hero from "./sections/Hero";
import AppShowcase from "./sections/ShowcaseSection";
import LogoShowcase from "./sections/LogoShowcase";

import Navbar from "./components/NavBar";
import AboutMe from "./sections/AboutMe";
import Skills from "./sections/Skills";
import NeuralBackground from "./components/NeuralBackground";
import "./i18n";

const App = () => {
  return (
    <>
      <NeuralBackground />
      <Navbar />
      <main className="overflow-x-hidden">
        <Hero />
        <AboutMe />
        <Skills />
        <LogoShowcase />
        <TechStack />
        <AppShowcase />
        <CaseStudies />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default App;