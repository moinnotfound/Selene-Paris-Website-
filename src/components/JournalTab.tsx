/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { JOURNAL_ARTICLES } from "../data";
import { Product } from "../types";
import { BookOpen, Calendar, CornerDownRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface JournalTabProps {
  onSelectProductById: (id: string) => void;
}

export default function JournalTab({ onSelectProductById }: JournalTabProps) {
  return (
    <div className="bg-brand-bg py-12 md:py-24 space-y-24 md:space-y-40 select-none max-w-5xl mx-auto px-6">
      
      {/* Editorial Title */}
      <section className="text-center space-y-4">
        <span className="font-serif italic text-base text-brand-gold tracking-widest block font-light">
          Les Écritures
        </span>
        <h1 className="font-serif text-3xl md:text-5xl uppercase tracking-[0.12em] text-brand-noir font-light">
          The SÉLÈNE Journal
        </h1>
        <p className="font-sans text-xs text-brand-stone/80 tracking-widest uppercase">
          poetic investigations into tactile material & sensory timing
        </p>
        <div className="w-16 h-[1px] bg-brand-gold mx-auto mt-6"></div>
      </section>

      {/* Articles Stream */}
      <div className="space-y-28 md:space-y-40">
        {JOURNAL_ARTICLES.map((article, i) => {
          const isEven = i % 2 === 0;
          return (
            <article
              key={article.id}
              className={`flex flex-col md:flex-row gap-10 md:gap-20 items-stretch ${
                isEven ? "" : "md:flex-row-reverse"
              }`}
            >
              {/* Cover Stage */}
              <div className="w-full md:w-1/2 flex-shrink-0">
                <ScrollReveal>
                  <div className="aspect-[4/5] bg-brand-smoke overflow-hidden relative group rounded-xs border border-brand-smoke shadow-sm">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-800"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Floating Categories */}
                    <div className="absolute top-6 left-6 bg-brand-bg/95 border border-brand-gold px-3.5 py-1 z-10">
                      <span className="font-sans text-[0.55rem] tracking-[0.2em] text-brand-gold uppercase font-medium">
                        {article.category}
                      </span>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Text Information Editorial */}
              <div className="flex-1 flex flex-col justify-between py-2">
                <ScrollReveal delay={0.15}>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3 text-brand-stone/60 font-sans text-[0.62rem] tracking-widest uppercase">
                      <BookOpen className="w-3.5 h-3.5 stroke-[1.5]" />
                      <span>{article.readTime}</span>
                    </div>

                    <h2 className="font-serif text-2xl md:text-3.5xl tracking-[0.08em] uppercase text-brand-noir leading-snug">
                      {article.title}
                    </h2>

                    <p className="font-sans text-xs text-brand-stone leading-relaxed font-light text-justify">
                      {article.content}
                    </p>

                    {/* Pull Quote design */}
                    <div className="border-l-[2px] border-brand-gold pl-6 py-2 my-8">
                      <p className="font-serif italic text-md md:text-lg text-brand-stone font-light leading-relaxed">
                        {article.pullQuote}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Related Product integration */}
                <ScrollReveal delay={0.3}>
                  <div className="mt-8 pt-6 border-t border-brand-smoke flex items-center justify-between">
                    <div>
                      <span className="font-sans text-[0.55rem] tracking-widest text-brand-stone/70 uppercase">
                        Related material
                      </span>
                      <p className="font-serif text-xs text-brand-noir uppercase tracking-[0.08em] mt-1">
                        SÉLÈNE No. {article.id}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => onSelectProductById(article.id)}
                      className="flex items-center space-x-2 font-sans text-[0.65rem] uppercase tracking-widest text-brand-gold hover:text-brand-noir transition-colors duration-200 border-b border-brand-gold/30 hover:border-brand-noir pb-0.5"
                    >
                      <span>Observe Object</span>
                      <CornerDownRight className="w-3.5 h-3.5 stroke-[1.2]" />
                    </button>
                  </div>
                </ScrollReveal>
              </div>
            </article>
          );
        })}
      </div>

    </div>
  );
}
