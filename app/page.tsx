"use client";

import { useState } from "react";
import LoginPage from "@/components/pages/LoginPage";
import Sidebar from "@/components/Sidebar";
import DashboardPage from "@/components/pages/DashboardPage";
import StrategyPage from "@/components/pages/StrategyPage";
import ExecutionPage from "@/components/pages/ExecutionPage";
import MetricsPage from "@/components/pages/MetricsPage";
import SettingsPage from "@/components/pages/SettingsPage";

export type ActivePage = "dashboard" | "strategy" | "execution" | "metrics" | "settings";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState<ActivePage>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!loggedIn) {
    return <LoginPage onLogin={() => setLoggedIn(true)} />;
  }

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":  return <DashboardPage />;
      case "strategy":   return <StrategyPage />;
      case "execution":  return <ExecutionPage />;
      case "metrics":    return <MetricsPage />;
      case "settings":   return <SettingsPage />;
      default:           return <DashboardPage />;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 40,
            background: "rgba(15,23,42,0.5)",
            display: "none",
          }}
          className="mobile-overlay"
        />
      )}

      <Sidebar
        activePage={activePage}
        onNavigate={(page) => { setActivePage(page); setSidebarOpen(false); }}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main style={{ flex: 1, overflow: "auto", background: "#f8fafc", minWidth: 0 }}>
        {/* Mobile top bar */}
        <div className="mobile-topbar" style={{
          display: "none",
          alignItems: "center", justifyContent: "space-between",
          padding: "12px 16px",
          background: "#0f172a",
          borderBottom: "1px solid #1e293b",
          position: "sticky", top: 0, zIndex: 30,
        }}>
          <button
            onClick={() => setSidebarOpen(true)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              display: "flex", flexDirection: "column", gap: 4, padding: 4,
            }}
          >
            <div style={{ width: 20, height: 2, background: "#94a3b8", borderRadius: 2 }} />
            <div style={{ width: 20, height: 2, background: "#94a3b8", borderRadius: 2 }} />
            <div style={{ width: 20, height: 2, background: "#94a3b8", borderRadius: 2 }} />
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 7,
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontSize: 12, color: "white", fontWeight: 700 }}>S</span>
            </div>
            <span style={{ color: "#f1f5f9", fontSize: 14, fontWeight: 700 }}>SEP</span>
          </div>
          <div style={{ width: 28 }} />
        </div>

        {renderPage()}
      </main>

      <style>{`
        @media (max-width: 768px) {
          .mobile-topbar { display: flex !important; }
          .mobile-overlay { display: block !important; }
        }
      `}</style>
    </div>
  );
}
