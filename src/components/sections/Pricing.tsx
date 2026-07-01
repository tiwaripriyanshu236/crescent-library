
import { Check, Sparkles } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

type Plan = {
  slug: "daily" | "weekly" | "monthly";
  name: string;
  price: number;
  unit: string;
  description?: string;
  features: string[];
  highlight?: boolean;
};
 const PLANS: Plan[] = [
  {
    slug: "daily",
    name: "Hourly Pass",
    price: 100,
    unit: "/hour",
    description:
      "Flexible plan. Pay ₹100 for each study hour. Example: 3 hours = ₹300. Charges are based only on the total hours you use.",
    features: [
      "₹100 per study hour",
      "Example: 3 Hours = ₹300",
      "Choose any number of hours",
      "Unlimited WiFi",
      "Silent Study Zone",
      "Comfortable Seating",
      "Charging Point",
      "Clean Drinking Water",
    ],
  },

  {
    slug: "monthly",
    name: "Monthly Pass",
    price: 1500,
    unit: "/month",
    features: [
      "Everything in Weekly",
      "Reserved Desk",
      "Locker Access",
      "Priority Support",
      "Best Value for Aspirants",
    ],
    highlight: true,
  },
  {
    slug: "weekly",
    name: "Weekly Pass",
    price: 500,
    unit: "/week",
    features: [
      "Unlimited WiFi",
      "Silent Zone",
      "Reserved Desk",
      "Charging Point",
      "Water Facility",
    ],
  },
];

export function Pricing({
  onPlanSelect,
}: {
  onPlanSelect: (slug: Plan["slug"]) => void;
}) {
  return (
    <section id="pricing" className="section-y">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold md:text-5xl">
            Simple, honest <span className="text-gradient">pricing</span>
          </h2>

          <p className="mt-4 text-muted-foreground md:text-lg">
            Pay-as-you-go or commit and save. No hidden fees, ever.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PLANS.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <div
                className={`relative flex h-full flex-col rounded-3xl border p-7 transition ${
                  p.highlight
                    ? "border-transparent bg-card shadow-glow md:-translate-y-3 md:scale-[1.02]"
                    : "border-border bg-card shadow-card hover:shadow-elegant"
                }`}
              >
                {p.highlight && (
                  <>
                    <div className="absolute -inset-px -z-10 rounded-3xl gradient-primary opacity-30 blur-xl" />

                    <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full gradient-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow-glow">
                      <Sparkles className="h-3 w-3" />
                      Most Popular
                    </span>
                  </>
                )}

                <div className="font-display text-lg font-semibold">
                  {p.name}
                </div>

                <div className="mt-2 flex items-baseline gap-1">
                  <span className="font-display text-5xl font-bold tracking-tight">
                    ₹{p.price}
                  </span>

                  <span className="text-sm text-muted-foreground">
                    {p.unit}
                  </span>
                </div>

                {/* Description */}
                {p.description && (
                  <p className="mt-3 text-sm text-muted-foreground">
                    {p.description}
                  </p>
                )}

                <ul className="mt-6 flex-1 space-y-3 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full gradient-primary text-primary-foreground">
                        <Check className="h-3 w-3" />
                      </span>

                      <span className="text-foreground/80">{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => onPlanSelect(p.slug)}
                  className={`mt-7 inline-flex h-11 w-full items-center justify-center rounded-full text-sm font-semibold transition ${
                    p.highlight
                      ? "gradient-primary text-primary-foreground shadow-glow hover:opacity-95"
                      : "border border-border bg-background hover:bg-accent"
                  }`}
                >
                  Choose {p.name.split(" ")[0]}
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}