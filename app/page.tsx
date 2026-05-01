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
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <main style={{ flex: 1, overflow: "auto", background: "#f8fafc" }}>
        {renderPage()}
      </main>
    </div>
  );
}
