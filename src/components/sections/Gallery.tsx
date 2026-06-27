import { useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
import { X } from "lucide-react";

const IMAGES = [
  { src: g1, cat: "Study Hall", h: "row-span-2" },
  { src: g2, cat: "Cabins", h: "" },
  { src: g3, cat: "Reception", h: "" },
  { src: g4, cat: "Night Study", h: "row-span-2" },
  { src: g5, cat: "Library View", h: "" },
  { src: g6, cat: "Facilities", h: "" },
];

export function Gallery() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="gallery" className="section-y bg-surface">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold md:text-5xl">
            A glimpse of the <span className="text-gradient">space</span>
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Take a look around. Click any photo to view full size.
          </p>
        </Reveal>

        <div className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-3 md:grid-cols-3 md:auto-rows-[220px] md:gap-4">
          {IMAGES.map((img, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <button
                type="button"
                onClick={() => setActive(img.src)}
                className={`group relative h-full w-full overflow-hidden rounded-2xl shadow-card ${img.h}`}
              >
                <img
                  src={img.src}
                  alt={img.cat}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent opacity-80 transition group-hover:opacity-100" />
                <span className="absolute bottom-3 left-4 text-sm font-medium text-white">
                  {img.cat}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[80] grid place-items-center bg-black/90 p-4 animate-[fade-in_0.2s_ease-out]"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur"
            onClick={() => setActive(null)}
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={active}
            alt=""
            className="max-h-[88vh] w-auto max-w-[92vw] rounded-2xl shadow-elegant"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
