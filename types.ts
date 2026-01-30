
export interface Room {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  tag: string;
  size: string;
  bathroom: string;
  amenity: string;
}

export interface GalleryItem {
  id: number;
  category: string;
  title: string;
  image: string;
}
