
import { Room, GalleryItem } from './types';

export const ROOMS: Room[] = [
  {
    id: '1',
    name: 'The Coffee Loft',
    name_es: 'El Loft Cafetero',
    price: 85,
    description: 'Private balcony with views of the valley and a queen size premium bed.',
    description_es: 'Balcón privado con vistas al valle y cama queen premium.',
    longDescription: 'Perched at the highest point of our historic colonial building, The Coffee Loft offers unparalleled views of the Salento valley. This room features original 100-year-old wooden beams, a private balcony perfect for morning meditation, and a hand-crafted workspace for digital nomads.',
    longDescription_es: 'Ubicado en el punto más alto de nuestro edificio colonial histórico, El Loft Cafetero ofrece vistas inigualables del valle de Salento. Esta habitación cuenta con vigas de madera originales de 100 años, un balcón privado perfecto para la meditación matutina y un espacio de trabajo artesanal para nómadas digitales.',
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=1200'
    ],
    tag: 'From $85/night',
    tag_es: 'Desde $85/noche',
    size: '28m²',
    size_es: '28m²',
    bathroom: 'Private',
    bathroom_es: 'Privado',
    amenity: 'Fast WiFi',
    amenity_es: 'WiFi Rápido',
    features: [
      { icon: 'balcony', name: 'Private Balcony', name_es: 'Balcón Privado' },
      { icon: 'coffee_maker', name: 'Espresso Bar', name_es: 'Barra de Espresso' },
      { icon: 'bed', name: 'King Bed', name_es: 'Cama King' }
    ],
    capacity: 2
  },
  {
    id: '2',
    name: 'Andean Suite',
    name_es: 'Suite Andina',
    price: 120,
    description: 'Spacious master suite featuring a luxury soaking tub and local art decor.',
    description_es: 'Amplia suite principal con bañera de lujo y decoración de arte local.',
    longDescription: 'Our signature suite is a celebration of Quindío culture. Featuring high ceilings and floor-to-ceiling windows that frame the Andean peaks, the Andean Suite includes a hand-carved stone soaking tub, luxury linens, and curated local art. Ideal for couples seeking a romantic getaway.',
    longDescription_es: 'Nuestra suite exclusiva es una celebración de la cultura del Quindío. Con techos altos y ventanales que enmarcan los picos andinos, la Suite Andina incluye una bañera de piedra tallada a mano, lencería de lujo y arte local curado. Ideal para parejas que buscan una escapada romántica.',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80&w=1200'
    ],
    tag: 'From $120/night',
    tag_es: 'Desde $120/noche',
    size: '42m²',
    size_es: '42m²',
    bathroom: 'Tub',
    bathroom_es: 'Bañera',
    amenity: 'Mini Bar',
    amenity_es: 'Mini Bar',
    features: [
      { icon: 'bathtub', name: 'Soaking Tub', name_es: 'Bañera de Inmersión' },
      { icon: 'mountain_flag', name: 'Valley View', name_es: 'Vista al Valle' },
      { icon: 'wine_bar', name: 'Premium Bar', name_es: 'Bar Premium' }
    ],
    capacity: 3
  },
  {
    id: '3',
    name: 'Cacao Double',
    name_es: 'Doble Cacao',
    price: 55,
    description: 'Cozy and functional, perfect for couples looking for an authentic stay.',
    description_es: 'Acogedora y funcional, perfecta para parejas que buscan una estancia auténtica.',
    longDescription: 'Inspired by the rich chocolate traditions of the region, the Cacao Double is a warm, earth-toned retreat. Quiet and peaceful, it faces our inner colonial courtyard, offering a cool respite from the midday sun. It is equipped with modern essentials without losing its rustic charm.',
    longDescription_es: 'Inspirada en las ricas tradiciones chocolateras de la región, la Doble Cacao es un refugio cálido en tonos tierra. Tranquila y pacífica, da a nuestro patio colonial interior, ofreciendo un respiro fresco del sol del mediodía. Está equipada con lo esencial moderno sin perder su encanto rústico.',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1591088398332-8a77d397ef84?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&q=80&w=1200'
    ],
    tag: 'From $55/night',
    tag_es: 'Desde $55/noche',
    size: '22m²',
    size_es: '22m²',
    bathroom: 'Double',
    bathroom_es: 'Doble',
    amenity: 'Smart TV',
    amenity_es: 'Smart TV',
    features: [
      { icon: 'laptop_mac', name: 'Workspace', name_es: 'Zona de Trabajo' },
      { icon: 'tv', name: 'Smart TV', name_es: 'Smart TV' },
      { icon: 'energy_savings_leaf', name: 'Eco-Friendly', name_es: 'Ecológico' }
    ],
    capacity: 2
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, category: 'Architecture', category_es: 'Arquitectura', title: 'The Main Facade', title_es: 'La Fachada Principal', image: 'https://kooibbljmurrssrtiopw.supabase.co/storage/v1/object/sign/images/arquitectura/IMG_4120.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NTUxNDI5OC1hMTVlLTRkM2YtYmEwNi00ZTcyMjc5ZTQ0OTkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvYXJxdWl0ZWN0dXJhL0lNR180MTIwLmpwZyIsImlhdCI6MTc3NTQ0MjYwOCwiZXhwIjoxODM4NTE0NjA4fQ.aF4eVyK1VihENwIc46q7rx7Qe4M2F47lFW8yTHib2rk' },
  { id: 2, category: 'Architecture', category_es: 'Arquitectura', title: 'Exterior design', title_es: 'Diseño exterior', image: 'https://kooibbljmurrssrtiopw.supabase.co/storage/v1/object/sign/images/arquitectura/IMG_4122.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NTUxNDI5OC1hMTVlLTRkM2YtYmEwNi00ZTcyMjc5ZTQ0OTkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvYXJxdWl0ZWN0dXJhL0lNR180MTIyLmpwZWciLCJpYXQiOjE3NzU0NDI4MjYsImV4cCI6MTgzODUxNDgyNn0.zbflnrB6qikQowP391MOsrwoRrTqDJqXPfOaSGNaQGc' },
  { id: 3, category: 'Architecture', category_es: 'Arquitectura', title: 'The Main Facade', title_es: 'La Fachada Principal', image: 'https://kooibbljmurrssrtiopw.supabase.co/storage/v1/object/sign/images/arquitectura/IMG_4124.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NTUxNDI5OC1hMTVlLTRkM2YtYmEwNi00ZTcyMjc5ZTQ0OTkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvYXJxdWl0ZWN0dXJhL0lNR180MTI0LmpwZyIsImlhdCI6MTc3NTQ0MjkxMCwiZXhwIjoxODM4NTE0OTEwfQ.ERBqqTwRYYrjybPOKI9EopUa6l1w_5kEXc4eM2NU5eY' },
  { id: 4, category: 'Architecture', category_es: 'Arquitectura', title: 'Qualification', title_es: 'Calificación', image: 'https://kooibbljmurrssrtiopw.supabase.co/storage/v1/object/sign/images/arquitectura/IMG_4126.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NTUxNDI5OC1hMTVlLTRkM2YtYmEwNi00ZTcyMjc5ZTQ0OTkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvYXJxdWl0ZWN0dXJhL0lNR180MTI2LmpwZyIsImlhdCI6MTc3NTQ0Mjk0OCwiZXhwIjoxODM4NTE0OTQ4fQ.Ddwr8VwzTr5mFDKWB7zO3_Tr4ISzC7YXdEBGrhW5mT8' },
  { id: 5, category: 'Architecture', category_es: 'Arquitectura', title: 'The Main Facade', title_es: 'La Fachada Principal', image: 'https://kooibbljmurrssrtiopw.supabase.co/storage/v1/object/sign/images/arquitectura/IMG_4125.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NTUxNDI5OC1hMTVlLTRkM2YtYmEwNi00ZTcyMjc5ZTQ0OTkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvYXJxdWl0ZWN0dXJhL0lNR180MTI1LmpwZyIsImlhdCI6MTc3NTQ0Mjk3MiwiZXhwIjoxODM4NTE0OTcyfQ.hnWN2LqMm9N70MxeMg3vmqZXlQoAWCKXosaT9o4vby4' },
  { id: 6, category: 'Architecture', category_es: 'Arquitectura', title: 'Exterior detail', title_es: 'Detalle exterior', image: 'https://kooibbljmurrssrtiopw.supabase.co/storage/v1/object/sign/images/arquitectura/IMG_4131.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NTUxNDI5OC1hMTVlLTRkM2YtYmEwNi00ZTcyMjc5ZTQ0OTkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvYXJxdWl0ZWN0dXJhL0lNR180MTMxLmpwZyIsImlhdCI6MTc3NTQ0MzAxOSwiZXhwIjoxODM4NTE1MDE5fQ.4DXfLl8h0jFWnNHXefTq6M2cB1wa1rkHLqeDcXY3RSI' },
  { id: 7, category: 'Architecture', category_es: 'Arquitectura', title: 'Detail in waiting room', title_es: 'Detalle en sala de espera', image: 'https://kooibbljmurrssrtiopw.supabase.co/storage/v1/object/sign/images/arquitectura/IMG_4144.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NTUxNDI5OC1hMTVlLTRkM2YtYmEwNi00ZTcyMjc5ZTQ0OTkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvYXJxdWl0ZWN0dXJhL0lNR180MTQ0LmpwZyIsImlhdCI6MTc3NTQ0MzA1MSwiZXhwIjoxODM4NTE1MDUxfQ.AEUesHc69qIfeKMO-4-hge38npk0C1afXJ1s41shBGI' },
  { id: 8, category: 'Interiors', category_es: 'Interiores', title: 'Guest Memories', title_es: 'Recuerdos de huespedes', image: 'https://kooibbljmurrssrtiopw.supabase.co/storage/v1/object/sign/images/interiores/IMG_4137.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NTUxNDI5OC1hMTVlLTRkM2YtYmEwNi00ZTcyMjc5ZTQ0OTkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvaW50ZXJpb3Jlcy9JTUdfNDEzNy5qcGciLCJpYXQiOjE3NzU0NDM1MTIsImV4cCI6MTgzODUxNTUxMn0.eV0PweEbJUqkTUDO3_XM3YCgsCXNf4Nv1gDY4G55wME' },
  { id: 9, category: 'Interiors', category_es: 'Interiores', title: 'Waiting room', title_es: 'Sala de espera', image: 'https://kooibbljmurrssrtiopw.supabase.co/storage/v1/object/sign/images/interiores/IMG_4145.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NTUxNDI5OC1hMTVlLTRkM2YtYmEwNi00ZTcyMjc5ZTQ0OTkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvaW50ZXJpb3Jlcy9JTUdfNDE0NS5qcGciLCJpYXQiOjE3NzU0NDM2MjUsImV4cCI6MTgzODUxNTYyNX0.gl4coRA_M-xlmDLY656HsxlocqDuYtYY9y6EcGPhLcQ' },
  { id: 10, category: 'Interiors', category_es: 'Interiores', title: 'Flowers', title_es: 'Flores', image: 'https://kooibbljmurrssrtiopw.supabase.co/storage/v1/object/sign/images/interiores/IMG_4152.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NTUxNDI5OC1hMTVlLTRkM2YtYmEwNi00ZTcyMjc5ZTQ0OTkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvaW50ZXJpb3Jlcy9JTUdfNDE1Mi5qcGciLCJpYXQiOjE3NzU0NDM2ODYsImV4cCI6MTgzODUxNTY4Nn0.cYcnDz1ZqJA4yu0E-C93Fa5KpJX19cJQXskErnyfl9k' },
  { id: 11, category: 'Interiors', category_es: 'Interiores', title: 'Waiting TV room', title_es: 'Sala de espera TV', image: 'https://kooibbljmurrssrtiopw.supabase.co/storage/v1/object/sign/images/interiores/IMG_6419.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NTUxNDI5OC1hMTVlLTRkM2YtYmEwNi00ZTcyMjc5ZTQ0OTkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvaW50ZXJpb3Jlcy9JTUdfNjQxOS5qcGVnIiwiaWF0IjoxNzc1NDQzNzQwLCJleHAiOjE4Mzg1MTU3NDB9.Se5p1brcI1Lz6OJzHL_VK-nMxvlnDzxpAQPr_kOIfpU' },
  { id: 12, category: 'Region', category_es: 'Región', title: 'Valley Horizons', title_es: 'Horizontes del Valle', image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=800' },
  { id: 13, category: 'Common Areas', category_es: 'Áreas Comunes', title: 'The Shared Kitchen', title_es: 'La Cocina Compartida', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800' },
  { id: 14, category: 'Accommodation', category_es: 'Alojamiento', title: 'Exterior detail', title_es: 'Detalle exterior', image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=800' },
  { id: 15, category: 'Experience', category_es: 'Experiencia', title: 'Detail in waiting room', title_es: 'Detalle en sala de espera', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800' }
];
