'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Label, Textarea } from '@/components/ui/form-elements';
import { DesignLockBanner } from '@/components/admin/AdminLayout';
import { Save, Eye, EyeOff } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

export default function HomepageEditorForm({ homepage }: { homepage: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [formData, setFormData] = useState({
    // Hero Section
    eyebrowText: homepage.hero?.eyebrowText || '',
    headlineLine1: homepage.hero?.headlineLine1 || '',
    headlineLine2: homepage.hero?.headlineLine2 || '',
    subheadline: homepage.hero?.subheadline || '',
    primaryCTALabel: homepage.hero?.primaryCTALabel || '',
    primaryCTAHref: homepage.hero?.primaryCTAHref || '',
    secondaryCTALabel: homepage.hero?.secondaryCTALabel || '',
    secondaryCTAHref: homepage.hero?.secondaryCTAHref || '',
    backgroundType: homepage.hero?.backgroundType || 'gradient',
    backgroundImage: homepage.hero?.backgroundImage || '',
    backgroundVideo: homepage.hero?.backgroundVideo || '',
    overlayOpacity: homepage.hero?.overlayOpacity || 0.7,
    
    // Metrics
    metric1Value: homepage.metrics?.[0]?.value || '',
    metric1Label: homepage.metrics?.[0]?.label || '',
    metric1Suffix: homepage.metrics?.[0]?.suffix || '',
    metric2Value: homepage.metrics?.[1]?.value || '',
    metric2Label: homepage.metrics?.[1]?.label || '',
    metric2Suffix: homepage.metrics?.[1]?.suffix || '',
    metric3Value: homepage.metrics?.[2]?.value || '',
    metric3Label: homepage.metrics?.[2]?.label || '',
    metric3Suffix: homepage.metrics?.[2]?.suffix || '',
    
    // Market Ticker API Key
    marketTickerApiKey: homepage.marketTickerApiKey || '',
    
    // Investment Section
    investmentEyebrow: homepage.investmentSection?.eyebrowText || '',
    investmentHeadline: homepage.investmentSection?.headline || '',
    investmentBody: homepage.investmentSection?.bodyText || '',
    investmentFeatures: homepage.investmentSection?.features || ['Integrated PM + Finance model', 'Proprietary deal sourcing', 'Institutional-grade governance'],
    investmentTabs: homepage.investmentSection?.tabs || [
      { id: 'track-record', label: 'Track Record', title: 'Proven Performance', content: 'Our funds have delivered consistent returns across market cycles.', metrics: [{ label: 'NET IRR RANGE', value: '8-12%' }, { label: 'TVPI RANGE', value: '1.3x - 1.8x' }] },
      { id: 'risk', label: 'Risk Management', title: 'Risk Management', content: 'Comprehensive risk framework.', metrics: [] },
      { id: 'pipeline', label: 'Pipeline', title: 'Pipeline', content: 'Strong deal flow.', metrics: [] },
      { id: 'esg', label: 'ESG', title: 'ESG Leadership', content: 'Aligned with UN SDGs and global climate commitments.', metrics: [{ label: 'CO2 AVOIDED (ANNUAL)', value: '2.8M tonnes' }, { label: 'GRESB RATING', value: '5-Star' }] }
    ],
    
    // Final CTA
    ctaHeadline: homepage.finalCTA?.headline || '',
    ctaSubheadline: homepage.finalCTA?.subheadline || '',
    ctaPrimaryLabel: homepage.finalCTA?.primaryCTALabel || '',
    ctaPrimaryHref: homepage.finalCTA?.primaryCTAHref || '',
    ctaSecondaryLabel: homepage.finalCTA?.secondaryCTALabel || '',
    ctaSecondaryHref: homepage.finalCTA?.secondaryCTAHref || '',
    ctaTrust1: homepage.finalCTA?.trustSignal1 || '',
    ctaTrust2: homepage.finalCTA?.trustSignal2 || '',
    ctaTrust3: homepage.finalCTA?.trustSignal3 || '',
    
    // Partners Section
    partnersHeadline: homepage.partnersSection?.headline || 'Trusted by leading institutions',
    institutions: homepage.partnersSection?.institutions || [
      { shortName: 'GS', fullName: 'Goldman Sachs', logo: '', order: 1 },
      { shortName: 'JPM', fullName: 'JP Morgan', logo: '', order: 2 },
      { shortName: 'WF', fullName: 'Wells Fargo', logo: '', order: 3 },
      { shortName: 'RB', fullName: 'Rabobank', logo: '', order: 4 },
      { shortName: 'ING', fullName: 'ING', logo: '', order: 5 },
      { shortName: 'MUFG', fullName: 'MUFG', logo: '', order: 6 },
      { shortName: 'BEP', fullName: 'Brookfield', logo: '', order: 7 },
      { shortName: 'ORSTED', fullName: 'Ørsted', logo: '', order: 8 }
    ],
    certifications: homepage.partnersSection?.certifications || [
      { icon: '✓', label: 'ISO 14001', order: 1 },
      { icon: '⭐', label: 'GRESB 5-Star', order: 2 },
      { icon: '🌍', label: 'UN PRI Signatory', order: 3 }
    ]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/homepage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hero: {
            eyebrowText: formData.eyebrowText,
            headlineLine1: formData.headlineLine1,
            headlineLine2: formData.headlineLine2,
            subheadline: formData.subheadline,
            primaryCTALabel: formData.primaryCTALabel,
            primaryCTAHref: formData.primaryCTAHref,
            secondaryCTALabel: formData.secondaryCTALabel,
            secondaryCTAHref: formData.secondaryCTAHref,
            backgroundType: formData.backgroundType,
            backgroundImage: formData.backgroundImage,
            backgroundVideo: formData.backgroundVideo,
            overlayOpacity: parseFloat(formData.overlayOpacity as any),
          },
          metrics: [
            { value: formData.metric1Value, label: formData.metric1Label, suffix: formData.metric1Suffix, order: 1 },
            { value: formData.metric2Value, label: formData.metric2Label, suffix: formData.metric2Suffix, order: 2 },
            { value: formData.metric3Value, label: formData.metric3Label, suffix: formData.metric3Suffix, order: 3 },
          ],
          marketTickerApiKey: formData.marketTickerApiKey,
          investmentSection: {
            eyebrowText: formData.investmentEyebrow,
            headline: formData.investmentHeadline,
            bodyText: formData.investmentBody,
            features: formData.investmentFeatures,
            tabs: formData.investmentTabs,
          },
          finalCTA: {
            headline: formData.ctaHeadline,
            subheadline: formData.ctaSubheadline,
            primaryCTALabel: formData.ctaPrimaryLabel,
            primaryCTAHref: formData.ctaPrimaryHref,
            secondaryCTALabel: formData.ctaSecondaryLabel,
            secondaryCTAHref: formData.ctaSecondaryHref,
            trustSignal1: formData.ctaTrust1,
            trustSignal2: formData.ctaTrust2,
            trustSignal3: formData.ctaTrust3,
          },
          partnersSection: {
            headline: formData.partnersHeadline,
            institutions: formData.institutions,
            certifications: formData.certifications,
          },
          status: 'published',
        }),
      });

      if (response.ok) {
        alert('Homepage updated successfully!');
        router.refresh();
      } else {
        alert('Failed to update homepage');
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
          <h1 className="text-3xl font-bold text-text-primary font-display">Homepage Editor</h1>
          <p className="mt-2 text-text-secondary">Manage all homepage content and sections</p>
        </div>
        <a href="/" target="_blank" rel="noopener noreferrer">
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
        </a>
      </div>

      <DesignLockBanner />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Hero Section */}
        <div className="rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-text-primary mb-6 font-display">Hero Section</h2>
          
          <div className="space-y-6">
            {/* Background Type */}
            <div>
              <Label htmlFor="backgroundType">Background Type</Label>
              <select
                id="backgroundType"
                value={formData.backgroundType}
                onChange={(e) => setFormData({ ...formData, backgroundType: e.target.value as any })}
                className="flex h-10 w-full rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm px-3 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solar/50 focus-visible:border-solar/40"
              >
                <option value="gradient">Gradient (Default)</option>
                <option value="image">Background Image</option>
                <option value="video">Background Video</option>
              </select>
            </div>

            {/* Background Image */}
            {formData.backgroundType === 'image' && (
              <div>
                <Label>Background Image</Label>
                <ImageUpload
                  value={formData.backgroundImage}
                  onChange={(url) => setFormData({ ...formData, backgroundImage: url })}
                  label="Hero Background Image (1920x1080px recommended)"
                />
              </div>
            )}

            {/* Background Video */}
            {formData.backgroundType === 'video' && (
              <div>
                <Label htmlFor="backgroundVideo">Background Video URL</Label>
                <Input
                  id="backgroundVideo"
                  value={formData.backgroundVideo}
                  onChange={(e) => setFormData({ ...formData, backgroundVideo: e.target.value })}
                  placeholder="https://example.com/video.mp4"
                />
                <p className="mt-1 text-xs text-text-muted">
                  Use MP4 format for best compatibility
                </p>
              </div>
            )}

            {/* Overlay Opacity */}
            {(formData.backgroundType === 'image' || formData.backgroundType === 'video') && (
              <div>
                <Label htmlFor="overlayOpacity">Overlay Opacity (0-1)</Label>
                <Input
                  id="overlayOpacity"
                  type="number"
                  step="0.1"
                  min="0"
                  max="1"
                  value={formData.overlayOpacity}
                  onChange={(e) => setFormData({ ...formData, overlayOpacity: e.target.value })}
                />
                <p className="mt-1 text-xs text-text-muted">
                  Controls darkness of overlay (0 = transparent, 1 = fully dark)
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 pt-4 border-t border-white/[0.08]">
              <div>
                <Label htmlFor="eyebrowText">Eyebrow Text</Label>
                <Input
                  id="eyebrowText"
                  value={formData.eyebrowText}
                  onChange={(e) => setFormData({ ...formData, eyebrowText: e.target.value })}
                  placeholder="Energy Finance & Project Management"
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
                  placeholder="We originate, finance, and deliver..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="primaryCTALabel">Primary CTA Label</Label>
                  <Input
                    id="primaryCTALabel"
                    value={formData.primaryCTALabel}
                    onChange={(e) => setFormData({ ...formData, primaryCTALabel: e.target.value })}
                    placeholder="Explore Our Portfolio"
                  />
                </div>
                <div>
                  <Label htmlFor="primaryCTAHref">Primary CTA Link</Label>
                  <Input
                    id="primaryCTAHref"
                    value={formData.primaryCTAHref}
                    onChange={(e) => setFormData({ ...formData, primaryCTAHref: e.target.value })}
                    placeholder="/portfolio"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="secondaryCTALabel">Secondary CTA Label</Label>
                  <Input
                    id="secondaryCTALabel"
                    value={formData.secondaryCTALabel}
                    onChange={(e) => setFormData({ ...formData, secondaryCTALabel: e.target.value })}
                    placeholder="Investment Deck"
                  />
                </div>
                <div>
                  <Label htmlFor="secondaryCTAHref">Secondary CTA Link</Label>
                  <Input
                    id="secondaryCTAHref"
                    value={formData.secondaryCTAHref}
                    onChange={(e) => setFormData({ ...formData, secondaryCTAHref: e.target.value })}
                    placeholder="/contact"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Section */}
        <div className="rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-text-primary mb-6 font-display">Metrics Strip</h2>
          
          <div className="space-y-6">
            {/* Metric 1 */}
            <div className="grid grid-cols-3 gap-4 p-4 rounded-sm bg-white/5">
              <div>
                <Label htmlFor="metric1Value">Value</Label>
                <Input
                  id="metric1Value"
                  value={formData.metric1Value}
                  onChange={(e) => setFormData({ ...formData, metric1Value: e.target.value })}
                  placeholder="12.4"
                />
              </div>
              <div>
                <Label htmlFor="metric1Suffix">Suffix</Label>
                <Input
                  id="metric1Suffix"
                  value={formData.metric1Suffix}
                  onChange={(e) => setFormData({ ...formData, metric1Suffix: e.target.value })}
                  placeholder="B"
                />
              </div>
              <div>
                <Label htmlFor="metric1Label">Label</Label>
                <Input
                  id="metric1Label"
                  value={formData.metric1Label}
                  onChange={(e) => setFormData({ ...formData, metric1Label: e.target.value })}
                  placeholder="Capital Deployed"
                />
              </div>
            </div>

            {/* Metric 2 */}
            <div className="grid grid-cols-3 gap-4 p-4 rounded-sm bg-white/5">
              <div>
                <Label htmlFor="metric2Value">Value</Label>
                <Input
                  id="metric2Value"
                  value={formData.metric2Value}
                  onChange={(e) => setFormData({ ...formData, metric2Value: e.target.value })}
                  placeholder="18.2"
                />
              </div>
              <div>
                <Label htmlFor="metric2Suffix">Suffix</Label>
                <Input
                  id="metric2Suffix"
                  value={formData.metric2Suffix}
                  onChange={(e) => setFormData({ ...formData, metric2Suffix: e.target.value })}
                  placeholder=" GW"
                />
              </div>
              <div>
                <Label htmlFor="metric2Label">Label</Label>
                <Input
                  id="metric2Label"
                  value={formData.metric2Label}
                  onChange={(e) => setFormData({ ...formData, metric2Label: e.target.value })}
                  placeholder="Capacity Managed"
                />
              </div>
            </div>

            {/* Metric 3 */}
            <div className="grid grid-cols-3 gap-4 p-4 rounded-sm bg-white/5">
              <div>
                <Label htmlFor="metric3Value">Value</Label>
                <Input
                  id="metric3Value"
                  value={formData.metric3Value}
                  onChange={(e) => setFormData({ ...formData, metric3Value: e.target.value })}
                  placeholder="340"
                />
              </div>
              <div>
                <Label htmlFor="metric3Suffix">Suffix</Label>
                <Input
                  id="metric3Suffix"
                  value={formData.metric3Suffix}
                  onChange={(e) => setFormData({ ...formData, metric3Suffix: e.target.value })}
                  placeholder="+"
                />
              </div>
              <div>
                <Label htmlFor="metric3Label">Label</Label>
                <Input
                  id="metric3Label"
                  value={formData.metric3Label}
                  onChange={(e) => setFormData({ ...formData, metric3Label: e.target.value })}
                  placeholder="Projects Closed"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Market Ticker API Key */}
        <div className="rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-text-primary mb-6 font-display">Market Ticker API Key</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="marketTickerApiKey">Alpha Vantage API Key</Label>
              <div className="relative">
                <Input
                  id="marketTickerApiKey"
                  type={showApiKey ? 'text' : 'password'}
                  value={formData.marketTickerApiKey}
                  onChange={(e) => setFormData({ ...formData, marketTickerApiKey: e.target.value })}
                  placeholder="Enter your Alpha Vantage API key"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
                >
                  {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="mt-2 text-xs text-text-muted">
                Get your free API key at <a href="https://www.alphavantage.co/support/#api-key" target="_blank" rel="noopener noreferrer" className="text-solar hover:underline">alphavantage.co</a>
              </p>
              <p className="mt-1 text-xs text-text-muted">
                This key will be used to fetch real-time market data for the ticker. See MARKET_DATA_INTEGRATION.md for setup details.
              </p>
            </div>
          </div>
        </div>

        {/* Investment Case Section */}
        <div className="rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-text-primary mb-6 font-display">Investment Case Section</h2>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="investmentEyebrow">Eyebrow Text</Label>
              <Input
                id="investmentEyebrow"
                value={formData.investmentEyebrow}
                onChange={(e) => setFormData({ ...formData, investmentEyebrow: e.target.value })}
                placeholder="INVESTMENT CASE"
              />
            </div>
            <div>
              <Label htmlFor="investmentHeadline">Headline</Label>
              <Input
                id="investmentHeadline"
                value={formData.investmentHeadline}
                onChange={(e) => setFormData({ ...formData, investmentHeadline: e.target.value })}
                placeholder="Built for institutional capital at every stage."
              />
            </div>
            <div>
              <Label htmlFor="investmentBody">Body Text</Label>
              <Textarea
                id="investmentBody"
                value={formData.investmentBody}
                onChange={(e) => setFormData({ ...formData, investmentBody: e.target.value })}
                rows={3}
                placeholder="Our integrated project management and energy finance model..."
              />
            </div>
            
            <div className="pt-4 border-t border-white/[0.08]">
              <Label className="mb-3 block">Features (Checkmarks)</Label>
              <div className="space-y-2">
                {formData.investmentFeatures.map((feature: string, idx: number) => (
                  <div key={idx} className="flex gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => {
                        const updated = [...formData.investmentFeatures];
                        updated[idx] = e.target.value;
                        setFormData({ ...formData, investmentFeatures: updated });
                      }}
                      placeholder="Feature text"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setFormData({
                        ...formData,
                        investmentFeatures: formData.investmentFeatures.filter((_: string, i: number) => i !== idx)
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
                    investmentFeatures: [...formData.investmentFeatures, '']
                  })}
                >
                  + Add Feature
                </Button>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.08]">
              <Label className="mb-3 block">Tabs</Label>
              <div className="space-y-4">
                {formData.investmentTabs.map((tab: any, idx: number) => (
                  <div key={idx} className="p-4 rounded-sm bg-white/5 border border-white/[0.08] space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold">Tab {idx + 1}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setFormData({
                          ...formData,
                          investmentTabs: formData.investmentTabs.filter((_: any, i: number) => i !== idx)
                        })}
                        className="text-alert"
                      >
                        Remove Tab
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>Tab ID</Label>
                        <Input
                          value={tab.id}
                          onChange={(e) => {
                            const updated = [...formData.investmentTabs];
                            updated[idx] = { ...updated[idx], id: e.target.value };
                            setFormData({ ...formData, investmentTabs: updated });
                          }}
                          placeholder="track-record"
                        />
                      </div>
                      <div>
                        <Label>Tab Label</Label>
                        <Input
                          value={tab.label}
                          onChange={(e) => {
                            const updated = [...formData.investmentTabs];
                            updated[idx] = { ...updated[idx], label: e.target.value };
                            setFormData({ ...formData, investmentTabs: updated });
                          }}
                          placeholder="Track Record"
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={tab.title}
                        onChange={(e) => {
                          const updated = [...formData.investmentTabs];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          setFormData({ ...formData, investmentTabs: updated });
                        }}
                        placeholder="Proven Performance"
                      />
                    </div>
                    <div>
                      <Label>Content</Label>
                      <Textarea
                        value={tab.content}
                        onChange={(e) => {
                          const updated = [...formData.investmentTabs];
                          updated[idx] = { ...updated[idx], content: e.target.value };
                          setFormData({ ...formData, investmentTabs: updated });
                        }}
                        rows={2}
                        placeholder="Tab content text"
                      />
                    </div>
                    <div>
                      <Label className="mb-2 block">Metrics</Label>
                      <div className="space-y-2">
                        {(tab.metrics || []).map((metric: any, mIdx: number) => (
                          <div key={mIdx} className="flex gap-2">
                            <Input
                              value={metric.label}
                              onChange={(e) => {
                                const updated = [...formData.investmentTabs];
                                updated[idx].metrics[mIdx] = { ...updated[idx].metrics[mIdx], label: e.target.value };
                                setFormData({ ...formData, investmentTabs: updated });
                              }}
                              placeholder="NET IRR RANGE"
                            />
                            <Input
                              value={metric.value}
                              onChange={(e) => {
                                const updated = [...formData.investmentTabs];
                                updated[idx].metrics[mIdx] = { ...updated[idx].metrics[mIdx], value: e.target.value };
                                setFormData({ ...formData, investmentTabs: updated });
                              }}
                              placeholder="8-12%"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const updated = [...formData.investmentTabs];
                                updated[idx].metrics = updated[idx].metrics.filter((_: any, i: number) => i !== mIdx);
                                setFormData({ ...formData, investmentTabs: updated });
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
                            const updated = [...formData.investmentTabs];
                            if (!updated[idx].metrics) updated[idx].metrics = [];
                            updated[idx].metrics.push({ label: '', value: '' });
                            setFormData({ ...formData, investmentTabs: updated });
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
                    investmentTabs: [...formData.investmentTabs, { id: '', label: '', title: '', content: '', metrics: [] }]
                  })}
                >
                  + Add Tab
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Partners Section */}
        <div className="rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-text-primary mb-6 font-display">Trusted Institutions</h2>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="partnersHeadline">Section Headline</Label>
              <Input
                id="partnersHeadline"
                value={formData.partnersHeadline}
                onChange={(e) => setFormData({ ...formData, partnersHeadline: e.target.value })}
                placeholder="Trusted by leading institutions"
              />
            </div>

            <div className="pt-4 border-t border-white/[0.08]">
              <Label className="mb-3 block">Institutions</Label>
              <div className="space-y-4">
                {formData.institutions.map((inst: any, idx: number) => (
                  <div key={idx} className="p-4 rounded-sm bg-white/5 border border-white/[0.08] space-y-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold">Institution {idx + 1}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setFormData({
                          ...formData,
                          institutions: formData.institutions.filter((_: any, i: number) => i !== idx)
                        })}
                        className="text-alert"
                      >
                        Remove
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>Short Name (Logo Text)</Label>
                        <Input
                          value={inst.shortName}
                          onChange={(e) => {
                            const updated = [...formData.institutions];
                            updated[idx] = { ...updated[idx], shortName: e.target.value };
                            setFormData({ ...formData, institutions: updated });
                          }}
                          placeholder="GS"
                        />
                      </div>
                      <div>
                        <Label>Full Name</Label>
                        <Input
                          value={inst.fullName}
                          onChange={(e) => {
                            const updated = [...formData.institutions];
                            updated[idx] = { ...updated[idx], fullName: e.target.value };
                            setFormData({ ...formData, institutions: updated });
                          }}
                          placeholder="Goldman Sachs"
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Logo Image (Optional)</Label>
                      <ImageUpload
                        value={inst.logo || ''}
                        onChange={(url) => {
                          const updated = [...formData.institutions];
                          updated[idx] = { ...updated[idx], logo: url };
                          setFormData({ ...formData, institutions: updated });
                        }}
                        label="Upload institution logo"
                      />
                      <p className="mt-1 text-xs text-text-muted">
                        If no logo is uploaded, the short name will be displayed
                      </p>
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setFormData({
                    ...formData,
                    institutions: [...formData.institutions, { shortName: '', fullName: '', logo: '', order: formData.institutions.length + 1 }]
                  })}
                >
                  + Add Institution
                </Button>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.08]">
              <Label className="mb-3 block">Certifications</Label>
              <div className="space-y-3">
                {formData.certifications.map((cert: any, idx: number) => (
                  <div key={idx} className="flex gap-3">
                    <div className="w-20">
                      <Label>Icon</Label>
                      <Input
                        value={cert.icon}
                        onChange={(e) => {
                          const updated = [...formData.certifications];
                          updated[idx] = { ...updated[idx], icon: e.target.value };
                          setFormData({ ...formData, certifications: updated });
                        }}
                        placeholder="✓"
                      />
                    </div>
                    <div className="flex-1">
                      <Label>Label</Label>
                      <Input
                        value={cert.label}
                        onChange={(e) => {
                          const updated = [...formData.certifications];
                          updated[idx] = { ...updated[idx], label: e.target.value };
                          setFormData({ ...formData, certifications: updated });
                        }}
                        placeholder="ISO 14001"
                      />
                    </div>
                    <div className="flex items-end">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setFormData({
                          ...formData,
                          certifications: formData.certifications.filter((_: any, i: number) => i !== idx)
                        })}
                        className="text-alert"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setFormData({
                    ...formData,
                    certifications: [...formData.certifications, { icon: '', label: '', order: formData.certifications.length + 1 }]
                  })}
                >
                  + Add Certification
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-text-primary mb-6 font-display">Final CTA Section</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="ctaHeadline">Headline</Label>
              <Input
                id="ctaHeadline"
                value={formData.ctaHeadline}
                onChange={(e) => setFormData({ ...formData, ctaHeadline: e.target.value })}
                placeholder="Ready to deploy capital in the energy transition?"
              />
            </div>
            <div>
              <Label htmlFor="ctaSubheadline">Subheadline</Label>
              <Textarea
                id="ctaSubheadline"
                value={formData.ctaSubheadline}
                onChange={(e) => setFormData({ ...formData, ctaSubheadline: e.target.value })}
                rows={2}
                placeholder="Our team works with institutional investors..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ctaPrimaryLabel">Primary CTA Label</Label>
                <Input
                  id="ctaPrimaryLabel"
                  value={formData.ctaPrimaryLabel}
                  onChange={(e) => setFormData({ ...formData, ctaPrimaryLabel: e.target.value })}
                  placeholder="Schedule a Meeting"
                />
              </div>
              <div>
                <Label htmlFor="ctaPrimaryHref">Primary CTA Link</Label>
                <Input
                  id="ctaPrimaryHref"
                  value={formData.ctaPrimaryHref}
                  onChange={(e) => setFormData({ ...formData, ctaPrimaryHref: e.target.value })}
                  placeholder="/contact"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ctaSecondaryLabel">Secondary CTA Label</Label>
                <Input
                  id="ctaSecondaryLabel"
                  value={formData.ctaSecondaryLabel}
                  onChange={(e) => setFormData({ ...formData, ctaSecondaryLabel: e.target.value })}
                  placeholder="Download Investment Deck"
                />
              </div>
              <div>
                <Label htmlFor="ctaSecondaryHref">Secondary CTA Link</Label>
                <Input
                  id="ctaSecondaryHref"
                  value={formData.ctaSecondaryHref}
                  onChange={(e) => setFormData({ ...formData, ctaSecondaryHref: e.target.value })}
                  placeholder="/deck.pdf"
                />
              </div>
            </div>
            <div className="pt-4 border-t border-white/[0.08]">
              <Label className="mb-3 block">Trust Signals</Label>
              <div className="space-y-3">
                <Input
                  value={formData.ctaTrust1}
                  onChange={(e) => setFormData({ ...formData, ctaTrust1: e.target.value })}
                  placeholder="Typically responds within 24 hours"
                />
                <Input
                  value={formData.ctaTrust2}
                  onChange={(e) => setFormData({ ...formData, ctaTrust2: e.target.value })}
                  placeholder="NDA available upon request"
                />
                <Input
                  value={formData.ctaTrust3}
                  onChange={(e) => setFormData({ ...formData, ctaTrust3: e.target.value })}
                  placeholder="Strict confidentiality"
                />
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
