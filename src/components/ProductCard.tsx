/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Product } from "../types";
import { ShoppingBag } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onSelect, onAddToCart }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    onAddToCart(product);
    setTimeout(() => {
      setIsAdding(false);
    }, 1200);
  };

  return (
    <div
      onClick={() => onSelect(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer select-none relative"
    >
      {/* Product Image Stage */}
      <div
        style={{
          transition: "transform 0.4s ease-out, box-shadow 0.4s ease-out, filter 0.4s ease-out",
          boxShadow: isHovered ? "0 20px 60px rgba(0,0,0,0.12)" : "0 4px 20px rgba(0,0,0,0.02)",
          transform: isHovered ? "translateY(-8px)" : "translateY(0px)",
        }}
        className="aspect-[4/5] bg-brand-smoke overflow-hidden relative flex items-center justify-center rounded-xs"
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            filter: isHovered ? "brightness(1.03)" : "brightness(1)",
            transition: "filter 0.4s ease-out",
          }}
          className="w-full h-full object-cover mix-blend-multiply"
          referrerPolicy="no-referrer"
        />

        {/* Limited edition flag */}
        {product.isLimited && product.limitedRemaining && (
          <div className="absolute top-4 left-4 bg-brand-bg/95 border border-brand-gold px-3 py-1 z-10">
            <span className="font-sans text-[0.55rem] tracking-[0.25em] text-brand-gold uppercase font-medium">
              Limited Drop • Only {product.limitedRemaining} Left
            </span>
          </div>
        )}

        {/* Quick Add Overlay */}
        <div
          className={`absolute inset-x-0 bottom-0 bg-brand-bg/95 backdrop-blur-xs border-t border-brand-smoke p-4 flex items-center justify-between transition-all duration-300 transform ${
            isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex flex-col">
            <span className="font-sans text-[0.55rem] tracking-widest text-brand-stone uppercase">
              RITUAL RETAINER
            </span>
            <span className="font-serif text-xs text-brand-noir uppercase block mt-0.5">
              Quick Add To Ceremony
            </span>
          </div>
          <button
            onClick={handleQuickAdd}
            disabled={isAdding}
            className="w-10 h-10 rounded-full border border-brand-gold/40 hover:border-brand-gold flex items-center justify-center bg-brand-chalk hover:bg-brand-noir text-brand-gold hover:text-brand-bg transition-all duration-300"
          >
            {isAdding ? (
              <svg className="w-5 h-5 stroke-current loader-draw" viewBox="0 0 50 50">
                <circle
                  cx="25"
                  cy="25"
                  r="12"
                  fill="none"
                  strokeWidth="2"
                  strokeDasharray="75"
                  strokeDashoffset={isAdding ? "0" : "75"}
                  className="animate-spin"
                  style={{ transformOrigin: "center" }}
                />
              </svg>
            ) : (
              <ShoppingBag className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Product Information under card */}
      <div className="mt-4 flex justify-between items-start">
        <div className="space-y-0.5">
          <h3
            style={{
              transition: "opacity 0.4s ease-out",
            }}
            className={`font-serif text-sm tracking-[0.15em] text-brand-noir uppercase ${
              isHovered ? "opacity-100" : "opacity-75"
            }`}
          >
            {product.name}
          </h3>
          <span className="font-serif italic text-xs text-brand-stone block font-light">
            {product.frenchName}
          </span>
        </div>
        <span className="font-sans text-xs tracking-wider text-brand-stone">${product.price}</span>
      </div>
    </div>
  );
}
