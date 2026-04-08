'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button, Input, Label } from '@/components/ui/form-elements';
import { Sparkles } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      });

      if (result?.error) {
        setError('Incorrect email or password.');
      } else {
        router.push('/admin');
        router.refresh();
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-void">
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

      <div className="relative w-full max-w-md space-y-8 rounded-sm border border-white/[0.08] bg-obsidian/95 backdrop-blur-xl p-8 shadow-2xl">
        {/* Gradient overlay */}
        <div className="absolute inset-0 rounded-sm bg-gradient-to-b from-solar/5 via-transparent to-hydrogen/5 pointer-events-none" />
        
        <div className="relative text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="h-6 w-6 text-solar" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-text-primary to-solar bg-clip-text text-transparent">Helios NRG</h1>
          </div>
          <p className="text-sm text-text-muted font-mono">Admin Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="relative space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="rounded-sm border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </div>
    </div>
  );
}
