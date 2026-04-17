import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import LoginForm from './LoginForm';
import { cookies } from 'next/headers';

export default async function AdminLoginPage() {
  try {
    const session = await auth();

    if (session) {
      redirect('/admin');
    }
  } catch (error) {
    // Clear invalid session cookie if JWT decryption fails
    const cookieStore = cookies();
    cookieStore.delete('authjs.session-token');
    cookieStore.delete('__Secure-authjs.session-token');
  }

  return <LoginForm />;
}
