"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Modal } from "@/components/ui/Modal";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const northStarData = [
  { week: "W1", value: 1200 },
  { week: "W2", value: 1350 },
  { week: "W3", value: 1280 },
  { week: "W4", value: 1520 },
  { week: "W5", value: 1680 },
  { week: "W6", value: 1750 },
  { week: "W7", value: 1900 },
  { week: "W8", value: 2100 },
];

const okrs = [
  { objective: "Grow active user base", progress: 72, status: "on-track" },
  { objective: "Achieve product-market fit", progress: 58, status: "at-risk" },
  { objective: "Build sustainable revenue", progress: 41, status: "behind" },
];

const initiatives = [
  {
    name: "MVP Launch — Cohort 3",
    owner: "Ana R.", due: "May 15", progress: 85, status: "In Progress",
    objective: "Grow active user base",
    description: "Full launch of the platform MVP for the third cohort of Future Founders Academy, including onboarding, core dashboard, and validation module.",
    tasks: { done: 17, total: 20 },
    projects: ["Onboarding Flow", "Core Dashboard", "QA & Testing"],
    blockers: null,
  },
  {
    name: "Investor Deck Q2",
    owner: "Carlos M.", due: "May 8", progress: 60, status: "In Progress",
    objective: "Build sustainable revenue",
    description: "Prepare the Q2 investor update deck with updated financials, traction metrics, and strategic roadmap.",
    tasks: { done: 6, total: 10 },
    projects: ["Financial Projections", "Narrative & Design"],
    blockers: null,
  },
  {
    name: "User Research Sprint",
    owner: "Paloma Q.", due: "Apr 30", progress: 100, status: "Completed",
    objective: "Achieve product-market fit",
    description: "Conducted 15 user interviews and synthesized insights to validate core hypotheses about the platform's value proposition.",
    tasks: { done: 12, total: 12 },
    projects: ["Interview Planning", "Synthesis & Insights"],
    blockers: null,
  },
  {
    name: "Partnership Program",
    owner: "Luis T.", due: "Jun 1", progress: 20, status: "Blocked",
    objective: "Grow active user base",
    description: "Establish strategic partnerships with 5 accelerators and incubators in LATAM to expand the platform's reach.",
    tasks: { done: 2, total: 10 },
    projects: ["Partner Outreach", "Agreement Templates"],
    blockers: "Waiting for legal review of partnership agreement template. Estimated unblock: May 5.",
  },
];

const alerts = [
  { metric: "Weekly Active Users", message: "Below warning threshold (68% of target)", severity: "warning" },
  { metric: "Revenue MRR", message: "Missed Q1 target by 22%", severity: "danger" },
];

function HealthScoreRing({ score }: { score: number }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 70 ? "#10b981" : score >= 50 ? "#f59e0b" : "#ef4444";

  return (
    <div style={{ position: "relative", width: 100, height: 100 }}>
      <svg width={100} height={100} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={50} cy={50} r={radius} fill="none" stroke="#f1f5f9" strokeWidth={8} />
        <circle
          cx={50} cy={50} r={radius} fill="none"
          stroke={color} strokeWidth={8}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ fontSize: 22, fontWeight: 700, color: "#0f172a" }}>{score}</span>
        <span style={{ fontSize: 10, color: "#64748b" }}>/ 100</span>
      </div>
    </div>
  );
}

type Initiative = typeof initiatives[0];

function InitiativeDetailModal({ initiative, onClose }: { initiative: Initiative; onClose: () => void }) {
  return (
    <Modal open title={initiative.name} onClose={onClose} width={580}>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        <Badge variant={initiative.status === "Completed" ? "success" : initiative.status === "Blocked" ? "danger" : "info"}>
          {initiative.status}
        </Badge>
        <Badge variant="neutral">{initiative.objective}</Badge>
        <Badge variant="neutral">Due {initiative.due}</Badge>
      </div>

      <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.6, marginBottom: 20 }}>
        {initiative.description}
      </p>

      {initiative.blockers && (
        <div style={{
          padding: "12px 14px", borderRadius: 9,
          background: "#fff1f2", border: "1px solid #fecdd3", marginBottom: 20,
        }}>
          <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
            <AlertTriangle size={14} color="#ef4444" style={{ marginTop: 1, flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#b91c1c", marginBottom: 3 }}>Blocker</div>
              <div style={{ fontSize: 12, color: "#64748b" }}>{initiative.blockers}</div>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
        {[
          { label: "Owner", value: initiative.owner },
          { label: "Tasks", value: `${initiative.tasks.done}/${initiative.tasks.total} done` },
          { label: "Progress", value: `${initiative.progress}%` },
        ].map((stat, i) => (
          <div key={i} style={{
            padding: "10px 12px", background: "#f8fafc",
            borderRadius: 8, border: "1px solid #f1f5f9",
          }}>
            <div style={{ fontSize: 10, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>
              {stat.label}
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 8 }}>Overall Progress</div>
        <ProgressBar
          value={initiative.progress}
          color={initiative.status === "Blocked" ? "#ef4444" : initiative.status === "Completed" ? "#10b981" : "#6366f1"}
          height={8}
          showLabel
        />
      </div>

      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 8 }}>Projects</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {initiative.projects.map((proj, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "8px 12px", background: "#fafafa",
              borderRadius: 7, border: "1px solid #f1f5f9",
            }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#6366f1", flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: "#334155" }}>{proj}</span>
              {i === 0 && initiative.status === "Completed" && <Badge variant="success">Done</Badge>}
              {i === 0 && initiative.status === "In Progress" && <Badge variant="info">Active</Badge>}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}

export default function DashboardPage() {
  const [selectedInitiative, setSelectedInitiative] = useState<Initiative | null>(null);

  return (
    <div style={{ padding: 28 }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", letterSpacing: "-0.02em" }}>Dashboard</h1>
        <p style={{ color: "#64748b", fontSize: 13, marginTop: 2 }}>
          Future Founders Academy · Week of April 28, 2026
        </p>
      </div>

      {/* Top row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr", gap: 16, marginBottom: 16 }}>

        {/* Health Score */}
        <Card>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Strategic Health
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <HealthScoreRing score={63} />
            <div>
              <Badge variant="warning">At Risk</Badge>
              <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 5 }}>
                <div style={{ fontSize: 11, color: "#64748b" }}>OKRs <span style={{ color: "#0f172a", fontWeight: 700 }}>57%</span></div>
                <div style={{ fontSize: 11, color: "#64748b" }}>On-time <span style={{ color: "#0f172a", fontWeight: 700 }}>71%</span></div>
                <div style={{ fontSize: 11, color: "#64748b" }}>Metrics <span style={{ color: "#0f172a", fontWeight: 700 }}>62%</span></div>
              </div>
            </div>
          </div>
        </Card>

        {/* North Star */}
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                North Star Metric
              </div>
              <div style={{ fontSize: 14, color: "#0f172a", fontWeight: 700, marginTop: 3 }}>
                Weekly Active Founders
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 30, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.03em" }}>2,100</div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end" }}>
                <TrendingUp size={12} color="#10b981" />
                <span style={{ fontSize: 12, color: "#10b981", fontWeight: 700 }}>+10.5%</span>
                <span style={{ fontSize: 11, color: "#94a3b8" }}>vs last week</span>
              </div>
            </div>
          </div>
          <div style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 11, color: "#64748b" }}>Progress to target (3,000)</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#0f172a" }}>70%</span>
            </div>
            <ProgressBar value={70} color="#6366f1" height={6} />
          </div>
          <ResponsiveContainer width="100%" height={80}>
            <LineChart data={northStarData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f8fafc" />
              <XAxis dataKey="week" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #e2e8f0", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                formatter={(v: number) => [v.toLocaleString(), "Founders"]}
              />
              <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Alerts */}
        <Card>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Active Alerts
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {alerts.map((alert, i) => (
              <div key={i} style={{
                padding: "10px 12px", borderRadius: 8,
                background: alert.severity === "danger" ? "#fff1f2" : "#fffbeb",
                border: `1px solid ${alert.severity === "danger" ? "#fecdd3" : "#fde68a"}`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                  <AlertTriangle size={11} color={alert.severity === "danger" ? "#ef4444" : "#f59e0b"} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#0f172a" }}>{alert.metric}</span>
                </div>
                <p style={{ fontSize: 11, color: "#64748b", lineHeight: 1.4 }}>{alert.message}</p>
              </div>
            ))}
            <div style={{ padding: "10px 12px", borderRadius: 8, background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <CheckCircle size={11} color="#10b981" />
                <span style={{ fontSize: 11, fontWeight: 600, color: "#15803d" }}>Activation Rate on track</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* OKRs + Initiatives */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 16 }}>

        {/* OKRs */}
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>OKR Progress</div>
            <Badge variant="neutral">Q2 2026</Badge>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {okrs.map((okr, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 13, color: "#334155", fontWeight: 500 }}>{okr.objective}</span>
                  <span style={{ fontSize: 13, fontWeight: 800, color: "#0f172a" }}>{okr.progress}%</span>
                </div>
                <ProgressBar
                  value={okr.progress}
                  color={okr.status === "on-track" ? "#10b981" : okr.status === "at-risk" ? "#f59e0b" : "#ef4444"}
                  height={7}
                />
                <div style={{ marginTop: 5 }}>
                  <Badge variant={okr.status === "on-track" ? "success" : okr.status === "at-risk" ? "warning" : "danger"}>
                    {okr.status === "on-track" ? "On Track" : okr.status === "at-risk" ? "At Risk" : "Behind"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Initiatives — clickable */}
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>Active Initiatives</div>
            <span style={{ fontSize: 12, color: "#6366f1", cursor: "pointer", fontWeight: 600 }}>View all →</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {initiatives.map((init, i) => (
              <div
                key={i}
                onClick={() => setSelectedInitiative(init)}
                style={{
                  padding: "12px 14px", borderRadius: 10,
                  border: "1px solid #f1f5f9", background: "#fafafa",
                  cursor: "pointer", transition: "all 0.15s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.border = "1px solid #c7d2fe";
                  e.currentTarget.style.background = "#f5f3ff";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.border = "1px solid #f1f5f9";
                  e.currentTarget.style.background = "#fafafa";
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{init.name}</div>
                    <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>
                      {init.owner} · Due {init.due}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Badge variant={
                      init.status === "Completed" ? "success" :
                      init.status === "Blocked" ? "danger" : "info"
                    }>
                      {init.status}
                    </Badge>
                    <ArrowUpRight size={13} color="#94a3b8" />
                  </div>
                </div>
                <ProgressBar
                  value={init.progress}
                  color={init.status === "Completed" ? "#10b981" : init.status === "Blocked" ? "#ef4444" : "#6366f1"}
                  height={5}
                  showLabel
                />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Initiative detail modal */}
      {selectedInitiative && (
        <InitiativeDetailModal
          initiative={selectedInitiative}
          onClose={() => setSelectedInitiative(null)}
        />
      )}
    </div>
  );
}
