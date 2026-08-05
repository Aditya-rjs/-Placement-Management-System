/**
 * LNJPITLogo.jsx
 * Official Loknayak Jai Prakash Institute of Technology Brand Badge & Emblem
 */

import React from 'react';

export default function LNJPITLogo({ size = 42, className = '' }) {
  return (
    <div className={`lnjpit-logo-wrapper ${className}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        {/* Outer Gear Ring */}
        <path
          d="M80 10 L87 18 L97 15 L101 24 L111 24 L112 34 L121 37 L119 47 L127 52 L123 61 L130 68 L124 77 L129 86 L121 93 L124 103 L114 108 L114 118 L104 120 L101 130 L91 130 L86 138 L77 136 L71 144 L62 140 L54 146 L48 138 L38 141 L35 131 L25 131 L24 121 L15 118 L17 108 L9 103 L13 94 L6 87 L12 78 L7 69 L15 62 L13 52 L23 47 L25 37 L35 34 L36 24 L46 24 L50 15 L60 18 Z"
          fill="#1e293b"
          stroke="#3b82f6"
          strokeWidth="2.5"
        />

        {/* Outer Circle */}
        <circle cx="80" cy="80" r="62" fill="#0b0f19" stroke="#60a5fa" strokeWidth="2" />
        <circle cx="80" cy="80" r="50" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3" />

        {/* Torch Central Symbol */}
        <path d="M72 105 L80 65 L88 105 Z" fill="#2563eb" stroke="#60a5fa" strokeWidth="1.5" />
        <path d="M80 65 M70 58 Q80 40 90 58 Q80 50 70 58 Z" fill="#f59e0b" stroke="#fbbf24" strokeWidth="1.5" />

        {/* Crescent Moons */}
        <path d="M68 45 A14 14 0 0 1 84 32 A12 12 0 0 0 68 45 Z" fill="#60a5fa" />
        <path d="M78 52 A18 18 0 0 1 98 36 A16 16 0 0 0 78 52 Z" fill="#93c5fd" />

        {/* Radio Tower Right */}
        <path d="M106 72 L112 95 M118 72 L112 95 M112 65 L112 95" stroke="#60a5fa" strokeWidth="1.5" />
        <circle cx="112" cy="63" r="2" fill="#f59e0b" />
        <path d="M104 68 Q112 60 120 68" stroke="#60a5fa" strokeWidth="1" fill="none" />

        {/* Open Books Bottom */}
        <path d="M48 102 Q64 96 80 105 Q96 96 112 102 L112 122 Q96 116 80 125 Q64 116 48 122 Z" fill="#1e293b" stroke="#93c5fd" strokeWidth="1.5" />
        <path d="M52 106 L76 111 M52 112 L76 117 M84 111 L108 106 M84 117 L108 112" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      </svg>

      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.875rem', fontWeight: 800, color: 'var(--color-text)', letterSpacing: '-0.01em' }}>
          Loknayak Jai Prakash
        </span>
        <span style={{ fontSize: '0.725rem', color: 'var(--color-primary-light)', fontWeight: 600, letterSpacing: '0.02em' }}>
          Institute of Technology, Chapra
        </span>
      </div>
    </div>
  );
}
