'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';

interface Metric {
  label: string;
  value: string;
}

interface Tab {
  id: string;
  label: string;
  title: string;
  content: string;
  metrics?: Metric[];
}

interface InvestmentData {
  eyebrowText: string;
  headline: string;
  bodyText: string;
  features: string[];
  tabs: Tab[];
}

export default function InvestmentThesisClient({ data }: { data: InvestmentData }) {
  const [activeTab, setActiveTab] = useState(data.tabs[0]?.id || 'track-record');
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  if (!data || !data.tabs || data.tabs.length === 0) {
    return null;
  }

  const activeContent = data.tabs.find((tab) => tab.id === activeTab);

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
            <div className="eyebrow">{data.eyebrowText}</div>
            <h2>
              <span className="bg-gradient-to-r from-solar via-solar to-hydrogen bg-clip-text text-transparent">
                {data.headline}
              </span>
            </h2>
            <p className="subheadline text-text-secondary leading-relaxed">
              {data.bodyText}
            </p>

            {/* Key Differentiators */}
            <div className="space-y-4 pt-4">
              {data.features.map((feature, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <span className="text-solar text-lg flex-shrink-0">✓</span>
                  <span className="text-text-secondary">{feature}</span>
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
              {data.tabs.map((tab) => (
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
                <h3>
                  {activeContent?.title}
                </h3>
                <p className="text-text-secondary">{activeContent?.content}</p>
              </div>

              {activeContent?.metrics && activeContent.metrics.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/[0.08]">
                  {activeContent.metrics.map((metric, idx) => (
                    <div key={idx}>
                      <p className="text-xs text-text-muted tracking-widest uppercase mb-2">
                        {metric.label}
                      </p>
                      <p className="text-2xl font-display text-solar">{metric.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
