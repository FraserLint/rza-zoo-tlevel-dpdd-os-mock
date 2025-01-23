import Image from 'next/image';

interface EducationProgram {
  title: string;
  description: string;
  icon: string;
  features: string[];
}

const programs: EducationProgram[] = [
  {
    title: 'Junior Zookeeper Academy',
    description: 'A hands-on program where children learn about animal care, conservation, and wildlife biology through interactive sessions.',
    icon: '/globe.svg',
    features: ['Ages 8-12', 'Weekly Sessions', 'Hands-on Experience', 'Certificate Awarded']
  },
  {
    title: 'Wildlife Photography Workshop',
    description: 'Learn the art of wildlife photography from our expert photographers while capturing amazing moments with our animals.',
    icon: '/window.svg',
    features: ['All Skill Levels', 'Camera Provided', 'Monthly Classes', 'Photo Exhibition']
  },
  {
    title: 'Conservation Classes',
    description: 'Discover the importance of wildlife conservation and learn how you can contribute to protecting endangered species.',
    icon: '/file.svg',
    features: ['Interactive Lectures', 'Field Activities', 'Research Projects', 'Community Outreach']
  }
];

export default function Education() {
  return (
    <div id="education" className="py-8 px-4">
      <div className="bg-white/90 p-8 rounded-lg shadow-lg max-w-xl mx-auto border-4 border-[var(--forest-green)] mb-8">
        <h2 className="text-4xl font-bold text-center text-[var(--day-text)]">Educational Programs</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((program, index) => (
          <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg border-4 border-[var(--forest-green)] transition-transform hover:scale-105">
            <div className="p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-16 h-16">
                  <Image
                    src={program.icon}
                    alt={program.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[var(--forest-green)] mb-2 text-center">{program.title}</h3>
              <p className="text-[var(--day-subtext)] mb-4">{program.description}</p>
              <div className="border-t-2 border-[var(--forest-green)] pt-4">
                <ul className="grid grid-cols-2 gap-2">
                  {program.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-[var(--day-subtext)] text-sm flex items-center">
                      <span className="w-2 h-2 bg-[var(--forest-green)] rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}