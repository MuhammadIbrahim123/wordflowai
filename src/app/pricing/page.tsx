"use client";
import { useState } from "react";
import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import Link from "next/link";
import { Check, X, ChevronDown, ChevronUp, ArrowRight, Zap } from "lucide-react";

const PLANS = [
  {
    name: "Free",
    price: { monthly: "$0", annual: "$0" },
    tagline: "Perfect to get started",
    features: ["5,000 words per month", "Access to 3 writing tools", "Content history (last 10)", "Basic email support", "No credit card required"],
    cta: "Get Started Free",
    variant: "outline" as const,
  },
  {
    name: "Starter",
    price: { monthly: "$9", annual: "$6" },
    tagline: "For serious content creators",
    features: ["50,000 words per month", "All 7 writing tools", "Unlimited content history", "No watermarks on output", "Priority email support", "Export as TXT and DOCX"],
    cta: "Start Free Trial",
    variant: "filled" as const,
    badge: "Most Popular",
  },
  {
    name: "Pro",
    price: { monthly: "$29", annual: "$19" },
    tagline: "For teams and power users",
    features: ["Unlimited words", "All tools + new features first", "API access for developers", "Priority 24/7 support", "Team collaboration", "Custom tone templates", "White-label outputs"],
    cta: "Go Pro",
    variant: "dark" as const,
  },
];

const COMPARISON = [
  {
    group: "Writing Tools",
    rows: [
      { feature: "Blog Post Writer", free: true, starter: true, pro: true },
      { feature: "Headline Generator", free: true, starter: true, pro: true },
      { feature: "Paraphraser", free: false, starter: true, pro: true },
      { feature: "Tone Changer", free: false, starter: true, pro: true },
      { feature: "Product Description", free: false, starter: true, pro: true },
    ],
  },
  {
    group: "Word Limits",
    rows: [
      { feature: "Monthly word limit", free: "5,000", starter: "50,000", pro: "Unlimited" },
      { feature: "Per document limit", free: "1,000", starter: "Unlimited", pro: "Unlimited" },
    ],
  },
  {
    group: "Support",
    rows: [
      { feature: "Email support", free: "Basic", starter: "Priority", pro: "24/7 Priority" },
      { feature: "API access", free: false, starter: false, pro: true },
      { feature: "Team collaboration", free: false, starter: false, pro: true },
    ],
  },
];

const FAQS = [
  {
    q: "Can I upgrade or downgrade my plan anytime?",
    a: "Yes, you can switch plans at any time from your account settings. Upgrades are effective immediately, and downgrades apply at the start of your next billing cycle.",
  },
  {
    q: "What happens when I run out of words?",
    a: "You'll be notified at 80% usage. When you hit your limit, you can either upgrade to a higher plan or wait for your monthly reset date.",
  },
  {
    q: "Is there a free trial for paid plans?",
    a: "Every paid plan includes a 7-day free trial. You won't be charged until the trial ends, and you can cancel anytime during the trial period.",
  },
  {
    q: "Do you offer refunds?",
    a: "Yes, we offer a 14-day money-back guarantee on all paid plans. If you're not happy with WordFlowAI, just contact our support team within 14 days of purchase.",
  },
];

function CheckOrX({ val }: { val: boolean | string }) {
  if (typeof val === "string") {
    return <span className="text-sm font-medium" style={{ color: "#374151", fontFamily: "Inter, sans-serif" }}>{val}</span>;
  }
  return val ? (
    <Check className="h-5 w-5 mx-auto" style={{ color: "#6C63FF" }} />
  ) : (
    <X className="h-5 w-5 mx-auto" style={{ color: "#D1D5DB" }} />
  );
}

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ background: "#fff" }}>
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 text-center" style={{ background: "#fff" }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center justify-center gap-2 text-sm" style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}>
            <Link href="/" className="no-underline hover:text-[#6C63FF]" style={{ color: "#8A8FA8" }}>Home</Link>
            <span>›</span>
            <span style={{ color: "#1C2033" }}>Pricing</span>
          </nav>

          <h1
            className="mb-4 tracking-tight"
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              color: "#1C2033",
            }}
          >
            Simple, Transparent Pricing
          </h1>
          <p className="mb-8 text-base" style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}>
            Start free. Upgrade when you're ready. Cancel anytime.
          </p>

          {/* Toggle */}
          <div
            className="inline-flex items-center gap-1 rounded-xl p-1"
            style={{ background: "#F3F4F6", border: "1px solid #E5E7EB" }}
          >
            <button
              onClick={() => setAnnual(false)}
              className="rounded-lg px-5 py-2 text-sm font-semibold transition-all"
              style={{
                background: !annual ? "#fff" : "transparent",
                color: !annual ? "#1C2033" : "#8A8FA8",
                border: "none",
                cursor: "pointer",
                boxShadow: !annual ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className="flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold transition-all"
              style={{
                background: annual ? "#fff" : "transparent",
                color: annual ? "#1C2033" : "#8A8FA8",
                border: "none",
                cursor: "pointer",
                boxShadow: annual ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Annual
              <span className="rounded-full px-2 py-0.5 text-xs font-bold" style={{ background: "#DCFCE7", color: "#16A34A" }}>
                Save 30%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="pb-24" style={{ background: "#fff" }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="flex flex-col items-stretch gap-6 lg:flex-row lg:items-end">
            {PLANS.map((plan) => {
              const isFilled = plan.variant === "filled";
              const isDark = plan.variant === "dark";
              const price = annual ? plan.price.annual : plan.price.monthly;

              return (
                <div
                  key={plan.name}
                  className="relative flex flex-1 flex-col rounded-2xl p-8"
                  style={{
                    background: isFilled ? "#6C63FF" : isDark ? "#1C2033" : "#fff",
                    border: plan.variant === "outline" ? "1.5px solid #E5E7EB" : "none",
                    boxShadow: isFilled
                      ? "0 20px 60px rgba(108,99,255,0.3)"
                      : isDark
                      ? "0 20px 60px rgba(28,32,51,0.2)"
                      : "0 4px 20px rgba(0,0,0,0.06)",
                    transform: isFilled ? "scale(1.04)" : "scale(1)",
                  }}
                >
                  {plan.badge && (
                    <span
                      className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-1 text-xs font-bold"
                      style={{ background: "#fff", color: "#6C63FF", boxShadow: "0 2px 12px rgba(108,99,255,0.2)", fontFamily: "Inter, sans-serif" }}
                    >
                      {plan.badge}
                    </span>
                  )}

                  <p className="mb-1 text-xs font-bold uppercase tracking-widest" style={{ color: isFilled || isDark ? "rgba(255,255,255,0.6)" : "#8A8FA8", fontFamily: "Inter, sans-serif" }}>
                    {plan.name}
                  </p>
                  <div className="mb-1 flex items-end gap-1">
                    <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 800, fontSize: "3.2rem", lineHeight: 1, color: isFilled || isDark ? "#fff" : "#1C2033" }}>
                      {price}
                    </span>
                    <span className="pb-2 text-sm" style={{ color: isFilled || isDark ? "rgba(255,255,255,0.5)" : "#8A8FA8", fontFamily: "Inter, sans-serif" }}>
                      /month
                    </span>
                  </div>
                  <p className="mb-6 text-sm" style={{ color: isFilled || isDark ? "rgba(255,255,255,0.6)" : "#8A8FA8", fontFamily: "Inter, sans-serif" }}>
                    {plan.tagline}
                  </p>
                  <div className="mb-6 h-px w-full" style={{ background: isFilled || isDark ? "rgba(255,255,255,0.15)" : "#F3F4F6" }} />
                  <ul className="mb-8 flex flex-1 flex-col gap-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full" style={{ background: isFilled ? "rgba(255,255,255,0.2)" : isDark ? "rgba(255,255,255,0.1)" : "#F0EFFF" }}>
                          <Check className="h-3 w-3" style={{ color: isFilled || isDark ? "#fff" : "#6C63FF" }} />
                        </span>
                        <span className="text-sm" style={{ color: isFilled || isDark ? "rgba(255,255,255,0.85)" : "#374151", fontFamily: "Inter, sans-serif", lineHeight: 1.6 }}>
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/signup"
                    className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold no-underline transition-opacity hover:opacity-90"
                    style={{
                      background: isFilled ? "#fff" : isDark ? "#fff" : "transparent",
                      color: isFilled ? "#6C63FF" : isDark ? "#1C2033" : "#6C63FF",
                      border: plan.variant === "outline" ? "1.5px solid #6C63FF" : "none",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {plan.cta} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-20" style={{ background: "#FAFBFF" }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <h2 className="mb-10 text-center text-2xl font-bold" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "#1C2033" }}>
            Compare All Features
          </h2>
          <div className="overflow-hidden rounded-2xl bg-white" style={{ border: "1.5px solid #E5E7EB", boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}>
            {/* Table header */}
            <div className="grid grid-cols-4 border-b px-6 py-4" style={{ borderColor: "#F3F4F6" }}>
              <div className="text-sm font-semibold" style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}>Feature</div>
              {["Free", "Starter", "Pro"].map((p, i) => (
                <div key={p} className="text-center text-sm font-bold" style={{ color: i === 1 ? "#6C63FF" : "#1C2033", fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                  {p}
                </div>
              ))}
            </div>
            {COMPARISON.map(({ group, rows }) => (
              <div key={group}>
                <div className="px-6 py-3" style={{ background: "#F8F9FF" }}>
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}>
                    {group}
                  </span>
                </div>
                {rows.map((row, i) => (
                  <div
                    key={row.feature}
                    className="grid grid-cols-4 border-b px-6 py-3.5"
                    style={{ borderColor: "#F9FAFB", background: i % 2 === 0 ? "#fff" : "#FAFBFF" }}
                  >
                    <span className="text-sm" style={{ color: "#374151", fontFamily: "Inter, sans-serif" }}>{row.feature}</span>
                    <div className="text-center"><CheckOrX val={row.free} /></div>
                    <div className="text-center"><CheckOrX val={row.starter} /></div>
                    <div className="text-center"><CheckOrX val={row.pro} /></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20" style={{ background: "#fff" }}>
        <div className="mx-auto max-w-[800px] px-6">
          <h2 className="mb-10 text-center text-2xl font-bold" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "#1C2033" }}>
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-3">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl"
                style={{ border: "1.5px solid #E5E7EB" }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                  style={{ background: "#fff", border: "none", cursor: "pointer" }}
                >
                  <span className="pr-4 text-sm font-semibold" style={{ color: "#1C2033", fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                    {faq.q}
                  </span>
                  {openFaq === i ? (
                    <ChevronUp className="h-5 w-5 flex-shrink-0" style={{ color: "#6C63FF" }} />
                  ) : (
                    <ChevronDown className="h-5 w-5 flex-shrink-0" style={{ color: "#8A8FA8" }} />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-sm leading-relaxed" style={{ color: "#6B7280", fontFamily: "Inter, sans-serif" }}>
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
