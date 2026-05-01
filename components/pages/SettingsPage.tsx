"use client";

import { useState } from "react";
import { Users, Globe, Bell, Shield, Link, Plus, Trash2, Check } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const tabs = [
  { id: "workspace", label: "Workspace", icon: Globe },
  { id: "members",   label: "Members",   icon: Users },
  { id: "integrations", label: "Integrations", icon: Link },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security",  label: "Security",  icon: Shield },
];

const members = [
  { name: "Paloma Quijano", email: "paloma@futurefounders.co", role: "Admin",    avatar: "PQ", color: "#6366f1", status: "active" },
  { name: "Ana Ramírez",    email: "ana@futurefounders.co",    role: "Executor", avatar: "AR", color: "#10b981", status: "active" },
  { name: "Carlos Mendoza", email: "carlos@futurefounders.co", role: "Executor", avatar: "CM", color: "#f59e0b", status: "active" },
  { name: "Luis Torres",    email: "luis@futurefounders.co",   role: "Executor", avatar: "LT", color: "#8b5cf6", status: "active" },
  { name: "Board Investor", email: "investor@vc.com",          role: "Viewer",   avatar: "BI", color: "#64748b", status: "pending" },
];

const integrations = [
  { name: "Notion", desc: "Sync tasks and project docs", icon: "N", color: "#000000", connected: true, lastSync: "2 min ago" },
  { name: "Google Drive", desc: "Attach files to initiatives", icon: "G", color: "#4285f4", connected: true, lastSync: "5 min ago" },
  { name: "Slack", desc: "Get alerts and updates in Slack", icon: "S", color: "#4a154b", connected: false, lastSync: null },
  { name: "Google Sheets", desc: "Export metrics to spreadsheets", icon: "GS", color: "#0f9d58", connected: false, lastSync: null },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("workspace");
  const [saved, setSaved] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("Future Founders Academy");
  const [purpose, setPurpose] = useState("Empower the next generation of founders in Latin America to build scalable, validated ventures.");

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ padding: 28 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a" }}>Settings</h1>
        <p style={{ color: "#64748b", fontSize: 13, marginTop: 2 }}>Manage your workspace configuration</p>
      </div>

      <div style={{ display: "flex", gap: 24 }}>
        {/* Tab nav */}
        <div style={{ width: 180, flexShrink: 0 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                style={{
                  display: "flex", alignItems: "center", gap: 9,
                  padding: "9px 12px", borderRadius: 8, border: "none",
                  cursor: "pointer", textAlign: "left",
                  background: activeTab === id ? "#ede9fe" : "transparent",
                  color: activeTab === id ? "#6d28d9" : "#64748b",
                  fontWeight: activeTab === id ? 600 : 400,
                  fontSize: 13,
                }}
              >
                <Icon size={14} color={activeTab === id ? "#6366f1" : "#94a3b8"} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div style={{ flex: 1 }}>

          {/* Workspace tab */}
          {activeTab === "workspace" && (
            <Card>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", marginBottom: 20 }}>Workspace Settings</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>
                    Workspace Name
                  </label>
                  <input
                    value={workspaceName}
                    onChange={e => setWorkspaceName(e.target.value)}
                    style={{
                      width: "100%", padding: "9px 12px",
                      border: "1px solid #e2e8f0", borderRadius: 8,
                      fontSize: 14, color: "#0f172a", outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>
                    Organization Purpose
                  </label>
                  <textarea
                    value={purpose}
                    onChange={e => setPurpose(e.target.value)}
                    rows={3}
                    style={{
                      width: "100%", padding: "9px 12px",
                      border: "1px solid #e2e8f0", borderRadius: 8,
                      fontSize: 14, color: "#0f172a", outline: "none",
                      resize: "vertical", fontFamily: "inherit",
                      boxSizing: "border-box",
                    }}
                  />
                  <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>{purpose.length}/500 characters</div>
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>
                    Interface Language
                  </label>
                  <select style={{
                    padding: "9px 12px", border: "1px solid #e2e8f0", borderRadius: 8,
                    fontSize: 14, color: "#0f172a", outline: "none", background: "white",
                  }}>
                    <option>English</option>
                    <option>Español</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>
                    Current Period
                  </label>
                  <div style={{ display: "flex", gap: 8 }}>
                    <select style={{
                      padding: "9px 12px", border: "1px solid #e2e8f0", borderRadius: 8,
                      fontSize: 14, color: "#0f172a", outline: "none", background: "white",
                    }}>
                      <option>Q2 2026</option>
                      <option>Q3 2026</option>
                    </select>
                  </div>
                </div>
                <div style={{ paddingTop: 4 }}>
                  <button
                    onClick={handleSave}
                    style={{
                      padding: "9px 20px",
                      background: saved ? "#10b981" : "#6366f1",
                      color: "white", border: "none", borderRadius: 8,
                      fontSize: 13, fontWeight: 600, cursor: "pointer",
                      display: "flex", alignItems: "center", gap: 6,
                      transition: "background 0.2s",
                    }}
                  >
                    {saved ? <><Check size={14} /> Saved!</> : "Save Changes"}
                  </button>
                </div>
              </div>
            </Card>
          )}

          {/* Members tab */}
          {activeTab === "members" && (
            <Card>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>Team Members</div>
                <button style={{
                  display: "flex", alignItems: "center", gap: 6,
                  background: "#6366f1", color: "white", border: "none",
                  padding: "7px 14px", borderRadius: 8, cursor: "pointer",
                  fontSize: 12, fontWeight: 600,
                }}>
                  <Plus size={13} /> Invite Member
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {members.map((m, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "10px 12px", borderRadius: 9,
                    border: "1px solid #f1f5f9", background: "#fafafa",
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: "50%",
                      background: m.color,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, color: "white", fontWeight: 700, flexShrink: 0,
                    }}>
                      {m.avatar}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{m.name}</div>
                      <div style={{ fontSize: 11, color: "#94a3b8" }}>{m.email}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {m.status === "pending" && <Badge variant="warning">Pending</Badge>}
                      <select
                        defaultValue={m.role}
                        style={{
                          padding: "4px 8px", border: "1px solid #e2e8f0", borderRadius: 6,
                          fontSize: 12, color: "#334155", background: "white", outline: "none",
                        }}
                      >
                        <option>Admin</option>
                        <option>Executor</option>
                        <option>Viewer</option>
                      </select>
                      {m.role !== "Admin" && (
                        <button style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
                          <Trash2 size={13} color="#94a3b8" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{
                marginTop: 16, padding: "12px 14px",
                background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 9,
              }}>
                <div style={{ fontSize: 12, color: "#15803d", fontWeight: 500 }}>
                  💡 Invite external stakeholders as <strong>Viewers</strong> — they get read-only access via a secure link, no account required.
                </div>
              </div>
            </Card>
          )}

          {/* Integrations tab */}
          {activeTab === "integrations" && (
            <Card>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", marginBottom: 20 }}>Integrations</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {integrations.map((intg, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "14px 16px", borderRadius: 10,
                    border: `1px solid ${intg.connected ? "#bbf7d0" : "#e2e8f0"}`,
                    background: intg.connected ? "#f0fdf4" : "#fafafa",
                  }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 10,
                      background: intg.color,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 13, color: "white", fontWeight: 800, flexShrink: 0,
                    }}>
                      {intg.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{intg.name}</div>
                      <div style={{ fontSize: 11, color: "#64748b" }}>{intg.desc}</div>
                      {intg.connected && intg.lastSync && (
                        <div style={{ fontSize: 10, color: "#10b981", marginTop: 2 }}>
                          ✓ Synced {intg.lastSync}
                        </div>
                      )}
                    </div>
                    <button style={{
                      padding: "6px 14px", borderRadius: 7, cursor: "pointer",
                      border: intg.connected ? "1px solid #bbf7d0" : "1px solid #e2e8f0",
                      background: intg.connected ? "white" : "#6366f1",
                      color: intg.connected ? "#15803d" : "white",
                      fontSize: 12, fontWeight: 600,
                    }}>
                      {intg.connected ? "Connected" : "Connect"}
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Notifications tab */}
          {activeTab === "notifications" && (
            <Card>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", marginBottom: 20 }}>Notification Preferences</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { label: "Task assigned to me", sub: "When someone assigns a task to you", on: true },
                  { label: "Task overdue", sub: "When a task you own passes its due date", on: true },
                  { label: "Initiative blocked", sub: "When an initiative you own is marked blocked", on: true },
                  { label: "Metric alert", sub: "When a metric you own crosses a threshold", on: true },
                  { label: "Weekly digest", sub: "Summary of workspace activity every Monday", on: false },
                  { label: "Board update ready", sub: "When a PDF report is generated", on: true },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "12px 14px", borderRadius: 9, border: "1px solid #f1f5f9", background: "#fafafa",
                  }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{item.label}</div>
                      <div style={{ fontSize: 11, color: "#94a3b8" }}>{item.sub}</div>
                    </div>
                    <div style={{
                      width: 40, height: 22, borderRadius: 11,
                      background: item.on ? "#6366f1" : "#e2e8f0",
                      position: "relative", cursor: "pointer", flexShrink: 0,
                      transition: "background 0.2s",
                    }}>
                      <div style={{
                        position: "absolute", top: 3,
                        left: item.on ? 21 : 3,
                        width: 16, height: 16, borderRadius: "50%",
                        background: "white",
                        transition: "left 0.2s",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Security tab */}
          {activeTab === "security" && (
            <Card>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", marginBottom: 20 }}>Security Settings</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ padding: "14px 16px", borderRadius: 10, border: "1px solid #e2e8f0", background: "#fafafa" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>Two-Factor Authentication (MFA)</div>
                      <div style={{ fontSize: 11, color: "#64748b" }}>Required for Admin users via TOTP app</div>
                    </div>
                    <Badge variant="success">Enabled</Badge>
                  </div>
                </div>
                <div style={{ padding: "14px 16px", borderRadius: 10, border: "1px solid #e2e8f0", background: "#fafafa" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>Session Timeout</div>
                      <div style={{ fontSize: 11, color: "#64748b" }}>Auto-logout after inactivity</div>
                    </div>
                    <select style={{
                      padding: "5px 10px", border: "1px solid #e2e8f0", borderRadius: 7,
                      fontSize: 12, color: "#334155", background: "white", outline: "none",
                    }}>
                      <option>2 hours</option>
                      <option>4 hours</option>
                      <option>8 hours</option>
                    </select>
                  </div>
                </div>
                <div style={{ padding: "14px 16px", borderRadius: 10, border: "1px solid #e2e8f0", background: "#fafafa" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", marginBottom: 8 }}>IP Allowlist</div>
                  <div style={{ fontSize: 11, color: "#64748b", marginBottom: 10 }}>
                    Restrict workspace access to specific IP ranges
                  </div>
                  <input
                    placeholder="e.g. 192.168.1.0/24, 10.0.0.1"
                    style={{
                      width: "100%", padding: "8px 12px",
                      border: "1px solid #e2e8f0", borderRadius: 7,
                      fontSize: 13, color: "#0f172a", outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div style={{ padding: "14px 16px", borderRadius: 10, border: "1px solid #e2e8f0", background: "#fafafa" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>Audit Log</div>
                      <div style={{ fontSize: 11, color: "#64748b" }}>12 months retention · 1,247 entries</div>
                    </div>
                    <button style={{
                      padding: "6px 14px", borderRadius: 7, cursor: "pointer",
                      border: "1px solid #e2e8f0", background: "white",
                      color: "#334155", fontSize: 12, fontWeight: 500,
                    }}>
                      View Log
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
