export interface Cart {
  id: number;
  totalPrice: number;
  userId: number;
  deletedAt: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  cartProducts: CartProducts[];
}


export interface CartProducts {
  img: string;
  productName: string;
  quantity: number;
  price: number;
  product: Product;
}
export interface Product {
  "productName": string;
  "price": number;
  "stock": number;
  "description": string;
  "img": string;
  "category": string;
  "id": number;
}
