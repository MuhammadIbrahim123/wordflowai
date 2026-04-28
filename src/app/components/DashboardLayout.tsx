"use client";
import React from "react";
import { useMemo, useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Wand2, History, CreditCard, Settings,
  LogOut, Bell, Search, Zap, PenLine, Menu, User,
} from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const NAV = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Wand2, label: "All Tools", path: "/dashboard/tools" },
  { icon: History, label: "History", path: "/history" },
  { icon: CreditCard, label: "Billing", path: "/account" },
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
];

const NAV_CONTAINER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

const NAV_ITEM = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
};

interface DashboardUser {
  name: string;
  email: string;
  plan: string;
  credits?: {
    used: number;
    total: number;
  };
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function getInitials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "U";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0]}${words[1][0]}`.toUpperCase();
}

function SidebarInner({
  onNavClick,
  user,
  onLogout,
}: {
  onNavClick?: () => void;
  user: DashboardUser;
  onLogout: () => Promise<void>;
}) {
  const pathname = usePathname();
  return (
    <div className="flex h-full flex-col" style={{ overflowY: "hidden" }}>
      {/* Logo */}
      <div
        className="flex h-16 shrink-0 items-center gap-2.5 px-5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
          style={{ background: "#6C63FF" }}
        >
          <PenLine className="h-4 w-4 text-white" />
        </span>
        <span
          className="text-base font-bold text-white"
          style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
        >
          WordFlow<span style={{ color: "#a78bfa" }}>AI</span>
        </span>
      </div>

      {/* User info */}
      <div
        className="flex items-center gap-3 px-5 py-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
          style={{ background: "#6C63FF", fontFamily: "Plus Jakarta Sans, sans-serif" }}
        >
          {getInitials(user.name)}
        </div>
        <div className="min-w-0">
          <p
            className="truncate text-sm font-semibold text-white"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            {user.name}
          </p>
          <span
            className="inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold"
            style={{ background: "#E8E6FF", color: "#6C63FF", fontFamily: "Inter, sans-serif" }}
          >
            {user.plan.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Nav */}
      <motion.nav
        className="flex-1 overflow-y-auto py-3"
        variants={NAV_CONTAINER}
        initial={false}
        animate="visible"
      >
        {NAV.map(({ icon: Icon, label, path }) => {
          const active =
            path === "/dashboard/tools"
              ? pathname.startsWith("/dashboard/tools")
              : pathname === path;
          return (
            <motion.div key={label} variants={NAV_ITEM}>
              <Link
                href={path}
                onClick={onNavClick}
                className="mx-2 mb-1 flex items-center gap-3 rounded-xl px-3 py-2.5 no-underline transition-all duration-150"
                style={{
                  background: active ? "#E8E6FF" : "transparent",
                  color: active ? "#6C63FF" : "rgba(255,255,255,0.5)",
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  if (!active) {
                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.85)";
                  }
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  if (!active) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                  }
                }}
              >
                <Icon className="h-4.5 w-4.5 shrink-0" />
                <span
                  className="text-sm"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  {label}
                </span>
              </Link>
            </motion.div>
          );
        })}
      </motion.nav>

      {/* Upgrade card */}
      <div
        className="mx-3 mb-3 overflow-hidden rounded-xl"
        style={{ background: "linear-gradient(135deg, #6C63FF, #a78bfa)" }}
      >
        <div className="p-4">
          <div className="mb-1.5 flex items-center gap-1.5">
            <Zap className="h-4 w-4 text-white" fill="white" />
            <span
              className="text-sm font-bold text-white"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Upgrade to Pro
            </span>
          </div>
          <p
            className="mb-3 text-xs"
            style={{ color: "rgba(255,255,255,0.7)", fontFamily: "Inter, sans-serif" }}
          >
            Get unlimited words +
          </p>
          <motion.button
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex w-full items-center justify-center rounded-lg py-1.5 text-xs font-bold text-white transition-colors"
            style={{
              background: "transparent",
              border: "1.5px solid rgba(255,255,255,0.7)",
              cursor: "pointer",
              fontFamily: "Inter, sans-serif",
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.15)";
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            Upgrade Now →
          </motion.button>
        </div>
      </div>

      {/* Sign out */}
      <div
        className="px-2 pb-4 pt-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
      >
        <button
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors"
          style={{
            color: "rgba(255,255,255,0.3)",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "Inter, sans-serif",
          }}
          onClick={onLogout}
          onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.currentTarget.style.color = "#F87171";
          }}
          onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.currentTarget.style.color = "rgba(255,255,255,0.3)";
          }}
        >
          <LogOut className="h-4.5 w-4.5 shrink-0" />
          <span className="text-sm">Sign Out</span>
        </button>
      </div>
    </div>
  );
}

interface Props {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export function DashboardLayout({ children, title, subtitle }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/login");
    },
  });

  const user: DashboardUser = {
    name: session?.user?.name ?? "User",
    email: session?.user?.email ?? "",
    plan: session?.user?.plan ?? "free",
    credits: session?.user?.credits,
  };

  const userInitials = useMemo(() => getInitials(user.name), [user.name]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout endpoint error:", error);
    }

    await signOut({ redirect: false });
    router.replace("/login");
  };

  return (
    <div
      className="flex min-h-screen"
      style={{ background: "#F8FAFC", fontFamily: "Inter, sans-serif" }}
    >
      {/* Desktop sidebar — always visible on lg+ */}
      <motion.aside
        className="fixed inset-y-0 left-0 z-40 hidden w-60 lg:block"
        initial={false}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          background: "#1C2033",
          borderRight: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <SidebarInner user={user} onLogout={handleLogout} />
      </motion.aside>

      {/* Mobile sidebar + backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-50 w-60 lg:hidden"
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              style={{ background: "#1C2033" }}
            >
              <SidebarInner
                onNavClick={() => setMobileOpen(false)}
                user={user}
                onLogout={handleLogout}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main area */}
      <div className="flex flex-1 flex-col lg:ml-60">
        {/* TopBar */}
        <motion.header
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 px-4 lg:px-8"
          style={{
            background: "rgba(255,255,255,0.96)",
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid #E5E7EB",
          }}
        >
          {/* Hamburger — mobile only */}
          <button
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl lg:hidden"
            style={{
              background: "#F3F4F6",
              border: "1px solid #E5E7EB",
              cursor: "pointer",
            }}
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" style={{ color: "#6B7280" }} />
          </button>

          {/* Greeting — desktop */}
          <div className="hidden flex-1 lg:block">
            <p
              className="text-sm font-semibold"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "#1C2033" }}
            >
              {getGreeting()}, {user.name} 👋
            </p>
          </div>

          {/* Mobile spacer */}
          <div className="flex-1 lg:hidden" />

          {/* Search */}
          <div
            className="hidden items-center gap-2 rounded-xl px-4 py-2.5 md:flex"
            style={{
              background: "#F3F4F6",
              border: "1px solid #E5E7EB",
              width: 260,
            }}
          >
            <Search className="h-4 w-4 shrink-0" style={{ color: "#9CA3AF" }} />
            <input
              type="text"
              placeholder="Search your generations..."
              className="w-full bg-transparent text-sm outline-none"
              style={{ color: "#374151", fontFamily: "Inter, sans-serif" }}
            />
          </div>

          {/* Bell */}
          <button
            className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
            style={{ background: "#F3F4F6", border: "1px solid #E5E7EB", cursor: "pointer" }}
          >
            <Bell className="h-4 w-4" style={{ color: "#6B7280" }} />
            <span
              className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full"
              style={{ background: "#6C63FF" }}
            />
          </button>

          {/* User avatar + Radix Dropdown */}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button
                className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl text-sm font-bold text-white"
                style={{
                  background: "#6C63FF",
                  border: "none",
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                }}
              >
                {userInitials}
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="z-100 overflow-hidden rounded-xl bg-white p-1.5"
                style={{
                  border: "1.5px solid #E5E7EB",
                  boxShadow: "0 16px 48px rgba(0,0,0,0.12)",
                  minWidth: 192,
                }}
                sideOffset={8}
                align="end"
              >
                {/* User identity */}
                <div
                  className="mb-1.5 px-3 py-2.5"
                  style={{ borderBottom: "1px solid #F3F4F6" }}
                >
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "#1C2033", fontFamily: "Plus Jakarta Sans, sans-serif" }}
                  >
                    {user.name}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}
                  >
                    {user.email}
                  </p>
                </div>

                {[
                  { label: "My Account", Icon: User, to: "/account" },
                  { label: "Billing", Icon: CreditCard, to: "/account" },
                  { label: "Settings", Icon: Settings, to: "/dashboard/settings" },
                ].map(({ label, Icon, to }) => (
                  <DropdownMenu.Item key={label} asChild>
                    <Link
                      href={to}
                      className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-sm no-underline outline-none"
                      style={{ color: "#374151", fontFamily: "Inter, sans-serif" }}
                      onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        e.currentTarget.style.background = "#F0EFFF";
                      }}
                      onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <Icon className="h-4 w-4" style={{ color: "#6C63FF" }} />
                      {label}
                    </Link>
                  </DropdownMenu.Item>
                ))}

                <DropdownMenu.Separator
                  className="my-1.5 h-px"
                  style={{ background: "#F3F4F6" }}
                />

                <DropdownMenu.Item asChild>
                  <button
                    className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-sm outline-none"
                    style={{
                      color: "#EF4444",
                      background: "none",
                      border: "none",
                      fontFamily: "Inter, sans-serif",
                    }}
                    onClick={handleLogout}
                    onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.currentTarget.style.background = "#FEF2F2";
                    }}
                    onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.currentTarget.style.background = "none";
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    Log Out
                  </button>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </motion.header>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-8">
          {/* Optional page heading from parent (AccountPage, etc.) */}
          {title && (
            <div className="mb-6">
              <h1
                style={{
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  fontWeight: 800,
                  fontSize: "1.2rem",
                  color: "#1C2033",
                }}
              >
                {title}
              </h1>
              {subtitle && (
                <p
                  className="mt-0.5 text-sm"
                  style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}
                >
                  {subtitle}
                </p>
              )}
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
