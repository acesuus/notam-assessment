import React from 'react';

function getClassificationColor(classification: string): string {
  switch (classification) {
    case 'Precise': return '#22c55e';
    case 'Acceptable': return '#f59e0b';
    case 'For Improvement': return '#ef4444';
    default: return 'var(--text-muted)';
  }
}

interface CircularProgressProps {
  score: number;
  classification: string;
  size?: number;
  strokeWidth?: number;
}

export default function CircularProgress({ score, classification, size = 48, strokeWidth = 4 }: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;
  const color = getClassificationColor(classification);

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--border)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="none"
          style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
        />
      </svg>
      <span style={{ position: 'absolute', fontSize: size * 0.28, fontWeight: 700, fontFamily: "var(--font-geist-mono)", color: 'var(--text-primary)' }}>
        {Math.round(score)}%
      </span>
    </div>
  );
}
