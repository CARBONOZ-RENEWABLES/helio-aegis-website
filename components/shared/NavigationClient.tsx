'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function NavigationClient({ navigation }: { navigation: any }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const primaryLinks = navigation.primary || [];
  const utilityButtons = navigation.utilityRight || [];

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 1000,
          background: 'rgba(10, 10, 10, 0.95)',
          backdropFilter: 'blur(8px)',
        }}
        className={`transition-all duration-300 border-b ${
          isScrolled 
            ? 'shadow-lg shadow-black/20 border-white/10' 
            : 'border-white/5'
        }`}
      >
        <div className="container-custom" style={{ paddingLeft: '1.25rem', paddingRight: '1.25rem' }}>
          <div className="flex items-center justify-between h-20">
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
              {primaryLinks.map((link: any, index: number) => (
                <NavLink key={index} href={link.href}>{link.label}</NavLink>
              ))}
            </div>

            {/* Utility Navigation */}
            <div className="hidden lg:flex items-center space-x-4">
              {utilityButtons.map((button: any, index: number) => (
                <Link key={index} href={button.href}>
                  <button className={button.variant === 'primary' ? 'btn-primary text-sm px-5 py-2.5' : 'btn-ghost text-sm px-5 py-2.5'}>
                    {button.label}
                  </button>
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-12 h-12 flex items-center justify-center"
              aria-label="Toggle menu"
              style={{ color: '#F0F4F8' }}
            >
              {isMobileMenuOpen ? (
                <span style={{ fontSize: '28px', fontWeight: '300' }}>✕</span>
              ) : (
                <span style={{ fontSize: '28px', fontWeight: '300' }}>☰</span>
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: '80px',
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999,
              background: 'rgba(10, 10, 10, 0.98)',
              backdropFilter: 'blur(8px)',
            }}
            className="lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col space-y-1" style={{ padding: '1.25rem' }}>
              {primaryLinks.map((link: any, index: number) => (
                <Link
                  key={index}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-text-primary hover:text-solar transition-colors duration-200 border-b border-white/5"
                  style={{
                    fontSize: '1.125rem',
                    padding: '1rem 0',
                    minHeight: '48px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-6 space-y-3">
                {utilityButtons.map((button: any, index: number) => (
                  <Link key={index} href={button.href} onClick={() => setIsMobileMenuOpen(false)}>
                    <button className={button.variant === 'primary' ? 'btn-primary w-full' : 'btn-ghost w-full'}>
                      {button.label}
                    </button>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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
