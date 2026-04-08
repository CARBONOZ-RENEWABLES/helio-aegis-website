'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, Home, Map, Users, Lightbulb, HelpCircle, 
  Briefcase, BarChart3, Navigation as NavIcon, Image, 
  Settings, User, FileText, LogOut, Sparkles, BookOpen
} from 'lucide-react';

const navItems = [
  { label: 'CONTENT', type: 'heading' },
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Homepage', href: '/admin/homepage', icon: Home },
  { label: 'About Page', href: '/admin/about', icon: BookOpen },
  { label: 'Capabilities', href: '/admin/capabilities', icon: Sparkles },
  { label: 'Projects', href: '/admin/projects', icon: Map },
  { label: 'Team', href: '/admin/team', icon: Users },
  { label: 'Insights', href: '/admin/insights', icon: Lightbulb },
  { label: 'FAQ', href: '/admin/faq', icon: HelpCircle },
  { label: 'Investors Page', href: '/admin/investors', icon: Briefcase },
  { label: 'Contact Page', href: '/admin/contact-page', icon: User },
  { label: 'Metrics', href: '/admin/metrics', icon: BarChart3 },
  { label: 'STRUCTURE', type: 'heading' },
  { label: 'Navigation', href: '/admin/navigation', icon: NavIcon },
  { label: 'Footer', href: '/admin/footer', icon: FileText },
  { label: 'SYSTEM', type: 'heading' },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
  { label: 'User Management', href: '/admin/settings/users', icon: User, adminOnly: true },
  { label: 'Audit Log', href: '/admin/audit-log', icon: FileText }
];

export function AdminSidebar({ userRole }: { userRole: string }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 flex flex-col items-center justify-center space-y-1.5 bg-obsidian/95 backdrop-blur-xl border border-white/[0.08] rounded-sm"
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

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 z-40 h-screen w-60 border-r border-white/[0.08] bg-obsidian/95 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Sidebar gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-solar/5 via-transparent to-hydrogen/5 pointer-events-none" />
        
        <div className="relative flex h-16 items-center border-b border-white/[0.08] px-6 bg-gradient-to-r from-solar/5 to-hydrogen/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-solar rounded-sm flex items-center justify-center flex-shrink-0">
              <span className="text-void font-display font-bold text-xl">H</span>
            </div>
            <span className="font-display text-xl tracking-tight text-text-primary whitespace-nowrap">Helios NRG</span>
            <span className="rounded-full bg-gradient-to-r from-solar to-hydrogen px-2 py-0.5 text-xs font-semibold text-void shadow-lg shadow-solar/25">CMS</span>
          </div>
        </div>
        
        <nav className="relative space-y-1 p-4 overflow-y-auto h-[calc(100vh-4rem)]">
          {navItems.map((item, idx) => {
            if (item.type === 'heading') {
              return (
                <div key={idx} className="px-3 py-3 text-xs font-bold text-text-muted uppercase tracking-wider font-mono">
                  {item.label}
                </div>
              );
            }

            if (item.adminOnly && userRole !== 'super_admin') return null;

            const Icon = item.icon!;
            const isActive = mounted && pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href!}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'group relative flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-gradient-to-r from-solar to-hydrogen text-void shadow-lg shadow-solar/25'
                    : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'
                )}
              >
                {isActive && (
                  <div className="absolute inset-0 rounded-sm bg-gradient-to-r from-solar to-hydrogen opacity-20 blur-xl" />
                )}
                <Icon className={cn(
                  "h-4 w-4 transition-transform duration-200 relative z-10",
                  isActive ? "scale-110" : "group-hover:scale-105"
                )} />
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}

export function AdminTopBar({ 
  user, 
  breadcrumbs
}: { 
  user: { name: string; email: string; role: string };
  breadcrumbs?: string[];
}) {
  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout', { method: 'POST' });
      window.location.href = '/admin/login';
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/[0.08] bg-obsidian/95 backdrop-blur-xl px-4 sm:px-6">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-solar/5 via-transparent to-hydrogen/5 pointer-events-none" />
      
      <div className="relative flex items-center gap-2 text-sm text-text-secondary font-mono">
        {breadcrumbs?.map((crumb, idx) => (
          <span key={idx} className="hidden sm:inline">
            {idx > 0 && <span className="mx-2 text-text-muted">/</span>}
            <span className={idx === breadcrumbs.length - 1 ? 'font-medium text-text-primary' : ''}>
              {crumb}
            </span>
          </span>
        ))}
      </div>

      <div className="relative flex items-center gap-2 sm:gap-4">
        <div className="text-right hidden sm:block">
          <div className="text-sm font-semibold text-text-primary">{user.name}</div>
          <div className="text-xs text-text-muted capitalize font-mono">{user.role.replace('_', ' ')}</div>
        </div>
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-solar to-hydrogen flex items-center justify-center text-void font-bold shadow-lg shadow-solar/25">
          {user.name.charAt(0)}
        </div>
        <button
          onClick={handleSignOut}
          className="flex h-9 items-center gap-2 rounded-sm border border-white/[0.08] bg-white/5 px-3 text-sm font-medium text-text-secondary transition-all hover:bg-white/10 hover:text-text-primary hover:border-solar/40"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </div>
    </header>
  );
}

export function DesignLockBanner({ onDismiss }: { onDismiss?: () => void }) {
  return (
    <div className="mb-6 rounded-sm border border-solar/20 bg-gradient-to-r from-solar/10 to-hydrogen/10 backdrop-blur-sm p-4 shadow-card">
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-solar/20 text-solar">
            🔒
          </div>
          <div>
            <div className="font-semibold text-text-primary">Design Locked</div>
            <p className="mt-1 text-sm text-text-secondary">
              You can edit text and media content on this page. Colors, fonts, spacing, and layout 
              are managed in source code to maintain brand consistency.
            </p>
          </div>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-text-muted hover:text-text-primary transition-colors"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}

export function StatusBadge({ status }: { status: 'draft' | 'published' | 'archived' }) {
  const styles = {
    draft: 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-400 border-yellow-500/30',
    published: 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/30',
    archived: 'bg-gradient-to-r from-slate-500/20 to-gray-500/20 text-slate-400 border-slate-500/30'
  };

  return (
    <span className={cn(
      'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold shadow-sm font-mono',
      styles[status]
    )}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
