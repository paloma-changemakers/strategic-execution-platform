"use client";

import { useState } from "react";
import { Plus, AlertCircle, Clock, CheckCircle2, Circle, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";

const initiatives = [
  {
    id: 1,
    name: "MVP Launch — Cohort 3",
    objective: "Grow active user base",
    owner: "Ana R.",
    due: "May 15, 2026",
    priority: "High",
    status: "In Progress",
    progress: 85,
    projects: [
      {
        name: "Onboarding Flow",
        status: "Completed",
        progress: 100,
        tasks: [
          { title: "Design onboarding screens", status: "Done", assignee: "Ana R." },
          { title: "Implement step-by-step wizard", status: "Done", assignee: "Carlos M." },
          { title: "A/B test CTA copy", status: "Done", assignee: "Paloma Q." },
        ],
      },
      {
        name: "Core Dashboard",
        status: "In Progress",
        progress: 75,
        tasks: [
          { title: "Build KPI widget components", status: "Done", assignee: "Carlos M." },
          { title: "Integrate real-time updates", status: "In Progress", assignee: "Luis T." },
          { title: "Mobile responsive layout", status: "To Do", assignee: "Ana R." },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Investor Deck Q2",
    objective: "Build sustainable revenue",
    owner: "Carlos M.",
    due: "May 8, 2026",
    priority: "High",
    status: "In Progress",
    progress: 60,
    projects: [
      {
        name: "Financial Projections",
        status: "In Progress",
        progress: 60,
        tasks: [
          { title: "Update MRR model", status: "In Progress", assignee: "Carlos M." },
          { title: "Prepare unit economics slide", status: "To Do", assignee: "Paloma Q." },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Partnership Program",
    objective: "Grow active user base",
    owner: "Luis T.",
    due: "Jun 1, 2026",
    priority: "Medium",
    status: "Blocked",
    progress: 20,
    projects: [
      {
        name: "Partner Outreach",
        status: "Blocked",
        progress: 20,
        tasks: [
          { title: "Define partner criteria", status: "Done", assignee: "Luis T." },
          { title: "Create outreach templates", status: "In Review", assignee: "Ana R." },
          { title: "Send first batch of emails", status: "To Do", assignee: "Luis T." },
        ],
      },
    ],
  },
];

const kanbanColumns = [
  { id: "todo", label: "To Do", color: "#94a3b8" },
  { id: "in-progress", label: "In Progress", color: "#6366f1" },
  { id: "in-review", label: "In Review", color: "#f59e0b" },
  { id: "done", label: "Done", color: "#10b981" },
];

const allTasks = [
  { title: "Mobile responsive layout", status: "todo", assignee: "Ana R.", project: "Core Dashboard" },
  { title: "Prepare unit economics slide", status: "todo", assignee: "Paloma Q.", project: "Financial Projections" },
  { title: "Send first batch of emails", status: "todo", assignee: "Luis T.", project: "Partner Outreach" },
  { title: "Integrate real-time updates", status: "in-progress", assignee: "Luis T.", project: "Core Dashboard" },
  { title: "Update MRR model", status: "in-progress", assignee: "Carlos M.", project: "Financial Projections" },
  { title: "Create outreach templates", status: "in-review", assignee: "Ana R.", project: "Partner Outreach" },
  { title: "Build KPI widget components", status: "done", assignee: "Carlos M.", project: "Core Dashboard" },
  { title: "Design onboarding screens", status: "done", assignee: "Ana R.", project: "Onboarding Flow" },
  { title: "Define partner criteria", status: "done", assignee: "Luis T.", project: "Partner Outreach" },
];

type ViewMode = "list" | "kanban";

function TaskStatusIcon({ status }: { status: string }) {
  if (status === "Done") return <CheckCircle2 size={14} color="#10b981" />;
  if (status === "In Progress") return <ArrowRight size={14} color="#6366f1" />;
  if (status === "In Review") return <Clock size={14} color="#f59e0b" />;
  return <Circle size={14} color="#94a3b8" />;
}

export default function ExecutionPage() {
  const [view, setView] = useState<ViewMode>("list");
  const [expanded, setExpanded] = useState<number | null>(1);

  return (
    <div style={{ padding: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a" }}>Execution</h1>
          <p style={{ color: "#64748b", fontSize: 13, marginTop: 2 }}>Initiatives, projects, and tasks</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{
            display: "flex", background: "#f1f5f9", borderRadius: 8, padding: 3,
          }}>
            {(["list", "kanban"] as ViewMode[]).map(v => (
              <button key={v} onClick={() => setView(v)} style={{
                padding: "5px 14px", borderRadius: 6, border: "none", cursor: "pointer",
                background: view === v ? "white" : "transparent",
                color: view === v ? "#0f172a" : "#64748b",
                fontSize: 12, fontWeight: view === v ? 600 : 400,
                boxShadow: view === v ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
              }}>
                {v === "list" ? "List" : "Kanban"}
              </button>
            ))}
          </div>
          <button style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "#6366f1", color: "white", border: "none",
            padding: "8px 16px", borderRadius: 8, cursor: "pointer",
            fontSize: 13, fontWeight: 600,
          }}>
            <Plus size={14} /> New Initiative
          </button>
        </div>
      </div>

      {view === "list" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {initiatives.map((init) => (
            <Card key={init.id} style={{ padding: 0, overflow: "hidden" }}>
              {/* Initiative header */}
              <div
                style={{
                  padding: "14px 18px", cursor: "pointer",
                  background: expanded === init.id ? "#fafafa" : "white",
                  borderBottom: expanded === init.id ? "1px solid #f1f5f9" : "none",
                }}
                onClick={() => setExpanded(expanded === init.id ? null : init.id)}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {init.status === "Blocked" && <AlertCircle size={16} color="#ef4444" />}
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>{init.name}</div>
                      <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 1 }}>
                        {init.objective} · {init.owner} · Due {init.due}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 120 }}>
                      <ProgressBar
                        value={init.progress}
                        color={init.status === "Blocked" ? "#ef4444" : init.status === "Completed" ? "#10b981" : "#6366f1"}
                        height={5}
                        showLabel
                      />
                    </div>
                    <Badge variant={
                      init.status === "Blocked" ? "danger" :
                      init.status === "Completed" ? "success" :
                      init.priority === "High" ? "info" : "neutral"
                    }>
                      {init.status}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Projects & Tasks */}
              {expanded === init.id && (
                <div style={{ padding: "12px 18px 16px" }}>
                  {init.projects.map((proj, pi) => (
                    <div key={pi} style={{ marginBottom: pi < init.projects.length - 1 ? 16 : 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#6366f1" }} />
                          <span style={{ fontSize: 13, fontWeight: 600, color: "#334155" }}>{proj.name}</span>
                          <Badge variant={proj.status === "Completed" ? "success" : proj.status === "Blocked" ? "danger" : "info"}>
                            {proj.status}
                          </Badge>
                        </div>
                        <span style={{ fontSize: 12, color: "#64748b" }}>{proj.progress}%</span>
                      </div>
                      <div style={{ paddingLeft: 14, borderLeft: "2px solid #e2e8f0" }}>
                        {proj.tasks.map((task, ti) => (
                          <div key={ti} style={{
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            padding: "6px 10px", borderRadius: 6,
                            background: "#fafafa", marginBottom: 4,
                          }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <TaskStatusIcon status={task.status} />
                              <span style={{
                                fontSize: 12, color: task.status === "Done" ? "#94a3b8" : "#334155",
                                textDecoration: task.status === "Done" ? "line-through" : "none",
                              }}>
                                {task.title}
                              </span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <span style={{ fontSize: 11, color: "#94a3b8" }}>{task.assignee}</span>
                              <Badge variant={
                                task.status === "Done" ? "success" :
                                task.status === "In Progress" ? "info" :
                                task.status === "In Review" ? "warning" : "neutral"
                              }>
                                {task.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>
      ) : (
        /* Kanban View */
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {kanbanColumns.map((col) => {
            const colTasks = allTasks.filter(t => t.status === col.id);
            return (
              <div key={col.id}>
                <div style={{
                  display: "flex", alignItems: "center", gap: 8, marginBottom: 10,
                  padding: "6px 10px", borderRadius: 8, background: "#f8fafc",
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: col.color }} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#334155" }}>{col.label}</span>
                  <span style={{
                    marginLeft: "auto", background: "#e2e8f0", color: "#64748b",
                    fontSize: 11, fontWeight: 600, padding: "1px 7px", borderRadius: 10,
                  }}>
                    {colTasks.length}
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {colTasks.map((task, i) => (
                    <div key={i} style={{
                      background: "white", border: "1px solid #e2e8f0",
                      borderRadius: 10, padding: "12px 14px",
                      cursor: "grab",
                    }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "#0f172a", marginBottom: 6 }}>
                        {task.title}
                      </div>
                      <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 8 }}>{task.project}</div>
                      <div style={{
                        display: "inline-flex", alignItems: "center", gap: 5,
                        background: "#f1f5f9", borderRadius: 20, padding: "2px 8px",
                      }}>
                        <div style={{
                          width: 18, height: 18, borderRadius: "50%",
                          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 9, color: "white", fontWeight: 700,
                        }}>
                          {task.assignee.split(" ").map(n => n[0]).join("")}
                        </div>
                        <span style={{ fontSize: 11, color: "#475569" }}>{task.assignee}</span>
                      </div>
                    </div>
                  ))}
                  <button style={{
                    width: "100%", padding: "8px", borderRadius: 8,
                    border: "1px dashed #e2e8f0", background: "transparent",
                    color: "#94a3b8", fontSize: 12, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
                  }}>
                    <Plus size={12} /> Add task
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
