import Navigation from '@/components/shared/Navigation';
import Footer from '@/components/shared/Footer';
import dbConnect from '@/lib/mongodb';
import TeamMember from '@/models/TeamMember';
import AboutPage from '@/models/AboutPage';
import Image from 'next/image';

export default async function AboutPageView() {
  await dbConnect();
  
  const teamMembers = await TeamMember.find({ status: 'published' }).sort({ order: 1 }).lean();
  const aboutData = await AboutPage.findOne({}).lean();

  const defaultData = {
    hero: {
      eyebrowText: 'About Helio Aegis',
      headlineLine1: 'Structuring the',
      headlineLine2: 'Clean Energy Future',
      subheadline: 'Since 2012, Helio Aegis has been at the forefront of renewable energy project management and energy finance, structuring and delivering transformational infrastructure across North America, Europe, and Africa.'
    },
    stats: [
      { label: 'Years Active', value: '13+' },
      { label: 'Capital Deployed', value: '$12.4B' },
      { label: 'Projects Delivered', value: '340+' },
      { label: 'Team Members', value: '150+' }
    ],
    story: {
      headline: 'Our Story',
      paragraphs: [
        'Helio Aegis was founded on a simple premise: the energy transition requires more than capital. It requires integrated expertise in project development, energy finance, and institutional-grade execution.',
        "Over the past decade, we've structured and delivered $12.4B in renewable infrastructure across 340+ projects, serving institutional investors, project developers, and government agencies worldwide.",
        'Our success is built on deep sector expertise, proprietary deal sourcing, and an unwavering commitment to delivering results for our partners.'
      ]
    },
    mission: {
      headline: 'Our Mission',
      text: 'To accelerate the global energy transition by combining deep sector expertise with proprietary technology, enabling institutional capital to deploy at scale in renewable infrastructure.'
    },
    values: {
      headline: 'Core Values',
      items: [
        'Authoritative expertise backed by data and results',
        'Institutional-grade governance and risk management',
        'Integrated approach to project development and finance',
        'Commitment to ESG and climate impact',
        'Long-term partnership mentality'
      ]
    },
    offices: [
      { region: 'North America', office: 'New York, USA', team: '45+ professionals', focus: 'Solar, Wind, Storage' },
      { region: 'Europe', office: 'London, UK', team: '35+ professionals', focus: 'Offshore Wind, Solar' },
      { region: 'Africa', office: 'Mauritius', team: '25+ professionals', focus: 'Solar, Green Hydrogen' }
    ],
    esg: {
      headline: 'ESG & Climate Commitment',
      subheadline: 'We are committed to advancing the UN Sustainable Development Goals and accelerating the global energy transition.',
      sections: [
        {
          title: 'Climate Impact',
          metrics: [
            { label: 'CO2 Avoided (Annual)', value: '2.8M tonnes' },
            { label: 'Renewable Capacity', value: '18.2 GW' }
          ]
        },
        {
          title: 'Certifications',
          metrics: [
            { label: 'GRESB Rating', value: '5-Star' },
            { label: 'UN PRI Signatory', value: 'Yes' }
          ]
        }
      ]
    }
  };

  const defaultTeam = [
    { name: 'Felix Zuckschwerdt', title: 'Chief Executive Officer', bio: '20+ years in renewable energy finance and project development.', expertise: ['Project Finance', 'M&A', 'Capital Markets'] }
  ];

  const data = {
    hero: aboutData?.hero || defaultData.hero,
    stats: aboutData?.stats || defaultData.stats,
    story: aboutData?.story || defaultData.story,
    mission: aboutData?.mission || defaultData.mission,
    values: aboutData?.values || defaultData.values,
    offices: aboutData?.offices || defaultData.offices,
    esg: aboutData?.esg || defaultData.esg
  };

  const displayTeam = teamMembers.length > 0 ? teamMembers : defaultTeam;

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

      {/* Stats Strip */}
      <section className="border-y border-white/[0.08] bg-gradient-to-r from-void via-slate-dark/50 to-void">
        <div className="container-custom py-12" style={{ paddingLeft: '1.25rem', paddingRight: '1.25rem' }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {data.stats.map((stat: any, idx: number) => (
              <div key={idx} className="space-y-2">
                <p className="text-xs text-text-muted uppercase tracking-widest font-semibold">
                  {stat.label}
                </p>
                <p className="text-3xl font-display text-solar">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: Story */}
            <div className="space-y-8">
              <div>
                <h2 className="mb-6">
                  {data.story.headline}
                </h2>
                <div className="space-y-4 subheadline text-text-secondary leading-relaxed">
                  {data.story.paragraphs.map((para: string, idx: number) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Mission & Values */}
            <div className="space-y-8">
              <div className="card p-8 space-y-4">
                <h3>{data.mission.headline}</h3>
                <p className="subheadline text-text-secondary leading-relaxed">
                  {data.mission.text}
                </p>
              </div>

              <div className="card p-8 space-y-6">
                <h3>{data.values.headline}</h3>
                <ul className="space-y-4">
                  {data.values.items.map((value: string, idx: number) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <span className="text-solar text-lg flex-shrink-0 mt-0.5">✓</span>
                      <span className="text-text-secondary">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="section-padding bg-slate-dark">
        <div className="container-custom">
          <div className="mb-16">
            <h2 className="mb-4">
              Leadership Team
            </h2>
            <p className="subheadline text-text-secondary max-w-2xl">
              Experienced executives with deep expertise in renewable energy, project finance,
              and institutional capital markets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayTeam.map((leader: any, idx: number) => (
              <div key={idx} className="card p-8 space-y-6 flex flex-col">
                {leader.profileImage ? (
                  <div className="relative w-20 h-20 rounded-sm overflow-hidden">
                    <Image
                      src={leader.profileImage}
                      alt={leader.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 bg-gradient-to-br from-solar/20 to-hydrogen/20 rounded-sm flex items-center justify-center">
                    <span className="text-2xl font-display text-solar">{leader.name.charAt(0)}</span>
                  </div>
                )}
                <div className="space-y-2">
                  <h3>{leader.name}</h3>
                  <p className="text-sm text-solar font-semibold">{leader.title}</p>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed flex-grow">
                  {leader.bio}
                </p>
                {leader.expertise && leader.expertise.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.08]">
                    {leader.expertise.map((exp: string, eidx: number) => (
                      <span
                        key={eidx}
                        className="px-2 py-1 bg-white/5 text-xs text-text-muted rounded-sm"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-16">
            <h2 className="mb-4">
              Global Presence
            </h2>
            <p className="subheadline text-text-secondary max-w-2xl">
              Operating across multiple continents with regional expertise and local partnerships.
            </p>
          </div>

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
                      Team
                    </p>
                    <p className="text-text-secondary">{office.team}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted uppercase tracking-widest mb-1">
                      Focus Areas
                    </p>
                    <p className="text-text-secondary">{office.focus}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ESG Commitment */}
      <section className="section-padding bg-slate-dark">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2>
                {data.esg.headline}
              </h2>
              <p className="subheadline text-text-secondary">
                {data.esg.subheadline}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.esg.sections.map((section: any, idx: number) => (
                <div key={idx} className="card p-8 space-y-6">
                  <h3>{section.title}</h3>
                  <div className="space-y-4">
                    {section.metrics.map((metric: any, midx: number) => (
                      <div key={midx} className="flex justify-between items-center pb-4 border-b border-white/[0.08]">
                        <span className="text-sm text-text-muted">{metric.label}</span>
                        <span className="text-lg font-display text-solar">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
