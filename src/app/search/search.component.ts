import {Component, OnInit} from '@angular/core';
import {product} from "../cart/cart.model";
import {ProductService} from "../_services/product.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchTerm = '';
  products: product[] = [];
  term = '';

  constructor(private productService: ProductService, private http: HttpClient) {
  }


  ngOnInit(): void {
    this.http.get<product[]>(environment.api + '/products')
      .subscribe((data: product[]) => {
        this.products = data;
      });
  }
}
