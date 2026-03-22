import Link from 'next/link';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import { Insight, FAQ, TeamMember } from '@/models/AuditLog';
import { Button } from '@/components/ui/form-elements';
import { Plus } from 'lucide-react';

export default async function AdminDashboard() {
  const session = await auth();
  await dbConnect();

  const [projectStats, insightStats, teamStats, faqStats] = await Promise.all([
    Project.countDocuments({ status: { $ne: 'archived' } }),
    Insight.countDocuments({ status: { $ne: 'archived' } }),
    TeamMember.countDocuments({ status: 'active' }),
    FAQ.countDocuments({ status: 'published' })
  ]);

  const [draftProjects, draftInsights] = await Promise.all([
    Project.countDocuments({ status: 'draft' }),
    Insight.countDocuments({ status: 'draft' })
  ]);

  return (
    <div className="max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary">Welcome back, {session?.user.name}</h1>
        <p className="mt-2 text-text-secondary">Here&apos;s what needs attention.</p>
      </div>

      {(draftProjects > 0 || draftInsights > 0) && (
        <div className="mb-8 rounded-sm border border-solar/30 bg-gradient-to-r from-solar/10 to-amber-500/10 backdrop-blur-sm p-4">
          <h2 className="font-semibold text-solar">Action Required</h2>
          <ul className="mt-2 space-y-1 text-sm text-text-secondary">
            {draftProjects > 0 && <li>{draftProjects} projects in draft — review and publish</li>}
            {draftInsights > 0 && <li>{draftInsights} insights in draft — review and publish</li>}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <div className="rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm p-6 hover:border-solar/30 transition-colors">
          <div className="text-3xl font-bold text-text-primary font-mono">{projectStats}</div>
          <div className="mt-1 text-sm text-text-secondary">Projects</div>
          {draftProjects > 0 && (
            <div className="mt-2 text-xs text-solar">+{draftProjects} drafts</div>
          )}
        </div>

        <div className="rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm p-6 hover:border-solar/30 transition-colors">
          <div className="text-3xl font-bold text-text-primary font-mono">{insightStats}</div>
          <div className="mt-1 text-sm text-text-secondary">Insights</div>
          {draftInsights > 0 && (
            <div className="mt-2 text-xs text-solar">+{draftInsights} drafts</div>
          )}
        </div>

        <div className="rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm p-6 hover:border-solar/30 transition-colors">
          <div className="text-3xl font-bold text-text-primary font-mono">{teamStats}</div>
          <div className="mt-1 text-sm text-text-secondary">Team Members</div>
        </div>

        <div className="rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm p-6 hover:border-solar/30 transition-colors">
          <div className="text-3xl font-bold text-text-primary font-mono">{faqStats}</div>
          <div className="mt-1 text-sm text-text-secondary">FAQs Published</div>
        </div>
      </div>


    </div>
  );
}
