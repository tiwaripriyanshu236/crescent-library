import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    function onScroll() { setShow(window.scrollY > 600); }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 left-6 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/90 shadow-card backdrop-blur transition hover:scale-105"
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}
