"use client";

import { ArrowDown } from "lucide-react";
import React, { useState } from "react";
import { BlurFade } from "./ui/blur-fade";

export default function FloatingScrollButton() {
  const [isVisible, setIsVsible] = useState<boolean | null>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = document.querySelector(".snap-container");
      if (!scrollContainer) return;
      // set isVisible only to true if i am almost fully scrolled into a section and hide it once i scroll to the next one
      setIsVsible(scrollContainer.scrollTop % scrollContainer.clientHeight < 30);
    };
    const scrollContainer = document.querySelector(".snap-container");
    if (!scrollContainer) return;
    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  if (isVisible == false) return null;

  return (
    <BlurFade direction="up" className="fixed bottom-4 right-1/2 z-50" delay={isVisible == null ? 1.25 : 0}>
    <div className="fixed bottom-4 right-1/2 z-50">
      <button
        onClick={() => {
          const nextSection = document.querySelector(".snap-container");
          if (!nextSection) return;
          const sectionHeight = nextSection.clientHeight;
          const scrollPosition = nextSection.scrollTop;
          const currentSection = Math.round(scrollPosition / sectionHeight);
          nextSection.scrollTo({
            top: (currentSection + 1) * sectionHeight,
            behavior: "smooth",
          });
        }}
        className="p-2 bg-white/3 hover:bg-white/10 backdrop-blur-md rounded-md transition-all duration-300"
        aria-label="Scroll to top"
      >
        <ArrowDown />
      </button>
    </div>
    </BlurFade>
  );
}