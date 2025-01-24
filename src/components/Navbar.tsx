'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  id: string;
  fullName: string;
  email: string;
};

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      const response = await fetch('/api/auth/signout', {
        method: 'POST',
      });

      if (response.ok) {
        setUser(null);
        router.push('/');
      }
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  return (
    <nav className="bg-[var(--moss-green)] px-0 py-2 shadow-lg rounded-lg border-4 border-[var(--forest-green)]">
      <div className="max-w-[95%] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Image
            src="/monkey-logo.png"
            alt="Zoo Logo"
            width={70}
            height={70}
            className="object-contain"
          />
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-[var(--day-card)] hover:text-[var(--light-brown)] transition-colors">
              Home
            </Link>
            <button
              onClick={() => {
                const pathname = window.location.pathname;
                if (pathname !== '/') {
                  window.location.href = '/?scrollTo=our-animals';
                } else {
                  document.getElementById('our-animals')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-[var(--day-card)] hover:text-[var(--light-brown)] transition-colors"
            >
              Our Animals
            </button>
            <button
              onClick={() => {
                const pathname = window.location.pathname;
                if (pathname !== '/') {
                  window.location.href = '/?scrollTo=education';
                } else {
                  document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-[var(--day-card)] hover:text-[var(--light-brown)] transition-colors"
            >
              Education
            </button>
            <button
              onClick={() => {
                const pathname = window.location.pathname;
                if (pathname !== '/') {
                  window.location.href = '/?scrollTo=about-us';
                } else {
                  document.getElementById('about-us')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-[var(--day-card)] hover:text-[var(--light-brown)] transition-colors"
            >
              About Us
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <div className="text-[var(--day-card)] flex items-center gap-1">
              Credits: <span className="font-semibold">23</span> 🍌
            </div>
          )}
          <button className="bg-[var(--light-brown)] text-[var(--day-text)] font-bold px-6 py-2 rounded-md hover:bg-[var(--dark-brown)] transition-colors border-4 border-[var(--darker-brown)] shadow-md">
            BOOK NOW
          </button>
          {user ? (
            <div className="flex items-center gap-4">
              <div className="relative" ref={dropdownRef}>
                <div 
                  className="flex items-center gap-2 cursor-pointer text-[var(--day-card)] hover:text-[var(--light-brown)] transition-colors"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className="font-semibold">{user.fullName}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border-4 border-[var(--forest-green)] z-50">
                    <div className="p-4 border-b border-[var(--forest-green)]">
                      <h3 className="text-lg font-bold text-[var(--forest-green)]">User Profile</h3>
                      <p className="text-[var(--day-subtext)]">{user.fullName}</p>
                      <p className="text-[var(--day-subtext)]">{user.email}</p>
                    </div>
                    <div className="p-4">
                      <h4 className="text-md font-bold text-[var(--forest-green)] mb-2">Your Bookings</h4>
                      <div className="space-y-2">
                        <div className="p-2 bg-[var(--light-brown)] rounded-lg">
                          <p className="text-sm font-semibold">Junior Zookeeper Academy</p>
                          <p className="text-xs text-[var(--day-subtext)]">Date: July 15, 2024</p>
                        </div>
                        <div className="p-2 bg-[var(--light-brown)] rounded-lg">
                          <p className="text-sm font-semibold">Wildlife Photography Workshop</p>
                          <p className="text-xs text-[var(--day-subtext)]">Date: August 1, 2024</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={handleSignOut}
                className="text-[var(--forest-green)] hover:text-[var(--dark-brown)] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          ) : (
            <Link
              href="/signin"
              className="text-[var(--day-card)] hover:text-[var(--light-brown)] transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}