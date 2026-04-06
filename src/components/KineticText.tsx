'use client';

import React, { useState } from 'react';
import { motion, MotionValue, useMotionValueEvent } from 'framer-motion';

interface KineticTextProps {
  text: string;
  progress: MotionValue<number>;
  className?: string;
  wordSpacing?: string;
}

export default function KineticText({ text, progress, className = "", wordSpacing = "mr-3 md:mr-6" }: KineticTextProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  // Split strings, preserving HTML spaces or rendering raw arrays
  const words = text.split(" ");

  // Hook into the exact Opacity Curve generated natively by EspressoExtraction smoothProgress mappings!
  useMotionValueEvent(progress, "change", (latest) => {
    // Once the section starts becoming visibly apparent, fire the kinetic cascade
    if (latest > 0.05) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });

  return (
    <motion.div className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <div key={i} className={`overflow-hidden ${wordSpacing}`}>
          <motion.div
            initial={{ y: "110%", opacity: 0 }}
            animate={isVisible ? { y: 0, opacity: 1 } : { y: "110%", opacity: 0 }}
            transition={{ 
              ease: [0.16, 1, 0.3, 1], // cinematic explosive ease-out
              duration: 1.2, 
              delay: isVisible ? (i * 0.06) : 0 // Only stagger coming IN. 
            }}
          >
            {word}
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
}
