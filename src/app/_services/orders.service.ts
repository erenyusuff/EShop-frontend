import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Order} from "../orders/order.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

getMyOrders() {
  return this.http.get<Order>(environment.api + '/orders/myOrders');
}
getAllOrders() {
  return this.http.get<Order[]>(environment.api + '/orders/all');
}
}
