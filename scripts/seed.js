const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/helio-aegis';

const projectSchema = new mongoose.Schema({
  slug: String,
  status: String,
  basicInfo: {
    name: String,
    featured: Boolean,
    order: Number,
    capacityMW: Number,
    location: {
      city: String,
      country: String,
      region: String
    },
    technology: String,
    status: String,
    codDate: String,
    shortDescription: String
  },
  media: {
    heroImage: String
  },
  technicalSpecs: {
    annualGenerationMWh: Number,
    homesPowered: Number,
    co2AvoidedTonnes: Number
  }
});

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

const sampleProjects = [
  {
    slug: 'solara-desert-solar',
    status: 'published',
    basicInfo: {
      name: 'Solara Desert Solar',
      featured: true,
      order: 1,
      capacityMW: 450,
      location: { city: 'Phoenix', country: 'USA', region: 'AMERICAS' },
      technology: 'solar',
      status: 'OPERATIONAL',
      codDate: '2023-Q2',
      shortDescription: 'Utility-scale solar facility in Arizona'
    },
    media: {
      heroImage: '/images/placeholders/solar.svg'
    },
    technicalSpecs: {
      annualGenerationMWh: 950000,
      homesPowered: 85000,
      co2AvoidedTonnes: 425000
    }
  },
  {
    slug: 'nordic-wind-farm',
    status: 'published',
    basicInfo: {
      name: 'Nordic Wind Farm',
      featured: true,
      order: 2,
      capacityMW: 380,
      location: { city: 'Oslo', country: 'Norway', region: 'EUROPE' },
      technology: 'wind',
      status: 'OPERATIONAL',
      codDate: '2023-Q4',
      shortDescription: 'Offshore wind installation in North Sea'
    },
    media: {
      heroImage: '/images/placeholders/wind.svg'
    },
    technicalSpecs: {
      annualGenerationMWh: 1200000,
      homesPowered: 110000,
      co2AvoidedTonnes: 550000
    }
  },
  {
    slug: 'sahara-solar-complex',
    status: 'published',
    basicInfo: {
      name: 'Sahara Solar Complex',
      featured: true,
      order: 3,
      capacityMW: 600,
      location: { city: 'Ouarzazate', country: 'Morocco', region: 'AFRICA' },
      technology: 'solar',
      status: 'CONSTRUCTION',
      codDate: '2025-Q1',
      shortDescription: 'Large-scale solar project in North Africa'
    },
    media: {
      heroImage: '/images/placeholders/solar.svg'
    },
    technicalSpecs: {
      annualGenerationMWh: 1500000,
      homesPowered: 140000,
      co2AvoidedTonnes: 700000
    }
  },
  {
    slug: 'texas-battery-storage',
    status: 'published',
    basicInfo: {
      name: 'Texas Battery Storage',
      featured: true,
      order: 4,
      capacityMW: 250,
      location: { city: 'Houston', country: 'USA', region: 'AMERICAS' },
      technology: 'storage',
      status: 'DEVELOPMENT',
      codDate: '2025-Q3',
      shortDescription: 'Grid-scale battery energy storage system'
    },
    media: {
      heroImage: '/images/placeholders/storage.svg'
    },
    technicalSpecs: {
      annualGenerationMWh: 500000,
      homesPowered: 45000,
      co2AvoidedTonnes: 225000
    }
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    await Project.deleteMany({});
    console.log('Cleared existing projects');

    await Project.insertMany(sampleProjects);
    console.log(`Seeded ${sampleProjects.length} projects`);

    await mongoose.connection.close();
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
