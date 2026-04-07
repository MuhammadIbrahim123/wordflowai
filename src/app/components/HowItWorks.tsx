"use client";
import React from "react";
import { Type, Wand2, Send } from "lucide-react";

const STEPS = [
  {
    num: "01",
    Icon: Type,
    title: "Enter Your Topic",
    desc: "Type your blog title, keywords or product name. The more detail you give, the better your output.",
  },
  {
    num: "02",
    Icon: Wand2,
    title: "AI Generates Your Content",
    desc: "Our AI analyzes top-ranking content and writes SEO-optimized copy tailored to your niche in seconds.",
  },
  {
    num: "03",
    Icon: Send,
    title: "Edit, Copy & Publish",
    desc: "Review the output, make quick edits if needed, then copy directly to your CMS, blog or social media.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 lg:py-32"
      style={{ background: "#F5F4FF" }}
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 text-center">
          <span
            className="mb-4 inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold"
            style={{ background: "#E8E6FF", color: "#6C63FF", fontFamily: "Inter, sans-serif" }}
          >
            Simple Process
          </span>
          <h2
            className="tracking-tight"
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
              color: "#1C2033",
            }}
          >
            From Blank Page to Published Post in 3 Simple Steps
          </h2>
        </div>

        {/* Steps */}
        <div className="relative flex flex-col gap-8 lg:flex-row lg:gap-0">
          {/* Dotted connector line (desktop) */}
          <div
            className="pointer-events-none absolute top-10 hidden lg:block"
            style={{
              left: "16.66%",
              right: "16.66%",
              height: 2,
              backgroundImage:
                "repeating-linear-gradient(to right, #D4D0FF 0, #D4D0FF 8px, transparent 8px, transparent 16px)",
            }}
          />

          {STEPS.map(({ num, Icon, title, desc }) => (
            <div
              key={num}
              className="relative z-10 flex flex-1 flex-col items-center text-center px-6 lg:px-10"
            >
              <div
                className="mb-6 flex h-20 w-20 items-center justify-center rounded-full text-white"
                style={{
                  background: "#6C63FF",
                  boxShadow: "0 8px 28px rgba(108,99,255,0.3)",
                }}
              >
                <Icon className="h-8 w-8" />
              </div>

              <span
                className="mb-3 inline-block rounded-full px-3 py-0.5 text-xs font-bold uppercase tracking-wider"
                style={{
                  background: "#E8E6FF",
                  color: "#6C63FF",
                  fontFamily: "Inter, sans-serif",
                  letterSpacing: "0.08em",
                }}
              >
                Step {num}
              </span>

              <h3
                className="mb-2.5 text-lg"
                style={{
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  fontWeight: 700,
                  color: "#1C2033",
                }}
              >
                {title}
              </h3>
              <p
                className="max-w-[260px] text-sm leading-relaxed"
                style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
