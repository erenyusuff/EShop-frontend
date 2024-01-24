import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import { product } from "src/app/products/products.model"
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) {}
  addProduct(data:product){
    return this.http.post(environment.api + 'products', data);
  }
  productList(categoryName: string | null){
    const params = new HttpParams({fromString: 'category='+categoryName+''});
    return this.http.get<product[]>(environment.api + '/products/category?'+params+'');
  }
}
