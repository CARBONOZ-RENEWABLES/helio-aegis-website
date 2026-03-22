import Link from 'next/link';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import { Button } from '@/components/ui/form-elements';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { StatusBadge } from '@/components/admin/AdminLayout';
import DeleteProjectButton from '@/components/admin/DeleteProjectButton';

export default async function ProjectsPage() {
  const session = await auth();
  await dbConnect();

  const projects = await Project.find({})
    .sort({ 'basicInfo.order': 1, updatedAt: -1 })
    .limit(50)
    .lean();

  return (
    <div className="max-w-7xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary font-display">Projects</h1>
          <p className="mt-2 text-text-secondary">
            Manage portfolio projects - {projects.length} total
          </p>
        </div>
        <Link href="/admin/projects/new">
          <Button className="bg-gradient-to-r from-solar to-hydrogen text-void hover:shadow-solar">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-sm border border-white/[0.08] bg-obsidian/80 backdrop-blur-sm p-12 text-center shadow-card">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
            <Plus className="h-8 w-8 text-text-muted" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary">No projects yet</h3>
          <p className="mt-2 text-sm text-text-secondary">
            Get started by creating your first project
          </p>
          <Link href="/admin/projects/new">
            <Button className="mt-4 bg-gradient-to-r from-solar to-hydrogen text-void">
              <Plus className="mr-2 h-4 w-4" />
              Create Project
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
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wider font-mono">
                    Technology
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wider font-mono">
                    Capacity
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
                {projects.map((project: any) => (
                  <tr key={project._id.toString()} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {project.media?.heroImage && (
                          <img
                            src={project.media.heroImage}
                            alt={project.basicInfo?.name}
                            className="h-10 w-10 rounded-sm object-cover border border-white/[0.08]"
                          />
                        )}
                        <div>
                          <div className="font-medium text-text-primary">
                            {project.basicInfo?.name || 'Untitled'}
                          </div>
                          <div className="text-sm text-text-muted font-mono">
                            {project.basicInfo?.location?.city}, {project.basicInfo?.location?.country}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-full bg-hydrogen/20 px-2.5 py-0.5 text-xs font-medium text-hydrogen capitalize border border-hydrogen/30">
                        {project.basicInfo?.technology || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-primary font-mono">
                      {project.basicInfo?.capacityMW ? `${project.basicInfo.capacityMW} MW` : 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={project.status || 'draft'} />
                    </td>
                    <td className="px-6 py-4">
                      {project.basicInfo?.featured ? (
                        <span className="text-solar text-lg">★</span>
                      ) : (
                        <span className="text-text-muted text-lg">☆</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-text-muted font-mono">
                      {new Date(project.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/portfolio/${project.slug}`}
                          target="_blank"
                          className="rounded-sm p-2 text-text-muted hover:bg-white/5 hover:text-hydrogen transition-colors"
                          title="Preview"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/admin/projects/${project._id}`}
                          className="rounded-sm p-2 text-text-muted hover:bg-white/5 hover:text-solar transition-colors"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <DeleteProjectButton 
                          projectId={project._id.toString()} 
                          projectName={project.basicInfo?.name || 'Untitled'}
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
