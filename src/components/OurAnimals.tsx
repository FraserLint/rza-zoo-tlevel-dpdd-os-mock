import Image from 'next/image';

interface AnimalCard {
  name: string;
  image: string;
  description: string;
}

const animals: AnimalCard[] = [
  {
    name: 'Akibidi Toilet',
    image: '/animals/akibidi_toilet.png',
    description: 'Our resident plumbing expert who spends most of his time giving unsolicited advice about proper toilet etiquette to zoo visitors.'
  },
  {
    name: 'Mogua Jawshaw',
    image: '/animals/mogua_jawshaw.png',
    description: 'A mysterious creature known for its perfectly framed face and tendency to judge other animals\'s fashion choices through designer glasses.'
  },
  {
    name: 'Tommy Wommy',
    image: '/animals/tommy_wommy.png',
    description: 'The zoo\'s fitness enthusiast who conducts daily workout sessions while wearing his signature Nike cap. Never skips leg day!'
  },
  {
    name: 'The Whistler',
    image: '/animals/the_whistler.png',
    description: 'A charming fellow who claims to know every tune in existence but only whistles the same three notes on repeat.'
  },
  {
    name: 'The Hooded Man',
    image: '/animals/the_hooded_man.png',
    description: 'Our resident mystery animal who insists on wearing a hoodie in all weather conditions. Claims it\'s for "aesthetic purposes."'
  },
  {
    name: 'Acarkeyb',
    image: '/animals/acarkeyb.png',
    description: 'Half car key, half bottle - this unique hybrid species is known for unlocking laughs and bottling up emotions.'
  }
];

export default function OurAnimals() {
  return (
    <div id="our-animals" className="py-8 px-4">
      <div className="bg-white/90 p-8 rounded-lg shadow-lg max-w-xl mx-auto border-4 border-[var(--forest-green)] mb-8">
        <h2 className="text-4xl font-bold text-center text-[var(--day-text)]">Our Animals</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {animals.map((animal, index) => (
          <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg border-4 border-[var(--forest-green)] transition-transform hover:scale-105">
            <div className="relative h-64">
              <Image
                src={animal.image}
                alt={animal.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-[var(--forest-green)] mb-2">{animal.name}</h3>
              <p className="text-[var(--day-subtext)]">{animal.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}