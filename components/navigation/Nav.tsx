"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MotionToggle } from "@/components/ui/MotionToggle";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { useTimeTheme } from "@/app/providers/TimeThemeProvider";
import { getMotionTransition } from "@/lib/animations";

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#interests", label: "Interests" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { phase, reducedMotion } = useTimeTheme();
  const transition = getMotionTransition(phase);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = useCallback(() => {
    setMenuOpen(false);
  }, []);

  return (
    <>
      <ScrollProgress />
      <nav
        className="fixed top-0 right-0 left-0 z-50 transition-shadow duration-200"
        style={{
          backgroundColor: scrolled ? "var(--bg-primary)" : "transparent",
          boxShadow: scrolled
            ? "0 1px 3px color-mix(in srgb, var(--text-primary) 10%, transparent)"
            : "none",
        }}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a
            href="#hero"
            className="font-serif text-lg font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            LI
          </a>

          <div className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-opacity hover:opacity-70"
                style={{ color: "var(--text-secondary)" }}
              >
                {link.label}
              </a>
            ))}
            <ThemeToggle />
            <MotionToggle />
          </div>

          <button
            className="flex flex-col gap-1.5 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span
              className="block h-0.5 w-6 transition-transform duration-200"
              style={{
                backgroundColor: "var(--text-primary)",
                transform: menuOpen
                  ? "rotate(45deg) translate(3px, 3px)"
                  : "none",
              }}
            />
            <span
              className="block h-0.5 w-6 transition-opacity duration-200"
              style={{
                backgroundColor: "var(--text-primary)",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block h-0.5 w-6 transition-transform duration-200"
              style={{
                backgroundColor: "var(--text-primary)",
                transform: menuOpen
                  ? "rotate(-45deg) translate(3px, -3px)"
                  : "none",
              }}
            />
          </button>
        </div>

        <AnimatePresence>
          {menuOpen &&
            (reducedMotion ? (
              <div
                className="flex flex-col gap-4 px-6 pb-6 md:hidden"
                style={{ backgroundColor: "var(--bg-primary)" }}
              >
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={handleNavClick}
                    className="text-base font-medium"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {link.label}
                  </a>
                ))}
                <div className="flex items-center gap-4 pt-2">
                  <ThemeToggle />
                  <MotionToggle />
                </div>
              </div>
            ) : (
              <motion.div
                key="mobile-menu"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  duration: transition.duration * 0.6,
                  ease: transition.ease,
                }}
                className="overflow-hidden md:hidden"
                style={{ backgroundColor: "var(--bg-primary)" }}
              >
                <div className="flex flex-col gap-4 px-6 pb-6">
                  {links.map((link, i) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={handleNavClick}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{
                        delay: i * 0.05,
                        duration: transition.duration * 0.5,
                        ease: transition.ease,
                      }}
                      className="text-base font-medium"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {link.label}
                    </motion.a>
                  ))}
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: links.length * 0.05,
                      duration: transition.duration * 0.5,
                      ease: transition.ease,
                    }}
                    className="flex items-center gap-4 pt-2"
                  >
                    <ThemeToggle />
                    <MotionToggle />
                  </motion.div>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </nav>
    </>
  );
}
