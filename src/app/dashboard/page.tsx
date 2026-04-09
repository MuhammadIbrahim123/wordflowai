"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText, Sparkles, LayoutList, Crown, Wand2, Zap,
  Copy, Eye, ArrowRight,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";
import { toast } from "sonner";

/* ─── Chart data ─── */
const CHART_7D = [
  { label: "Mon", words: 1200, credits: 920 },
  { label: "Tue", words: 1580, credits: 1240 },
  { label: "Wed", words: 950,  credits: 730 },
  { label: "Thu", words: 2100, credits: 1640 },
  { label: "Fri", words: 1750, credits: 1360 },
  { label: "Sat", words: 680,  credits: 520 },
  { label: "Sun", words: 1420, credits: 1090 },
];

const CHART_30D = Array.from({ length: 30 }, (_, i) => ({
  label: `Mar ${i + 1}`,
  words: Math.max(300, 1100 + Math.round(Math.sin(i * 0.7) * 450 + Math.cos(i * 1.3) * 250)),
  credits: Math.max(200, 900 + Math.round(Math.cos(i * 0.6) * 380 + Math.sin(i * 1.1) * 200)),
}));

const CHART_3M = [
  { label: "Jan", words: 28500, credits: 21400 },
  { label: "Feb", words: 31200, credits: 23500 },
  { label: "Mar", words: 12480, credits: 9800 },
];

const CHART_DATA = { "7D": CHART_7D, "30D": CHART_30D, "3M": CHART_3M } as const;

/* ─── Quick tools ─── */
const QUICK_TOOLS = [
  { emoji: "✍️", label: "Blog Writer",   path: "/dashboard/tools/blog-writer" },
  { emoji: "💡", label: "Headlines",     path: "/dashboard/tools" },
  { emoji: "🔄", label: "Paraphraser",   path: "/dashboard/tools" },
  { emoji: "🎨", label: "Tone Changer",  path: "/dashboard/tools" },
  { emoji: "🛒", label: "Product Desc",  path: "/dashboard/tools" },
  { emoji: "📧", label: "Email Writer",  path: "/dashboard/tools" },
  { emoji: "🔑", label: "SEO Meta",      path: "/dashboard/tools" },
  { emoji: "➕", label: "All Tools",     path: "/dashboard/tools" },
];

/* ─── Recent generations ─── */
const RECENT = [
  { id: "1", tool: "Blog Writer",   toolColor: "#6C63FF", toolBg: "#F0EFFF", preview: "10 Ways AI Is Changing Content Marketing in 2026 and bey...", words: 1240, date: "2 hours ago" },
  { id: "2", tool: "Headlines",     toolColor: "#7C3AED", toolBg: "#F5F3FF", preview: "Subject lines for Q1 email blast campaign — 12 powerful...", words: 320,  date: "4 hours ago" },
  { id: "3", tool: "Paraphraser",   toolColor: "#0891B2", toolBg: "#ECFEFF", preview: "SaaS landing page hero copy — revised and SEO-optimized...", words: 580,  date: "Yesterday" },
  { id: "4", tool: "Product Desc",  toolColor: "#059669", toolBg: "#ECFDF5", preview: "WordFlowAI Starter plan product description for AppSumo...", words: 420,  date: "Mar 15" },
  { id: "5", tool: "Tone Changer",  toolColor: "#D97706", toolBg: "#FFFBEB", preview: "Social media captions for Spring product launch campaign...", words: 210,  date: "Mar 14" },
];

const CARD_CONTAINER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const CARD = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState<"7D" | "30D" | "3M">("30D");

  return (
    <>
      {/* Page heading */}
      <div className="mb-6">
        <h1
          style={{
            fontFamily: "Plus Jakarta Sans, sans-serif",
            fontWeight: 800,
            fontSize: "1.3rem",
            color: "#1C2033",
          }}
        >
          Dashboard
        </h1>
        <p className="mt-0.5 text-sm" style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}>
          Here&apos;s what&apos;s happening with your content today.
        </p>
      </div>

      {/* ── SECTION 1 — Stats cards ── */}
      <motion.div
        className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4"
        initial={false}
        animate="visible"
        variants={CARD_CONTAINER}
      >
        {/* Words Used */}
        <motion.div
          variants={CARD}
          whileHover={{ y: -2, transition: { duration: 0.15 } }}
          className="rounded-2xl bg-white p-5"
          style={{ border: "1.5px solid #F3F4F6", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
        >
          <span
            className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: "#F0EFFF" }}
          >
            <FileText className="h-5 w-5" style={{ color: "#6C63FF" }} />
          </span>
          <p className="mb-0.5 text-2xl font-extrabold" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "#1C2033" }}>
            12,480
          </p>
          <p className="mb-3 text-xs" style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}>
            Words Used
          </p>
          <div className="h-1.5 overflow-hidden rounded-full" style={{ background: "#F0EFFF" }}>
            <div className="h-full rounded-full" style={{ width: "25%", background: "#6C63FF" }} />
          </div>
          <p className="mt-1 text-xs" style={{ color: "#B0B4C4", fontFamily: "Inter, sans-serif" }}>
            12,480 / 50,000 words
          </p>
        </motion.div>

        {/* Generations Today */}
        <motion.div
          variants={CARD}
          whileHover={{ y: -2, transition: { duration: 0.15 } }}
          className="rounded-2xl bg-white p-5"
          style={{ border: "1.5px solid #F3F4F6", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
        >
          <span
            className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: "#ECFDF5" }}
          >
            <Sparkles className="h-5 w-5" style={{ color: "#059669" }} />
          </span>
          <p className="mb-0.5 text-2xl font-extrabold" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "#1C2033" }}>
            8
          </p>
          <p className="mb-3 text-xs" style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}>
            Generations Today
          </p>
          <span
            className="inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold"
            style={{ background: "#ECFDF5", color: "#059669", fontFamily: "Inter, sans-serif" }}
          >
            +3 vs yesterday
          </span>
        </motion.div>

        {/* Total Outputs */}
        <motion.div
          variants={CARD}
          whileHover={{ y: -2, transition: { duration: 0.15 } }}
          className="rounded-2xl bg-white p-5"
          style={{ border: "1.5px solid #F3F4F6", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
        >
          <span
            className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: "#FFF7ED" }}
          >
            <LayoutList className="h-5 w-5" style={{ color: "#D97706" }} />
          </span>
          <p className="mb-0.5 text-2xl font-extrabold" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "#1C2033" }}>
            143
          </p>
          <p className="mb-3 text-xs" style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}>
            Total Outputs
          </p>
          <span
            className="inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold"
            style={{ background: "#FFF7ED", color: "#D97706", fontFamily: "Inter, sans-serif" }}
          >
            All time
          </span>
        </motion.div>

        {/* Current Plan */}
        <motion.div
          variants={CARD}
          whileHover={{ y: -2, transition: { duration: 0.15 } }}
          className="rounded-2xl bg-white p-5"
          style={{ border: "1.5px solid #F3F4F6", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
        >
          <span
            className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: "#F5F3FF" }}
          >
            <Crown className="h-5 w-5" style={{ color: "#7C3AED" }} />
          </span>
          <p className="mb-0.5 text-2xl font-extrabold" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "#1C2033" }}>
            Starter
          </p>
          <p className="mb-3 text-xs" style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}>
            Current Plan
          </p>
          <Link
            href="/pricing"
            className="text-xs font-semibold no-underline"
            style={{ color: "#6C63FF", fontFamily: "Inter, sans-serif" }}
          >
            Upgrade →
          </Link>
        </motion.div>
      </motion.div>

      {/* ── SECTION 2 — Usage Overview Chart ── */}
      <motion.div
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-6 rounded-2xl bg-white p-6"
        style={{ border: "1.5px solid #F3F4F6", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
      >
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3
              className="text-base font-bold"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "#1C2033" }}
            >
              Usage Overview
            </h3>
            <p className="text-xs" style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}>
              Words generated &amp; credits remaining over time
            </p>
          </div>
          <div className="flex items-center gap-1">
            {(["7D", "30D", "3M"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className="rounded-lg px-3 py-1.5 text-xs font-semibold transition-all"
                style={{
                  background: timeRange === r ? "#6C63FF" : "transparent",
                  color: timeRange === r ? "#fff" : "#6B7280",
                  border: `1px solid ${timeRange === r ? "#6C63FF" : "#E5E7EB"}`,
                  cursor: "pointer",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={220}>
          <AreaChart
            data={CHART_DATA[timeRange]}
            margin={{ top: 5, right: 10, bottom: 0, left: -10 }}
          >
            <defs>
              <linearGradient id="wordsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#6C63FF" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#6C63FF" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="creditsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#A8A4F8" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#A8A4F8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: "#9CA3AF", fontFamily: "Inter, sans-serif" }}
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#9CA3AF", fontFamily: "Inter, sans-serif" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) =>
                v >= 1000 ? `${(v / 1000).toFixed(0)}k` : `${v}`
              }
            />
            <Tooltip
              contentStyle={{
                background: "#fff",
                border: "1.5px solid #E5E7EB",
                borderRadius: 12,
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                fontFamily: "Inter, sans-serif",
                fontSize: 12,
              }}
              labelStyle={{ color: "#1C2033", fontWeight: 600, marginBottom: 4 }}
            />
            <Area
              type="monotone"
              dataKey="words"
              name="Words Generated"
              stroke="#6C63FF"
              strokeWidth={2}
              fill="url(#wordsGrad)"
              dot={false}
              activeDot={{ r: 4, fill: "#6C63FF" }}
            />
            <Area
              type="monotone"
              dataKey="credits"
              name="Credits Remaining"
              stroke="#A8A4F8"
              strokeWidth={2}
              fill="url(#creditsGrad)"
              dot={false}
              activeDot={{ r: 4, fill: "#A8A4F8" }}
            />
          </AreaChart>
        </ResponsiveContainer>

        <div className="mt-4 flex items-center gap-5">
          {[
            { color: "#6C63FF", label: "Words Generated" },
            { color: "#A8A4F8", label: "Credits Remaining" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-sm" style={{ background: l.color }} />
              <span className="text-xs" style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}>
                {l.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── SECTION 3 — Quick Tools strip ── */}
      <div
        className="mb-6 rounded-2xl bg-white p-5"
        style={{ border: "1.5px solid #F3F4F6", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
      >
        <div className="mb-4 flex items-center gap-2">
          <Wand2 className="h-4 w-4" style={{ color: "#6C63FF" }} />
          <h3
            className="text-sm font-bold"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "#1C2033" }}
          >
            Start Creating
          </h3>
        </div>
        <motion.div
          className="flex gap-2 overflow-x-auto pb-1"
          style={{ scrollbarWidth: "none" }}
          initial={false}
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
        >
          {QUICK_TOOLS.map(({ emoji, label, path }) => (
            <motion.div
              key={label}
              variants={{ hidden: { opacity: 0, x: -15 }, visible: { opacity: 1, x: 0, transition: { duration: 0.2 } } }}
            >
              <Link
                href={path}
                className="flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold no-underline transition-all duration-150"
                style={{
                  border: "1.5px solid #D4D0FF",
                  color: "#6C63FF",
                  background: "#fff",
                  fontFamily: "Inter, sans-serif",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#6C63FF";
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.borderColor = "#6C63FF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#fff";
                  e.currentTarget.style.color = "#6C63FF";
                  e.currentTarget.style.borderColor = "#D4D0FF";
                }}
              >
                <span>{emoji}</span>
                {label}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── SECTION 4 — Recent Generations table ── */}
      <div
        className="mb-6 overflow-hidden rounded-2xl bg-white"
        style={{ border: "1.5px solid #F3F4F6", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
      >
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: "1px solid #F3F4F6" }}
        >
          <h3
            className="text-base font-bold"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "#1C2033" }}
          >
            Recent Generations
          </h3>
          <Link
            href="/history"
            className="flex items-center gap-1 text-xs font-semibold no-underline"
            style={{ color: "#6C63FF", fontFamily: "Inter, sans-serif" }}
          >
            View All <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #F9FAFB", background: "#FAFBFF" }}>
                {["Tool", "Preview", "Words", "Date", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif", letterSpacing: "0.06em" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT.map((row, i) => (
                <tr
                  key={row.id}
                  style={{
                    borderBottom: i < RECENT.length - 1 ? "1px solid #F9FAFB" : "none",
                  }}
                >
                  <td className="px-5 py-3.5">
                    <span
                      className="inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold"
                      style={{
                        background: row.toolBg,
                        color: row.toolColor,
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      {row.tool}
                    </span>
                  </td>
                  <td className="max-w-[200px] px-5 py-3.5">
                    <span
                      className="block truncate text-sm italic"
                      style={{ color: "#6B7280", fontFamily: "Inter, sans-serif" }}
                    >
                      {row.preview}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className="text-sm"
                      style={{ color: "#1C2033", fontFamily: "monospace", fontWeight: 500 }}
                    >
                      {row.words.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs" style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}>
                      {row.date}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toast.success("Copied to clipboard!")}
                        className="flex h-7 w-7 items-center justify-center rounded-lg transition-colors"
                        style={{ background: "#F3F4F6", border: "none", cursor: "pointer" }}
                        title="Copy"
                        onMouseEnter={(e) => { e.currentTarget.style.background = "#F0EFFF"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "#F3F4F6"; }}
                      >
                        <Copy className="h-3.5 w-3.5" style={{ color: "#6C63FF" }} />
                      </button>
                      <button
                        className="flex h-7 w-7 items-center justify-center rounded-lg transition-colors"
                        style={{ background: "#F3F4F6", border: "none", cursor: "pointer" }}
                        title="View"
                        onMouseEnter={(e) => { e.currentTarget.style.background = "#F0EFFF"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "#F3F4F6"; }}
                      >
                        <Eye className="h-3.5 w-3.5" style={{ color: "#6C63FF" }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── SECTION 5 — Credits / Upgrade banner ── */}
      <div
        className="flex flex-col gap-5 rounded-2xl bg-white p-5 sm:flex-row sm:items-center"
        style={{
          borderLeft: "4px solid #6C63FF",
          borderTop: "1.5px solid #F3F4F6",
          borderRight: "1.5px solid #F3F4F6",
          borderBottom: "1.5px solid #F3F4F6",
          borderRadius: "16px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex-1">
          <div className="mb-1.5 flex items-center gap-2">
            <Zap className="h-5 w-5" style={{ color: "#6C63FF" }} fill="#6C63FF" />
            <span
              className="text-sm font-bold"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "#1C2033" }}
            >
              You&apos;re on the Starter Plan
            </span>
          </div>
          <p className="mb-3 text-xs" style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}>
            12,480 of 50,000 words used this month
          </p>
          <div className="h-2 overflow-hidden rounded-full" style={{ background: "#F0EFFF" }}>
            <div className="h-full rounded-full" style={{ width: "25%", background: "#6C63FF" }} />
          </div>
        </div>
        <motion.button
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex shrink-0 items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{
            background: "#6C63FF",
            border: "none",
            cursor: "pointer",
            fontFamily: "Inter, sans-serif",
          }}
        >
          <Zap className="h-4 w-4" />
          Upgrade to Pro →
        </motion.button>
      </div>
    </>
  );
}
