import { ReactNode } from "react";

type BadgeVariant = "success" | "warning" | "danger" | "info" | "neutral" | "purple";

const variants: Record<BadgeVariant, { bg: string; color: string }> = {
  success: { bg: "#dcfce7", color: "#15803d" },
  warning: { bg: "#fef9c3", color: "#a16207" },
  danger:  { bg: "#fee2e2", color: "#b91c1c" },
  info:    { bg: "#dbeafe", color: "#1d4ed8" },
  neutral: { bg: "#f1f5f9", color: "#475569" },
  purple:  { bg: "#ede9fe", color: "#6d28d9" },
};

export function Badge({ children, variant = "neutral" }: { children: ReactNode; variant?: BadgeVariant }) {
  const { bg, color } = variants[variant];
  return (
    <span style={{
      background: bg, color, fontSize: 11, fontWeight: 600,
      padding: "2px 8px", borderRadius: 20, display: "inline-block",
    }}>
      {children}
    </span>
  );
}
