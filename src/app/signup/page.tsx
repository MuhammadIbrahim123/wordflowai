"use client";
// Next.js: rename to app/signup/page.tsx, swap Link import, add metadata export
import { useState } from "react";
import React from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight, PenLine, CheckCircle2, Zap } from "lucide-react";

const BENEFITS = [
  "Generate content 10x faster with AI",
  "5,000 free words every month",
  "No credit card required to start",
];

export default function SignUpPage() {
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const field = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm({ ...form, [key]: e.target.value }),
    onFocus: () => setFocused(key),
    onBlur: () => setFocused(null),
    style: {
      border: `1.5px solid ${focused === key ? "#6C63FF" : "#E5E7EB"}`,
      boxShadow: focused === key ? "0 0 0 3px rgba(108,99,255,0.1)" : "none",
      outline: "none",
      fontFamily: "Inter, sans-serif",
      color: "#1C2033",
      background: "#fff",
      borderRadius: 8,
      padding: "11px 14px",
      fontSize: "0.9rem",
      width: "100%",
      transition: "border 0.15s, box-shadow 0.15s",
    },
  });

  return (
    <div className="flex min-h-screen">
      {/* ── LEFT panel ── */}
      <div
        className="relative hidden flex-col justify-between overflow-hidden p-12 lg:flex"
        style={{ width: 520, flexShrink: 0, background: "#1C2033" }}
      >
        {/* Glow orbs */}
        <div
          className="pointer-events-none absolute"
          style={{
            width: 480,
            height: 480,
            top: -160,
            left: -160,
            background: "radial-gradient(circle, rgba(108,99,255,0.2) 0%, transparent 65%)",
            borderRadius: "50%",
          }}
        />
        <div
          className="pointer-events-none absolute"
          style={{
            width: 380,
            height: 380,
            bottom: -80,
            right: -120,
            background: "radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 65%)",
            borderRadius: "50%",
          }}
        />
        {/* Dot grid */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Logo */}
        <Link href="/" className="relative z-10 flex items-center gap-2 no-underline">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-xl"
            style={{ background: "#6C63FF" }}
          >
            <PenLine className="h-4 w-4 text-white" />
          </span>
          <span
            className="text-xl font-bold text-white"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            WordFlow<span style={{ color: "#a78bfa" }}>AI</span>
          </span>
        </Link>

        {/* Center content */}
        <div className="relative z-10 flex flex-col gap-8">
          <div>
            <h1
              className="mb-3 text-white"
              style={{
                fontFamily: "Plus Jakarta Sans, sans-serif",
                fontWeight: 800,
                fontSize: "2.2rem",
                lineHeight: 1.15,
                letterSpacing: "-0.025em",
              }}
            >
              Start Writing Smarter Today
            </h1>
            <p style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Inter, sans-serif", fontSize: "0.95rem" }}>
              Join 10,000+ content creators
            </p>
          </div>

          <div className="flex flex-col gap-3.5">
            {BENEFITS.map((b) => (
              <div key={b} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0" style={{ color: "#6C63FF" }} />
                <span style={{ color: "rgba(255,255,255,0.75)", fontFamily: "Inter, sans-serif", fontSize: "0.9rem" }}>
                  {b}
                </span>
              </div>
            ))}
          </div>

          {/* Mini dashboard mockup */}
          <div
            className="overflow-hidden rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div
              className="px-4 py-2.5"
              style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
            >
              <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif" }}>
                AI Output — Blog Post
              </span>
            </div>
            <div className="p-4">
              <p className="mb-2 text-sm font-semibold text-white" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                10 Ways AI Is Changing Content Marketing
              </p>
              <div className="space-y-1.5">
                {[100, 88, 75, 95, 55].map((w, i) => (
                  <div
                    key={i}
                    className="h-1.5 rounded-full"
                    style={{ width: `${w}%`, background: i < 3 ? "#6C63FF" : "rgba(255,255,255,0.15)", opacity: i < 3 ? 0.6 : 1 }}
                  />
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className="rounded-md px-2 py-0.5 text-xs font-semibold" style={{ background: "rgba(108,99,255,0.25)", color: "#a78bfa" }}>
                  Generated in 3.1s
                </span>
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>1,240 words</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bottom */}
        <div
          className="relative z-10 grid grid-cols-3 overflow-hidden rounded-xl"
          style={{ border: "1px solid rgba(255,255,255,0.07)" }}
        >
          {[
            { v: "10K+", l: "Writers" },
            { v: "50M+", l: "Words" },
            { v: "4.9★", l: "Rating" },
          ].map(({ v, l }, i, arr) => (
            <div
              key={l}
              className="flex flex-col items-center py-4"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderRight: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
              }}
            >
              <span
                className="text-lg font-extrabold"
                style={{ color: "#a78bfa", fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                {v}
              </span>
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "Inter, sans-serif" }}>
                {l}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT panel ── */}
      <div
        className="flex flex-1 flex-col items-center justify-center px-6 py-12"
        style={{ background: "#FAFBFF" }}
      >
        {/* Soft top gradient */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-64"
          style={{ background: "radial-gradient(ellipse 70% 40% at 50% 0%, #E8E6FF 0%, transparent 100%)" }}
        />

        <div
          className="relative z-10 w-full rounded-2xl bg-white p-8 sm:p-10"
          style={{
            maxWidth: 460,
            border: "1.5px solid #E8E6FF",
            boxShadow: "0 4px 6px rgba(0,0,0,0.03), 0 16px 48px rgba(108,99,255,0.09)",
          }}
        >
          {/* Header */}
          <h2
            className="mb-1.5"
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontWeight: 800,
              fontSize: "1.6rem",
              letterSpacing: "-0.025em",
              color: "#1C2033",
            }}
          >
            Create your account
          </h2>
          <p className="mb-7 text-sm" style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}>
            Already have an account?{" "}
            <Link href="/login" className="font-semibold no-underline" style={{ color: "#6C63FF" }}>
              Sign In
            </Link>
          </p>

          {/* Google */}
          <button
            className="mb-5 flex w-full items-center justify-center gap-3 rounded-xl border py-3 text-sm font-semibold transition-colors hover:bg-[#FAFBFF]"
            style={{
              borderColor: "#E5E7EB",
              color: "#1C2033",
              fontFamily: "Inter, sans-serif",
              background: "#fff",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853" />
              <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="mb-5 flex items-center gap-3">
            <div className="h-px flex-1" style={{ background: "#E5E7EB" }} />
            <span className="text-xs" style={{ color: "#B0B4C4", fontFamily: "Inter, sans-serif" }}>
              or
            </span>
            <div className="h-px flex-1" style={{ background: "#E5E7EB" }} />
          </div>

          {/* Fields */}
          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium" style={{ color: "#374151", fontFamily: "Inter, sans-serif" }}>
                Full Name
              </label>
              <input type="text" placeholder="Alex Johnson" autoComplete="name" {...field("name")} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium" style={{ color: "#374151", fontFamily: "Inter, sans-serif" }}>
                Email Address
              </label>
              <input
                type="text"
                inputMode="email"
                placeholder="alex@company.com"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                data-lpignore="true"
                {...field("email")}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium" style={{ color: "#374151", fontFamily: "Inter, sans-serif" }}>
                Password
              </label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  autoComplete="new-password"
                  {...field("password")}
                  style={{ ...field("password").style, paddingRight: 42 }}
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "#9CA3AF", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                >
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: "#6C63FF", border: "none", fontFamily: "Inter, sans-serif", boxShadow: "0 4px 16px rgba(108,99,255,0.35)", cursor: "pointer" }}
            >
              Create Free Account
              <ArrowRight className="h-4 w-4" />
            </button>

            <p className="text-center text-xs" style={{ color: "#B0B4C4", fontFamily: "Inter, sans-serif" }}>
              By signing up you agree to our{" "}
              <a href="#" style={{ color: "#6C63FF" }}>
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" style={{ color: "#6C63FF" }}>
                Privacy Policy
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}