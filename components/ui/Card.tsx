import { ReactNode, CSSProperties } from "react";

interface CardProps {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}

export function Card({ children, style }: CardProps) {
  return (
    <div style={{
      background: "#ffffff",
      borderRadius: 12,
      border: "1px solid #e2e8f0",
      padding: 20,
      ...style,
    }}>
      {children}
    </div>
  );
}

export function CardHeader({ children, style }: CardProps) {
  return (
    <div style={{ marginBottom: 16, ...style }}>
      {children}
    </div>
  );
}

export function CardTitle({ children, style }: CardProps) {
  return (
    <h3 style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", ...style }}>
      {children}
    </h3>
  );
}
