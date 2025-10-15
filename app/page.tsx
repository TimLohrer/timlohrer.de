import ScrollIndicator from "@/components/scroll-indicator";
import AboutMe from "./content/home/about-me";
import { BlurFade } from "@/components/ui/blur-fade";

export default function Home() {
  return (
    <>
      <ScrollIndicator sections={["Home", "About", "Projects"]} />
      <AboutMe />
      <AboutMe />
      <AboutMe />
    </>
  );
}
