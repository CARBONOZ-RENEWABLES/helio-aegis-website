'use client';

import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DeleteProjectButton({ projectId, projectName }: { projectId: string; projectName: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${projectName}"?`)) return;

    try {
      const response = await fetch(`/api/admin/projects/${projectId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.refresh();
      } else {
        alert('Failed to delete project');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="rounded-sm p-2 text-text-muted hover:bg-red-500/10 hover:text-red-400 transition-colors"
      title="Delete"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
