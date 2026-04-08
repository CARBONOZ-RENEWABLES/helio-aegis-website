'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Label } from '@/components/ui/form-elements';
import { Save, Plus, Trash2, GripVertical, Eye } from 'lucide-react';
import ImageUpload from './ImageUpload';

export default function NavigationEditorForm({ navigation }: { navigation: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    logo: navigation.logo || { imageUrl: '/images/heliosngrlogo.png', altText: 'Helios NRG' },
    siteTitle: navigation.siteTitle || 'Helios NRG',
    primary: navigation.primary || [],
    utilityRight: navigation.utilityRight || []
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/navigation', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Navigation updated successfully!');
        router.refresh();
      } else {
        alert('Failed to update navigation');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addPrimaryLink = () => {
    setFormData({
      ...formData,
      primary: [...formData.primary, { label: '', href: '', order: formData.primary.length + 1 }]
    });
  };

  const removePrimaryLink = (index: number) => {
    setFormData({
      ...formData,
      primary: formData.primary.filter((_: any, i: number) => i !== index)
    });
  };

  const updatePrimaryLink = (index: number, field: string, value: string) => {
    const updated = [...formData.primary];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, primary: updated });
  };

  const addUtilityButton = () => {
    setFormData({
      ...formData,
      utilityRight: [...formData.utilityRight, { label: '', href: '', variant: 'ghost' }]
    });
  };

  const removeUtilityButton = (index: number) => {
    setFormData({
      ...formData,
      utilityRight: formData.utilityRight.filter((_: any, i: number) => i !== index)
    });
  };

  const updateUtilityButton = (index: number, field: string, value: string) => {
    const updated = [...formData.utilityRight];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, utilityRight: updated });
  };

  return (
    <div className="max-w-5xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary font-display">Navigation Editor</h1>
          <p className="mt-2 text-text-secondary">Manage site navigation links and buttons</p>
        </div>
        <a href="/" target="_blank" rel="noopener noreferrer">
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
        </a>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Logo & Site Title */}
        <div className="rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-text-primary font-display">Logo & Site Title</h2>
            <p className="text-sm text-text-muted mt-1">Manage your site logo and title</p>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Logo Image</Label>
              <ImageUpload
                value={formData.logo.imageUrl}
                onChange={(url) => setFormData({ ...formData, logo: { ...formData.logo, imageUrl: url } })}
              />
            </div>
            <div>
              <Label>Logo Alt Text</Label>
              <Input
                value={formData.logo.altText}
                onChange={(e) => setFormData({ ...formData, logo: { ...formData.logo, altText: e.target.value } })}
                placeholder="Helios NRG"
              />
            </div>
            <div>
              <Label>Site Title</Label>
              <Input
                value={formData.siteTitle}
                onChange={(e) => setFormData({ ...formData, siteTitle: e.target.value })}
                placeholder="Helios NRG"
              />
            </div>
          </div>
        </div>

        {/* Primary Navigation Links */}
        <div className="rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-text-primary font-display">Primary Navigation</h2>
              <p className="text-sm text-text-muted mt-1">Main navigation links in the header</p>
            </div>
            <Button type="button" onClick={addPrimaryLink} variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Link
            </Button>
          </div>

          <div className="space-y-4">
            {formData.primary.map((link: any, index: number) => (
              <div key={index} className="flex gap-3 items-start p-4 rounded-sm bg-white/5 border border-white/[0.08]">
                <div className="flex items-center justify-center w-8 h-10 text-text-muted cursor-move">
                  <GripVertical className="h-5 w-5" />
                </div>
                <div className="flex-1 grid grid-cols-2 gap-3">
                  <div>
                    <Label>Label</Label>
                    <Input
                      value={link.label}
                      onChange={(e) => updatePrimaryLink(index, 'label', e.target.value)}
                      placeholder="About"
                    />
                  </div>
                  <div>
                    <Label>Link (href)</Label>
                    <Input
                      value={link.href}
                      onChange={(e) => updatePrimaryLink(index, 'href', e.target.value)}
                      placeholder="/about"
                    />
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removePrimaryLink(index)}
                  className="text-alert hover:bg-alert/10 mt-6"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {formData.primary.length === 0 && (
              <div className="text-center py-8 text-text-muted">
                No navigation links yet. Click &quot;Add Link&quot; to create one.
              </div>
            )}
          </div>
        </div>

        {/* Utility Buttons */}
        <div className="rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-text-primary font-display">Utility Buttons</h2>
              <p className="text-sm text-text-muted mt-1">Action buttons on the right side of navigation</p>
            </div>
            <Button type="button" onClick={addUtilityButton} variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Button
            </Button>
          </div>

          <div className="space-y-4">
            {formData.utilityRight.map((button: any, index: number) => (
              <div key={index} className="flex gap-3 items-start p-4 rounded-sm bg-white/5 border border-white/[0.08]">
                <div className="flex-1 grid grid-cols-3 gap-3">
                  <div>
                    <Label>Label</Label>
                    <Input
                      value={button.label}
                      onChange={(e) => updateUtilityButton(index, 'label', e.target.value)}
                      placeholder="Login"
                    />
                  </div>
                  <div>
                    <Label>Link (href)</Label>
                    <Input
                      value={button.href}
                      onChange={(e) => updateUtilityButton(index, 'href', e.target.value)}
                      placeholder="/admin/login"
                    />
                  </div>
                  <div>
                    <Label>Style</Label>
                    <select
                      value={button.variant}
                      onChange={(e) => updateUtilityButton(index, 'variant', e.target.value)}
                      className="flex h-10 w-full rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm px-3 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solar/50 focus-visible:border-solar/40"
                    >
                      <option value="ghost">Ghost (Outline)</option>
                      <option value="primary">Primary (Filled)</option>
                    </select>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeUtilityButton(index)}
                  className="text-alert hover:bg-alert/10 mt-6"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {formData.utilityRight.length === 0 && (
              <div className="text-center py-8 text-text-muted">
                No utility buttons yet. Click &quot;Add Button&quot; to create one.
              </div>
            )}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-end gap-3 sticky bottom-6 bg-obsidian/95 backdrop-blur-sm p-4 rounded-sm border border-white/[0.08]">
          <Button type="submit" disabled={loading} className="bg-gradient-to-r from-solar to-hydrogen">
            <Save className="mr-2 h-4 w-4" />
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}
