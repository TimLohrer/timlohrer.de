"use client";

import ScrollIndicator from "@/components/scroll-indicator";
import AboutMe from "./content/home/about-me";
import { BlurFade } from "@/components/ui/blur-fade";
import Projects from "./content/home/projects";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "Tim Lohrer | Portfolio";
    
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, []);

  return (
    <>
      <BlurFade direction="right" className="fixed top-1/2 -translate-y-1/2" delay={1.25}>
        <ScrollIndicator sections={["About", "Projects"]} />
      </BlurFade>
      <AboutMe />
      <Projects />
    </>
  );
}
