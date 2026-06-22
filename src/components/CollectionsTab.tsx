/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Product } from "../types";
import { Clock, Archive, HelpCircle } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface CollectionsTabProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export default function CollectionsTab({ products, onSelectProduct }: CollectionsTabProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 34, hours: 12, minutes: 45, seconds: 12 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Filter archived past creations (e.g. SÉLÈNE No. 00 elements)
  const ARCHIVED_COLLECTIONS = [
    {
      id: "arc-01",
      name: "Le Gobelet Pur",
      frenchName: "gobelet à rincer en marbre de Carrare",
      price: "190 (Sold Out)",
      origin: "Carrara, Italy",
      image: "/src/assets/images/selene_soap_1782103236712.jpg", // reuse a high-qual asset for look
      year: "Autumn 2025 • Exhibit"
    },
    {
      id: "arc-02",
      name: "La Coquille Travertin",
      frenchName: "plat de savon en travertin brut",
      price: "110 (Sold Out)",
      origin: "Tuscany, Italy",
      image: "/src/assets/images/selene_soap_1782103236712.jpg",
      year: "Spring 2025 • Exhibit"
    }
  ];

  return (
    <div className="bg-brand-bg py-12 md:py-24 space-y-24 md:space-y-45 select-none max-w-7xl mx-auto px-6">
      
      {/* 1. Header with custom Limited Edition context overlay */}
      <section className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="font-serif italic text-base text-brand-gold tracking-widest block font-light">
          Les Collections Actuelles
        </span>
        <h1 className="font-serif text-3xl md:text-5xl uppercase tracking-[0.12em] text-brand-noir font-light">
          Seasonal Drops & Exhibition
        </h1>
        <p className="font-sans text-xs text-brand-stone/85 leading-relaxed font-light">
          We operate on a philosophy of limited collection drops. Rather than flood the world with synthetic inventory, we compile precise small-batch series of biological and stone objects. Once depleted, the series is retired to our exhibition archive.
        </p>
        <div className="w-16 h-[1px] bg-brand-gold mx-auto mt-6"></div>
      </section>

      {/* 2. Future Seasonal Drop Release Live Countdown */}
      <section className="bg-brand-smoke border border-brand-smoke/90 p-8 md:p-12 text-center rounded-xs relative overflow-hidden flex flex-col items-center justify-center space-y-8 shadow-xs">
        {/* Subtle grid elements */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#8b8178_1px,transparent_1px),linear-gradient(to_bottom,#8b8178_1px,transparent_1px)] bg-[size:2rem_2rem]" style={{ pointerEvents: "none" }} />
        
        <div className="space-y-3 z-10">
          <div className="flex items-center justify-center space-x-2 text-brand-gold">
            <Clock className="w-4 h-4 stroke-[1.5] animate-pulse" />
            <span className="font-sans text-[0.6rem] tracking-[0.3em] uppercase font-semibold">
              Live Release Dispatch Thread
            </span>
          </div>
          <h2 className="font-serif text-2xl md:text-4xl uppercase tracking-[0.08em] text-brand-noir">
            Winter Equinox Drop • Series V
          </h2>
          <span className="font-serif italic text-xs text-brand-stone">
            Restorative amber baths & unlacquered limestone weights
          </span>
        </div>

        {/* Big elegant numbers */}
        <div className="grid grid-cols-4 gap-4 md:gap-8 max-w-lg z-10">
          {[
            { label: "DAYS", val: timeLeft.days },
            { label: "HOURS", val: timeLeft.hours },
            { label: "MINUTES", val: timeLeft.minutes },
            { label: "SECONDS", val: timeLeft.seconds }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center bg-brand-bg/60 border border-brand-smoke/50 px-5 py-4 rounded-xs min-w-[70px] md:min-w-[100px]">
              <span className="font-serif text-3xl md:text-5xl text-brand-noir font-extralight tracking-tight">
                {String(item.val).padStart(2, "0")}
              </span>
              <span className="font-sans text-[0.5rem] tracking-[0.25em] text-brand-gold mt-2">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <button className="z-10 bg-brand-noir text-brand-bg hover:bg-brand-gold hover:text-brand-noir px-8 py-3.5 font-sans text-[0.65rem] uppercase tracking-[0.2em] transition-all duration-300">
          Request Early Invitation Token
        </button>
      </section>

      {/* 3. Active Limited Series Items with inventory indicator */}
      <section className="space-y-12">
        <div className="flex items-baseline justify-between border-b border-brand-smoke pb-4">
          <span className="font-serif text-lg text-brand-noir uppercase tracking-wider font-light">
            Current Active Reserves
          </span>
          <span className="font-sans text-[0.58rem] text-brand-stone uppercase tracking-widest leading-none">
            Live Availability Status
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.filter(p => p.isLimited).map((product) => (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="group cursor-pointer select-none border border-brand-smoke/40 hover:border-brand-gold p-6 bg-brand-bg flex flex-col md:flex-row gap-6 transition-all duration-300 rounded-xs"
            >
              {/* Thumbnail */}
              <div className="w-full md:w-40 aspect-square md:h-40 bg-brand-smoke overflow-hidden rounded-xs flex-shrink-0 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Informative details */}
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-serif text-base tracking-widest text-brand-noir uppercase">
                      {product.name}
                    </h3>
                    <span className="font-sans text-xs text-brand-stone">${product.price}</span>
                  </div>
                  <span className="font-serif italic text-xs text-brand-gold mt-0.5 block">
                    {product.frenchName}
                  </span>
                  <p className="font-sans text-[0.68rem] text-brand-stone/85 leading-relaxed font-light mt-2 line-clamp-3">
                    {product.description}
                  </p>
                </div>

                {/* Inventory indicator */}
                <div className="mt-4 pt-3 border-t border-brand-smoke/40 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold"></span>
                    </span>
                    <span className="font-sans text-[0.55rem] tracking-[0.2em] uppercase text-brand-gold font-semibold">
                      ONLY {product.limitedRemaining} UNITS RESERVED
                    </span>
                  </div>
                  <span className="font-sans text-[0.52rem] tracking-widest text-brand-stone uppercase group-hover:text-brand-noir transition-colors duration-150 border-b border-brand-stone/20 pb-0.5">
                    Observe details
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 4. Archives / Past Series Exhibitions */}
      <section className="space-y-12">
        <div className="flex items-center space-x-3 border-b border-brand-smoke pb-4">
          <Archive className="w-5 h-5 text-brand-gold stroke-[1.2]" />
          <h2 className="font-serif text-lg tracking-widest text-brand-noir uppercase font-light">
            SÉLÈNE Archives • Retained Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 opacity-65">
          {ARCHIVED_COLLECTIONS.map((item) => (
            <div
              key={item.id}
              className="p-6 bg-brand-smoke/40 border border-brand-smoke flex flex-col md:flex-row gap-6 rounded-xs select-none relative"
            >
              {/* Sold out stamp */}
              <div className="absolute top-4 right-4 border border-brand-stone/40 px-3.5 py-1 z-10 rounded-xs select-none">
                <span className="font-sans text-[0.5rem] tracking-[0.25em] text-brand-stone uppercase font-medium">
                  ARCHIVED EXHIBIT
                </span>
              </div>

              {/* image */}
              <div className="w-full md:w-36 aspect-square md:h-36 bg-brand-smoke overflow-hidden filter grayscale-20 rounded-xs flex-shrink-0 flex items-center justify-center pointer-events-none">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover opacity-50"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* details */}
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <h3 className="font-serif text-xs tracking-widest text-brand-stone uppercase">
                    {item.name}
                  </h3>
                  <span className="font-serif italic text-[0.62rem] text-brand-stone/60 block mt-0.5">
                    {item.frenchName}
                  </span>
                  <span className="font-sans text-[0.55rem] tracking-widest text-brand-stone/65 uppercase block mt-3">
                    Origin: {item.origin}
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-brand-smoke/30 flex justify-between items-baseline">
                  <span className="font-sans text-[0.55rem] tracking-[0.25em] text-brand-stone uppercase font-medium">
                    {item.year}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
