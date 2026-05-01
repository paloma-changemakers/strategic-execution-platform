"use client";

import { useState } from "react";
import { Target, Mail, Lock, ArrowRight } from "lucide-react";

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("paloma@futurefounders.co");
  const [password, setPassword] = useState("••••••••");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 900);
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      background: "#f8fafc",
    }}>
      {/* Left panel — branding */}
      <div style={{
        width: "45%",
        background: "linear-gradient(145deg, #0f172a 0%, #1e1b4b 60%, #312e81 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "48px 52px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Background decoration */}
        <div style={{
          position: "absolute", top: -80, right: -80,
          width: 320, height: 320, borderRadius: "50%",
          background: "rgba(99,102,241,0.15)",
        }} />
        <div style={{
          position: "absolute", bottom: -60, left: -60,
          width: 240, height: 240, borderRadius: "50%",
          background: "rgba(139,92,246,0.1)",
        }} />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, position: "relative" }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Target size={20} color="white" />
          </div>
          <div>
            <div style={{ color: "white", fontWeight: 800, fontSize: 18, letterSpacing: "-0.02em" }}>SEP</div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>Strategic Execution Platform</div>
          </div>
        </div>

        {/* Main copy */}
        <div style={{ position: "relative" }}>
          <div style={{
            display: "inline-block",
            background: "rgba(99,102,241,0.2)",
            border: "1px solid rgba(99,102,241,0.3)",
            borderRadius: 20, padding: "4px 14px",
            fontSize: 12, color: "#a5b4fc", fontWeight: 600,
            marginBottom: 20,
          }}>
            Strategy → Execution → Results
          </div>
          <h1 style={{
            fontSize: 36, fontWeight: 800, color: "white",
            lineHeight: 1.2, letterSpacing: "-0.03em", marginBottom: 16,
          }}>
            Turn strategy into<br />
            <span style={{ color: "#818cf8" }}>measurable results</span>
          </h1>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, maxWidth: 340 }}>
            Built for innovation-driven organizations. Connect your North Star to daily execution — and adapt in real time.
          </p>
        </div>

        {/* Testimonial */}
        <div style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 12, padding: "18px 20px",
          position: "relative",
        }}>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, marginBottom: 12, fontStyle: "italic" }}>
            "SEP helped us go from scattered OKRs to a living strategy that our whole team actually uses every week."
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, color: "white", fontWeight: 700,
            }}>
              MR
            </div>
            <div>
              <div style={{ fontSize: 12, color: "white", fontWeight: 600 }}>María Rodríguez</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>CEO, Venture Studio MX</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel — login form */}
      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 48,
      }}>
        <div style={{ width: "100%", maxWidth: 380 }}>
          <div style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#0f172a", letterSpacing: "-0.02em", marginBottom: 6 }}>
              Welcome back
            </h2>
            <p style={{ fontSize: 14, color: "#64748b" }}>
              Sign in to your workspace
            </p>
          </div>

          {/* Google OAuth button */}
          <button
            onClick={handleLogin}
            style={{
              width: "100%", padding: "11px 16px",
              background: "white", border: "1px solid #e2e8f0",
              borderRadius: 10, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              fontSize: 14, fontWeight: 500, color: "#334155",
              marginBottom: 20,
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              transition: "all 0.15s",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
            <span style={{ fontSize: 12, color: "#94a3b8" }}>or sign in with email</span>
            <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
          </div>

          {/* Email */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>
              Email
            </label>
            <div style={{ position: "relative" }}>
              <Mail size={15} color="#94a3b8" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  width: "100%", padding: "10px 12px 10px 36px",
                  border: "1px solid #e2e8f0", borderRadius: 8,
                  fontSize: 14, color: "#0f172a", outline: "none",
                  background: "white",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: "#374151" }}>Password</label>
              <span style={{ fontSize: 12, color: "#6366f1", cursor: "pointer" }}>Forgot password?</span>
            </div>
            <div style={{ position: "relative" }}>
              <Lock size={15} color="#94a3b8" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{
                  width: "100%", padding: "10px 12px 10px 36px",
                  border: "1px solid #e2e8f0", borderRadius: 8,
                  fontSize: 14, color: "#0f172a", outline: "none",
                  background: "white",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleLogin}
            disabled={loading}
            style={{
              width: "100%", padding: "11px 16px",
              background: loading ? "#a5b4fc" : "#6366f1",
              color: "white", border: "none", borderRadius: 10,
              fontSize: 14, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              transition: "background 0.2s",
            }}
          >
            {loading ? "Signing in..." : (
              <>Sign in <ArrowRight size={15} /></>
            )}
          </button>

          <p style={{ textAlign: "center", fontSize: 13, color: "#94a3b8", marginTop: 24 }}>
            Don&apos;t have an account?{" "}
            <span style={{ color: "#6366f1", cursor: "pointer", fontWeight: 500 }}>Request access</span>
          </p>

          {/* Workspace badges */}
          <div style={{ marginTop: 36, padding: "14px 16px", background: "#f8fafc", borderRadius: 10, border: "1px solid #f1f5f9" }}>
            <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Recent workspaces
            </div>
            {[
              { name: "Future Founders Academy", role: "Admin", color: "#6366f1" },
              { name: "Venture Studio MX", role: "Executor", color: "#10b981" },
            ].map((ws, i) => (
              <div key={i} onClick={handleLogin} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "8px 10px", borderRadius: 8, cursor: "pointer",
                marginBottom: i === 0 ? 4 : 0,
                transition: "background 0.15s",
              }}
                onMouseEnter={e => (e.currentTarget.style.background = "#f1f5f9")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <div style={{
                  width: 28, height: 28, borderRadius: 7,
                  background: ws.color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, color: "white", fontWeight: 700, flexShrink: 0,
                }}>
                  {ws.name.split(" ").map(w => w[0]).slice(0, 2).join("")}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#0f172a" }}>{ws.name}</div>
                  <div style={{ fontSize: 11, color: "#94a3b8" }}>{ws.role}</div>
                </div>
                <ArrowRight size={13} color="#94a3b8" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
