"use client";

import { useMemo } from "react";
import type { TimePhase } from "@/lib/time";

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

interface SkylineSVGProps {
  phase: TimePhase;
}

export function SkylineSVG({ phase }: SkylineSVGProps) {
  const isNight = phase === "night" || phase === "evening";

  const windows = useMemo(() => {
    const result: { x: number; y: number }[] = [];
    const windowZones = [
      { xMin: 120, xMax: 180, yMin: 340, yMax: 400 },
      { xMin: 190, xMax: 240, yMin: 310, yMax: 400 },
      { xMin: 250, xMax: 310, yMin: 290, yMax: 400 },
      { xMin: 330, xMax: 380, yMin: 260, yMax: 400 },
      { xMin: 390, xMax: 440, yMin: 230, yMax: 400 },
      { xMin: 460, xMax: 490, yMin: 200, yMax: 400 },
      { xMin: 500, xMax: 535, yMin: 240, yMax: 400 },
      { xMin: 545, xMax: 595, yMin: 220, yMax: 400 },
      { xMin: 610, xMax: 670, yMin: 250, yMax: 400 },
      { xMin: 680, xMax: 740, yMin: 280, yMax: 400 },
      { xMin: 760, xMax: 830, yMin: 310, yMax: 400 },
      { xMin: 840, xMax: 890, yMin: 340, yMax: 400 },
    ];
    let seed = 42;
    for (const zone of windowZones) {
      const cols = Math.floor((zone.xMax - zone.xMin) / 8);
      const rows = Math.floor((zone.yMax - zone.yMin) / 12);
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          seed++;
          if (seededRandom(seed) > 0.35) continue;
          result.push({
            x: zone.xMin + c * 8 + 4,
            y: zone.yMin + r * 12 + 6,
          });
        }
      }
    }
    return result;
  }, []);

  return (
    <svg
      viewBox="0 0 1000 500"
      preserveAspectRatio="xMidYMax slice"
      className="harbor-skyline-layer"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="skyline-edge-light" x1="0" y1="0" x2="0" y2="1">
          <stop
            offset="0%"
            stopColor="var(--scene-accent, #88C0D0)"
            stopOpacity="0.25"
          />
          <stop
            offset="30%"
            stopColor="var(--scene-accent, #88C0D0)"
            stopOpacity="0"
          />
        </linearGradient>
      </defs>

      {/* Main skyline silhouette — Boston as seen from East Boston */}
      <path
        d={[
          "M 0,500",
          // Far left — low waterfront structures
          "L 0,420",
          "L 40,418 L 45,400 L 55,400 L 60,415",
          "L 80,412 L 85,390 L 100,388 L 105,410",
          // Low-rise cluster
          "L 120,408 L 125,370 L 140,365 L 155,368 L 160,375 L 175,372 L 180,405",
          // Medium buildings
          "L 195,400 L 200,340 L 215,335 L 230,338 L 235,400",
          // Taller cluster approaching financial district
          "L 250,395 L 255,310 L 270,305 L 285,308 L 295,300 L 305,303 L 310,395",
          // Financial district — tall towers
          "L 325,390 L 330,275 L 340,268 L 355,265 L 365,270 L 375,272 L 380,390",
          // Tallest tower cluster
          "L 390,385 L 395,240 L 405,232 L 418,228 L 430,235 L 438,240 L 440,385",
          // Custom House Tower — the distinctive clock tower
          "L 455,380",
          "L 458,250 L 462,245 L 462,210 L 465,205",
          // Clock section (wider on top of narrow tower)
          "L 460,205 L 458,185 L 462,178 L 470,175 L 478,175 L 482,178 L 484,185 L 482,205",
          // Spire
          "L 478,205 L 475,195 L 473,170 L 471,160 L 470,155 L 469,160 L 467,170 L 465,195",
          "L 462,205",
          "L 480,205 L 480,210 L 478,245 L 482,250 L 485,380",
          // More financial district towers
          "L 498,375 L 502,255 L 510,248 L 522,244 L 530,250 L 535,260 L 538,375",
          // Tall narrow tower
          "L 548,370 L 552,230 L 558,222 L 568,218 L 578,222 L 585,228 L 590,240 L 592,370",
          // Descending cluster
          "L 608,368 L 612,270 L 622,262 L 638,258 L 650,264 L 658,268 L 665,275 L 668,368",
          // Medium buildings
          "L 682,365 L 688,300 L 698,295 L 712,292 L 725,298 L 735,305 L 740,365",
          // Lower buildings — North End / waterfront
          "L 758,362 L 762,325 L 772,318 L 788,315 L 800,320 L 810,328 L 815,340 L 825,338 L 830,362",
          // Trailing low structures
          "L 845,360 L 850,350 L 865,345 L 878,348 L 885,355 L 890,360",
          "L 910,358 L 915,370 L 935,368 L 945,375 L 960,380 L 980,385 L 1000,390",
          "L 1000,500 Z",
        ].join(" ")}
        fill="#3B4252"
        className="harbor-skyline-fill"
      />

      {/* Edge lighting for dawn/evening */}
      <path
        d={[
          "M 0,500",
          "L 0,420",
          "L 40,418 L 45,400 L 55,400 L 60,415",
          "L 80,412 L 85,390 L 100,388 L 105,410",
          "L 120,408 L 125,370 L 140,365 L 155,368 L 160,375 L 175,372 L 180,405",
          "L 195,400 L 200,340 L 215,335 L 230,338 L 235,400",
          "L 250,395 L 255,310 L 270,305 L 285,308 L 295,300 L 305,303 L 310,395",
          "L 325,390 L 330,275 L 340,268 L 355,265 L 365,270 L 375,272 L 380,390",
          "L 390,385 L 395,240 L 405,232 L 418,228 L 430,235 L 438,240 L 440,385",
          "L 455,380",
          "L 458,250 L 462,245 L 462,210 L 465,205",
          "L 460,205 L 458,185 L 462,178 L 470,175 L 478,175 L 482,178 L 484,185 L 482,205",
          "L 478,205 L 475,195 L 473,170 L 471,160 L 470,155 L 469,160 L 467,170 L 465,195",
          "L 462,205",
          "L 480,205 L 480,210 L 478,245 L 482,250 L 485,380",
          "L 498,375 L 502,255 L 510,248 L 522,244 L 530,250 L 535,260 L 538,375",
          "L 548,370 L 552,230 L 558,222 L 568,218 L 578,222 L 585,228 L 590,240 L 592,370",
          "L 608,368 L 612,270 L 622,262 L 638,258 L 650,264 L 658,268 L 665,275 L 668,368",
          "L 682,365 L 688,300 L 698,295 L 712,292 L 725,298 L 735,305 L 740,365",
          "L 758,362 L 762,325 L 772,318 L 788,315 L 800,320 L 810,328 L 815,340 L 825,338 L 830,362",
          "L 845,360 L 850,350 L 865,345 L 878,348 L 885,355 L 890,360",
          "L 910,358 L 915,370 L 935,368 L 945,375 L 960,380 L 980,385 L 1000,390",
          "L 1000,500 Z",
        ].join(" ")}
        fill="url(#skyline-edge-light)"
        className="harbor-skyline-edge"
      />

      {/* Window lights — visible at night/evening */}
      {isNight && (
        <g className="harbor-window-lights">
          {windows.map((w, i) => (
            <rect
              key={i}
              x={w.x}
              y={w.y}
              width={3}
              height={4}
              rx={0.5}
              fill="#EBCB8B"
              opacity={seededRandom(i + 100) * 0.5 + 0.3}
            />
          ))}
        </g>
      )}
    </svg>
  );
}
