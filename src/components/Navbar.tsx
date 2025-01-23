"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
          {isLoggedIn && (
            <div className="text-[var(--day-card)] flex items-center gap-1">
              Credits: <span className="font-semibold">23</span> 🍌
            </div>
          )}
          <button className="bg-[var(--light-brown)] text-[var(--day-text)] px-6 py-2 rounded-md hover:bg-[var(--dark-brown)] transition-colors border-4 border-[var(--darker-brown)] shadow-md">
            BOOK NOW
          </button>
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <div className="relative" ref={dropdownRef}>
                <div 
                  className="relative w-14 h-14 rounded-full overflow-hidden border-4 border-[var(--darker-brown)] cursor-pointer shadow-md"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <Image
                    src="/temp_profile_pic.png"
                    alt="Profile"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border-4 border-[var(--forest-green)] z-50">
                    <div className="p-4 border-b border-[var(--forest-green)]">
                      <h3 className="text-lg font-bold text-[var(--forest-green)]">User Profile</h3>
                      <p className="text-[var(--day-subtext)]">John Doe</p>
                      <p className="text-[var(--day-subtext)]">john.doe@example.com</p>
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
                onClick={() => setIsLoggedIn(false)}
                className="text-[var(--forest-green)] hover:text-[var(--dark-brown)] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsLoggedIn(true)}
              className="text-[var(--day-card)] hover:text-[var(--light-brown)] transition-colors"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}