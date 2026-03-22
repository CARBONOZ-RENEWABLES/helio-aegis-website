import Link from 'next/link';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Insight from '@/models/Insight';
import { Button } from '@/components/ui/form-elements';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { StatusBadge } from '@/components/admin/AdminLayout';
import DeleteInsightButton from '@/components/admin/DeleteInsightButton';

export default async function InsightsPage() {
  const session = await auth();
  await dbConnect();

  const insights = await Insight.find({})
    .sort({ updatedAt: -1 })
    .limit(50)
    .lean();

  return (
    <div className="max-w-7xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary font-display">Insights</h1>
          <p className="mt-2 text-text-secondary">
            Manage articles, reports, and commentary - {insights.length} total
          </p>
        </div>
        <Link href="/admin/insights/new">
          <Button className="bg-gradient-to-r from-solar to-hydrogen text-void hover:shadow-solar">
            <Plus className="mr-2 h-4 w-4" />
            New Insight
          </Button>
        </Link>
      </div>

      {insights.length === 0 ? (
        <div className="rounded-sm border border-white/[0.08] bg-obsidian/80 backdrop-blur-sm p-12 text-center shadow-card">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
            <Plus className="h-8 w-8 text-text-muted" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary">No insights yet</h3>
          <p className="mt-2 text-sm text-text-secondary">
            Get started by creating your first insight
          </p>
          <Link href="/admin/insights/new">
            <Button className="mt-4 bg-gradient-to-r from-solar to-hydrogen text-void">
              <Plus className="mr-2 h-4 w-4" />
              Create Insight
            </Button>
          </Link>
        </div>
      ) : (
        <div className="rounded-sm border border-white/[0.08] bg-obsidian/80 backdrop-blur-sm shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/[0.08]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wider font-mono">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wider font-mono">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wider font-mono">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wider font-mono">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wider font-mono">
                    Featured
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wider font-mono">
                    Updated
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-text-muted uppercase tracking-wider font-mono">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.08]">
                {insights.map((insight: any) => (
                  <tr key={insight._id.toString()} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-text-primary">
                          {insight.title || 'Untitled'}
                        </div>
                        <div className="text-sm text-text-muted line-clamp-1">
                          {insight.excerpt}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${
                        insight.type === 'Research' ? 'bg-hydrogen/20 text-hydrogen border-hydrogen/30' :
                        insight.type === 'Commentary' ? 'bg-solar/20 text-solar border-solar/30' :
                        'bg-growth/20 text-growth border-growth/30'
                      }`}>
                        {insight.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">
                      {insight.category}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={insight.status || 'draft'} />
                    </td>
                    <td className="px-6 py-4">
                      {insight.featured ? (
                        <span className="text-solar text-lg">★</span>
                      ) : (
                        <span className="text-text-muted text-lg">☆</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-text-muted font-mono">
                      {new Date(insight.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/insights/${insight.slug}`}
                          target="_blank"
                          className="rounded-sm p-2 text-text-muted hover:bg-white/5 hover:text-hydrogen transition-colors"
                          title="Preview"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/admin/insights/${insight._id}`}
                          className="rounded-sm p-2 text-text-muted hover:bg-white/5 hover:text-solar transition-colors"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <DeleteInsightButton 
                          insightId={insight._id.toString()} 
                          insightTitle={insight.title || 'Untitled'}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
