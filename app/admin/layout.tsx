import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { AdminSidebar, AdminTopBar } from '@/components/admin/AdminLayout';

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="relative flex min-h-screen bg-void">
      {/* Dark sophisticated background matching main website */}
      <div className="fixed inset-0 -z-10">
        {/* Base dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-void via-obsidian to-slate-dark" />
        
        {/* Grid texture overlay */}
        <div className="absolute inset-0 grid-texture opacity-40" />
        
        {/* Animated gradient orbs - solar themed */}
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-solar/10 to-solar/5 blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-gradient-to-br from-hydrogen/8 to-hydrogen/3 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-0 right-1/3 h-80 w-80 rounded-full bg-gradient-to-br from-solar/8 to-hydrogen/5 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Subtle radial gradient for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,166,35,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,194,255,0.03),transparent_50%)]" />
        
        {/* Noise texture for grain */}
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay">
          <svg className="h-full w-full">
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>
        </div>
      </div>

      <AdminSidebar userRole={session.user.role} />
      <div className="w-full lg:ml-60 flex-1">
        <AdminTopBar user={session.user} />
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
