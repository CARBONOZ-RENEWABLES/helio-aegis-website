import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '..', '.env.local') });

import User from '../models/User.js';
import Homepage from '../models/Homepage.js';
import { Metric } from '../models/AuditLog.js';

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('✓ Connected to MongoDB');

    // Create initial super admin
    const existingAdmin = await User.findOne({ email: process.env.INITIAL_ADMIN_EMAIL });
    if (!existingAdmin) {
      await User.create({
        email: process.env.INITIAL_ADMIN_EMAIL,
        name: 'Super Admin',
        role: 'super_admin',
        hashedPassword: await bcrypt.hash(process.env.INITIAL_ADMIN_PASSWORD!, 12),
        isActive: true,
        permissions: {
          canPublish: true,
          canDeleteContent: true,
          canManageUsers: true,
          canViewAnalytics: true,
          editableModules: ['all']
        },
        createdBy: 'system'
      });
      console.log('✓ Created super admin user');
    }

    // Create initial homepage document
    const existingHomepage = await Homepage.findOne();
    if (!existingHomepage) {
      await Homepage.create({
        hero: {
          eyebrowText: 'ENERGY FINANCE & PROJECT MANAGEMENT',
          headlineLine1: 'Structuring the',
          headlineLine2: 'Clean Energy Future',
          subheadline: 'We originate, finance, and deliver utility-scale renewable infrastructure across North America, Europe, and MENA.',
          primaryCTALabel: 'Explore Our Portfolio',
          primaryCTAHref: '/portfolio',
          secondaryCTALabel: 'Investment Deck',
          secondaryCTAHref: '/investors'
        },
        metrics: [
          { value: '$12B+', label: 'Capital Deployed', suffix: 'Since inception', order: 1 },
          { value: '18.2 GW', label: 'Capacity Managed', order: 2 },
          { value: '340+', label: 'Projects Closed', order: 3 },
          { value: '2.8M', label: 'Homes Powered', order: 4 }
        ],
        capabilities: [
          {
            title: 'Project Development',
            description: 'End-to-end development from site acquisition to commercial operation',
            href: '/capabilities/development',
            iconName: 'Layers',
            order: 1
          },
          {
            title: 'Energy Finance',
            description: 'Structured finance solutions for utility-scale renewable projects',
            href: '/capabilities/finance',
            iconName: 'TrendingUp',
            order: 2
          }
        ],
        portfolioSection: {
          headline: 'Portfolio Impact',
          subheadline: 'Delivering measurable results across three continents'
        },
        investmentSection: {
          eyebrowText: 'INVESTMENT THESIS',
          headline: 'Why Renewable Infrastructure',
          bodyText: 'Renewable energy infrastructure offers institutional investors stable, long-term cash flows backed by power purchase agreements with investment-grade counterparties.'
        },
        insightsSection: {
          headline: 'Market Intelligence',
          subheadline: 'Analysis and insights from our investment team'
        },
        partnersSection: {
          headline: 'Trusted by leading institutions'
        },
        finalCTA: {
          headline: 'Partner With Us',
          subheadline: 'Explore investment opportunities in renewable infrastructure',
          primaryCTALabel: 'Schedule a Meeting',
          primaryCTAHref: '/contact',
          secondaryCTALabel: 'Download Investment Deck',
          secondaryCTAHref: '/downloads/deck.pdf',
          trustSignal1: '$12B+ Capital Deployed',
          trustSignal2: '340+ Projects Closed',
          trustSignal3: '96% On-Time Delivery'
        },
        seo: {
          metaTitle: 'Helio Aegis - Renewable Energy Finance & Project Management',
          metaDescription: 'Leading renewable energy project management and finance company. $12B+ capital deployed across 340+ utility-scale projects.',
          ogImage: ''
        },
        status: 'draft',
        lastEditedBy: process.env.INITIAL_ADMIN_EMAIL!
      });
      console.log('✓ Created homepage document');
    }

    // Create initial metrics
    const existingMetrics = await Metric.countDocuments();
    if (existingMetrics === 0) {
      const metricsData = [
        { key: 'capital_deployed', label: 'Capital Deployed', value: '12.4B', prefix: '$', suffix: '+', context: 'Since inception', iconName: 'DollarSign', showOn: ['homepage', 'investors'], order: 1 },
        { key: 'gw_managed', label: 'Capacity Managed', value: '18.2', suffix: ' GW', iconName: 'Zap', showOn: ['homepage', 'about'], order: 2 },
        { key: 'projects_closed', label: 'Projects Closed', value: '340', suffix: '+', iconName: 'CheckCircle', showOn: ['homepage', 'about', 'investors'], order: 3 },
        { key: 'homes_powered', label: 'Homes Powered', value: '2.8M', iconName: 'Home', showOn: ['homepage'], order: 4 },
        { key: 'on_time_delivery', label: 'On-Time Delivery', value: '96', suffix: '%', iconName: 'Clock', showOn: ['homepage', 'investors'], order: 5 }
      ];
      await Metric.insertMany(metricsData.map(m => ({ ...m, lastEditedBy: process.env.INITIAL_ADMIN_EMAIL })));
      console.log('✓ Created initial metrics');
    }

    console.log('\n✅ Database seeded successfully');
    console.log(`\nLogin credentials:`);
    console.log(`Email: ${process.env.INITIAL_ADMIN_EMAIL}`);
    console.log(`Password: ${process.env.INITIAL_ADMIN_PASSWORD}`);
    console.log(`\n⚠️  Change password immediately after first login!`);

  } catch (error) {
    console.error('❌ Seed failed:', error);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
