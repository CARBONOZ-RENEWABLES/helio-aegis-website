'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Label, Textarea } from '@/components/ui/form-elements';
import { Save, Trash2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ImageUpload from '@/components/admin/ImageUpload';

export default function TeamMemberForm({ teamMember }: { teamMember?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const isEditing = !!teamMember;

  const [formData, setFormData] = useState({
    name: teamMember?.name || '',
    title: teamMember?.title || '',
    bio: teamMember?.bio || '',
    expertise: teamMember?.expertise || [''],
    profileImage: teamMember?.profileImage || '',
    order: teamMember?.order || 0,
    status: teamMember?.status || 'draft'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isEditing ? `/api/admin/team/${teamMember._id}` : '/api/admin/team';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          expertise: formData.expertise.filter((e: string) => e.trim() !== '')
        })
      });

      if (response.ok) {
        alert(`Team member ${isEditing ? 'updated' : 'created'} successfully!`);
        router.push('/admin/team');
        router.refresh();
      } else {
        alert(`Failed to ${isEditing ? 'update' : 'create'} team member`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this team member?')) return;

    setDeleting(true);
    try {
      const response = await fetch(`/api/admin/team/${teamMember._id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        alert('Team member deleted successfully!');
        router.push('/admin/team');
        router.refresh();
      } else {
        alert('Failed to delete team member');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <Link href="/admin/team">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Team
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-text-primary font-display">
          {isEditing ? 'Edit Team Member' : 'Add Team Member'}
        </h1>
        <p className="mt-2 text-text-secondary">
          {isEditing ? 'Update team member information' : 'Add a new team member to the About page'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-text-primary mb-6 font-display">Basic Information</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Sarah Chen"
                required
              />
            </div>

            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Chief Executive Officer"
                required
              />
            </div>

            <div>
              <Label htmlFor="bio">Bio *</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={4}
                placeholder="20+ years in renewable energy finance and project development..."
                required
              />
              <p className="mt-1 text-xs text-text-muted">
                Brief professional background and experience
              </p>
            </div>
          </div>
        </div>

        {/* Profile Image */}
        <div className="rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-text-primary mb-6 font-display">Profile Image</h2>
          
          <div>
            <Label>Profile Photo (Optional)</Label>
            <ImageUpload
              value={formData.profileImage}
              onChange={(url) => setFormData({ ...formData, profileImage: url })}
              label="Upload profile photo (square format recommended)"
            />
            <p className="mt-2 text-xs text-text-muted">
              If no image is uploaded, a default avatar will be displayed
            </p>
          </div>
        </div>

        {/* Expertise */}
        <div className="rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-text-primary mb-6 font-display">Expertise Areas</h2>
          
          <div className="space-y-3">
            {formData.expertise.map((exp: string, idx: number) => (
              <div key={idx} className="flex gap-2">
                <Input
                  value={exp}
                  onChange={(e) => {
                    const updated = [...formData.expertise];
                    updated[idx] = e.target.value;
                    setFormData({ ...formData, expertise: updated });
                  }}
                  placeholder="Project Finance"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setFormData({
                    ...formData,
                    expertise: formData.expertise.filter((_: string, i: number) => i !== idx)
                  })}
                  className="text-alert"
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setFormData({
                ...formData,
                expertise: [...formData.expertise, '']
              })}
            >
              + Add Expertise
            </Button>
          </div>
        </div>

        {/* Settings */}
        <div className="rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-text-primary mb-6 font-display">Settings</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="order">Display Order</Label>
              <Input
                id="order"
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                placeholder="0"
              />
              <p className="mt-1 text-xs text-text-muted">
                Lower numbers appear first
              </p>
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' })}
                className="flex h-10 w-full rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm px-3 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solar/50 focus-visible:border-solar/40"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between sticky bottom-6 bg-obsidian/95 backdrop-blur-sm p-4 rounded-sm border border-white/[0.08]">
          <div>
            {isEditing && (
              <Button
                type="button"
                variant="ghost"
                onClick={handleDelete}
                disabled={deleting}
                className="text-alert hover:bg-alert/10"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                {deleting ? 'Deleting...' : 'Delete'}
              </Button>
            )}
          </div>
          <div className="flex gap-3">
            <Link href="/admin/team">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={loading} className="bg-gradient-to-r from-solar to-hydrogen">
              <Save className="mr-2 h-4 w-4" />
              {loading ? 'Saving...' : isEditing ? 'Update' : 'Create'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
