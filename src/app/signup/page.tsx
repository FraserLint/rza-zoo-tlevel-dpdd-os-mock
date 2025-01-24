'use client';

import Image from 'next/image';
import AuthForm from '@/components/AuthForm';
import Content from '@/components/Content';

export default function SignUp() {
  const handleSubmit = async (data: { fullName: string; email: string; password: string }) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to sign up');
      }

      // Redirect to home page after successful signup
      window.location.href = '/';
    } catch (error) {
      console.error('Signup error:', error);
      alert(error instanceof Error ? error.message : 'Failed to sign up');
    }
  };

  return (
    <>
        <div className="my-4"></div>
        <Content>
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-lg overflow-hidden shadow-lg border-4 border-[var(--forest-green)]">
                    <div className="grid md:grid-cols-2 gap-0">
                        <div className="flex items-center justify-center p-8">
                            <AuthForm mode="signup" onSubmit={handleSubmit} />
                        </div>
                        <div className="relative hidden md:block border-l-4 border-[var(--forest-green)]" style={{ minHeight: '100%' }}>
                            <Image
                                src="/signup/bigpic.jpg"
                                alt="Giraffe feeding experience"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Content>
    </>
  );
}