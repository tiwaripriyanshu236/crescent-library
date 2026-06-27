import { BookOpen, Instagram, Facebook, MessageCircle } from "lucide-react";
import { SITE, NAV_LINKS } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-display text-lg font-semibold">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg gradient-primary text-primary-foreground shadow-glow">
                <BookOpen className="h-4 w-4" />
              </span>
              {SITE.name}
            </div>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              A premium study library in Moti Nagar, Sagar — where serious students focus, study, and succeed.
            </p>
            <div className="mt-5 flex gap-2">
              <SocialBtn href={SITE.social.instagram} label="Instagram"><Instagram className="h-4 w-4" /></SocialBtn>
              <SocialBtn href={SITE.social.facebook} label="Facebook"><Facebook className="h-4 w-4" /></SocialBtn>
              <SocialBtn href={SITE.social.whatsapp} label="WhatsApp"><MessageCircle className="h-4 w-4" /></SocialBtn>
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold">Explore</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-foreground">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold">Visit</h4>
            <p className="mt-3 text-sm text-muted-foreground">
              {SITE.address.line1}<br />
              {SITE.address.city}, {SITE.address.state} {SITE.address.pincode}<br />
              <span className="mt-2 inline-block">{SITE.contact.hours}</span>
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialBtn({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition hover:bg-accent hover:text-foreground"
    >
      {children}
    </a>
  );
}
