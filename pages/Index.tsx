import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Services } from "@/components/Services";
import { Skills } from "@/components/Skills";
import { Testimonials } from "@/components/Testimonials";
import { Metrics } from "@/components/Metrics";
import { Moodboard } from "@/components/Moodboard";
import { Certifications } from "@/components/Certifications";
import { Blog } from "@/components/Blog";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { CursorTrail } from "@/components/CursorTrail";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgressBar />
      <CursorTrail />
      <Navigation />
      <Hero />
      <About />
      <Education />
      <Experience />
      <Metrics />
      <Projects />
      <Services />
      <Skills />
      <Testimonials />
      <Moodboard />
      <Certifications />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
