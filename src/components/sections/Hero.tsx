import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-library.jpg";
import { Counter } from "@/components/site/Counter";

export function Hero({ onBookClick }: { onBookClick: () => void }) {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-28 md:pt-36">
      {/* background */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImg}
          alt="Premium study library interior"
          width={1920}
          height={1280}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-background/40 dark:bg-background/70" />
        <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-b from-transparent to-background" />
      </div>
      <div className="absolute inset-0 -z-10 glow" />

      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Now open in Moti Nagar, Sagar
          </span>

          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            <span className="block">Focus.</span>
            <span className="block">Study.</span>
            <span className="block text-gradient">Succeed.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            A peaceful and disciplined environment designed for serious students.
            Premium seating, silent zones, and round-the-clock comfort.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onBookClick}
              className="group inline-flex h-12 items-center gap-2 rounded-full gradient-primary px-7 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-95"
            >
              Book a Seat
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </button>
            <a
              href="#pricing"
              className="inline-flex h-12 items-center rounded-full border border-border bg-card/70 px-7 text-sm font-semibold backdrop-blur transition hover:bg-card"
            >
              View Plans
            </a>
            <a
              href="#about"
              className="inline-flex h-12 items-center rounded-full px-5 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Join Now →
            </a>
          </div>
        </motion.div>

        {/* floating stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-3 md:mt-24 md:grid-cols-4"
        >
          {[
            { v: 500, suffix: "+", l: "Students" },
            { v: 120, suffix: "", l: "Premium Seats" },
            { v: 98, suffix: "%", l: "Satisfaction" },
            { v: 7, suffix: "+", l: "Years of trust" },
          ].map((s) => (
            <div
              key={s.l}
              className="glass rounded-2xl px-5 py-4 text-center shadow-card"
            >
              <div className="font-display text-2xl font-bold md:text-3xl">
                <Counter to={s.v} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-xs text-muted-foreground md:text-sm">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
