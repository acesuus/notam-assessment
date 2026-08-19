export default function AssessmentsPage() {
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
          Assessments
        </h1>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
          Choose an assessment to begin decoding practice.
        </p>
      </div>

      {/* Filter Row Placeholder */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "24px",
          flexWrap: "wrap",
        }}
      >
        {["All", "Beginner", "Intermediate", "Advanced"].map((filter) => (
          <button
            key={filter}
            style={{
              padding: "6px 14px",
              fontSize: "13px",
              fontWeight: 500,
              borderRadius: "6px",
              border: "1px solid var(--border)",
              background: filter === "All" ? "var(--surface-2)" : "none",
              color: filter === "All" ? "var(--text-primary)" : "var(--text-secondary)",
              cursor: "pointer",
            }}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Assessment Cards Placeholder */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "16px",
        }}
      >
        {[
          {
            title: "Basic NOTAM Decoding",
            desc: "Introductory level. Cover the fundamentals of NOTAM structure.",
            questions: 10,
            duration: "15 min",
            difficulty: "Beginner",
            diffColor: "var(--success)",
          },
          {
            title: "Airspace Restrictions",
            desc: "Focus on airspace-related NOTAM codes and their implications.",
            questions: 15,
            duration: "20 min",
            difficulty: "Intermediate",
            diffColor: "var(--warning)",
          },
          {
            title: "Runway & Lighting NOTAMs",
            desc: "Runway closures, lighting conditions, and obstacle notices.",
            questions: 20,
            duration: "30 min",
            difficulty: "Intermediate",
            diffColor: "var(--warning)",
          },
          {
            title: "Comprehensive Assessment",
            desc: "Full mixed-category test covering all NOTAM types.",
            questions: 30,
            duration: "45 min",
            difficulty: "Advanced",
            diffColor: "var(--danger)",
          },
        ].map((card) => (
          <div
            key={card.title}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "10px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              cursor: "pointer",
              transition: "border-color 0.15s",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-block",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: card.diffColor,
                  background: `${card.diffColor}18`,
                  borderRadius: "4px",
                  padding: "2px 8px",
                  marginBottom: "10px",
                }}
              >
                {card.difficulty}
              </div>
              <h3
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  marginBottom: "6px",
                  letterSpacing: "-0.01em",
                }}
              >
                {card.title}
              </h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                {card.desc}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                gap: "16px",
                paddingTop: "12px",
                borderTop: "1px solid var(--border)",
              }}
            >
              <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                {card.questions} questions
              </span>
              <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{card.duration}</span>
            </div>
            <button
              style={{
                width: "100%",
                padding: "9px",
                background: "var(--accent)",
                color: "var(--accent-fg)",
                border: "none",
                borderRadius: "7px",
                fontWeight: 500,
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              Start Assessment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
