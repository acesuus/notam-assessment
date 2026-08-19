import Link from "next/link";
import { updatePassword } from "./actions";
import PasswordInput from "@/components/PasswordInput";

export default async function UpdatePasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ message: string }>;
}) {
  const params = await searchParams;
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--background)",
        color: "var(--text-primary)",
      }}
    >
      {/* Nav */}
      <nav
        style={{
          padding: "0 32px",
          height: "56px",
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            textDecoration: "none",
          }}
        >
          <span
            style={{
              fontSize: "15px",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: "var(--text-primary)",
            }}
          >
            NOTAM Assessment
          </span>
        </Link>
      </nav>

      {/* Form Container */}
      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 24px",
        }}
      >
        <div style={{ width: "100%", maxWidth: "380px" }}>
          <div style={{ marginBottom: "32px" }}>
            <h1
              style={{
                fontSize: "24px",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                marginBottom: "8px",
                color: "var(--text-primary)",
              }}
            >
              Update Password
            </h1>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
              Enter your new password below.
            </p>
          </div>

          <form action={updatePassword} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label
                htmlFor="password"
                style={{ fontSize: "13px", fontWeight: 500, color: "var(--text-secondary)" }}
              >
                New Password
              </label>
              <PasswordInput
                id="password"
                name="password"
                placeholder="••••••••"
                required
              />
            </div>

            {params?.message && (
              <div
                style={{
                  padding: "12px 14px",
                  background: "var(--danger-muted)",
                  border: "1px solid rgba(248,113,113,0.25)",
                  borderRadius: "8px",
                  fontSize: "13px",
                  color: "var(--danger)",
                }}
              >
                {params.message}
              </div>
            )}

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "10px",
                background: "var(--accent)",
                color: "var(--accent-fg)",
                border: "none",
                borderRadius: "8px",
                fontWeight: 500,
                fontSize: "14px",
                cursor: "pointer",
                transition: "opacity 0.15s",
                marginTop: "4px",
              }}
            >
              Update Password
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
