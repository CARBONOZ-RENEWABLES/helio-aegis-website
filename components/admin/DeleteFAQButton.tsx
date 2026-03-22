'use client';

import { useRouter } from 'next/navigation';

export default function DeleteFAQButton({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Delete this FAQ?')) return;

    const res = await fetch(`/api/faq/${id}`, { method: 'DELETE' });
    if (res.ok) {
      router.refresh();
    } else {
      alert('Failed to delete FAQ');
    }
  };

  return (
    <button onClick={handleDelete} className="text-alert hover:text-alert/80 text-sm px-4 py-2">
      Delete
    </button>
  );
}
