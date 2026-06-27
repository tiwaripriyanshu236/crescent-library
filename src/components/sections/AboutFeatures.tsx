import {
  Wifi, Wind, BatteryCharging, Lock, Camera, Armchair, VolumeX, Droplets,
  DoorClosed, Clock, ClipboardCheck, Sparkles, Brush, Lightbulb,
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

const ABOUT = [
  "Silent Environment", "Individual Study Desks", "Comfortable Seating",
  "Fully Air Conditioned", "Disciplined Atmosphere", "Free High-Speed WiFi",
  "Drinking Water", "Power Backup", "Reading Lights", "Spotless Washrooms",
];

const FEATURES = [
  { icon: Wind, title: "Air Conditioned", desc: "Climate-controlled hall all year." },
  { icon: Wifi, title: "High-speed WiFi", desc: "Unlimited browsing & video lectures." },
  { icon: BatteryCharging, title: "Charging Points", desc: "At every desk, every seat." },
  { icon: Lock, title: "Locker Facility", desc: "Secure storage for your essentials." },
  { icon: Camera, title: "CCTV Security", desc: "Monitored 24×7 for your safety." },
  { icon: Armchair, title: "Comfortable Chairs", desc: "Ergonomic seating for long hours." },
  { icon: VolumeX, title: "Pin-drop Silence", desc: "Strict noise-free policy." },
  { icon: Droplets, title: "RO Drinking Water", desc: "Filtered, fresh, always available." },
  { icon: DoorClosed, title: "Private Cabins", desc: "Optional separate study booths." },
  { icon: Clock, title: "Extended Hours", desc: "6 AM – 11 PM, every single day." },
  { icon: ClipboardCheck, title: "Attendance Tracking", desc: "Discipline that builds streaks." },
  { icon: Brush, title: "Daily Cleaning", desc: "Hygienic environment, always." },
];

export function AboutFeatures() {
  return (
    <section id="about" className="section-y relative">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> About the Library
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            Built for students who are <span className="text-gradient">serious</span> about their goals.
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Every detail at Crescent Library — from the lighting to the seating, the
            silence to the airflow — is tuned for deep, distraction-free work.
          </p>
        </Reveal>

        {/* About chips */}
        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2">
            {ABOUT.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Features grid */}
        <div id="features" className="mt-20 scroll-mt-24">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h3 className="font-display text-3xl font-bold md:text-4xl">Premium facilities</h3>
            <p className="mt-3 text-muted-foreground">
              Everything a focused student needs, nothing they don't.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.04}>
                <div className="group h-full rounded-2xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-1 hover:shadow-elegant">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl gradient-primary text-primary-foreground shadow-glow">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h4 className="mt-4 font-display text-base font-semibold">{f.title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      <Lightbulb className="sr-only" />
    </section>
  );
}
