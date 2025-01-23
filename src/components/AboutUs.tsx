'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface CarouselItem {
  title: string;
  description: string;
  image: string;
}

const carouselItems: CarouselItem[] = [
  {
    title: 'Our History',
    description: 'Founded in 1985, Riget Zoo Adventures has been a sanctuary for unique and extraordinary creatures. What started as a small family-run facility has grown into one of the most distinctive zoos in the world, known for our commitment to conservation and education.',
    image: '/about_us/our_history.webp'
  },
  {
    title: 'Our Mission',
    description: 'We strive to create a world where wildlife thrives through conservation, education, and providing exceptional care for our unique animal residents. Our goal is to inspire the next generation of wildlife enthusiasts and conservationists.',
    image: '/about_us/our_mission.jpg'
  },
  {
    title: 'Our Team',
    description: 'Our dedicated team of zookeepers, veterinarians, and educators work tirelessly to ensure the well-being of our animals and create engaging experiences for our visitors. Each team member brings unique expertise and passion to our zoo family.',
    image: '/about_us/our_team.webp'
  }
];

export default function AboutUs() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState('right');

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 7000); // Change slide every 7 seconds

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setSlideDirection('right');
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setSlideDirection('left');
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  return (
    <div id="about-us" className="py-8 px-4">
      <div className="bg-white/90 p-8 rounded-lg shadow-lg max-w-xl mx-auto border-4 border-[var(--forest-green)] mb-8">
        <h2 className="text-4xl font-bold text-center text-[var(--day-text)]">About Us</h2>
      </div>
      <div className="relative max-w-4xl mx-auto">
        <div className="bg-white rounded-lg overflow-hidden shadow-lg border-4 border-[var(--forest-green)]">
          <div className="relative overflow-hidden">
            <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {carouselItems.map((item, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="relative h-[300px] md:h-[400px]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-3xl font-bold text-[var(--forest-green)] mb-4">
                      {item.title}
                    </h3>
                    <p className="text-[var(--day-subtext)] text-lg">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center p-4 bg-[var(--dark-brown)]">
            <button
              onClick={prevSlide}
              className="px-6 py-2 bg-[var(--forest-green)] text-white rounded-lg hover:bg-[var(--day-text)] transition-colors"
            >
              Previous
            </button>
            <div className="flex gap-2">
              {carouselItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-[var(--forest-green)]' : 'bg-[var(--day-subtext)]'}`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="px-6 py-2 bg-[var(--forest-green)] text-white rounded-lg hover:bg-[var(--day-text)] transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}