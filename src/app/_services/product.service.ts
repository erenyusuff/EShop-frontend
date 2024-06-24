import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import { Product } from "src/app/products/products.model"
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) {}
  addProduct(data:Product){
    return this.http.post(environment.api + 'products', data);
  }
  searchProducts(name: string) {
    const params = new HttpParams({fromString: 'name='+name+''});
    // return this.http.get<Product[]>(environment.api + '/products?'+params+'')
    return this.http.get<Product[]>(environment.api + '/products?'+params+'');
  }
  productList(categoryName: string | null){
    const params = new HttpParams({fromString: 'category='+categoryName+''});
    return this.http.get<Product[]>(environment.api + '/products/category?'+params+'');
  }
}
