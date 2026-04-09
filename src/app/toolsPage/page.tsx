"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, ArrowRight, Wand2 } from "lucide-react";
import { DashboardLayout } from "../components/DashboardLayout";

const CATEGORIES = ["All", "Blog", "Copywriting", "SEO", "Social"];

const TOOLS = [
  {
    emoji: "✍️",
    title: "Blog Post Writer",
    desc: "Generate full SEO-optimized blog posts from a title and keywords in seconds",
    uses: 2341,
    path: "/tools/blog-writer",
    category: "Blog",
  },
  {
    emoji: "💡",
    title: "Headline Generator",
    desc: "Create 10+ powerful headline variations that stop the scroll and drive clicks",
    uses: 1876,
    path: "/tools",
    category: "Copywriting",
  },
  {
    emoji: "🔄",
    title: "Paraphraser",
    desc: "Rewrite any content in a fresh tone while keeping the core meaning intact",
    uses: 1203,
    path: "/tools",
    category: "Copywriting",
  },
  {
    emoji: "🎨",
    title: "Tone Changer",
    desc: "Switch between formal, casual, professional and friendly tones in one click",
    uses: 987,
    path: "/tools",
    category: "Copywriting",
  },
  {
    emoji: "🛒",
    title: "Product Description",
    desc: "Write eCommerce product copy that converts browsers into buyers at scale",
    uses: 854,
    path: "/tools",
    category: "Copywriting",
  },
  {
    emoji: "📧",
    title: "Email Writer",
    desc: "Write professional emails, follow-ups and newsletters in seconds",
    uses: 743,
    path: "/tools",
    category: "Social",
  },
  {
    emoji: "🔑",
    title: "SEO Meta Writer",
    desc: "Generate optimized title tags and meta descriptions that rank higher",
    uses: 612,
    path: "/tools",
    category: "SEO",
  },
];

export default function ToolsPage() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = TOOLS.filter((t) => {
    const matchCat = category === "All" || t.category === category;
    const matchSearch =
      query === "" || t.title.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <DashboardLayout>
      {/* Heading */}
      <div className="mb-6 flex items-center gap-2">
        <Wand2 className="h-5 w-5" style={{ color: "#6C63FF" }} />
        <h1
          style={{
            fontFamily: "Plus Jakarta Sans, sans-serif",
            fontWeight: 800,
            fontSize: "1.3rem",
            color: "#1C2033",
          }}
        >
          All Tools
        </h1>
      </div>

      {/* Search + count */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div
          className="flex items-center gap-2 rounded-xl px-4 py-2.5"
          style={{
            background: "#fff",
            border: "1.5px solid #E5E7EB",
            maxWidth: 380,
            flex: 1,
          }}
        >
          <Search className="h-4 w-4 flex-shrink-0" style={{ color: "#9CA3AF" }} />
          <input
            type="text"
            placeholder="Search tools..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: "#1C2033", fontFamily: "Inter, sans-serif" }}
          />
        </div>
        <span className="text-sm" style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}>
          {filtered.length} tool{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Category filter pills */}
      <div className="mb-6 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className="rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-150"
            style={{
              background: category === cat ? "#6C63FF" : "transparent",
              color: category === cat ? "#fff" : "#6C63FF",
              border: `1.5px solid ${category === cat ? "#6C63FF" : "#D4D0FF"}`,
              cursor: "pointer",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tools grid */}
      <motion.div
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      >
        {filtered.map((tool) => (
          <motion.div
            key={tool.title}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
            }}
            whileHover={{ y: -2, transition: { duration: 0.15 } }}
            className="flex flex-col rounded-2xl bg-white p-6"
            style={{
              border: "1.5px solid #F3F4F6",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                "0 12px 40px rgba(108,99,255,0.1)";
              (e.currentTarget as HTMLDivElement).style.borderColor = "#D4D0FF";
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                "0 2px 8px rgba(0,0,0,0.04)";
              (e.currentTarget as HTMLDivElement).style.borderColor = "#F3F4F6";
            }}
          >
            {/* Emoji icon */}
            <div
              className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
              style={{ background: "#F0EFFF" }}
            >
              {tool.emoji}
            </div>

            {/* Name + desc */}
            <h3
              className="mb-1.5 text-base"
              style={{
                fontFamily: "Plus Jakarta Sans, sans-serif",
                fontWeight: 700,
                color: "#1C2033",
              }}
            >
              {tool.title}
            </h3>
            <p
              className="mb-4 flex-1 text-sm leading-relaxed"
              style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}
            >
              {tool.desc}
            </p>

            {/* Footer */}
            <div
              className="flex items-center justify-between pt-3"
              style={{ borderTop: "1px solid #F3F4F6" }}
            >
              <span
                className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                style={{
                  background: "#E8E6FF",
                  color: "#6C63FF",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Used {tool.uses.toLocaleString()} times
              </span>
              <Link
                href={tool.path}
                className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold no-underline transition-all duration-150"
                style={{
                  borderColor: "#6C63FF",
                  color: "#6C63FF",
                  fontFamily: "Inter, sans-serif",
                  background: "transparent",
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.currentTarget.style.background = "#6C63FF";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#6C63FF";
                }}
              >
                Use Tool →
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <div className="mt-20 text-center">
          <p className="text-sm" style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}>
            No tools match your search. Try a different keyword.
          </p>
        </div>
      )}
    </DashboardLayout>
  );
}
