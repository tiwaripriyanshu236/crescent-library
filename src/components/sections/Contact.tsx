

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Clock, Send, Loader2 } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { submitContact } from "@/lib/submissions.functions";
import { Reveal } from "@/components/site/Reveal";
import { SITE } from "@/lib/site";

type FormValues = { name: string; email: string; phone: string; message: string };

export function Contact() {
  const submit = useServerFn(submitContact);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();

  async function onSubmit(values: FormValues) {
    setLoading(true);
    try {
      await submit({ data: values });
      toast.success("Message sent! We'll get back to you within a day.");
      reset();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="section-y bg-surface">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold md:text-5xl">
            Come <span className="text-gradient">visit us</span>
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Drop by Moti Nagar or send a message — we respond fast.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          {/* Info + Map */}
          <Reveal className="lg:col-span-2">
            <div className="space-y-4">
              <InfoRow icon={MapPin} title="Address">
                {SITE.address.line1}, {SITE.address.city}, {SITE.address.state}{" "}
                {SITE.address.pincode}
              </InfoRow>
              <InfoRow icon={Phone} title="Phone">{SITE.contact.phone}</InfoRow>
              <InfoRow icon={Mail} title="Email">{SITE.contact.email}</InfoRow>
              <InfoRow icon={Clock} title="Hours">{SITE.contact.hours}</InfoRow>

              <div className="overflow-hidden rounded-2xl border border-border shadow-card">
                <iframe
                  title="Crescent Library Location"
                  src={SITE.mapEmbed}
                  loading="lazy"
                  className="h-64 w-full"
                />
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal className="lg:col-span-3" delay={0.1}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-3xl border border-border bg-card p-6 shadow-card md:p-8"
              noValidate
            >
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Name" error={errors.name?.message}>
                  <input
                    {...register("name", { required: "Required", minLength: { value: 2, message: "Too short" } })}
                    className="input"
                    placeholder="Your full name"
                  />
                </Field>
                <Field label="Phone" error={errors.phone?.message}>
                  <input
                    {...register("phone")}
                    className="input"
                    placeholder="+91 9XXXXXXXXX"
                  />
                </Field>
              </div>
              <Field label="Email" error={errors.email?.message}>
                <input
                  type="email"
                  {...register("email", {
                    required: "Required",
                    pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
                  })}
                  className="input"
                  placeholder="you@example.com"
                />
              </Field>
              <Field label="Message" error={errors.message?.message}>
                <textarea
                  rows={5}
                  {...register("message", { required: "Required", minLength: { value: 5, message: "Too short" } })}
                  className="input resize-none"
                  placeholder="Tell us what you need — plan, timing, anything."
                />
              </Field>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full gradient-primary text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-95 disabled:opacity-60"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                {loading ? "Sending…" : "Visit Today"}
              </button>
            </form>
          </Reveal>
        </div>
      </div>

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.875rem;
          border: 1px solid var(--color-border);
          background: var(--color-background);
          padding: 0.7rem 0.9rem;
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .input:focus {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px oklch(0.55 0.22 264 / 0.15);
        }
      `}</style>
    </section>
  );
}

function InfoRow({
  icon: Icon, title, children,
}: { icon: React.ComponentType<{ className?: string }>; title: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-4 shadow-card">
      <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl gradient-primary text-primary-foreground shadow-glow">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</div>
        <div className="mt-0.5 text-sm font-medium">{children}</div>
      </div>
    </div>
  );
}

function Field({
  label, error, children,
}: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 inline-block text-xs font-medium text-muted-foreground">{label}</span>
      {children}
      {error && <span className="mt-1 inline-block text-xs text-destructive">{error}</span>}
    </label>
  );
}
