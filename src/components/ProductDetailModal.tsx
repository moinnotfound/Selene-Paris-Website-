/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { Product } from "../types";
import { PRODUCTS } from "../data";
import { X, CornerRightDown, RotateCcw } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onNavigateToProduct: (product: Product) => void;
}

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  onNavigateToProduct,
}: ProductDetailModalProps) {
  // 360 Rotation Simulation States
  const [rotation, setRotation] = useState(0); // 0 to 359 degrees
  const [isDragging360, setIsDragging360] = useState(false);
  const startX = useRef(0);
  const currentRotation = useRef(0);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);

  // Ritual Confirmation State
  const [isAdded, setIsAdded] = useState(false);

  // Active Tab for ingredients / ceremony / origin
  const [activeTab, setActiveTab] = useState<"formula" | "ceremony">("formula");

  // Reset states when product changes
  useEffect(() => {
    setRotation(0);
    currentRotation.current = 0;
    setIsAdded(false);
    setActiveTab("formula");
  }, [product]);

  // Handle addition trigger
  const handleAddToRitual = () => {
    setIsAdded(true);
    onAddToCart(product);
    // Button reverts back after 1.5s
    setTimeout(() => {
      setIsAdded(false);
    }, 1800);
  };

  // 360 Spin Inertia Drag calculations
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging360(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    startX.current = clientX;
    lastX.current = clientX;
    lastTime.current = performance.now();
    velocity.current = 0;
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging360) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - lastX.current;
    const time = performance.now();
    const deltaTime = time - lastTime.current;

    // Calculate rotation movement
    // 1px drag = ~0.6 degrees
    const rotationDelta = deltaX * 0.6;
    currentRotation.current = (currentRotation.current + rotationDelta + 360) % 360;
    setRotation(Math.round(currentRotation.current));

    // Calculate velocity for inertia (degrees per ms)
    if (deltaTime > 0) {
      velocity.current = rotationDelta / deltaTime;
    }

    lastX.current = clientX;
    lastTime.current = time;
  };

  const handleDragEnd = () => {
    if (!isDragging360) return;
    setIsDragging360(false);

    // Apply inertia physics deceleration in animation loop
    let decay = 0.95;
    let currentVel = velocity.current * 16; // scaled to ~60fps
    
    const animateInertia = () => {
      if (Math.abs(currentVel) < 0.05) return;
      currentRotation.current = (currentRotation.current + currentVel + 360) % 360;
      setRotation(Math.round(currentRotation.current));
      
      currentVel *= decay;
      requestAnimationFrame(animateInertia);
    };

    if (Math.abs(currentVel) > 0.1) {
      requestAnimationFrame(animateInertia);
    }
  };

  // Text Bloom Character Splitting component for ingredient effect
  const TextBloom = ({ text }: { text: string }) => {
    const chars = text.split("");
    const [scrolledIn, setScrolledIn] = useState(false);
    const domRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setScrolledIn(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      if (domRef.current) {
        observer.observe(domRef.current);
      }
      return () => observer.disconnect();
    }, []);

    return (
      <span ref={domRef} className="inline-block select-none">
        {chars.map((char, index) => (
          <span
            key={index}
            className="inline-block transition-all ease-out"
            style={{
              opacity: scrolledIn ? 1 : 0,
              transform: scrolledIn ? "translateY(0)" : "translateY(-10px)",
              transitionDuration: "0.5s",
              transitionDelay: `${index * 0.025}s`,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-bg flex items-center justify-center p-0 md:p-6 select-none font-sans">
      {/* Modal Stage Container */}
      <div className="w-full h-full max-w-7xl md:h-[90vh] bg-brand-bg md:border border-brand-smoke shadow-2xl flex flex-col md:flex-row relative overflow-hidden rounded-xs">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-40 p-2 text-brand-stone hover:text-brand-noir border border-brand-stone/10 hover:border-brand-gold bg-brand-bg/90 transition-all duration-300 rounded-full"
        >
          <X className="w-5 h-5 stroke-[1.2]" />
        </button>

        {/* LEFT COLUMN: 60% Interactive Presentation Area */}
        <div className="w-full md:w-[60%] h-[50vh] md:h-full bg-brand-smoke border-b md:border-b-0 md:border-r border-brand-smoke relative select-none flex flex-col items-center justify-center p-8 overflow-hidden">
          
          {/* Subtle Ambient Glow for Candle */}
          {product.category === "candle" && (
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_rgba(184,150,90,0.12)_0%,_transparent_75%)] animate-pulse pointer-events-none" />
          )}

          {/* Sizing Indicator for 360 Spin */}
          <div className="absolute top-6 left-6 z-10 flex flex-col pointer-events-none select-none">
            <span className="font-serif text-[0.6rem] tracking-[0.3em] text-brand-gold uppercase">
              Interact • 360° Object Rotation
            </span>
            <span className="font-sans text-[0.55rem] tracking-[0.2em] text-brand-stone uppercase mt-1 leading-none">
              Drag to spin the object around its central axis.
            </span>
          </div>

          {/* Interactive Drag Rotation Container */}
          <div
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
            className="relative w-full max-w-md h-72 md:h-96 flex items-center justify-center cursor-grab active:cursor-grabbing z-10"
          >
            {/* The Product Image experiencing faux 3D rotate, perspective, shadow warping, reflection shift */}
            <div
              style={{
                perspective: "800px",
                transform: `rotateY(${rotation * 0.8}deg) scale(1.02)`,
                transition: isDragging360 ? "none" : "transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)",
              }}
              className="relative w-64 h-80 flex items-center justify-center select-none pointer-events-none"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain mix-blend-multiply drop-shadow-xl"
                referrerPolicy="no-referrer"
              />
              
              {/* Animated Light Shimmer Flare following rotation */}
              <div
                style={{
                  background: `linear-gradient(${135 + rotation}deg, transparent 30%, rgba(253,252,250,0.3) 50%, transparent 70%)`,
                  opacity: isDragging360 ? 0.35 : 0.1,
                  transition: isDragging360 ? "none" : "opacity 0.6s",
                }}
                className="absolute inset-0 rounded-xl"
              />
            </div>

            {/* Simulated Heavy Drop Shadow shifting based on angle */}
            <div
              style={{
                boxShadow: "0 45px 75px -10px rgba(15,14,13,0.15)",
                transform: `translateXZ(-50px) rotateY(${rotation * 0.2}deg)`,
                opacity: 0.45,
                transition: "transform 0.4s",
              }}
              className="absolute bottom-6 w-48 h-4 bg-brand-stone/30 rounded-full blur-[2px] pointer-events-none"
            />
          </div>

          {/* Rotation Degrees Display with Align Tooling */}
          <div className="absolute bottom-6 inset-x-8 flex items-center justify-between pointer-events-none select-none">
            <div className="flex items-center space-x-2 text-brand-stone/60">
              <RotateCcw className="w-3 h-3 stroke-[1.5]" />
              <span className="font-serif text-[0.6rem] uppercase tracking-widest font-light">
                {rotation}° RECURSION
              </span>
            </div>
            
            {/* Tick Mark scale */}
            <div className="flex items-center space-x-1.5 md:space-x-3">
              {[0, 90, 180, 270].map((deg) => (
                <div key={deg} className="flex items-center space-x-0.5">
                  <span
                    className={`font-sans text-[0.55rem] tracking-tighter ${
                      Math.abs(rotation - deg) < 45 ? "text-brand-gold font-medium" : "text-brand-stone/40"
                    }`}
                  >
                    {deg}°
                  </span>
                  <div
                    className={`w-[1px] h-1.5 ${
                      Math.abs(rotation - deg) < 45 ? "bg-brand-gold" : "bg-brand-stone/20"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 40% Editorial specifications & commerce */}
        <div className="w-full md:w-[40%] h-auto md:h-full overflow-y-auto p-6 md:p-8 flex flex-col justify-between bg-brand-bg">
          <div className="space-y-6">
            
            {/* SÉLÈNE No. label & origin */}
            <div className="flex items-center justify-between border-b border-brand-smoke pb-4">
              <span className="font-serif text-[0.7rem] uppercase tracking-[0.25em] text-brand-gold">
                Collection Spec • No. {product.id}
              </span>
              <span className="font-sans text-[0.65rem] uppercase tracking-widest text-brand-stone">
                {product.originCountry}
              </span>
            </div>

            {/* Main title & Price */}
            <div>
              <div className="flex justify-between items-baseline">
                <h2 className="font-serif text-2xl tracking-[0.14em] uppercase text-brand-noir">
                  {product.name}
                </h2>
                <span className="font-sans text-sm text-brand-gold tracking-widest">${product.price}</span>
              </div>
              <span className="font-serif italic text-sm text-brand-stone block mt-1">
                {product.frenchName}
              </span>
            </div>

            {/* Core Description block */}
            <p className="font-sans text-xs text-brand-stone/90 leading-relaxed font-light">
              {product.description}
            </p>

            {/* Tab Swappers */}
            <div className="flex border-b border-brand-smoke text-xs font-sans">
              <button
                onClick={() => setActiveTab("formula")}
                className={`py-3.5 pr-6 tracking-widest uppercase text-[0.65rem] transition-all relative ${
                  activeTab === "formula" ? "text-brand-noir font-normal" : "text-brand-stone hover:text-brand-noir"
                }`}
              >
                The Formula
                {activeTab === "formula" && (
                  <div className="absolute bottom-0 left-0 right-6 h-[1.5px] bg-brand-gold" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("ceremony")}
                className={`py-3.5 px-6 tracking-widest uppercase text-[0.65rem] transition-all relative ${
                  activeTab === "ceremony" ? "text-brand-noir font-normal" : "text-brand-stone hover:text-brand-noir"
                }`}
              >
                The Ceremony
                {activeTab === "ceremony" && (
                  <div className="absolute bottom-0 left-6 right-6 h-[1.5px] bg-brand-gold" />
                )}
              </button>
            </div>

            {/* Tab content 1: The Formula with Text Bloom ingredients */}
            {activeTab === "formula" && (
              <div className="space-y-4 pt-1">
                {product.ingredients.map((ing, i) => (
                  <div key={i} className="border-b border-brand-smoke/40 pb-3 last:border-0">
                    <div className="flex justify-between items-baseline mb-1">
                      {/* Interactive Text Bloom on Ingredient Names */}
                      <span className="font-serif text-xs uppercase tracking-[0.15em] text-brand-noir">
                        <TextBloom text={ing.name} />
                      </span>
                      <span className="font-serif italic text-[0.65rem] text-brand-gold">
                        {ing.origin}
                      </span>
                    </div>
                    <p className="font-sans text-[0.65rem] text-brand-stone/80 leading-relaxed">
                      {ing.info}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Tab content 2: The Ceremony steps */}
            {activeTab === "ceremony" && (
              <div className="space-y-4 pt-1">
                {product.ceremonySteps.map((step, i) => (
                  <div key={i} className="flex space-x-3 items-start pb-2 border-b border-brand-smoke/25 last:border-0">
                    <span className="font-serif text-xs text-brand-gold leading-none pt-0.5 select-none">
                      {step.step}
                    </span>
                    <div className="space-y-0.5">
                      <span className="font-serif text-[0.7rem] uppercase tracking-wider text-brand-noir block">
                        {step.title}
                      </span>
                      <p className="font-sans text-[0.65rem] text-brand-stone/85 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom segment: Add CTA and complementary recommendations */}
          <div className="space-y-6 pt-6 border-t border-brand-smoke/60 mt-8">
            {/* Add to Ritual Button */}
            <button
              onClick={handleAddToRitual}
              disabled={isAdded}
              className={`w-full overflow-hidden transition-all duration-300 py-4 font-sans text-xs uppercase tracking-[0.2em] relative flex items-center justify-center ${
                isAdded
                  ? "bg-brand-gold text-brand-noir"
                  : "bg-brand-noir text-brand-bg hover:bg-brand-gold hover:text-brand-noir"
              }`}
            >
              {isAdded ? (
                <div className="flex items-center space-x-2">
                  {/* Animated drawing SVG checkmark */}
                  <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24">
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      strokeWidth="1.5"
                      strokeDasharray="60"
                      strokeDashoffset="0"
                      className="circle-reveal"
                    />
                    <path
                      d="M9 12l2 2 4-4"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="20"
                      strokeDashoffset="0"
                      className="check-reveal"
                    />
                  </svg>
                  <span className="transition-all duration-300">Added to Ceremony</span>
                </div>
              ) : (
                <span>Add to Ritual</span>
              )}
            </button>

            {/* Complimentary Recommendations ("Pair With") */}
            <div>
              <div className="flex items-center justify-between pb-2 mb-3">
                <span className="font-serif text-[0.65rem] uppercase tracking-widest text-brand-stone">
                  Recommended Pairings
                </span>
                <CornerRightDown className="w-3.5 h-3.5 text-brand-gold stroke-[1.2]" />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {PRODUCTS.filter((p) => product.pairWithIds.includes(p.id)).map((candidate) => (
                  <div
                    key={candidate.id}
                    onClick={() => onNavigateToProduct(candidate)}
                    className="flex items-center space-x-2 bg-brand-smoke/40 hover:bg-brand-smoke p-2 border border-brand-smoke transition-all duration-300 hover:border-brand-gold cursor-pointer rounded-xs"
                  >
                    <div className="w-10 h-10 bg-brand-smoke flex-shrink-0 overflow-hidden select-none">
                      <img
                        src={candidate.image}
                        alt={candidate.name}
                        className="w-full h-full object-cover mix-blend-multiply"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <span className="font-serif text-[0.65rem] uppercase tracking-wide text-brand-noir leading-tight block">
                        {candidate.name}
                      </span>
                      <span className="font-sans text-[0.55rem] text-brand-stone">${candidate.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded CSS rules for SVG stroke checkmark reveal in pure CSS */}
      <style>{`
        @keyframes draw {
          from {
            stroke-dashoffset: 60;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        .circle-reveal {
          stroke-dasharray: 60;
          stroke-dashoffset: 60;
          animation: draw 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .check-reveal {
          stroke-dasharray: 20;
          stroke-dashoffset: 20;
          animation: draw 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.3s forwards;
        }
      `}</style>
    </div>
  );
}
