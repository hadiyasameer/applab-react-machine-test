export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
}
export interface CartItem {
  productId: string;
  name: string;
  price: number;
  category: string;
  image: string;
  quantity: number;
}

