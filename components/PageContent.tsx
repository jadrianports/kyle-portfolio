"use client";

import { useEffect, useState } from "react";
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
import { getPortfolioData, PortfolioData } from "@/lib/getPortfolioData";
import { PortfolioProvider } from "@/contexts/PortfolioProvider";
import { useLoading } from "@/contexts/LoadingContext";

export default function Page() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const { setIsLoading, setLoadingText } = useLoading();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setLoadingText("Loading portfolio...");
        const portfolio = await getPortfolioData();
        setData(portfolio);
      } catch (err) {
        console.error("Error fetching portfolio:", err);
      } finally {
        setIsLoading(false);
        setLoadingText(undefined);
      }
    };
    fetchData();
  }, [setIsLoading, setLoadingText]);

  if (!data) return null;

  return (
    <PortfolioProvider data={data}>
      <ScrollProgressBar />
      <CursorTrail />
      <Navigation />
      <Hero heroData={data.hero} />
      <About about={data.hero} />
      <Education education={data.education} />
      <Experience experience={data.experience} />
      <Metrics />
      <Projects projects={data.projects} />
      <Services services={data.services} />
      <Skills skills={data.skills} />
      <Testimonials testimonials={data.testimonials} />
      <Moodboard />
      <Blog blogPosts={data.blogPosts} />
      <Contact heroData={data.hero} />
      <Footer heroData={data.hero} />
    </PortfolioProvider>
  );
}
