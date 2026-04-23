"use client";
// Next.js: rename to app/login/page.tsx, swap Link import, add metadata export
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import React from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight, PenLine } from "lucide-react";

const STATS = [
  { v: "10,000+", l: "Active Writers" },
  { v: "50M+", l: "Words Generated" },
  { v: "4.9★", l: "Average Rating" },
];

export default function LoginPage() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

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
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Logo */}
        <Link href="/" className="relative z-10 flex items-center gap-2 no-underline">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: "#6C63FF" }}>
            <PenLine className="h-4 w-4 text-white" />
          </span>
          <span className="text-xl font-bold text-white" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
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
                fontSize: "2.4rem",
                lineHeight: 1.15,
                letterSpacing: "-0.025em",
              }}
            >
              Welcome Back!
            </h1>
            <p style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Inter, sans-serif", fontSize: "0.95rem" }}>
              Pick up right where you left off
            </p>
          </div>

          {/* Floating stat cards */}
          <div className="flex flex-col gap-3">
            {STATS.map((s) => (
              <div
                key={s.l}
                className="flex items-center gap-4 rounded-xl px-5 py-4"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                }}
              >
                <span
                  className="text-xl font-extrabold"
                  style={{ color: "#a78bfa", fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  {s.v}
                </span>
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Inter, sans-serif" }}>
                  {s.l}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <p
          className="relative z-10 text-xs"
          style={{ color: "rgba(255,255,255,0.2)", fontFamily: "Inter, sans-serif" }}
        >
          Trusted by content creators in 50+ countries
        </p>
      </div>

      {/* ── RIGHT panel ── */}
      <div
        className="flex flex-1 flex-col items-center justify-center px-6 py-12"
        style={{ background: "#FAFBFF" }}
      >
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
            Sign in to your account
          </h2>
          <p className="mb-7 text-sm" style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}>
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-semibold no-underline" style={{ color: "#6C63FF" }}>
              Sign Up
            </Link>
          </p>

          {/* Google */}
          <button
            className="mb-5 flex w-full items-center justify-center gap-3 rounded-xl border py-3 text-sm font-semibold transition-colors hover:bg-[#FAFBFF]"
            style={{ borderColor: "#E5E7EB", color: "#1C2033", fontFamily: "Inter, sans-serif", background: "#fff" }}
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
            <span className="text-xs" style={{ color: "#B0B4C4", fontFamily: "Inter, sans-serif" }}>or</span>
            <div className="h-px flex-1" style={{ background: "#E5E7EB" }} />
          </div>

          {/* Fields */}
          <form
            className="flex flex-col gap-4"
            onSubmit={async (e) => {
              e.preventDefault();
              if (!form.email.trim() || !form.password.trim()) return;
              setError("");
              const result = await signIn("credentials", {
                email: form.email,
                password: form.password,
                redirect: false,
                callbackUrl: "/dashboard",
              });
              if (result?.ok) {
                router.push("/dashboard");
              } else {
                setError("Invalid email or password. Please try again.");
              }
            }}
          >
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
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium" style={{ color: "#374151", fontFamily: "Inter, sans-serif" }}>
                  Password
                </label>
                <a href="#" className="text-xs font-semibold no-underline" style={{ color: "#6C63FF", fontFamily: "Inter, sans-serif" }}>
                  Forgot your password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
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
              Sign In
              <ArrowRight className="h-4 w-4" />
            </button>
            {error ? (
              <p
                className="text-sm"
                style={{ color: "#DC2626", fontFamily: "Inter, sans-serif" }}
              >
                {error}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
}