import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import PortfolioClient from './PortfolioClient';
import Navigation from '@/components/shared/Navigation';
import Footer from '@/components/shared/Footer';

export default async function PortfolioPage() {
  await dbConnect();
  
  const projects = await Project.find({ status: 'published' })
    .sort({ 'basicInfo.order': 1, updatedAt: -1 })
    .lean();

  const serializedProjects = projects.map((project: any) => ({
    id: project._id.toString(),
    slug: project.slug,
    name: project.basicInfo?.name || 'Untitled',
    location: `${project.basicInfo?.location?.city || ''}, ${project.basicInfo?.location?.country || ''}`,
    capacity: project.basicInfo?.capacityMW || 0,
    technology: project.basicInfo?.technology || 'solar',
    status: project.basicInfo?.status?.toUpperCase() || 'DEVELOPMENT',
    cod: project.basicInfo?.codDate || 'TBD',
    region: project.basicInfo?.location?.region?.toUpperCase() || 'AMERICAS',
    image: project.media?.heroImage || 'https://placehold.co/800x600/1a1a1a/F5A623?text=Project',
  }));

  return (
    <main className="w-full bg-void">
      <Navigation />
      <PortfolioClient projects={serializedProjects as any} />
      <Footer />
    </main>
  );
}
