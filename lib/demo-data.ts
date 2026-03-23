// Demo data for testing without MongoDB
export const demoHomepage = {
  hero: {
    eyebrowText: 'Energy Finance & Project Management',
    headlineLine1: 'Structuring the',
    headlineLine2: 'Clean Energy Future',
    subheadline: 'We originate, finance, and deliver utility-scale renewable infrastructure across North America, Europe, and Africa. Institutional capital at scale.',
    primaryCTALabel: 'Explore Our Portfolio',
    primaryCTAHref: '/portfolio',
    secondaryCTALabel: 'Investment Deck',
    secondaryCTAHref: '/contact',
    backgroundType: 'gradient',
    overlayOpacity: 0.7
  },
  metrics: [
    { value: '12.4', label: 'Capital Deployed', suffix: 'B', order: 1 },
    { value: '18.2', label: 'Capacity Managed', suffix: ' GW', order: 2 },
    { value: '340', label: 'Projects Closed', suffix: '+', order: 3 }
  ],
  investmentSection: {
    eyebrowText: 'INVESTMENT CASE',
    headline: 'Built for institutional capital at every stage.',
    bodyText: 'Our integrated project management and energy finance model creates superior risk-adjusted returns for institutional capital.',
    features: [
      'Integrated PM + Finance model',
      'Proprietary deal sourcing',
      'Institutional-grade governance'
    ],
    tabs: [
      {
        id: 'track-record',
        label: 'Track Record',
        title: 'Proven Performance',
        content: 'Our funds have delivered consistent returns across market cycles.',
        metrics: [
          { label: 'NET IRR RANGE', value: '8-12%' },
          { label: 'TVPI RANGE', value: '1.3x - 1.8x' }
        ]
      }
    ]
  },
  finalCTA: {
    headline: 'Ready to deploy capital in the energy transition?',
    subheadline: 'Our team works with institutional investors, project developers, and government entities.',
    primaryCTALabel: 'Schedule a Meeting',
    primaryCTAHref: '/contact',
    secondaryCTALabel: 'Download Investment Deck',
    secondaryCTAHref: '/contact',
    trustSignal1: 'Typically responds within 24 hours',
    trustSignal2: 'NDA available upon request',
    trustSignal3: 'Strict confidentiality'
  },
  partnersSection: {
    headline: 'Trusted by leading institutions',
    institutions: [
      { shortName: 'GS', fullName: 'Goldman Sachs', logo: '', order: 1 },
      { shortName: 'JPM', fullName: 'JP Morgan', logo: '', order: 2 }
    ],
    certifications: [
      { icon: '✓', label: 'ISO 14001', order: 1 },
      { icon: '⭐', label: 'GRESB 5-Star', order: 2 }
    ]
  }
};

export const demoNavigation = {
  primary: [
    { label: 'About', href: '/about', order: 1 },
    { label: 'Capabilities', href: '/capabilities', order: 2 },
    { label: 'Portfolio', href: '/portfolio', order: 3 },
    { label: 'Insights', href: '/insights', order: 4 },
    { label: 'Investors', href: '/investors', order: 5 },
    { label: 'Contact', href: '/contact', order: 6 }
  ],
  utilityRight: [
    { label: 'Login', href: '/admin/login', variant: 'ghost' },
    { label: 'Request Meeting', href: '/contact', variant: 'primary' }
  ]
};

export const demoCapabilities = {
  sectionTitle: 'Two Disciplines.\nOne Platform.',
  sectionDescription: 'Our integrated project management and energy finance model creates superior risk-adjusted returns.',
  capabilities: [
    {
      title: 'Project Development',
      icon: '📋',
      description: 'From origination to COD, we manage the full lifecycle of complex renewable projects.',
      href: '/capabilities/project-development',
      order: 0
    },
    {
      title: 'Energy Finance',
      icon: '📊',
      description: 'Structuring deals from $50M to $2B+ across all vehicle types.',
      href: '/capabilities/energy-finance',
      order: 1
    }
  ]
};

export const demoMetrics = {
  sectionTitle: 'Scale built on executed deals.',
  sectionSubtitle: 'Since 2012, Helio Aegis has structured and delivered:',
  metrics: [
    { value: 12.4, prefix: '$', suffix: 'B', label: 'Capital Deployed', order: 0 },
    { value: 18.2, prefix: '', suffix: ' GW', label: 'Capacity Managed', order: 1 },
    { value: 340, prefix: '', suffix: '+', label: 'Projects Closed', order: 2 }
  ]
};

export const demoProjects = [
  {
    id: '1',
    slug: 'solaris-valley-solar',
    name: 'Solaris Valley Solar Farm',
    location: 'California, USA',
    capacity: '250 MW',
    technology: 'Utility-Scale Solar',
    status: 'OPERATIONAL',
    cod: '2023-06-15',
    image: 'https://images.unsplash.com/photo-1509391366360-2e938aa1ef14?w=800&h=600&fit=crop',
    description: 'Large-scale solar installation providing clean energy to 50,000 homes.',
    stats: {
      generation: '450 GWh/year',
      homes: '50K',
      co2: '180K tonnes/year'
    }
  }
];

export const demoInsights = [
  {
    id: '1',
    slug: 'future-renewable-energy-finance',
    type: 'Research',
    title: 'The Future of Renewable Energy Finance',
    excerpt: 'Exploring emerging trends in clean energy investment.',
    date: 'Jan 15, 2025',
    readTime: '5 min read',
    featured: true
  }
];
