import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { Hero } from "@/components/sections/Hero";
import { AboutFeatures } from "@/components/sections/AboutFeatures";
import { Gallery } from "@/components/sections/Gallery";
import { Pricing } from "@/components/sections/Pricing";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { BackToTop } from "@/components/site/BackToTop";
import { BookingDialog } from "@/components/site/BookingDialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Crescent Library — Premium Study Library in Moti Nagar, Sagar" },
      {
        name: "description",
        content:
          "Crescent Library is a peaceful, AC, premium study library in Moti Nagar, Sagar (MP) — silent zones, high-speed WiFi, comfortable seating, lockers, and 6 AM–11 PM access. Book your seat today.",
      },
      { property: "og:title", content: "Crescent Library — Focus. Study. Succeed." },
      {
        property: "og:description",
        content: "A premium study library for serious students in Sagar, MP. Daily, weekly, and monthly plans available.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Crescent Library",
          description: "Premium study library for serious students.",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Moti Nagar",
            addressLocality: "Sagar",
            addressRegion: "Madhya Pradesh",
            postalCode: "470002",
            addressCountry: "IN",
          },
          openingHours: "Mo-Su 06:00-23:00",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [initialPlan, setInitialPlan] = useState<"daily" | "weekly" | "monthly" | undefined>();

  function openBooking(plan?: "daily" | "weekly" | "monthly") {
    setInitialPlan(plan);
    setBookingOpen(true);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <Navbar onBookClick={() => openBooking()} />

      <main>
        <Hero onBookClick={() => openBooking()} />
        <AboutFeatures />
        <Gallery />
        <Pricing onPlanSelect={openBooking} />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
      <BookingDialog
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialPlan={initialPlan}
      />
    </div>
  );
}
