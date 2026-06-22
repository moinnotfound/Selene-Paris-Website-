/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { SOURCING_POINTS } from "../data";
import { MapPin, ArrowRight, Play, Compass } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export default function BrandStory() {
  const [selectedPoint, setSelectedPoint] = useState(SOURCING_POINTS[0]);
  const [playVideo, setPlayVideo] = useState(false);
  const [startSignatureDraw, setStartSignatureDraw] = useState(false);

  useEffect(() => {
    // Trigger signature draw animation delay
    const timer = setTimeout(() => {
      setStartSignatureDraw(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-brand-bg py-12 md:py-24 space-y-24 md:space-y-40 select-none">
      
      {/* 1. Header Hero editorial block */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-6">
        <ScrollReveal>
          <span className="font-serif italic text-lg text-brand-gold tracking-widest block font-light">
            Notre Philosophie
          </span>
          <h1 className="font-serif text-4xl md:text-6xl tracking-[0.1em] text-brand-noir uppercase mt-3 font-light leading-snug">
            Deceleration of the Daily Act
          </h1>
          <div className="w-20 h-[1.5px] bg-brand-gold mx-auto mt-8"></div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="font-sans text-brand-stone text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-light pt-4">
            SELÈNE was born from a desire to reclaim the silent margins of the morning and evening. 
            We reject the pharmaceutical plastic, loud colors, and mechanical haste of mass-produced personal care.
            Our objects are crafted from real, living materials—bone, brass, travertine, beeswax—designed to patina with your years and serve as quiet guardians of your daily refinement.
          </p>
        </ScrollReveal>
      </section>

      {/* 2. Parallax alternating editorial layouts */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
        <ScrollReveal>
          <div className="aspect-[4/5] bg-brand-smoke overflow-hidden rounded-xs shadow-md">
            <img
              src="/src/assets/images/selene_toothbrush_1782103208011.jpg"
              alt="Sculpting natural bone frames"
              className="w-full h-full object-cover mix-blend-multiply hover:scale-105 transition-transform duration-800"
              referrerPolicy="no-referrer"
            />
          </div>
        </ScrollReveal>
        
        <div className="space-y-6 md:pr-12">
          <ScrollReveal delay={0.15}>
            <span className="font-serif text-brand-gold text-xs uppercase tracking-[0.3em] font-medium">
              Episode I • Structural Honesty
            </span>
            <h2 className="font-serif text-3xl tracking-widest uppercase text-brand-noir mt-3">
              Jura Bone & Lead-Free Brass
            </h2>
            <div className="w-12 h-[1px] bg-brand-gold mt-4 mb-6"></div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="font-sans text-xs text-brand-stone leading-relaxed font-light">
              Each handle of L'Objet Brossé is shaped from ethically reclaimed high-density white bone. 
              Each neck is spun from raw brass on vintage lathes in our Jura workshop—a family operation functioning since the late nineteenth century. 
              Unpolished and untreated, the copper and zinc slowly oxidize with the oil of your fingers, tracing a beautiful, golden-amber personal map of your grasp.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center md:flex-row-reverse">
        <div className="space-y-6 md:pl-12 order-2 md:order-1">
          <ScrollReveal>
            <span className="font-serif text-brand-gold text-xs uppercase tracking-[0.3em] font-medium">
              Episode II • The Mineral Grounding
            </span>
            <h2 className="font-serif text-3xl tracking-widest uppercase text-brand-noir mt-3">
              Volcanic Silt & Tuscan Canyons
            </h2>
            <div className="w-12 h-[1px] bg-brand-gold mt-4 mb-6"></div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p className="font-sans text-xs text-brand-stone leading-relaxed font-light">
              Our soap rest on solid tiles of raw Tuscan travertine stone. 
              Quarried in Siena, the limestone is sawn with high-pressure diamond cables without filling the natural gas tubules. 
              The porous travertine naturally siphons drops of moisture away from your olive oil base, shielding the saponified lipids and ensuring dry, clean, bone preservation.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal className="order-1 md:order-2">
          <div className="aspect-[4/5] bg-brand-smoke overflow-hidden rounded-xs shadow-md">
            <img
              src="/src/assets/images/selene_soap_1782103236712.jpg"
              alt="Raw travertine block curing"
              className="w-full h-full object-cover mix-blend-multiply hover:scale-105 transition-transform duration-800"
              referrerPolicy="no-referrer"
            />
          </div>
        </ScrollReveal>
      </section>

      {/* 3. Interactive Sourcing Map */}
      <section className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-4">
          <span className="font-serif italic text-sm text-brand-gold tracking-widest block font-light">
            La Sourcing Geometrie
          </span>
          <h2 className="font-serif text-2xl md:text-3xl tracking-widest text-brand-noir uppercase font-light">
            Our Sourcing Cartography
          </h2>
          <p className="font-sans text-[0.68rem] text-brand-stone tracking-wider font-light">
            Each formula originates where tectonic shifts and historical trades align. Click on the nodes to map the origins.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-6">
          
          {/* Poetic description card */}
          <div className="bg-brand-smoke p-8 flex flex-col justify-between border border-brand-smoke/80 shadow-xs relative overflow-hidden rounded-xs lg:col-span-1">
            <div className="space-y-6 z-10">
              <div className="flex items-center space-x-2 text-brand-gold">
                <Compass className="w-5 h-5 stroke-[1.2] animate-spin" style={{ animationDuration: "12s" }} />
                <span className="font-sans text-[0.6rem] tracking-[0.25em] uppercase font-semibold">
                  Source Node {selectedPoint.id}
                </span>
              </div>
              
              <div className="space-y-1">
                <span className="font-sans text-[0.65rem] tracking-widest text-brand-stone block">
                  {selectedPoint.location}
                </span>
                <h3 className="font-serif text-xl text-brand-noir uppercase tracking-[0.1em]">
                  {selectedPoint.name}
                </h3>
              </div>
              
              <div className="border-t border-brand-stone/20 pt-4 space-y-2">
                <span className="font-serif italic text-xs text-brand-gold">
                  Harvested Material:
                </span>
                <p className="font-sans text-xs text-brand-noir/90 font-medium">
                  {selectedPoint.material}
                </p>
              </div>

              <p className="font-sans text-xs text-brand-stone leading-relaxed font-light pt-2">
                {selectedPoint.description}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-brand-stone/10 text-right z-10">
              <span className="font-serif italic text-[0.68rem] text-brand-stone">
                Sélène Natural Reserves
              </span>
            </div>
            
            {/* Ambient vector texture background */}
            <div className="absolute -bottom-16 -right-16 text-brand-stone/5 select-none pointer-events-none transform rotate-12">
              <Compass className="w-64 h-64 font-thin" />
            </div>
          </div>

          {/* Map display */}
          <div className="bg-brand-smoke border border-brand-smoke/80 relative overflow-hidden h-[450px] lg:col-span-2 select-none flex items-center justify-center rounded-xs">
            {/* Base Coordinate Grid lines */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#8b8178_1px,transparent_1px),linear-gradient(to_bottom,#8b8178_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            
            {/* Faux Minimal European Outline drawing */}
            <svg viewBox="0 0 800 500" className="w-full h-full object-cover opacity-35 filter contrast-125 select-none pointer-events-none">
              {/* Abstract ocean vectors and islands */}
              <path
                d="M100 120 C 150 150, 200 80, 280 140 C 350 200, 390 120, 480 180 C 520 220, 600 180, 700 240 L 800 300 L 780 480 L 120 480 Z"
                fill="none"
                stroke="#B8965A"
                strokeWidth="1.2"
                strokeDasharray="4 4"
              />
              <path
                d="M320 210 C 380 230, 410 180, 450 240 C 490 280, 420 330, 380 290 Z"
                fill="none"
                stroke="#8B8178"
                strokeWidth="0.8"
              />
            </svg>

            {/* Pulsating origin glowing points mapper */}
            {SOURCING_POINTS.map((pt) => {
              const active = pt.id === selectedPoint.id;
              return (
                <button
                  key={pt.id}
                  onClick={() => setSelectedPoint(pt)}
                  style={{
                    left: `${pt.coordinates.x}%`,
                    top: `${pt.coordinates.y}%`,
                  }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-20 flex flex-col items-center"
                >
                  {/* Glowing circles */}
                  <div className="relative flex items-center justify-center">
                    <div
                      className={`absolute w-10 h-10 rounded-full transition-all duration-300 ${
                        active ? "bg-brand-gold/25 animate-ping" : "bg-transparent group-hover:bg-brand-gold/15"
                      }`}
                    />
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                        active ? "bg-brand-gold border-brand-noir" : "bg-brand-bg border-brand-stone hover:border-brand-gold"
                      }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${active ? "bg-brand-noir" : "bg-brand-gold"}`} />
                    </div>
                  </div>
                  
                  {/* Subtle Node label */}
                  <span
                    className={`mt-2 font-serif text-[0.55rem] tracking-widest uppercase transition-all whitespace-nowrap bg-brand-bg px-2 py-0.5 border border-brand-smoke shadow-xs ${
                      active ? "text-brand-noir border-brand-gold" : "text-brand-stone group-hover:text-brand-noir"
                    }`}
                  >
                    {pt.name}
                  </span>
                </button>
              );
            })}

            {/* Scale indicator */}
            <div className="absolute bottom-4 right-4 bg-brand-bg/95 border border-brand-smoke rounded-xs px-3 py-1.5 text-right font-sans text-[0.52rem] tracking-wider text-brand-stone">
              <span>SCALE 1 : 24,000 MERCATOR CRU</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Behind the formula Video Placeholder */}
      <section className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="bg-brand-noir relative aspect-video overflow-hidden group rounded-xs border border-brand-smoke">
            {playVideo ? (
              <iframe
                title="Behind the formula"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                className="w-full h-full object-cover"
                allow="autoplay; encrypted-media"
              ></iframe>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-6">
                {/* Visual Placeholder for high luxury video */}
                <img
                  src="/src/assets/images/selene_hero_1782103267922.jpg"
                  alt="Process Cinematography background"
                  className="absolute inset-0 w-full h-full object-cover opacity-45 mix-blend-multiply"
                  referrerPolicy="no-referrer"
                />

                <div className="z-10 bg-brand-bg/95 border border-brand-gold/30 hover:border-brand-gold p-6 rounded-full cursor-pointer transition-all duration-300 transform group-hover:scale-110 flex items-center justify-center flex-shrink-0" onClick={() => setPlayVideo(true)}>
                  <Play className="w-8 h-8 text-brand-gold fill-brand-gold pl-1 stroke-[1]" />
                </div>
                
                <div className="z-10 space-y-2 pointer-events-none">
                  <span className="font-serif italic text-sm text-brand-gold tracking-widest block font-light">
                    Sensory Film
                  </span>
                  <h3 className="font-serif text-2xl tracking-[0.15em] text-brand-bg uppercase">
                    Behind the formula : Part IV
                  </h3>
                  <span className="font-sans text-[0.6rem] tracking-widest uppercase text-brand-stone block">
                    Duration: 15 seconds looping artisan process
                  </span>
                </div>
              </div>
            )}
          </div>
        </ScrollReveal>
      </section>

      {/* 5. Editorial Founder Letter & Animated Signature Signature */}
      <section className="max-w-xl mx-auto px-6 text-center space-y-8 select-none py-12 border-t border-brand-smoke/40">
        <ScrollReveal>
          <span className="font-serif italic text-base text-brand-gold">
            A Note from the Founder
          </span>
          <p className="font-serif text-sm leading-relaxed text-brand-stone font-light text-justify italic mt-4">
            “True deceleration is not a destination; it is the quality of attention we invest in our most repetitive acts. 
            When you hold the bone weight of L’Objet Brossé or watch the beeswax pool expand inside L’Ambre Céleste, 
            you are not consuming. You are declaring that your minutes belong to you, and you alone.”
          </p>
        </ScrollReveal>

        {/* Founder Signature Path Draw Animation */}
        <ScrollReveal delay={0.2}>
          <div className="flex flex-col items-center">
            <svg
              className="w-48 h-16 text-brand-gold"
              viewBox="0 0 200 60"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <g
                style={{
                  strokeDasharray: 300,
                  strokeDashoffset: startSignatureDraw ? 0 : 300,
                  transition: "stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {/* Sélène Founder mockup Cursive path script */}
                <path d="M 20 25 C 23 12, 10 32, 28 20 C 35 12, 45 35, 55 18 C 65 5, 58 45, 68 30 C 78 15, 82 28, 92 18 C 102 8, 115 32, 125 12 C 135 -5, 140 40, 150 15 C 160 2, 175 35, 185 20" />
                <path d="M 40 32 Q 90 28 160 30" strokeWidth="0.8" />
              </g>
            </svg>
            <span className="font-serif text-[0.62rem] uppercase tracking-[0.25em] text-brand-stone mt-2 block">
              Marc-Antoine Sélène
            </span>
            <span className="font-sans text-[0.55rem] uppercase tracking-widest text-brand-stone/60 font-light mt-0.5">
              Creator of SÉLÈNE PARIS
            </span>
          </div>
        </ScrollReveal>
      </section>

    </div>
  );
}
