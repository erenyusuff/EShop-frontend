import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {product} from "../products/products.model";
import {Observable} from "rxjs";
import _default from "chart.js/dist/plugins/plugin.tooltip";
import numbers = _default.defaults.animations.numbers;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ProductAdminService {

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<product>(environment.api + '/products');
  }

  updateProducts(payload:any): Observable<any> {
    return this.http.patch(
      environment.api + '/products',
      payload,
      httpOptions
    )
  }

  deleteProducts(id: number) {
    return this.http.delete<product>(environment.api + '/products/'+id+'');
  }
  addProduct(payload:any ): Observable<any> {
    return this.http.post(
      environment.api + '/products',
      payload,
      httpOptions
    );
  }
}
