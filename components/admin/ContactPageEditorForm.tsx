'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Label, Textarea } from '@/components/ui/form-elements';
import { Save, Eye } from 'lucide-react';

export default function ContactPageEditorForm({ contactPage }: { contactPage: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Hero
    eyebrowText: contactPage.hero?.eyebrowText || '',
    headlineLine1: contactPage.hero?.headlineLine1 || '',
    headlineLine2: contactPage.hero?.headlineLine2 || '',
    subheadline: contactPage.hero?.subheadline || '',
    
    // Contact Methods
    contactMethods: contactPage.contactMethods || [],
    
    // Contact Form
    formHeadline: contactPage.contactForm?.headline || '',
    formSubheadline: contactPage.contactForm?.subheadline || '',
    responseTime: contactPage.contactForm?.responseTime || '',
    privacyText: contactPage.contactForm?.privacyText || '',
    submitButtonText: contactPage.contactForm?.submitButtonText || '',
    successMessage: contactPage.contactForm?.successMessage || '',
    inquiryTypes: contactPage.contactForm?.inquiryTypes || [],
    
    // Offices
    offices: contactPage.offices || []
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/contact-page', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hero: {
            eyebrowText: formData.eyebrowText,
            headlineLine1: formData.headlineLine1,
            headlineLine2: formData.headlineLine2,
            subheadline: formData.subheadline
          },
          contactMethods: formData.contactMethods,
          contactForm: {
            headline: formData.formHeadline,
            subheadline: formData.formSubheadline,
            responseTime: formData.responseTime,
            privacyText: formData.privacyText,
            submitButtonText: formData.submitButtonText,
            successMessage: formData.successMessage,
            inquiryTypes: formData.inquiryTypes
          },
          offices: formData.offices,
          status: 'published'
        })
      });

      if (response.ok) {
        alert('Contact page updated successfully!');
        router.refresh();
      } else {
        alert('Failed to update contact page');
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
          <h1 className="text-3xl font-bold text-text-primary font-display">Contact Page Editor</h1>
          <p className="mt-2 text-text-secondary">Manage all contact page content</p>
        </div>
        <a href="/contact" target="_blank" rel="noopener noreferrer">
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
                placeholder="Contact"
              />
            </div>
            <div>
              <Label htmlFor="headlineLine1">Headline Line 1</Label>
              <Input
                id="headlineLine1"
                value={formData.headlineLine1}
                onChange={(e) => setFormData({ ...formData, headlineLine1: e.target.value })}
                placeholder="Get in"
              />
            </div>
            <div>
              <Label htmlFor="headlineLine2">Headline Line 2 (Gradient)</Label>
              <Input
                id="headlineLine2"
                value={formData.headlineLine2}
                onChange={(e) => setFormData({ ...formData, headlineLine2: e.target.value })}
                placeholder="Touch"
              />
            </div>
            <div>
              <Label htmlFor="subheadline">Subheadline</Label>
              <Textarea
                id="subheadline"
                value={formData.subheadline}
                onChange={(e) => setFormData({ ...formData, subheadline: e.target.value })}
                rows={3}
                placeholder="Whether you're an institutional investor..."
              />
            </div>
          </div>
        </div>

        {/* Contact Methods */}
        <div className="rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-text-primary mb-6 font-display">Contact Methods</h2>
          
          <div className="space-y-4">
            {formData.contactMethods.map((method: any, idx: number) => (
              <div key={idx} className="p-4 rounded-sm bg-white/5 border border-white/[0.08] space-y-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold">Contact Method {idx + 1}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setFormData({
                      ...formData,
                      contactMethods: formData.contactMethods.filter((_: any, i: number) => i !== idx)
                    })}
                    className="text-alert"
                  >
                    Remove
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={method.title}
                      onChange={(e) => {
                        const updated = [...formData.contactMethods];
                        updated[idx] = { ...updated[idx], title: e.target.value };
                        setFormData({ ...formData, contactMethods: updated });
                      }}
                      placeholder="General Inquiries"
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      value={method.email}
                      onChange={(e) => {
                        const updated = [...formData.contactMethods];
                        updated[idx] = { ...updated[idx], email: e.target.value };
                        setFormData({ ...formData, contactMethods: updated });
                      }}
                      placeholder="info@helioaegis.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Phone</Label>
                    <Input
                      value={method.phone}
                      onChange={(e) => {
                        const updated = [...formData.contactMethods];
                        updated[idx] = { ...updated[idx], phone: e.target.value };
                        setFormData({ ...formData, contactMethods: updated });
                      }}
                      placeholder="+1 (212) 555-0100"
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Input
                      value={method.description}
                      onChange={(e) => {
                        const updated = [...formData.contactMethods];
                        updated[idx] = { ...updated[idx], description: e.target.value };
                        setFormData({ ...formData, contactMethods: updated });
                      }}
                      placeholder="Questions about our services"
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
                contactMethods: [...formData.contactMethods, { title: '', email: '', phone: '', description: '', order: formData.contactMethods.length + 1 }]
              })}
            >
              + Add Contact Method
            </Button>
          </div>
        </div>

        {/* Contact Form Settings */}
        <div className="rounded-sm border border-white/[0.08] bg-obsidian/50 backdrop-blur-sm p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-text-primary mb-6 font-display">Contact Form Settings</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="formHeadline">Form Headline</Label>
              <Input
                id="formHeadline"
                value={formData.formHeadline}
                onChange={(e) => setFormData({ ...formData, formHeadline: e.target.value })}
                placeholder="Send us a Message"
              />
            </div>
            <div>
              <Label htmlFor="formSubheadline">Form Subheadline</Label>
              <Textarea
                id="formSubheadline"
                value={formData.formSubheadline}
                onChange={(e) => setFormData({ ...formData, formSubheadline: e.target.value })}
                rows={2}
                placeholder="We typically respond within 24 hours..."
              />
            </div>
            <div>
              <Label htmlFor="responseTime">Response Time Text</Label>
              <Input
                id="responseTime"
                value={formData.responseTime}
                onChange={(e) => setFormData({ ...formData, responseTime: e.target.value })}
                placeholder="We typically respond within 24 hours. NDA available upon request."
              />
            </div>
            <div>
              <Label htmlFor="privacyText">Privacy Checkbox Text</Label>
              <Textarea
                id="privacyText"
                value={formData.privacyText}
                onChange={(e) => setFormData({ ...formData, privacyText: e.target.value })}
                rows={3}
                placeholder="I agree to the privacy policy..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="submitButtonText">Submit Button Text</Label>
                <Input
                  id="submitButtonText"
                  value={formData.submitButtonText}
                  onChange={(e) => setFormData({ ...formData, submitButtonText: e.target.value })}
                  placeholder="Send Message"
                />
              </div>
              <div>
                <Label htmlFor="successMessage">Success Message</Label>
                <Input
                  id="successMessage"
                  value={formData.successMessage}
                  onChange={(e) => setFormData({ ...formData, successMessage: e.target.value })}
                  placeholder="✓ Message Sent"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.08]">
              <Label className="mb-3 block">Inquiry Types</Label>
              <div className="space-y-2">
                {formData.inquiryTypes.map((type: any, idx: number) => (
                  <div key={idx} className="flex gap-2">
                    <Input
                      value={type.value}
                      onChange={(e) => {
                        const updated = [...formData.inquiryTypes];
                        updated[idx] = { ...updated[idx], value: e.target.value };
                        setFormData({ ...formData, inquiryTypes: updated });
                      }}
                      placeholder="general"
                    />
                    <Input
                      value={type.label}
                      onChange={(e) => {
                        const updated = [...formData.inquiryTypes];
                        updated[idx] = { ...updated[idx], label: e.target.value };
                        setFormData({ ...formData, inquiryTypes: updated });
                      }}
                      placeholder="General Inquiry"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setFormData({
                        ...formData,
                        inquiryTypes: formData.inquiryTypes.filter((_: any, i: number) => i !== idx)
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
                    inquiryTypes: [...formData.inquiryTypes, { value: '', label: '' }]
                  })}
                >
                  + Add Inquiry Type
                </Button>
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
                <div>
                  <Label>Address</Label>
                  <Input
                    value={office.address}
                    onChange={(e) => {
                      const updated = [...formData.offices];
                      updated[idx] = { ...updated[idx], address: e.target.value };
                      setFormData({ ...formData, offices: updated });
                    }}
                    placeholder="123 Park Avenue, New York, NY 10017"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Phone</Label>
                    <Input
                      value={office.phone}
                      onChange={(e) => {
                        const updated = [...formData.offices];
                        updated[idx] = { ...updated[idx], phone: e.target.value };
                        setFormData({ ...formData, offices: updated });
                      }}
                      placeholder="+1 (212) 555-0100"
                    />
                  </div>
                  <div>
                    <Label>Timezone</Label>
                    <Input
                      value={office.timezone}
                      onChange={(e) => {
                        const updated = [...formData.offices];
                        updated[idx] = { ...updated[idx], timezone: e.target.value };
                        setFormData({ ...formData, offices: updated });
                      }}
                      placeholder="EST"
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
                offices: [...formData.offices, { region: '', office: '', address: '', phone: '', timezone: '', order: formData.offices.length + 1 }]
              })}
            >
              + Add Office
            </Button>
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
