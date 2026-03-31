'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import CountUp from '@/components/ui/CountUp';
import Link from 'next/link';

interface HeroProps {
  hero: {
    eyebrowText: string;
    headlineLine1: string;
    headlineLine2: string;
    subheadline: string;
    primaryCTALabel: string;
    primaryCTAHref: string;
    secondaryCTALabel: string;
    secondaryCTAHref: string;
    backgroundType: 'gradient' | 'image' | 'video';
    backgroundImage?: string;
    backgroundVideo?: string;
    overlayOpacity: number;
  };
  metrics: Array<{
    value: string;
    label: string;
    suffix?: string;
  }>;
}

export default function HeroClient({ hero, metrics }: HeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [particleRadius, setParticleRadius] = useState(250);

  useEffect(() => {
    setIsLoaded(true);
    
    const updateRadius = () => {
      if (window.innerWidth < 640) {
        setParticleRadius(125);
      } else if (window.innerWidth < 1024) {
        setParticleRadius(175);
      } else {
        setParticleRadius(250);
      }
    };
    
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  return (
    <section className="relative w-full min-h-[100svh] flex items-center overflow-hidden bg-void pt-24 pb-12 md:pt-20 z-0">
      {/* Background Layer */}
      {hero.backgroundType === 'image' && hero.backgroundImage && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${hero.backgroundImage})` }}
          />
          <div 
            className="absolute inset-0 bg-void"
            style={{ opacity: hero.overlayOpacity }}
          />
        </>
      )}

      {hero.backgroundType === 'video' && hero.backgroundVideo && (
        <>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={hero.backgroundVideo} type="video/mp4" />
          </video>
          <div 
            className="absolute inset-0 bg-void"
            style={{ opacity: hero.overlayOpacity }}
          />
        </>
      )}

      {hero.backgroundType === 'gradient' && (
        <>
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
          <motion.div
            className="absolute top-20 right-1/4 w-96 h-96 bg-gradient-to-br from-solar via-solar to-transparent rounded-full opacity-8 blur-3xl"
            animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.12, 0.08] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-hydrogen via-hydrogen to-transparent rounded-full opacity-5 blur-3xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.08, 0.05] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
        </>
      )}

      <div className="container-custom px-6 md:px-12 lg:px-20 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-col space-y-8"
          >
            {/* Eyebrow */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-px bg-gradient-to-r from-solar to-transparent" />
              <span className="eyebrow">{hero.eyebrowText}</span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1>
                <span className="text-text-primary">{hero.headlineLine1}</span>
                <br />
                <span className="bg-gradient-to-r from-solar via-solar to-hydrogen bg-clip-text text-transparent">
                  {hero.headlineLine2}
                </span>
              </h1>
            </div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isLoaded ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="subheadline text-text-secondary leading-relaxed max-w-2xl"
            >
              {hero.subheadline}
            </motion.p>

            {/* Metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isLoaded ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-3 gap-3 sm:gap-6 py-6 sm:py-8 border-t border-b border-white/[0.08]"
            >
              {metrics.map((metric, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-baseline space-x-0.5 sm:space-x-1">
                    <span className="metric-value">
                      <CountUp
                        end={parseFloat(metric.value)}
                        decimals={metric.value.includes('.') ? 1 : 0}
                        prefix={metric.suffix?.startsWith('$') ? '$' : ''}
                        suffix={metric.suffix && !metric.suffix.startsWith('$') ? metric.suffix : ''}
                      />
                    </span>
                  </div>
                  <div className="metric-label">{metric.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isLoaded ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4"
            >
              <Link href={hero.primaryCTAHref} className="group relative btn-primary overflow-hidden">
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>{hero.primaryCTALabel}</span>
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </Link>
              <Link href={hero.secondaryCTAHref} className="group btn-secondary relative overflow-hidden">
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>{hero.secondaryCTALabel}</span>
                  <motion.span
                    className="inline-block"
                    animate={{ y: [0, 2, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ↓
                  </motion.span>
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - Animated Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="flex items-center justify-center relative h-[300px] sm:h-[400px] lg:h-[600px] -mt-8 lg:mt-0"
          >
            {/* Globe Container */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Outer Ring */}
              <motion.div
                className="absolute w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:w-[500px] lg:h-[500px] rounded-full border border-solar/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              />
              
              {/* Middle Ring */}
              <motion.div
                className="absolute w-[210px] h-[210px] sm:w-[290px] sm:h-[290px] lg:w-[420px] lg:h-[420px] rounded-full border border-hydrogen/15"
                animate={{ rotate: -360 }}
                transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
              />

              {/* Globe Core */}
              <div className="relative w-[180px] h-[180px] sm:w-[250px] sm:h-[250px] lg:w-[350px] lg:h-[350px]">
                {/* Gradient Sphere */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-solar/20 via-hydrogen/10 to-transparent backdrop-blur-sm" />
                
                {/* Grid Lines - Latitude */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={`lat-${i}`}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{
                      width: `${100 - i * 12}%`,
                      height: `${100 - i * 12}%`,
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30 + i * 5, repeat: Infinity, ease: 'linear' }}
                  >
                    <div className="w-full h-full rounded-full border border-solar/10" />
                  </motion.div>
                ))}

                {/* Grid Lines - Longitude */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={`long-${i}`}
                    className="absolute left-1/2 top-1/2 w-full h-full"
                    style={{
                      transform: `translate(-50%, -50%) rotateY(${i * 15}deg)`,
                    }}
                    animate={{ rotateZ: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                  >
                    <div className="w-px h-full mx-auto bg-gradient-to-b from-transparent via-hydrogen/20 to-transparent" />
                  </motion.div>
                ))}

                {/* Glowing Points - Project Locations */}
                {[
                  { top: '20%', left: '30%', delay: 0 },
                  { top: '40%', left: '70%', delay: 0.5 },
                  { top: '60%', left: '25%', delay: 1 },
                  { top: '35%', left: '55%', delay: 1.5 },
                  { top: '70%', left: '60%', delay: 2 },
                  { top: '25%', left: '80%', delay: 2.5 },
                ].map((point, i) => (
                  <motion.div
                    key={`point-${i}`}
                    className="absolute w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-solar shadow-lg shadow-solar/50"
                    style={{ top: point.top, left: point.left }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: point.delay,
                    }}
                  />
                ))}

                {/* Center Glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-radial from-solar/5 via-transparent to-transparent" />
              </div>

              {/* Orbiting Particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-1 h-1 rounded-full bg-hydrogen"
                  style={{
                    top: '50%',
                    left: '50%',
                  }}
                  animate={{
                    x: [0, Math.cos((i * 60 * Math.PI) / 180) * particleRadius, 0],
                    y: [0, Math.sin((i * 60 * Math.PI) / 180) * particleRadius, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    delay: i * 1.3,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
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
