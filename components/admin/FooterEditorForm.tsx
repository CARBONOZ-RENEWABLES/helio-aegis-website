'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Label, Textarea } from '@/components/ui/form-elements';
import { Save } from 'lucide-react';

export default function FooterEditorForm({ footer }: { footer: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Newsletter
    newsletterHeadline: footer.newsletter?.headline || '',
    newsletterSubheadline: footer.newsletter?.subheadline || '',
    newsletterButtonText: footer.newsletter?.buttonText || '',
    newsletterSuccessMessage: footer.newsletter?.successMessage || '',
    
    // Brand
    brandName: footer.brand?.name || '',
    brandTagline: footer.brand?.tagline || '',
    socialLinks: footer.brand?.socialLinks || [],
    
    // Link Columns
    linkColumns: footer.linkColumns || [],
    
    // Contact
    contactTitle: footer.contact?.title || '',
    contactItems: footer.contact?.items || [],
    
    // Certifications
    certifications: footer.certifications || [],
    
    // Legal
    legalLinks: footer.legal?.links || [],
    copyrightText: footer.legal?.copyrightText || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/footer', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          newsletter: {
            headline: formData.newsletterHeadline,
            subheadline: formData.newsletterSubheadline,
            buttonText: formData.newsletterButtonText,
            successMessage: formData.newsletterSuccessMessage
          },
          brand: {
            name: formData.brandName,
            tagline: formData.brandTagline,
            socialLinks: formData.socialLinks
          },
          linkColumns: formData.linkColumns,
          contact: {
            title: formData.contactTitle,
            items: formData.contactItems
          },
          certifications: formData.certifications,
          legal: {
            links: formData.legalLinks,
            copyrightText: formData.copyrightText
          },
          status: 'published'
        })
      });

      if (response.ok) {
        alert('Footer updated successfully!');
        router.refresh();
      } else {
        alert('Failed to update footer');
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary font-display">Footer Editor</h1>
        <p className="mt-2 text-text-secondary">Manage all footer content across the website</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Newsletter Section */}
        <div className="rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-text-primary mb-6 font-display">Newsletter Section</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="newsletterHeadline">Headline</Label>
              <Input
                id="newsletterHeadline"
                value={formData.newsletterHeadline}
                onChange={(e) => setFormData({ ...formData, newsletterHeadline: e.target.value })}
                placeholder="Stay current on energy markets."
              />
            </div>
            <div>
              <Label htmlFor="newsletterSubheadline">Subheadline</Label>
              <Input
                id="newsletterSubheadline"
                value={formData.newsletterSubheadline}
                onChange={(e) => setFormData({ ...formData, newsletterSubheadline: e.target.value })}
                placeholder="Monthly insights, market data, and policy updates."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="newsletterButtonText">Button Text</Label>
                <Input
                  id="newsletterButtonText"
                  value={formData.newsletterButtonText}
                  onChange={(e) => setFormData({ ...formData, newsletterButtonText: e.target.value })}
                  placeholder="Subscribe"
                />
              </div>
              <div>
                <Label htmlFor="newsletterSuccessMessage">Success Message</Label>
                <Input
                  id="newsletterSuccessMessage"
                  value={formData.newsletterSuccessMessage}
                  onChange={(e) => setFormData({ ...formData, newsletterSuccessMessage: e.target.value })}
                  placeholder="✓ Subscribed"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Brand Section */}
        <div className="rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-text-primary mb-6 font-display">Brand Section</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="brandName">Brand Name</Label>
              <Input
                id="brandName"
                value={formData.brandName}
                onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                placeholder="Helio Aegis"
              />
            </div>
            <div>
              <Label htmlFor="brandTagline">Tagline</Label>
              <Textarea
                id="brandTagline"
                value={formData.brandTagline}
                onChange={(e) => setFormData({ ...formData, brandTagline: e.target.value })}
                rows={2}
                placeholder="Structuring the clean energy future..."
              />
            </div>

            <div className="pt-4 border-t border-white/[0.08]">
              <Label className="mb-3 block">Social Links</Label>
              <div className="space-y-3">
                {formData.socialLinks.map((link: any, idx: number) => (
                  <div key={idx} className="flex gap-3">
                    <Input
                      value={link.platform}
                      onChange={(e) => {
                        const updated = [...formData.socialLinks];
                        updated[idx] = { ...updated[idx], platform: e.target.value };
                        setFormData({ ...formData, socialLinks: updated });
                      }}
                      placeholder="LinkedIn"
                      className="flex-1"
                    />
                    <Input
                      value={link.icon}
                      onChange={(e) => {
                        const updated = [...formData.socialLinks];
                        updated[idx] = { ...updated[idx], icon: e.target.value };
                        setFormData({ ...formData, socialLinks: updated });
                      }}
                      placeholder="in"
                      className="w-20"
                    />
                    <Input
                      value={link.url}
                      onChange={(e) => {
                        const updated = [...formData.socialLinks];
                        updated[idx] = { ...updated[idx], url: e.target.value };
                        setFormData({ ...formData, socialLinks: updated });
                      }}
                      placeholder="https://..."
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setFormData({
                        ...formData,
                        socialLinks: formData.socialLinks.filter((_: any, i: number) => i !== idx)
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
                    socialLinks: [...formData.socialLinks, { platform: '', icon: '', url: '', order: formData.socialLinks.length + 1 }]
                  })}
                >
                  + Add Social Link
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Link Columns */}
        <div className="rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-text-primary mb-6 font-display">Link Columns</h2>
          
          <div className="space-y-4">
            {formData.linkColumns.map((column: any, idx: number) => (
              <div key={idx} className="p-4 rounded-sm bg-white/5 border border-white/[0.08] space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold">Column {idx + 1}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setFormData({
                      ...formData,
                      linkColumns: formData.linkColumns.filter((_: any, i: number) => i !== idx)
                    })}
                    className="text-alert"
                  >
                    Remove Column
                  </Button>
                </div>
                <div>
                  <Label>Column Title</Label>
                  <Input
                    value={column.title}
                    onChange={(e) => {
                      const updated = [...formData.linkColumns];
                      updated[idx] = { ...updated[idx], title: e.target.value };
                      setFormData({ ...formData, linkColumns: updated });
                    }}
                    placeholder="Company"
                  />
                </div>
                <div>
                  <Label className="mb-2 block">Links</Label>
                  <div className="space-y-2">
                    {(column.links || []).map((link: any, lIdx: number) => (
                      <div key={lIdx} className="flex gap-2">
                        <Input
                          value={link.label}
                          onChange={(e) => {
                            const updated = [...formData.linkColumns];
                            updated[idx].links[lIdx] = { ...updated[idx].links[lIdx], label: e.target.value };
                            setFormData({ ...formData, linkColumns: updated });
                          }}
                          placeholder="About"
                        />
                        <Input
                          value={link.href}
                          onChange={(e) => {
                            const updated = [...formData.linkColumns];
                            updated[idx].links[lIdx] = { ...updated[idx].links[lIdx], href: e.target.value };
                            setFormData({ ...formData, linkColumns: updated });
                          }}
                          placeholder="/about"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const updated = [...formData.linkColumns];
                            updated[idx].links = updated[idx].links.filter((_: any, i: number) => i !== lIdx);
                            setFormData({ ...formData, linkColumns: updated });
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
                        const updated = [...formData.linkColumns];
                        if (!updated[idx].links) updated[idx].links = [];
                        updated[idx].links.push({ label: '', href: '' });
                        setFormData({ ...formData, linkColumns: updated });
                      }}
                    >
                      + Add Link
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
                linkColumns: [...formData.linkColumns, { title: '', links: [], order: formData.linkColumns.length + 1 }]
              })}
            >
              + Add Column
            </Button>
          </div>
        </div>

        {/* Contact Section */}
        <div className="rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-text-primary mb-6 font-display">Contact Section</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="contactTitle">Title</Label>
              <Input
                id="contactTitle"
                value={formData.contactTitle}
                onChange={(e) => setFormData({ ...formData, contactTitle: e.target.value })}
                placeholder="Contact"
              />
            </div>

            <div>
              <Label className="mb-3 block">Contact Items</Label>
              <div className="space-y-3">
                {formData.contactItems.map((item: any, idx: number) => (
                  <div key={idx} className="flex gap-3">
                    <Input
                      value={item.label}
                      onChange={(e) => {
                        const updated = [...formData.contactItems];
                        updated[idx] = { ...updated[idx], label: e.target.value };
                        setFormData({ ...formData, contactItems: updated });
                      }}
                      placeholder="General"
                      className="flex-1"
                    />
                    <Input
                      value={item.value}
                      onChange={(e) => {
                        const updated = [...formData.contactItems];
                        updated[idx] = { ...updated[idx], value: e.target.value };
                        setFormData({ ...formData, contactItems: updated });
                      }}
                      placeholder="info@helioaegis.com"
                      className="flex-1"
                    />
                    <select
                      value={item.type}
                      onChange={(e) => {
                        const updated = [...formData.contactItems];
                        updated[idx] = { ...updated[idx], type: e.target.value };
                        setFormData({ ...formData, contactItems: updated });
                      }}
                      className="flex h-10 rounded-sm border border-white/[0.08] bg-obsidian/50 px-3 text-sm text-text-primary"
                    >
                      <option value="email">Email</option>
                      <option value="phone">Phone</option>
                      <option value="text">Text</option>
                    </select>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setFormData({
                        ...formData,
                        contactItems: formData.contactItems.filter((_: any, i: number) => i !== idx)
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
                    contactItems: [...formData.contactItems, { label: '', value: '', type: 'email' }]
                  })}
                >
                  + Add Contact Item
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-text-primary mb-6 font-display">Certifications</h2>
          
          <div className="space-y-3">
            {formData.certifications.map((cert: any, idx: number) => (
              <div key={idx} className="flex gap-3">
                <Input
                  value={cert.icon}
                  onChange={(e) => {
                    const updated = [...formData.certifications];
                    updated[idx] = { ...updated[idx], icon: e.target.value };
                    setFormData({ ...formData, certifications: updated });
                  }}
                  placeholder="✓"
                  className="w-20"
                />
                <Input
                  value={cert.label}
                  onChange={(e) => {
                    const updated = [...formData.certifications];
                    updated[idx] = { ...updated[idx], label: e.target.value };
                    setFormData({ ...formData, certifications: updated });
                  }}
                  placeholder="ISO 14001"
                  className="flex-1"
                />
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

        {/* Legal Section */}
        <div className="rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-text-primary mb-6 font-display">Legal Section</h2>
          
          <div className="space-y-4">
            <div>
              <Label className="mb-3 block">Legal Links</Label>
              <div className="space-y-2">
                {formData.legalLinks.map((link: any, idx: number) => (
                  <div key={idx} className="flex gap-2">
                    <Input
                      value={link.label}
                      onChange={(e) => {
                        const updated = [...formData.legalLinks];
                        updated[idx] = { ...updated[idx], label: e.target.value };
                        setFormData({ ...formData, legalLinks: updated });
                      }}
                      placeholder="Privacy Policy"
                    />
                    <Input
                      value={link.href}
                      onChange={(e) => {
                        const updated = [...formData.legalLinks];
                        updated[idx] = { ...updated[idx], href: e.target.value };
                        setFormData({ ...formData, legalLinks: updated });
                      }}
                      placeholder="/privacy"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setFormData({
                        ...formData,
                        legalLinks: formData.legalLinks.filter((_: any, i: number) => i !== idx)
                      })}
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
                  onClick={() => setFormData({
                    ...formData,
                    legalLinks: [...formData.legalLinks, { label: '', href: '' }]
                  })}
                >
                  + Add Legal Link
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="copyrightText">Copyright Text</Label>
              <Textarea
                id="copyrightText"
                value={formData.copyrightText}
                onChange={(e) => setFormData({ ...formData, copyrightText: e.target.value })}
                rows={3}
                placeholder="© 2025 Helio Aegis Capital Partners LLC..."
              />
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
