"use client";
import Link from "next/link";
import { ArrowRight, Play, Sparkles, Zap, Wand2, PenLine } from "lucide-react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/* ─── Reusable fade-up variant ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut", delay },
  }),
};

const slideRight = {
  hidden: { opacity: 0, x: 56 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

/* ─── Typing cursor blink ─── */
const cursorVariants = {
  blink: {
    opacity: [1, 0, 1],
    transition: { duration: 1, repeat: Infinity, ease: "linear" },
  },
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  /* Parallax on scroll */
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const mockupY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const opacityOut = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pt-[72px]"
      style={{
        background: "linear-gradient(to bottom, #F0EFFF 0%, #ffffff 60%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* ── Animated grid dots (parallax) ── */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, #D4D0FF 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          opacity: 0.35,
          y: bgY,
        }}
      />

      {/* ── Ambient glow blobs ── */}
      <motion.div
        className="pointer-events-none absolute"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.45, scale: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        style={{
          top: "8%",
          left: "30%",
          width: 520,
          height: 520,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(108,99,255,0.18) 0%, transparent 70%)",
          filter: "blur(48px)",
        }}
      />

      <motion.div style={{ opacity: opacityOut }} className="relative w-full">
        <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center gap-12 px-6 py-20 lg:flex-row lg:px-12 lg:py-28">

          {/* ══ LEFT COPY ══ */}
          <div className="flex flex-1 flex-col items-start" style={{ maxWidth: 580 }}>

            {/* Pill tag */}
            <motion.span
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0}
              className="mb-6 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold text-white"
              style={{ background: "#6C63FF", fontFamily: "Inter, sans-serif" }}
            >
              <motion.span
                animate={{ rotate: [0, 15, -10, 15, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
              >
                <Sparkles className="h-3.5 w-3.5" />
              </motion.span>
              AI-Powered Writing Tool
            </motion.span>

            {/* Headline — word-by-word stagger */}
            <div className="mb-5 overflow-hidden">
              {["Write Smarter.", "Rank Higher.", "Grow Faster."].map((line, li) => (
                <motion.div
                  key={line}
                  variants={fadeUp}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  custom={0.1 + li * 0.12}
                  style={{
                    fontFamily: "Plus Jakarta Sans, sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    color: li === 1 ? "transparent" : "#1C2033",
                    background:
                      li === 1
                        ? "linear-gradient(135deg, #6C63FF, #a78bfa)"
                        : undefined,
                    WebkitBackgroundClip: li === 1 ? "text" : undefined,
                    WebkitTextFillColor: li === 1 ? "transparent" : undefined,
                    backgroundClip: li === 1 ? "text" : undefined,
                  }}
                >
                  {line}
                </motion.div>
              ))}
            </div>

            {/* Sub-text */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.42}
              className="mb-8 max-w-md text-base leading-relaxed"
              style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif", fontSize: "1.05rem" }}
            >
              WordFlowAI is the all-in-one AI writing platform trusted by 12,000+ marketers,
              business owners, freelancers and bloggers. Create high-quality, SEO-optimized
              content in seconds — not hours.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.54}
              className="mb-5 flex flex-wrap items-center gap-3"
            >
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/signup"
                  className="flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white no-underline"
                  style={{ background: "#6C63FF", fontFamily: "Inter, sans-serif" }}
                >
                  Start Writing for Free
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <button
                  className="flex items-center gap-2 rounded-xl border px-6 py-3 text-sm font-semibold transition-colors duration-150 hover:bg-[#F0EFFF]"
                  style={{
                    borderColor: "#D4D0FF",
                    color: "#1C2033",
                    fontFamily: "Inter, sans-serif",
                    background: "transparent",
                  }}
                >
                  <motion.span
                    whileHover={{ scale: 1.3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 12 }}
                  >
                    <Play className="h-4 w-4" style={{ color: "#6C63FF" }} fill="#6C63FF" />
                  </motion.span>
                  Watch How It Works
                </button>
              </motion.div>
            </motion.div>

            {/* Trust text */}
            <motion.p
              variants={fadeIn}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.72}
              className="text-sm"
              style={{ color: "#B0B4C4", fontFamily: "Inter, sans-serif" }}
            >
              No credit card required &nbsp;•&nbsp; 5,000 free words every month &nbsp;•&nbsp; Cancel anytime
            </motion.p>
          </div>

          {/* ══ RIGHT MOCKUP ══ */}
          <motion.div
            className="relative flex-1 w-full"
            style={{ maxWidth: 620, y: mockupY }}
            variants={slideRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.2}
          >
            {/* Glow behind card */}
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-3xl"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{
                background: "radial-gradient(ellipse at center, rgba(108,99,255,0.18) 0%, transparent 70%)",
                filter: "blur(28px)",
                transform: "scale(1.08)",
              }}
            />

            {/* App mockup card */}
            <motion.div
              className="relative rounded-2xl overflow-hidden"
              whileHover={{ y: -6, boxShadow: "0 32px 96px rgba(108,99,255,0.22), 0 4px 24px rgba(0,0,0,0.08)" }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
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
                  {["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => (
                    <motion.span
                      key={c}
                      className="h-2.5 w-2.5 rounded-full block"
                      style={{ background: c }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.55 + i * 0.08, type: "spring", stiffness: 400 }}
                    />
                  ))}
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
                  <motion.div
                    className="mb-3 flex items-center gap-2 px-2 pt-2"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded" style={{ background: "#6C63FF" }}>
                      <PenLine className="h-3 w-3 text-white" />
                    </span>
                    <span className="text-xs font-bold text-white" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                      WordFlowAI
                    </span>
                  </motion.div>
                  {["Dashboard", "All Tools", "History", "Billing"].map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.68 + i * 0.07 }}
                      className="rounded-lg px-3 py-2 text-xs cursor-pointer"
                      whileHover={{ x: 3 }}
                      style={{
                        background: i === 0 ? "#E8E6FF" : "transparent",
                        color: i === 0 ? "#6C63FF" : "rgba(255,255,255,0.45)",
                        fontFamily: "Inter, sans-serif",
                        fontWeight: i === 0 ? 600 : 400,
                      }}
                    >
                      {item}
                    </motion.div>
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
                    ].map((s, i) => (
                      <motion.div
                        key={s.label}
                        className="rounded-xl p-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.75 + i * 0.1 }}
                        whileHover={{ scale: 1.04, borderColor: "#D4D0FF" }}
                        style={{ background: "#fff", border: "1px solid #E5E7EB" }}
                      >
                        <p className="text-xs" style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}>
                          {s.label}
                        </p>
                        <p className="mt-0.5 text-sm font-bold" style={{ color: "#1C2033", fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                          {s.value}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Writing area */}
                  <motion.div
                    className="flex-1 rounded-xl p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0 }}
                    style={{ background: "#fff", border: "1.5px solid #E8E6FF" }}
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <motion.span
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                      >
                        <Wand2 className="h-3.5 w-3.5" style={{ color: "#6C63FF" }} />
                      </motion.span>
                      <span className="text-xs font-semibold" style={{ color: "#6C63FF", fontFamily: "Inter, sans-serif" }}>
                        AI Output
                      </span>
                      <span className="ml-auto flex items-center gap-1 text-xs" style={{ color: "#10B981" }}>
                        <motion.span
                          className="h-1.5 w-1.5 rounded-full bg-green-400 block"
                          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        Generating...
                      </span>
                    </div>
                    <p className="mb-1 text-xs font-semibold" style={{ color: "#1C2033", fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                      10 AI Writing Tips for Content Creators
                    </p>
                    <div className="space-y-1.5">
                      {[100, 90, 75, 95, 60].map((w, i) => (
                        <motion.div
                          key={i}
                          className="h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${w}%` }}
                          transition={{ delay: 1.1 + i * 0.12, duration: 0.6, ease: "easeOut" }}
                          style={{ background: i === 4 ? "#E8E6FF" : "#F0EFFF" }}
                        />
                      ))}
                    </div>
                    <motion.span
                      variants={cursorVariants}
                      animate="blink"
                      className="mt-2 inline-block h-3.5 w-0.5 align-middle"
                      style={{ background: "#6C63FF" }}
                    />
                  </motion.div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-2">
                    {["Copy", "Export", "Improve"].map((a, i) => (
                      <motion.button
                        key={a}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.4 + i * 0.07 }}
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.94 }}
                        className="rounded-lg px-3 py-1.5 text-xs font-semibold cursor-pointer"
                        style={{
                          background: i === 2 ? "#6C63FF" : "#F0EFFF",
                          color: i === 2 ? "#fff" : "#6C63FF",
                          border: "none",
                        }}
                      >
                        {a}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating badge — bottom left */}
            <motion.div
              className="absolute -bottom-3 -left-3 flex items-center gap-2 rounded-xl px-3 py-2.5"
              initial={{ opacity: 0, scale: 0.7, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 18 }}
              whileHover={{ scale: 1.06, y: -2 }}
              style={{
                background: "#fff",
                border: "1.5px solid #E5E7EB",
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
              }}
            >
              <motion.span
                className="flex h-7 w-7 items-center justify-center rounded-lg"
                animate={{ scale: [1, 1.18, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{ background: "#ECFDF5" }}
              >
                <Zap className="h-3.5 w-3.5" style={{ color: "#10B981" }} />
              </motion.span>
              <div>
                <p className="text-xs font-bold" style={{ color: "#1C2033", fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                  Generated in 3.2s
                </p>
                <p className="text-xs" style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}>
                  1,200 word post
                </p>
              </div>
            </motion.div>

            {/* Floating badge — top right */}
            <motion.div
              className="absolute -top-3 -right-3 flex items-center gap-2 rounded-xl px-3 py-2"
              initial={{ opacity: 0, scale: 0.7, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.3, type: "spring", stiffness: 260, damping: 18 }}
              whileHover={{ scale: 1.06, y: 2 }}
              style={{
                background: "#fff",
                border: "1.5px solid #D4D0FF",
                boxShadow: "0 8px 24px rgba(108,99,255,0.15)",
              }}
            >
              <motion.span
                className="text-base font-extrabold"
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                style={{ color: "#6C63FF", fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                10x
              </motion.span>
              <span className="text-xs" style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}>
                Faster
              </span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}