import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {Cart} from "../cart/cart.model";


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) {
  }


  addToCart(payload: any) {
    return this.http.put(environment.api + '/cart/current/addToCart', payload);
  }

  getCartProducts() {
    return this.http.get<Cart>(environment.api + '/cart/myCart');
  }

  buyCart(cartId: number) {
    return this.http.put(environment.api + '/cart/' + cartId + '/buy', httpOptions)
  }
}
