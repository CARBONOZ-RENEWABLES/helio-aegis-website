import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import FeaturedProjectsClient from './FeaturedProjectsClient';

export default async function FeaturedProjects() {
  await dbConnect();
  
  const projects = await Project.find({ 
    status: 'published',
    'basicInfo.featured': true 
  })
    .sort({ 'basicInfo.order': 1 })
    .limit(4)
    .lean();

  const serializedProjects = projects.map((project: any) => ({
    id: project._id.toString(),
    slug: project.slug,
    name: project.basicInfo?.name || 'Untitled',
    location: `${project.basicInfo?.location?.city || ''}, ${project.basicInfo?.location?.country || ''}`,
    capacity: `${project.basicInfo?.capacityMW || 0} MW`,
    technology: getTechnologyLabel(project.basicInfo?.technology),
    status: project.basicInfo?.status?.toUpperCase() || 'DEVELOPMENT',
    cod: project.basicInfo?.codDate || 'TBD',
    image: project.media?.heroImage || 'https://images.unsplash.com/photo-1509391366360-2e938aa1ef14?w=800&h=600&fit=crop',
    description: project.basicInfo?.shortDescription || '',
    stats: {
      generation: project.technicalSpecs?.annualGenerationMWh 
        ? `${(project.technicalSpecs.annualGenerationMWh / 1000).toFixed(0)} GWh/year`
        : 'N/A',
      homes: project.technicalSpecs?.homesPowered 
        ? `${(project.technicalSpecs.homesPowered / 1000).toFixed(0)}K`
        : 'N/A',
      co2: project.technicalSpecs?.co2AvoidedTonnes 
        ? `${(project.technicalSpecs.co2AvoidedTonnes / 1000).toFixed(0)}K tonnes/year`
        : 'N/A',
    },
  }));

  return <FeaturedProjectsClient projects={serializedProjects} />;
}

function getTechnologyLabel(tech: string): string {
  const labels: Record<string, string> = {
    solar: 'Utility-Scale Solar',
    wind: 'Offshore Wind',
    storage: 'Battery Storage',
    hydrogen: 'Green Hydrogen',
    hybrid: 'Hybrid System',
  };
  return labels[tech] || 'Renewable Energy';
}
