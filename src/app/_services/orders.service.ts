import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Order} from "../orders/order.model";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Cart} from "../cart/cart.model";
import {Product} from "../products/products.model";


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

getMyOrders() {
  return this.http.get<any>(environment.api + '/orders/myOrders');
}
getAllOrders() {
  return this.http.get<any>(environment.api + '/orders/all');
}

  getAllOrdersPaged(page: any){
    console.log(page)
    return this.http.get<any>(environment.api + '/orders/page?page='+page);
  }
updateOrder(data: any) {
    return this.http.patch(environment.api + '/orders/update', data);
  }
}
