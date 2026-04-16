"use client";
import { useState } from "react";
import {
  ArrowRight, ChevronLeft, ChevronRight, Clock, Search,
  SearchCheck, Bot, ShoppingCart, Zap, TrendingUp, Store, PenLine,
  type LucideIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";

/* ─── Types ─── */
interface Post {
  category: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  initials: string;
}

interface PaginationItem {
  label: React.ReactNode;
  wide: boolean;
  active?: boolean;
}

/* ─── Data ─── */
const CATEGORIES = ["All", "Content Writing", "SEO Tips", "AI Tools", "Marketing", "Tutorials", "Case Studies"];

const FEATURED = {
  category: "Content Strategy",
  title: "10 Proven Ways to Write Blog Posts That Rank on Google in 2025",
  excerpt:
    "Ranking on Google is harder than ever — but it's not impossible. In this guide we break down the exact framework we use to write content that consistently lands on page one...",
  date: "March 15, 2025",
  readTime: "8 min read",
  author: "Sarah Williams",
};

const POSTS: Post[] = [
  { category: "SEO Tips",        icon: SearchCheck,    color: "#6C63FF", bg: "linear-gradient(135deg,#6C63FF,#E8E6FF)",  title: "How to Write SEO-Optimized Blog Posts That Actually Rank in 2025",                       excerpt: "Learn the exact content structure that Google rewards with first-page rankings...",             date: "Mar 10, 2025", readTime: "6 min read", author: "Alex Chen",      initials: "AC" },
  { category: "AI Tools",        icon: Bot,            color: "#0891B2", bg: "linear-gradient(135deg,#0891B2,#CFFAFE)",  title: "ChatGPT vs WordFlowAI: Which AI Writing Tool is Better for SEO Content?",                 excerpt: "We compared 5 AI writing tools on 10 different metrics. Here's what we found...",             date: "Mar 8, 2025",  readTime: "9 min read", author: "Marcus Johnson", initials: "MJ" },
  { category: "Content Writing", icon: ShoppingCart,   color: "#059669", bg: "linear-gradient(135deg,#059669,#D1FAE5)",  title: "The Ultimate Guide to Writing Product Descriptions That Convert",                         excerpt: "Your product description is your silent salesperson. Here's how to make it work harder...",    date: "Mar 5, 2025",  readTime: "7 min read", author: "Priya Patel",    initials: "PP" },
  { category: "Tutorials",       icon: Zap,            color: "#7C3AED", bg: "linear-gradient(135deg,#7C3AED,#EDE9FE)",  title: "How to Generate a Full Blog Post in Under 2 Minutes Using AI",                           excerpt: "A step-by-step walkthrough of creating publish-ready blog content with WordFlowAI...",         date: "Mar 1, 2025",  readTime: "4 min read", author: "Sarah Williams", initials: "SW" },
  { category: "Marketing",       icon: TrendingUp,     color: "#D97706", bg: "linear-gradient(135deg,#D97706,#FEF3C7)",  title: "Content Marketing on a Budget: How Small Businesses Can Compete with Big Brands",         excerpt: "You don't need a $50,000 content budget to win at content marketing. Here's proof...",        date: "Feb 28, 2025", readTime: "8 min read", author: "Alex Chen",      initials: "AC" },
  { category: "Case Studies",    icon: Store,          color: "#DB2777", bg: "linear-gradient(135deg,#DB2777,#FCE7F3)",  title: "How Ahmed Grew His Shopify Store Traffic by 140% Using AI-Written Product Descriptions",  excerpt: "Real results from a real eCommerce store owner who used WordFlowAI for 90 days...",           date: "Feb 25, 2025", readTime: "5 min read", author: "Priya Patel",    initials: "PP" },
];

const CAT_STYLES: Record<string, { bg: string; text: string }> = {
  "SEO Tips":         { bg: "#EEF2FF", text: "#4F46E5" },
  "AI Tools":         { bg: "#ECFEFF", text: "#0E7490" },
  "Content Writing":  { bg: "#ECFDF5", text: "#065F46" },
  "Tutorials":        { bg: "#F5F3FF", text: "#5B21B6" },
  "Marketing":        { bg: "#FFFBEB", text: "#92400E" },
  "Case Studies":     { bg: "#FDF2F8", text: "#9D174D" },
  "Content Strategy": { bg: "#F0EFFF", text: "#6C63FF" },
};

/* ─── Animation variants ─── */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as number[], delay },
  },
});

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as number[] },
  },
};

/* ─── Reusable sub-components ─── */
function CategoryBadge({ cat }: { cat: string }) {
  const s = CAT_STYLES[cat] ?? { bg: "#F0EFFF", text: "#6C63FF" };
  return (
    <span
      className="inline-block self-start rounded-full px-2.5 py-0.5 text-xs font-semibold"
      style={{ background: s.bg, color: s.text, fontFamily: "Inter, sans-serif" }}
    >
      {cat}
    </span>
  );
}

function MetaRow({ date, readTime, author }: { date: string; readTime: string; author?: string }) {
  return (
    <div className="flex items-center gap-3 text-xs" style={{ color: "#9CA3AF", fontFamily: "Inter, sans-serif" }}>
      <span>{date}</span>
      <span>•</span>
      <span className="flex items-center gap-1">
        <Clock className="h-3 w-3" />
        {readTime}
      </span>
      {author && (
        <>
          <span>•</span>
          <span>By {author}</span>
        </>
      )}
    </div>
  );
}

/* ─── Page ─── */
export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");

  const filtered = POSTS.filter(
    (p) =>
      (activeCategory === "All" || p.category === activeCategory) &&
      (searchQuery === "" ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const paginationItems: PaginationItem[] = [
    { label: <><ChevronLeft className="h-4 w-4" /> Previous</>, wide: true },
    { label: 1, wide: false, active: true },
    { label: 2, wide: false },
    { label: 3, wide: false },
    { label: <>Next <ChevronRight className="h-4 w-4" /></>, wide: true },
  ];

  return (
    <div style={{ background: "#fff", overflowX: "hidden" }}>
      <Navbar />

      {/* ── PAGE HEADER ── */}
      <motion.section
        className="pt-36 pb-12 text-center"
        style={{ background: "#fff" }}
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <div className="mx-auto max-w-[860px] px-6">
          <motion.span
            variants={fadeUp(0)}
            className="mb-5 inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold"
            style={{ background: "#F0EFFF", color: "#6C63FF", fontFamily: "Inter, sans-serif" }}
          >
            Resources &amp; Insights
          </motion.span>

          <motion.h1
            variants={fadeUp(0.08)}
            className="mb-4 tracking-tight"
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2rem,4vw,3rem)",
              color: "#1C2033",
              lineHeight: 1.15,
            }}
          >
            The WordFlowAI Blog
          </motion.h1>

          <motion.p
            variants={fadeUp(0.16)}
            className="mb-8 text-base leading-relaxed"
            style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}
          >
            Tips, strategies and guides to help you create better content, rank higher on Google and grow your business.
          </motion.p>

          <motion.div
            variants={fadeUp(0.24)}
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
          </motion.div>
        </div>
      </motion.section>

      {/* ── FEATURED POST ── */}
      <section className="pb-12" style={{ background: "#F5F4FF" }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-2xl"
            style={{ border: "1.5px solid #E8E6FF", boxShadow: "0 4px 24px rgba(108,99,255,0.1)" }}
          >
            <div className="flex flex-col lg:flex-row">
              <motion.div
                className="flex h-64 flex-shrink-0 items-center justify-center text-7xl lg:h-auto lg:w-[420px]"
                style={{ background: "linear-gradient(135deg,#6C63FF,#a78bfa)" }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  animate={{ rotate: [0, -8, 8, -4, 0] }}
                  transition={{ duration: 4, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
                  className="flex h-20 w-20 items-center justify-center rounded-2xl"
                  style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)" }}
                >
                  <PenLine className="h-10 w-10 text-white" />
                </motion.div>
              </motion.div>
              <div className="flex flex-1 flex-col justify-center bg-white p-8 lg:p-10">
                <CategoryBadge cat={FEATURED.category} />
                <h2
                  className="mt-3 mb-3 tracking-tight"
                  style={{
                    fontFamily: "Plus Jakarta Sans, sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(1.3rem,2vw,1.7rem)",
                    color: "#1C2033",
                    lineHeight: 1.3,
                  }}
                >
                  {FEATURED.title}
                </h2>
                <p className="mb-4 text-sm leading-relaxed" style={{ color: "#6B7280", fontFamily: "Inter, sans-serif" }}>
                  {FEATURED.excerpt}
                </p>
                <MetaRow date={FEATURED.date} readTime={FEATURED.readTime} author={FEATURED.author} />
                <motion.a
                  href="#"
                  className="mt-5 flex w-fit items-center gap-1.5 text-sm font-semibold no-underline"
                  style={{ color: "#6C63FF", fontFamily: "Inter, sans-serif" }}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  Read Article <ArrowRight className="h-4 w-4" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CATEGORY FILTERS ── */}
      <section className="py-8" style={{ background: "#fff" }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full px-4 py-1.5 text-sm font-semibold"
                style={{
                  background: activeCategory === cat ? "#6C63FF" : "transparent",
                  color: activeCategory === cat ? "#fff" : "#6C63FF",
                  border: `1.5px solid ${activeCategory === cat ? "#6C63FF" : "#D4D0FF"}`,
                  fontFamily: "Inter, sans-serif",
                  cursor: "pointer",
                  transition: "background 0.15s, color 0.15s",
                }}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG GRID ── */}
      <section className="pb-16" style={{ background: "#fff" }}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-20 text-center"
              >
                <p className="text-sm" style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}>
                  No articles found matching your search.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                variants={stagger}
                initial="hidden"
                animate="visible"
              >
                {filtered.map((post) => (
                  <motion.div
                    key={post.title}
                    variants={cardVariant}
                    whileHover={{
                      y: -6,
                      boxShadow: "0 16px 48px rgba(108,99,255,0.12)",
                      borderColor: "#D4D0FF",
                    }}
                    className="flex flex-col overflow-hidden rounded-2xl bg-white cursor-pointer"
                    style={{ border: "1.5px solid #F3F4F6", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
                  >
                    <div className="flex h-44 items-center justify-center" style={{ background: post.bg }}>
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 6 }}
                        transition={{ type: "spring", stiffness: 300, damping: 14 }}
                        className="flex h-16 w-16 items-center justify-center rounded-2xl"
                        style={{ background: "rgba(255,255,255,0.22)", backdropFilter: "blur(6px)" }}
                      >
                        <post.icon className="h-8 w-8 text-white" />
                      </motion.div>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <CategoryBadge cat={post.category} />
                      <h3
                        className="mt-3 mb-2 flex-1 text-sm font-bold leading-snug"
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
                      <div className="flex items-center gap-2 pt-3" style={{ borderTop: "1px solid #F3F4F6" }}>
                        <div
                          className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                          style={{ background: post.color, fontFamily: "Plus Jakarta Sans, sans-serif" }}
                        >
                          {post.initials}
                        </div>
                        <p className="flex-1 text-xs font-medium" style={{ color: "#374151", fontFamily: "Inter, sans-serif" }}>
                          {post.author}
                        </p>
                        <MetaRow date={post.date} readTime={post.readTime} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pagination */}
          <div className="mt-10 flex items-center justify-center gap-2">
            {paginationItems.map((item, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                className={`${item.wide ? "flex items-center gap-1.5 px-4 py-2" : "h-9 w-9"} rounded-lg border text-sm font-semibold`}
                style={{
                  borderColor: item.active ? "#6C63FF" : "#E5E7EB",
                  background: item.active ? "#6C63FF" : "#fff",
                  color: item.active ? "#fff" : "#6B7280",
                  fontFamily: "Inter, sans-serif",
                  cursor: "pointer",
                }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <motion.section
        className="py-16"
        style={{ background: "#F5F4FF" }}
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto max-w-[720px] px-6 text-center">
          <h3
            className="mb-2 tracking-tight"
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.4rem,2.5vw,1.8rem)",
              color: "#1C2033",
            }}
          >
            Get Weekly Content Tips in Your Inbox
          </h3>
          <p className="mb-6 text-sm" style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}>
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
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#6C63FF";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(108,99,255,0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#D4D0FF";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white"
              style={{ background: "#6C63FF", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif" }}
            >
              Subscribe Free <ArrowRight className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}