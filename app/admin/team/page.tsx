import dbConnect from '@/lib/mongodb';
import TeamMember from '@/models/TeamMember';
import Link from 'next/link';
import { Button } from '@/components/ui/form-elements';
import { Plus, Eye } from 'lucide-react';
import { StatusBadge } from '@/components/admin/AdminLayout';
import Image from 'next/image';

export default async function TeamPage() {
  await dbConnect();
  const teamMembers = await TeamMember.find().sort({ order: 1 }).lean();

  return (
    <div className="max-w-7xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary font-display">Team Management</h1>
          <p className="mt-2 text-text-secondary">Manage team members displayed on the About page</p>
        </div>
        <div className="flex gap-3">
          <a href="/about" target="_blank" rel="noopener noreferrer">
            <Button variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              Preview About Page
            </Button>
          </a>
          <Link href="/admin/team/new">
            <Button className="bg-gradient-to-r from-solar to-hydrogen">
              <Plus className="mr-2 h-4 w-4" />
              Add Team Member
            </Button>
          </Link>
        </div>
      </div>

      {teamMembers.length === 0 ? (
        <div className="rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm p-12 text-center">
          <p className="text-text-secondary mb-4">No team members yet</p>
          <Link href="/admin/team/new">
            <Button className="bg-gradient-to-r from-solar to-hydrogen">
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Team Member
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member: any) => (
            <Link
              key={member._id.toString()}
              href={`/admin/team/${member._id.toString()}`}
              className="card p-6 space-y-4 hover:border-solar/40 transition-all group"
            >
              <div className="flex items-start justify-between">
                {member.profileImage ? (
                  <div className="relative w-16 h-16 rounded-sm overflow-hidden">
                    <Image
                      src={member.profileImage}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-gradient-to-br from-solar/20 to-hydrogen/20 rounded-sm flex items-center justify-center">
                    <span className="text-2xl">👤</span>
                  </div>
                )}
                <StatusBadge status={member.status} />
              </div>
              
              <div>
                <h3 className="font-display text-lg text-text-primary group-hover:text-solar transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm text-solar font-semibold mt-1">{member.title}</p>
              </div>
              
              <p className="text-sm text-text-secondary line-clamp-2">{member.bio}</p>
              
              {member.expertise && member.expertise.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/[0.08]">
                  {member.expertise.slice(0, 3).map((exp: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-white/5 text-xs text-text-muted rounded-sm"
                    >
                      {exp}
                    </span>
                  ))}
                  {member.expertise.length > 3 && (
                    <span className="px-2 py-1 text-xs text-text-muted">+{member.expertise.length - 3}</span>
                  )}
                </div>
              )}
              
              <div className="text-xs text-text-muted pt-2 border-t border-white/[0.08]">
                Order: {member.order}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
