'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#020202] text-amber-50/80 pt-24 pb-12 px-6 lg:px-16 border-t border-white/5">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-2">
            <h3 className="text-3xl font-semibold tracking-tighter text-amber-50 mb-6">AURA MATCHA</h3>
            <p className="max-w-sm text-sm font-light leading-relaxed mb-8">
              A commitment to the highest echelon of ceremonial grade matcha. Directly sourced from multi-generational farms in Uji, Japan, and whisked into perfection globally.
            </p>
            <div className="flex items-center gap-4">
              <input 
                type="email" 
                placeholder="Join the newsletter" 
                className="bg-white/5 border border-white/10 rounded-full px-6 py-3 text-sm focus:outline-none focus:border-amber-50/50 transition-colors w-full max-w-[240px]"
              />
              <button className="bg-amber-50 text-black px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">
                Subscribe
              </button>
            </div>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-amber-50 mb-6">Shop</h4>
            <ul className="space-y-3 text-sm font-light text-amber-50/60">
              <li><a href="#" className="hover:text-amber-50 transition-colors">Ceremonial Grade</a></li>
              <li><a href="#" className="hover:text-amber-50 transition-colors">Culinary Blend</a></li>
              <li><a href="#" className="hover:text-amber-50 transition-colors">Artisan Tools</a></li>
              <li><a href="#" className="hover:text-amber-50 transition-colors">Gift Sets</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-amber-50 mb-6">World</h4>
            <ul className="space-y-3 text-sm font-light text-amber-50/60">
              <li><a href="#" className="hover:text-amber-50 transition-colors">Our Farms</a></li>
              <li><a href="#" className="hover:text-amber-50 transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-amber-50 transition-colors">Cafes</a></li>
              <li><a href="#" className="hover:text-amber-50 transition-colors">Journal</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-xs font-light text-amber-50/40 gap-4">
          <p>© {new Date().getFullYear()} Aura Matcha. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-amber-50 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-amber-50 transition-colors">Privacy Policy</a>
            <button className="uppercase tracking-widest hover:text-amber-50 transition-colors flex items-center gap-2">
              Region: US (USD)
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
