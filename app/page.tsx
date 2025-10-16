import ScrollIndicator from "@/components/scroll-indicator";
import AboutMe from "./content/home/about-me";
import { BlurFade } from "@/components/ui/blur-fade";
import FloatingScrollButton from "@/components/floating-scroll-button";

export default function Home() {
  return (
    <>
      <BlurFade direction="right" className="fixed top-1/2 -translate-y-1/2" delay={1.25}>
        <ScrollIndicator sections={["About", "Projects", "Stats"]} />
      </BlurFade>
      <AboutMe />
      <AboutMe />
      <AboutMe />
    </>
  );
}
