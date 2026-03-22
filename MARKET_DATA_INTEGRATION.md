# Market Data Integration Guide

## Overview
The Market Ticker component fetches live data from `/api/market-data` which can be integrated with real market data APIs.

## Current Setup
- Data refreshes every 60 seconds automatically
- Falls back to mock data if API fails
- Displays loading state while fetching

## Recommended APIs for Real Data

### 1. **Energy Prices (Solar PV, Wind, BESS)**
- **NREL API** (National Renewable Energy Laboratory)
  - Free, no API key required
  - URL: `https://developer.nrel.gov/api/`
  - Provides renewable energy cost data

- **EIA API** (U.S. Energy Information Administration)
  - Free with API key
  - URL: `https://www.eia.gov/opendata/`
  - Provides electricity prices and generation data

### 2. **Treasury Yields (US10Y)**
- **Alpha Vantage**
  - Free tier: 25 requests/day
  - URL: `https://www.alphavantage.co/`
  - Endpoint: `TREASURY_YIELD`

- **FRED API** (Federal Reserve Economic Data)
  - Free with API key
  - URL: `https://fred.stlouisfed.org/docs/api/`
  - Series ID: `DGS10` for 10-year treasury

### 3. **Carbon Credits (ETS)**
- **ICE Data Services**
  - Paid service
  - Provides EU ETS carbon prices

- **Ember Climate**
  - Free data portal
  - URL: `https://ember-climate.org/data/`

### 4. **Oil & Gas (BRENT, NATGAS)**
- **Alpha Vantage**
  - Symbol: `BRENT` for Brent Crude
  - Symbol: `NATURAL_GAS` for Natural Gas

- **Yahoo Finance API** (Unofficial)
  - Free, no key required
  - Symbol: `BZ=F` for Brent Crude
  - Symbol: `NG=F` for Natural Gas

## Implementation Example

### Step 1: Add API Keys to Environment Variables

Create `.env.local`:
```env
ALPHA_VANTAGE_API_KEY=your_key_here
EIA_API_KEY=your_key_here
FRED_API_KEY=your_key_here
```

### Step 2: Update `/app/api/market-data/route.ts`

```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch US Treasury 10Y
    const treasuryRes = await fetch(
      `https://api.stlouisfed.org/fred/series/observations?series_id=DGS10&api_key=${process.env.FRED_API_KEY}&file_type=json&limit=1&sort_order=desc`
    );
    const treasuryData = await treasuryRes.json();
    const treasuryYield = treasuryData.observations[0].value;

    // Fetch Brent Crude
    const brentRes = await fetch(
      `https://www.alphavantage.co/query?function=BRENT&interval=daily&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
    );
    const brentData = await brentRes.json();
    const brentPrice = brentData.data[0].value;

    // Fetch Natural Gas
    const gasRes = await fetch(
      `https://www.alphavantage.co/query?function=NATURAL_GAS&interval=daily&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
    );
    const gasData = await gasRes.json();
    const gasPrice = gasData.data[0].value;

    const marketData = [
      {
        symbol: 'US10Y',
        label: 'US 10Y Treasury',
        value: treasuryYield,
        unit: '%',
        change: calculateChange(treasuryYield, previousValue),
        trend: treasuryYield > previousValue ? 'up' : 'down',
      },
      {
        symbol: 'BRENT',
        label: 'Brent Crude',
        value: `$${brentPrice}`,
        unit: '/bbl',
        change: calculateChange(brentPrice, previousValue),
        trend: brentPrice > previousValue ? 'up' : 'down',
      },
      // ... more data points
    ];

    return NextResponse.json(marketData);
  } catch (error) {
    console.error('Market data fetch error:', error);
    // Return cached/fallback data
    return NextResponse.json(getFallbackData());
  }
}
```

### Step 3: Add Caching (Recommended)

Use Redis or in-memory cache to avoid hitting rate limits:

```typescript
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
});

export async function GET() {
  // Check cache first
  const cached = await redis.get('market-data');
  if (cached) {
    return NextResponse.json(cached);
  }

  // Fetch fresh data
  const data = await fetchMarketData();
  
  // Cache for 60 seconds
  await redis.setex('market-data', 60, JSON.stringify(data));
  
  return NextResponse.json(data);
}
```

## Testing

1. Start with mock data (current setup)
2. Add one API at a time
3. Test error handling
4. Monitor API rate limits
5. Add caching layer

## Notes

- **Rate Limits**: Most free APIs have rate limits (5-25 requests/day)
- **Caching**: Essential to avoid hitting limits
- **Fallback**: Always have mock data as fallback
- **Error Handling**: Gracefully handle API failures
- **Cost**: Consider paid tiers for production use

## Alternative: Admin-Managed Data

If real-time APIs are too complex/expensive, keep the admin-managed system in `/admin/homepage` where admins can manually update values daily.
