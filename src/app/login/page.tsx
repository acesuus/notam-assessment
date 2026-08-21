"use client";

import Link from "next/link";
import { login } from "./actions";
import PasswordInput from "@/components/PasswordInput";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        width: "100%",
        padding: "10px",
        background: pending ? "var(--surface-2)" : "var(--accent)",
        color: pending ? "var(--text-muted)" : "var(--accent-fg)",
        border: pending ? "1px solid var(--border)" : "none",
        borderRadius: "8px",
        fontWeight: 600,
        fontSize: "14px",
        cursor: pending ? "not-allowed" : "pointer",
        transition: "all 0.15s ease",
        marginTop: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
      }}
      onMouseEnter={(e) => {
        if (!pending) {
          (e.currentTarget as HTMLButtonElement).style.opacity = "0.85";
          (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
        }
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.opacity = "1";
        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
      }}
      onMouseDown={(e) => {
        if (!pending) {
          (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0) scale(0.98)";
        }
      }}
      onMouseUp={(e) => {
        if (!pending) {
          (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px) scale(1)";
        }
      }}
    >
      {pending ? (
        <>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ animation: "spin 0.8s linear infinite" }}
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
          Signing in…
        </>
      ) : (
        "Sign In"
      )}
    </button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useActionState(login, null);

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
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

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
            NOTAM Precision Assessment Tool (NPAT)
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
              Sign in
            </h1>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
              Enter your credentials to access your account.
            </p>
          </div>

          <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
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
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <label
                  htmlFor="password"
                  style={{ fontSize: "13px", fontWeight: 500, color: "var(--text-secondary)" }}
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  style={{ fontSize: "13px", fontWeight: 500, color: "var(--accent)", textDecoration: "none" }}
                >
                  Forgot password?
                </Link>
              </div>
              <PasswordInput
                id="password"
                name="password"
                placeholder="••••••••"
                required
              />
            </div>

            {state?.message && (
              <div
                style={{
                  padding: "12px 14px",
                  background: "var(--danger-muted)",
                  border: "1px solid rgba(248,113,113,0.25)",
                  borderRadius: "8px",
                  fontSize: "13px",
                  color: "var(--danger)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {state.message}
              </div>
            )}

            <SubmitButton />
          </form>

          <p
            style={{
              marginTop: "24px",
              fontSize: "13px",
              color: "var(--text-muted)",
              textAlign: "center",
            }}
          >
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 500 }}
            >
              Create one
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
