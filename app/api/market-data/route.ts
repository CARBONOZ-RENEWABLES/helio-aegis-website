import { NextResponse } from 'next/server';
import dbConnect, { DEMO_MODE } from '@/lib/mongodb';
import Homepage from '@/models/Homepage';

export async function GET() {
  try {
    if (!DEMO_MODE) {
      await dbConnect();
    }
    
    const homepage = DEMO_MODE ? null : await Homepage.findOne();
    const apiKey = homepage?.marketTickerApiKey;

    // Default fallback data
    const fallbackData = [
      {
        symbol: 'SPOT',
        label: 'Solar PV',
        value: '$0.028',
        unit: '/kWh',
        change: '+2.4%',
        trend: 'up',
        color: 'text-growth',
      },
      {
        symbol: 'WIND',
        label: 'Onshore Wind',
        value: '$0.031',
        unit: '/kWh',
        change: '+1.8%',
        trend: 'up',
        color: 'text-hydrogen',
      },
      {
        symbol: 'BESS',
        label: 'Battery Storage',
        value: '$280',
        unit: '/kWh',
        change: '-0.5%',
        trend: 'down',
        color: 'text-solar',
      },
      {
        symbol: 'US10Y',
        label: 'US 10Y Treasury',
        value: '4.62',
        unit: '%',
        change: '+0.12%',
        trend: 'up',
        color: 'text-text-secondary',
      },
      {
        symbol: 'IEX',
        label: 'Green Power Index',
        value: '+2.4',
        unit: '%',
        change: '+0.8%',
        trend: 'up',
        color: 'text-growth',
      },
      {
        symbol: 'ETS',
        label: 'Carbon Credits',
        value: '€72.40',
        unit: '',
        change: '+1.2%',
        trend: 'up',
        color: 'text-solar',
      },
      {
        symbol: 'BRENT',
        label: 'Brent Crude',
        value: '$78.20',
        unit: '/bbl',
        change: '-0.3%',
        trend: 'down',
        color: 'text-text-secondary',
      },
      {
        symbol: 'NATGAS',
        label: 'Natural Gas',
        value: '$3.12',
        unit: '/MMBtu',
        change: '+0.5%',
        trend: 'up',
        color: 'text-hydrogen',
      },
    ];

    if (!apiKey) {
      const response = NextResponse.json(fallbackData);
      response.headers.set('X-Data-Source', 'demo');
      return response;
    }

    // Fetch real market data from Alpha Vantage
    const [brent, natgas, treasury] = await Promise.all([
      fetch(`https://www.alphavantage.co/query?function=WTI&interval=daily&apikey=${apiKey}`).then(r => r.json()).catch(() => null),
      fetch(`https://www.alphavantage.co/query?function=NATURAL_GAS&interval=daily&apikey=${apiKey}`).then(r => r.json()).catch(() => null),
      fetch(`https://www.alphavantage.co/query?function=TREASURY_YIELD&interval=daily&maturity=10year&apikey=${apiKey}`).then(r => r.json()).catch(() => null),
    ]);

    // Parse Alpha Vantage responses
    const brentData = brent?.data?.[0];
    const natgasData = natgas?.data?.[0];
    const treasuryData = treasury?.data?.[0];

    // Check if we got real data
    const hasRealData = brentData || natgasData || treasuryData;

    const marketData = [
      fallbackData[0],
      fallbackData[1],
      fallbackData[2],
      {
        symbol: 'US10Y',
        label: 'US 10Y Treasury',
        value: treasuryData?.value ? parseFloat(treasuryData.value).toFixed(2) : '4.62',
        unit: '%',
        change: '+0.12%',
        trend: 'up',
        color: 'text-text-secondary',
      },
      fallbackData[4],
      fallbackData[5],
      {
        symbol: 'BRENT',
        label: 'Brent Crude',
        value: brentData?.value ? `$${parseFloat(brentData.value).toFixed(2)}` : '$78.20',
        unit: '/bbl',
        change: '-0.3%',
        trend: 'down',
        color: 'text-text-secondary',
      },
      {
        symbol: 'NATGAS',
        label: 'Natural Gas',
        value: natgasData?.value ? `$${parseFloat(natgasData.value).toFixed(2)}` : '$3.12',
        unit: '/MMBtu',
        change: '+0.5%',
        trend: 'up',
        color: 'text-hydrogen',
      },
    ];

    const response = NextResponse.json(marketData);
    response.headers.set('X-Data-Source', hasRealData ? 'live' : 'demo');
    return response;
  } catch (error) {
    console.error('Market data fetch error:', error);
    // Return fallback data on error
    const response = NextResponse.json([
      {
        symbol: 'SPOT',
        label: 'Solar PV',
        value: '$0.028',
        unit: '/kWh',
        change: '+2.4%',
        trend: 'up',
        color: 'text-growth',
      },
      {
        symbol: 'WIND',
        label: 'Onshore Wind',
        value: '$0.031',
        unit: '/kWh',
        change: '+1.8%',
        trend: 'up',
        color: 'text-hydrogen',
      },
      {
        symbol: 'BESS',
        label: 'Battery Storage',
        value: '$280',
        unit: '/kWh',
        change: '-0.5%',
        trend: 'down',
        color: 'text-solar',
      },
      {
        symbol: 'US10Y',
        label: 'US 10Y Treasury',
        value: '4.62',
        unit: '%',
        change: '+0.12%',
        trend: 'up',
        color: 'text-text-secondary',
      },
      {
        symbol: 'IEX',
        label: 'Green Power Index',
        value: '+2.4',
        unit: '%',
        change: '+0.8%',
        trend: 'up',
        color: 'text-growth',
      },
      {
        symbol: 'ETS',
        label: 'Carbon Credits',
        value: '€72.40',
        unit: '',
        change: '+1.2%',
        trend: 'up',
        color: 'text-solar',
      },
      {
        symbol: 'BRENT',
        label: 'Brent Crude',
        value: '$78.20',
        unit: '/bbl',
        change: '-0.3%',
        trend: 'down',
        color: 'text-text-secondary',
      },
      {
        symbol: 'NATGAS',
        label: 'Natural Gas',
        value: '$3.12',
        unit: '/MMBtu',
        change: '+0.5%',
        trend: 'up',
        color: 'text-hydrogen',
      },
    ]);
    response.headers.set('X-Data-Source', 'demo');
    return response;
  }
}
