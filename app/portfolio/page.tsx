import dbConnect, { DEMO_MODE } from '@/lib/mongodb';
import Project from '@/models/Project';
import PortfolioClient from './PortfolioClient';
import { demoProjects } from '@/lib/demo-data';

export default async function PortfolioPage() {
  if (!DEMO_MODE) {
    await dbConnect();
  }
  
  const projects = DEMO_MODE ? demoProjects : await Project.find({ status: 'published' })
    .sort({ 'basicInfo.order': 1, updatedAt: -1 })
    .lean();

  const serializedProjects = DEMO_MODE ? projects : projects.map((project: any) => ({
    id: project._id.toString(),
    slug: project.slug,
    name: project.basicInfo?.name || 'Untitled',
    location: `${project.basicInfo?.location?.city || ''}, ${project.basicInfo?.location?.country || ''}`,
    capacity: project.basicInfo?.capacityMW || 0,
    technology: project.basicInfo?.technology || 'solar',
    status: project.basicInfo?.status?.toUpperCase() || 'DEVELOPMENT',
    cod: project.basicInfo?.codDate || 'TBD',
    region: project.basicInfo?.location?.region?.toUpperCase() || 'AMERICAS',
    image: project.media?.heroImage || 'https://images.unsplash.com/photo-1509391366360-2e938aa1ef14?w=800&h=600&fit=crop',
  }));

  return <PortfolioClient projects={serializedProjects as any} />;
}
