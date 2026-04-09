import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import LoginForm from './LoginForm';

export default async function AdminLoginPage() {
  const session = await auth();

  if (session) {
    redirect('/admin');
  }

  return <LoginForm />;
}
