// Next.js: rename to app/about/page.tsx
// export const metadata = { title: 'About WordFlowAI — Our Story & Mission', description: '...' }
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";

const STATS_ABOUT = [
  { value: "2024", label: "Founded" },
  { value: "12", label: "Team Size", sub: "people" },
  { value: "40+", label: "Countries", sub: "with users" },
  { value: "8M+", label: "Content Created", sub: "words generated" },
];

const VALUES = [
  {
    emoji: "🎯",
    title: "Quality Over Quantity",
    desc: "We don't just generate words — we generate results. Every output is optimized for readability, SEO and real-world performance.",
  },
  {
    emoji: "🔒",
    title: "Privacy First",
    desc: "Your content is yours. We never train our AI on your data and we never share your work with third parties.",
  },
  {
    emoji: "🚀",
    title: "Built for Real Businesses",
    desc: "WordFlowAI is designed for people who need results, not just features. Every tool we build solves a real content problem.",
  },
];

const TEAM = [
  {
    name: "Muhammad Ibrahim",
    role: "CEO & Co-Founder",
    bio: "Ex-Google, obsessed with AI and content marketing",
    initials: "AC",
    color: "#6C63FF",
  },
  {
    name: "Aizaz Shahid",
    role: "CTO & Co-Founder",
    bio: "10 years building SaaS products that scale",
    initials: "SW",
    color: "#7C3AED",
  },
  {
    name: "Maqsood Ahmad",
    role: "Head of Product",
    bio: "Formerly at HubSpot, loves great user experiences",
    initials: "MJ",
    color: "#0891B2",
  },
  {
    name: "Faizan Latif",
    role: "Head of Growth",
    bio: "Helped 3 startups reach $1M ARR",
    initials: "PP",
    color: "#059669",
  },
];

export default function AboutPage() {
  return (
    <div style={{ background: "#fff", overflowX: "hidden" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section
        className="pt-36 pb-20 text-center"
        style={{ background: "#F5F4FF" }}
      >
        <div className="mx-auto max-w-[860px] px-6">
          <span
            className="mb-5 inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold"
            style={{
              background: "#E8E6FF",
              color: "#6C63FF",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Our Story
          </span>
          <h1
            className="mb-5 tracking-tight"
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2rem, 4vw, 3.4rem)",
              color: "#1C2033",
              lineHeight: 1.15,
            }}
          >
            We&apos;re Building the Future of{" "}
            <span style={{ color: "#6C63FF" }}>Content Creation</span>
          </h1>
          <p
            className="mx-auto max-w-xl text-base leading-relaxed"
            style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}
          >
            WordFlowAI was born from a simple frustration — creating quality
            content takes too long. We set out to fix that.
          </p>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="py-24" style={{ background: "#fff" }}>
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 lg:grid-cols-2 lg:items-center lg:px-12">
          {/* Left: text */}
          <div>
            <span
              className="mb-4 inline-block rounded-full px-4 py-1.5 text-sm font-semibold"
              style={{
                background: "#F0EFFF",
                color: "#6C63FF",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Our Mission
            </span>
            <h2
              className="mb-5 tracking-tight"
              style={{
                fontFamily: "Plus Jakarta Sans, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.7rem, 2.5vw, 2.2rem)",
                color: "#1C2033",
              }}
            >
              Our Mission
            </h2>
            <p
              className="mb-5 text-base leading-relaxed"
              style={{ color: "#6B7280", fontFamily: "Inter, sans-serif" }}
            >
              We believe every business, creator and entrepreneur deserves
              access to world-class content — without the world-class budget.
              WordFlowAI puts the power of AI writing in everyone&apos;s hands.
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ color: "#6B7280", fontFamily: "Inter, sans-serif" }}
            >
              We&apos;re a team of writers, engineers and marketers who got tired of
              watching great ideas die because nobody had time to write about
              them.
            </p>
          </div>

          {/* Right: stats card */}
          <div
            className="rounded-2xl p-8"
            style={{
              background: "#FAFBFF",
              border: "1.5px solid #E8E6FF",
              boxShadow: "0 8px 32px rgba(108,99,255,0.08)",
            }}
          >
            <div className="grid grid-cols-2 gap-5">
              {STATS_ABOUT.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl p-5"
                  style={{ background: "#fff", border: "1px solid #F3F4F6" }}
                >
                  <p
                    className="mb-0.5"
                    style={{
                      fontFamily: "Plus Jakarta Sans, sans-serif",
                      fontWeight: 800,
                      fontSize: "1.8rem",
                      color: "#6C63FF",
                      lineHeight: 1,
                    }}
                  >
                    {s.value}
                  </p>
                  <p
                    className="text-sm font-semibold"
                    style={{
                      color: "#1C2033",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {s.label}
                  </p>
                  {s.sub && (
                    <p
                      className="text-xs"
                      style={{
                        color: "#B0B4C4",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      {s.sub}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ROW ── */}
      <section className="py-16" style={{ background: "#6C63FF" }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {[
              { value: "12,000+", label: "Active Users" },
              { value: "8M+", label: "Words Generated" },
              { value: "20+", label: "Writing Tools" },
              { value: "4.9★", label: "Average Rating" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p
                  style={{
                    fontFamily: "Plus Jakarta Sans, sans-serif",
                    fontWeight: 800,
                    fontSize: "2.4rem",
                    lineHeight: 1.1,
                    color: "#fff",
                  }}
                >
                  {s.value}
                </p>
                <p
                  className="mt-1 text-sm"
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-24" style={{ background: "#fff" }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2
              className="tracking-tight"
              style={{
                fontFamily: "Plus Jakarta Sans, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.7rem, 2.5vw, 2.2rem)",
                color: "#1C2033",
              }}
            >
              What We Stand For
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {VALUES.map(({ emoji, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl border border-[#F3F4F6] bg-white p-7 shadow-[0_2px_12px_rgba(0,0,0,0.05)] transition-all duration-200 hover:-translate-y-1 hover:border-[#D4D0FF] hover:shadow-[0_16px_48px_rgba(108,99,255,0.1)]"
                style={{
                  borderWidth: "1.5px",
                }}
              >
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
                  style={{ background: "#F0EFFF" }}
                >
                  {emoji}
                </div>
                <h3
                  className="mb-2 text-base font-bold"
                  style={{
                    fontFamily: "Plus Jakarta Sans, sans-serif",
                    color: "#1C2033",
                  }}
                >
                  {title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="py-24" style={{ background: "#F8F8FF" }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2
              className="mb-3 tracking-tight"
              style={{
                fontFamily: "Plus Jakarta Sans, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.7rem, 2.5vw, 2.2rem)",
                color: "#1C2033",
              }}
            >
              The Team Behind WordFlowAI
            </h2>
            <p
              className="text-base"
              style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}
            >
              A small team with a big mission
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="rounded-2xl bg-white p-6 text-center"
                style={{
                  border: "1.5px solid #F3F4F6",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                }}
              >
                <div
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-xl font-extrabold text-white"
                  style={{
                    background: member.color,
                    fontFamily: "Plus Jakarta Sans, sans-serif",
                  }}
                >
                  {member.initials}
                </div>
                <h3
                  className="mb-0.5 text-base font-bold"
                  style={{
                    fontFamily: "Plus Jakarta Sans, sans-serif",
                    color: "#1C2033",
                  }}
                >
                  {member.name}
                </h3>
                <p
                  className="mb-2 text-sm font-semibold"
                  style={{ color: "#6C63FF", fontFamily: "Inter, sans-serif" }}
                >
                  {member.role}
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}
                >
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20" style={{ background: "#6C63FF" }}>
        <div className="mx-auto max-w-[860px] px-6 text-center">
          <h2
            className="mb-4 tracking-tight text-white"
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
            }}
          >
            Join 12,000+ Creators Writing Smarter
          </h2>
          <p
            className="mb-8 text-base"
            style={{
              color: "rgba(255,255,255,0.75)",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Start for free. No credit card required.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold no-underline transition-opacity hover:opacity-90"
            style={{ color: "#6C63FF", fontFamily: "Inter, sans-serif" }}
          >
            Try WordFlowAI Free
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
