'use client';

import Image from 'next/image';
import AuthForm from '@/components/AuthForm';
import Content from '@/components/Content';

export default function SignIn() {
  const handleSubmit = async (data: { fullName: string; email: string; password: string }) => {
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to sign in');
      }

      // Redirect to home page after successful signin
      window.location.href = '/';
    } catch (error) {
      console.error('Signin error:', error);
      alert(error instanceof Error ? error.message : 'Failed to sign in');
    }
  };

  return (
    <>
        <div className="my-4"></div>
        <Content>
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-lg overflow-hidden shadow-lg border-4 border-[var(--forest-green)]">
                    <div className="grid md:grid-cols-2 gap-0">
                        <div className="relative h-[600px] hidden md:block border-r-4 border-[var(--forest-green)]">
                            <Image
                                src="/signin/bigpic.png"
                                alt="Baby Giraffe feeding experience"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex items-center justify-center p-8">
                            <AuthForm mode="signin" onSubmit={handleSubmit} />
                        </div>
                    </div>
                </div>
            </div>
        </Content>
    </>
  );
}