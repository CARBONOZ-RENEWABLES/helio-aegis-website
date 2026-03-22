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

  const primaryLinks = navigation.primary || [];
  const utilityButtons = navigation.utilityRight || [];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-void/95 backdrop-blur-xl shadow-lg shadow-black/20 border-white/10' 
          : 'bg-void/90 backdrop-blur-md border-white/5'
      }`}
    >
      <div className="container-custom px-6 md:px-12 lg:px-20">
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
              {primaryLinks.map((link: any, index: number) => (
                <MobileNavLink key={index} href={link.href} onClick={() => setIsMobileMenuOpen(false)}>
                  {link.label}
                </MobileNavLink>
              ))}
              <div className="pt-6 space-y-3">
                {utilityButtons.map((button: any, index: number) => (
                  <Link key={index} href={button.href}>
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
