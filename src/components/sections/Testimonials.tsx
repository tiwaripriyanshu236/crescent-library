import { useEffect, useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

const TESTIMONIALS = [
  {
    name: "Aarav Sharma",
    college: "Dr. Hari Singh Gour University",
    rating: 5,
    text: "The most peaceful library in Sagar. I cleared my SSC prelims studying here every day. The discipline keeps me focused.",
  },
  {
    name: "Priya Verma",
    college: "Govt. Excellence College",
    rating: 5,
    text: "Comfortable seating, fast WiFi, and zero noise. Crescent Library is my second home during exam season.",
  },
  {
    name: "Rahul Patel",
    college: "NEET Aspirant",
    rating: 5,
    text: "Air conditioned cabins and clean washrooms make all the difference. Best investment for serious students.",
  },
  {
    name: "Sneha Tiwari",
    college: "Govt. Polytechnic Sagar",
    rating: 5,
    text: "Affordable monthly plan and a genuinely silent study atmosphere. Highly recommended.",
  },
  {
    name: "Vikram Singh",
    college: "UPSC Aspirant",
    rating: 5,
    text: "I prepare 10+ hours a day here. Staff is helpful and the environment is unmatched in Moti Nagar.",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(t);
  }, []);

  const current = TESTIMONIALS[i];

  return (
    <section id="testimonials" className="section-y bg-surface">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold md:text-5xl">
            Loved by <span className="text-gradient">serious students</span>
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Real reviews from students preparing for SSC, NEET, UPSC, and university exams.
          </p>
        </Reveal>

        <Reveal>
          <div className="relative mx-auto mt-12 max-w-3xl">
            <div className="relative rounded-3xl border border-border bg-card p-8 shadow-card md:p-12">
              <Quote className="absolute -top-5 left-8 h-10 w-10 rounded-xl gradient-primary p-2 text-primary-foreground shadow-glow" />
              <div className="flex items-center gap-1 text-primary">
                {Array.from({ length: current.rating }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 font-display text-xl leading-relaxed md:text-2xl">
                "{current.text}"
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full gradient-primary font-display text-base font-semibold text-primary-foreground">
                  {current.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="font-semibold">{current.name}</div>
                  <div className="text-sm text-muted-foreground">{current.college}</div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                aria-label="Previous"
                onClick={() => setI((v) => (v - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card hover:bg-accent"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-1.5">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    aria-label={`Go to review ${idx + 1}`}
                    onClick={() => setI(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === i ? "w-6 gradient-primary" : "w-1.5 bg-border"
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                aria-label="Next"
                onClick={() => setI((v) => (v + 1) % TESTIMONIALS.length)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card hover:bg-accent"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
