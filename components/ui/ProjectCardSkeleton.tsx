export function ProjectCardSkeleton() {
  return (
    <div
      className="flex flex-col rounded-xl border p-6"
      style={{
        borderColor:
          "color-mix(in srgb, var(--text-secondary) 20%, transparent)",
        backgroundColor: "var(--bg-secondary)",
      }}
    >
      <div
        className="h-5 w-3/4 rounded shimmer"
        style={{ backgroundColor: "var(--bg-primary)" }}
      />
      <div className="mt-3 space-y-2 flex-1">
        <div
          className="h-4 w-full rounded shimmer"
          style={{
            backgroundColor: "var(--bg-primary)",
            animationDelay: "0.15s",
          }}
        />
        <div
          className="h-4 w-2/3 rounded shimmer"
          style={{
            backgroundColor: "var(--bg-primary)",
            animationDelay: "0.3s",
          }}
        />
      </div>
      <div className="mt-4 flex items-center gap-4">
        <div
          className="h-3 w-16 rounded shimmer"
          style={{
            backgroundColor: "var(--bg-primary)",
            animationDelay: "0.45s",
          }}
        />
        <div
          className="h-3 w-20 rounded shimmer"
          style={{
            backgroundColor: "var(--bg-primary)",
            animationDelay: "0.6s",
          }}
        />
      </div>
    </div>
  );
}

export function ProjectGridSkeleton() {
  return (
    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }, (_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </div>
  );
}
