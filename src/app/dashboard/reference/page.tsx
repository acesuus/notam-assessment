export default function ReferencePage() {
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
          NOTAM Reference
        </h1>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
          Quick reference guide for NOTAM code categories and definitions.
        </p>
      </div>

      {/* Search bar placeholder */}
      <div style={{ marginBottom: "24px" }}>
        <input
          type="text"
          placeholder="Search NOTAM codes (e.g. QMRLC, RWY, CLSD…)"
          style={{ maxWidth: "400px" }}
          disabled
        />
      </div>

      {/* Category Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "16px",
        }}
      >
        {[
          {
            category: "Airspace Organization",
            code: "QA___",
            desc: "Covers airspace designations, FIR, UIR, and ATS route changes.",
            count: "—",
          },
          {
            category: "COM / Navigation Aids",
            code: "QC___ / QN___",
            desc: "Communication and navigation facility status, outages, and changes.",
            count: "—",
          },
          {
            category: "Lighting Facilities",
            code: "QL___",
            desc: "Approach lights, runway lights, PAPI, VASI, and other lighting NOTAMs.",
            count: "—",
          },
          {
            category: "Movement Areas",
            code: "QM___",
            desc: "Runway, taxiway, apron closures, reduced width, and surface conditions.",
            count: "—",
          },
          {
            category: "Instrument Approaches",
            code: "QI___",
            desc: "ILS, VOR/DME, RNP approach changes, minima, and withdrawals.",
            count: "—",
          },
          {
            category: "Obstacles",
            code: "QO___",
            desc: "New, changed, or removed obstacles within the aerodrome vicinity.",
            count: "—",
          },
        ].map((cat) => (
          <div
            key={cat.category}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "10px",
              padding: "20px",
              cursor: "pointer",
              transition: "border-color 0.15s",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "12px",
                color: "var(--accent)",
                background: "var(--accent-muted)",
                borderRadius: "4px",
                padding: "3px 8px",
                display: "inline-block",
                marginBottom: "12px",
              }}
            >
              {cat.code}
            </div>
            <h3
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--text-primary)",
                marginBottom: "6px",
                letterSpacing: "-0.01em",
              }}
            >
              {cat.category}
            </h3>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              {cat.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div
        style={{
          marginTop: "24px",
          padding: "14px 16px",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "8px",
          fontSize: "13px",
          color: "var(--text-muted)",
        }}
      >
        ℹ &nbsp; Full content coming soon. This reference guide will be populated with
        complete NOTAM Q-code definitions and examples.
      </div>
    </div>
  );
}
