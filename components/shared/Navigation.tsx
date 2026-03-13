'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-void/92 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="container-custom px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-solar rounded-sm flex items-center justify-center">
              <span className="text-void font-display font-bold text-xl">H</span>
            </div>
            <span className="font-display text-xl tracking-tight hidden md:block">
              Helio Aegis
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavLink href="/about">About</NavLink>
            <NavLink href="/capabilities">Capabilities</NavLink>
            <NavLink href="/portfolio">Portfolio</NavLink>
            <NavLink href="/insights">Insights</NavLink>
            <NavLink href="/investors">Investors</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </div>

          {/* Utility Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="btn-ghost text-sm px-5 py-2.5">Login</button>
            <button className="btn-primary text-sm px-5 py-2.5">Request Meeting</button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center space-y-1.5"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-text-primary transition-all"
            />
            <motion.span
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-text-primary transition-all"
            />
            <motion.span
              animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-text-primary transition-all"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-full bg-void lg:hidden"
          >
            <div className="flex flex-col p-6 space-y-6 mt-20">
              <MobileNavLink href="/about" onClick={() => setIsMobileMenuOpen(false)}>
                About
              </MobileNavLink>
              <MobileNavLink href="/capabilities" onClick={() => setIsMobileMenuOpen(false)}>
                Capabilities
              </MobileNavLink>
              <MobileNavLink href="/portfolio" onClick={() => setIsMobileMenuOpen(false)}>
                Portfolio
              </MobileNavLink>
              <MobileNavLink href="/insights" onClick={() => setIsMobileMenuOpen(false)}>
                Insights
              </MobileNavLink>
              <MobileNavLink href="/investors" onClick={() => setIsMobileMenuOpen(false)}>
                Investors
              </MobileNavLink>
              <MobileNavLink href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                Contact
              </MobileNavLink>
              <div className="pt-6 space-y-3">
                <button className="btn-ghost w-full">Login</button>
                <button className="btn-primary w-full">Request Meeting</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm tracking-wide text-text-secondary hover:text-text-primary transition-colors duration-200 relative group"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-solar group-hover:w-full transition-all duration-200" />
    </Link>
  );
}

function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-2xl font-display text-text-primary hover:text-solar transition-colors duration-200"
    >
      {children}
    </Link>
  );
}
