"use client";
import { useState } from "react";
import Link from "next/link";
import { PenLine, Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

const NAV_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Blog", href: "/blogs" },
  { label: "About", href: "/about" },
];

/* ── Nav link underline slide-in ── */
function NavLink({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="relative text-sm font-medium no-underline group"
      style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}
    >
      <motion.span
        whileHover={{ color: "#6C63FF" }}
        transition={{ duration: 0.15 }}
        className="block"
      >
        {label}
      </motion.span>
      {/* Underline */}
      <span
        className="absolute -bottom-0.5 left-0 h-[2px] w-0 rounded-full group-hover:w-full transition-all duration-300"
        style={{ background: "#6C63FF" }}
      />
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  const { scrollY } = useScroll();

  /* Hide navbar on scroll down, show on scroll up */
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 8);
    if (y > lastY && y > 80) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setLastY(y);
  });

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{
        y: hidden ? -80 : 0,
        opacity: hidden ? 0 : 1,
      }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 bg-white"
      style={{
        borderBottom: scrolled ? "1px solid #E5E7EB" : "1px solid transparent",
        boxShadow: scrolled ? "0 1px 16px rgba(108,99,255,0.08)" : "none",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
    >
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-6 lg:px-12">

        {/* ── Logo ── */}
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
          <Link
            href="/"
            className="flex items-center gap-2 no-underline"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            <motion.span
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{ background: "#6C63FF" }}
              whileHover={{ rotate: [0, -8, 8, 0] }}
              transition={{ duration: 0.5 }}
            >
              <PenLine className="h-4 w-4 text-white" />
            </motion.span>
            <span className="text-lg font-bold" style={{ color: "#1C2033" }}>
              WordFlow<span style={{ color: "#6C63FF" }}>AI</span>
            </span>
          </Link>
        </motion.div>

        {/* ── Desktop nav ── */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l, i) => (
            <motion.div
              key={l.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + i * 0.07, duration: 0.4, ease: "easeOut" }}
            >
              <NavLink label={l.label} href={l.href} />
            </motion.div>
          ))}
        </nav>

        {/* ── Desktop CTAs ── */}
        <motion.div
          className="hidden items-center gap-3 md:flex"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.4 }}
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <Link
              href="/login"
              className="rounded-lg border px-4 py-2 text-sm font-semibold no-underline transition-colors duration-150 hover:bg-[#F0EFFF]"
              style={{
                borderColor: "#6C63FF",
                color: "#6C63FF",
                fontFamily: "Inter, sans-serif",
                background: "transparent",
              }}
            >
              Log In
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{ position: "relative", overflow: "hidden", borderRadius: 8 }}
          >
            <Link
              href="/signup"
              className="relative z-10 block rounded-lg px-4 py-2 text-sm font-semibold text-white no-underline overflow-hidden"
              style={{ background: "#6C63FF", fontFamily: "Inter, sans-serif" }}
            >
              Start Free
              {/* Shimmer */}
              <motion.span
                className="pointer-events-none absolute inset-0"
                initial={{ x: "-100%", opacity: 0.4 }}
                animate={{ x: "200%" }}
                transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
                  width: "60%",
                  skewX: "-15deg",
                }}
              />
            </Link>
          </motion.div>
        </motion.div>

        {/* ── Mobile toggle ── */}
        <motion.button
          className="flex h-9 w-9 items-center justify-center rounded-lg md:hidden"
          style={{ background: "#F5F5F5" }}
          onClick={() => setOpen(!open)}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-5 w-5" style={{ color: "#1C2033" }} />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-5 w-5" style={{ color: "#1C2033" }} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t px-6 md:hidden"
            style={{ background: "#fff", borderColor: "#E5E7EB" }}
          >
            <div className="pb-5 pt-3">
              <nav className="mb-4 flex flex-col gap-1">
                {NAV_LINKS.map((l, i) => (
                  <motion.a
                    key={l.label}
                    href={l.href}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium no-underline transition-colors hover:bg-[#F0EFFF] hover:text-[#6C63FF]"
                    style={{ color: "#1C2033", fontFamily: "Inter, sans-serif" }}
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </motion.a>
                ))}
              </nav>
              <motion.div
                className="flex gap-3"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24 }}
              >
                <Link
                  href="/login"
                  className="flex-1 rounded-lg border py-2.5 text-center text-sm font-semibold no-underline"
                  style={{ borderColor: "#6C63FF", color: "#6C63FF", fontFamily: "Inter, sans-serif" }}
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="flex-1 rounded-lg py-2.5 text-center text-sm font-semibold text-white no-underline"
                  style={{ background: "#6C63FF", fontFamily: "Inter, sans-serif" }}
                >
                  Start Free
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}