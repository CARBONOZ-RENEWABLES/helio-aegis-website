'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import CountUp from '@/components/ui/CountUp';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-void pt-20">
      {/* Advanced Background Grid */}
      <div className="absolute inset-0">
        <svg className="absolute inset-0 w-full h-full opacity-5" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-20 right-1/4 w-96 h-96 bg-gradient-to-br from-solar via-solar to-transparent rounded-full opacity-8 blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.08, 0.12, 0.08],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-hydrogen via-hydrogen to-transparent rounded-full opacity-5 blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-void/20 to-void pointer-events-none" />

      <div className="container-custom px-6 md:px-12 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Advanced Globe Visualization */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="hidden lg:flex items-center justify-center h-full"
          >
            <div className="relative w-full aspect-square max-w-md">
              {/* Outer Ring */}
              <motion.div
                className="absolute inset-0 border border-solar/20 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              />

              {/* Middle Ring */}
              <motion.div
                className="absolute inset-8 border border-hydrogen/15 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
              />

              {/* Inner Globe */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="relative w-48 h-48 bg-gradient-to-br from-slate-dark via-slate-mid to-slate-dark rounded-full shadow-2xl"
                  style={{
                    x: mousePosition.x,
                    y: mousePosition.y,
                  }}
                  transition={{ type: 'spring', stiffness: 100, damping: 30 }}
                >
                  {/* Globe Shine */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-full" />

                  {/* Animated Data Points */}
                  {[
                    { x: 30, y: 40, size: 'w-2 h-2' },
                    { x: 70, y: 30, size: 'w-1.5 h-1.5' },
                    { x: 50, y: 70, size: 'w-2 h-2' },
                    { x: 20, y: 60, size: 'w-1 h-1' },
                    { x: 80, y: 50, size: 'w-1.5 h-1.5' },
                  ].map((point, idx) => (
                    <motion.div
                      key={idx}
                      className={`absolute ${point.size} bg-solar rounded-full`}
                      style={{
                        left: `${point.x}%`,
                        top: `${point.y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      animate={{
                        opacity: [0.4, 1, 0.4],
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{
                        duration: 3 + idx * 0.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  ))}

                  {/* Connection Lines */}
                  <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                    <motion.line
                      x1="30%"
                      y1="40%"
                      x2="70%"
                      y2="30%"
                      stroke="url(#lineGradient)"
                      strokeWidth="1"
                      opacity="0.3"
                      initial={{ pathLength: 0 }}
                      animate={isLoaded ? { pathLength: 1 } : {}}
                      transition={{ duration: 2, ease: 'easeOut' }}
                    />
                    <motion.line
                      x1="70%"
                      y1="30%"
                      x2="50%"
                      y2="70%"
                      stroke="url(#lineGradient)"
                      strokeWidth="1"
                      opacity="0.3"
                      initial={{ pathLength: 0 }}
                      animate={isLoaded ? { pathLength: 1 } : {}}
                      transition={{ duration: 2.2, ease: 'easeOut', delay: 0.2 }}
                    />
                    <defs>
                      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#F5A623" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#00C2FF" stopOpacity="0.2" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>
              </div>

              {/* Floating Labels */}
              <motion.div
                className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <p className="text-xs text-text-muted uppercase tracking-widest font-semibold">
                  Global Infrastructure
                </p>
              </motion.div>

              <motion.div
                className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <p className="text-xs text-solar font-mono font-semibold">340+ Projects • 18.2 GW</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-col space-y-8"
          >
            {/* Eyebrow with Line */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-px bg-gradient-to-r from-solar to-transparent" />
              <span className="eyebrow">Energy Finance & Project Management</span>
            </div>

            {/* Headline with Gradient */}
            <div className="space-y-4">
              <h1 className="font-display text-5xl md:text-6xl lg:text-6xl leading-tight tracking-tight">
                <span className="text-text-primary">Structuring the</span>
                <br />
                <span className="bg-gradient-to-r from-solar via-solar to-hydrogen bg-clip-text text-transparent">
                  Clean Energy Future
                </span>
              </h1>
            </div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isLoaded ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-lg"
            >
              We originate, finance, and deliver utility-scale renewable infrastructure across
              North America, Europe, and Africa. Institutional capital at scale.
            </motion.p>

            {/* Advanced Metrics Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isLoaded ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-3 gap-6 py-8 border-t border-b border-white/[0.08]"
            >
              {[
                { value: 12.4, suffix: 'B', prefix: '$', label: 'Capital Deployed' },
                { value: 18.2, suffix: ' GW', label: 'Capacity Managed' },
                { value: 340, suffix: '+', label: 'Projects Closed' },
              ].map((metric, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-baseline space-x-1">
                    <span className="metric-value text-3xl md:text-4xl">
                      <CountUp
                        end={metric.value}
                        decimals={metric.value < 100 ? 1 : 0}
                        prefix={metric.prefix}
                        suffix={metric.suffix}
                      />
                    </span>
                  </div>
                  <div className="metric-label text-xs">{metric.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons with Hover Effects */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isLoaded ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <button className="group relative btn-primary overflow-hidden">
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>Explore Our Portfolio</span>
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
                <div className="absolute inset-0 bg-solar-dim transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </button>
              <button className="group btn-secondary relative overflow-hidden">
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>Investment Deck</span>
                  <motion.span
                    className="inline-block"
                    animate={{ y: [0, 2, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ↓
                  </motion.span>
                </span>
              </button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isLoaded ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-4 pt-4 text-xs text-text-muted"
            >
              {['Typically responds within 24 hours', 'NDA available', 'Strict confidentiality'].map(
                (indicator, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <span className="w-1 h-1 bg-solar rounded-full" />
                    <span>{indicator}</span>
                  </div>
                )
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - Minimal */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        initial={{ opacity: 0 }}
        style={{ opacity: isLoaded ? 1 : 0 }}
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-xs text-text-muted tracking-widest uppercase font-semibold">
            Scroll
          </span>
          <div className="w-px h-6 bg-gradient-to-b from-solar to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
