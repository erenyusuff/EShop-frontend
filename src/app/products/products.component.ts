import {Component, OnInit} from "@angular/core";
import {ProductService} from "../_services/product.service";
import {product} from "./products.model";
import {CartService} from "../_services/cart.service";
import {HttpParams} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: 'products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productList: undefined | product[]
  a: string | null = ''

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.a = this.route.snapshot.paramMap.get("categoryName")
    this.productService.productList(this.a).subscribe((result) => {
      if (result) {
        this.productList = result;
      }
    })
  }

  addToCart(item: product) {
    this.cartService.addToCart({
      productId: item.id,
      quantity: 1,

    }).subscribe(response => {
    })
  }
}
