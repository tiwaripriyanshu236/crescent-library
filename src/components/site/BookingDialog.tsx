



import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { X, Loader2, Calendar } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { submitBooking } from "@/lib/submissions.functions";

type Plan = "daily" | "weekly" | "monthly";
type FormValues = {
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  plan_slug: Plan;
  preferred_seat: string;
  start_date: string;
  notes: string;
};

const PRICE: Record<Plan, number> = { daily: 50, weekly: 350, monthly: 1500 };

export function BookingDialog({
  open, onClose, initialPlan,
}: { open: boolean; onClose: () => void; initialPlan?: Plan }) {
  const submit = useServerFn(submitBooking);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<FormValues>({
    defaultValues: { plan_slug: initialPlan ?? "monthly" },
    values: initialPlan ? { plan_slug: initialPlan } as FormValues : undefined,
  });

  const plan = watch("plan_slug");

  async function onSubmit(values: FormValues) {
    setLoading(true);
    try {
      await submit({ data: values });
      toast.success("Booking received! We'll confirm by call or WhatsApp shortly.");
      reset();
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not submit booking.");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[90] grid place-items-center bg-black/60 p-4 backdrop-blur-sm animate-[fade-in_0.2s_ease-out]"
      onClick={onClose}
    >
      <div
       
  className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border border-border bg-card p-6 shadow-elegant md:p-8 animate-[scale-in_0.25s_ease-out]"
  onClick={(e) => e.stopPropagation()}

      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-accent"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-5">
          <h3 className="font-display text-2xl font-bold">Book your seat</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            We confirm bookings manually. Pay at reception or via UPI after approval.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3  pb-4" noValidate>
          <div className="grid grid-cols-3 gap-2">
            {(["daily", "weekly", "monthly"] as Plan[]).map((p) => (
              <label key={p} className="cursor-pointer">
                <input type="radio" value={p} {...register("plan_slug", { required: true })} className="peer sr-only" />
                <div className="rounded-xl border border-border bg-background p-3 text-center text-xs transition peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:shadow-glow">
                  <div className="font-display text-sm font-semibold capitalize">{p}</div>
                  <div className="mt-0.5 text-muted-foreground">₹{PRICE[p]}</div>
                </div>
              </label>
            ))}
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <Input label="Full name" error={errors.guest_name?.message}>
              <input
                {...register("guest_name", { required: "Required", minLength: { value: 2, message: "Too short" } })}
                className="bk-input"
                placeholder="Your name"
              />
            </Input>
            <Input label="Phone" error={errors.guest_phone?.message}>
              <input
                {...register("guest_phone", { required: "Required", minLength: { value: 7, message: "Invalid" } })}
                className="bk-input"
                placeholder="+91 9XXXXXXXXX"
              />
            </Input>
          </div>

          <Input label="Email (optional)">
            <input type="email" {...register("guest_email")} className="bk-input" placeholder="you@example.com" />
          </Input>

          <div className="grid gap-3 md:grid-cols-2">
            <Input label="Preferred seat">
              <input {...register("preferred_seat")} className="bk-input" placeholder="e.g. A-12" />
            </Input>
            <Input label="Start date">
              <div className="relative">
                <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input type="date" {...register("start_date")} className="bk-input pl-9" />
              </div>
            </Input>
          </div>

          <Input label="Notes (optional)">
            <textarea
              rows={2}
              {...register("notes")}
              className="bk-input resize-none"
              placeholder="Anything we should know?"
            />
          </Input>

          <div className="flex items-center justify-between rounded-xl bg-surface px-4 py-3 text-sm">
            <span className="text-muted-foreground">Total</span>
            <span className="font-display text-xl font-bold">₹{PRICE[plan ?? "monthly"]}</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full gradient-primary text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-95 disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Submitting…" : "Request Booking"}
          </button>
        </form>

        <style>{`
          .bk-input {
            width: 100%;
            border-radius: 0.75rem;
            border: 1px solid var(--color-border);
            background: var(--color-background);
            padding: 0.6rem 0.8rem;
            font-size: 0.875rem;
            outline: none;
            transition: border-color 0.15s, box-shadow 0.15s;
          }
          .bk-input:focus {
            border-color: var(--color-primary);
            box-shadow: 0 0 0 3px oklch(0.55 0.22 264 / 0.15);
          }
        `}</style>
      </div>
    </div>
  );
}

function Input({
  label, error, children,
}: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 inline-block text-xs font-medium text-muted-foreground">{label}</span>
      {children}
      {error && <span className="mt-0.5 inline-block text-xs text-destructive">{error}</span>}
    </label>
  );
}
