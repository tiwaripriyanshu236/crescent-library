import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

const FAQS = [
  { q: "What are the opening hours?", a: "Crescent Library is open every day from 6:00 AM to 11:00 PM. Monthly members can request extended access." },
  { q: "How does membership work?", a: "Pick Daily, Weekly, or Monthly. Pay online or at the reception, get your seat assignment, and start studying the same day." },
  { q: "Are there any rules I should know?", a: "Strict silence in all study halls, no food at desks, no phone calls inside — small habits that protect everyone's focus." },
  { q: "Is WiFi really unlimited?", a: "Yes. Free high-speed WiFi for every member with backup connectivity to keep your video lectures uninterrupted." },
  { q: "What is the refund policy?", a: "Daily passes are non-refundable. Weekly and Monthly are refundable within 24 hours of purchase if you haven't visited the library." },
  { q: "How secure is the space?", a: "CCTV monitored 24×7, locker facility for valuables, and trained reception staff during all open hours." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="section-y">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold md:text-5xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Quick answers about hours, membership, refunds, and more.
          </p>
        </Reveal>

        <Reveal>
          <div className="mx-auto mt-12 max-w-3xl divide-y divide-border overflow-hidden rounded-3xl border border-border bg-card shadow-card">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-accent/50"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-base font-semibold md:text-lg">{f.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground md:text-base">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
