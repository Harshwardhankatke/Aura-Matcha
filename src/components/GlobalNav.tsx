'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export default function GlobalNav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    if (latest > 100) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    if (latest > previous && latest > 300) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? 'bg-black/60 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="#" className="text-xl md:text-2xl font-bold tracking-tighter text-amber-50">
            AURA
          </a>
          <div className="hidden md:flex gap-6 text-xs uppercase tracking-widest text-amber-50/70 font-semibold">
            <a href="#" className="hover:text-amber-50 transition-colors">Shop</a>
            <a href="#" className="hover:text-amber-50 transition-colors">Ceremony</a>
            <a href="#" className="hover:text-amber-50 transition-colors">Journal</a>
          </div>
        </div>

        <div className="flex items-center gap-6 text-amber-50">
          <a href="#" className="hidden md:block text-xs uppercase tracking-widest font-semibold hover:text-amber-50/70 transition-colors">Account</a>
          <button aria-label="Cart" className="relative hover:opacity-70 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <span className="absolute -top-1 -right-2 bg-amber-50 text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">1</span>
          </button>
          <button aria-label="Menu" className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
