// Next.js migration note:
// 1. Remove RouterProvider wrapping — use app/page.tsx instead
// 2. Change `import { Link } from 'react-router'` → `import Link from 'next/link'`
// 3. Add `export const metadata = { title: '...', description: '...' }` for SEO
// 4. Mark interactive sub-components with 'use client' (already done)

import { Navbar } from "./Navbar";
import React from "react";
import { Hero } from "./Hero";
import { SocialProof } from "./SocialProof";
import { Features } from "./Features";
import { HowItWorks } from "./HowItWorks";
import { Pricing } from "./Pricing";
import { Testimonials } from "./Testimonials";
import { CtaBanner } from "./CtaBanner";
import { Footer } from "./Footer";

export default function LandingPage() {
  return (
    <div style={{ background: "#fff", overflowX: "hidden" }}>
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <Features />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}