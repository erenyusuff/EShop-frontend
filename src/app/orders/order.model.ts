import {Cart, CartProducts} from "../cart/cart.model";

export interface Order {
  id: number,
  userId: number,
  cartId: number,
  price: number,
  status: string,
  isActive: boolean,
  createdAt: Date,
  updatedAt: Date,
  cart: Cart
  cartProducts: CartProducts[]
}
