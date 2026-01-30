
export interface RoomFeature {
  icon: string;
  name: string;
  name_es?: string;
}

export interface Room {
  id: string;
  name: string;
  name_es?: string;
  price: number;
  description: string;
  description_es?: string;
  longDescription: string;
  longDescription_es?: string;
  image: string;
  galleryImages: string[];
  tag: string;
  tag_es?: string;
  size: string;
  size_es?: string;
  bathroom: string;
  bathroom_es?: string;
  amenity: string;
  amenity_es?: string;
  features: RoomFeature[];
  capacity: number;
}

export interface GalleryItem {
  id: number;
  category: string;
  category_es?: string;
  title: string;
  title_es?: string;
  image: string;
}

export interface Reservation {
  id: string;
  roomId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}
