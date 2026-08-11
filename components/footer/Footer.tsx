const socialLinks = [
  { name: "GitHub", url: "https://github.com/lukeinglis" },
  { name: "LinkedIn", url: "https://linkedin.com/in/lukeinglis" },
];

export function Footer() {
  return (
    <footer
      className="border-t px-6 py-8"
      style={{
        borderColor:
          "color-mix(in srgb, var(--text-secondary) 20%, transparent)",
      }}
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          &copy; {new Date().getFullYear()} Luke Inglis
        </p>
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm transition-opacity hover:opacity-70"
              style={{ color: "var(--text-secondary)" }}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
