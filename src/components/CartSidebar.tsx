/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CartItem } from "../types";
import { X, Minus, Plus } from "lucide-react";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onCheckout: () => void;
}

export default function CartSidebar({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onCheckout,
}: CartSidebarProps) {
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-brand-noir/40 backdrop-blur-xs transition-opacity duration-500 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Cart Container */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md z-50 bg-brand-bg shadow-2xl flex flex-col transition-all duration-500 ease-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-brand-smoke flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-serif text-lg tracking-[0.15em] text-brand-noir uppercase">
              LE PANIER
            </span>
            <span className="font-sans text-[0.65rem] tracking-widest text-brand-stone uppercase">
              your selected rituals
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-brand-stone hover:text-brand-noir transition-colors duration-200"
          >
            <X className="w-5 h-5 stroke-[1.2]" />
          </button>
        </div>

        {/* Cart Contents */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <span className="font-serif italic text-brand-stone text-xl">
                The basket lies silent.
              </span>
              <p className="font-sans text-xs text-brand-stone/80 max-w-[200px] leading-relaxed">
                Add an act of daily ceremony to begin your self-refinement.
              </p>
              <button
                onClick={onClose}
                className="mt-4 font-sans text-[0.7rem] uppercase tracking-[0.2em] text-brand-gold hover:text-brand-noir transition-colors duration-200 border-b border-brand-gold/40 pb-1"
              >
                Explore SÉLÈNE
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="flex space-x-4 pb-6 border-b border-brand-smoke last:border-0"
              >
                {/* Image */}
                <div className="w-20 h-24 bg-brand-smoke flex-shrink-0 overflow-hidden">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover mix-blend-multiply"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-serif text-sm tracking-[0.1em] text-brand-noir uppercase">
                        {item.product.name}
                      </h4>
                      <span className="font-sans text-xs text-brand-stone">
                        ${item.product.price}
                      </span>
                    </div>
                    <span className="font-serif italic text-[0.75rem] text-brand-stone mt-0.5 block">
                      {item.product.frenchName}
                    </span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-brand-stone/40 px-2 py-0.5 space-x-3 bg-brand-chalk/10">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="text-brand-stone hover:text-brand-noir p-0.5 transition-colors duration-150"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-sans text-xs text-brand-noir w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="text-brand-stone hover:text-brand-noir p-0.5 transition-colors duration-150"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onUpdateQuantity(item.product.id, 0)}
                      className="font-sans text-[0.65rem] text-brand-stone hover:text-brand-noir/80 uppercase tracking-widest transition-colors duration-200"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info & Checker */}
        {cart.length > 0 && (
          <div className="p-6 bg-brand-smoke/50 border-t border-brand-smoke space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="font-sans text-xs text-brand-stone uppercase tracking-widest">
                Subtotal
              </span>
              <span className="font-sans text-sm text-brand-noir">${subtotal}</span>
            </div>
            
            <p className="font-sans text-[0.68rem] text-brand-stone/80 leading-relaxed text-center italic">
              Each product is shipped in a linen dust roll, certified climate nest packing.
            </p>

            <button
              onClick={onCheckout}
              className="w-full bg-brand-noir hover:bg-brand-gold text-brand-bg hover:text-brand-noir py-3.5 font-sans text-xs uppercase tracking-[0.2em] transition-all duration-300"
            >
              Begin the Ritual Checklist
            </button>
          </div>
        )}
      </div>
    </>
  );
}
