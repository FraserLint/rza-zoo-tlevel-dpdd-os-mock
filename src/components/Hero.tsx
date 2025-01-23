import Image from 'next/image';

export default function Hero() {
  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden shadow-lg border-2 border-[var(--forest-green)] my-4">
      <Image
        src="/tiger.png"
        alt="Majestic Tiger"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 flex items-end justify-end p-12">
        <div className="bg-[var(--day-card)] p-8 rounded-lg shadow-lg max-w-2xl border-2 border-[var(--darker-brown)]">
          <h1 className="text-5xl font-bold text-[var(--forest-green)] mb-4">Welcome to<br />Riget Zoo Adventures</h1>
          <p className="text-xl text-[var(--day-subtext)]">Captivating creatures. Stunning wildlife. Fun for all the family.</p>
        </div>
      </div>
    </div>
  );
}