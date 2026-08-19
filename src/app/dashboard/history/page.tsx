import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { getClassificationColor } from "@/utils/scoring";
import CircularProgress from "@/components/CircularProgress";

type AssessmentHistory = {
  id: string;
  created_at: string;
  overall_score: number;
  classification: string;
  details: any;
};

export default async function HistoryPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div>Please sign in to view your history.</div>;
  }

  const { data: historyData } = await supabase
    .from("assessment_history")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const history = historyData as AssessmentHistory[] || [];

  function getClassificationColor(classification: string) {
    if (classification === "Precise") return "var(--success)";
    if (classification === "Acceptable") return "var(--warning)";
    return "var(--error)";
  }

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "40px 24px 80px",
        width: "100%",
      }}
    >
      <div style={{ marginBottom: "32px", display: "flex", alignItems: "center", gap: "12px" }}>
        <Link href="/dashboard" className="back-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Dashboard
        </Link>
      </div>

      <div style={{ marginBottom: "24px" }}>
        <h1
          style={{
            fontSize: "20px",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
            marginBottom: "4px",
          }}
        >
          Assessment History
        </h1>
        <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>
          A complete log of all your previous NOTAM assessments.
        </p>
      </div>

      {history.length === 0 ? (
        <div
          style={{
            padding: "40px 20px",
            textAlign: "center",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
          }}
        >
          <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>
            You haven't taken any assessments yet.
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {history.map((record) => {
            const date = new Date(record.created_at);
            return (
              <div
                key={record.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px 20px",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <CircularProgress score={record.overall_score} classification={record.classification} size={52} strokeWidth={4.5} />
                  
                  <div style={{ textAlign: "left", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "6px" }}>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
                      Precision Rate
                    </p>
                    <div
                      style={{
                        padding: "2px 8px",
                        borderRadius: "6px",
                        background: "var(--surface-2)",
                        border: `1px solid ${getClassificationColor(record.classification)}`,
                        color: getClassificationColor(record.classification),
                        fontSize: "11px",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.02em"
                      }}
                    >
                      {record.classification}
                    </div>
                  </div>
                </div>

                <div>
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)", textAlign: "right" }}>
                    {date.toLocaleDateString()}
                  </p>
                  <p style={{ fontSize: "12px", color: "var(--text-muted)", textAlign: "right", marginTop: "2px" }}>
                    {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
