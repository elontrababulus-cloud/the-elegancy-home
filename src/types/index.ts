export interface Product {
  id: string;
  name: string;
  category: string;
  price_range: string;
  description: string;
  main_image_url: string;
  brand: string;
  gallery_images?: string[];
  specifications?: string[];
}

export interface Category {
  name: string;
  slug: string;
  image_url: string;
}
