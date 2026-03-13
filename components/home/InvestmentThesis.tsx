'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';

const tabs = [
  {
    id: 'track-record',
    label: 'Track Record',
    content: {
      title: 'Proven Performance',
      description: 'Our funds have delivered consistent returns across market cycles.',
      metrics: [
        { label: 'Net IRR Range', value: '8-12%' },
        { label: 'TVPI Range', value: '1.3x - 1.8x' },
        { label: 'Avg Hold Period', value: '7-10 years' },
      ],
    },
  },
  {
    id: 'risk-management',
    label: 'Risk Management',
    content: {
      title: 'Institutional Risk Controls',
      description: 'Comprehensive risk mitigation across portfolio and counterparty levels.',
      metrics: [
        { label: 'PPA Coverage', value: '85%+' },
        { label: 'Counterparty Diversity', value: '40+ partners' },
        { label: 'Avg Credit Rating', value: 'A-/A3' },
      ],
    },
  },
  {
    id: 'pipeline',
    label: 'Pipeline',
    content: {
      title: 'Robust Development Pipeline',
      description: 'Strong deal flow across all technologies and geographies.',
      metrics: [
        { label: 'Identified Opportunities', value: '45 GW' },
        { label: 'Active Development', value: '12 GW' },
        { label: 'Expected Deployment', value: '$8B+ (3yr)' },
      ],
    },
  },
  {
    id: 'esg',
    label: 'ESG',
    content: {
      title: 'ESG Leadership',
      description: 'Aligned with UN SDGs and global climate commitments.',
      metrics: [
        { label: 'CO2 Avoided (Annual)', value: '2.8M tonnes' },
        { label: 'GRESB Rating', value: '5-Star' },
        { label: 'UN PRI Signatory', value: 'Yes' },
      ],
    },
  },
];

export default function InvestmentThesis() {
  const [activeTab, setActiveTab] = useState('track-record');
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const activeContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <section ref={ref} className="section-padding bg-slate-dark relative">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Sticky Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-8"
          >
            <div className="eyebrow">Investment Case</div>
            <h2 className="font-display text-3xl md:text-4xl leading-tight text-text-primary">
              Built for institutional capital at every stage.
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              Our integrated project management and energy finance model creates superior
              risk-adjusted returns. We combine deep sector expertise with proprietary
              technology to execute complex transactions at scale.
            </p>

            {/* Key Differentiators */}
            <div className="space-y-4 pt-4">
              {[
                { icon: '✓', text: 'Integrated PM + Finance model' },
                { icon: '✓', text: 'Proprietary deal sourcing' },
                { icon: '✓', text: 'Institutional-grade governance' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <span className="text-solar text-lg flex-shrink-0">{item.icon}</span>
                  <span className="text-text-secondary">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Tabbed Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col space-y-8"
          >
            {/* Tab Buttons */}
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-sm font-semibold text-sm transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-solar text-void'
                      : 'bg-white/5 text-text-secondary hover:bg-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="card p-8 space-y-6"
            >
              <div>
                <h3 className="font-display text-2xl text-text-primary mb-2">
                  {activeContent?.title}
                </h3>
                <p className="text-text-secondary">{activeContent?.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/[0.08]">
                {activeContent?.metrics.map((metric, idx) => (
                  <div key={idx}>
                    <p className="text-xs text-text-muted tracking-widest uppercase mb-2">
                      {metric.label}
                    </p>
                    <p className="text-2xl font-display text-solar">{metric.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
