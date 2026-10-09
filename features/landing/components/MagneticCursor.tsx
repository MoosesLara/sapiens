'use client';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function MagneticCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth springs for the outer circle
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Tighter springs for the inner dot
  const dotSpringConfig = { damping: 20, stiffness: 400, mass: 0.2 };
  const dotXSpring = useSpring(cursorX, dotSpringConfig);
  const dotYSpring = useSpring(cursorY, dotSpringConfig);

  // Offset the dot to center it within the 32x32 circle
  const dotX = useTransform(dotXSpring, (x) => x + 13);
  const dotY = useTransform(dotYSpring, (y) => y + 13);

  useEffect(() => {
    setIsVisible(true);
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16); // Center the 32x32 cursor (16px offset)
      cursorY.set(e.clientY - 16);
    };
    
    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary pointer-events-none z-[9999] hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          mixBlendMode: 'difference'
        }}
      />
      {/* Dot inside */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-primary rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          x: dotX,
          y: dotY,
          mixBlendMode: 'difference'
        }}
      />
    </>
  );
}
