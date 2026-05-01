"use client";

import { Target, Plus, ChevronRight, Star } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";

const pillars = [
  { name: "Growth", color: "#6366f1", objectives: 3 },
  { name: "Product", color: "#10b981", objectives: 2 },
  { name: "Community", color: "#f59e0b", objectives: 2 },
  { name: "Revenue", color: "#ef4444", objectives: 1 },
];

const objectives = [
  {
    title: "Grow active user base to 3,000 WAF",
    pillar: "Growth", pillarColor: "#6366f1",
    horizon: "Q2 2026", status: "Active",
    okrs: [
      { objective: "Increase weekly signups", krs: 3, completion: 72 },
      { objective: "Improve 30-day retention", krs: 2, completion: 45 },
    ],
  },
  {
    title: "Achieve product-market fit signal",
    pillar: "Product", pillarColor: "#10b981",
    horizon: "Q2 2026", status: "Active",
    okrs: [
      { objective: "Launch core validation module", krs: 4, completion: 58 },
    ],
  },
  {
    title: "Build sustainable MRR pipeline",
    pillar: "Revenue", pillarColor: "#ef4444",
    horizon: "Annual 2026", status: "Active",
    okrs: [
      { objective: "Convert 20% of free users to paid", krs: 3, completion: 31 },
    ],
  },
];

const metricsTree = [
  {
    name: "Weekly Active Founders", type: "North Star", value: 2100, target: 3000, unit: "",
    children: [
      { name: "New Signups / Week", type: "Leading", value: 180, target: 250, unit: "" },
      { name: "30-day Retention", type: "Lagging", value: 62, target: 75, unit: "%" },
      { name: "Feature Adoption Rate", type: "Leading", value: 44, target: 60, unit: "%" },
    ],
  },
];

function MetricStatus({ value, target }: { value: number; target: number }) {
  const pct = (value / target) * 100;
  const color = pct >= 100 ? "#10b981" : pct >= 70 ? "#f59e0b" : "#ef4444";
  const label = pct >= 100 ? "On Target" : pct >= 70 ? "Near Target" : "Below Target";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
      <span style={{ fontSize: 11, color, fontWeight: 600 }}>{label}</span>
    </div>
  );
}

export default function StrategyPage() {
  return (
    <div style={{ padding: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a" }}>Strategic Design</h1>
          <p style={{ color: "#64748b", fontSize: 13, marginTop: 2 }}>Define direction, objectives, and metrics</p>
        </div>
        <button style={{
          display: "flex", alignItems: "center", gap: 6,
          background: "#6366f1", color: "white", border: "none",
          padding: "8px 16px", borderRadius: 8, cursor: "pointer",
          fontSize: 13, fontWeight: 600,
        }}>
          <Plus size={14} /> New Objective
        </button>
      </div>

      {/* North Star */}
      <Card style={{ marginBottom: 16, background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)", border: "none" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <Star size={14} color="#fbbf24" fill="#fbbf24" />
              <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                North Star Metric
              </span>
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "white" }}>Weekly Active Founders</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginTop: 4 }}>
              The number of founders actively using the platform each week to advance their ventures
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: "white" }}>2,100</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>Target: 3,000</div>
            <div style={{ marginTop: 8, width: 160 }}>
              <ProgressBar value={70} color="rgba(255,255,255,0.9)" height={6} showLabel />
            </div>
          </div>
        </div>
      </Card>

      <div className="grid-2" style={{ marginBottom: 16 }}>

        {/* Strategic Pillars */}
        <Card>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", marginBottom: 14 }}>Strategic Pillars</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {pillars.map((p, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 12px", borderRadius: 8,
                border: "1px solid #f1f5f9", background: "#fafafa",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: p.color }} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{p.name}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 11, color: "#64748b" }}>{p.objectives} objectives</span>
                  <ChevronRight size={13} color="#94a3b8" />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Metrics Tree */}
        <Card>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", marginBottom: 14 }}>Metrics Tree</div>
          {metricsTree.map((root, i) => (
            <div key={i}>
              <div style={{
                padding: "10px 12px", borderRadius: 8,
                background: "#ede9fe", border: "1px solid #c4b5fd",
                marginBottom: 8,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#6d28d9" }}>{root.name}</div>
                    <Badge variant="purple">{root.type}</Badge>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "#0f172a" }}>{root.value.toLocaleString()}</div>
                    <div style={{ fontSize: 11, color: "#64748b" }}>/ {root.target.toLocaleString()}</div>
                  </div>
                </div>
              </div>
              <div style={{ paddingLeft: 16, borderLeft: "2px solid #e2e8f0", marginLeft: 12 }}>
                {root.children.map((child, j) => (
                  <div key={j} style={{
                    padding: "8px 12px", borderRadius: 8,
                    background: "#fafafa", border: "1px solid #f1f5f9",
                    marginBottom: 6,
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: "#0f172a" }}>{child.name}</div>
                        <MetricStatus value={child.value} target={child.target} />
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>
                          {child.value}{child.unit}
                        </span>
                        <div style={{ fontSize: 11, color: "#94a3b8" }}>/ {child.target}{child.unit}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Card>
      </div>

      {/* Objectives & OKRs */}
      <Card>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", marginBottom: 16 }}>
          Strategic Objectives & OKRs
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {objectives.map((obj, i) => (
            <div key={i} style={{
              border: "1px solid #e2e8f0", borderRadius: 10, overflow: "hidden",
            }}>
              <div style={{
                padding: "12px 16px", background: "#fafafa",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                borderBottom: "1px solid #f1f5f9",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: obj.pillarColor }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{obj.title}</div>
                    <div style={{ fontSize: 11, color: "#94a3b8" }}>{obj.pillar} · {obj.horizon}</div>
                  </div>
                </div>
                <Badge variant="info">{obj.status}</Badge>
              </div>
              <div style={{ padding: "12px 16px" }}>
                {obj.okrs.map((okr, j) => (
                  <div key={j} style={{ marginBottom: j < obj.okrs.length - 1 ? 10 : 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 12, color: "#475569" }}>
                        <Target size={11} style={{ display: "inline", marginRight: 4 }} />
                        {okr.objective}
                      </span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>{okr.completion}%</span>
                    </div>
                    <ProgressBar
                      value={okr.completion}
                      color={okr.completion >= 70 ? "#10b981" : okr.completion >= 50 ? "#f59e0b" : "#ef4444"}
                      height={5}
                    />
                    <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 3 }}>{okr.krs} Key Results</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
