"use client";
import { useState, useRef, type ReactNode } from "react";
import { useSession } from "next-auth/react";
import {
  ArrowLeft, Sparkles, Copy, Download, RefreshCw,
  ChevronDown, Wand2, Loader2, Check,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

/* ─── Constants ─────────────────────────────────────────── */

const TONES = ["Professional", "Casual", "Friendly", "Formal", "Persuasive"];
const STYLES = ["How-to Guide", "Listicle", "Opinion", "Tutorial", "News Article"];
const AUDIENCES = ["General", "Beginners", "Professionals", "Experts"];
const LENGTHS = [
  { label: "Short (~500w)", value: "short" },
  { label: "Medium (~1000w)", value: "medium" },
  { label: "Long (~1500w)", value: "long" },
];
const LANGUAGES = ["English", "Spanish", "French", "German", "Urdu"];

/* ─── Inline Dropdown ─────────────────────────────────── */

function Dropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-sm font-medium"
        style={{ color: "#374151", fontFamily: "Inter, sans-serif" }}
      >
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center justify-between rounded-lg border px-3.5 py-2.5 text-sm transition-all"
          style={{
            borderColor: open ? "#6C63FF" : "#E5E7EB",
            boxShadow: open ? "0 0 0 3px rgba(108,99,255,0.1)" : "none",
            color: "#1C2033",
            background: "#fff",
            fontFamily: "Inter, sans-serif",
            cursor: "pointer",
          }}
        >
          {value}
          <ChevronDown
            className="h-4 w-4 transition-transform duration-150"
            style={{ color: "#9CA3AF", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.12 }}
              className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-xl"
              style={{
                background: "#fff",
                border: "1.5px solid #E5E7EB",
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
              }}
            >
              {options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => { onChange(opt); setOpen(false); }}
                  className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors hover:bg-[#F0EFFF]"
                  style={{
                    color: opt === value ? "#6C63FF" : "#374151",
                    background: opt === value ? "#F0EFFF" : "transparent",
                    fontWeight: opt === value ? 600 : 400,
                    fontFamily: "Inter, sans-serif",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {opt}
                  {opt === value && <Check className="h-3.5 w-3.5" style={{ color: "#6C63FF" }} />}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Lightweight Markdown Renderer ──────────────────────── */

function processInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**"))
      return <strong key={i} style={{ fontWeight: 700, color: "#1C2033" }}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("*") && part.endsWith("*"))
      return <em key={i}>{part.slice(1, -1)}</em>;
    if (part.startsWith("`") && part.endsWith("`"))
      return (
        <code
          key={i}
          style={{
            background: "#F0EFFF",
            color: "#6C63FF",
            padding: "1px 6px",
            borderRadius: 4,
            fontSize: "0.83em",
            fontFamily: "monospace",
          }}
        >
          {part.slice(1, -1)}
        </code>
      );
    return part;
  });
}

function MarkdownRender({ text }: { text: string }) {
  const lines = text.split("\n");
  const nodes: ReactNode[] = [];
  let listBuffer: ReactNode[] = [];
  let listType: "ul" | "ol" | null = null;

  const flushList = (key: string) => {
    if (!listBuffer.length) return;
    nodes.push(
      listType === "ul" ? (
        <ul key={key} style={{ margin: "0.4rem 0 0.75rem 1.4rem", listStyleType: "disc" }}>
          {listBuffer}
        </ul>
      ) : (
        <ol key={key} style={{ margin: "0.4rem 0 0.75rem 1.4rem", listStyleType: "decimal" }}>
          {listBuffer}
        </ol>
      ),
    );
    listBuffer = [];
    listType = null;
  };

  lines.forEach((line, i) => {
    const k = String(i);
    const isUL = /^[*-] /.test(line);
    const isOL = /^\d+\. /.test(line);

    if (!isUL && !isOL) flushList(`fl-${k}`);

    if (line.startsWith("# ")) {
      nodes.push(
        <h1
          key={k}
          style={{
            fontFamily: "Plus Jakarta Sans, sans-serif",
            fontWeight: 800,
            fontSize: "1.5rem",
            color: "#1C2033",
            margin: "1.5rem 0 0.65rem",
            lineHeight: 1.3,
          }}
        >
          {processInline(line.slice(2))}
        </h1>,
      );
    } else if (line.startsWith("## ")) {
      nodes.push(
        <h2
          key={k}
          style={{
            fontFamily: "Plus Jakarta Sans, sans-serif",
            fontWeight: 700,
            fontSize: "1.15rem",
            color: "#1C2033",
            margin: "1.3rem 0 0.5rem",
            paddingBottom: "0.3rem",
            borderBottom: "1px solid #F3F4F6",
          }}
        >
          {processInline(line.slice(3))}
        </h2>,
      );
    } else if (line.startsWith("### ")) {
      nodes.push(
        <h3
          key={k}
          style={{
            fontFamily: "Plus Jakarta Sans, sans-serif",
            fontWeight: 600,
            fontSize: "1rem",
            color: "#374151",
            margin: "1rem 0 0.35rem",
          }}
        >
          {processInline(line.slice(4))}
        </h3>,
      );
    } else if (isUL) {
      if (listType !== "ul") { flushList(`fl-${k}`); listType = "ul"; }
      listBuffer.push(
        <li
          key={k}
          style={{
            color: "#374151",
            fontFamily: "Inter, sans-serif",
            fontSize: "0.9rem",
            lineHeight: 1.75,
            marginBottom: "0.2rem",
          }}
        >
          {processInline(line.replace(/^[*-] /, ""))}
        </li>,
      );
    } else if (isOL) {
      if (listType !== "ol") { flushList(`fl-${k}`); listType = "ol"; }
      listBuffer.push(
        <li
          key={k}
          style={{
            color: "#374151",
            fontFamily: "Inter, sans-serif",
            fontSize: "0.9rem",
            lineHeight: 1.75,
            marginBottom: "0.2rem",
          }}
        >
          {processInline(line.replace(/^\d+\. /, ""))}
        </li>,
      );
    } else if (line.trim() === "") {
      nodes.push(<div key={k} style={{ height: "0.55rem" }} />);
    } else {
      nodes.push(
        <p
          key={k}
          style={{
            color: "#374151",
            fontFamily: "Inter, sans-serif",
            fontSize: "0.9rem",
            lineHeight: 1.85,
            marginBottom: "0.5rem",
          }}
        >
          {processInline(line)}
        </p>,
      );
    }
  });

  flushList("fl-end");
  return <div>{nodes}</div>;
}

/* ─── Focus-ring helper ────────────────────────────────── */

const focusRing = {
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = "#6C63FF";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(108,99,255,0.1)";
  },
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = "#E5E7EB";
    e.currentTarget.style.boxShadow = "none";
  },
};

/* ─── Page ─────────────────────────────────────────────── */

export default function BlogWriterPage() {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState("Professional");
  const [style, setStyle] = useState("How-to Guide");
  const [audience, setAudience] = useState("General");
  const [length, setLength] = useState("medium");
  const [language, setLanguage] = useState("English");
  const [generating, setGenerating] = useState(false);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const credits = session?.user?.credits;
  const creditsRemaining = credits ? Math.max(0, credits.total - credits.used) : null;

  const wordCount = output.trim() ? output.trim().split(/\s+/).filter(Boolean).length : 0;
  const charCount = output.length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  /* ── Generate ── */
  const generate = async () => {
    if (!title.trim() || generating) return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setGenerating(true);
    setOutput("");

    try {
      const res = await fetch("/api/generate/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, keywords, tone, style, audience, length, language }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const err = (await res.json()) as { error?: string };
        toast.error(err.error ?? "Generation failed. Please try again.");
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No readable stream");

      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        setOutput((prev) => prev + decoder.decode(value, { stream: true }));
      }

      toast.success("Blog post generated successfully!");
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setGenerating(false);
    }
  };

  /* ── Copy ── */
  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 1500);
  };

  /* ── Download ── */
  const download = () => {
    const filename = title
      .slice(0, 50)
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .trim()
      .replace(/\s+/g, "-") || "blog-post";
    const blob = new Blob([output], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.md`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded as Markdown!");
  };

  const canGenerate = title.trim().length > 0 && !generating;

  return (
    <>
      {/* ── Top bar ── */}
      <div className="mb-6 flex items-center gap-3">
        <Link
          href="/dashboard/tools"
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

      {/* ── Two-column layout ── */}
      <div className="flex gap-5" style={{ minHeight: "calc(100vh - 180px)" }}>

        {/* ── LEFT: Input form ── */}
        <div
          className="flex w-90 shrink-0 flex-col gap-4 rounded-2xl bg-white p-6"
          style={{ border: "1.5px solid #F3F4F6", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", alignSelf: "start" }}
        >
          {/* Panel header */}
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

          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-sm font-medium"
              style={{ color: "#374151", fontFamily: "Inter, sans-serif" }}
            >
              Blog Post Title <span style={{ color: "#EF4444" }}>*</span>
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
              {...focusRing}
            />
          </div>

          {/* Keywords */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label
                className="text-sm font-medium"
                style={{ color: "#374151", fontFamily: "Inter, sans-serif" }}
              >
                Target Keywords
              </label>
              <span className="text-xs" style={{ color: "#B0B4C4", fontFamily: "Inter, sans-serif" }}>
                optional · SEO boost
              </span>
            </div>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="e.g. AI writing tools, content marketing"
              className="rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-all"
              style={{
                borderColor: "#E5E7EB",
                color: "#1C2033",
                fontFamily: "Inter, sans-serif",
                background: "#fff",
              }}
              {...focusRing}
            />
          </div>

          {/* Style + Audience dropdowns */}
          <Dropdown label="Blog Style" value={style} options={STYLES} onChange={setStyle} />
          <Dropdown label="Target Audience" value={audience} options={AUDIENCES} onChange={setAudience} />
          <Dropdown label="Tone of Voice" value={tone} options={TONES} onChange={setTone} />

          {/* Word Count pills */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-sm font-medium"
              style={{ color: "#374151", fontFamily: "Inter, sans-serif" }}
            >
              Word Count
            </label>
            <div className="flex gap-2">
              {LENGTHS.map((l) => (
                <button
                  key={l.value}
                  type="button"
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
            <label
              className="text-sm font-medium"
              style={{ color: "#374151", fontFamily: "Inter, sans-serif" }}
            >
              Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-all"
              style={{
                borderColor: "#E5E7EB",
                color: "#1C2033",
                fontFamily: "Inter, sans-serif",
                background: "#fff",
                cursor: "pointer",
              }}
            >
              {LANGUAGES.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>

          {/* Generate button */}
          <button
            type="button"
            onClick={generate}
            disabled={!canGenerate}
            className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white transition-all"
            style={{
              background: canGenerate ? "#6C63FF" : "#A5B4FC",
              border: "none",
              cursor: canGenerate ? "pointer" : "not-allowed",
              fontFamily: "Inter, sans-serif",
              boxShadow: canGenerate ? "0 4px 16px rgba(108,99,255,0.35)" : "none",
            }}
          >
            {generating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                ✨ Generate Blog Post
              </>
            )}
          </button>

          {/* Credits */}
          <p
            className="text-center text-xs"
            style={{ color: "#B0B4C4", fontFamily: "Inter, sans-serif" }}
          >
            {creditsRemaining !== null
              ? `${creditsRemaining.toLocaleString()} credits remaining`
              : "Loading credits..."}
          </p>
        </div>

        {/* ── RIGHT: Output panel ── */}
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
              {output && !generating && (
                <span
                  className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                  style={{ background: "#ECFDF5", color: "#059669", fontFamily: "Inter, sans-serif" }}
                >
                  {wordCount.toLocaleString()} words
                </span>
              )}
              {generating && (
                <span
                  className="flex items-center gap-1.5 text-xs"
                  style={{ color: "#6C63FF", fontFamily: "Inter, sans-serif" }}
                >
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#6C63FF]" />
                  AI is writing...
                </span>
              )}
            </div>

            {output && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
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
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied!" : "Copy"}
                </button>
                <button
                  type="button"
                  onClick={download}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-[#F0EFFF]"
                  style={{
                    background: "#F3F4F6",
                    color: "#6B7280",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  <Download className="h-3.5 w-3.5" />
                  Export .md
                </button>
                <button
                  type="button"
                  onClick={generate}
                  disabled={generating}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-[#F0EFFF]"
                  style={{
                    background: "#F3F4F6",
                    color: "#6B7280",
                    border: "none",
                    cursor: generating ? "not-allowed" : "pointer",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Regenerate
                </button>
              </div>
            )}
          </div>

          {/* Output body */}
          <div className="flex-1 overflow-y-auto p-6">
            <AnimatePresence mode="wait">
              {!output && !generating ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex h-full flex-col items-center justify-center py-20 text-center"
                >
                  <div
                    className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl"
                    style={{ background: "#F0EFFF" }}
                  >
                    <Wand2 className="h-8 w-8" style={{ color: "#6C63FF" }} />
                  </div>
                  <h3
                    className="mb-2 text-base font-bold"
                    style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "#1C2033" }}
                  >
                    Your output will appear here
                  </h3>
                  <p
                    className="mb-8 text-sm"
                    style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}
                  >
                    Fill in the form and click Generate.
                  </p>
                  <div className="w-full max-w-md space-y-2.5 opacity-25">
                    {[85, 100, 70, 95, 60, 88, 50].map((w, i) => (
                      <div
                        key={i}
                        className="h-3 animate-pulse rounded-full"
                        style={{ width: `${w}%`, background: "#E8E6FF" }}
                      />
                    ))}
                  </div>
                </motion.div>
              ) : generating && !output ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                  <div className="w-full max-w-md space-y-2.5">
                    {[90, 75, 100, 55, 82].map((w, i) => (
                      <div
                        key={i}
                        className="h-4 animate-pulse rounded-full"
                        style={{ width: `${w}%`, background: "#E8E6FF" }}
                      />
                    ))}
                  </div>
                  <motion.div
                    className="mt-6 flex items-center gap-2 text-sm font-semibold"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.4 }}
                    style={{ color: "#6C63FF", fontFamily: "Inter, sans-serif" }}
                  >
                    <Loader2 className="h-4 w-4 animate-spin" />
                    ✨ AI is writing your blog post...
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="output"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <MarkdownRender text={output} />
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
              <div className="flex items-center gap-4">
                <span className="text-xs" style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}>
                  {wordCount.toLocaleString()} words
                </span>
                <span className="text-xs" style={{ color: "#B0B4C4", fontFamily: "Inter, sans-serif" }}>
                  {charCount.toLocaleString()} characters
                </span>
              </div>
              <span className="text-xs" style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}>
                ~{readingTime} min read
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
