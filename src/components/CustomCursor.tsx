/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  
  // Keep track of target position for lerp
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Only enable on desktop/pointer device
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) return;

    // Add global class to hide default cursor
    document.body.classList.add("custom-cursor-area");

    const onMouseMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      setIsVisible(true);

      // Check if hovering a CTA or clickable
      const targetElement = e.target as HTMLElement | null;
      if (targetElement) {
        const isClickable =
          targetElement.closest("button") ||
          targetElement.closest("a") ||
          targetElement.closest('[role="button"]') ||
          targetElement.closest(".interactive-cursor") ||
          window.getComputedStyle(targetElement).cursor === "pointer";
          
        setIsHovered(!!isClickable);
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    // Smooth LERP (linear interpolation) loop
    let animationFrameId: number;
    const updatePosition = () => {
      const ease = 0.15; // smooth drag lag
      current.current.x += (target.current.x - current.current.x) * ease;
      current.current.y += (target.current.y - current.current.y) * ease;

      setPosition({ x: current.current.x, y: current.current.y });
      animationFrameId = requestAnimationFrame(updatePosition);
    };
    
    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      document.body.classList.remove("custom-cursor-area");
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const [hasPointer, setHasPointer] = useState(false);
  useEffect(() => {
    setHasPointer(window.matchMedia("(pointer: fine)").matches);
  }, []);

  if (!hasPointer || !isVisible) return null;

  return (
    <div
      ref={cursorRef}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
      }}
      className={`fixed z-50 rounded-full transition-all duration-300 ease-out border border-brand-gold ${
        isHovered
          ? "w-14 h-14 bg-brand-gold/20 scale-110"
          : "w-8 h-8 bg-transparent"
      }`}
    />
  );
}
