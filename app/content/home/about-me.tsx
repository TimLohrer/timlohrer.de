"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { TextAnimate } from "@/components/ui/text-animate";
import { aboutMe, socialButtons } from "@/app/content/home/home.json"
import Button from "@/components/button";
import { SocialIcon } from "react-social-icons";
import FloatingScrollButton from "@/components/floating-scroll-button";
import React, { useEffect, useState } from "react";
import { Bug, ExternalLink, GitCommit, GitPullRequest } from "lucide-react";
import { NumberTicker } from "@/components/ui/number-ticker";

export default function AboutMe() {
  useEffect(() => {
    setTimeout(() => {
      const hello = document.querySelector(".hello");
      if (!hello) return;
      hello.innerHTML = "Hello <span class=\"wave-emoji\">👋</span>";
      setTimeout(() => {
        hello.innerHTML = "Hello 👋";
      }, 2000);
    }, 750);
  }, []);

  function getAge(): number {
    const birthDate = new Date("2006-03-20");
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  function getYearsOfExperience(): number {
    const startDate = new Date("2019-09-21");
    const experienceDifMs = Date.now() - startDate.getTime();
    const experienceDate = new Date(experienceDifMs);
    return Math.abs(experienceDate.getUTCFullYear() - 1970);
  }

  interface GhStats {
    commits: number,
    issues: number,
    pullRequests: number
  }

  const [ghStats, setGhStats] = useState<GhStats | null>(null);

  if (ghStats == null) {
    setGhStats({ commits: 0, issues: 0, pullRequests: 0 });
    (async () => {
      const res = await fetch("/api/github-data");
      if (!res.ok) return;
      const data = await res.json();
      setGhStats({
        commits: data.totalCommitContributions,
        issues: data.totalIssueContributions,
        pullRequests: data.totalPullRequestContributions
      });
    })();
  }
  
  return (
    <>
    <section className="flex flex-col items-center min-h-[100vh] w-screen snap-start snap-always" id="about">
      <div className="flex flex-col w-[80%] mt-[5rem] lg:mt-[10rem]">
        <h1 className="font-bold text-[2rem] lg:text-[5rem]">
          <TextAnimate animation="slideUp" by="line" delay={.1} segmentClassName="hello" once>
            Hello 👋
          </TextAnimate>
        </h1>
        <h1 className="flex flex-row font-bold text-[1.5rem] lg:text-[5rem]">
          <BlurFade direction="up" delay={.2} className="flex flex-row tracking-tighter" inView>
            I am
          </BlurFade>
          <TextAnimate
              className="ml-[2rem] bg-gradient-to-r from-amber-300 to-pink-500 bg-clip-text text-transparent" 
              animation="slideRight" 
              by="character" 
              delay={0.075}
              once
            >
              Tim Lohrer
            </TextAnimate>
            <TextAnimate animation="slideRight" delay={.7} once>
              .
            </TextAnimate>
        </h1>
        <div className="mt-[2rem] text-[0.9rem] lg:text-[1.15rem]">
          {aboutMe.map((text: string, index: number) => {
            return (
              <TextAnimate animation="slideUp" by="word" delay={0.35 + index * 0.15} once key={index}>
                {text.replaceAll("{{AGE}}", getAge().toString()).replaceAll("{{EXPERIENCE}}", getYearsOfExperience().toString())}
              </TextAnimate>
            )
          })}
        </div>
        <BlurFade className="mt-[1.5rem]" direction="down" delay={0.9} inView>
          <div className="flex flex-row gap-4 text-[1rem]">
            {socialButtons.map((button: { network: string, name: string, url: string }, index: number) => {
              return (
                <Button
                    key={index}
                    style={{ padding: 0 }}
                    onClick={() => window.open(button.url, "_blank")}
                    className="hover:border-gray-600 transition-all transition-duration-300"
                >
                  <SocialIcon network={button.network} fgColor="white" bgColor="transparent" style={{ height: 45, width: 45 }} />
                  <span className="items-center hidden lg:flex">
                    {button.name}
                    <ExternalLink size={16} className="ml-2 mr-3" />
                  </span>
                </Button>
              )
            })}
          </div>
        </BlurFade>
        <BlurFade className="mt-[3.5rem] lg:mt-[5rem]" direction="down" delay={1} inView>
          <h2 className="text-[0.8rem] lg:text-[1.15rem] mb-4">GitHub Stats (last 12 months)</h2>
          <div className="flex flex-row gap-6 lg:gap-20">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 lg:gap-2">
                <GitCommit className="size-5 lg:size-7" />
                <p className="text-[0.75rem] lg:text-[1rem]">Commits</p>
              </div>
              <NumberTicker value={ghStats?.commits ?? 0} delay={1} className="font-bold text-[1.5rem] lg:text-[2rem]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 lg:gap-2">
                <Bug className="size-3 lg:size-5" />
                <p className="text-[0.75rem] lg:text-[1rem]">Issues</p>
              </div>
              <NumberTicker value={ghStats?.issues ?? 0} delay={1} className="font-bold text-[1.5rem] lg:text-[2rem]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 lg:gap-2">
                <GitPullRequest className="size-3 lg:size-5" />
                <p className="text-[0.75rem] lg:text-[1rem]">
                  <span className="hidden lg:inline">Pull Requests</span>
                  <span className="lg:hidden">PR&apos;s</span>
                </p>
              </div>
              <NumberTicker value={ghStats?.pullRequests ?? 0} delay={1} className="font-bold text-[1.5rem] lg:text-[2rem]" />
            </div>
          </div>
        </BlurFade>
      </div>
      <FloatingScrollButton sectionIndex={0} />
    </section>
    <style>{`
      @keyframes wave {
        0% { transform: rotate(0deg); }
        10% { transform: rotate(20deg); }
        20% { transform: rotate(-10deg); }
        30% { transform: rotate(20deg); }
        40% { transform: rotate(-5deg); }
        50% { transform: rotate(10deg); }
        60% { transform: rotate(0deg); }
        100% { transform: rotate(0deg); }
      }
      .wave-emoji {
        display: inline-block;
        animation: wave 2s ease-in-out;
        transform-origin: 70% 70%;
      }
    `}</style>
    </>
  );
}
