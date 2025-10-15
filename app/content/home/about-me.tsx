"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { TextAnimate } from "@/components/ui/text-animate";
import { aboutMe, socialButtons } from "@/app/content/home/home.json"
import Button from "@/components/button";
import { SocialIcon } from "react-social-icons";

export default function AboutMe() {
  return (
    <section className="flex flex-col items-center min-h-[100vh] w-screen snap-start snap-always">
      <div className="flex flex-col w-[80%] mt-[10rem]">
        <h1 className="font-bold text-[5rem]">
          <TextAnimate animation="slideUp" by="line" delay={.1} once>
            Hello 👋
          </TextAnimate>
        </h1>
        <h1 className="flex flex-row font-bold text-[5rem]">
          <BlurFade direction="up" delay={.2} className="flex flex-row" inView>
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
        <div className="mt-[2rem] text-[1.15rem]">
          {aboutMe.map((text: string, index: number) => {
            return (
              <TextAnimate animation="slideUp" by="word" delay={0.35 + index * 0.15} once key={index}>
                {text}
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
                    style={{ padding: 0, paddingRight: 10 }}
                    onClick={() => window.open(button.url, "_blank")}
                    className="hover:border-gray-600 transition-all transition-duration-300"
                >
                  <SocialIcon network={button.network} fgColor="white" bgColor="transparent" style={{ height: 45, width: 45 }} />
                  {button.name}
                </Button>
              )
            })}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
