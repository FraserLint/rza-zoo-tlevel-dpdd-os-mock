"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="bg-[var(--moss-green)] px-4 py-2 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
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
            <Link href="/our-animals" className="text-[var(--day-card)] hover:text-[var(--light-brown)] transition-colors">
              Our Animals
            </Link>
            <Link href="/education" className="text-[var(--day-card)] hover:text-[var(--light-brown)] transition-colors">
              Education
            </Link>
            <Link href="/about-us" className="text-[var(--day-card)] hover:text-[var(--light-brown)] transition-colors">
              About Us
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-[var(--day-card)] flex items-center gap-1">
            Credits: <span className="font-semibold">23</span> 🍌
          </div>
          <button className="bg-[var(--light-brown)] text-[var(--day-text)] px-6 py-2 rounded-md hover:bg-[var(--dark-brown)] transition-colors border-2 border-[var(--darker-brown)] shadow-md">
            BOOK NOW
          </button>
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[var(--darker-brown)] cursor-pointer shadow-md">
                <Image
                  src="/temp_profile_pic.png"
                  alt="Profile"
                  layout="fill"
                  objectFit="cover"
                />
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