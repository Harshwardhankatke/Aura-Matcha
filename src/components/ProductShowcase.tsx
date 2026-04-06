'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const PRODUCTS = [
  {
    id: 1,
    name: "Iced Strawberry Matcha",
    price: "$8.00",
    desc: "Vibrant green organic matcha layered over pastel strawberry puree and milk.",
    img: "/shop/strawberry.png"
  },
  {
    id: 2,
    name: "Vanilla Bean Espresso Matcha",
    price: "$9.00",
    desc: "Cascading espresso and vanilla bean milk mixing with ceremonial grade matcha.",
    img: "/shop/vanilla.png"
  },
  {
    id: 3,
    name: "Rose Petal Matcha Infusion",
    price: "$8.50",
    desc: "Delicate and floral, steeped with edible pink rose petals over ice.",
    img: "/shop/rose.png"
  }
];

export default function ProductShowcase() {
  return (
    <section className="bg-[#050505] text-amber-50 py-32 px-6 lg:px-16" id="shop">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter mb-4">Signature Flavors.</h2>
            <p className="text-amber-50/60 text-lg md:text-xl font-light">Experience our exclusive, handcrafted artisanal matcha coffee fusions.</p>
          </div>
          <button className="whitespace-nowrap px-8 py-3 border border-amber-50/20 text-xs font-bold uppercase tracking-[0.2em] hover:bg-amber-50 hover:text-black transition-colors rounded-full">
            View Menu
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRODUCTS.map((product, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
              key={product.id} 
              className="group cursor-pointer"
            >
              <div className="w-full aspect-[4/5] bg-black rounded-2xl mb-6 relative overflow-hidden">
                <Image 
                  src={product.img} 
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500 z-10 pointer-events-none" />
              </div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold tracking-tight">{product.name}</h3>
                <span className="font-mono text-sm text-amber-50/80">{product.price}</span>
              </div>
              <p className="text-amber-50/50 text-sm">{product.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
