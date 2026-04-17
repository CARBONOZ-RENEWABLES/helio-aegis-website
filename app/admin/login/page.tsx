import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import LoginForm from './LoginForm';

export default async function AdminLoginPage() {
  let session = null;
  
  try {
    session = await auth();
  } catch (error) {
    // JWT decryption failed - ignore and show login form
    console.log('Session validation failed, showing login form');
  }

  if (session) {
    redirect('/admin');
  }

  return <LoginForm />;
}
