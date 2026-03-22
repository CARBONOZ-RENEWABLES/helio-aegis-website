'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Label, Textarea } from '@/components/ui/form-elements';
import { DesignLockBanner, StatusBadge } from '@/components/admin/AdminLayout';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import Link from 'next/link';
import ImageUpload from '@/components/admin/ImageUpload';

export default function EditInsightForm({ insight }: { insight: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: insight.title || '',
    slug: insight.slug || '',
    excerpt: insight.excerpt || '',
    content: insight.content || '',
    type: insight.type || 'Research',
    category: insight.category || 'Market Analysis',
    featuredImage: insight.featuredImage || '',
    author: insight.author || '',
    authorRole: insight.authorRole || '',
    readTime: insight.readTime || '',
    featured: insight.featured || false,
    keyTakeaways: insight.keyTakeaways?.join('\n') || '',
    status: insight.status || 'draft',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/admin/insights/${insight._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: formData.slug,
          type: formData.type,
          category: formData.category,
          title: formData.title,
          excerpt: formData.excerpt,
          content: formData.content,
          featuredImage: formData.featuredImage,
          author: formData.author,
          authorRole: formData.authorRole,
          readTime: formData.readTime,
          featured: formData.featured,
          keyTakeaways: formData.keyTakeaways.split('\n').filter((t: string) => t.trim()),
          status: formData.status,
        }),
      });

      if (response.ok) {
        alert('Insight updated successfully!');
        router.refresh();
      } else {
        alert('Failed to update insight');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this insight?')) return;

    try {
      const response = await fetch(`/api/admin/insights/${insight._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/admin/insights');
      } else {
        alert('Failed to delete insight');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <Link
          href="/admin/insights"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Insights
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Edit Insight</h1>
            <p className="mt-2 text-text-secondary">{formData.title}</p>
          </div>
          <StatusBadge status={insight.status} />
        </div>
      </div>

      <DesignLockBanner />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Featured Image</h2>
          <ImageUpload
            value={formData.featuredImage}
            onChange={(url) => setFormData({ ...formData, featuredImage: url })}
            label="Featured Image (1200x600px recommended)"
          />
        </div>

        <div className="rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Basic Information</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="slug">URL Slug *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="excerpt">Excerpt *</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                maxLength={200}
                rows={3}
                required
              />
              <p className="mt-1 text-xs text-text-muted">
                {formData.excerpt.length}/200 characters
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="type">Type *</Label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="flex h-10 w-full rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm px-3 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solar/50 focus-visible:border-solar/40"
                  required
                >
                  <option value="Research">Research</option>
                  <option value="Commentary">Commentary</option>
                  <option value="Report">Report</option>
                </select>
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="flex h-10 w-full rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm px-3 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solar/50 focus-visible:border-solar/40"
                  required
                >
                  <option value="Market Analysis">Market Analysis</option>
                  <option value="Policy">Policy</option>
                  <option value="Technology">Technology</option>
                  <option value="Regional">Regional</option>
                </select>
              </div>

              <div>
                <Label htmlFor="status">Status *</Label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="flex h-10 w-full rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm px-3 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solar/50 focus-visible:border-solar/40"
                  required
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="authorRole">Author Role</Label>
                <Input
                  id="authorRole"
                  value={formData.authorRole}
                  onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="readTime">Read Time</Label>
                <Input
                  id="readTime"
                  value={formData.readTime}
                  onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                  placeholder="e.g., 12 min read"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="content">Content *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={15}
                required
              />
            </div>

            <div>
              <Label htmlFor="keyTakeaways">Key Takeaways (one per line)</Label>
              <Textarea
                id="keyTakeaways"
                value={formData.keyTakeaways}
                onChange={(e) => setFormData({ ...formData, keyTakeaways: e.target.value })}
                placeholder="Enter each takeaway on a new line"
                rows={5}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="h-4 w-4 rounded border-white/[0.08] bg-obsidian/50 text-solar focus:ring-solar"
              />
              <Label htmlFor="featured" className="cursor-pointer">
                Featured on homepage
              </Label>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Insight
          </Button>

          <div className="flex items-center gap-3">
            <Link href="/admin/insights">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={loading}>
              <Save className="mr-2 h-4 w-4" />
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
