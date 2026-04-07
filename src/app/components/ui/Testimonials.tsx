"use client";
import React from "react";
import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "WordFlowAI has completely transformed my content workflow. I used to spend 4 hours writing a blog post. Now it takes 20 minutes and the quality is better than before.",
    name: "Sarah K.",
    role: "Content Marketing Manager",
    initials: "SK",
    color: "#6C63FF",
  },
  {
    quote:
      "I run an eCommerce store with 500+ products. Writing descriptions used to be my biggest bottleneck. WordFlowAI solved that problem completely.",
    name: "Ahmed R.",
    role: "eCommerce Entrepreneur",
    initials: "AR",
    color: "#0891B2",
  },
  {
    quote:
      "The SEO optimization built into every output is what sets WordFlowAI apart. My organic traffic increased 40% in just 3 months of using it.",
    name: "Lisa T.",
    role: "SEO Consultant",
    initials: "LT",
    color: "#059669",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-white py-24 lg:py-32">
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
            Loved by Content Creators Worldwide
          </h2>
          <p className="text-base" style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}>
            Don't take our word for it — here's what our users say.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="relative flex flex-col rounded-2xl bg-white p-7 transition-all duration-200 hover:-translate-y-1"
              style={{
                border: "1.5px solid #F3F4F6",
                boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 16px 48px rgba(108,99,255,0.1)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "#D4D0FF";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 2px 12px rgba(0,0,0,0.05)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "#F3F4F6";
              }}
            >
              <Quote
                className="absolute right-6 top-5 h-10 w-10 opacity-[0.07]"
                style={{ color: "#6C63FF" }}
                fill="#6C63FF"
              />

              {/* Stars */}
              <div className="mb-4 flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4" style={{ color: "#FBBF24" }} fill="#FBBF24" />
                ))}
              </div>

              {/* Quote */}
              <p
                className="mb-6 flex-1 text-sm italic leading-relaxed"
                style={{ color: "#374151", fontFamily: "Inter, sans-serif" }}
              >
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ background: t.color, fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  {t.initials}
                </div>
                <div>
                  <p
                    className="text-sm font-bold"
                    style={{ color: "#1C2033", fontFamily: "Plus Jakarta Sans, sans-serif" }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}
                  >
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
