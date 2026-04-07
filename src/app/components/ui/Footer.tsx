"use client";
import React from "react";
import { ExternalLinkIcon, LinkIcon, PenLine, PlayIcon } from "lucide-react";
import { Link } from "react-router-dom";

const LINKS = {
  Product: ["Features", "Pricing", "Blog", "Changelog", "API Docs"],
  Company: ["About Us", "Careers", "Press", "Contact"],
  Resources: ["Help Center", "Video Tutorials", "Community", "Status"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

const LINK_HREFS: Record<string, string> = {
  Features: "/#features",
  Pricing: "/pricing",
  Blog: "/blog",
  "About Us": "/about",
};

const SOCIALS = [
  { Icon: ExternalLinkIcon, label: "Twitter" },
  { Icon: LinkIcon, label: "LinkedIn" },
  { Icon: PlayIcon, label: "YouTube" },
];

export function Footer() {
  return (
    <footer style={{ background: "#1C2033" }}>
      <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-12">
        {/* Top row */}
        <div className="mb-12 grid grid-cols-1 gap-10 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="mb-4 flex items-center gap-2 no-underline">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ background: "#6C63FF" }}
              >
                <PenLine className="h-4 w-4 text-white" />
              </span>
              <span
                className="text-lg font-bold text-white"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                WordFlow<span style={{ color: "#a78bfa" }}>AI</span>
              </span>
            </Link>
            <p
              className="mb-6 max-w-xs text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.45)", fontFamily: "Inter, sans-serif" }}
            >
              The all-in-one AI writing platform trusted by 12,000+ marketers, entrepreneurs
              and content creators worldwide.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-150 hover:bg-[#6C63FF]"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <Icon className="h-4 w-4" style={{ color: "rgba(255,255,255,0.5)" }} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([col, items]) => (
            <div key={col}>
              <h4
                className="mb-4 text-sm font-semibold uppercase tracking-widest text-white"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif", letterSpacing: "0.08em" }}
              >
                {col}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <li key={item}>
                    {LINK_HREFS[item] ? (
                      <Link
                        to={LINK_HREFS[item]}
                        className="text-sm no-underline transition-colors duration-150 hover:text-white"
                        style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif" }}
                      >
                        {item}
                      </Link>
                    ) : (
                      <a
                        href="#"
                        className="text-sm no-underline transition-colors duration-150 hover:text-white"
                        style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif" }}
                      >
                        {item}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }} />

        {/* Bottom row */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p
            className="text-sm"
            style={{ color: "rgba(255,255,255,0.3)", fontFamily: "Inter, sans-serif" }}
          >
            © 2026 WordFlowAI. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: "#10B981", boxShadow: "0 0 6px rgba(16,185,129,0.6)" }}
            />
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "Inter, sans-serif" }}>
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
