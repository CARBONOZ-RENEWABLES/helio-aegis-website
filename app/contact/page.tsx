import Navigation from '@/components/shared/Navigation';
import Footer from '@/components/shared/Footer';
import FAQSectionClient from '@/components/FAQ/FAQSectionClient';
import ContactFormClient from '@/components/contact/ContactFormClient';
import dbConnect from '@/lib/mongodb';
import FAQ from '@/models/FAQ';
import ContactPage from '@/models/ContactPage';

export default async function ContactPageView() {
  await dbConnect();
  
  const faqs = await FAQ.find({ status: 'published' }).sort({ category: 1, order: 1 }).lean();
  const contactData = await ContactPage.findOne({}).lean() as any;

  const defaultData = {
    hero: {
      eyebrowText: 'Contact',
      headlineLine1: 'Get in',
      headlineLine2: 'Touch',
      subheadline: "Whether you're an institutional investor, project developer, or government agency, we'd like to hear from you."
    },
    contactMethods: [
      {
        title: 'General Inquiries',
        email: 'info@heliosnrg.eu',
        phone: '+1 (212) 555-0100',
        description: 'Questions about our services and capabilities'
      },
      {
        title: 'Investor Relations',
        email: 'investors@heliosnrg.eu',
        phone: '+1 (212) 555-0101',
        description: 'Fund information and investment opportunities'
      },
      {
        title: 'Project Submissions',
        email: 'projects@heliosnrg.eu',
        phone: '+1 (212) 555-0102',
        description: 'Project development and partnership opportunities'
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
        timezone: 'EST'
      },
      {
        region: 'Europe',
        office: 'London, UK',
        address: '456 Canary Wharf, London, E14 5AB',
        phone: '+44 (20) 7946 0958',
        timezone: 'GMT'
      },
      {
        region: 'Africa',
        office: 'Mauritius',
        address: 'Port Louis, Mauritius',
        phone: '+230 5 xxx xxxx',
        timezone: 'MUT'
      }
    ]
  };

  const data = {
    hero: contactData?.hero || defaultData.hero,
    contactMethods: contactData?.contactMethods || defaultData.contactMethods,
    contactForm: contactData?.contactForm || defaultData.contactForm,
    offices: contactData?.offices || defaultData.offices
  };

  return (
    <main className="w-full bg-void">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden" style={{ paddingLeft: '1.25rem', paddingRight: '1.25rem' }}>
        <div className="absolute inset-0 grid-texture opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-solar rounded-full opacity-5 blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-px bg-gradient-to-r from-solar to-transparent" />
              <span className="eyebrow">{data.hero.eyebrowText}</span>
            </div>
            <h1>
              <span className="text-text-primary">{data.hero.headlineLine1}</span>
              <br />
              <span className="bg-gradient-to-r from-solar to-hydrogen bg-clip-text text-transparent">
                {data.hero.headlineLine2}
              </span>
            </h1>
            <p className="subheadline text-text-secondary leading-relaxed max-w-2xl">
              {data.hero.subheadline}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {data.contactMethods.map((contact: any, idx: number) => (
              <div key={idx} className="card p-8 space-y-4">
                <h3>{contact.title}</h3>
                <p className="text-sm text-text-secondary">{contact.description}</p>
                <div className="space-y-2 pt-4 border-t border-white/[0.08]">
                  <div>
                    <p className="text-xs text-text-muted uppercase tracking-widest mb-1">
                      Email
                    </p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-solar hover:text-solar-dim transition-colors font-semibold"
                    >
                      {contact.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted uppercase tracking-widest mb-1">
                      Phone
                    </p>
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-solar hover:text-solar-dim transition-colors font-semibold"
                    >
                      {contact.phone}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-padding bg-slate-dark">
        <div className="container-custom max-w-2xl">
          <ContactFormClient formData={data.contactForm} />
        </div>
      </section>

      {/* Global Offices */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="mb-12">
            Global Offices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.offices.map((office: any, idx: number) => (
              <div key={idx} className="card p-8 space-y-4">
                <h3>{office.region}</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-xs text-text-muted uppercase tracking-widest mb-1">
                      Office
                    </p>
                    <p className="text-text-secondary font-semibold">{office.office}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted uppercase tracking-widest mb-1">
                      Address
                    </p>
                    <p className="text-text-secondary">{office.address}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted uppercase tracking-widest mb-1">
                      Phone
                    </p>
                    <a
                      href={`tel:${office.phone}`}
                      className="text-solar hover:text-solar-dim transition-colors"
                    >
                      {office.phone}
                    </a>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted uppercase tracking-widest mb-1">
                      Timezone
                    </p>
                    <p className="text-text-secondary">{office.timezone}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSectionClient faqs={JSON.parse(JSON.stringify(faqs))} category="all" showHeader={false} />

      <Footer />
    </main>
  );
}
