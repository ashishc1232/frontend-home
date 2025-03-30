'use client'
import { useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import LoginForm from "../components/log-in-form";
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push('/shop');
  }, [user, router]);

  return <LoginForm />;
}