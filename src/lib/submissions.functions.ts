import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  message: z.string().trim().min(5).max(2000),
});

const bookingSchema = z.object({
  guest_name: z.string().trim().min(2).max(100),
  guest_email: z.string().trim().email().max(255).optional().or(z.literal("")),
  guest_phone: z.string().trim().min(7).max(20),
  plan_slug: z.enum(["daily", "weekly", "monthly"]),
  preferred_seat: z.string().trim().max(20).optional().or(z.literal("")),
  start_date: z.string().optional().or(z.literal("")),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
});

async function getServerClient() {
  const { createClient } = await import("@supabase/supabase-js");

  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    {
      auth: {
        storage: undefined,
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const supabase = await getServerClient();

    const { error } = await supabase.from("contact_submissions").insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      message: data.message,
    });

    if (error) throw new Error(error.message);

    return { ok: true };
  });

const PRICE: Record<string, number> = {
  daily: 50,
  weekly: 350,
  monthly: 1500,
};

export const submitBooking = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => bookingSchema.parse(data))
  .handler(async ({ data }) => {
    const supabase = await getServerClient();

    // Save booking
    const { error } = await supabase.from("bookings").insert({
      guest_name: data.guest_name,
      guest_email: data.guest_email || null,
      guest_phone: data.guest_phone,
      plan_slug: data.plan_slug,
      preferred_seat: data.preferred_seat || null,
      start_date: data.start_date || null,
      notes: data.notes || null,
      amount_inr: PRICE[data.plan_slug],
      status: "pending",
    });

    if (error) {
      throw new Error(error.message);
    }

    // Send email to Admin
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "tiwaripriyanshu236@gmail.com",
      subject: "📚 New Booking - Crescent Library",
      html: `
        <h2>New Library Booking</h2>

        <p><strong>Name:</strong> ${data.guest_name}</p>
        <p><strong>Phone:</strong> ${data.guest_phone}</p>
        <p><strong>Email:</strong> ${data.guest_email || "Not Provided"}</p>
        <p><strong>Plan:</strong> ${data.plan_slug}</p>
        <p><strong>Amount:</strong> ₹${PRICE[data.plan_slug]}</p>
        <p><strong>Preferred Seat:</strong> ${data.preferred_seat || "N/A"}</p>
        <p><strong>Start Date:</strong> ${data.start_date || "N/A"}</p>
        <p><strong>Notes:</strong> ${data.notes || "N/A"}</p>

        <hr>

        <p>This booking was submitted from Crescent Library website.</p>
      `,
    });

    return {
      ok: true,
    };
  });