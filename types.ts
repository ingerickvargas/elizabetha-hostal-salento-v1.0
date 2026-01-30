
export interface RoomFeature {
  icon: string;
  name: string;
}

export interface Room {
  id: string;
  name: string;
  price: number;
  description: string;
  longDescription: string;
  image: string;
  galleryImages: string[];
  tag: string;
  size: string;
  bathroom: string;
  amenity: string;
  features: RoomFeature[];
  capacity: number;
}

export interface GalleryItem {
  id: number;
  category: string;
  title: string;
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
