"use client";

import { LayoutDashboard, Target, Zap, BarChart3, Settings, Bell, ChevronRight, LogOut, X } from "lucide-react";
import type { ActivePage } from "@/app/page";

interface SidebarProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const navItems = [
  { id: "dashboard" as ActivePage, label: "Dashboard",  icon: LayoutDashboard, badge: null },
  { id: "strategy"  as ActivePage, label: "Strategy",   icon: Target,          badge: null },
  { id: "execution" as ActivePage, label: "Execution",  icon: Zap,             badge: "3" },
  { id: "metrics"   as ActivePage, label: "Metrics",    icon: BarChart3,       badge: "2" },
];

export default function Sidebar({ activePage, onNavigate, isOpen = true, onClose }: SidebarProps) {
  return (
    <>
      <aside
        className="sidebar"
        style={{
          width: 240,
          minWidth: 240,
          background: "#0f172a",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          borderRight: "1px solid #1e293b",
          transition: "transform 0.25s ease",
          zIndex: 50,
        }}
      >
        {/* Logo + mobile close */}
        <div style={{ padding: "22px 20px 18px", borderBottom: "1px solid #1e293b", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 9,
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <Target size={17} color="white" />
            </div>
            <div>
              <div style={{ color: "#f1f5f9", fontWeight: 800, fontSize: 14, letterSpacing: "-0.02em" }}>SEP</div>
              <div style={{ color: "#334155", fontSize: 11 }}>Strategic Platform</div>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="sidebar-close"
              style={{
                background: "none", border: "none", cursor: "pointer",
                padding: 4, display: "none",
              }}
            >
              <X size={18} color="#64748b" />
            </button>
          )}
        </div>

        {/* Workspace selector */}
        <div style={{ padding: "10px 12px", borderBottom: "1px solid #1e293b" }}>
          <button style={{
            width: "100%",
            background: "#1e293b", borderRadius: 9, padding: "9px 12px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            cursor: "pointer", border: "none",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <div style={{
                width: 26, height: 26, borderRadius: 7,
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, color: "white", fontWeight: 700, flexShrink: 0,
              }}>
                FF
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ color: "#f1f5f9", fontSize: 12, fontWeight: 600, lineHeight: 1.2 }}>Future Founders</div>
                <div style={{ color: "#475569", fontSize: 10 }}>Academy · Q2 2026</div>
              </div>
            </div>
            <ChevronRight size={13} color="#475569" />
          </button>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "10px 10px", overflowY: "auto" }}>
          <div style={{
            color: "#334155", fontSize: 10, fontWeight: 700,
            letterSpacing: "0.08em", padding: "4px 10px 8px",
            textTransform: "uppercase",
          }}>
            Main Menu
          </div>
          {navItems.map(({ id, label, icon: Icon, badge }) => {
            const isActive = activePage === id;
            return (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 10px", borderRadius: 8, border: "none", cursor: "pointer",
                  background: isActive ? "#1e293b" : "transparent",
                  color: isActive ? "#f1f5f9" : "#64748b",
                  fontWeight: isActive ? 600 : 400,
                  fontSize: 13, marginBottom: 1,
                  position: "relative",
                }}
              >
                {isActive && (
                  <div style={{
                    position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)",
                    width: 3, height: 18, borderRadius: "0 3px 3px 0",
                    background: "#6366f1",
                  }} />
                )}
                <Icon size={15} color={isActive ? "#818cf8" : "#475569"} />
                <span style={{ flex: 1, textAlign: "left" }}>{label}</span>
                {badge && (
                  <span style={{
                    background: isActive ? "#6366f1" : "#1e293b",
                    color: isActive ? "white" : "#64748b",
                    fontSize: 10, fontWeight: 700,
                    padding: "1px 6px", borderRadius: 10,
                  }}>
                    {badge}
                  </span>
                )}
              </button>
            );
          })}

          <div style={{
            color: "#334155", fontSize: 10, fontWeight: 700,
            letterSpacing: "0.08em", padding: "16px 10px 8px",
            textTransform: "uppercase",
          }}>
            Workspace
          </div>
          <button
            onClick={() => onNavigate("settings")}
            style={{
              width: "100%", display: "flex", alignItems: "center", gap: 10,
              padding: "10px 10px", borderRadius: 8, border: "none", cursor: "pointer",
              background: activePage === "settings" ? "#1e293b" : "transparent",
              color: activePage === "settings" ? "#f1f5f9" : "#64748b",
              fontWeight: activePage === "settings" ? 600 : 400,
              fontSize: 13,
            }}
          >
            <Settings size={15} color={activePage === "settings" ? "#818cf8" : "#475569"} />
            Settings
          </button>
        </nav>

        {/* Notifications */}
        <div style={{
          margin: "0 10px 10px",
          background: "#1e293b", borderRadius: 9, padding: "10px 12px",
          display: "flex", alignItems: "center", gap: 8, cursor: "pointer",
        }}>
          <div style={{ position: "relative" }}>
            <Bell size={15} color="#64748b" />
            <div style={{
              position: "absolute", top: -3, right: -3,
              width: 8, height: 8, borderRadius: "50%",
              background: "#ef4444", border: "1.5px solid #1e293b",
            }} />
          </div>
          <span style={{ fontSize: 12, color: "#64748b", flex: 1 }}>2 new alerts</span>
          <span style={{ fontSize: 10, color: "#475569" }}>View</span>
        </div>

        {/* User */}
        <div style={{ padding: "10px 12px 16px", borderTop: "1px solid #1e293b" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "white", fontSize: 12, fontWeight: 700, flexShrink: 0,
            }}>
              PQ
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: "#f1f5f9", fontSize: 12, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                Paloma Q.
              </div>
              <div style={{ color: "#475569", fontSize: 11 }}>Admin</div>
            </div>
            <LogOut size={14} color="#334155" style={{ cursor: "pointer", flexShrink: 0 }} />
          </div>
        </div>
      </aside>

      <style>{`
        @media (max-width: 768px) {
          .sidebar {
            position: fixed !important;
            top: 0; left: 0; bottom: 0;
            transform: ${isOpen ? "translateX(0)" : "translateX(-100%)"} !important;
          }
          .sidebar-close {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
