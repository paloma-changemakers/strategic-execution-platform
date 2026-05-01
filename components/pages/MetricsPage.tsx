"use client";

import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Download, Share2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, Legend,
} from "recharts";

const weeklyData = [
  { week: "W1", waf: 1200, signups: 95, retention: 55 },
  { week: "W2", waf: 1350, signups: 110, retention: 58 },
  { week: "W3", waf: 1280, signups: 88, retention: 56 },
  { week: "W4", waf: 1520, signups: 145, retention: 60 },
  { week: "W5", waf: 1680, signups: 160, retention: 61 },
  { week: "W6", waf: 1750, signups: 155, retention: 63 },
  { week: "W7", waf: 1900, signups: 170, retention: 62 },
  { week: "W8", waf: 2100, signups: 180, retention: 62 },
];

const revenueData = [
  { month: "Jan", mrr: 4200 },
  { month: "Feb", mrr: 5100 },
  { month: "Mar", mrr: 4800 },
  { month: "Apr", mrr: 6200 },
];

const kpis = [
  { name: "Weekly Active Founders", value: 2100, target: 3000, unit: "", trend: +10.5, type: "North Star" },
  { name: "New Signups / Week", value: 180, target: 250, unit: "", trend: +5.9, type: "Leading" },
  { name: "30-day Retention", value: 62, target: 75, unit: "%", trend: -1.6, type: "Lagging" },
  { name: "Feature Adoption Rate", value: 44, target: 60, unit: "%", trend: +3.2, type: "Leading" },
  { name: "MRR", value: 6200, target: 10000, unit: "$", trend: +29.2, type: "Lagging" },
  { name: "NPS Score", value: 42, target: 60, unit: "", trend: +4.0, type: "Lagging" },
];

const alerts = [
  { metric: "Weekly Active Founders", severity: "warning", message: "68% of target — below warning threshold (70%)", time: "2h ago" },
  { metric: "MRR", severity: "danger", message: "Missed Q1 target by 22% — critical threshold breached", time: "1d ago" },
  { metric: "30-day Retention", severity: "warning", message: "Declining for 2 consecutive weeks", time: "3d ago" },
  { metric: "New Signups / Week", severity: "success", message: "Back on track — above warning threshold", time: "5h ago" },
];

function KPICard({ kpi }: { kpi: typeof kpis[0] }) {
  const pct = Math.round((kpi.value / kpi.target) * 100);
  const color = pct >= 100 ? "#10b981" : pct >= 70 ? "#f59e0b" : "#ef4444";
  const isUp = kpi.trend > 0;

  return (
    <Card style={{ padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <div>
          <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 2 }}>{kpi.name}</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#0f172a" }}>
            {kpi.unit === "$" ? `$${kpi.value.toLocaleString()}` : `${kpi.value.toLocaleString()}${kpi.unit}`}
          </div>
        </div>
        <Badge variant={kpi.type === "North Star" ? "purple" : kpi.type === "Leading" ? "info" : "neutral"}>
          {kpi.type}
        </Badge>
      </div>
      <div style={{ marginBottom: 8 }}>
        <ProgressBar value={pct} color={color} height={5} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 11, color: "#94a3b8" }}>
          Target: {kpi.unit === "$" ? `$${kpi.target.toLocaleString()}` : `${kpi.target.toLocaleString()}${kpi.unit}`}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
          {isUp ? <TrendingUp size={12} color="#10b981" /> : <TrendingDown size={12} color="#ef4444" />}
          <span style={{ fontSize: 11, fontWeight: 600, color: isUp ? "#10b981" : "#ef4444" }}>
            {isUp ? "+" : ""}{kpi.trend}%
          </span>
        </div>
      </div>
    </Card>
  );
}

export default function MetricsPage() {
  return (
    <div style={{ padding: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a" }}>Metrics & Dashboard</h1>
          <p style={{ color: "#64748b", fontSize: 13, marginTop: 2 }}>KPI tracking, alerts, and executive view</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "white", color: "#334155", border: "1px solid #e2e8f0",
            padding: "8px 14px", borderRadius: 8, cursor: "pointer",
            fontSize: 13, fontWeight: 500,
          }}>
            <Share2 size={13} /> Share View
          </button>
          <button style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "#6366f1", color: "white", border: "none",
            padding: "8px 16px", borderRadius: 8, cursor: "pointer",
            fontSize: 13, fontWeight: 600,
          }}>
            <Download size={13} /> Export PDF
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 16 }}>
        {kpis.map((kpi, i) => <KPICard key={i} kpi={kpi} />)}
      </div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 16 }}>

        {/* WAF Trend */}
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>Weekly Active Founders — 8 Week Trend</div>
            <div style={{ display: "flex", gap: 6 }}>
              {["7d", "30d", "90d"].map(r => (
                <button key={r} style={{
                  padding: "3px 10px", borderRadius: 6, border: "1px solid #e2e8f0",
                  background: r === "30d" ? "#6366f1" : "white",
                  color: r === "30d" ? "white" : "#64748b",
                  fontSize: 11, cursor: "pointer", fontWeight: 500,
                }}>
                  {r}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #e2e8f0" }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="waf" name="Active Founders" stroke="#6366f1" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="signups" name="New Signups" stroke="#10b981" strokeWidth={2} dot={false} strokeDasharray="4 2" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* MRR */}
        <Card>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", marginBottom: 16 }}>MRR Growth</div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={revenueData} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #e2e8f0" }}
                formatter={(v: number) => [`$${v.toLocaleString()}`, "MRR"]}
              />
              <Bar dataKey="mrr" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Alerts + Executive Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

        {/* Alerts */}
        <Card>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", marginBottom: 14 }}>Alert History</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {alerts.map((alert, i) => (
              <div key={i} style={{
                padding: "10px 12px", borderRadius: 8,
                background: alert.severity === "danger" ? "#fff1f2" : alert.severity === "warning" ? "#fffbeb" : "#f0fdf4",
                border: `1px solid ${alert.severity === "danger" ? "#fecdd3" : alert.severity === "warning" ? "#fde68a" : "#bbf7d0"}`,
                display: "flex", gap: 10, alignItems: "flex-start",
              }}>
                {alert.severity === "success"
                  ? <CheckCircle size={14} color="#10b981" style={{ marginTop: 1, flexShrink: 0 }} />
                  : <AlertTriangle size={14} color={alert.severity === "danger" ? "#ef4444" : "#f59e0b"} style={{ marginTop: 1, flexShrink: 0 }} />
                }
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#0f172a" }}>{alert.metric}</div>
                  <div style={{ fontSize: 11, color: "#64748b" }}>{alert.message}</div>
                </div>
                <span style={{ fontSize: 10, color: "#94a3b8", flexShrink: 0 }}>{alert.time}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Executive Summary */}
        <Card style={{ background: "#0f172a", border: "none" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#f1f5f9" }}>Executive Summary</div>
            <Badge variant="purple">Board-ready</Badge>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20, padding: "12px 14px", background: "#1e293b", borderRadius: 10 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: "#f1f5f9" }}>63</div>
              <div style={{ fontSize: 10, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Health Score</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ marginBottom: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ fontSize: 11, color: "#64748b" }}>OKR Completion</span>
                  <span style={{ fontSize: 11, color: "#f1f5f9", fontWeight: 600 }}>57%</span>
                </div>
                <ProgressBar value={57} color="#6366f1" height={4} />
              </div>
              <div style={{ marginBottom: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ fontSize: 11, color: "#64748b" }}>On-time Initiatives</span>
                  <span style={{ fontSize: 11, color: "#f1f5f9", fontWeight: 600 }}>71%</span>
                </div>
                <ProgressBar value={71} color="#10b981" height={4} />
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ fontSize: 11, color: "#64748b" }}>Metric Achievement</span>
                  <span style={{ fontSize: 11, color: "#f1f5f9", fontWeight: 600 }}>62%</span>
                </div>
                <ProgressBar value={62} color="#f59e0b" height={4} />
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { label: "North Star", value: "2,100 WAF", sub: "70% to target", ok: true },
              { label: "Active Initiatives", value: "4 running", sub: "1 blocked", ok: false },
              { label: "MRR", value: "$6,200", sub: "62% to target", ok: false },
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "8px 12px", background: "#1e293b", borderRadius: 8,
              }}>
                <span style={{ fontSize: 12, color: "#64748b" }}>{item.label}</span>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#f1f5f9" }}>{item.value}</div>
                  <div style={{ fontSize: 10, color: item.ok ? "#10b981" : "#f59e0b" }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <button style={{
            width: "100%", marginTop: 14, padding: "10px",
            background: "#6366f1", color: "white", border: "none",
            borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          }}>
            <Download size={13} /> Generate Board Update PDF
          </button>
        </Card>
      </div>
    </div>
  );
}
