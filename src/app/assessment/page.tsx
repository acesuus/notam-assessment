"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { calculatePrecision, ScoringResult } from "@/utils/scoring";
import ThemeToggle from "@/components/ThemeToggle";

// Assessment questions
const questions = [
  {
    id: 1,
    number: "B0763/26",
    q: "RPHI/QMXLC/IV/BO /A /000/999/1512N12033E005",
    a: "RPLC",
    b: "2602212300",
    c: "2602240230 EST",
    d: "2300-0230",
    e: "TWY F1 CLSD DUE WIP (REMOVAL AND REPAINTING OF PAVEMENT MARKINGS).\nRMK: PRESENCE OF MEN AND EQPT.",
    expectedQAB: "B Series 0763 Year 2026 New NOTAM Philippine FIR Concerning Taxiway Closed Significant to IFR and VFR NOTAM selected for pre-flight information briefing concerning flight operations Scope Aerodrome Surface to unlimited 1512 Degrees North 12033 Degrees East 005 Nautical miles radius Clark International Airport Effective from February 21 2026 at 2300 Zulu Until February 24 2026 at 0230 Zulu estimate Scheduled daily from 2300 Zulu to 0230 Zulu",
    expectedE: "Taxiway Foxtrot 1 closed due work in progress removal and repainting of pavement markings Remark Presence of Men and Equipment"
  },
  ...Array.from({ length: 9 }).map((_, i) => ({
    id: i + 2,
    number: "—",
    q: "—",
    a: "—",
    b: "—",
    c: "—",
    d: "—",
    e: "[Content pending]",
    expectedQAB: "",
    expectedE: ""
  }))
];

export default function AssessmentPage() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [scores, setScores] = useState<Record<number, ScoringResult>>({});
  const [focused, setFocused] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const rowRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const answeredCount = Object.keys(scores).length;
  const progress = (answeredCount / questions.length) * 100;
  
  const avgPrecision = answeredCount > 0 
    ? Math.round(Object.values(scores).reduce((acc, curr) => acc + curr.totalScore, 0) / answeredCount)
    : 0;

  function scrollToQuestion(id: number) {
    rowRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function handleBlur() {
    setFocused(null);
  }
  
  function submitAnswer(id: number, expectedQAB: string, expectedE: string) {
    const answer = answers[id] || "";
    if (answer.trim().length === 0) return;
    const result = calculatePrecision(answer, expectedQAB, expectedE);
    setScores(prev => ({ ...prev, [id]: result }));
  }

  function getClassificationColor(classification: string) {
    if (classification === "Precise") return "var(--success)";
    if (classification === "Acceptable") return "var(--warning)";
    return "var(--danger)";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (answeredCount < questions.length) {
      alert("Please submit an answer for all questions before completing the assessment.");
      return;
    }
    setIsSubmitting(true);
    
    try {
      const overallClassification = avgPrecision >= 91 ? "Precise" : avgPrecision >= 75 ? "Acceptable" : "For Improvement";
      const { saveAssessmentResult } = await import("./actions");
      await saveAssessmentResult(avgPrecision, overallClassification, scores);
      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
      alert("Failed to complete assessment.");
      setIsSubmitting(false);
    }
  }

  return (
    <div
      style={{
        maxWidth: "760px",
        margin: "0 auto",
        padding: "36px 24px 100px",
        width: "100%",
      }}
    >
      {/* Sticky header */}
      <div
        style={{
          position: "sticky",
          top: "0px",
          zIndex: 10,
          background: "var(--glass-bg)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          paddingTop: "20px",
          paddingBottom: "16px",
          marginBottom: "16px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {/* Title row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "14px",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
              <Link href="/dashboard" className="back-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                Back
              </Link>
              <h1
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "var(--text-primary)",
                  flex: 1,
                }}
              >
                NOTAM Precision Assessment Tool (NPAT)
              </h1>
              <ThemeToggle />
            </div>
    
          </div>

          <div style={{ textAlign: "right", opacity: answeredCount > 0 ? 1 : 0, transition: "opacity 0.3s" }}>
            <span style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Avg Precision
            </span>
            <div style={{ 
              fontSize: "20px", 
              fontWeight: 700, 
              color: avgPrecision >= 75 ? "var(--success)" : avgPrecision > 0 ? "var(--warning)" : "var(--text-muted)",
              fontFamily: "var(--font-geist-mono)" 
            }}>
              {avgPrecision}%
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div
          style={{
            height: "4px",
            background: "var(--surface-2)",
            borderRadius: "99px",
            overflow: "hidden",
            marginBottom: "12px",
            border: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: progress === 100 ? "var(--success)" : "var(--accent)",
              borderRadius: "99px",
              transition: "width 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease",
              boxShadow: progress > 0 ? `0 0 8px ${progress === 100 ? "var(--success-muted)" : "var(--accent-muted)"}` : "none",
            }}
          />
        </div>
      </div>

      {/* Questions */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px", paddingTop: "16px" }}>
        {questions.map((q) => {
          const isFocused = focused === q.id;
          const answer = answers[q.id] || "";
          const score = scores[q.id];
          const isDone = !!score;

          return (
            <div
              key={q.id}
              ref={(el) => { rowRefs.current[q.id] = el; }}
              className={`question-card glass-panel ${isFocused && !isDone ? "question-card-focused" : ""}`}
              style={{
                display: "flex",
                gap: "16px",
                padding: "20px",
                borderRadius: "14px",
                border: isDone ? `1px solid ${getClassificationColor(score.classification)}` : "1px solid var(--border)",
                boxShadow: isDone ? "0 4px 12px var(--shadow-color)" : "none",
                opacity: isDone && !isFocused ? 0.85 : 1,
                background: undefined,
                transition: "opacity 0.3s ease, border-color 0.3s ease, background 0.3s ease",
              }}
            >
              {/* Number badge */}
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "6px",
                  background: isDone ? "var(--surface)" : "var(--accent-muted)",
                  border: `1px solid ${isDone ? getClassificationColor(score.classification) : "transparent"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: "2px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: isDone ? getClassificationColor(score.classification) : "var(--accent)",
                  }}
                >
                  {q.id}
                </span>
              </div>

              {/* NOTAM + answer */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>
                {/* NOTAM block */}
                <div
                  style={{
                    padding: "16px",
                    background: "var(--nested-notam-bg)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "13px",
                    lineHeight: 1.9,
                    color: "var(--text-secondary)",
                  }}
                >
                  <div>
                    <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{q.number}</span>
                    <span style={{ color: "var(--text-muted)", marginLeft: "8px" }}>NOTAMN</span>
                  </div>
                  <div>
                    <span style={{ color: "var(--accent)", fontWeight: 600 }}>Q) </span>{q.q}
                  </div>
                  <div>
                    <span style={{ color: "var(--accent)", fontWeight: 600 }}>A) </span>{q.a}
                    <span style={{ color: "var(--accent)", fontWeight: 600, marginLeft: "16px" }}>B) </span>{q.b}
                    <span style={{ color: "var(--accent)", fontWeight: 600, marginLeft: "16px" }}>C) </span>{q.c}
                  </div>
                  <div>
                    <span style={{ color: "var(--accent)", fontWeight: 600 }}>D) </span>{q.d}
                  </div>
                  <div>
                    <span style={{ color: "var(--accent)", fontWeight: 600 }}>E) </span>{q.e}
                  </div>
                </div>

                {/* Textarea + score overlay */}
                <div style={{ position: "relative" }}>
                  <textarea
                    id={`answer-${q.id}`}
                    name={`answer-${q.id}`}
                    rows={4}
                    placeholder="Type your answer here...."
                    value={answer}
                    onChange={(e) => {
                      setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }));
                      // Auto-resize to content
                      e.target.style.height = "auto";
                      e.target.style.height = `${e.target.scrollHeight}px`;
                    }}
                    onFocus={() => !isDone && setFocused(q.id)}
                    onBlur={handleBlur}
                    disabled={isDone}
                    style={{
                      resize: "none",
                      overflow: "hidden",
                      fontSize: "14px",
                      padding: "12px",
                      borderColor: isDone 
                        ? getClassificationColor(score.classification) 
                        : isFocused 
                          ? "var(--accent)" 
                          : "var(--border)",
                      transition: "border-color 0.2s, box-shadow 0.2s",
                      boxShadow: isFocused ? "0 0 0 2px var(--accent-muted)" : "none",
                      width: "100%",
                      borderRadius: "8px",
                      opacity: isDone ? 0.7 : 1,
                      backgroundColor: isDone ? "var(--surface-2)" : "var(--surface)",
                      color: isDone ? "var(--text-secondary)" : "var(--text-primary)",
                      cursor: isDone ? "default" : "text",
                    }}
                  />

                  {/* Submission row for the card */}
                  {!isDone && (
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
                      <button
                        type="button"
                        onClick={() => submitAnswer(q.id, q.expectedQAB, q.expectedE)}
                        disabled={answer.trim().length === 0}
                        style={{
                          padding: "8px 20px",
                          background: answer.trim().length === 0 ? "var(--surface-2)" : "var(--accent)",
                          color: answer.trim().length === 0 ? "var(--text-muted)" : "var(--accent-fg)",
                          border: `1px solid ${answer.trim().length === 0 ? "var(--border)" : "transparent"}`,
                          borderRadius: "6px",
                          fontWeight: 500,
                          fontSize: "13px",
                          cursor: answer.trim().length === 0 ? "not-allowed" : "pointer",
                          transition: "background 0.2s, color 0.2s, transform 0.1s, box-shadow 0.2s",
                          boxShadow: answer.trim().length > 0 ? "0 2px 6px var(--shadow-color)" : "none"
                        }}
                      >
                        Submit Answer
                      </button>
                    </div>
                  )}

                  {/* Instant Score Display (permanent after submission) */}
                  {isDone && (
                    <div
                      className="animate-fade-in-up"
                      style={{
                        marginTop: "10px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        background: "var(--glass-score-bg)",
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                        padding: "6px 14px",
                        borderRadius: "99px",
                        border: `1.5px solid ${getClassificationColor(score.classification)}`,
                        boxShadow: `0 4px 14px rgba(0, 0, 0, 0.4), 0 0 10px ${getClassificationColor(score.classification)}20`,
                        fontSize: "13px",
                      }}
                    >
                      <span style={{ color: getClassificationColor(score.classification), fontWeight: 800 }}>
                        {score.totalScore}%
                      </span>
                      <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--text-muted)" }} />
                      <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>
                        {score.classification}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Final Submit */}
        <div
          style={{
            paddingTop: "16px",
            marginTop: "16px",
            borderTop: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
            {answeredCount < questions.length
              ? `${questions.length - answeredCount} question${questions.length - answeredCount !== 1 ? "s" : ""} remaining.`
              : "All questions answered"}
          </span>
          <button
            type="submit"
            disabled={answeredCount < questions.length || isSubmitting}
            style={{
              padding: "12px 32px",
              background: answeredCount < questions.length ? "var(--surface-2)" : "var(--success)",
              color: answeredCount < questions.length ? "var(--text-muted)" : "var(--accent-fg)",
              border: `1px solid ${answeredCount < questions.length ? "var(--border)" : "transparent"}`,
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "15px",
              cursor: answeredCount < questions.length ? "not-allowed" : "pointer",
              transition: "background 0.2s, color 0.2s",
              opacity: isSubmitting ? 0.7 : 1,
            }}
          >
            {isSubmitting ? "Completing..." : "Complete Assessment"}
          </button>
        </div>
      </form>
    </div>
  );
}
