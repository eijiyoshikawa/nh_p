"use client";

import { useState } from "react";
import { faq } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-white px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeading title={faq.sectionTitle} />
        <p className="mx-auto mb-10 max-w-2xl text-center text-sm leading-relaxed text-text-secondary sm:text-base">
          {faq.description}
        </p>
        <ul className="space-y-3">
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <ScrollReveal key={item.q} delay={i * 60}>
                <li className="rounded-2xl border-2 border-green-100 bg-white shadow-sm transition hover:border-green-200">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                  >
                    <span className="flex items-center gap-3">
                      <span
                        aria-hidden
                        className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700"
                      >
                        Q
                      </span>
                      <span className="text-sm font-bold text-text-primary sm:text-base">
                        {item.q}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className={`text-text-secondary transition ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      ▾
                    </span>
                  </button>
                  {isOpen && (
                    <div className="border-t border-green-100 bg-green-50/50 px-5 py-4 text-sm leading-relaxed text-text-primary">
                      {item.a}
                    </div>
                  )}
                </li>
              </ScrollReveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
