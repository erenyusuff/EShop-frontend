import {Component, OnInit} from '@angular/core';
import {Product} from "../cart/cart.model";
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
  products: Product[] = [];
  term = '';

  constructor(private productService: ProductService, private http: HttpClient) {
  }


  ngOnInit(): void {
    this.http.get<Product[]>(environment.api + '/products')
      .subscribe((data: Product[]) => {
        this.products = data;
      });
  }
}
