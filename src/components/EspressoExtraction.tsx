'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useSpring, useTransform, motion, AnimatePresence } from 'framer-motion';

const FRAME_COUNT = 240;

export default function EspressoExtraction() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 40,
    restDelta: 0.001
  });

  // Since text is removed, we remove the paused plateaus. 
  // It now linearly scrubs from 0 to 279 completely smoothly without stopping.
  const currentFrame = useTransform(smoothProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // Cinematic 4K Depth Scaling
  const canvasScale = useTransform(smoothProgress, [0, 1], [1, 1.15]);

  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;
    
    // Performance: We load the raw images into cache
    const loadImages = async () => {
      const promises = Array.from({ length: FRAME_COUNT }).map((_, index) => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.src = `/sequence/frame_${index}.jpg`;
          img.onload = () => {
            loadedCount++;
            setLoaded(loadedCount);
            if (!isCancelled) resolve(img);
          };
          img.onerror = () => reject(new Error(`Failed to load frame_${index}.jpg`));
        });
      });
      try {
        const results = await Promise.all(promises);
        if (!isCancelled) setImages(results);
      } catch (err) {
        console.error(err);
      }
    };

    loadImages();
    return () => { isCancelled = true; };
  }, []);

  useEffect(() => {
    if (images.length !== FRAME_COUNT) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let lastRenderedIndex = -1;

    const render = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      // SOURCE FRAMES ARE 1280x720.
      // Capping DPR to 1 prevents the canvas from rendering at 2x/3x native resolution 
      // and then stretching tiny 720p images across that massive buffer — the #1 cause of blur.
      let needsResize = false;

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        needsResize = true;
      }

      const rawIndex = currentFrame.get();
      const imgIndex = Math.max(0, Math.min(FRAME_COUNT - 1, Math.floor(rawIndex)));
      
      if (imgIndex !== lastRenderedIndex || needsResize) {
        const frame = images[imgIndex];
        if (frame) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high'; // Safe now — we skip unchanged frames

          // COVER-FILL: Crop to fill the viewport (like CSS object-fit: cover)
          // This eliminates black bars and makes the image feel immersive & full-bleed.
          const scale = Math.max(canvas.width / frame.width, canvas.height / frame.height);
          const drawWidth = frame.width * scale;
          const drawHeight = frame.height * scale;
          const x = (canvas.width - drawWidth) / 2;
          const y = (canvas.height - drawHeight) / 2;

          ctx.drawImage(frame, x, y, drawWidth, drawHeight);
          lastRenderedIndex = imgIndex;
        }
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [images, currentFrame]);

  const indicatorOpacity = useTransform(smoothProgress, [0, 0.05], [1, 0]);

  // Strict Lock on Scrolling while building 4K RAM structure
  const [scrollLocked, setScrollLocked] = useState(true);
  useEffect(() => {
    if (loaded === FRAME_COUNT) {
      setScrollLocked(false);
    }
  }, [loaded]);

  return (
    <main ref={containerRef} className="relative h-[800vh] bg-[#050505] selection:bg-amber-900/30 selection:text-amber-50">
      
      {/* Brutalist Memory Lock Preloader */}
      <AnimatePresence>
        {scrollLocked && (
          <motion.div 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center pointer-events-auto"
            style={{ touchAction: 'none' }} // lock native gestures
          >
            <div className="font-mono text-white text-2xl tracking-tighter">
              {String(Math.round((loaded / FRAME_COUNT) * 100)).padStart(3, '0')}% SYSTEM RAM
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`sticky top-0 h-screen w-full overflow-hidden ${scrollLocked ? 'pointer-events-none' : ''}`}>
        
        {/* Pure Canvas Visuals - ALL TEXT ELEMENTS HAVE BEEN STRIPPED */}
        <motion.canvas
          ref={canvasRef}
          className="absolute left-0 top-0 h-full w-full object-contain saturate-[1.1] contrast-[1.15] brightness-[1.02] origin-center"
          style={{ 
            width: '100%', 
            height: '100%',
            scale: canvasScale
          }}
        />

        {/* Anti-Watermark Vignette Overlay (Visually burning out the 'Veo' corner watermark) */}
        <div className="absolute bottom-0 right-0 w-[50vw] max-w-[500px] h-[30vh] max-h-[300px] bg-[radial-gradient(ellipse_at_bottom_right,rgba(5,5,5,1)_0%,rgba(5,5,5,0)_70%)] pointer-events-none z-10" />

        <motion.div
          style={{ opacity: indicatorOpacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center z-20 pointer-events-none"
        >
          <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.3em] text-white/50 mb-3 drop-shadow-lg mix-blend-difference">Scroll</span>
          <motion.svg
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white/50 w-5 h-5 mix-blend-difference"
          >
            <path d="m6 9 6 6 6-6"/>
          </motion.svg>
        </motion.div>

      </div>
    </main>
  );
}
