interface ProgressBarProps {
  value: number; // 0-100
  color?: string;
  height?: number;
  showLabel?: boolean;
}

export function ProgressBar({ value, color = "#6366f1", height = 6, showLabel = false }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{
        flex: 1, height, background: "#f1f5f9", borderRadius: height,
        overflow: "hidden",
      }}>
        <div style={{
          width: `${clamped}%`, height: "100%",
          background: color, borderRadius: height,
          transition: "width 0.4s ease",
        }} />
      </div>
      {showLabel && (
        <span style={{ fontSize: 12, color: "#64748b", minWidth: 32, textAlign: "right" }}>
          {clamped}%
        </span>
      )}
    </div>
  );
}
