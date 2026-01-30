
import { Room, GalleryItem } from './types';

export const ROOMS: Room[] = [
  {
    id: '1',
    name: 'The Coffee Loft',
    price: 85,
    description: 'Private balcony with views of the valley and a queen size premium bed.',
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=800',
    tag: 'From $85/night',
    size: '28m²',
    bathroom: 'Private',
    amenity: 'Fast WiFi'
  },
  {
    id: '2',
    name: 'Andean Suite',
    price: 120,
    description: 'Spacious master suite featuring a luxury soaking tub and local art decor.',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800',
    tag: 'From $120/night',
    size: '42m²',
    bathroom: 'Tub',
    amenity: 'Mini Bar'
  },
  {
    id: '3',
    name: 'Cacao Double',
    price: 55,
    description: 'Cozy and functional, perfect for couples looking for an authentic stay.',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800',
    tag: 'From $55/night',
    size: '22m²',
    bathroom: 'Double',
    amenity: 'Smart TV'
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
