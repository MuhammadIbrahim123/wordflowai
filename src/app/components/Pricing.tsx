"use client";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    tagline: "Perfect to get started",
    features: [
      "5,000 words per month",
      "Access to 3 core writing tools",
      "Content history (last 10 saves)",
      "Basic email support",
      "No credit card required",
    ],
    cta: "Get Started Free",
    variant: "outline" as const,
  },
  {
    name: "Starter",
    price: "$9",
    period: "/month",
    tagline: "For serious content creators",
    features: [
      "50,000 words per month",
      "All 20+ writing tools",
      "Unlimited content history",
      "No watermarks on exports",
      "Priority email support",
      "Export as TXT and DOCX",
      "SEO keyword suggestions",
    ],
    cta: "Start Free Trial",
    variant: "filled" as const,
    badge: "Most Popular",
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    tagline: "For teams and power users",
    features: [
      "Unlimited words every month",
      "All tools + early access to new features",
      "API access for developers",
      "Priority 24/7 live support",
      "Team collaboration (up to 5 seats)",
      "Custom tone & brand templates",
      "White-label content exports",
      "Dedicated account manager",
    ],
    cta: "Go Pro",
    variant: "dark" as const,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        {/* Header */}
        <div className="mb-14 text-center">
          <h2
            className="mb-3 tracking-tight"
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
              color: "#1C2033",
            }}
          >
            Simple Pricing. No Surprises.{" "}
            <span style={{ color: "#6C63FF" }}>Cancel Anytime.</span>
          </h2>
          <p className="text-base" style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}>
            Start free, upgrade when you're ready.
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col items-stretch gap-6 lg:flex-row lg:items-end">
          {PLANS.map((plan) => {
            const isFilled = plan.variant === "filled";
            const isDark = plan.variant === "dark";
            const isOutline = plan.variant === "outline";

            return (
              <div
                key={plan.name}
                className="relative flex flex-1 flex-col rounded-2xl p-7 transition-transform duration-200"
                style={{
                  background: isFilled ? "#6C63FF" : isDark ? "#1C2033" : "#fff",
                  border: isOutline ? "1.5px solid #E5E7EB" : "none",
                  boxShadow: isFilled
                    ? "0 20px 60px rgba(108,99,255,0.3)"
                    : isDark
                    ? "0 20px 60px rgba(28,32,51,0.2)"
                    : "0 2px 12px rgba(0,0,0,0.05)",
                  transform: isFilled ? "scale(1.04)" : "scale(1)",
                }}
              >
                {plan.badge && (
                  <span
                    className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold"
                    style={{
                      background: "#fff",
                      color: "#6C63FF",
                      boxShadow: "0 2px 12px rgba(108,99,255,0.2)",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {plan.badge}
                  </span>
                )}

                <p
                  className="mb-1 text-sm font-semibold uppercase tracking-widest"
                  style={{
                    color: isFilled || isDark ? "rgba(255,255,255,0.6)" : "#8A8FA8",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {plan.name}
                </p>

                <div className="mb-1 flex items-end gap-1">
                  <span
                    style={{
                      fontFamily: "Plus Jakarta Sans, sans-serif",
                      fontWeight: 800,
                      fontSize: "3rem",
                      lineHeight: 1,
                      color: isFilled || isDark ? "#fff" : "#1C2033",
                    }}
                  >
                    {plan.price}
                  </span>
                  <span
                    className="pb-2 text-sm"
                    style={{
                      color: isFilled || isDark ? "rgba(255,255,255,0.5)" : "#8A8FA8",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {plan.period}
                  </span>
                </div>

                <p
                  className="mb-6 text-sm"
                  style={{
                    color: isFilled || isDark ? "rgba(255,255,255,0.6)" : "#8A8FA8",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {plan.tagline}
                </p>

                <div
                  className="mb-6 h-px w-full"
                  style={{
                    background: isFilled || isDark ? "rgba(255,255,255,0.15)" : "#F3F4F6",
                  }}
                />

                <ul className="mb-8 flex flex-1 flex-col gap-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
                        style={{
                          background:
                            isFilled
                              ? "rgba(255,255,255,0.2)"
                              : isDark
                              ? "rgba(255,255,255,0.1)"
                              : "#F0EFFF",
                        }}
                      >
                        <Check
                          className="h-3 w-3"
                          style={{ color: isFilled || isDark ? "#fff" : "#6C63FF" }}
                        />
                      </span>
                      <span
                        className="text-sm"
                        style={{
                          color: isFilled || isDark ? "rgba(255,255,255,0.85)" : "#374151",
                          fontFamily: "Inter, sans-serif",
                          lineHeight: 1.6,
                        }}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/signup"
                  className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold no-underline transition-opacity hover:opacity-90"
                  style={{
                    background: isFilled ? "#fff" : isDark ? "#fff" : "transparent",
                    color: isFilled ? "#6C63FF" : isDark ? "#1C2033" : "#6C63FF",
                    border: isOutline ? "1.5px solid #6C63FF" : "none",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {plan.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm" style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}>
          <Link href="/pricing" className="font-semibold no-underline" style={{ color: "#6C63FF" }}>
            View full pricing details →jkhkj
          </Link>
        </p>
      </div>
    </section>
  );
}
