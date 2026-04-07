"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { PenLine, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blogs" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-sm" : ""
      }`}
      style={{ borderBottom: "1px solid #E5E7EB" }}
    >
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-6 lg:px-12">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 no-underline"
          style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
        >
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{ background: "#6C63FF" }}
          >
            <PenLine className="h-4 w-4 text-white" />
          </span>
          <span className="text-lg font-bold" style={{ color: "#1C2033" }}>
            WordFlow<span style={{ color: "#6C63FF" }}>AI</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-sm font-medium transition-colors duration-150 hover:text-[#6C63FF] no-underline"
              style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="rounded-lg border px-4 py-2 text-sm font-semibold transition-colors duration-150 no-underline"
            style={{
              borderColor: "#6C63FF",
              color: "#6C63FF",
              fontFamily: "Inter, sans-serif",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#F0EFFF";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
            }}
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="rounded-lg px-4 py-2 text-sm font-semibold text-white transition-opacity duration-150 hover:opacity-90 no-underline"
            style={{ background: "#6C63FF", fontFamily: "Inter, sans-serif" }}
          >
            Start Free
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg md:hidden"
          style={{ background: "#F5F5F5" }}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? (
            <X className="h-5 w-5" style={{ color: "#1C2033" }} />
          ) : (
            <Menu className="h-5 w-5" style={{ color: "#1C2033" }} />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="border-t px-6 pb-5 pt-3 md:hidden"
          style={{ background: "#fff", borderColor: "#E5E7EB" }}
        >
          <nav className="mb-4 flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium no-underline transition-colors hover:bg-[#F0EFFF] hover:text-[#6C63FF]"
                style={{ color: "#1C2033", fontFamily: "Inter, sans-serif" }}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex gap-3">
            <Link
              href="/login"
              className="flex-1 rounded-lg border py-2.5 text-center text-sm font-semibold no-underline"
              style={{
                borderColor: "#6C63FF",
                color: "#6C63FF",
                fontFamily: "Inter, sans-serif",
              }}
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
          </div>
        </div>
      )}
    </header>
  );
}