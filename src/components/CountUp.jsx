/**
 * CountUp.jsx
 * Smooth animated count-up component for stats cards (0 -> target value).
 * Triggers animation when scrolled into view.
 */

import React, { useEffect, useState, useRef } from 'react';
import { useInView, animate } from 'framer-motion';

export default function CountUp({ end, decimals = 1, duration = 2, suffix = '', prefix = '' }) {
  const [displayValue, setDisplayValue] = useState(0);
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, end, {
      duration,
      ease: [0.16, 1, 0.3, 1], // Vercel ease-out
      onUpdate: (latest) => {
        setDisplayValue(latest);
      },
    });

    return () => controls.stop();
  }, [isInView, end, duration]);

  const formatted = decimals > 0 && end % 1 !== 0
    ? displayValue.toFixed(decimals)
    : Math.floor(displayValue).toString();

  return (
    <span ref={nodeRef}>
      {prefix}{formatted}{suffix}
    </span>
  );
}
