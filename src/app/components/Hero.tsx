"use client";
import Link from "next/link";
import { ArrowRight, Play, Sparkles, Zap, Wand2, PenLine } from "lucide-react";

export function Hero() {
  return (
    <section
      className="relative overflow-hidden pt-[72px]"
      style={{
        background: "linear-gradient(to bottom, #F0EFFF 0%, #ffffff 60%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Subtle grid dots */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, #D4D0FF 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          opacity: 0.35,
        }}
      />

      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center gap-12 px-6 py-20 lg:flex-row lg:px-12 lg:py-28">
        {/* Left 55% */}
        <div className="flex flex-1 flex-col items-start" style={{ maxWidth: 580 }}>
          {/* Pill tag */}
          <span
            className="mb-6 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold text-white"
            style={{ background: "#6C63FF", fontFamily: "Inter, sans-serif" }}
          >
            <Sparkles className="h-3.5 w-3.5" />
            AI-Powered Writing Tool
          </span>

          {/* Headline */}
          <h1
            className="mb-5 leading-[1.1] tracking-tight"
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
              color: "#1C2033",
            }}
          >
            Write Smarter.{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6C63FF, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Rank Higher.
            </span>{" "}
            Grow Faster.
          </h1>

          {/* Sub-text */}
          <p
            className="mb-8 max-w-md text-base leading-relaxed"
            style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif", fontSize: "1.05rem" }}
          >
            WordFlowAI is the all-in-one AI writing platform trusted by 12,000+ marketers,
            business owners, freelancers and bloggers. Create high-quality, SEO-optimized
            content in seconds — not hours.
          </p>

          {/* CTAs */}
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <Link
              href="/signup"
              className="flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white no-underline transition-opacity hover:opacity-90"
              style={{ background: "#6C63FF", fontFamily: "Inter, sans-serif" }}
            >
              Start Writing for Free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              className="flex items-center gap-2 rounded-xl border px-6 py-3 text-sm font-semibold transition-colors duration-150 hover:bg-[#F0EFFF]"
              style={{
                borderColor: "#D4D0FF",
                color: "#1C2033",
                fontFamily: "Inter, sans-serif",
                background: "transparent",
              }}
            >
              <Play className="h-4 w-4" style={{ color: "#6C63FF" }} fill="#6C63FF" />
              Watch How It Works →
            </button>
          </div>

          {/* Trust text */}
          <p className="text-sm" style={{ color: "#B0B4C4", fontFamily: "Inter, sans-serif" }}>
            No credit card required &nbsp;•&nbsp; 5,000 free words every month &nbsp;•&nbsp; Cancel anytime
          </p>
        </div>

        {/* Right 45% — UI Mockup */}
        <div className="relative flex-1 w-full" style={{ maxWidth: 620 }}>
          {/* Glow */}
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl"
            style={{
              background: "radial-gradient(ellipse at center, rgba(108,99,255,0.15) 0%, transparent 70%)",
              filter: "blur(24px)",
              transform: "scale(1.06)",
            }}
          />

          {/* App mockup card */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: "#fff",
              border: "1.5px solid #E5E7EB",
              boxShadow: "0 24px 80px rgba(108,99,255,0.14), 0 4px 20px rgba(0,0,0,0.06)",
            }}
          >
            {/* Titlebar */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}
            >
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#FF5F57" }} />
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#FEBC2E" }} />
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#28C840" }} />
              </div>
              <span
                className="rounded-md px-3 py-1 text-xs"
                style={{ background: "#EFEFEF", color: "#999", fontFamily: "Inter, sans-serif" }}
              >
                app.wordflowai.com/dashboard
              </span>
              <div className="w-12" />
            </div>

            {/* Dashboard preview */}
            <div className="flex" style={{ minHeight: 360 }}>
              {/* Mini sidebar */}
              <div
                className="hidden flex-col gap-1 p-3 sm:flex"
                style={{ width: 150, background: "#1C2033", flexShrink: 0 }}
              >
                <div className="mb-3 flex items-center gap-2 px-2 pt-2">
                  <span
                    className="flex h-6 w-6 items-center justify-center rounded"
                    style={{ background: "#6C63FF" }}
                  >
                    <PenLine className="h-3 w-3 text-white" />
                  </span>
                  <span className="text-xs font-bold text-white" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                    WordFlowAI
                  </span>
                </div>
                {["Dashboard", "All Tools", "History", "Billing"].map((item, i) => (
                  <div
                    key={item}
                    className="rounded-lg px-3 py-2 text-xs"
                    style={{
                      background: i === 0 ? "#E8E6FF" : "transparent",
                      color: i === 0 ? "#6C63FF" : "rgba(255,255,255,0.45)",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: i === 0 ? 600 : 400,
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>

              {/* Main area */}
              <div className="flex flex-1 flex-col gap-3 p-4" style={{ background: "#FAFBFF" }}>
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "Words Used", value: "12,480" },
                    { label: "Generations", value: "8 today" },
                    { label: "Plan", value: "Starter" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="rounded-xl p-3"
                      style={{ background: "#fff", border: "1px solid #E5E7EB" }}
                    >
                      <p className="text-xs" style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}>
                        {s.label}
                      </p>
                      <p
                        className="mt-0.5 text-sm font-bold"
                        style={{ color: "#1C2033", fontFamily: "Plus Jakarta Sans, sans-serif" }}
                      >
                        {s.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Writing area */}
                <div
                  className="flex-1 rounded-xl p-4"
                  style={{ background: "#fff", border: "1.5px solid #E8E6FF" }}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <Wand2 className="h-3.5 w-3.5" style={{ color: "#6C63FF" }} />
                    <span className="text-xs font-semibold" style={{ color: "#6C63FF", fontFamily: "Inter, sans-serif" }}>
                      AI Output
                    </span>
                    <span className="ml-auto flex items-center gap-1 text-xs" style={{ color: "#10B981" }}>
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                      Generating...
                    </span>
                  </div>
                  <p className="mb-1 text-xs font-semibold" style={{ color: "#1C2033", fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                    10 AI Writing Tips for Content Creators
                  </p>
                  <div className="space-y-1.5">
                    {[100, 90, 75, 95, 60].map((w, i) => (
                      <div
                        key={i}
                        className="h-2 rounded-full"
                        style={{ width: `${w}%`, background: i === 4 ? "#E8E6FF" : "#F0EFFF" }}
                      />
                    ))}
                  </div>
                  <span
                    className="mt-2 inline-block h-3.5 w-0.5 align-middle"
                    style={{ background: "#6C63FF", animation: "blink 1s step-end infinite" }}
                  />
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2">
                  {["Copy", "Export", "Improve"].map((a, i) => (
                    <button
                      key={a}
                      className="rounded-lg px-3 py-1.5 text-xs font-semibold"
                      style={{
                        background: i === 2 ? "#6C63FF" : "#F0EFFF",
                        color: i === 2 ? "#fff" : "#6C63FF",
                        border: "none",
                      }}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Floating badges */}
          <div
            className="absolute -bottom-3 -left-3 flex items-center gap-2 rounded-xl px-3 py-2.5"
            style={{
              background: "#fff",
              border: "1.5px solid #E5E7EB",
              boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
            }}
          >
            <span
              className="flex h-7 w-7 items-center justify-center rounded-lg"
              style={{ background: "#ECFDF5" }}
            >
              <Zap className="h-3.5 w-3.5" style={{ color: "#10B981" }} />
            </span>
            <div>
              <p className="text-xs font-bold" style={{ color: "#1C2033", fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                Generated in 3.2s
              </p>
              <p className="text-xs" style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}>
                1,200 word post
              </p>
            </div>
          </div>

          <div
            className="absolute -top-3 -right-3 flex items-center gap-2 rounded-xl px-3 py-2"
            style={{
              background: "#fff",
              border: "1.5px solid #D4D0FF",
              boxShadow: "0 8px 24px rgba(108,99,255,0.15)",
            }}
          >
            <span className="text-base font-extrabold" style={{ color: "#6C63FF", fontFamily: "Plus Jakarta Sans, sans-serif" }}>
              10x
            </span>
            <span className="text-xs" style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}>
              Faster
            </span>
          </div>
        </div>
      </div>
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </section>
  );
}