"use client";

interface BoatsSVGProps {
  reducedMotion: boolean;
}

export function BoatsSVG({ reducedMotion }: BoatsSVGProps) {
  return (
    <svg
      viewBox="0 0 1000 200"
      preserveAspectRatio="xMidYMax slice"
      className="harbor-boats-layer"
      aria-hidden="true"
    >
      {/* Sailboat — larger, drifts left to right */}
      <g className={reducedMotion ? undefined : "harbor-boat harbor-boat-1"}>
        {/* Hull */}
        <path
          d="M 0,95 Q 10,105 30,105 L 50,105 Q 60,105 55,95 Z"
          fill="#434C5E"
        />
        {/* Mast */}
        <line
          x1="25"
          y1="95"
          x2="25"
          y2="55"
          stroke="#4C566A"
          strokeWidth="1.5"
        />
        {/* Sail */}
        <path d="M 26,58 L 26,90 L 45,85 Z" fill="#D8DEE9" opacity="0.5" />
        <path d="M 24,60 L 24,88 L 10,82 Z" fill="#D8DEE9" opacity="0.35" />
      </g>

      {/* Motorboat — smaller, drifts right to left */}
      <g className={reducedMotion ? undefined : "harbor-boat harbor-boat-2"}>
        {/* Hull */}
        <path
          d="M 0,120 Q 5,130 20,130 L 35,130 Q 42,130 38,120 Z"
          fill="#434C5E"
        />
        {/* Cabin */}
        <rect x="12" y="114" width="12" height="6" rx="1" fill="#4C566A" />
      </g>

      {/* Small sailboat — far back, slowest */}
      <g className={reducedMotion ? undefined : "harbor-boat harbor-boat-3"}>
        {/* Hull */}
        <path d="M 0,80 Q 5,87 15,87 L 28,87 Q 33,87 30,80 Z" fill="#434C5E" />
        {/* Mast */}
        <line
          x1="14"
          y1="80"
          x2="14"
          y2="58"
          stroke="#4C566A"
          strokeWidth="1"
        />
        {/* Sail */}
        <path d="M 15,60 L 15,78 L 26,74 Z" fill="#D8DEE9" opacity="0.4" />
      </g>
    </svg>
  );
}
