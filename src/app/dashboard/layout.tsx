import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        color: "var(--text-primary)",
      }}
    >
      {/* Top Bar */}
      <header
        style={{
          height: "48px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "var(--glass-bg)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        {/* Logo */}
        <Link
          href="/dashboard"
          style={{ display: "flex", alignItems: "center", gap: "7px", textDecoration: "none" }}
        >
      
          <span style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "-0.01em", color: "var(--text-primary)" }}>
            NOTAM
          </span>
        </Link>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--text-secondary)" }}>
            {user.user_metadata?.name || user.email?.split("@")[0]}
          </span>

          <div style={{ width: "1px", height: "14px", background: "var(--border)" }} />

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <ThemeToggle />

            <form action="/auth/signout" method="post" style={{ display: "flex" }}>
              <button
                className="dashboard-subtle-btn"
                style={{
                  fontSize: "12px",
                  color: "var(--text-muted)",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                  padding: "0 12px",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontWeight: 500,
                  height: "28px",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Page content — full width */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>{children}</main>
    </div>
  );
}
