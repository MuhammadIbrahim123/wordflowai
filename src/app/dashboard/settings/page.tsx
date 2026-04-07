"use client";
import { useState } from "react";
import React from "react";
import { motion } from "framer-motion";
import { User, Lock, Bell, Shield, Check, AlertTriangle } from "lucide-react";
import { DashboardLayout } from "../../components/DashboardLayout";
import { toast } from "sonner";

const TABS = ["Profile", "Security", "Notifications", "Privacy"];

const NOTIF_SETTINGS = [
  { key: "weekly",  label: "Weekly usage report",       desc: "Get a summary of your word usage every Monday." },
  { key: "tips",    label: "Content tips & tutorials",  desc: "Receive actionable writing tips in your inbox." },
  { key: "feature", label: "New feature announcements", desc: "Be the first to know when we ship new tools." },
  { key: "billing", label: "Billing & payment alerts",  desc: "Get notified about invoices and plan changes." },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Profile");
  const [name, setName] = useState("Aizaz Shahid");
  const [email, setEmail] = useState("aizaz@example.com");
  const [website, setWebsite] = useState("https://wordflowai.com");
  const [bio, setBio] = useState("Content marketer & AI writing enthusiast.");
  const [saving, setSaving] = useState(false);

  const [notifs, setNotifs] = useState<Record<string, boolean>>({
    weekly: true, tips: true, feature: true, billing: false,
  });

  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Settings saved successfully!");
    }, 900);
  };

  const handlePasswordSave = () => {
    if (!currentPw || !newPw || !confirmPw) {
      toast.error("Please fill in all password fields.");
      return;
    }
    if (newPw !== confirmPw) {
      toast.error("New passwords don't match.");
      return;
    }
    toast.success("Password updated!");
    setCurrentPw(""); setNewPw(""); setConfirmPw("");
  };

  const inputStyle = {
    borderColor: "#E5E7EB",
    color: "#1C2033",
    fontFamily: "Inter, sans-serif",
    background: "#fff",
    borderRadius: 10,
    border: "1.5px solid #E5E7EB",
    padding: "10px 14px",
    fontSize: "0.875rem",
    outline: "none",
    width: "100%",
  };

  const fieldOnFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "#6C63FF";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(108,99,255,0.1)";
  };
  const fieldOnBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "#E5E7EB";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <DashboardLayout>
      {/* Heading */}
      <div className="mb-6">
        <h1
          style={{
            fontFamily: "Plus Jakarta Sans, sans-serif",
            fontWeight: 800,
            fontSize: "1.3rem",
            color: "#1C2033",
          }}
        >
          Settings
        </h1>
        <p className="mt-0.5 text-sm" style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}>
          Manage your account preferences and security.
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-1" style={{ borderBottom: "2px solid #F3F4F6" }}>
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-4 py-2.5 text-sm font-semibold transition-all"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: activeTab === tab ? "#6C63FF" : "#6B7280",
              borderBottom: activeTab === tab ? "2px solid #6C63FF" : "2px solid transparent",
              marginBottom: -2,
              fontFamily: "Inter, sans-serif",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Profile Tab ── */}
      {activeTab === "Profile" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="rounded-2xl bg-white p-7"
            style={{ border: "1.5px solid #F3F4F6", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", maxWidth: 600 }}
          >
            <div className="mb-6 flex items-center gap-4">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full text-xl font-extrabold text-white"
                style={{ background: "#6C63FF", fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                AS
              </div>
              <div>
                <p className="text-sm font-bold" style={{ color: "#1C2033", fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                  Profile Photo
                </p>
                <p className="mb-2 text-xs" style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}>
                  JPG, GIF or PNG. Max size 2MB.
                </p>
                <button
                  className="rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-[#F0EFFF]"
                  style={{ borderColor: "#D4D0FF", color: "#6C63FF", fontFamily: "Inter, sans-serif", background: "transparent", cursor: "pointer" }}
                >
                  Upload Photo
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { label: "Full Name",  value: name,    setter: setName,    placeholder: "Your full name" },
                { label: "Email",      value: email,   setter: setEmail,   placeholder: "your@email.com" },
                { label: "Website",   value: website,  setter: setWebsite, placeholder: "https://yoursite.com" },
              ].map(({ label, value, setter, placeholder }) => (
                <div key={label} className={label === "Website" ? "sm:col-span-2" : ""}>
                  <label className="mb-1.5 block text-sm font-medium" style={{ color: "#374151", fontFamily: "Inter, sans-serif" }}>
                    {label}
                  </label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => setter(e.target.value)}
                    placeholder={placeholder}
                    style={inputStyle}
                    onFocus={fieldOnFocus}
                    onBlur={fieldOnBlur}
                  />
                </div>
              ))}
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium" style={{ color: "#374151", fontFamily: "Inter, sans-serif" }}>
                  Bio
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  style={{ ...inputStyle, resize: "none" }}
                  onFocus={fieldOnFocus}
                  onBlur={fieldOnBlur}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: "#6C63FF", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif" }}
              >
                {saving ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <Check className="h-4 w-4" />
                )}
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Security Tab ── */}
      {activeTab === "Security" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col gap-5"
          style={{ maxWidth: 520 }}
        >
          <div
            className="rounded-2xl bg-white p-7"
            style={{ border: "1.5px solid #F3F4F6", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
          >
            <div className="mb-4 flex items-center gap-2">
              <Lock className="h-5 w-5" style={{ color: "#6C63FF" }} />
              <h3 className="text-base font-bold" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "#1C2033" }}>
                Change Password
              </h3>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { label: "Current Password", value: currentPw, setter: setCurrentPw },
                { label: "New Password",      value: newPw,     setter: setNewPw },
                { label: "Confirm Password",  value: confirmPw, setter: setConfirmPw },
              ].map(({ label, value, setter }) => (
                <div key={label}>
                  <label className="mb-1.5 block text-sm font-medium" style={{ color: "#374151", fontFamily: "Inter, sans-serif" }}>
                    {label}
                  </label>
                  <input
                    type="password"
                    value={value}
                    onChange={(e) => setter(e.target.value)}
                    placeholder="••••••••"
                    style={inputStyle}
                    onFocus={fieldOnFocus}
                    onBlur={fieldOnBlur}
                  />
                </div>
              ))}
            </div>
            <button
              onClick={handlePasswordSave}
              className="mt-5 flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: "#6C63FF", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif" }}
            >
              <Shield className="h-4 w-4" />
              Update Password
            </button>
          </div>

          {/* Danger zone */}
          <div
            className="rounded-2xl bg-white p-7"
            style={{ border: "1.5px solid #FCA5A5", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
          >
            <div className="mb-3 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" style={{ color: "#EF4444" }} />
              <h3 className="text-base font-bold" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "#EF4444" }}>
                Danger Zone
              </h3>
            </div>
            <p className="mb-4 text-sm" style={{ color: "#6B7280", fontFamily: "Inter, sans-serif" }}>
              Once you delete your account, all your data and generations will be permanently removed. This action cannot be undone.
            </p>
            <button
              onClick={() => toast.error("Account deletion requires confirmation email.")}
              className="rounded-xl border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-red-50"
              style={{ borderColor: "#EF4444", color: "#EF4444", background: "transparent", cursor: "pointer", fontFamily: "Inter, sans-serif" }}
            >
              Delete My Account
            </button>
          </div>
        </motion.div>
      )}

      {/* ── Notifications Tab ── */}
      {activeTab === "Notifications" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="rounded-2xl bg-white p-7"
            style={{ border: "1.5px solid #F3F4F6", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", maxWidth: 560 }}
          >
            <div className="mb-5 flex items-center gap-2">
              <Bell className="h-5 w-5" style={{ color: "#6C63FF" }} />
              <h3 className="text-base font-bold" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "#1C2033" }}>
                Email Notifications
              </h3>
            </div>
            <div className="flex flex-col divide-y" style={{ borderColor: "#F9FAFB" }}>
              {NOTIF_SETTINGS.map(({ key, label, desc }) => (
                <div key={key} className="flex items-center justify-between py-4">
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#1C2033", fontFamily: "Inter, sans-serif" }}>
                      {label}
                    </p>
                    <p className="text-xs" style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}>
                      {desc}
                    </p>
                  </div>
                  {/* Toggle switch */}
                  <button
                    onClick={() => setNotifs((prev) => ({ ...prev, [key]: !prev[key] }))}
                    className="relative flex h-6 w-11 items-center rounded-full transition-colors duration-200"
                    style={{
                      background: notifs[key] ? "#6C63FF" : "#E5E7EB",
                      border: "none",
                      cursor: "pointer",
                      flexShrink: 0,
                    }}
                  >
                    <span
                      className="absolute h-4 w-4 rounded-full bg-white shadow transition-transform duration-200"
                      style={{ transform: notifs[key] ? "translateX(24px)" : "translateX(4px)" }}
                    />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-5 flex justify-end">
              <button
                onClick={() => toast.success("Notification preferences saved!")}
                className="flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: "#6C63FF", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif" }}
              >
                <Check className="h-4 w-4" />
                Save Preferences
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Privacy Tab ── */}
      {activeTab === "Privacy" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="rounded-2xl bg-white p-7"
            style={{ border: "1.5px solid #F3F4F6", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", maxWidth: 560 }}
          >
            <div className="mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5" style={{ color: "#6C63FF" }} />
              <h3 className="text-base font-bold" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "#1C2033" }}>
                Privacy &amp; Data
              </h3>
            </div>
            <div
              className="mb-5 rounded-xl p-4"
              style={{ background: "#F5F4FF", border: "1px solid #E8E6FF" }}
            >
              <p className="text-sm font-semibold" style={{ color: "#1C2033", fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                🔒 Your data is safe with us
              </p>
              <p className="mt-1 text-sm leading-relaxed" style={{ color: "#6B7280", fontFamily: "Inter, sans-serif" }}>
                We never train our AI models on your content. Your generations are private and are
                never shared with third parties. You can export or delete your data at any time.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { label: "Export My Data", desc: "Download all your generations and account data as a ZIP file.", action: () => toast.success("Export started! You'll receive an email shortly.") },
                { label: "Delete All Generations", desc: "Permanently remove all your stored AI outputs.", action: () => toast.error("This action requires email confirmation.") },
              ].map(({ label, desc, action }) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-xl p-4"
                  style={{ border: "1px solid #F3F4F6" }}
                >
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#1C2033", fontFamily: "Inter, sans-serif" }}>
                      {label}
                    </p>
                    <p className="text-xs" style={{ color: "#8A8FA8", fontFamily: "Inter, sans-serif" }}>
                      {desc}
                    </p>
                  </div>
                  <button
                    onClick={action}
                    className="ml-4 flex-shrink-0 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-[#F0EFFF]"
                    style={{ borderColor: "#D4D0FF", color: "#6C63FF", background: "transparent", cursor: "pointer", fontFamily: "Inter, sans-serif" }}
                  >
                    {label.split(" ")[0]}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </DashboardLayout>
  );
}
