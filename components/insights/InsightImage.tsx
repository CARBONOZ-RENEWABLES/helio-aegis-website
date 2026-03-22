'use client';

import { useState } from 'react';

interface InsightImageProps {
  src: string;
  alt: string;
  caption: string;
  className?: string;
  priority?: boolean;
}

const imageIcons = {
  'renewable-finance-2025.jpg': '📊',
  'capital-deployment.jpg': '💰',
  'interest-rates.jpg': '📈',
  'investor-allocation.jpg': '🏦',
  'emerging-tech.jpg': '⚡',
  'ira-extension.jpg': '🏛️',
  'irr-improvement.jpg': '📊',
  'hydrogen-market.jpg': '🔋',
  'hydrogen-growth.jpg': '📈',
  'electrolyzer-costs.jpg': '⚙️',
  'hydrogen-regions.jpg': '🌍',
  'grid-constraints.jpg': '🔌',
  'curtailment-rates.jpg': '📊',
  'storage-economics.jpg': '🔋',
  'offshore-wind.jpg': '🌊',
  'offshore-capacity.jpg': '📊',
  'capex-trajectory.jpg': '📉',
  'turbine-evolution.jpg': '🌪️',
  'mena-market.jpg': '🏜️',
  'mena-capacity.jpg': '📊',
  'regulatory-framework.jpg': '📋',
  'investment-opportunities.jpg': '💼',
};

export default function InsightImage({ src, alt, caption, className = '', priority = false }: InsightImageProps) {
  const [imageError, setImageError] = useState(false);
  
  const filename = src.split('/').pop() || '';
  const icon = imageIcons[filename as keyof typeof imageIcons] || '📊';
  
  const handleImageError = () => {
    setImageError(true);
  };

  if (imageError || !src.startsWith('http')) {
    return (
      <div className={`relative bg-slate-dark border border-white/[0.08] rounded-lg overflow-hidden flex items-center justify-center ${className}`}>
        <div className="text-center space-y-3 p-8">
          <div className="w-16 h-16 bg-solar/20 rounded-lg flex items-center justify-center mx-auto">
            <span className="text-3xl">{icon}</span>
          </div>
          <div className="space-y-1">
            <p className="text-text-primary font-medium text-sm">{alt}</p>
            <p className="text-text-muted text-xs">{caption}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onError={handleImageError}
        loading={priority ? 'eager' : 'lazy'}
      />
    </div>
  );
}