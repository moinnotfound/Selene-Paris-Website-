/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, CSSProperties } from "react";
import { Product, CartItem } from "./types";
import { PRODUCTS, HERO_STILL_LIFE_IMAGE, BRAND_PHILOSOPHY, PRESS_MENTIONS } from "./data";
import { ShoppingBag, ArrowRight, CornerRightDown, Mail, Heart, Check } from "lucide-react";

// Animations and overlays
import CurtainLoader from "./components/CurtainLoader";
import CustomCursor from "./components/CustomCursor";
import ScrollReveal from "./components/ScrollReveal";

// Tab Sub-views
import BrandStory from "./components/BrandStory";
import JournalTab from "./components/JournalTab";
import CollectionsTab from "./components/CollectionsTab";

// Dynamic overlays
import CartSidebar from "./components/CartSidebar";
import ProductDetailModal from "./components/ProductDetailModal";
import ProductCard from "./components/ProductCard";

export default function App() {
  // Navigation active tab: 'home' | 'shop' | 'story' | 'drops' | 'journal'
  const [activeTab, setActiveTab] = useState<"home" | "shop" | "story" | "drops" | "journal">("home");

  // Selection state for active product detail view
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Cart Management
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartPulse, setCartPulse] = useState(false);

  // Category filters inside "Shop" tab
  const [shopFilter, setShopFilter] = useState<"all" | "toothbrush" | "toothpaste" | "soap" | "candle">("all");

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Luxury Background Atmosphere Swapper (Green, Purple, Textures Blend)
  const [atmosphere, setAtmosphere] = useState<"emerald-plum" | "forest-malachite" | "royal-amethyst">("emerald-plum");

  const atmosphereVars = {
    "--brand-bg": atmosphere === "emerald-plum" ? "#0A0E0B" : atmosphere === "forest-malachite" ? "#08100C" : "#0D0714",
    "--brand-smoke": atmosphere === "emerald-plum" ? "#150C1B" : atmosphere === "forest-malachite" ? "#112217" : "#1B0A25",
    "--brand-chalk": atmosphere === "emerald-plum" ? "#102116" : atmosphere === "forest-malachite" ? "#1B3324" : "#311442",
    "--brand-noir": atmosphere === "emerald-plum" ? "#FAF7F2" : atmosphere === "forest-malachite" ? "#FAF4EB" : "#FAF3FE",
    "--brand-stone": atmosphere === "emerald-plum" ? "#A49D94" : atmosphere === "forest-malachite" ? "#92978F" : "#AA9EAE",
    "--brand-gold": atmosphere === "emerald-plum" ? "#DAB675" : atmosphere === "forest-malachite" ? "#C29F5C" : "#D4AF37",
    "--brand-forest": atmosphere === "emerald-plum" ? "#1F3D27" : atmosphere === "forest-malachite" ? "#2B5637" : "#63397F",
  } as React.CSSProperties;

  // Trigger scroll to top on tab swap
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  // Add Item to cart with animation trigger
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    // Trigger pulse animation on Cart Icon
    setCartPulse(true);
    setTimeout(() => {
      setCartPulse(false);
    }, 800);
  };

  // Update Item count in Cart
  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCart((prev) => {
      if (quantity <= 0) {
        return prev.filter((item) => item.product.id !== productId);
      }
      return prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item));
    });
  };

  // Handle Checkout Dispatch simulation
  const handleCheckout = () => {
    alert("Proceeding to SÉLÈNE checkout gate. Thank you for entering the ritual.");
    setCart([]);
    setIsCartOpen(false);
  };

  // Handle direct product selector from deep links (e.g. Journal related items)
  const handleSelectProductById = (id: string) => {
    const prod = PRODUCTS.find((p) => p.id === id);
    if (prod) {
      setSelectedProduct(prod);
    }
  };

  // Calculate cart counts
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div 
      className="min-h-screen bg-brand-bg text-brand-noir font-sans relative overflow-x-hidden selection:bg-brand-gold/30 transition-all duration-1000 ease-in-out premium-weave"
      style={atmosphereVars}
    >
      
      {/* Dynamic luxury atmospheric background glow spots */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" style={{ minHeight: "100%" }}>
        <div 
          className="absolute top-12 -left-[20%] w-[90vw] h-[90vw] rounded-full blur-[130px] opacity-35 mix-blend-screen transition-all duration-1000"
          style={{
            background: atmosphere === "forest-malachite" 
              ? "radial-gradient(circle, #2B5637 0%, transparent 70%)" 
              : atmosphere === "royal-amethyst" 
              ? "radial-gradient(circle, #4F2F6C 0%, transparent 70%)" 
              : "radial-gradient(circle, #1A3E26 0%, transparent 70%)"
          }}
        />
        <div 
          className="absolute top-[40vh] -right-[15%] w-[80vw] h-[80vw] rounded-full blur-[140px] opacity-30 mix-blend-screen transition-all duration-1000"
          style={{
            background: atmosphere === "forest-malachite" 
              ? "radial-gradient(circle, #102B1D 0%, transparent 70%)" 
              : atmosphere === "royal-amethyst" 
              ? "radial-gradient(circle, #2C163C 0%, transparent 70%)" 
              : "radial-gradient(circle, #391B4C 0%, transparent 70%)"
          }}
        />
        <div 
          className="absolute bottom-[20vh] left-[10vw] w-[60vw] h-[60vw] rounded-full blur-[160px] opacity-15 mix-blend-screen transition-all duration-1000"
          style={{
            background: "radial-gradient(circle, var(--brand-gold) 0%, transparent 75%)"
          }}
        />
      </div>
      
      {/* 1. Hermes Inspired Curtain Loader on Mount */}
      <CurtainLoader />

      {/* 2. Custom Geometric Circle Mouse Pointer (Lag lerper) */}
      <CustomCursor />

      {/* 3. Sliding Basket Drawer Overlay */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={handleCheckout}
      />

      {/* 4. Product Detail Specifications modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onNavigateToProduct={(p) => setSelectedProduct(p)}
        />
      )}

      {/* 5. GUEST HEADER / MAIN BRAND NAV (Silk text links with bottom bar slide) */}
      <header className="sticky top-0 z-30 bg-brand-bg/90 backdrop-blur-md border-b border-brand-smoke/40 select-none">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Brand Logo Wordmark */}
          <button
            onClick={() => setActiveTab("home")}
            className="flex flex-col text-left group"
          >
            <span className="font-serif text-lg md:text-xl tracking-[0.3em] font-light text-brand-noir group-hover:text-brand-gold transition-colors duration-300">
              SÉLÈNE
            </span>
            <span className="font-sans text-[0.45rem] tracking-[0.5em] text-brand-stone uppercase -mt-0.5 font-normal">
              P A R I S
            </span>
          </button>

          {/* Nav links with hover underline */}
          <nav className="hidden md:flex items-center space-x-12">
            {[
              { id: "home", label: "Rituals" },
              { id: "shop", label: "The Four" },
              { id: "story", label: "Our Story" },
              { id: "drops", label: "The Drops" },
              { id: "journal", label: "Journal" },
            ].map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`font-sans text-[0.62rem] uppercase tracking-[0.25em] pb-1 relative transition-colors duration-300 hover:text-brand-gold ${
                    active ? "text-brand-noir font-medium" : "text-brand-stone"
                  }`}
                >
                  {tab.label}
                  {/* Underline animations */}
                  <span
                    className={`absolute bottom-0 left-0 h-[1.2px] bg-brand-gold transition-all duration-300 ${
                      active ? "w-full" : "w-0 hover:w-full"
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Cart Icon trigger with pulse notification */}
          <div className="flex items-center space-x-4 md:space-x-6">
            
            {/* Ambient Atmosphere Swatches */}
            <div className="flex items-center space-x-1.5 md:space-x-2 border border-brand-stone/15 bg-brand-smoke/25 px-2.5 py-1.5 rounded-full select-none">
              <span className="hidden sm:inline font-sans text-[0.52rem] uppercase tracking-widest text-brand-stone mr-1">
                Atmosphere:
              </span>
              <button
                onClick={() => setAtmosphere("emerald-plum")}
                className={`w-3.5 h-3.5 rounded-full border transition-all duration-300 relative flex items-center justify-center ${
                  atmosphere === "emerald-plum"
                    ? "border-brand-gold scale-110"
                    : "border-transparent opacity-50 hover:opacity-100"
                }`}
                title="L'Alliance (Deep Green / Violet Blend)"
              >
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-600 to-indigo-700" />
              </button>
              <button
                onClick={() => setAtmosphere("forest-malachite")}
                className={`w-3.5 h-3.5 rounded-full border transition-all duration-300 relative flex items-center justify-center ${
                  atmosphere === "forest-malachite"
                    ? "border-brand-gold scale-110"
                    : "border-transparent opacity-50 hover:opacity-100"
                }`}
                title="Malachite (Sovereign Pine Forest Green)"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
              </button>
              <button
                onClick={() => setAtmosphere("royal-amethyst")}
                className={`w-3.5 h-3.5 rounded-full border transition-all duration-300 relative flex items-center justify-center ${
                  atmosphere === "royal-amethyst"
                    ? "border-brand-gold scale-110"
                    : "border-transparent opacity-50 hover:opacity-100"
                }`}
                title="Améthyste (Imperial Purple)"
              >
                <span className="w-2 h-2 rounded-full bg-purple-600" />
              </button>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className={`relative p-2.5 rounded-full border border-brand-stone/10 hover:border-brand-gold transition-all duration-300 flex items-center justify-center bg-brand-chalk/20 backdrop-blur-xs ${
                cartPulse ? "scale-125 border-brand-gold bg-brand-gold/10" : ""
              }`}
            >
              <ShoppingBag className="w-4.5 h-4.5 text-brand-noir stroke-[1.2]" />
              
              {/* Count Indicator */}
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1.5 w-4.5 h-4.5 bg-brand-gold text-brand-noir font-bold text-[0.55rem] flex items-center justify-center rounded-full border border-brand-bg animate-fade-in">
                  {totalCartCount}
                </span>
              )}
            </button>
            
            {/* Minimalist burger for touch devices */}
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value as any)}
              className="md:hidden block bg-brand-smoke border border-brand-stone/20 text-brand-noir font-sans text-[0.62rem] uppercase tracking-wider py-1.5 px-3 focus:outline-none"
            >
              <option value="home">Rituals</option>
              <option value="shop">The Four</option>
              <option value="story">Our Story</option>
              <option value="drops">The Drops</option>
              <option value="journal">Journal</option>
            </select>
          </div>

        </div>
      </header>

      {/* 6. CONTENT SWITCH ROUTER */}
      <main className="min-h-[80vh]">
        
        {/* HOMEPAGE VIEW */}
        {activeTab === "home" && (
          <div className="space-y-24 md:space-y-44 pb-24 md:pb-40">
            
            {/* HERO SECTION: La Mer Breathing Product Loop */}
            <section className="relative w-full h-[90vh] md:h-[95vh] bg-brand-smoke overflow-hidden flex items-center justify-center select-none">
              
              {/* Golden circular subtle glow background */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(184,150,90,0.06)_0%,_transparent_72%)] pointer-events-none" />

              {/* Breathing Image Stage */}
              <div className="relative w-full max-w-4xl h-full flex flex-col md:flex-row items-center justify-between px-6 md:px-12 z-10 py-12 md:py-24">
                
                {/* Visual Label */}
                <div className="space-y-4 max-w-sm text-center md:text-left">
                  <span className="font-serif italic text-brand-gold text-sm md:text-base tracking-widest block font-light">
                    SÉLÈNE No. 01 — Jura Series
                  </span>
                  <h1 className="font-serif text-3xl md:text-5xl uppercase tracking-[0.14em] text-brand-noir font-light leading-snug">
                    L'Objet Brossé
                  </h1>
                  <span className="font-serif italic text-xs text-brand-stone block -mt-1">
                    bone & brass heavy toothbrush
                  </span>
                  
                  <p className="font-sans text-xs text-brand-stone leading-relaxed font-light mt-4 hidden md:block">
                    A heavy, hand-sculpted White Bone mass paired with a unlacquered brass neck element. Formed to ground your waking ceremony with pure material density.
                  </p>

                  <button
                    onClick={() => handleSelectProductById("01")}
                    className="mt-6 md:mt-8 bg-brand-noir hover:bg-brand-gold text-brand-bg hover:text-brand-noir px-8 py-3.5 font-sans text-[0.65rem] uppercase tracking-[0.25em] transition-all duration-300"
                  >
                    Enter the Ritual
                  </button>
                </div>

                {/* Breathing hero product image (loops scale 1.0 to 1.04 over 8s) */}
                <div
                  className="w-64 h-80 md:w-96 md:h-[30rem] relative flex items-center justify-center"
                  style={{
                    animation: "breathe 8s ease-in-out infinite",
                  }}
                >
                  <img
                    src="/src/assets/images/selene_toothbrush_1782103208011.jpg"
                    alt="Sélène Toothbrush Still Life"
                    className="w-full h-full object-contain filter drop-shadow-xl select-none"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle water shadow mapping beneath product */}
                  <div className="absolute -bottom-4 w-48 h-3.5 bg-brand-stone/20 rounded-full blur-[2px] opacity-60" />
                </div>

                {/* Vertical detail guidelines */}
                <div className="hidden lg:flex flex-col items-end space-y-6 text-right">
                  <div className="space-y-1">
                    <span className="font-sans text-[0.55rem] tracking-[0.25em] text-brand-stone/60 uppercase">
                      MANUFACTURE
                    </span>
                    <p className="font-serif text-[0.65rem] uppercase tracking-wider text-brand-noir font-light">
                      Jura Valleys, France
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="font-sans text-[0.55rem] tracking-[0.25em] text-brand-stone/60 uppercase">
                      MATERIALS
                    </span>
                    <p className="font-serif text-[0.65rem] uppercase tracking-wider text-brand-noir font-light">
                      Ethical Bone & Unlacquered Brass
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="font-sans text-[0.55rem] tracking-[0.25em] text-brand-stone/60 uppercase">
                      COMPOSITION
                    </span>
                    <p className="font-serif text-[0.65rem] uppercase tracking-wider text-brand-noir font-light">
                      Biodegradable Charcoal Fiber
                    </p>
                  </div>
                </div>

              </div>

              {/* Infinite breathe CSS declared in index.css */}
              <style>{`
                @keyframes breathe {
                  0%, 100% {
                    transform: scale(1);
                  }
                  50% {
                    transform: scale(1.04);
                  }
                }
              `}</style>
            </section>

            {/* BRAND PHILOSOPHY: Manifesto & Abundant Whitespace */}
            <section className="max-w-4xl mx-auto px-6 py-12 text-center select-none">
              <ScrollReveal>
                <span className="font-serif italic text-base text-brand-gold tracking-[0.2em] uppercase font-light">
                  Manifesto
                </span>
                
                {/* 3-line manifesto */}
                <div className="space-y-4 md:space-y-6 mt-8">
                  {BRAND_PHILOSOPHY.manifestoLines.map((line, idx) => (
                    <h2
                      key={idx}
                      className="font-serif text-2xl md:text-4.5xl tracking-wide uppercase text-brand-noir font-light"
                    >
                      {line}
                    </h2>
                  ))}
                </div>

                <div className="w-16 h-[1px] bg-brand-gold mx-auto mt-12 mb-10"></div>

                <p className="font-sans text-brand-stone text-xs md:text-sm max-w-xl mx-auto leading-relaxed font-light text-justify md:text-center">
                  {BRAND_PHILOSOPHY.longCopy}
                </p>
              </ScrollReveal>
            </section>

            {/* THE FOUR RITUALS GRID */}
            <section className="max-w-7xl mx-auto px-6 space-y-12 select-none">
              <div className="flex items-baseline justify-between border-b border-brand-smoke pb-4">
                <span className="font-serif text-lg text-brand-noir uppercase tracking-wider font-light">
                  The Four Daily Acts
                </span>
                
                <button
                  onClick={() => setActiveTab("shop")}
                  className="flex items-center space-x-2 font-sans text-[0.62rem] uppercase tracking-[0.25em] text-brand-stone hover:text-brand-gold transition-colors duration-150"
                >
                  <span>Explore full series</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
                </button>
              </div>

              {/* Grid 4 Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {PRODUCTS.map((prod) => (
                  <div key={prod.id}>
                    <ScrollReveal>
                      <ProductCard
                        product={prod}
                        onSelect={(p) => setSelectedProduct(p)}
                        onAddToCart={handleAddToCart}
                      />
                    </ScrollReveal>
                  </div>
                ))}
              </div>
            </section>

            {/* EDITORIAL FEATURE PRODUCT DETAIL */}
            <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 select-none">
                <ScrollReveal>
                  <div className="aspect-[16/10] bg-brand-smoke overflow-hidden border border-brand-smoke relative rounded-xs shadow-xs">
                    <img
                      src={HERO_STILL_LIFE_IMAGE}
                      alt="The Complete Still Life curation"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </ScrollReveal>
              </div>

              <div className="lg:col-span-5 space-y-8 select-none">
                <ScrollReveal delay={0.15}>
                  <span className="font-serif italic text-base text-brand-gold tracking-widest block font-light">
                    The Ceremony Composition
                  </span>
                  <h2 className="font-serif text-3xl tracking-[0.1em] text-brand-noir uppercase mt-2 font-light">
                    SÉLÈNE No. 04 — L'Ambre Céleste
                  </h2>
                  <div className="w-12 h-[1px] bg-brand-gold mt-4 mb-6"></div>

                  <p className="font-sans text-xs text-brand-stone leading-relaxed font-light">
                    Our candles are poured in small individual batches inside heavy charcoal-smoked double-wall glass vessels. Crafted with unrefined high-mountain forest apiary beeswax that burns sweet, clean, and slow, releasing an evocative, restorative olfactive drift of cedarwood embers and salt-cured grey ambergris.
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={0.3}>
                  <div className="flex items-center space-x-12 pt-2 border-t border-brand-smoke">
                    <div className="space-y-1">
                      <span className="font-sans text-[0.55rem] tracking-[0.2em] text-brand-stone/60 uppercase">
                        VOLUME WEIGHT
                      </span>
                      <p className="font-serif text-[0.65rem] uppercase tracking-wider text-brand-noir leading-none mt-1">
                        280 Grams (65 Hours)
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="font-sans text-[0.55rem] tracking-[0.2em] text-brand-stone/60 uppercase">
                        ATMOSPHERE
                      </span>
                      <p className="font-serif text-[0.65rem] uppercase tracking-wider text-brand-noir leading-none mt-1">
                        Serene, Grounded
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSelectProductById("04")}
                    className="mt-8 font-sans text-[0.62rem] uppercase tracking-[0.25em] text-brand-gold hover:text-brand-noir transition-colors duration-200 border-b border-brand-gold/40 pb-0.5"
                  >
                    Examine Compound Ingredients
                  </button>
                </ScrollReveal>
              </div>
            </section>

            {/* DYNAMIC LUMINANCE SECTION: Candle Glow Simulator */}
            <section className="max-w-7xl mx-auto px-6">
              <ScrollReveal>
                <div
                  className="p-8 md:p-16 border border-brand-smoke/90 text-center rounded-xs relative overflow-hidden h-72 md:h-96 flex flex-col items-center justify-center space-y-4"
                  style={{
                    animation: "glow-pulse 4s ease-in-out infinite",
                  }}
                >
                  <div className="space-y-2 z-10">
                    <span className="font-serif italic text-sm text-brand-gold tracking-widest block font-light">
                      Olfactive Ambient Glow
                    </span>
                    <h3 className="font-serif text-xl md:text-3xl uppercase tracking-[0.1em] text-brand-noir font-light">
                      Simulating Candlelight Flicker
                    </h3>
                    <p className="font-sans text-[0.68rem] text-brand-stone max-w-md mx-auto leading-relaxed mt-2 font-light">
                      A rhythmic radial-gradient background pulsation from 8% to 18% gold warmth. This ambient background simulates the organic, calming drift of organic candle illumination.
                    </p>
                  </div>
                  
                  <button
                    onClick={() => handleSelectProductById("04")}
                    className="z-10 bg-brand-noir text-brand-bg hover:bg-brand-gold hover:text-brand-noir px-8 py-3 font-sans text-[0.62rem] uppercase tracking-[0.25em] transition-all duration-300"
                  >
                    Observe Scent Sillage
                  </button>
                  
                  {/* Embedded animation keyframes in index.css */}
                </div>
              </ScrollReveal>
            </section>

            {/* PRESS MENTIONS AND LOGOS */}
            <section className="max-w-5xl mx-auto px-6 border-y border-brand-smoke/50 py-12 select-none text-center">
              <ScrollReveal>
                <span className="font-serif text-[0.65rem] uppercase tracking-[0.3em] text-brand-gold font-semibold">
                  SÉLÈNE in the Press
                </span>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12 items-baseline text-center">
                  {PRESS_MENTIONS.map((pr) => (
                    <div key={pr.id} className="space-y-4 max-w-xs mx-auto">
                      <span className="font-serif text-base tracking-[0.3em] text-brand-noir uppercase block font-medium">
                        {pr.logoText}
                      </span>
                      <p className="font-sans text-[0.68rem] text-brand-stone/90 leading-relaxed font-light italic">
                        "{pr.statement}"
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </section>

            {/* THE PROCESS : Artisan looping video preview */}
            <section className="max-w-7xl mx-auto px-6 select-none">
              <ScrollReveal>
                <div className="bg-brand-smoke border border-brand-smoke p-8 md:p-16 rounded-xs flex flex-col md:flex-row items-center justify-between gap-10">
                  <div className="max-w-md space-y-4">
                    <span className="font-serif italic text-brand-gold text-sm tracking-widest block font-light">
                      L'Atelier d'Artiste
                    </span>
                    <h3 className="font-serif text-2xl tracking-[0.1em] text-brand-noir uppercase font-light">
                      The Making: 15s Organic Loop
                    </h3>
                    <p className="font-sans text-xs text-brand-stone leading-relaxed font-light">
                      We document our long curing times and raw lathe milling by hand. Watch the complete process of cold olive saponification in Siena and white bone balancing in France inside our brand chronicles.
                    </p>
                    <button
                      onClick={() => setActiveTab("story")}
                      className="mt-4 flex items-center space-x-2 font-sans text-[0.62rem] uppercase tracking-widest text-brand-gold hover:text-brand-noir transition-colors duration-150 border-b border-brand-gold/30 pb-0.5"
                    >
                      <span>Observe Story Film</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="w-full md:w-80 aspect-[4/3] bg-brand-bg relative overflow-hidden border border-brand-smoke rounded-xs shadow-inner flex items-center justify-center">
                    <img
                      src="/src/assets/images/selene_hero_1782103267922.jpg"
                      alt="Artisan hands carving bone element loop placeholder"
                      className="w-full h-full object-cover opacity-85"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-brand-gold/10 animate-pulse pointer-events-none" />
                  </div>
                </div>
              </ScrollReveal>
            </section>

            {/* THE NEWSLETTER (Enter the Ritual, not Subscribe) */}
            <section className="max-w-2xl mx-auto px-6 text-center py-12 select-none border-t border-brand-smoke/40">
              <ScrollReveal>
                <span className="font-serif italic text-base text-brand-gold">
                  Joindre la Cérémonie
                </span>
                <h3 className="font-serif text-2xl uppercase tracking-[0.14em] text-brand-noir mt-3 font-light">
                  Enter the SÉLÈNE Circle
                </h3>
                <p className="font-sans text-xs text-brand-stone max-w-sm mx-auto leading-relaxed mt-2 font-light">
                  Receive intimate release schedules, custom dispatch manifests, and access locks to the botanical drops as they emerge from the caves.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (newsletterEmail) {
                      setNewsletterSuccess(true);
                      setNewsletterEmail("");
                    }
                  }}
                  className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 items-stretch max-w-md mx-auto"
                >
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter the Ritual"
                    className="flex-1 bg-brand-smoke border border-brand-smoke hover:border-brand-stone/40 focus:border-brand-gold outline-none px-5 py-3.5 text-xs text-brand-noir tracking-wider placeholder-brand-stone rounded-l-xs text-center sm:text-left transition-all duration-300"
                  />
                  <button
                    type="submit"
                    className="bg-brand-noir hover:bg-brand-gold text-brand-bg hover:text-brand-noir px-8 py-3.5 font-sans text-xs uppercase tracking-[0.2em] rounded-r-xs transition-all duration-300"
                  >
                    Join
                  </button>
                </form>

                {newsletterSuccess && (
                  <div className="mt-4 flex items-center justify-center space-x-2 text-brand-gold animate-fade-in">
                    <Check className="w-4 h-4" />
                    <span className="font-sans text-[0.65rem] tracking-widest uppercase">
                      You are in. Access locker sent.
                    </span>
                  </div>
                )}
              </ScrollReveal>
            </section>

          </div>
        )}

        {/* SHOP ALL VIEW (Masonry grid 3 columns, filter horizontal pills) */}
        {activeTab === "shop" && (
          <div className="max-w-7xl mx-auto px-6 py-12 md:py-24 space-y-16 select-none pb-24 md:pb-40 animate-fade-in">
            
            {/* Filter Pill Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-brand-smoke pb-6">
              <div className="space-y-1">
                <h1 className="font-serif text-3xl uppercase tracking-widest text-brand-noir leading-none font-light">
                  Shop the Four
                </h1>
                <span className="font-serif italic text-xs text-brand-stone">
                  pure mineral and forest elements
                </span>
              </div>

              {/* Horizontal Pill filters (no dropdowns) as requested */}
              <div className="flex flex-wrap gap-2.5">
                {[
                  { filterId: "all", label: "Observe All" },
                  { filterId: "toothbrush", label: "Toothbrush" },
                  { filterId: "toothpaste", label: "Toothpaste" },
                  { filterId: "soap", label: "Soap" },
                  { filterId: "candle", label: "Candle" },
                ].map((item) => (
                  <button
                    key={item.filterId}
                    onClick={() => setShopFilter(item.filterId as any)}
                    className={`font-sans text-[0.58rem] uppercase tracking-widest px-5 py-2.5 transition-all duration-300 rounded-full border ${
                      shopFilter === item.filterId
                        ? "bg-brand-noir border-brand-noir text-brand-bg font-medium"
                        : "bg-brand-bg text-brand-stone border-brand-stone/30 hover:border-brand-gold hover:text-brand-noir"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Masonry / Grid Container (3 columns desktop, 1 column mobile) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PRODUCTS.filter((p) => shopFilter === "all" || p.category === shopFilter).map((prod) => (
                <div key={prod.id}>
                  <ScrollReveal>
                    <ProductCard
                      product={prod}
                      onSelect={(p) => setSelectedProduct(p)}
                      onAddToCart={handleAddToCart}
                    />
                  </ScrollReveal>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* OUR STORY TAB-VIEW */}
        {activeTab === "story" && <BrandStory />}

        {/* THE DROPS (COLLECTIONS) VIEW */}
        {activeTab === "drops" && (
          <CollectionsTab
            products={PRODUCTS}
            onSelectProduct={(p) => setSelectedProduct(p)}
          />
        )}

        {/* JOURNAL TAB-VIEW */}
        {activeTab === "journal" && (
          <JournalTab onSelectProductById={handleSelectProductById} />
        )}

      </main>

      {/* 7. BRUTALIST BRAND FOOTER */}
      <footer className="bg-brand-noir text-brand-bg py-16 px-6 select-none">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-brand-smoke/10 pb-16">
          <div className="space-y-4">
            <span className="font-serif text-2xl tracking-[0.3em] font-light uppercase text-brand-bg block">
              SÉLÈNE
            </span>
            <span className="font-sans text-[0.55rem] tracking-[0.4em] text-brand-gold uppercase block">
              P A R I S
            </span>
            <p className="font-sans text-[0.65rem] text-brand-stone leading-relaxed font-light max-w-xs pt-4">
              Providing quiet material anchors back to the physical sensory world since early series V.
            </p>
          </div>

          <div className="space-y-4">
            <span className="font-serif text-[0.7rem] uppercase tracking-[0.25em] text-brand-gold block font-semibold">
              The Rituals
            </span>
            <div className="flex flex-col space-y-2 text-[0.65rem] font-sans text-brand-stone">
              <button onClick={() => { setActiveTab("shop"); setShopFilter("toothbrush"); }} className="hover:text-brand-bg text-left transition-colors font-light tracking-wider">
                SÉLÈNE No. 01 — L'Objet Brossé
              </button>
              <button onClick={() => { setActiveTab("shop"); setShopFilter("toothpaste"); }} className="hover:text-brand-bg text-left transition-colors font-light tracking-wider">
                SÉLÈNE No. 02 — La Pâte Dentaire
              </button>
              <button onClick={() => { setActiveTab("shop"); setShopFilter("soap"); }} className="hover:text-brand-bg text-left transition-colors font-light tracking-wider">
                SÉLÈNE No. 03 — Le Pain d'Olive
              </button>
              <button onClick={() => { setActiveTab("shop"); setShopFilter("candle"); }} className="hover:text-brand-bg text-left transition-colors font-light tracking-wider">
                SÉLÈNE No. 04 — L'Ambre Céleste
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <span className="font-serif text-[0.7rem] uppercase tracking-[0.25em] text-brand-gold block font-semibold">
              The Sourcing
            </span>
            <div className="flex flex-col space-y-2 text-[0.65rem] font-sans text-brand-stone">
              <span className="font-light tracking-wider">Jura Gold, France</span>
              <span className="font-light tracking-wider">Sado Deep Marine, Japan</span>
              <span className="font-light tracking-wider">Siena Groves, Italy</span>
              <span className="font-light tracking-wider">Volterra Thermal Wells, Italy</span>
            </div>
          </div>

          <div className="space-y-4">
            <span className="font-serif text-[0.7rem] uppercase tracking-[0.25em] text-brand-gold block font-semibold">
              Company Gate
            </span>
            <div className="flex flex-col space-y-2 text-[0.65rem] font-sans text-brand-stone">
              <span className="font-light tracking-wider">Marc-Antoine Sélène, Inc.</span>
              <span className="font-light tracking-wider">Rue Saint-Honoré, Paris 1er</span>
              <span className="font-light tracking-wider">contact@selene-rituals.com</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-10 flex flex-col md:flex-row items-center justify-between text-[0.55rem] font-sans text-brand-stone tracking-widest uppercase">
          <span>© 2026 SÉLÈNE RITUALS PARIS. All rights of material retained.</span>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="hover:text-brand-bg transition-colors font-light">Access Token Rules</span>
            <span className="hover:text-brand-bg transition-colors font-light">Sourcing Transparency</span>
            <span className="hover:text-brand-bg transition-colors font-light">Certifications</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
