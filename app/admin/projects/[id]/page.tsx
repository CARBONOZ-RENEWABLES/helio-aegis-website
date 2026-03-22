import { notFound } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import EditProjectForm from '@/components/admin/EditProjectForm';

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  await dbConnect();
  
  const project = await Project.findById(params.id).lean();
  
  if (!project) {
    notFound();
  }

  return <EditProjectForm project={JSON.parse(JSON.stringify(project))} />;
}
