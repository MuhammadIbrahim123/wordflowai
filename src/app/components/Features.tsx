"use client";
import {
  ArrowRight,
  Lightbulb,
  Palette,
  PenLine,
  RefreshCw,
  Search,
  ShoppingCart,
} from "lucide-react";

const FEATURES = [
  {
    Icon: PenLine,
    title: "AI Blog Writer",
    desc: "Write SEO-optimized blog posts in seconds. Our AI crafts well-structured articles with click-worthy headlines that drive organic traffic and actually rank on Google.",
    color: "#6C63FF",
    bg: "#F0EFFF",
  },
  {
    Icon: Lightbulb,
    title: "Headline Generator",
    desc: "Create 10+ powerful headline variations that stop the scroll. Test what resonates with your audience before you publish.",
    color: "#7C3AED",
    bg: "#F5F3FF",
  },
  {
    Icon: RefreshCw,
    title: "Paraphraser & Rewriter",
    desc: "Transform existing content into fresh, unique copy. Avoid duplicate content penalties while keeping your core message.",
    color: "#0891B2",
    bg: "#ECFEFF",
  },
  {
    Icon: Palette,
    title: "Tone Changer",
    desc: "Switch from formal to casual, professional to friendly in one click. Match your brand voice across every piece of content.",
    color: "#D97706",
    bg: "#FFFBEB",
  },
  {
    Icon: ShoppingCart,
    title: "Product Description Writer",
    desc: "Write eCommerce copy that converts browsers into buyers. SEO-friendly product descriptions at scale.",
    color: "#059669",
    bg: "#ECFDF5",
  },
  {
    Icon: Search,
    title: "SEO Meta Writer",
    desc: "Generate optimized title tags and meta descriptions that improve click-through rates and help your pages rank higher.",
    color: "#DB2777",
    bg: "#FDF2F8",
  },
];

export function Features() {
  return (
    <section id="features" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        {/* Header */}
        <div className="mb-14 text-center">
          <h2
            className="mb-4 tracking-tight"
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
              color: "#1C2033",
            }}
          >
            Stop Wasting Hours on Content.{" "}
            <span style={{ color: "#6C63FF" }}>Start Publishing Results.</span>
          </h2>
          <p
            className="mx-auto max-w-xl text-base leading-relaxed"
            style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}
          >
            20+ specialized AI writing tools designed to help you create content
            that ranks, converts and grows your business.
          </p>
        </div>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ Icon, title, desc, color, bg }) => (
            <div
              key={title}
              className="group flex flex-col gap-4 rounded-2xl bg-white p-6 transition-all duration-200 hover:-translate-y-1"
              style={{
                border: "1.5px solid #F3F4F6",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
              onMouseEnter={(e: { currentTarget: HTMLDivElement }) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 12px 40px rgba(108,99,255,0.1)";
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "#D4D0FF";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 2px 8px rgba(0,0,0,0.04)";
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "#F3F4F6";
              }}
            >
              <span
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ background: bg }}
              >
                <Icon className="h-5 w-5" style={{ color }} />
              </span>

              <div className="flex flex-col gap-1.5">
                <h3
                  className="text-base"
                  style={{
                    fontFamily: "Plus Jakarta Sans, sans-serif",
                    fontWeight: 700,
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

              <a
                href="/tools"
                className="mt-auto flex items-center gap-1 text-sm font-semibold no-underline cursor-pointer"
                style={{ color }}
              >
                Try it <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
