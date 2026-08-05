/**
 * HeroBackground.jsx
 * Premium, non-distracting background effects:
 * - Interactive mouse spotlight glow
 * - Animated technical grid overlay
 * - Soft Gaussian blur color circles
 * - Floating micro particles
 */

import React, { useState, useEffect } from 'react';

export default function HeroBackground() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 30 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {/* Dynamic Mouse Spotlight Light Effect */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(37, 99, 235, 0.15), transparent 80%)`,
          transition: 'background 0.3s ease-out',
        }}
      />

      {/* Blue Ambient Glow Blur Circles */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.22) 0%, rgba(14, 165, 233, 0.08) 50%, transparent 80%)',
          filter: 'blur(100px)',
          borderRadius: '50%',
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '-5%',
          width: '500px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
          filter: 'blur(90px)',
          borderRadius: '50%',
        }}
      />

      {/* Subtle Technical Grid Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at 50% 30%, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 30%, black 40%, transparent 80%)',
        }}
      />

      {/* Floating Micro-Particles */}
      <div className="hero-floating-particles">
        <div className="particle p1" />
        <div className="particle p2" />
        <div className="particle p3" />
        <div className="particle p4" />
      </div>
    </div>
  );
}
