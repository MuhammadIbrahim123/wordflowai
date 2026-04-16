// Next.js migration note:
// 1. Remove RouterProvider wrapping — use app/page.tsx instead
// 2. Change `import { Link } from 'react-router'` → `import Link from 'next/link'`
// 3. Add `export const metadata = { title: '...', description: '...' }` for SEO
// 4. Mark interactive sub-components with 'use client' (already done)

import { Navbar } from "../components/Navbar";
import { SocialProof } from "../components/SocialProof";
import { Features } from "../components/Features";
import { HowItWorks } from "../components/HowItWorks";
import { Testimonials } from "../components/Testimonials";
import { CtaBanner } from "../components/CtaBanner";
import { Footer } from "../components/Footer";
import { Hero } from "./ui/Hero";
import { Pricing } from "./Pricing";

export default function LandingPage() {
  return (
    <div suppressHydrationWarning style={{ background: "#fff", overflowX: "hidden" }}>
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