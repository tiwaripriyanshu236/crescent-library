import { useEffect, useState } from "react";
import { Menu, X, BookOpen } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/site";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar({ onBookClick }: { onBookClick: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/60 bg-background/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-display font-semibold">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg gradient-primary text-primary-foreground shadow-glow">
            <BookOpen className="h-4 w-4" />
          </span>
          <span className="text-base">{SITE.name}</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-accent hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={onBookClick}
            className="hidden h-9 rounded-full gradient-primary px-5 text-sm font-medium text-primary-foreground shadow-glow transition hover:opacity-95 md:inline-flex md:items-center"
          >
            Book a Seat
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden">
          <div className="container-x mt-2 rounded-2xl border border-border bg-card/95 p-3 shadow-card backdrop-blur-xl">
            <div className="grid gap-1">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm hover:bg-accent"
                >
                  {l.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onBookClick();
                }}
                className="mt-1 inline-flex h-10 items-center justify-center rounded-xl gradient-primary text-sm font-medium text-primary-foreground"
              >
                Book a Seat
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
