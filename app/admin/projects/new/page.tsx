'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Label, Textarea } from '@/components/ui/form-elements';
import { DesignLockBanner } from '@/components/admin/AdminLayout';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import ImageUpload from '@/components/admin/ImageUpload';

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    shortDescription: '',
    technology: 'solar',
    capacityMW: '',
    city: '',
    country: '',
    region: 'americas',
    heroImage: '',
    publishNow: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
          basicInfo: {
            name: formData.name,
            shortDescription: formData.shortDescription,
            fullDescription: '',
            status: 'development',
            technology: formData.technology,
            capacityMW: parseFloat(formData.capacityMW) || 0,
            location: {
              city: formData.city,
              country: formData.country,
              region: formData.region,
              latitude: 0,
              longitude: 0,
            },
            codDate: '',
            featured: false,
            order: 0,
          },
          media: {
            heroImage: formData.heroImage,
            galleryImages: [],
            altText: formData.name,
          },
          technicalSpecs: {
            additionalSpecs: [],
          },
          financialHighlights: {
            additionalDetails: [],
          },
          timeline: [],
          teamInvolved: [],
          seo: {
            metaTitle: formData.name,
            metaDescription: formData.shortDescription,
            ogImage: '',
          },
          status: formData.publishNow ? 'published' : 'draft',
        }),
      });

      if (response.ok) {
        const { data } = await response.json();
        router.push(`/admin/projects/${data._id}`);
      } else {
        alert('Failed to create project');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>
        <h1 className="text-3xl font-bold text-text-primary">New Project</h1>
        <p className="mt-2 text-text-secondary">Create a new portfolio project</p>
      </div>

      <DesignLockBanner />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Project Image</h2>
          <ImageUpload
            value={formData.heroImage}
            onChange={(url) => setFormData({ ...formData, heroImage: url })}
            label="Hero Image (1200x600px recommended)"
          />
        </div>

        <div className="rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Basic Information</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Project Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Atlas Solar Farm"
                required
              />
            </div>

            <div>
              <Label htmlFor="slug">URL Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="auto-generated from name"
              />
              <p className="mt-1 text-xs text-text-muted">
                Leave empty to auto-generate from project name
              </p>
            </div>

            <div>
              <Label htmlFor="shortDescription">Short Description *</Label>
              <Textarea
                id="shortDescription"
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                placeholder="Brief description (max 160 characters)"
                maxLength={160}
                rows={3}
                required
              />
              <p className="mt-1 text-xs text-text-muted">
                {formData.shortDescription.length}/160 characters
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="technology">Technology *</Label>
                <select
                  id="technology"
                  value={formData.technology}
                  onChange={(e) => setFormData({ ...formData, technology: e.target.value })}
                  className="flex h-10 w-full rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm px-3 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solar/50 focus-visible:border-solar/40"
                  required
                >
                  <option value="solar">Solar</option>
                  <option value="wind">Wind</option>
                  <option value="storage">Storage</option>
                  <option value="hydrogen">Hydrogen</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <Label htmlFor="capacityMW">Capacity (MW) *</Label>
                <Input
                  id="capacityMW"
                  type="number"
                  step="0.1"
                  value={formData.capacityMW}
                  onChange={(e) => setFormData({ ...formData, capacityMW: e.target.value })}
                  placeholder="e.g., 150"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="e.g., Phoenix"
                  required
                />
              </div>

              <div>
                <Label htmlFor="country">Country *</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder="e.g., USA"
                  required
                />
              </div>

              <div>
                <Label htmlFor="region">Region *</Label>
                <select
                  id="region"
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="flex h-10 w-full rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm px-3 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solar/50 focus-visible:border-solar/40"
                  required
                >
                  <option value="americas">Americas</option>
                  <option value="emea">EMEA</option>
                  <option value="apac">APAC</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="publishNow"
              checked={formData.publishNow}
              onChange={(e) => setFormData({ ...formData, publishNow: e.target.checked })}
              className="h-4 w-4 rounded border-white/[0.08] bg-obsidian/50 text-solar focus:ring-solar"
            />
            <Label htmlFor="publishNow" className="cursor-pointer text-text-secondary">
              Publish immediately (make visible on website)
            </Label>
          </div>
          <div className="flex items-center gap-3">
          <Link href="/admin/projects">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={loading}>
            <Save className="mr-2 h-4 w-4" />
            {loading ? 'Creating...' : 'Create Project'}
          </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
