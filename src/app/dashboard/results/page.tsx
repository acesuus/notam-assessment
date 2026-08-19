export default function ResultsPage() {
  return (
    <div style={{ padding: "32px 40px" }}>
      <div style={{ marginBottom: "32px" }}>
        <h1
          style={{
            fontSize: "22px",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
            marginBottom: "4px",
          }}
        >
          My Results
        </h1>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
          Review your past assessment performance and history.
        </p>
      </div>

      {/* Table Header */}
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
            padding: "10px 20px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          {["Assessment", "Score", "Questions", "Duration", "Date"].map((col) => (
            <span
              key={col}
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {col}
            </span>
          ))}
        </div>

        {/* Empty State */}
        <div
          style={{
            padding: "60px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "4px",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 14L8 8L12 11L16 5" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-secondary)" }}>
            No results yet
          </p>
          <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
            Complete an assessment to see your results here.
          </p>
          <a
            href="/dashboard/assessments"
            style={{
              fontSize: "13px",
              color: "var(--accent)",
              textDecoration: "none",
              marginTop: "8px",
            }}
          >
            Browse assessments →
          </a>
        </div>
      </div>
    </div>
  );
}
