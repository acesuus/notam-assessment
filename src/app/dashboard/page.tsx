import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import CircularProgress from "@/components/CircularProgress";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
        Please sign in to view your dashboard.
      </div>
    );
  }

  // Fetch all history items to calculate stats, then we'll display the latest 3
  const { data: historyData } = await supabase
    .from("assessment_history")
    .select("id, overall_score, classification, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const history = historyData || [];
  const totalAssessments = history.length;
  
  let averageScore = 0;
  if (totalAssessments > 0) {
    const sum = history.reduce((acc, curr) => acc + curr.overall_score, 0);
    averageScore = Math.round(sum / totalAssessments);
  }

  const recentHistory = history.slice(0, 3);

  function getClassificationColor(classification: string) {
    if (classification === "Precise") return "var(--success)";
    if (classification === "Acceptable") return "var(--warning)";
    return "var(--error)";
  }

  return (
    <div
      style={{
        maxWidth: "640px",
        margin: "0 auto",
        padding: "48px 24px 80px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "40px",
      }}
    >
      {/* Welcome Section */}
      <div>
        <h1
          style={{
            fontSize: "24px",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
            marginBottom: "6px",
          }}
        >
          Overview
        </h1>
        <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>
          Welcome back, <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>{user.user_metadata?.name || user.email?.split("@")[0]}</span>
        </p>
      </div>

      {/* Stats & Actions */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        
        {/* Quick Stats Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
          <div
            className="stat-card glass-panel"
            style={{
              padding: "14px 18px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
            }}
          >
            <span style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 500 }}>Total Taken</span>
            <span style={{ fontSize: "24px", fontWeight: 700, color: "var(--text-primary)", fontFamily: "var(--font-geist-mono)", flexShrink: 0 }}>
              {totalAssessments}
            </span>
          </div>

          <div
            className="stat-card glass-panel"
            style={{
              padding: "14px 18px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
            }}
          >
            <span style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 500 }}>Avg Precision Rate</span>
            {totalAssessments > 0 ? (
              <CircularProgress
                score={averageScore}
                classification={averageScore >= 91 ? "Precise" : averageScore >= 75 ? "Acceptable" : "For Improvement"}
                size={52}
                strokeWidth={5}
              />
            ) : (
              <span style={{ fontSize: "24px", fontWeight: 700, color: "var(--text-primary)", fontFamily: "var(--font-geist-mono)" }}>—</span>
            )}
          </div>
        </div>

        {/* Primary Action Card */}
        <Link
          href="/assessment"
          className="dashboard-card"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            padding: "20px 24px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            textDecoration: "none",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                background: "var(--accent)",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--accent-fg)",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </div>
            <div>
              <h2 style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "2px" }}>
                Start New Assessment
              </h2>
              <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                Test your NOTAM decoding skill  
              </p>
            </div>
          </div>
          <div className="arrow-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </Link>
      </div>

      {/* Recent History */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-primary)" }}>
            History 
          </h2>
          {totalAssessments > 0 && (
            <Link
              href="/dashboard/history"
              className="back-btn"
              style={{ textDecoration: "none" }}
            >
              View All
            </Link>
          )}
        </div>

        {totalAssessments === 0 ? (
          <div style={{ padding: "32px 20px", textAlign: "center", border: "1px dashed var(--border)", borderRadius: "12px" }}>
            <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>No assessments taken yet.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {recentHistory.map((record) => {
              const date = new Date(record.created_at);
              return (
                <div
                  key={record.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px",
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "10px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <CircularProgress score={record.overall_score} classification={record.classification} size={48} strokeWidth={4} />
                    
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "6px" }}>
                      <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
                        Precision Rate
                      </span>
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
                  
                  <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                    {date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
