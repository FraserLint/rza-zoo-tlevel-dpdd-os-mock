'use client';

import Image from 'next/image';
import AuthForm from '@/components/AuthForm';
import Content from '@/components/Content';

export default function SignIn() {
  const handleSubmit = (data: { fullName: string; email: string; password: string }) => {
    // Handle sign-in logic here
    console.log('Sign in data:', data);
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