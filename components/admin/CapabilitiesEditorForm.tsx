'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CapabilitiesEditorForm({ data }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    sectionTitle: data.sectionTitle || '',
    sectionDescription: data.sectionDescription || '',
    capabilities: data.capabilities || []
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/capabilities', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      alert('Capabilities updated successfully!');
      router.refresh();
    } else {
      alert('Failed to update capabilities');
    }
    setLoading(false);
  };

  const addCapability = () => {
    setFormData({
      ...formData,
      capabilities: [...formData.capabilities, { title: '', icon: '', description: '', href: '', order: formData.capabilities.length }]
    });
  };

  const removeCapability = (index: number) => {
    setFormData({
      ...formData,
      capabilities: formData.capabilities.filter((_: any, i: number) => i !== index)
    });
  };

  const updateCapability = (index: number, field: string, value: string) => {
    const updated = [...formData.capabilities];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, capabilities: updated });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="card p-6 space-y-4">
        <h2 className="text-xl font-display">Section Content</h2>
        
        <div>
          <label className="block text-sm font-semibold mb-2">Section Title</label>
          <textarea
            value={formData.sectionTitle}
            onChange={(e) => setFormData({ ...formData, sectionTitle: e.target.value })}
            className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded text-text-primary"
            rows={2}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Section Description</label>
          <textarea
            value={formData.sectionDescription}
            onChange={(e) => setFormData({ ...formData, sectionDescription: e.target.value })}
            className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded text-text-primary"
            rows={3}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-display">Capabilities</h2>
          <button type="button" onClick={addCapability} className="btn-primary text-sm">
            + Add Capability
          </button>
        </div>

        {formData.capabilities.map((cap: any, index: number) => (
          <div key={index} className="card p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Capability {index + 1}</h3>
              <button type="button" onClick={() => removeCapability(index)} className="text-alert hover:text-alert/80">
                Remove
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Title</label>
                <input
                  type="text"
                  value={cap.title}
                  onChange={(e) => updateCapability(index, 'title', e.target.value)}
                  className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded text-text-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Icon (emoji)</label>
                <input
                  type="text"
                  value={cap.icon}
                  onChange={(e) => updateCapability(index, 'icon', e.target.value)}
                  className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded text-text-primary"
                  placeholder="📋"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Description</label>
              <textarea
                value={cap.description}
                onChange={(e) => updateCapability(index, 'description', e.target.value)}
                className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded text-text-primary"
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Link URL</label>
              <input
                type="text"
                value={cap.href}
                onChange={(e) => updateCapability(index, 'href', e.target.value)}
                className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded text-text-primary"
                placeholder="/capabilities/project-development"
              />
            </div>
          </div>
        ))}
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
}
