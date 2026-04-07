"use client";
import React from "react";

const STATS = [
  { value: "12K+", label: "Active Users", sub: "Worldwide" },
  { value: "8M+", label: "Words Generated", sub: "And counting" },
  { value: "20+", label: "Writing Tools", sub: "Specialized" },
  { value: "4.9★", label: "Star Rating", sub: "Average score" },
];

export function SocialProof() {
  return (
    <section
      className="border-y py-12"
      style={{ background: "#F8F8FF", borderColor: "#E8E6FF" }}
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <p
          className="mb-8 text-center text-sm font-medium"
          style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}
        >
          Trusted by content creators in{" "}
          <span className="font-semibold" style={{ color: "#1C2033" }}>
            50+ countries
          </span>{" "}
          worldwide
        </p>
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="flex flex-col items-center text-center"
              style={{
                borderRight: i < STATS.length - 1 ? "1px solid #E8E6FF" : "none",
              }}
            >
              <span
                className="mb-1"
                style={{
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  fontWeight: 800,
                  fontSize: "2.2rem",
                  lineHeight: 1.1,
                  color: "#6C63FF",
                }}
              >
                {s.value}
              </span>
              <span
                className="text-sm font-semibold"
                style={{ color: "#1C2033", fontFamily: "Inter, sans-serif" }}
              >
                {s.label}
              </span>
              <span
                className="text-xs"
                style={{ color: "#B0B4C4", fontFamily: "Inter, sans-serif" }}
              >
                {s.sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
