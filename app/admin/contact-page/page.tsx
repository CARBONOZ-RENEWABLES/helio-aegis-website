import dbConnect from '@/lib/mongodb';
import ContactPage from '@/models/ContactPage';
import ContactPageEditorForm from '@/components/admin/ContactPageEditorForm';

export default async function ContactPageEditorPage() {
  await dbConnect();
  
  let contactPage = await ContactPage.findOne({}).lean();
  
  if (!contactPage) {
    contactPage = await ContactPage.create({
      hero: {
        eyebrowText: 'Contact',
        headlineLine1: 'Get in',
        headlineLine2: 'Touch',
        subheadline: "Whether you're an institutional investor, project developer, or government agency, we'd like to hear from you."
      },
      contactMethods: [
        {
          title: 'General Inquiries',
          email: 'info@helioaegis.com',
          phone: '+1 (212) 555-0100',
          description: 'Questions about our services and capabilities',
          order: 1
        },
        {
          title: 'Investor Relations',
          email: 'investors@helioaegis.com',
          phone: '+1 (212) 555-0101',
          description: 'Fund information and investment opportunities',
          order: 2
        },
        {
          title: 'Project Submissions',
          email: 'projects@helioaegis.com',
          phone: '+1 (212) 555-0102',
          description: 'Project development and partnership opportunities',
          order: 3
        }
      ],
      contactForm: {
        headline: 'Send us a Message',
        subheadline: 'We typically respond within 24 hours. All inquiries are handled with strict confidentiality.',
        responseTime: 'We typically respond within 24 hours. NDA available upon request.',
        privacyText: 'I agree to the privacy policy and understand that my information will be handled with strict confidentiality. I consent to being contacted about my inquiry.',
        submitButtonText: 'Send Message',
        successMessage: '✓ Message Sent',
        inquiryTypes: [
          { value: 'general', label: 'General Inquiry' },
          { value: 'investor', label: 'Investor Relations' },
          { value: 'developer', label: 'Project Developer' },
          { value: 'partnership', label: 'Partnership Opportunity' },
          { value: 'other', label: 'Other' }
        ]
      },
      offices: [
        {
          region: 'North America',
          office: 'New York, USA',
          address: '123 Park Avenue, New York, NY 10017',
          phone: '+1 (212) 555-0100',
          timezone: 'EST',
          order: 1
        },
        {
          region: 'Europe',
          office: 'London, UK',
          address: '456 Canary Wharf, London, E14 5AB',
          phone: '+44 (20) 7946 0958',
          timezone: 'GMT',
          order: 2
        },
        {
          region: 'MENA',
          office: 'Dubai, UAE',
          address: '789 DIFC, Dubai, UAE',
          phone: '+971 (4) 362 1111',
          timezone: 'GST',
          order: 3
        }
      ],
      status: 'published',
      lastEditedBy: 'system'
    });
    contactPage = await ContactPage.findOne({}).lean();
  }

  return <ContactPageEditorForm contactPage={JSON.parse(JSON.stringify(contactPage))} />;
}
