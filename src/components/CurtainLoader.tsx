/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";

export default function CurtainLoader() {
  const [showLogo, setShowLogo] = useState(true);
  const [slideLift, setSlideLift] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // 0.6s Logo display, then fade out logo 0.2s before the 0.8s mark
    const logoTimer = setTimeout(() => {
      setShowLogo(false);
    }, 600);

    // After 0.8s, slide the curtain upward
    const slideTimer = setTimeout(() => {
      setSlideLift(true);
    }, 800);

    // Unmount from tree after curtain animation finishes (0.8s delay + 0.6s transition)
    const endTimer = setTimeout(() => {
      setIsDone(true);
    }, 1500);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(slideTimer);
      clearTimeout(endTimer);
    };
  }, []);

  if (isDone) return null;

  return (
    <div
      style={{
        transition: "transform 0.6s cubic-bezier(0.76, 0, 0.24, 1)",
      }}
      className={`fixed inset-0 z-50 bg-brand-bg flex items-center justify-center ${
        slideLift ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div
        className={`transition-opacity duration-300 flex flex-col items-center select-none ${
          showLogo ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="font-serif text-3xl md:text-5xl tracking-[0.3em] text-brand-noir uppercase font-light">
          SÉLÈNE
        </span>
        <span className="font-sans text-[0.65rem] tracking-[0.4em] text-brand-gold uppercase mt-4 font-normal">
          P A R I S
        </span>
        <div className="w-16 h-[1px] bg-brand-gold/30 mt-6 animate-pulse"></div>
      </div>
    </div>
  );
}
