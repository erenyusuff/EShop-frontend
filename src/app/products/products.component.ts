import {Component, OnInit} from "@angular/core";
import {ProductService} from "../_services/product.service";
import {Product} from "./products.model";
import {CartService} from "../_services/cart.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: 'products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productList: undefined
  a: string | null = ''

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.a = this.route.snapshot.paramMap.get("categoryName")
    this.productService.productList(this.a).subscribe((result: any) => {
      if (result) {
        this.productList = result.data;
      }
    })
  }

  addToCart(item: Product) {
    this.cartService.addToCart({
      productId: item.id,
      quantity: 1,

    }).subscribe(response => {
    })
  }
}
