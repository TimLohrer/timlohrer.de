"use client";

import { cn } from "@/lib/utils";
import { GridPattern } from "./ui/grid-pattern";
import { Particles } from "./ui/particles";

export default function Background() {
  return (
    <div className="absolute z-0 w-full h-full top-0 left-0 overflow-hidden opacity-20">
      <Particles
        className="absolute inset-0 z-2"
        quantity={100}
        ease={80}
        size={1.5}
        color={"#ffffff"}
        refresh
      />
      <GridPattern
        width={25}
        height={25}
        x={-1}
        y={-1}
        className={cn(
          "[mask-image:radial-gradient(75rem_circle_at_center,white,transparent)]"
        ) + " z-2"}
      />
    </div>
  )
}