export type InsightType = 'Research' | 'Commentary' | 'Report';
export type InsightCategory = 'Market Analysis' | 'Policy' | 'Technology' | 'Regional';

export interface InsightImage {
  src: string;
  alt: string;
  caption: string;
}

export interface InsightSection {
  heading: string;
  content: string;
  image?: InsightImage;
}

export interface Insight {
  id: number;
  type: InsightType;
  date: string;
  title: string;
  excerpt: string;
  readTime: string;
  category: InsightCategory;
  featured?: boolean;
  featuredImage: InsightImage;
  author: string;
  authorRole: string;
  sections: InsightSection[];
  keyTakeaways: string[];
}

export const insights: Insight[] = [
  {
    id: 1,
    type: 'Research',
    date: 'Jan 15, 2025',
    title: 'The 2025 Renewable Energy Finance Outlook',
    excerpt: 'Capital deployment trends, interest rate impacts, and emerging opportunities in clean energy infrastructure.',
    readTime: '12 min read',
    category: 'Market Analysis',
    featured: true,
    featuredImage: {
      src: '/images/insights/renewable-finance-2025.jpg',
      alt: 'Renewable Energy Finance Outlook 2025',
      caption: 'Global renewable energy capital deployment trends and market opportunities',
    },
    author: 'Sarah Chen',
    authorRole: 'Head of Energy Finance',
    sections: [
      {
        heading: 'Executive Summary',
        content: 'The renewable energy finance landscape in 2025 is characterized by stabilizing interest rates, increased institutional capital deployment, and emerging opportunities in energy storage and green hydrogen. Our analysis of $12.4B in capital deployed across 340+ projects reveals significant shifts in investor preferences and financing structures.',
        image: {
          src: '/images/insights/capital-deployment.jpg',
          alt: 'Capital Deployment Trends',
          caption: 'Year-over-year capital deployment across renewable energy sectors',
        },
      },
      {
        heading: 'Interest Rate Environment',
        content: 'Following the Federal Reserve\'s rate stabilization in late 2024, we expect a more favorable financing environment for renewable projects in 2025. The weighted average cost of capital (WACC) for utility-scale solar projects has declined from 7.2% to 6.8%, improving project economics across the board. This creates opportunities for refinancing existing assets and accelerating new project development.',
        image: {
          src: '/images/insights/interest-rates.jpg',
          alt: 'Interest Rate Trends',
          caption: 'WACC trends for renewable energy projects (2023-2025)',
        },
      },
      {
        heading: 'Capital Deployment Trends',
        content: 'Institutional investors continue to increase allocations to renewable infrastructure, with pension funds and insurance companies now representing 45% of new capital commitments. Tax equity remains the dominant financing vehicle for utility-scale solar, while project-level debt is increasingly available from non-bank lenders. Green bonds have emerged as a significant capital source, with $8.2B deployed in 2024.',
        image: {
          src: '/images/insights/investor-allocation.jpg',
          alt: 'Investor Allocation',
          caption: 'Institutional investor allocation to renewable energy (2024)',
        },
      },
      {
        heading: 'Emerging Opportunities',
        content: 'Energy storage and green hydrogen represent the fastest-growing segments, with battery storage capacity additions expected to reach 15 GWh in 2025. The Inflation Reduction Act continues to drive project economics, with tax credit monetization strategies becoming increasingly sophisticated. MENA markets are opening up with significant government support for renewable infrastructure.',
        image: {
          src: '/images/insights/emerging-tech.jpg',
          alt: 'Emerging Technologies',
          caption: 'Growth projections for energy storage and green hydrogen',
        },
      },
      {
        heading: 'Investment Implications',
        content: 'For institutional investors, 2025 presents a compelling opportunity to deploy capital in renewable infrastructure with improved risk-adjusted returns. We recommend a diversified approach across geographies and technologies, with particular focus on storage and hydrogen opportunities. The combination of policy support, improving economics, and institutional capital availability creates a favorable environment for long-term value creation.',
      },
    ],
    keyTakeaways: [
      'WACC for utility-scale solar has declined to 6.8%, improving project economics',
      'Institutional investors now represent 45% of new capital commitments',
      'Energy storage and green hydrogen are fastest-growing segments',
      'Tax credit monetization strategies are becoming increasingly sophisticated',
      'MENA markets present significant new opportunities for capital deployment',
    ],
  },
  {
    id: 2,
    type: 'Commentary',
    date: 'Jan 12, 2025',
    title: 'IRA Extension: What It Means for Project Economics',
    excerpt: 'Analysis of the extended Investment Tax Credit and its impact on utility-scale solar and wind returns.',
    readTime: '8 min read',
    category: 'Policy',
    featuredImage: {
      src: '/images/insights/ira-extension.jpg',
      alt: 'IRA Extension Impact',
      caption: 'Inflation Reduction Act extension implications for renewable projects',
    },
    author: 'Marcus Rodriguez',
    authorRole: 'VP Project Development',
    sections: [
      {
        heading: 'Policy Update',
        content: 'The recent extension of the Inflation Reduction Act tax credits through 2032 represents a significant policy win for the renewable energy industry. The extension provides certainty for long-term project development and financing, with enhanced provisions for domestic content and prevailing wage compliance.',
      },
      {
        heading: 'Project Economics Impact',
        content: 'For utility-scale solar projects, the extended ITC improves project IRR by 150-200 basis points. Wind projects benefit from the extended PTC, with similar economic improvements. The enhanced domestic content bonus (up to 10%) creates additional value for projects sourcing equipment domestically.',
        image: {
          src: '/images/insights/irr-improvement.jpg',
          alt: 'IRR Improvement',
          caption: 'Project IRR improvement from IRA extension (solar vs. wind)',
        },
      },
      {
        heading: 'Tax Equity Implications',
        content: 'The extended tax credits increase the value of tax equity positions, making these investments more attractive to institutional investors. We expect increased competition for tax equity allocations, potentially compressing returns for tax equity investors but improving overall project economics.',
      },
      {
        heading: 'Strategic Recommendations',
        content: 'Project developers should prioritize domestic content compliance to maximize tax credit value. Refinancing opportunities exist for projects that can increase domestic content post-COD. The extended timeline provides opportunities for larger portfolio acquisitions and consolidation.',
      },
    ],
    keyTakeaways: [
      'ITC extension through 2032 provides long-term policy certainty',
      'Project IRR improves by 150-200 basis points for solar projects',
      'Enhanced domestic content bonus creates additional value',
      'Tax equity positions become more attractive to institutional investors',
      'Refinancing opportunities exist for existing projects',
    ],
  },
  {
    id: 3,
    type: 'Report',
    date: 'Jan 10, 2025',
    title: 'Global Green Hydrogen Market Report',
    excerpt: 'Comprehensive market sizing, cost curves, and investment opportunities in emerging hydrogen infrastructure.',
    readTime: '18 min read',
    category: 'Technology',
    featuredImage: {
      src: '/images/insights/hydrogen-market.jpg',
      alt: 'Green Hydrogen Market',
      caption: 'Global green hydrogen market sizing and growth projections',
    },
    author: 'Dr. Amara Okonkwo',
    authorRole: 'ESG & Impact Director',
    sections: [
      {
        heading: 'Market Overview',
        content: 'The global green hydrogen market is projected to reach $150B by 2030, growing at a CAGR of 45%. Current production capacity stands at 2.5 GW, with 8.5 GW under development. The cost of green hydrogen has declined from $8/kg to $4.50/kg, approaching cost parity with gray hydrogen in favorable markets.',
        image: {
          src: '/images/insights/hydrogen-growth.jpg',
          alt: 'Hydrogen Market Growth',
          caption: 'Green hydrogen market size and growth projections (2020-2030)',
        },
      },
      {
        heading: 'Technology & Cost Curves',
        content: 'Electrolyzer technology continues to improve, with efficiency gains and cost reductions expected to accelerate. PEM and alkaline electrolyzers are the dominant technologies, with solid oxide electrolyzers emerging as a promising alternative. Capital costs are expected to decline from $1,200/kW to $600/kW by 2030.',
        image: {
          src: '/images/insights/electrolyzer-costs.jpg',
          alt: 'Electrolyzer Cost Curves',
          caption: 'Electrolyzer capital cost trajectory and technology comparison',
        },
      },
      {
        heading: 'Regional Opportunities',
        content: 'Europe leads in green hydrogen development with 60% of global capacity under development. MENA region presents significant opportunities due to abundant renewable resources and lower production costs. North America is accelerating development with IRA support and regional hydrogen hubs.',
        image: {
          src: '/images/insights/hydrogen-regions.jpg',
          alt: 'Regional Hydrogen Development',
          caption: 'Green hydrogen capacity by region (current and projected)',
        },
      },
      {
        heading: 'Investment Opportunities',
        content: 'Green hydrogen projects offer attractive risk-adjusted returns, with project IRRs ranging from 8-14% depending on location and end-use. Industrial applications (ammonia, methanol) offer near-term opportunities, while transportation and power generation present longer-term growth potential. Policy support through subsidies and mandates is accelerating deployment.',
      },
      {
        heading: 'Risk Considerations',
        content: 'Key risks include technology maturity, end-use demand uncertainty, and policy changes. Offtake agreements are critical for project viability. Supply chain development for electrolyzers and balance-of-plant equipment remains a constraint. Regulatory frameworks are still evolving in many markets.',
      },
    ],
    keyTakeaways: [
      'Green hydrogen market projected to reach $150B by 2030 (45% CAGR)',
      'Cost of green hydrogen declining to $4.50/kg, approaching gray hydrogen parity',
      'Electrolyzer capital costs expected to decline 50% by 2030',
      'Europe leads with 60% of global capacity under development',
      'Project IRRs range from 8-14% depending on location and end-use',
    ],
  },
  {
    id: 4,
    type: 'Commentary',
    date: 'Jan 8, 2025',
    title: 'European Grid Constraints: Opportunities for Storage',
    excerpt: 'How transmission bottlenecks are creating attractive economics for battery storage deployment.',
    readTime: '10 min read',
    category: 'Market Analysis',
    featuredImage: {
      src: '/images/insights/grid-constraints.jpg',
      alt: 'European Grid Constraints',
      caption: 'European transmission bottlenecks and storage opportunities',
    },
    author: 'Elena Vasquez',
    authorRole: 'Chief Executive Officer',
    sections: [
      {
        heading: 'Grid Constraint Analysis',
        content: 'European transmission networks are experiencing unprecedented congestion as renewable generation increases. Grid constraints in Germany, France, and Spain are creating locational value for battery storage. Curtailment rates have increased to 8-12% in high renewable penetration areas, creating arbitrage opportunities.',
        image: {
          src: '/images/insights/curtailment-rates.jpg',
          alt: 'Curtailment Rates',
          caption: 'Renewable curtailment rates by European region (2024)',
        },
      },
      {
        heading: 'Storage Economics',
        content: 'Battery storage projects in constrained areas are achieving 4-hour round-trip efficiencies of 85-90%, with project IRRs of 10-14%. The combination of energy arbitrage, capacity payments, and ancillary services creates multiple revenue streams. Storage projects are increasingly co-located with renewable generation.',
        image: {
          src: '/images/insights/storage-economics.jpg',
          alt: 'Storage Project Economics',
          caption: 'Battery storage project revenue streams and IRR drivers',
        },
      },
      {
        heading: 'Policy Support',
        content: 'European governments are implementing policies to accelerate storage deployment, including dedicated storage auctions and grid connection priority. The EU Battery Regulation is driving standardization and recycling infrastructure development. National governments are providing subsidies and tax incentives for storage projects.',
      },
      {
        heading: 'Investment Thesis',
        content: 'European battery storage represents a compelling investment opportunity with improving economics, policy support, and growing demand. We recommend a portfolio approach across multiple geographies and storage technologies. Long-term contracts with utilities and industrial offtakers provide revenue stability.',
      },
    ],
    keyTakeaways: [
      'European grid constraints creating 8-12% renewable curtailment rates',
      'Battery storage projects achieving 10-14% IRRs in constrained areas',
      'Multiple revenue streams: energy arbitrage, capacity, ancillary services',
      'Policy support accelerating storage deployment across Europe',
      'Co-location with renewable generation optimizing project economics',
    ],
  },
  {
    id: 5,
    type: 'Research',
    date: 'Jan 5, 2025',
    title: 'Offshore Wind Cost Curve Evolution',
    excerpt: 'Analyzing the trajectory of offshore wind capex and how it impacts project returns.',
    readTime: '14 min read',
    category: 'Technology',
    featuredImage: {
      src: '/images/insights/offshore-wind.jpg',
      alt: 'Offshore Wind Development',
      caption: 'Offshore wind capacity and cost evolution',
    },
    author: 'David Park',
    authorRole: 'Chief Operating Officer',
    sections: [
      {
        heading: 'Market Overview',
        content: 'Global offshore wind capacity reached 57 GW in 2024, with 200+ GW under development. The industry is transitioning from demonstration projects to commercial-scale deployment. Floating offshore wind technology is emerging as a game-changer for deep-water applications.',
        image: {
          src: '/images/insights/offshore-capacity.jpg',
          alt: 'Offshore Wind Capacity',
          caption: 'Global offshore wind capacity by region (2024)',
        },
      },
      {
        heading: 'Cost Curve Trajectory',
        content: 'Offshore wind capex has declined from $4.5M/MW in 2015 to $2.8M/MW in 2024. We project further cost reductions to $2.2M/MW by 2030 through larger turbines, supply chain optimization, and installation efficiency improvements. Floating offshore wind costs are declining faster than fixed-bottom technology.',
        image: {
          src: '/images/insights/capex-trajectory.jpg',
          alt: 'Capex Trajectory',
          caption: 'Offshore wind capex cost curve evolution (2015-2030)',
        },
      },
      {
        heading: 'Technology Advancements',
        content: 'Turbine sizes have increased from 8 MW to 15+ MW, improving capacity factors and reducing per-MW costs. Floating technology enables deployment in deeper waters, opening new markets. Supply chain development is accelerating, with local manufacturing capacity increasing in key markets.',
        image: {
          src: '/images/insights/turbine-evolution.jpg',
          alt: 'Turbine Evolution',
          caption: 'Offshore wind turbine size and capacity factor evolution',
        },
      },
      {
        heading: 'Project Economics',
        content: 'Offshore wind projects are achieving 8-12% IRRs in favorable markets, with capacity factors of 45-55%. The combination of cost reductions and improved capacity factors is making offshore wind competitive with onshore wind in many regions. Long-term power purchase agreements are providing revenue stability.',
      },
      {
        heading: 'Investment Opportunities',
        content: 'Offshore wind presents significant investment opportunities in Europe, Asia, and North America. Floating offshore wind technology is opening new markets in deep-water regions. Supply chain investments in manufacturing and installation services offer attractive returns.',
      },
    ],
    keyTakeaways: [
      'Global offshore wind capacity reached 57 GW in 2024',
      'Capex declined from $4.5M/MW (2015) to $2.8M/MW (2024)',
      'Further cost reductions to $2.2M/MW projected by 2030',
      'Turbine sizes increased to 15+ MW, improving economics',
      'Floating offshore wind enabling deep-water deployment',
    ],
  },
  {
    id: 6,
    type: 'Report',
    date: 'Dec 28, 2024',
    title: 'MENA Renewable Energy Investment Guide',
    excerpt: 'Market overview, regulatory landscape, and investment opportunities across the Middle East and North Africa.',
    readTime: '20 min read',
    category: 'Regional',
    featuredImage: {
      src: '/images/insights/mena-market.jpg',
      alt: 'MENA Renewable Market',
      caption: 'MENA renewable energy market opportunities and growth potential',
    },
    author: 'Sarah Chen',
    authorRole: 'Head of Energy Finance',
    sections: [
      {
        heading: 'Market Overview',
        content: 'The MENA region represents one of the world\'s most attractive renewable energy markets, with abundant solar and wind resources, growing electricity demand, and supportive government policies. Current renewable capacity stands at 12 GW, with 80+ GW under development. The region is transitioning from oil-dependent economies to diversified energy portfolios.',
        image: {
          src: '/images/insights/mena-capacity.jpg',
          alt: 'MENA Capacity',
          caption: 'MENA renewable energy capacity by country (current and projected)',
        },
      },
      {
        heading: 'Regulatory Landscape',
        content: 'Most MENA countries have established renewable energy targets and supportive regulatory frameworks. Saudi Arabia, UAE, and Egypt are leading with aggressive deployment targets. Power purchase agreements are standardized and bankable. Foreign investment is increasingly welcomed with competitive bidding processes.',
        image: {
          src: '/images/insights/regulatory-framework.jpg',
          alt: 'Regulatory Framework',
          caption: 'MENA renewable energy targets and policy support by country',
        },
      },
      {
        heading: 'Investment Opportunities',
        content: 'Utility-scale solar projects are the primary opportunity, with project IRRs of 8-12% in competitive auctions. Wind projects are emerging in Morocco and Egypt. Green hydrogen and desalination projects present longer-term opportunities. Private sector participation is increasing through PPAs and concession agreements.',
        image: {
          src: '/images/insights/investment-opportunities.jpg',
          alt: 'Investment Opportunities',
          caption: 'MENA renewable energy investment opportunities by technology',
        },
      },
      {
        heading: 'Risk Considerations',
        content: 'Key risks include political stability, currency fluctuations, and regulatory changes. Water availability for cooling is a constraint in some regions. Supply chain development for equipment and services is still maturing. Financing availability from local banks is limited, requiring international capital.',
      },
      {
        heading: 'Strategic Recommendations',
        content: 'Investors should focus on countries with strong policy support and established regulatory frameworks (Saudi Arabia, UAE, Egypt, Morocco). Partnerships with local developers and government entities are essential. Long-term PPAs with creditworthy offtakers provide revenue stability. Currency hedging strategies are recommended.',
      },
    ],
    keyTakeaways: [
      'MENA renewable capacity to grow from 12 GW to 92 GW by 2030',
      'Abundant solar and wind resources with strong government support',
      'Utility-scale solar projects achieving 8-12% IRRs',
      'Green hydrogen and desalination emerging as new opportunities',
      'Political stability and regulatory certainty are key success factors',
    ],
  },
];

export const typeColors = {
  Research: 'bg-hydrogen/20 text-hydrogen border-hydrogen/40',
  Commentary: 'bg-solar/20 text-solar border-solar/40',
  Report: 'bg-growth/20 text-growth border-growth/40',
};
