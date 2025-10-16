"use client";

import { useEffect, useState } from "react";

interface ScrollIndicatorProps {
  sections: string[];
}

export default function ScrollIndicator({ sections }: ScrollIndicatorProps) {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const scrollContainer = document.querySelector(".snap-container");
    if (!scrollContainer) return;

    const handleScroll = () => {
      const scrollPosition = scrollContainer.scrollTop;
      const sectionHeight = scrollContainer.clientHeight;
      const currentSection = Math.round(scrollPosition / sectionHeight);
      setActiveSection(currentSection);
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    const scrollContainer = document.querySelector(".snap-container");
    if (!scrollContainer) return;
    
    const sectionHeight = scrollContainer.clientHeight;
    scrollContainer.scrollTo({
      top: index * sectionHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed left-3 lg:left-8 top-1/2 -translate-y-1/2 z-50">
      <div className="relative flex flex-col items-start gap-4">
        {sections.map((sectionName, index) => (
        <div key={index} className="relative">
          <button
            onClick={() => scrollToSection(index)}
            className="group flex items-center gap-3 transition-all relative z-10"
            aria-label={`Go to section ${sectionName}`}
          >
            <div
              className={`
                w-2 h-2 lg:w-3 lg:h-3 rounded-full border-1 lg:border-2 transition-all duration-300 bg-background
                ${
                  activeSection === index
                    ? "border-white scale-125"
                    : "border-white/40 group-hover:border-white/70 group-hover:scale-110"
                }
              `}
            >
              {activeSection === index && (
                <div className="w-full h-full rounded-full bg-white scale-75" />
              )}
            </div>
            <span
              className={`
                text-sm font-medium transition-all duration-300 hidden lg:block
                ${
                  activeSection === index
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0"
                }
              `}
            >
              {sectionName}
            </span>
          </button>
          
          {/* Line to next circle */}
          {index < sections.length - 1 && (
            <div className="absolute left-[3px] lg:left-[5px] w-[2px] rounded-md h-4 bg-white/20" />
          )}
        </div>
        ))}
      </div>
    </div>
  );
}
