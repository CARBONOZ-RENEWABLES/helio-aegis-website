'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MetricsEditorForm({ data }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    sectionTitle: data.sectionTitle || '',
    sectionSubtitle: data.sectionSubtitle || '',
    metrics: data.metrics || []
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/metrics', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      alert('Metrics updated successfully!');
      router.refresh();
    } else {
      alert('Failed to update metrics');
    }
    setLoading(false);
  };

  const addMetric = () => {
    setFormData({
      ...formData,
      metrics: [...formData.metrics, { value: 0, prefix: '', suffix: '', label: '', order: formData.metrics.length }]
    });
  };

  const removeMetric = (index: number) => {
    setFormData({
      ...formData,
      metrics: formData.metrics.filter((_: any, i: number) => i !== index)
    });
  };

  const updateMetric = (index: number, field: string, value: any) => {
    const updated = [...formData.metrics];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, metrics: updated });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="card p-6 space-y-4">
        <h2 className="text-xl font-display">Section Content</h2>
        
        <div>
          <label className="block text-sm font-semibold mb-2">Section Title</label>
          <input
            type="text"
            value={formData.sectionTitle}
            onChange={(e) => setFormData({ ...formData, sectionTitle: e.target.value })}
            className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded text-text-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Section Subtitle</label>
          <input
            type="text"
            value={formData.sectionSubtitle}
            onChange={(e) => setFormData({ ...formData, sectionSubtitle: e.target.value })}
            className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded text-text-primary"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-display">Metrics</h2>
          <button type="button" onClick={addMetric} className="btn-primary text-sm">
            + Add Metric
          </button>
        </div>

        {formData.metrics.map((metric: any, index: number) => (
          <div key={index} className="card p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Metric {index + 1}</h3>
              <button type="button" onClick={() => removeMetric(index)} className="text-alert hover:text-alert/80">
                Remove
              </button>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Value</label>
                <input
                  type="number"
                  step="0.1"
                  value={metric.value}
                  onChange={(e) => updateMetric(index, 'value', parseFloat(e.target.value))}
                  className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded text-text-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Prefix</label>
                <input
                  type="text"
                  value={metric.prefix}
                  onChange={(e) => updateMetric(index, 'prefix', e.target.value)}
                  className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded text-text-primary"
                  placeholder="$"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Suffix</label>
                <input
                  type="text"
                  value={metric.suffix}
                  onChange={(e) => updateMetric(index, 'suffix', e.target.value)}
                  className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded text-text-primary"
                  placeholder="B, M, %, +"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Label</label>
                <input
                  type="text"
                  value={metric.label}
                  onChange={(e) => updateMetric(index, 'label', e.target.value)}
                  className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded text-text-primary"
                  placeholder="Capital Deployed"
                />
              </div>
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
