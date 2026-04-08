export type Category = 'all' | 'finance' | 'development' | 'investors' | 'esg' | 'process' | 'about';

export interface FAQItem {
  id: string;
  category: Exclude<Category, 'all'>;
  question: string;
  answer: string;
  keyData?: {
    label: string;
    value: string;
  };
  relatedIds?: string[];
  cta?: {
    text: string;
    href: string;
  };
}

export const faqItems: FAQItem[] = [
  // ENERGY FINANCE
  {
    id: 'deal-sizes',
    category: 'finance',
    question: 'What deal sizes does Helios NRG typically advise on?',
    answer: 'We advise on transactions ranging from $50M to $2B+, with a sweet spot between $200M–$800M. Our platform scales across single-asset financings, portfolio acquisitions, and large-scale refinancings. We work with sponsors of all sizes—from emerging developers to Fortune 500 corporates—and structure deals to match capital source requirements.',
    keyData: { label: 'Deal Range', value: '$50M–$2B+' },
  },
  {
    id: 'financing-structures',
    category: 'finance',
    question: 'Which financing structures do you work with for utility-scale projects?',
    answer: 'We structure across all major vehicle types: project-level debt (senior, mezzanine, subordinated), tax equity, preferred equity, and hybrid instruments. We also advise on fund-level financing, refinancings, and secondary market transactions. Our expertise spans traditional bank debt, institutional credit, green bonds, and alternative capital sources.',
    keyData: { label: 'Structures', value: 'All major types' },
  },
  {
    id: 'green-bond-placement',
    category: 'finance',
    question: 'Can Helios NRG act as placement agent for a green bond issuance?',
    answer: 'Yes. We advise on green bond structuring, investor targeting, and placement strategy. We work with issuers to navigate Use of Proceeds frameworks, impact reporting, and investor relations. Our network spans institutional fixed-income investors, ESG-focused funds, and development finance institutions across North America and Europe.',
    cta: { text: 'Explore our Energy Finance capabilities', href: '/capabilities' },
  },
  {
    id: 'itc-ptc-monetization',
    category: 'finance',
    question: 'How do you handle ITC and PTC monetization under the Inflation Reduction Act?',
    answer: 'We structure tax credit monetization across all IRA pathways: direct pay, transferability, and traditional tax equity. Our team models credit stacking, prevailing wage compliance, domestic content requirements, and energy community bonuses. We advise on optimal capital stack design to maximize credit value while maintaining project economics.',
    keyData: { label: 'Focus', value: 'IRA Optimization' },
  },
  {
    id: 'advisory-fees',
    category: 'finance',
    question: 'What is your typical fee structure for advisory mandates?',
    answer: 'Advisory fees are transaction-specific and depend on scope, complexity, and deal size. We typically charge retainer + success fees, or fixed advisory fees for defined scopes. We also offer equity co-investment opportunities on select transactions. All structures are negotiated to align our interests with client outcomes.',
  },
  {
    id: 'international-developers',
    category: 'finance',
    question: 'Do you work with international developers seeking US capital markets access?',
    answer: 'Yes. We advise European, MENA, and APAC developers on US market entry, regulatory navigation, and capital sourcing. We structure cross-border transactions, manage currency and political risk, and connect sponsors with US institutional capital. Our team has deep experience with OPIC, DFC, and multilateral development bank financing.',
  },

  // PROJECT DEVELOPMENT
  {
    id: 'development-stage',
    category: 'development',
    question: 'At what development stage can Helios NRG join a project?',
    answer: 'We engage from early-stage origination through COD and beyond. We can join at pre-development, permitting, or late-stage development phases. Our involvement ranges from full project management to advisory-only roles. We also acquire and de-risk projects from other developers, then refinance or recapitalize.',
    keyData: { label: 'Engagement', value: 'Origination to COD+' },
  },
  {
    id: 'equity-positions',
    category: 'development',
    question: 'Do you take equity positions in projects you manage?',
    answer: 'Yes, selectively. We co-invest equity on projects where we see strong risk-adjusted returns and strategic fit. Our equity stakes typically range from 5–25%, and we structure co-investment alongside institutional capital. This aligns our interests with long-term project performance.',
  },
  {
    id: 'grid-interconnection',
    category: 'development',
    question: 'How do you manage grid interconnection queue risk?',
    answer: 'We employ a multi-layered approach: early engagement with grid operators, queue position optimization, and contingency planning. We model interconnection timelines, cost escalation, and technical requirements. We also structure deals to accommodate queue delays and maintain project economics under adverse scenarios.',
    cta: { text: 'Learn about our development process', href: '/capabilities' },
  },
  {
    id: 'project-management-tools',
    category: 'development',
    question: 'What project management software and reporting tools do you use?',
    answer: 'We use industry-standard platforms: Procore for construction management, Tableau for real-time dashboards, and custom Python/SQL tools for financial modeling. All systems integrate with our proprietary portfolio management platform. We provide investors with monthly reporting, KPI tracking, and risk dashboards.',
  },
  {
    id: 'epc-procurement',
    category: 'development',
    question: 'Can you manage EPC procurement and contractor supervision?',
    answer: 'Yes. We manage full EPC procurement: RFQ development, bid evaluation, contract negotiation, and ongoing supervision. We work with Tier-1 contractors and manage performance, schedule, and cost. Our team conducts site inspections, quality audits, and change order management throughout construction.',
  },
  {
    id: 'community-benefits',
    category: 'development',
    question: 'What is your approach to community benefit agreements?',
    answer: 'We structure CBA negotiations early in development to build local support and de-risk permitting. We work with community stakeholders, local governments, and tribal nations to align project benefits with local priorities. Our agreements typically include local hiring, tax revenue sharing, and environmental stewardship commitments.',
  },

  // INVESTORS & FUNDS
  {
    id: 'minimum-commitment',
    category: 'investors',
    question: 'What is the minimum commitment for your infrastructure funds?',
    answer: 'Minimum commitments vary by fund strategy. Our core infrastructure fund typically requires $25M–$50M minimums for institutional LPs. We offer co-investment opportunities with lower minimums ($5M–$10M) on select transactions. We also structure customized vehicles for large strategic investors.',
    keyData: { label: 'Typical Minimum', value: '$25M–$50M' },
  },
  {
    id: 'return-profile',
    category: 'investors',
    question: 'What return profile should LPs expect across your fund strategies?',
    answer: 'Our core infrastructure fund targets 8–12% net IRR with 1.3–1.5x MOIC over 7–10 year hold periods. Returns vary by asset class and market cycle. We focus on stable, inflation-protected cash flows rather than speculative upside. Historical performance available under NDA to qualified investors.',
  },
  {
    id: 'lp-reporting',
    category: 'investors',
    question: 'How do you report to existing limited partners?',
    answer: 'We provide quarterly reports with portfolio performance, cash flow updates, and risk metrics. Annual audited financial statements and K-1s are delivered on schedule. We host annual LP meetings and offer ad-hoc investor calls. All reporting is available through a secure investor portal with real-time dashboards.',
    keyData: { label: 'Frequency', value: 'Quarterly + Annual' },
  },
  {
    id: 'non-us-investors',
    category: 'investors',
    question: 'Are your funds accessible to non-US investors? What structures apply?',
    answer: 'Yes. We structure funds for non-US LPs using ERISA-compliant vehicles, FINRA-registered offerings, and customized tax structures. We work with international counsel to manage withholding, treaty benefits, and reporting. We also offer parallel funds for non-US capital where beneficial.',
  },
  {
    id: 'management-fees',
    category: 'investors',
    question: 'How are management fees and carried interest structured?',
    answer: 'Management fees typically range from 1.5–2% of committed capital, declining over time. Carried interest is 20% of net profits above a preferred return hurdle (typically 8%). We align fee structures with LP interests and offer fee reductions for larger commitments or co-investment participation.',
  },
  {
    id: 'coinvestment-policy',
    category: 'investors',
    question: 'What is your co-investment policy for larger transactions?',
    answer: 'We co-invest 5–15% of equity on most transactions to align interests with LPs. Larger deals may include co-investment opportunities for LPs at fund economics. We structure co-investments to be transparent and fair, with no preferential terms for management.',
  },

  // ESG & COMPLIANCE
  {
    id: 'esg-frameworks',
    category: 'esg',
    question: 'What ESG frameworks does Helios NRG align with?',
    answer: 'We align with GRESB, SASB, TCFD, and the UN SDGs. Our portfolio is measured against Science-Based Targets initiative (SBTi) criteria. We report annually on ESG metrics and maintain third-party certifications. Our investment process integrates ESG risk assessment from origination through exit.',
    keyData: { label: 'Frameworks', value: 'GRESB, SASB, TCFD, SBTi' },
  },
  {
    id: 'sfdr-classification',
    category: 'esg',
    question: 'Are your funds classified under SFDR Article 8 or Article 9?',
    answer: 'Our core infrastructure fund is classified as Article 8 (sustainable investment promotion). We maintain detailed PAI (Principal Adverse Impact) reporting and sustainability indicators. We are evaluating Article 9 classification for future funds focused on climate mitigation.',
  },
  {
    id: 'carbon-avoided',
    category: 'esg',
    question: 'How do you measure and report carbon avoided across the portfolio?',
    answer: 'We calculate carbon avoided using IPCC methodologies and grid carbon intensity data. Annual avoided emissions are reported in CO2e tonnes and tracked against portfolio targets. We use third-party verification for material projects and publish annual impact reports.',
    cta: { text: 'View our ESG commitments', href: '/about' },
  },
  {
    id: 'biodiversity-policy',
    category: 'esg',
    question: 'What is your policy on biodiversity and land stewardship?',
    answer: 'We conduct biodiversity assessments on all projects and implement mitigation measures where needed. We prioritize brownfield and degraded land development. Our projects include habitat restoration, pollinator-friendly landscaping, and long-term stewardship commitments. We align with IUCN and The Nature Conservancy standards.',
  },
  {
    id: 'tcfd-disclosures',
    category: 'esg',
    question: 'Do you produce TCFD-aligned climate risk disclosures?',
    answer: 'Yes. We publish annual TCFD disclosures covering governance, strategy, risk management, and metrics. We conduct climate scenario analysis (1.5°C, 2°C, 4°C pathways) and stress-test portfolio resilience. Our disclosures are available on our website and to investors upon request.',
  },

  // PROCESS & TIMELINES
  {
    id: 'mandate-to-close',
    category: 'process',
    question: 'What is the typical timeline from mandate to financial close?',
    answer: 'Timelines vary by transaction complexity and capital source. Advisory mandates typically close in 6–12 months. Refinancings can close in 4–6 months. Acquisitions and development projects may take 12–24 months. We work to accelerate timelines where possible without compromising diligence.',
    keyData: { label: 'Typical Range', value: '6–24 months' },
  },
  {
    id: 'due-diligence-materials',
    category: 'process',
    question: 'What due diligence materials do you require from project developers?',
    answer: 'We require: technical reports (engineering, environmental, geotechnical), permitting documentation, interconnection studies, power purchase agreements, financial models, and insurance quotes. We also conduct site visits and third-party technical reviews. The full list is provided in our due diligence checklist.',
  },
  {
    id: 'project-evaluation',
    category: 'process',
    question: 'How do you evaluate new project submissions?',
    answer: 'We use a standardized evaluation framework: technical viability, market fundamentals, regulatory risk, sponsor quality, and financial returns. Projects are scored against our investment criteria. We provide feedback within 2–4 weeks. Promising projects move to detailed due diligence and term sheet negotiation.',
  },
  {
    id: 'geographic-priorities',
    category: 'process',
    question: 'What geographies are currently prioritized in your pipeline?',
    answer: 'We focus on North America (US, Canada, Mexico), Western Europe, and select MENA markets. Within the US, we prioritize regions with strong renewable energy policies, grid capacity, and institutional capital access. We evaluate new markets based on policy stability, grid infrastructure, and local partnership opportunities.',
    keyData: { label: 'Primary Markets', value: 'North America, Europe, MENA' },
  },

  // ABOUT HELIO AEGIS
  {
    id: 'company-history',
    category: 'about',
    question: 'What is Helios NRG\'s track record?',
    answer: 'Helios NRG has deployed $12B+ in capital across 18 GW of renewable capacity. Our portfolio spans 150+ projects across solar, wind, battery storage, and green hydrogen. We have achieved 98% project delivery success rate and maintained 99.2% asset availability across our portfolio. Our team brings 200+ years of combined sector experience.',
    keyData: { label: 'Portfolio', value: '18 GW, 150+ projects' },
  },
  {
    id: 'team-expertise',
    category: 'about',
    question: 'What is the background of your investment team?',
    answer: 'Our team includes former executives from Ørsted, NextEra Energy, Brookfield Renewable, and leading investment banks. We have deep expertise in project development, energy finance, infrastructure investing, and ESG. Our leadership has closed $50B+ in transactions and managed multi-billion-dollar portfolios.',
  },
  {
    id: 'office-locations',
    category: 'about',
    question: 'Where are your offices located?',
    answer: 'We maintain offices in New York (HQ), San Francisco, London, and Dubai. Our distributed team enables 24/5 market coverage and local market expertise. We work with regional partners in all key markets to ensure on-the-ground execution capability.',
    keyData: { label: 'Offices', value: '4 global locations' },
  },
];

export const categories = [
  { id: 'all', label: 'All', color: 'text-text-secondary' },
  { id: 'finance', label: 'Energy Finance', color: 'text-solar', badgeBg: '#3A2810', badgeText: '#F5A623' },
  { id: 'development', label: 'Project Development', color: 'text-growth', badgeBg: '#0A2820', badgeText: '#22C55E' },
  { id: 'investors', label: 'Investors & Funds', color: 'text-hydrogen', badgeBg: '#0A1F35', badgeText: '#00C2FF' },
  { id: 'esg', label: 'ESG & Compliance', color: 'text-growth', badgeBg: '#0F2A10', badgeText: '#4ADE80' },
  { id: 'process', label: 'Process & Timelines', color: 'text-text-secondary', badgeBg: '#1E2C42', badgeText: '#8DA0B8' },
  { id: 'about', label: 'About Helios NRG', color: 'text-text-secondary', badgeBg: '#1E2C42', badgeText: '#8DA0B8' },
];

export const experts = {
  finance: {
    name: 'Sarah Chen',
    role: 'Head of Energy Finance',
    email: 'sarah.chen@heliosnrg.eu',
  },
  development: {
    name: 'Marcus Rodriguez',
    role: 'VP Project Development',
    email: 'marcus.rodriguez@heliosnrg.eu',
  },
  investors: {
    name: 'James Mitchell',
    role: 'Head of Investor Relations',
    email: 'james.mitchell@heliosnrg.eu',
  },
  esg: {
    name: 'Dr. Amara Okonkwo',
    role: 'ESG & Impact Director',
    email: 'amara.okonkwo@heliosnrg.eu',
  },
  process: {
    name: 'David Park',
    role: 'Chief Operating Officer',
    email: 'david.park@heliosnrg.eu',
  },
  about: {
    name: 'Elena Vasquez',
    role: 'Chief Executive Officer',
    email: 'elena.vasquez@heliosnrg.eu',
  },
};
