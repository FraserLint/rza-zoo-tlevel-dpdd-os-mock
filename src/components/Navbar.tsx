import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-[var(--forest-green)] px-4 py-2 shadow-lg">
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
        </div>
      </div>
    </nav>
  );
}