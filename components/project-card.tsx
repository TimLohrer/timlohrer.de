"use client";

import { useState, useRef, MouseEvent } from "react";
import Button from "./button";
import { Bug, Code, Download, ExternalLink, Globe } from "lucide-react";

interface ProjectButton {
  type: string;
  iconUrl: string | null;
  label: string;
  url: string;
  extended?: boolean | null | undefined;
}

interface ProjectCardProps {
  name: string;
  description: string;
  longDescription?: string;
  image?: string;
  tags: string[];
  buttons: ProjectButton[];
  license?: string;
}

export default function ProjectCard({
  name,
  description,
  image,
  tags,
  buttons,
  license,
}: ProjectCardProps) {
  if (license && !tags.includes(license)) {
    tags.push(license);
  }

  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateXValue = ((y - centerY) / centerY) * -6.5;
    const rotateYValue = ((x - centerX) / centerX) * 6.5;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <>
      <style>{`
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .gradient-border {
          background: linear-gradient(90deg, 
            #60a5fa, 
            #a78bfa, 
            #ec4899, 
            #f59e0b, 
            #60a5fa
          );
          background-size: 300% 300%;
          animation: gradient-shift 8s ease infinite;
        }
      `}</style>
      
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        className="relative group"
        style={{
          perspective: "1000px",
        }}
      >
        <div
          className={`
            gradient-border border rounded-xl transition-all duration-300 pointer-events-none
            ${isHovered ? "opacity-100" : "opacity-75"}
          `}
        >
          <div
            className="bg-background rounded-xl overflow-hidden transition-transform duration-150 ease-out"
            style={{
              transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isHovered ? 1.035 : 1})`,
              transformStyle: "preserve-3d",
            }}
          >
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                {image && (
                  <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={image}
                      alt={name}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                )}
                <h3 className="text-xl font-bold text-foreground group-hover:text-blue-400 transition-colors">
                  {name}
                </h3>
              </div>

              <p className="text-[.75rem] text-muted-foreground line-clamp-3 min-h-[3.5rem]">
                {description}
              </p>

              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="flex items-center text-xs px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors pointer-events-auto cursor-default"
                    >
                      {index == tags.length - 1 && license  ? 
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L5 10.274zm10 0l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L15 10.274z" clipRule="evenodd" />
                        </svg>
                        <span>{license}</span>
                      </div>
                      : tag}
                    </span>
                  ))}
                </div>
              )}

              {buttons && buttons.filter(b => !b.extended).length > 0 && (
                <>
                  <div className="mb-3 w-full bg-accent h-[0.1rem] rounded-md"></div>
                  <div className="flex flex-wrap gap-2">
                    {buttons.filter(b => !b.extended).map((button, index) => (
                      <Button
                        key={index}
                        onClick={() => window.open(button.url, "_blank")}
                        className="text-xs hover:border-blue-500/50 gap-2 p-0 transition-all cursor-pointer pointer-events-auto"
                        style={{ padding: "0.35rem 0.65rem" }}
                      >
                        {button.type === "source" && (
                          <Code size={15} />
                        )}
                        {button.type === "issues" && (
                          <Bug size={15} />
                        )}
                        {button.type === "download" && (
                          <Download size={15} />
                        )}
                        {button.type === "visit" && (
                          <Globe size={15} />
                        )}
                        {button.iconUrl && (
                          <>
                            {button.iconUrl.startsWith("<svg") ? (
                              <span
                                className="w-4 h-4 mr-2"
                                dangerouslySetInnerHTML={{ __html: button.iconUrl }}
                              />
                            ) : (
                              <img src={button.iconUrl as string} alt={button.label} className="w-4 h-4 mr-2" />
                            )}
                          </>
                        )}
                        {button.type === "custom" && !button.iconUrl && (
                          <ExternalLink size={15} />
                        )}
                        {button.label}
                      </Button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Glow effect on hover */}
        <div
          className={`
            absolute -inset-[2px] rounded-xl blur-xl transition-opacity duration-300 -z-10
            bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30
            ${isHovered ? "opacity-75" : "opacity-0"}
          `}
        />
      </div>
    </>
  );
}
