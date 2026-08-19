import Link from "next/link";
import { signup } from "./actions";
import PasswordInput from "@/components/PasswordInput";

export default async function RegisterPage({
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
              Create account
            </h1>
          </div>

          <form action={signup} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label
                htmlFor="name"
                style={{ fontSize: "13px", fontWeight: 500, color: "var(--text-secondary)" }}
              >
                Full name
              </label>
              <input
                id="name"
                name="name"
                placeholder="John Doe"
                type="text"
                required
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label
                htmlFor="email"
                style={{ fontSize: "13px", fontWeight: 500, color: "var(--text-secondary)" }}
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label
                htmlFor="password"
                style={{ fontSize: "13px", fontWeight: 500, color: "var(--text-secondary)" }}
              >
                Password
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
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontWeight: 500,
                fontSize: "14px",
                cursor: "pointer",
                transition: "opacity 0.15s",
                marginTop: "4px",
              }}
            >
              Create Account
            </button>
          </form>

          <p
            style={{
              marginTop: "24px",
              fontSize: "13px",
              color: "var(--text-muted)",
              textAlign: "center",
            }}
          >
            Already have an account?{" "}
            <Link
              href="/login"
              style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 500 }}
            >
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
