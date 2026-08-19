const exampleNotam = {
  number: "A0123/24",
  q: "EGTT/QMRLC/IV/NBO/A/000/999/5128N00027W005",
  a: "EGLL",
  b: "2405010800",
  c: "2405011700",
  d: "—",
  e: "RWY 09L/27R CLSD TO ALL TFC DUE TO WIP.",
};

export default function ComparePage() {
  const mono: React.CSSProperties = {
    fontFamily: "var(--font-geist-mono)",
    fontSize: "12px",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--background)",
        color: "var(--text-primary)",
        padding: "48px 32px",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "40px" }}>
          <h1
            style={{
              fontSize: "18px",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              marginBottom: "6px",
            }}
          >
            Layout Comparison
          </h1>
          <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
            Both options show the same NOTAM. Pick the one that feels right.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "32px",
            alignItems: "start",
          }}
        >
          {/* ── Option A: inline block ── */}
          <div>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginBottom: "12px",
              }}
            >
              Option A — Inline block (current)
            </p>

            {/* question row */}
            <div style={{ display: "flex", gap: "14px" }}>
              {/* number */}
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "5px",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: "3px",
                }}
              >
                <span style={{ ...mono, fontSize: "11px", fontWeight: 700, color: "var(--text-muted)" }}>
                  1
                </span>
              </div>

              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "7px" }}>
                {/* notam inline */}
                <div
                  style={{
                    padding: "10px 14px",
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "7px",
                    ...mono,
                    color: "var(--text-secondary)",
                    lineHeight: 1.7,
                    wordBreak: "break-all",
                  }}
                >
                  {exampleNotam.number} NOTAMN Q) {exampleNotam.q} A) {exampleNotam.a} B){" "}
                  {exampleNotam.b} C) {exampleNotam.c} D) {exampleNotam.d} E) {exampleNotam.e}
                </div>

                <textarea
                  rows={2}
                  placeholder="Your interpretation…"
                  style={{ resize: "vertical", fontSize: "13px" }}
                />
              </div>
            </div>
          </div>

          {/* ── Option B: each field on its own line ── */}
          <div>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginBottom: "12px",
              }}
            >
              Option B — Per-field lines
            </p>

            {/* question row */}
            <div style={{ display: "flex", gap: "14px" }}>
              {/* number */}
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "5px",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: "3px",
                }}
              >
                <span style={{ ...mono, fontSize: "11px", fontWeight: 700, color: "var(--text-muted)" }}>
                  1
                </span>
              </div>

              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "7px" }}>
                {/* notam per-line card */}
                <div
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "7px",
                    overflow: "hidden",
                    ...mono,
                    color: "var(--text-secondary)",
                  }}
                >
                  {/* header row */}
                  <div
                    style={{
                      padding: "7px 14px",
                      borderBottom: "1px solid var(--border)",
                      background: "var(--surface-2)",
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    <span style={{ fontWeight: 700, color: "var(--accent)" }}>
                      {exampleNotam.number}
                    </span>
                    <span style={{ color: "var(--text-muted)" }}>NOTAMN</span>
                  </div>

                  {/* Q */}
                  <div
                    style={{
                      padding: "5px 14px",
                      borderBottom: "1px solid var(--border)",
                      display: "flex",
                      gap: "8px",
                    }}
                  >
                    <span style={{ color: "var(--text-muted)", minWidth: "20px" }}>Q)</span>
                    <span style={{ wordBreak: "break-all" }}>{exampleNotam.q}</span>
                  </div>

                  {/* A–E */}
                  {[
                    { k: "A)", v: exampleNotam.a },
                    { k: "B)", v: exampleNotam.b },
                    { k: "C)", v: exampleNotam.c },
                    { k: "D)", v: exampleNotam.d },
                    { k: "E)", v: exampleNotam.e },
                  ].map((row, i, arr) => (
                    <div
                      key={row.k}
                      style={{
                        padding: "5px 14px",
                        borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none",
                        display: "flex",
                        gap: "8px",
                      }}
                    >
                      <span style={{ color: "var(--accent)", minWidth: "20px", fontWeight: 600 }}>
                        {row.k}
                      </span>
                      <span>{row.v}</span>
                    </div>
                  ))}
                </div>

                <textarea
                  rows={2}
                  placeholder="Your interpretation…"
                  style={{ resize: "vertical", fontSize: "13px" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* height comparison note */}
        <div
          style={{
            marginTop: "40px",
            padding: "14px 16px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            fontSize: "13px",
            color: "var(--text-muted)",
          }}
        >
          ℹ &nbsp; With 10 questions, Option A will be shorter overall but harder to scan quickly.
          Option B is slightly taller per item but much easier to read field-by-field.
          Both use the same textarea height.
        </div>
      </div>
    </div>
  );
}
