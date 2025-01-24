'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function BookPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (!response.ok) {
          // Store the current path before redirecting
          const returnUrl = encodeURIComponent('/book');
          router.push(`/signin?returnUrl=${returnUrl}`);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        const returnUrl = encodeURIComponent('/book');
        router.push(`/signin?returnUrl=${returnUrl}`);
      }
    };

    checkAuth();
  }, [router]);

  return (
    <div className="py-8 px-4">
      <div className="bg-white/90 p-8 rounded-lg shadow-lg max-w-xl mx-auto border-4 border-[var(--forest-green)] mb-8">
        <h2 className="text-4xl font-bold text-center text-[var(--day-text)]">Book Your Visit</h2>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg border-4 border-[var(--forest-green)] p-8">
        {/* Booking content will be added here */}
      </div>
    </div>
  );
}