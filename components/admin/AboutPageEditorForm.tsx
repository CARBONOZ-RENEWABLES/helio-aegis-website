'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Label, Textarea } from '@/components/ui/form-elements';
import { Save, Eye } from 'lucide-react';

export default function AboutPageEditorForm({ aboutPage }: { aboutPage: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Hero
    eyebrowText: aboutPage.hero?.eyebrowText || '',
    headlineLine1: aboutPage.hero?.headlineLine1 || '',
    headlineLine2: aboutPage.hero?.headlineLine2 || '',
    subheadline: aboutPage.hero?.subheadline || '',
    
    // Stats
    stats: aboutPage.stats || [],
    
    // Story
    storyHeadline: aboutPage.story?.headline || '',
    storyParagraphs: aboutPage.story?.paragraphs || [''],
    
    // Mission
    missionHeadline: aboutPage.mission?.headline || '',
    missionText: aboutPage.mission?.text || '',
    
    // Values
    valuesHeadline: aboutPage.values?.headline || '',
    valuesItems: aboutPage.values?.items || [''],
    
    // Offices
    offices: aboutPage.offices || [],
    
    // ESG
    esgHeadline: aboutPage.esg?.headline || '',
    esgSubheadline: aboutPage.esg?.subheadline || '',
    esgSections: aboutPage.esg?.sections || []
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/about-page', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hero: {
            eyebrowText: formData.eyebrowText,
            headlineLine1: formData.headlineLine1,
            headlineLine2: formData.headlineLine2,
            subheadline: formData.subheadline
          },
          stats: formData.stats,
          story: {
            headline: formData.storyHeadline,
            paragraphs: formData.storyParagraphs.filter((p: string) => p.trim() !== '')
          },
          mission: {
            headline: formData.missionHeadline,
            text: formData.missionText
          },
          values: {
            headline: formData.valuesHeadline,
            items: formData.valuesItems.filter((i: string) => i.trim() !== '')
          },
          offices: formData.offices,
          esg: {
            headline: formData.esgHeadline,
            subheadline: formData.esgSubheadline,
            sections: formData.esgSections
          },
          status: 'published'
        })
      });

      if (response.ok) {
        alert('About page updated successfully!');
        router.refresh();
      } else {
        alert('Failed to update about page');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary font-display">About Page Editor</h1>
          <p className="mt-2 text-text-secondary">Manage all about page content (Team managed separately)</p>
        </div>
        <a href="/about" target="_blank" rel="noopener noreferrer">
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
        </a>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Hero Section */}
        <div className="rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-text-primary mb-6 font-display">Hero Section</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="eyebrowText">Eyebrow Text</Label>
              <Input
                id="eyebrowText"
                value={formData.eyebrowText}
                onChange={(e) => setFormData({ ...formData, eyebrowText: e.target.value })}
                placeholder="About Helio Aegis"
              />
            </div>
            <div>
              <Label htmlFor="headlineLine1">Headline Line 1</Label>
              <Input
                id="headlineLine1"
                value={formData.headlineLine1}
                onChange={(e) => setFormData({ ...formData, headlineLine1: e.target.value })}
                placeholder="Structuring the"
              />
            </div>
            <div>
              <Label htmlFor="headlineLine2">Headline Line 2 (Gradient)</Label>
              <Input
                id="headlineLine2"
                value={formData.headlineLine2}
                onChange={(e) => setFormData({ ...formData, headlineLine2: e.target.value })}
                placeholder="Clean Energy Future"
              />
            </div>
            <div>
              <Label htmlFor="subheadline">Subheadline</Label>
              <Textarea
                id="subheadline"
                value={formData.subheadline}
                onChange={(e) => setFormData({ ...formData, subheadline: e.target.value })}
                rows={3}
                placeholder="Since 2012, Helio Aegis has been..."
              />
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-text-primary mb-6 font-display">Stats Strip</h2>
          
          <div className="space-y-4">
            {formData.stats.map((stat: any, idx: number) => (
              <div key={idx} className="p-4 rounded-sm bg-white/5 border border-white/[0.08]">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-semibold">Stat {idx + 1}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setFormData({
                      ...formData,
                      stats: formData.stats.filter((_: any, i: number) => i !== idx)
                    })}
                    className="text-alert"
                  >
                    Remove
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Label</Label>
                    <Input
                      value={stat.label}
                      onChange={(e) => {
                        const updated = [...formData.stats];
                        updated[idx] = { ...updated[idx], label: e.target.value };
                        setFormData({ ...formData, stats: updated });
                      }}
                      placeholder="Years Active"
                    />
                  </div>
                  <div>
                    <Label>Value</Label>
                    <Input
                      value={stat.value}
                      onChange={(e) => {
                        const updated = [...formData.stats];
                        updated[idx] = { ...updated[idx], value: e.target.value };
                        setFormData({ ...formData, stats: updated });
                      }}
                      placeholder="13+"
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => setFormData({
                ...formData,
                stats: [...formData.stats, { label: '', value: '', order: formData.stats.length + 1 }]
              })}
            >
              + Add Stat
            </Button>
          </div>
        </div>

        {/* Story Section */}
        <div className="rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-text-primary mb-6 font-display">Our Story</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="storyHeadline">Headline</Label>
              <Input
                id="storyHeadline"
                value={formData.storyHeadline}
                onChange={(e) => setFormData({ ...formData, storyHeadline: e.target.value })}
                placeholder="Our Story"
              />
            </div>
            <div>
              <Label className="mb-3 block">Paragraphs</Label>
              <div className="space-y-3">
                {formData.storyParagraphs.map((para: string, idx: number) => (
                  <div key={idx} className="flex gap-2">
                    <Textarea
                      value={para}
                      onChange={(e) => {
                        const updated = [...formData.storyParagraphs];
                        updated[idx] = e.target.value;
                        setFormData({ ...formData, storyParagraphs: updated });
                      }}
                      rows={3}
                      placeholder="Paragraph text..."
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setFormData({
                        ...formData,
                        storyParagraphs: formData.storyParagraphs.filter((_: string, i: number) => i !== idx)
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
                    storyParagraphs: [...formData.storyParagraphs, '']
                  })}
                >
                  + Add Paragraph
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Values */}
        <div className="rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-text-primary mb-6 font-display">Mission & Values</h2>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-text-primary">Mission</h3>
              <div>
                <Label htmlFor="missionHeadline">Headline</Label>
                <Input
                  id="missionHeadline"
                  value={formData.missionHeadline}
                  onChange={(e) => setFormData({ ...formData, missionHeadline: e.target.value })}
                  placeholder="Our Mission"
                />
              </div>
              <div>
                <Label htmlFor="missionText">Text</Label>
                <Textarea
                  id="missionText"
                  value={formData.missionText}
                  onChange={(e) => setFormData({ ...formData, missionText: e.target.value })}
                  rows={3}
                  placeholder="To accelerate the global energy transition..."
                />
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-white/[0.08]">
              <h3 className="text-lg font-semibold text-text-primary">Core Values</h3>
              <div>
                <Label htmlFor="valuesHeadline">Headline</Label>
                <Input
                  id="valuesHeadline"
                  value={formData.valuesHeadline}
                  onChange={(e) => setFormData({ ...formData, valuesHeadline: e.target.value })}
                  placeholder="Core Values"
                />
              </div>
              <div>
                <Label className="mb-3 block">Values List</Label>
                <div className="space-y-2">
                  {formData.valuesItems.map((item: string, idx: number) => (
                    <div key={idx} className="flex gap-2">
                      <Input
                        value={item}
                        onChange={(e) => {
                          const updated = [...formData.valuesItems];
                          updated[idx] = e.target.value;
                          setFormData({ ...formData, valuesItems: updated });
                        }}
                        placeholder="Value item..."
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setFormData({
                          ...formData,
                          valuesItems: formData.valuesItems.filter((_: string, i: number) => i !== idx)
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
                      valuesItems: [...formData.valuesItems, '']
                    })}
                  >
                    + Add Value
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Offices */}
        <div className="rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-text-primary mb-6 font-display">Global Offices</h2>
          
          <div className="space-y-4">
            {formData.offices.map((office: any, idx: number) => (
              <div key={idx} className="p-4 rounded-sm bg-white/5 border border-white/[0.08] space-y-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold">Office {idx + 1}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setFormData({
                      ...formData,
                      offices: formData.offices.filter((_: any, i: number) => i !== idx)
                    })}
                    className="text-alert"
                  >
                    Remove
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Region</Label>
                    <Input
                      value={office.region}
                      onChange={(e) => {
                        const updated = [...formData.offices];
                        updated[idx] = { ...updated[idx], region: e.target.value };
                        setFormData({ ...formData, offices: updated });
                      }}
                      placeholder="North America"
                    />
                  </div>
                  <div>
                    <Label>Office</Label>
                    <Input
                      value={office.office}
                      onChange={(e) => {
                        const updated = [...formData.offices];
                        updated[idx] = { ...updated[idx], office: e.target.value };
                        setFormData({ ...formData, offices: updated });
                      }}
                      placeholder="New York, USA"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Team</Label>
                    <Input
                      value={office.team}
                      onChange={(e) => {
                        const updated = [...formData.offices];
                        updated[idx] = { ...updated[idx], team: e.target.value };
                        setFormData({ ...formData, offices: updated });
                      }}
                      placeholder="45+ professionals"
                    />
                  </div>
                  <div>
                    <Label>Focus Areas</Label>
                    <Input
                      value={office.focus}
                      onChange={(e) => {
                        const updated = [...formData.offices];
                        updated[idx] = { ...updated[idx], focus: e.target.value };
                        setFormData({ ...formData, offices: updated });
                      }}
                      placeholder="Solar, Wind, Storage"
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => setFormData({
                ...formData,
                offices: [...formData.offices, { region: '', office: '', team: '', focus: '', order: formData.offices.length + 1 }]
              })}
            >
              + Add Office
            </Button>
          </div>
        </div>

        {/* ESG Section */}
        <div className="rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-text-primary mb-6 font-display">ESG & Climate Commitment</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="esgHeadline">Headline</Label>
              <Input
                id="esgHeadline"
                value={formData.esgHeadline}
                onChange={(e) => setFormData({ ...formData, esgHeadline: e.target.value })}
                placeholder="ESG & Climate Commitment"
              />
            </div>
            <div>
              <Label htmlFor="esgSubheadline">Subheadline</Label>
              <Textarea
                id="esgSubheadline"
                value={formData.esgSubheadline}
                onChange={(e) => setFormData({ ...formData, esgSubheadline: e.target.value })}
                rows={2}
                placeholder="We are committed to advancing..."
              />
            </div>

            <div className="pt-4 border-t border-white/[0.08]">
              <Label className="mb-3 block">ESG Sections</Label>
              <div className="space-y-4">
                {formData.esgSections.map((section: any, idx: number) => (
                  <div key={idx} className="p-4 rounded-sm bg-white/5 border border-white/[0.08] space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold">Section {idx + 1}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setFormData({
                          ...formData,
                          esgSections: formData.esgSections.filter((_: any, i: number) => i !== idx)
                        })}
                        className="text-alert"
                      >
                        Remove
                      </Button>
                    </div>
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={section.title}
                        onChange={(e) => {
                          const updated = [...formData.esgSections];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          setFormData({ ...formData, esgSections: updated });
                        }}
                        placeholder="Climate Impact"
                      />
                    </div>
                    <div>
                      <Label className="mb-2 block">Metrics</Label>
                      <div className="space-y-2">
                        {(section.metrics || []).map((metric: any, mIdx: number) => (
                          <div key={mIdx} className="flex gap-2">
                            <Input
                              value={metric.label}
                              onChange={(e) => {
                                const updated = [...formData.esgSections];
                                updated[idx].metrics[mIdx] = { ...updated[idx].metrics[mIdx], label: e.target.value };
                                setFormData({ ...formData, esgSections: updated });
                              }}
                              placeholder="CO2 Avoided (Annual)"
                            />
                            <Input
                              value={metric.value}
                              onChange={(e) => {
                                const updated = [...formData.esgSections];
                                updated[idx].metrics[mIdx] = { ...updated[idx].metrics[mIdx], value: e.target.value };
                                setFormData({ ...formData, esgSections: updated });
                              }}
                              placeholder="2.8M tonnes"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const updated = [...formData.esgSections];
                                updated[idx].metrics = updated[idx].metrics.filter((_: any, i: number) => i !== mIdx);
                                setFormData({ ...formData, esgSections: updated });
                              }}
                              className="text-alert"
                            >
                              ×
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const updated = [...formData.esgSections];
                            if (!updated[idx].metrics) updated[idx].metrics = [];
                            updated[idx].metrics.push({ label: '', value: '' });
                            setFormData({ ...formData, esgSections: updated });
                          }}
                        >
                          + Add Metric
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setFormData({
                    ...formData,
                    esgSections: [...formData.esgSections, { title: '', metrics: [] }]
                  })}
                >
                  + Add ESG Section
                </Button>
              </div>
            </div>
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
