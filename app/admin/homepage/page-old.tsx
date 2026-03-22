'use client';

import { DesignLockBanner } from '@/components/admin/AdminLayout';

export default function HomepageEditorPage() {
  return (
    <div className="max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary">Homepage Editor</h1>
        <p className="mt-2 text-text-secondary">Edit all homepage content sections</p>
      </div>

      <DesignLockBanner />

      <div className="space-y-6">
        <div className="rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm p-6 hover:border-solar/30 transition-colors">
          <h2 className="text-lg font-semibold text-text-primary">Hero Section</h2>
          <p className="mt-2 text-sm text-text-secondary">Coming soon - Edit hero headline, subheadline, and CTAs</p>
        </div>

        <div className="rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm p-6 hover:border-solar/30 transition-colors">
          <h2 className="text-lg font-semibold text-text-primary">Metrics Strip</h2>
          <p className="mt-2 text-sm text-text-secondary">Coming soon - Manage homepage metrics</p>
        </div>

        <div className="rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm p-6 hover:border-solar/30 transition-colors">
          <h2 className="text-lg font-semibold text-text-primary">Capabilities</h2>
          <p className="mt-2 text-sm text-text-secondary">Coming soon - Edit capabilities section</p>
        </div>
      </div>
    </div>
  );
}
