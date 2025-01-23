'use client';

import Image from 'next/image';
import AuthForm from '@/components/AuthForm';
import Content from '@/components/Content';

export default function SignUp() {
  const handleSubmit = (data: { fullName: string; email: string; password: string }) => {
    // Handle sign-up logic here
    console.log('Sign up data:', data);
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