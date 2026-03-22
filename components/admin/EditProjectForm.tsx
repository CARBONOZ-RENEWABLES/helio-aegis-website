'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Label, Textarea } from '@/components/ui/form-elements';
import { DesignLockBanner, StatusBadge } from '@/components/admin/AdminLayout';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import Link from 'next/link';
import ImageUpload from '@/components/admin/ImageUpload';

export default function EditProjectForm({ project }: { project: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: project.basicInfo?.name || '',
    slug: project.slug || '',
    shortDescription: project.basicInfo?.shortDescription || '',
    fullDescription: project.basicInfo?.fullDescription || '',
    technology: project.basicInfo?.technology || 'solar',
    capacityMW: project.basicInfo?.capacityMW || '',
    city: project.basicInfo?.location?.city || '',
    country: project.basicInfo?.location?.country || '',
    region: project.basicInfo?.location?.region || 'americas',
    status: project.basicInfo?.status || 'development',
    featured: project.basicInfo?.featured || false,
    heroImage: project.media?.heroImage || '',
    codDate: project.basicInfo?.codDate || '',
    annualGenerationMWh: project.technicalSpecs?.annualGenerationMWh || '',
    homesPowered: project.technicalSpecs?.homesPowered || '',
    co2AvoidedTonnes: project.technicalSpecs?.co2AvoidedTonnes || '',
    totalProjectCost: project.financialHighlights?.totalProjectCost || '',
    debtProvider: project.financialHighlights?.debtProvider || '',
    equityPartners: project.financialHighlights?.equityPartners || '',
    ppaTerm: project.financialHighlights?.ppaTerm || '',
    offtaker: project.financialHighlights?.offtaker || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/admin/projects/${project._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...project,
          slug: formData.slug,
          basicInfo: {
            ...project.basicInfo,
            name: formData.name,
            shortDescription: formData.shortDescription,
            fullDescription: formData.fullDescription,
            status: formData.status,
            technology: formData.technology,
            capacityMW: parseFloat(formData.capacityMW as any) || 0,
            location: {
              ...project.basicInfo.location,
              city: formData.city,
              country: formData.country,
              region: formData.region,
            },
            codDate: formData.codDate,
            featured: formData.featured,
          },
          media: {
            ...project.media,
            heroImage: formData.heroImage,
            altText: formData.name,
          },
          technicalSpecs: {
            ...project.technicalSpecs,
            annualGenerationMWh: parseFloat(formData.annualGenerationMWh as any) || undefined,
            homesPowered: parseInt(formData.homesPowered as any) || undefined,
            co2AvoidedTonnes: parseFloat(formData.co2AvoidedTonnes as any) || undefined,
          },
          financialHighlights: {
            ...project.financialHighlights,
            totalProjectCost: formData.totalProjectCost,
            debtProvider: formData.debtProvider,
            equityPartners: formData.equityPartners,
            ppaTerm: formData.ppaTerm,
            offtaker: formData.offtaker,
          },
        }),
      });

      if (response.ok) {
        alert('Project updated successfully!');
        router.refresh();
      } else {
        alert('Failed to update project');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await fetch(`/api/admin/projects/${project._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/admin/projects');
      } else {
        alert('Failed to delete project');
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
          href="/admin/projects"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Edit Project</h1>
            <p className="mt-2 text-text-secondary">{formData.name}</p>
          </div>
          <StatusBadge status={project.status} />
        </div>
      </div>

      <DesignLockBanner />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Project Image</h2>
          <ImageUpload
            value={formData.heroImage}
            onChange={(url) => setFormData({ ...formData, heroImage: url })}
            label="Hero Image (1200x600px recommended)"
          />
        </div>

        <div className="rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Basic Information</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Project Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
              <Label htmlFor="shortDescription">Short Description *</Label>
              <Textarea
                id="shortDescription"
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                maxLength={160}
                rows={3}
                required
              />
              <p className="mt-1 text-xs text-slate-500">
                {formData.shortDescription.length}/160 characters
              </p>
            </div>

            <div>
              <Label htmlFor="fullDescription">Full Description</Label>
              <Textarea
                id="fullDescription"
                value={formData.fullDescription}
                onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                rows={6}
                placeholder="Detailed project description..."
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
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
                <Label htmlFor="status">Project Status *</Label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="flex h-10 w-full rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm px-3 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solar/50 focus-visible:border-solar/40"
                  required
                >
                  <option value="operational">Operational</option>
                  <option value="construction">Construction</option>
                  <option value="development">Development</option>
                  <option value="pipeline">Pipeline</option>
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
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="codDate">Commercial Operation Date (COD)</Label>
              <Input
                id="codDate"
                value={formData.codDate}
                onChange={(e) => setFormData({ ...formData, codDate: e.target.value })}
                placeholder="e.g., Q3 2023"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="country">Country *</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
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

        <div className="rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Technical Specifications</h2>
          <p className="text-sm text-text-muted mb-4">Key metrics displayed on project detail page</p>
          
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="annualGenerationMWh">Annual Generation (MWh)</Label>
                <Input
                  id="annualGenerationMWh"
                  type="number"
                  step="0.1"
                  value={formData.annualGenerationMWh}
                  onChange={(e) => setFormData({ ...formData, annualGenerationMWh: e.target.value })}
                  placeholder="e.g., 450000"
                />
                <p className="mt-1 text-xs text-text-muted">Yearly energy production</p>
              </div>

              <div>
                <Label htmlFor="homesPowered">Homes Powered</Label>
                <Input
                  id="homesPowered"
                  type="number"
                  value={formData.homesPowered}
                  onChange={(e) => setFormData({ ...formData, homesPowered: e.target.value })}
                  placeholder="e.g., 45000"
                />
                <p className="mt-1 text-xs text-text-muted">Number of homes served</p>
              </div>

              <div>
                <Label htmlFor="co2AvoidedTonnes">CO2 Avoided (Tonnes/year)</Label>
                <Input
                  id="co2AvoidedTonnes"
                  type="number"
                  step="0.1"
                  value={formData.co2AvoidedTonnes}
                  onChange={(e) => setFormData({ ...formData, co2AvoidedTonnes: e.target.value })}
                  placeholder="e.g., 350000"
                />
                <p className="mt-1 text-xs text-text-muted">Annual carbon offset</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Financial Highlights</h2>
          <p className="text-sm text-text-muted mb-4">Investment and partnership details</p>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="totalProjectCost">Total Project Cost</Label>
                <Input
                  id="totalProjectCost"
                  value={formData.totalProjectCost}
                  onChange={(e) => setFormData({ ...formData, totalProjectCost: e.target.value })}
                  placeholder="e.g., $180M"
                />
              </div>

              <div>
                <Label htmlFor="ppaTerm">PPA Term</Label>
                <Input
                  id="ppaTerm"
                  value={formData.ppaTerm}
                  onChange={(e) => setFormData({ ...formData, ppaTerm: e.target.value })}
                  placeholder="e.g., 20 years"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="debtProvider">Debt Provider</Label>
              <Input
                id="debtProvider"
                value={formData.debtProvider}
                onChange={(e) => setFormData({ ...formData, debtProvider: e.target.value })}
                placeholder="e.g., Goldman Sachs"
              />
            </div>

            <div>
              <Label htmlFor="equityPartners">Equity Partners</Label>
              <Input
                id="equityPartners"
                value={formData.equityPartners}
                onChange={(e) => setFormData({ ...formData, equityPartners: e.target.value })}
                placeholder="e.g., NextEra Energy, Brookfield"
              />
            </div>

            <div>
              <Label htmlFor="offtaker">Offtaker</Label>
              <Input
                id="offtaker"
                value={formData.offtaker}
                onChange={(e) => setFormData({ ...formData, offtaker: e.target.value })}
                placeholder="e.g., Southern California Edison"
              />
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
            Delete Project
          </Button>

          <div className="flex items-center gap-3">
            <Link href="/admin/projects">
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
