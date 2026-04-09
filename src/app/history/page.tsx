"use client";
import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Eye, Trash2, Search, Filter } from "lucide-react";
import { DashboardLayout } from "../components/DashboardLayout";
import { toast } from "sonner";

const ALL_HISTORY = [
  { id: "1",  tool: "Blog Writer",   toolColor: "#6C63FF", toolBg: "#F0EFFF", title: "10 Ways AI Is Changing Content Marketing in 2026", words: 1240, date: "Mar 17, 2026", time: "10:32 AM" },
  { id: "2",  tool: "Headlines",     toolColor: "#7C3AED", toolBg: "#F5F3FF", title: "12 powerful subject lines for Q1 email blast campaign", words: 320,  date: "Mar 17, 2026", time: "09:15 AM" },
  { id: "3",  tool: "Paraphraser",   toolColor: "#0891B2", toolBg: "#ECFEFF", title: "SaaS landing page hero copy — revised and SEO-optimized version", words: 580,  date: "Mar 16, 2026", time: "04:48 PM" },
  { id: "4",  tool: "Product Desc",  toolColor: "#059669", toolBg: "#ECFDF5", title: "WordFlowAI Starter plan product description for AppSumo listing", words: 420,  date: "Mar 15, 2026", time: "11:20 AM" },
  { id: "5",  tool: "Tone Changer",  toolColor: "#D97706", toolBg: "#FFFBEB", title: "Social media captions for Spring product launch — casual tone", words: 210,  date: "Mar 14, 2026", time: "02:05 PM" },
  { id: "6",  tool: "Blog Writer",   toolColor: "#6C63FF", toolBg: "#F0EFFF", title: "The Ultimate Guide to Email Marketing for SaaS Companies", words: 1560, date: "Mar 13, 2026", time: "09:44 AM" },
  { id: "7",  tool: "SEO Meta",      toolColor: "#DB2777", toolBg: "#FDF2F8", title: "Meta titles and descriptions for 15 product pages", words: 480,  date: "Mar 12, 2026", time: "03:30 PM" },
  { id: "8",  tool: "Email Writer",  toolColor: "#6C63FF", toolBg: "#F0EFFF", title: "Follow-up email sequence — 5 part lead nurture series", words: 740,  date: "Mar 11, 2026", time: "10:10 AM" },
  { id: "9",  tool: "Headlines",     toolColor: "#7C3AED", toolBg: "#F5F3FF", title: "10 headline ideas for the WordFlowAI blog feature launch", words: 290,  date: "Mar 10, 2026", time: "01:55 PM" },
  { id: "10", tool: "Blog Writer",   toolColor: "#6C63FF", toolBg: "#F0EFFF", title: "How to Write Product Descriptions That Convert: A Complete Guide", words: 1380, date: "Mar 9, 2026",  time: "11:30 AM" },
];

const TOOL_FILTERS = ["All Tools", "Blog Writer", "Headlines", "Paraphraser", "Tone Changer", "Product Desc", "SEO Meta", "Email Writer"];

export default function HistoryPage() {
  const [toolFilter, setToolFilter] = useState("All Tools");
  const [query, setQuery] = useState("");

  const filtered = ALL_HISTORY.filter((h) => {
    const matchTool = toolFilter === "All Tools" || h.tool === toolFilter;
    const matchSearch =
      query === "" || h.title.toLowerCase().includes(query.toLowerCase());
    return matchTool && matchSearch;
  });

  return (
    <DashboardLayout>
      {/* Heading */}
      <div className="mb-6">
        <h1
          style={{
            fontFamily: "Plus Jakarta Sans, sans-serif",
            fontWeight: 800,
            fontSize: "1.3rem",
            color: "#1C2033",
          }}
        >
          Generation History
        </h1>
        <p className="mt-0.5 text-sm" style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}>
          All your past AI-generated content in one place.
        </p>
      </div>

      {/* Search + Filter row */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div
          className="flex items-center gap-2 rounded-xl px-4 py-2.5"
          style={{ background: "#fff", border: "1.5px solid #E5E7EB", maxWidth: 360, flex: 1 }}
        >
          <Search className="h-4 w-4 shrink-0" style={{ color: "#9CA3AF" }} />
          <input
            type="text"
            placeholder="Search history..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: "#1C2033", fontFamily: "Inter, sans-serif" }}
          />
        </div>

        <div
          className="flex items-center gap-2 rounded-xl px-3 py-2.5"
          style={{ background: "#fff", border: "1.5px solid #E5E7EB" }}
        >
          <Filter className="h-4 w-4" style={{ color: "#9CA3AF" }} />
          <select
            value={toolFilter}
            onChange={(e) => setToolFilter(e.target.value)}
            className="bg-transparent text-sm outline-none"
            style={{ color: "#374151", fontFamily: "Inter, sans-serif", cursor: "pointer" }}
          >
            {TOOL_FILTERS.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>
        </div>

        <span className="text-sm" style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}>
          {filtered.length} result{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Table */}
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden rounded-2xl bg-white"
        style={{ border: "1.5px solid #F3F4F6", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #F9FAFB", background: "#FAFBFF" }}>
                {["Tool", "Title / Preview", "Words", "Date & Time", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif", letterSpacing: "0.06em" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => (
                <motion.tr
                  key={row.id}
                  initial={false}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  style={{
                    borderBottom: i < filtered.length - 1 ? "1px solid #F9FAFB" : "none",
                  }}
                >
                  <td className="px-5 py-3.5">
                    <span
                      className="inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold"
                      style={{ background: row.toolBg, color: row.toolColor, fontFamily: "Inter, sans-serif" }}
                    >
                      {row.tool}
                    </span>
                  </td>
                  <td className="max-w-[300px] px-5 py-3.5">
                    <span
                      className="block truncate text-sm"
                      style={{ color: "#1C2033", fontFamily: "Inter, sans-serif", fontWeight: 500 }}
                    >
                      {row.title}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className="text-sm"
                      style={{ color: "#374151", fontFamily: "monospace", fontWeight: 500 }}
                    >
                      {row.words.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-xs font-medium" style={{ color: "#374151", fontFamily: "Inter, sans-serif" }}>
                      {row.date}
                    </p>
                    <p className="text-xs" style={{ color: "#B0B4C4", fontFamily: "Inter, sans-serif" }}>
                      {row.time}
                    </p>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5">
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
                      <button
                        onClick={() => toast.error("Deleted!")}
                        className="flex h-7 w-7 items-center justify-center rounded-lg transition-colors"
                        style={{ background: "#F3F4F6", border: "none", cursor: "pointer" }}
                        title="Delete"
                        onMouseEnter={(e) => { e.currentTarget.style.background = "#FEF2F2"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "#F3F4F6"; }}
                      >
                        <Trash2 className="h-3.5 w-3.5" style={{ color: "#EF4444" }} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-sm" style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}>
              No history found matching your filters.
            </p>
          </div>
        )}
      </motion.div>
    </DashboardLayout>
  );
}
