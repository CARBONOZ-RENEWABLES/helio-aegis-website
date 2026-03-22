'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function InvestorsEditorForm({ data }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    hero: data.hero || {},
    stats: data.stats || [],
    fundStructures: data.fundStructures || [],
    irContacts: (data.irContacts || []).map((contact: any) => ({
      ...contact,
      profileImage: contact.profileImage || ''
    })),
    vintagePerformance: data.vintagePerformance || []
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/investors', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      alert('Investors page updated successfully!');
      router.refresh();
    } else {
      alert('Failed to update investors page');
    }
    setLoading(false);
  };

  const addStat = () => {
    setFormData({
      ...formData,
      stats: [...formData.stats, { label: '', value: '', order: formData.stats.length }]
    });
  };

  const removeStat = (index: number) => {
    setFormData({
      ...formData,
      stats: formData.stats.filter((_: any, i: number) => i !== index)
    });
  };

  const updateStat = (index: number, field: string, value: any) => {
    const updated = [...formData.stats];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, stats: updated });
  };

  const addContact = () => {
    setFormData({
      ...formData,
      irContacts: [...formData.irContacts, { name: '', title: '', email: '', phone: '', profileImage: '', order: formData.irContacts.length }]
    });
  };

  const removeContact = (index: number) => {
    setFormData({
      ...formData,
      irContacts: formData.irContacts.filter((_: any, i: number) => i !== index)
    });
  };

  const updateContact = (index: number, field: string, value: any) => {
    const updated = [...formData.irContacts];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, irContacts: updated });
  };

  const handleContactImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateContact(index, 'profileImage', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addFund = () => {
    setFormData({
      ...formData,
      fundStructures: [...formData.fundStructures, { 
        name: '', 
        subtitle: '', 
        description: '', 
        targetIRR: '', 
        holdPeriod: '', 
        aum: '', 
        vintageYears: '', 
        features: ['', '', ''], 
        order: formData.fundStructures.length 
      }]
    });
  };

  const removeFund = (index: number) => {
    setFormData({
      ...formData,
      fundStructures: formData.fundStructures.filter((_: any, i: number) => i !== index)
    });
  };

  const updateFund = (index: number, field: string, value: any) => {
    const updated = [...formData.fundStructures];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, fundStructures: updated });
  };

  const updateFundFeature = (fundIndex: number, featureIndex: number, value: string) => {
    const updated = [...formData.fundStructures];
    const features = [...updated[fundIndex].features];
    features[featureIndex] = value;
    updated[fundIndex] = { ...updated[fundIndex], features };
    setFormData({ ...formData, fundStructures: updated });
  };

  const addVintage = () => {
    setFormData({
      ...formData,
      vintagePerformance: [...formData.vintagePerformance, { vintage: '', irr: '', tvpi: '', status: '', order: formData.vintagePerformance.length }]
    });
  };

  const removeVintage = (index: number) => {
    setFormData({
      ...formData,
      vintagePerformance: formData.vintagePerformance.filter((_: any, i: number) => i !== index)
    });
  };

  const updateVintage = (index: number, field: string, value: any) => {
    const updated = [...formData.vintagePerformance];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, vintagePerformance: updated });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Hero Section */}
      <div className="card p-6 space-y-4">
        <h2 className="text-xl font-display">Hero Section</h2>
        
        <div>
          <label className="block text-sm font-semibold mb-2">Eyebrow Text</label>
          <input
            type="text"
            value={formData.hero.eyebrow}
            onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, eyebrow: e.target.value } })}
            className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded text-text-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Headline</label>
          <textarea
            value={formData.hero.headline}
            onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, headline: e.target.value } })}
            className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded text-text-primary"
            rows={2}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Description</label>
          <textarea
            value={formData.hero.description}
            onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, description: e.target.value } })}
            className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded text-text-primary"
            rows={3}
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-display">Stats Bar</h2>
          <button type="button" onClick={addStat} className="btn-primary text-sm">
            + Add Stat
          </button>
        </div>

        {formData.stats.map((stat: any, index: number) => (
          <div key={index} className="card p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Stat {index + 1}</h3>
              <button type="button" onClick={() => removeStat(index)} className="text-alert hover:text-alert/80">
                Remove
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Label</label>
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => updateStat(index, 'label', e.target.value)}
                  className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded text-text-primary"
                  placeholder="Assets Under Management"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Value</label>
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) => updateStat(index, 'value', e.target.value)}
                  className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded text-text-primary"
                  placeholder="$8.5B"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* IR Contacts Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-display">IR Contacts</h2>
          <button type="button" onClick={addContact} className="btn-primary text-sm">
            + Add Contact
          </button>
        </div>

        {formData.irContacts.map((contact: any, index: number) => (
          <div key={index} className="card p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Contact {index + 1}</h3>
              <button type="button" onClick={() => removeContact(index)} className="text-alert hover:text-alert/80">
                Remove
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Name</label>
                <input
                  type="text"
                  value={contact.name}
                  onChange={(e) => updateContact(index, 'name', e.target.value)}
                  className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded text-text-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Title</label>
                <input
                  type="text"
                  value={contact.title}
                  onChange={(e) => updateContact(index, 'title', e.target.value)}
                  className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded text-text-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  value={contact.email}
                  onChange={(e) => updateContact(index, 'email', e.target.value)}
                  className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded text-text-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Phone</label>
                <input
                  type="text"
                  value={contact.phone}
                  onChange={(e) => updateContact(index, 'phone', e.target.value)}
                  className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded text-text-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Profile Image (Optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleContactImageUpload(index, e)}
                className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded text-text-primary"
              />
              {contact.profileImage && (
                <img src={contact.profileImage} alt="Preview" className="mt-2 w-20 h-20 rounded object-cover" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Fund Structures Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-display">Fund Structures</h2>
          <button type="button" onClick={addFund} className="btn-primary text-sm">
            + Add Fund
          </button>
        </div>

        {formData.fundStructures.map((fund: any, index: number) => (
          <div key={index} className="card p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Fund {index + 1}</h3>
              <button type="button" onClick={() => removeFund(index)} className="text-alert hover:text-alert/80">
                Remove
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Name</label>
                <input
                  type="text"
                  value={fund.name}
                  onChange={(e) => updateFund(index, 'name', e.target.value)}
                  className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded text-text-primary"
                  placeholder="Core/Core+"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Subtitle</label>
                <input
                  type="text"
                  value={fund.subtitle}
                  onChange={(e) => updateFund(index, 'subtitle', e.target.value)}
                  className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded text-text-primary"
                  placeholder="Infrastructure Funds"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Description</label>
              <textarea
                value={fund.description}
                onChange={(e) => updateFund(index, 'description', e.target.value)}
                className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded text-text-primary"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Target IRR</label>
                <input
                  type="text"
                  value={fund.targetIRR}
                  onChange={(e) => updateFund(index, 'targetIRR', e.target.value)}
                  className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded text-text-primary"
                  placeholder="8-10%"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Hold Period</label>
                <input
                  type="text"
                  value={fund.holdPeriod}
                  onChange={(e) => updateFund(index, 'holdPeriod', e.target.value)}
                  className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded text-text-primary"
                  placeholder="7-10 years"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">AUM</label>
                <input
                  type="text"
                  value={fund.aum}
                  onChange={(e) => updateFund(index, 'aum', e.target.value)}
                  className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded text-text-primary"
                  placeholder="$4.2B"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Vintage Years</label>
                <input
                  type="text"
                  value={fund.vintageYears}
                  onChange={(e) => updateFund(index, 'vintageYears', e.target.value)}
                  className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded text-text-primary"
                  placeholder="2015-2023"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Key Features (3)</label>
              <div className="space-y-2">
                {[0, 1, 2].map((featureIndex) => (
                  <input
                    key={featureIndex}
                    type="text"
                    value={fund.features?.[featureIndex] || ''}
                    onChange={(e) => updateFundFeature(index, featureIndex, e.target.value)}
                    className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded text-text-primary"
                    placeholder={`Feature ${featureIndex + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Vintage Performance Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-display">Vintage Year Performance</h2>
          <button type="button" onClick={addVintage} className="btn-primary text-sm">
            + Add Vintage
          </button>
        </div>

        {formData.vintagePerformance.map((vintage: any, index: number) => (
          <div key={index} className="card p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Vintage {index + 1}</h3>
              <button type="button" onClick={() => removeVintage(index)} className="text-alert hover:text-alert/80">
                Remove
              </button>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Year</label>
                <input
                  type="text"
                  value={vintage.vintage}
                  onChange={(e) => updateVintage(index, 'vintage', e.target.value)}
                  className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded text-text-primary"
                  placeholder="2015"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">IRR</label>
                <input
                  type="text"
                  value={vintage.irr}
                  onChange={(e) => updateVintage(index, 'irr', e.target.value)}
                  className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded text-text-primary"
                  placeholder="11.2%"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">TVPI</label>
                <input
                  type="text"
                  value={vintage.tvpi}
                  onChange={(e) => updateVintage(index, 'tvpi', e.target.value)}
                  className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded text-text-primary"
                  placeholder="1.65x"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Status</label>
                <input
                  type="text"
                  value={vintage.status}
                  onChange={(e) => updateVintage(index, 'status', e.target.value)}
                  className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded text-text-primary"
                  placeholder="Exited"
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
