"use client";

import Image from "next/image";
import type { TimePhase } from "@/lib/time";

interface HarborSceneProps {
  phase: TimePhase;
  reducedMotion: boolean;
}

const phaseImages: Record<TimePhase, string> = {
  dawn: "/scene/harbor-dawn.png",
  morning: "/scene/harbor-day.png",
  afternoon: "/scene/harbor-day.png",
  evening: "/scene/harbor-evening.png",
  night: "/scene/harbor-night.png",
};

const allImages = [
  "/scene/harbor-dawn.png",
  "/scene/harbor-day.png",
  "/scene/harbor-evening.png",
  "/scene/harbor-night.png",
];

export function HarborScene({ phase, reducedMotion }: HarborSceneProps) {
  const activeImage = phaseImages[phase];

  return (
    <div
      className="harbor-scene"
      role="img"
      aria-label="Oil painting of Boston Harbor view at different times of day"
    >
      {allImages.map((src) => {
        const isActive = src === activeImage;
        return (
          <div
            key={src}
            className={`harbor-image-layer${isActive ? " harbor-image-active" : ""}${!reducedMotion ? " harbor-ken-burns" : ""}`}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="100vw"
              priority={isActive}
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
        );
      })}
      <div className="harbor-vignette" aria-hidden="true" />
      <div className="harbor-bottom-gradient" aria-hidden="true" />
    </div>
  );
}
