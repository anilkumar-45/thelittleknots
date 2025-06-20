
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string | null;
  category: 'keytags' | 'accessories' | 'toys';
  in_stock: boolean;
  created_at: string;
  updated_at: string;
  images?: ProductImage[];
  primary_image_url?: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  is_primary: boolean;
  display_order: number;
  created_at: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface DatabaseProduct {
  id: string;
  name: string;
  price: number;
  description: string | null;
  category: string;
  in_stock: boolean;
  created_at: string;
  updated_at: string;
}

export interface DatabaseProductImage {
  id: string;
  product_id: string;
  image_url: string;
  is_primary: boolean;
  display_order: number;
  created_at: string;
}
