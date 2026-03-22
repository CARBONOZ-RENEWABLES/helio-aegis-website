'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function MarketTicker() {
  const [isPaused, setIsPaused] = useState(false);
  const [marketData, setMarketData] = useState<any[]>([]);
  const [selectedData, setSelectedData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isLiveData, setIsLiveData] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    fetchMarketData();
    const interval = setInterval(fetchMarketData, 60000); // Update every 60 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchMarketData = async () => {
    try {
      const response = await fetch('/api/market-data');
      const data = await response.json();
      
      // Check if response includes metadata about data source
      if (response.headers.get('X-Data-Source') === 'live') {
        setIsLiveData(true);
      } else {
        setIsLiveData(false);
      }
      
      setMarketData(data);
      setLastUpdate(new Date());
      if (!selectedData && data.length > 0) {
        setSelectedData(data[0]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch market data:', error);
      setIsLiveData(false);
      setLoading(false);
    }
  };

  if (loading || marketData.length === 0) {
    return (
      <div className="w-full bg-gradient-to-r from-slate-dark via-void to-slate-dark border-y border-white/[0.08] py-12">
        <div className="container-custom text-center text-text-muted">Loading market data...</div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-r from-slate-dark via-void to-slate-dark border-y border-white/[0.08] overflow-hidden">
      {/* Top Bar - Live Indicator & Title */}
      <div className="bg-void/50 backdrop-blur-sm border-b border-white/[0.08] px-6 md:px-12 lg:px-20 py-3">
        <div className="container-custom flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <motion.div
                className={`w-2 h-2 rounded-full ${
                  isLiveData ? 'bg-growth' : 'bg-solar'
                }`}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className={`text-xs font-mono font-semibold uppercase tracking-widest ${
                isLiveData ? 'text-growth' : 'text-solar'
              }`}>
                {isLiveData ? 'Live API Data' : 'Demo Data'}
              </span>
            </div>
            <span className="text-xs text-text-muted">
              {lastUpdate ? `Updated ${lastUpdate.toLocaleTimeString()}` : 'Loading...'}
            </span>
            {!isLiveData && (
              <span className="text-xs px-2 py-1 bg-solar/20 text-solar rounded-sm">
                Configure API key in admin
              </span>
            )}
          </div>
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="text-xs px-3 py-1 bg-white/5 hover:bg-white/10 rounded-sm text-text-secondary transition-colors"
          >
            {isPaused ? 'Resume' : 'Pause'}
          </button>
        </div>
      </div>

      {/* Main Ticker Section */}
      <div className="px-6 md:px-12 lg:px-20 py-6">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Scrolling Ticker */}
            <div className="lg:col-span-2 space-y-4">
              <p className="text-xs text-text-muted uppercase tracking-widest font-semibold">
                Market Overview
              </p>

              {/* Horizontal Scrolling Ticker */}
              <div className="relative overflow-hidden rounded-sm bg-gradient-to-r from-void via-slate-dark/30 to-void border border-white/[0.08]">
                <motion.div
                  className="flex gap-6 px-6 py-6 whitespace-nowrap"
                  animate={{ x: isPaused ? 0 : [0, -2000] }}
                  transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: 'linear',
                    repeatType: 'loop',
                  }}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  {[...marketData, ...marketData].map((item, idx) => (
                    <motion.div
                      key={idx}
                      onClick={() => setSelectedData(item)}
                      className="flex-shrink-0 p-4 bg-white/5 hover:bg-white/10 rounded-sm border border-white/[0.08] hover:border-solar/40 transition-all duration-300 cursor-pointer group"
                      whileHover={{ y: -2 }}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-solar">
                            {item.symbol}
                          </span>
                          <motion.span
                            className={`text-xs font-semibold ${
                              item.trend === 'up' ? 'text-growth' : 'text-alert'
                            }`}
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            {item.trend === 'up' ? '↑' : '↓'} {item.change}
                          </motion.span>
                        </div>
                        <p className="text-xs text-text-muted">{item.label}</p>
                        <div className="flex items-baseline space-x-1">
                          <span className="font-display text-lg text-text-primary">
                            {item.value}
                          </span>
                          <span className="text-xs text-text-muted">{item.unit}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Gradient Overlays */}
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-void to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-void to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Right: Selected Data Detail */}
            <div className="space-y-4">
              <p className="text-xs text-text-muted uppercase tracking-widest font-semibold">
                Selected Metric
              </p>

              <motion.div
                key={selectedData.symbol}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="card p-8 space-y-6"
              >
                {/* Header */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-bold text-solar">
                      {selectedData.symbol}
                    </span>
                    <motion.span
                      className={`text-sm font-semibold px-2 py-1 rounded-sm ${
                        selectedData.trend === 'up'
                          ? 'bg-growth/20 text-growth'
                          : 'bg-alert/20 text-alert'
                      }`}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {selectedData.trend === 'up' ? '↑' : '↓'} {selectedData.change}
                    </motion.span>
                  </div>
                  <h3 className="font-display text-xl text-text-primary">
                    {selectedData.label}
                  </h3>
                </div>

                {/* Value Display */}
                <div className="space-y-2 py-6 border-y border-white/[0.08]">
                  <p className="text-xs text-text-muted uppercase tracking-widest">
                    Current Price
                  </p>
                  <div className="flex items-baseline space-x-2">
                    <span className="font-display text-4xl text-solar">
                      {selectedData.value}
                    </span>
                    <span className="text-lg text-text-secondary">{selectedData.unit}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-text-muted uppercase tracking-widest mb-1">
                      24h Change
                    </p>
                    <p
                      className={`text-lg font-display ${
                        selectedData.trend === 'up' ? 'text-growth' : 'text-alert'
                      }`}
                    >
                      {selectedData.change}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted uppercase tracking-widest mb-1">
                      Status
                    </p>
                    <p className="text-lg font-display text-hydrogen">Active</p>
                  </div>
                </div>

                {/* Action */}
                <button className="btn-secondary w-full text-sm">
                  View Analysis →
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Key Insights */}
      <div className="border-t border-white/[0.08] bg-void/50 backdrop-blur-sm px-6 md:px-12 lg:px-20 py-4">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="flex items-center space-x-3">
              <div className="w-1 h-8 bg-gradient-to-b from-growth to-transparent rounded-full" />
              <div>
                <p className="text-xs text-text-muted uppercase tracking-widest">
                  Market Trend
                </p>
                <p className="text-text-primary font-semibold">Bullish</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-1 h-8 bg-gradient-to-b from-solar to-transparent rounded-full" />
              <div>
                <p className="text-xs text-text-muted uppercase tracking-widest">
                  Volatility
                </p>
                <p className="text-text-primary font-semibold">Moderate</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-1 h-8 bg-gradient-to-b from-hydrogen to-transparent rounded-full" />
              <div>
                <p className="text-xs text-text-muted uppercase tracking-widest">
                  Volume
                </p>
                <p className="text-text-primary font-semibold">High</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
