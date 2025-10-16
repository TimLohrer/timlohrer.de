"use client";

import { projects } from "@/app/content/home/home.json"
import { BlurFade } from "@/components/ui/blur-fade";
import ProjectCard from "@/components/project-card";
import Footer from "@/components/footer";

type ProjectButton = {
  type: "source" | "issues" | "download" | "visit" | "custom";
  iconUrl: string | null;
  label: string;
  url: string;
  extended?: boolean | null;
};

type Project = {
  slug: string;
  name: string;
  description: string;
  longDescription?: string;
  image?: string;
  tags: string[];
  license?: string;
  buttons: ProjectButton[];
};

export default function Projects() {
  return (
    <>
    <section className="flex flex-col items-center min-h-[100vh] w-screen snap-start snap-always" id="projects">
      <BlurFade direction="up" delay={.25} inView>
        <h1 className="text-[3rem] font-bold mt-[5rem]">Projects</h1>
      </BlurFade>
      <BlurFade direction="up" delay={.35} inView>
        <p className="text-[.95rem] mt-[1rem] opacity-75 mx-[2rem] text-center">These are by far not all projects I have worked on. To see more, check out my GitHub linked at the top!</p>
      </BlurFade>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-[80%] mt-[5rem] mb-[10rem]">
        {projects.map((project, index: number) => (
          <BlurFade direction="up" delay={0.5 + .1 * (index + 1)} key={index} inView>
            <ProjectCard
              name={project.name}
              description={project.description}
              longDescription={project.longDescription ?? undefined}
              image={project.image}
              tags={project.tags}
              buttons={project.buttons as ProjectButton[]}
              license={project.license}
            />
          </BlurFade>
        ))}
      </div>
      <Footer />
    </section>
    </>
  );
}