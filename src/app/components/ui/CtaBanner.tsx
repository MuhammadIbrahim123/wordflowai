"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="py-24" style={{ background: "#6C63FF" }}>
      {/* subtle dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="relative mx-auto max-w-[1440px] px-6 text-center lg:px-12">
        <h2
          className="mb-4 tracking-tight text-white"
          style={{
            fontFamily: "Plus Jakarta Sans, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.9rem, 3.5vw, 3rem)",
          }}
        >
          Ready to Write Smarter and Rank Higher?
        </h2>
        <p
          className="mb-8 text-base"
          style={{ color: "rgba(255,255,255,0.75)", fontFamily: "Inter, sans-serif" }}
        >
          Join 12,000+ content creators who are already saving hours every week with WordFlowAI.
        </p>
        <Link
          href="/signup"
          className="inline-flex items-center gap-2 rounded-xl border-2 border-white px-7 py-3.5 text-sm font-semibold text-white no-underline transition-colors duration-150 hover:bg-white hover:text-[#6C63FF]"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Start Writing for Free
          <ArrowRight className="h-4 w-4" />
        </Link>
        <p className="mt-4 text-xs" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Inter, sans-serif" }}>
          No credit card required &nbsp;•&nbsp; Cancel anytime
        </p>
      </div>
    </section>
  );
}
