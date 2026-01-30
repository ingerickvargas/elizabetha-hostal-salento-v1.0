
import { Room, GalleryItem } from './types';

export const ROOMS: Room[] = [
  {
    id: '1',
    name: 'The Coffee Loft',
    price: 85,
    description: 'Private balcony with views of the valley and a queen size premium bed.',
    longDescription: 'Perched at the highest point of our historic colonial building, The Coffee Loft offers unparalleled views of the Salento valley. This room features original 100-year-old wooden beams, a private balcony perfect for morning meditation, and a hand-crafted workspace for digital nomads.',
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=1200'
    ],
    tag: 'From $85/night',
    size: '28m²',
    bathroom: 'Private',
    amenity: 'Fast WiFi',
    features: [
      { icon: 'balcony', name: 'Private Balcony' },
      { icon: 'coffee_maker', name: 'Espresso Bar' },
      { icon: 'bed', name: 'King Bed' }
    ],
    capacity: 2
  },
  {
    id: '2',
    name: 'Andean Suite',
    price: 120,
    description: 'Spacious master suite featuring a luxury soaking tub and local art decor.',
    longDescription: 'Our signature suite is a celebration of Quindío culture. Featuring high ceilings and floor-to-ceiling windows that frame the Andean peaks, the Andean Suite includes a hand-carved stone soaking tub, luxury linens, and curated local art. Ideal for couples seeking a romantic getaway.',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80&w=1200'
    ],
    tag: 'From $120/night',
    size: '42m²',
    bathroom: 'Tub',
    amenity: 'Mini Bar',
    features: [
      { icon: 'bathtub', name: 'Soaking Tub' },
      { icon: 'mountain_flag', name: 'Valley View' },
      { icon: 'wine_bar', name: 'Premium Bar' }
    ],
    capacity: 3
  },
  {
    id: '3',
    name: 'Cacao Double',
    price: 55,
    description: 'Cozy and functional, perfect for couples looking for an authentic stay.',
    longDescription: 'Inspired by the rich chocolate traditions of the region, the Cacao Double is a warm, earth-toned retreat. Quiet and peaceful, it faces our inner colonial courtyard, offering a cool respite from the midday sun. It is equipped with modern essentials without losing its rustic charm.',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1591088398332-8a77d397ef84?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&q=80&w=1200'
    ],
    tag: 'From $55/night',
    size: '22m²',
    bathroom: 'Double',
    amenity: 'Smart TV',
    features: [
      { icon: 'laptop_mac', name: 'Workspace' },
      { icon: 'tv', name: 'Smart TV' },
      { icon: 'energy_savings_leaf', name: 'Eco-Friendly' }
    ],
    capacity: 2
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, category: 'Architecture', title: 'The Main Facade', image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800' },
  { id: 2, category: 'Interiors', title: 'The Central Patio', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4df85b?auto=format&fit=crop&q=80&w=800' },
  { id: 3, category: 'Region', title: 'Valley Horizons', image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=800' },
  { id: 4, category: 'Common Areas', title: 'The Shared Kitchen', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800' },
  { id: 5, category: 'Accommodation', title: 'Andean Suite Detail', image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=800' },
  { id: 6, category: 'Experience', title: 'Morning Brew Ritual', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800' }
];
