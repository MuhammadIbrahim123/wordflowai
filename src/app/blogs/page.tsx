"use client";
// Next.js: rename to app/blog/page.tsx
// export const metadata = { title: 'Blog — WordFlowAI | Content Tips & SEO Guides', description: '...' }
import React from "react";
import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Search, ArrowRight, Clock, ChevronLeft, ChevronRight } from "lucide-react";

const CATEGORIES = ["All", "Content Writing", "SEO Tips", "AI Tools", "Marketing", "Tutorials", "Case Studies"];

const FEATURED = {
  category: "Content Strategy",
  title: "10 Proven Ways to Write Blog Posts That Rank on Google in 2025",
  excerpt:
    "Ranking on Google is harder than ever — but it's not impossible. In this guide we break down the exact framework we use to write content that consistently lands on page one...",
  date: "March 15, 2025",
  readTime: "8 min read",
  author: "Sarah Williams",
  gradient: "linear-gradient(135deg, #6C63FF 0%, #a78bfa 100%)",
};

const POSTS = [
  {
    category: "SEO Tips",
    title: "How to Write SEO-Optimized Blog Posts That Actually Rank in 2025",
    excerpt: "Learn the exact content structure that Google rewards with first-page rankings...",
    date: "Mar 10, 2025",
    readTime: "6 min read",
    author: "Alex Chen",
    initials: "AC",
    color: "#6C63FF",
    gradient: "linear-gradient(135deg, #6C63FF 0%, #E8E6FF 100%)",
    emoji: "🔍",
  },
  {
    category: "AI Tools",
    title: "ChatGPT vs WordFlowAI: Which AI Writing Tool is Better for SEO Content?",
    excerpt: "We compared 5 AI writing tools on 10 different metrics. Here's what we found...",
    date: "Mar 8, 2025",
    readTime: "9 min read",
    author: "Marcus Johnson",
    initials: "MJ",
    color: "#0891B2",
    gradient: "linear-gradient(135deg, #0891B2 0%, #CFFAFE 100%)",
    emoji: "🤖",
  },
  {
    category: "Content Writing",
    title: "The Ultimate Guide to Writing Product Descriptions That Convert",
    excerpt: "Your product description is your silent salesperson. Here's how to make it work harder...",
    date: "Mar 5, 2025",
    readTime: "7 min read",
    author: "Priya Patel",
    initials: "PP",
    color: "#059669",
    gradient: "linear-gradient(135deg, #059669 0%, #D1FAE5 100%)",
    emoji: "🛒",
  },
  {
    category: "Tutorials",
    title: "How to Generate a Full Blog Post in Under 2 Minutes Using AI",
    excerpt: "A step-by-step walkthrough of creating publish-ready blog content with WordFlowAI...",
    date: "Mar 1, 2025",
    readTime: "4 min read",
    author: "Sarah Williams",
    initials: "SW",
    color: "#7C3AED",
    gradient: "linear-gradient(135deg, #7C3AED 0%, #EDE9FE 100%)",
    emoji: "⚡",
  },
  {
    category: "Marketing",
    title: "Content Marketing on a Budget: How Small Businesses Can Compete with Big Brands",
    excerpt: "You don't need a $50,000 content budget to win at content marketing. Here's proof...",
    date: "Feb 28, 2025",
    readTime: "8 min read",
    author: "Alex Chen",
    initials: "AC",
    color: "#D97706",
    gradient: "linear-gradient(135deg, #D97706 0%, #FEF3C7 100%)",
    emoji: "📈",
  },
  {
    category: "Case Studies",
    title: "How Ahmed Grew His Shopify Store Traffic by 140% Using AI-Written Product Descriptions",
    excerpt: "Real results from a real eCommerce store owner who used WordFlowAI for 90 days...",
    date: "Feb 25, 2025",
    readTime: "5 min read",
    author: "Priya Patel",
    initials: "PP",
    color: "#DB2777",
    gradient: "linear-gradient(135deg, #DB2777 0%, #FCE7F3 100%)",
    emoji: "🏪",
  },
];

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  "SEO Tips": { bg: "#EEF2FF", text: "#4F46E5" },
  "AI Tools": { bg: "#ECFEFF", text: "#0E7490" },
  "Content Writing": { bg: "#ECFDF5", text: "#065F46" },
  Tutorials: { bg: "#F5F3FF", text: "#5B21B6" },
  Marketing: { bg: "#FFFBEB", text: "#92400E" },
  "Case Studies": { bg: "#FDF2F8", text: "#9D174D" },
  "Content Strategy": { bg: "#F0EFFF", text: "#6C63FF" },
};

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");

  const filtered = POSTS.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch =
      searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ background: "#fff", overflowX: "hidden" }}>
      <Navbar />

      {/* ── PAGE HEADER ── */}
      <section className="pt-36 pb-12 text-center" style={{ background: "#fff" }}>
        <div className="mx-auto max-w-[860px] px-6">
          <span
            className="mb-5 inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold"
            style={{ background: "#F0EFFF", color: "#6C63FF", fontFamily: "Inter, sans-serif" }}
          >
            Resources &amp; Insights
          </span>
          <h1
            className="mb-4 tracking-tight"
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#1C2033",
              lineHeight: 1.15,
            }}
          >
            The WordFlowAI Blog
          </h1>
          <p
            className="mb-8 text-base leading-relaxed"
            style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}
          >
            Tips, strategies and guides to help you create better content, rank higher on Google
            and grow your business.
          </p>
          {/* Search */}
          <div
            className="mx-auto flex max-w-md items-center gap-2 rounded-xl px-4 py-3"
            style={{ background: "#F9FAFB", border: "1.5px solid #E5E7EB" }}
          >
            <Search className="h-4 w-4 flex-shrink-0" style={{ color: "#9CA3AF" }} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm outline-none"
              style={{ color: "#1C2033", fontFamily: "Inter, sans-serif" }}
            />
          </div>
        </div>
      </section>

      {/* ── FEATURED POST ── */}
      <section className="pb-12" style={{ background: "#F5F4FF" }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div
            className="overflow-hidden rounded-2xl"
            style={{ border: "1.5px solid #E8E6FF", boxShadow: "0 4px 24px rgba(108,99,255,0.1)" }}
          >
            <div className="flex flex-col lg:flex-row">
              {/* Image placeholder */}
              <div
                className="flex h-64 flex-shrink-0 items-center justify-center lg:h-auto lg:w-[420px]"
                style={{ background: FEATURED.gradient }}
              >
                <span className="text-7xl">✍️</span>
              </div>
              {/* Content */}
              <div className="flex flex-1 flex-col justify-center bg-white p-8 lg:p-10">
                <span
                  className="mb-3 inline-block self-start rounded-full px-3 py-1 text-xs font-semibold"
                  style={{
                    background: CATEGORY_COLORS[FEATURED.category]?.bg ?? "#F0EFFF",
                    color: CATEGORY_COLORS[FEATURED.category]?.text ?? "#6C63FF",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {FEATURED.category}
                </span>
                <h2
                  className="mb-3 tracking-tight"
                  style={{
                    fontFamily: "Plus Jakarta Sans, sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(1.3rem, 2vw, 1.7rem)",
                    color: "#1C2033",
                    lineHeight: 1.3,
                  }}
                >
                  {FEATURED.title}
                </h2>
                <p
                  className="mb-4 text-sm leading-relaxed"
                  style={{ color: "#6B7280", fontFamily: "Inter, sans-serif" }}
                >
                  {FEATURED.excerpt}
                </p>
                <div
                  className="mb-5 flex items-center gap-3 text-xs"
                  style={{ color: "#9CA3AF", fontFamily: "Inter, sans-serif" }}
                >
                  <span>{FEATURED.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {FEATURED.readTime}
                  </span>
                  <span>•</span>
                  <span>By {FEATURED.author}</span>
                </div>
                <a
                  href="#"
                  className="flex items-center gap-1.5 text-sm font-semibold no-underline"
                  style={{ color: "#6C63FF", fontFamily: "Inter, sans-serif" }}
                >
                  Read Article <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORY FILTERS ── */}
      <section className="py-8" style={{ background: "#fff" }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-150"
                style={{
                  background: activeCategory === cat ? "#6C63FF" : "transparent",
                  color: activeCategory === cat ? "#fff" : "#6C63FF",
                  border: `1.5px solid ${activeCategory === cat ? "#6C63FF" : "#D4D0FF"}`,
                  fontFamily: "Inter, sans-serif",
                  cursor: "pointer",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG GRID ── */}
      <section className="pb-16" style={{ background: "#fff" }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-sm" style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}>
                No articles found matching your search.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post) => {
                const catStyle = CATEGORY_COLORS[post.category] ?? { bg: "#F0EFFF", text: "#6C63FF" };
                return (
                  <div
                    key={post.title}
                    className="flex flex-col overflow-hidden rounded-2xl bg-white transition-all duration-200 hover:-translate-y-1"
                    style={{
                      border: "1.5px solid #F3F4F6",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 40px rgba(108,99,255,0.1)";
                      (e.currentTarget as HTMLDivElement).style.borderColor = "#D4D0FF";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
                      (e.currentTarget as HTMLDivElement).style.borderColor = "#F3F4F6";
                    }}
                  >
                    {/* Image */}
                    <div
                      className="flex h-44 items-center justify-center text-5xl"
                      style={{ background: post.gradient }}
                    >
                      {post.emoji}
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      {/* Category */}
                      <span
                        className="mb-3 inline-block self-start rounded-full px-2.5 py-0.5 text-xs font-semibold"
                        style={{ background: catStyle.bg, color: catStyle.text, fontFamily: "Inter, sans-serif" }}
                      >
                        {post.category}
                      </span>

                      {/* Title */}
                      <h3
                        className="mb-2 flex-1 text-sm font-bold leading-snug"
                        style={{
                          fontFamily: "Plus Jakarta Sans, sans-serif",
                          color: "#1C2033",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p
                        className="mb-4 text-xs leading-relaxed"
                        style={{
                          color: "#6B7280",
                          fontFamily: "Inter, sans-serif",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {post.excerpt}
                      </p>

                      {/* Footer */}
                      <div
                        className="flex items-center gap-2 pt-3"
                        style={{ borderTop: "1px solid #F3F4F6" }}
                      >
                        <div
                          className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                          style={{ background: post.color, fontFamily: "Plus Jakarta Sans, sans-serif" }}
                        >
                          {post.initials}
                        </div>
                        <div className="flex-1">
                          <p
                            className="text-xs font-medium"
                            style={{ color: "#374151", fontFamily: "Inter, sans-serif" }}
                          >
                            {post.author}
                          </p>
                        </div>
                        <span
                          className="flex items-center gap-1 text-xs"
                          style={{ color: "#9CA3AF", fontFamily: "Inter, sans-serif" }}
                        >
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                        <span className="text-xs" style={{ color: "#9CA3AF", fontFamily: "Inter, sans-serif" }}>
                          {post.date}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-10 flex items-center justify-center gap-2">
            <button
              className="flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-[#F0EFFF]"
              style={{ borderColor: "#E5E7EB", color: "#6B7280", background: "#fff", fontFamily: "Inter, sans-serif", cursor: "pointer" }}
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </button>
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                className="h-9 w-9 rounded-lg border text-sm font-semibold transition-colors"
                style={{
                  borderColor: p === 1 ? "#6C63FF" : "#E5E7EB",
                  background: p === 1 ? "#6C63FF" : "#fff",
                  color: p === 1 ? "#fff" : "#6B7280",
                  fontFamily: "Inter, sans-serif",
                  cursor: "pointer",
                }}
              >
                {p}
              </button>
            ))}
            <button
              className="flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-[#F0EFFF]"
              style={{ borderColor: "#E5E7EB", color: "#6B7280", background: "#fff", fontFamily: "Inter, sans-serif", cursor: "pointer" }}
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER CTA ── */}
      <section className="py-16" style={{ background: "#F5F4FF" }}>
        <div className="mx-auto max-w-[720px] px-6 text-center">
          <h3
            className="mb-2 tracking-tight"
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)",
              color: "#1C2033",
            }}
          >
            Get Weekly Content Tips in Your Inbox
          </h3>
          <p
            className="mb-6 text-sm"
            style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}
          >
            Join 5,000+ creators getting our best content strategy tips every Tuesday.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="rounded-xl border px-4 py-3 text-sm outline-none"
              style={{
                borderColor: "#D4D0FF",
                color: "#1C2033",
                fontFamily: "Inter, sans-serif",
                background: "#fff",
                width: "100%",
                maxWidth: 280,
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#6C63FF"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(108,99,255,0.1)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "#D4D0FF"; e.currentTarget.style.boxShadow = "none"; }}
            />
            <button
              className="flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: "#6C63FF", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif" }}
            >
              Subscribe Free
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
