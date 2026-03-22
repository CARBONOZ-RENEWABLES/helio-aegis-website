import dbConnect from '@/lib/mongodb';
import TeamMember from '@/models/TeamMember';
import TeamMemberForm from '@/components/admin/TeamMemberForm';
import { notFound } from 'next/navigation';

export default async function EditTeamMemberPage({ params }: { params: { id: string } }) {
  await dbConnect();
  const teamMember = await TeamMember.findById(params.id).lean();

  if (!teamMember) {
    notFound();
  }

  return <TeamMemberForm teamMember={JSON.parse(JSON.stringify(teamMember))} />;
}
