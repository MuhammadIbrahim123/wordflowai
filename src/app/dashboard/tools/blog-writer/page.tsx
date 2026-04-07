"use client";
import React from "react";
import { useState } from "react";
import { DashboardLayout } from "../../../components/DashboardLayout";
import { ArrowLeft, Sparkles, Copy, Download, RefreshCw, ChevronDown, Wand2 } from "lucide-react";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const TONES = ["Professional", "Casual", "Friendly", "Formal", "Persuasive"];
const LENGTHS = [
  { label: "Short (~500w)", value: "short" },
  { label: "Medium (~1000w)", value: "medium" },
  { label: "Long (~1500w)", value: "long" },
];

const SAMPLE = `# 10 Tips to Grow Your Business with AI Writing Tools

Artificial intelligence is no longer a distant concept — it's a practical tool that forward-thinking businesses are using right now to scale their content production, reduce costs, and stay ahead of the competition.

## 1. Start with a Clear Content Strategy

Before you begin generating AI content, define what you want to achieve. Are you focused on SEO traffic? Lead generation? Brand awareness? A clear goal ensures every piece of AI-generated content serves a specific purpose.

## 2. Use AI for First Drafts, Not Final Copies

The most effective workflow treats AI as a collaborative partner. Use it to generate a solid first draft in seconds, then refine the voice, add personal insights, and ensure accuracy before publishing.

## 3. Leverage SEO-Optimized Blog Posts

AI tools like WordFlowAI are trained to write blog posts optimized for search engines. By simply providing a title and target keywords, you can get a fully structured, 1,000+ word post that's ready to rank.

## 4. Scale Your Product Descriptions

If you manage an eCommerce store with hundreds of products, writing individual descriptions is time-consuming. AI can generate compelling, conversion-focused descriptions in bulk — saving you dozens of hours every month.`;

export default function BlogWriterPage() {
  const [title, setTitle] = useState("");
  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState("Professional");
  const [length, setLength] = useState("medium");
  const [showTone, setShowTone] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const wordCount = output.trim().split(/\s+/).filter(Boolean).length;
  const charCount = output.length;

  const generate = () => {
    if (!title.trim()) return;
    setGenerating(true);
    setOutput("");
    let i = 0;
    const iv = setInterval(() => {
      setOutput(SAMPLE.slice(0, i));
      i += 12;
      if (i > SAMPLE.length) {
        setOutput(SAMPLE);
        setGenerating(false);
        clearInterval(iv);
      }
    }, 16);
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard!");
  };

  return (
    <DashboardLayout title="Blog Post Writer">
      {/* Top bar */}
      <div className="mb-6 flex items-center gap-3">
        <Link
          href="/tools"
          className="flex h-8 w-8 items-center justify-center rounded-lg no-underline transition-colors hover:bg-[#F0EFFF]"
          style={{ border: "1px solid #E5E7EB" }}
        >
          <ArrowLeft className="h-4 w-4" style={{ color: "#6C63FF" }} />
        </Link>
        <h2
          className="text-base font-bold"
          style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "#1C2033" }}
        >
          Blog Post Writer
        </h2>
        <span
          className="rounded-full px-3 py-0.5 text-xs font-semibold"
          style={{ background: "#F0EFFF", color: "#6C63FF", fontFamily: "Inter, sans-serif" }}
        >
          ✨ AI Powered
        </span>
      </div>

      <div className="flex h-full gap-5">
        {/* LEFT: Input form */}
        <div
          className="flex w-[380px] flex-shrink-0 flex-col gap-5 rounded-2xl bg-white p-6"
          style={{ border: "1.5px solid #F3F4F6", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
        >
          {/* Header */}
          <div className="flex items-center gap-2">
            <span className="text-lg">✍️</span>
            <span
              className="text-sm font-bold"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "#1C2033" }}
            >
              Blog Post Writer
            </span>
            <span
              className="rounded-full px-2 py-0.5 text-xs font-semibold"
              style={{ background: "#F0EFFF", color: "#6C63FF" }}
            >
              AI Powered
            </span>
          </div>

          {/* Fields */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium" style={{ color: "#374151", fontFamily: "Inter, sans-serif" }}>
                Blog Post Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. 10 Tips to Grow Your Business with AI"
                className="rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-all"
                style={{
                  borderColor: "#E5E7EB",
                  color: "#1C2033",
                  fontFamily: "Inter, sans-serif",
                  background: "#fff",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#6C63FF";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(108,99,255,0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#E5E7EB";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium" style={{ color: "#374151", fontFamily: "Inter, sans-serif" }}>
                Target Keywords
              </label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="e.g. AI writing tools, content marketing"
                className="rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-all"
                style={{ borderColor: "#E5E7EB", color: "#1C2033", fontFamily: "Inter, sans-serif", background: "#fff" }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#6C63FF";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(108,99,255,0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#E5E7EB";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Tone dropdown */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium" style={{ color: "#374151", fontFamily: "Inter, sans-serif" }}>
                Tone of Voice
              </label>
              <div className="relative">
                <button
                  onClick={() => setShowTone(!showTone)}
                  className="flex w-full items-center justify-between rounded-lg border px-3.5 py-2.5 text-sm"
                  style={{ borderColor: "#E5E7EB", color: "#1C2033", background: "#fff", fontFamily: "Inter, sans-serif", cursor: "pointer" }}
                >
                  {tone}
                  <ChevronDown className="h-4 w-4" style={{ color: "#9CA3AF" }} />
                </button>
                {showTone && (
                  <div
                    className="absolute left-0 right-0 top-full z-10 mt-1 overflow-hidden rounded-xl"
                    style={{ background: "#fff", border: "1.5px solid #E5E7EB", boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}
                  >
                    {TONES.map((t) => (
                      <button
                        key={t}
                        onClick={() => { setTone(t); setShowTone(false); }}
                        className="block w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-[#F0EFFF]"
                        style={{
                          color: t === tone ? "#6C63FF" : "#374151",
                          background: t === tone ? "#F0EFFF" : "transparent",
                          fontWeight: t === tone ? 600 : 400,
                          fontFamily: "Inter, sans-serif",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Word count pills */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium" style={{ color: "#374151", fontFamily: "Inter, sans-serif" }}>
                Word Count
              </label>
              <div className="flex gap-2">
                {LENGTHS.map((l) => (
                  <button
                    key={l.value}
                    onClick={() => setLength(l.value)}
                    className="flex-1 rounded-lg border py-2 text-xs font-semibold transition-all"
                    style={{
                      background: length === l.value ? "#6C63FF" : "#fff",
                      borderColor: length === l.value ? "#6C63FF" : "#E5E7EB",
                      color: length === l.value ? "#fff" : "#6B7280",
                      fontFamily: "Inter, sans-serif",
                      cursor: "pointer",
                    }}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Language */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium" style={{ color: "#374151", fontFamily: "Inter, sans-serif" }}>
                Language
              </label>
              <select
                className="rounded-lg border px-3.5 py-2.5 text-sm outline-none"
                style={{ borderColor: "#E5E7EB", color: "#1C2033", fontFamily: "Inter, sans-serif", background: "#fff" }}
              >
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
                <option>Urdu</option>
              </select>
            </div>
          </div>

          {/* Generate button */}
          <button
            onClick={generate}
            disabled={generating || !title.trim()}
            className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white transition-opacity"
            style={{
              background: generating || !title.trim() ? "#A5B4FC" : "#6C63FF",
              border: "none",
              cursor: generating || !title.trim() ? "not-allowed" : "pointer",
              fontFamily: "Inter, sans-serif",
              boxShadow: generating || !title.trim() ? "none" : "0 4px 16px rgba(108,99,255,0.35)",
            }}
          >
            {generating ? (
              <><LoaderCircle className="h-4 w-4 animate-spin" /> Generating...</>
            ) : (
              <><Sparkles className="h-4 w-4" /> ✨ Generate Blog Post</>
            )}
          </button>

          <p className="text-center text-xs" style={{ color: "#B0B4C4", fontFamily: "Inter, sans-serif" }}>
            Credits remaining: 37,520 words
          </p>
        </div>

        {/* RIGHT: Output */}
        <div
          className="flex flex-1 flex-col rounded-2xl bg-white"
          style={{ border: "1.5px solid #F3F4F6", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
        >
          {/* Output header */}
          <div
            className="flex items-center justify-between px-6 py-4"
            style={{ borderBottom: "1px solid #F3F4F6" }}
          >
            <div className="flex items-center gap-3">
              <span
                className="text-sm font-bold"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "#1C2033" }}
              >
                Generated Output
              </span>
              {output && (
                <span
                  className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                  style={{ background: "#ECFDF5", color: "#059669", fontFamily: "Inter, sans-serif" }}
                >
                  {wordCount} words
                </span>
              )}
              {generating && (
                <span className="flex items-center gap-1.5 text-xs" style={{ color: "#6C63FF", fontFamily: "Inter, sans-serif" }}>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#6C63FF] animate-pulse" />
                  AI is writing your blog post...
                </span>
              )}
            </div>
            {output && (
              <div className="flex items-center gap-2">
                <button
                  onClick={copy}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors"
                  style={{
                    background: copied ? "#ECFDF5" : "#F0EFFF",
                    color: copied ? "#059669" : "#6C63FF",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  <Copy className="h-3.5 w-3.5" />
                  {copied ? "Copied!" : "Copy"}
                </button>
                <button
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold"
                  style={{ background: "#F3F4F6", color: "#6B7280", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif" }}
                >
                  <Download className="h-3.5 w-3.5" />
                  Export
                </button>
                <button
                  onClick={generate}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold"
                  style={{ background: "#F3F4F6", color: "#6B7280", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif" }}
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Regenerate
                </button>
              </div>
            )}
          </div>

          {/* Output content */}
          <div className="flex-1 overflow-y-auto p-6">
            <AnimatePresence mode="wait">
              {!output && !generating ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex h-full flex-col items-center justify-center py-20 text-center"
                >
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: "#F0EFFF" }}>
                    <Wand2 className="h-8 w-8" style={{ color: "#6C63FF" }} />
                  </div>
                  <h3
                    className="mb-2 text-base font-bold"
                    style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "#1C2033" }}
                  >
                    Your output will appear here
                  </h3>
                  <p className="text-sm" style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}>
                    Fill in the form and click Generate.
                  </p>
                  <div className="mt-8 w-full max-w-md space-y-2 opacity-30">
                    {[80, 100, 65, 95, 75, 90, 55].map((w, i) => (
                      <div key={i} className="h-3 rounded animate-pulse" style={{ width: `${w}%`, background: "#E8E6FF" }} />
                    ))}
                  </div>
                </motion.div>
              ) : generating && !output ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                  <div className="mb-4 space-y-2 w-full max-w-md">
                    {[90, 75, 100, 60, 80].map((w, i) => (
                      <div key={i} className="h-4 rounded animate-pulse" style={{ width: `${w}%`, background: "#E8E6FF" }} />
                    ))}
                  </div>
                  <motion.div
                    className="mt-4 flex items-center gap-2 text-sm font-semibold"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    style={{ color: "#6C63FF", fontFamily: "Inter, sans-serif" }}
                  >
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    ✨ AI is writing...
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="output"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="prose max-w-none"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem", color: "#374151", lineHeight: 1.85, whiteSpace: "pre-wrap" }}
                >
                  {output}
                  {generating && (
                    <span
                      className="ml-0.5 inline-block h-4 w-0.5 animate-pulse rounded"
                      style={{ background: "#6C63FF", verticalAlign: "middle" }}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Status bar */}
          {output && (
            <div
              className="flex items-center justify-between px-6 py-3"
              style={{ borderTop: "1px solid #F3F4F6" }}
            >
              <span className="text-xs" style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}>
                {wordCount} words
              </span>
              <span className="text-xs" style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}>
                {charCount.toLocaleString()} characters
              </span>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}