import {Component, OnInit} from "@angular/core";
import {ProductService} from "../_services/product.service";
import {Product} from "./products.model";
import {CartService} from "../_services/cart.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {Select, Store} from "@ngxs/store";
import {ProductState} from "./products.state";
import {GetProducts} from "./products.action";

@Component({
  selector: 'app-products',
  templateUrl: 'products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productList: any
  a: string | null = ''
  products: Product[];

  @Select(ProductState.getProducts)
  products$: Observable<Product[]>;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private store: Store
  ) {
  }


  ngOnInit(): void {
    this.a = this.route.snapshot.paramMap.get("categoryName");
    this.products$
      .subscribe((products) => {
        if (products) {
          this.productList = products;
        }
      });
    this.store.dispatch(new GetProducts(this.a));
  }


  addToCart(item: Product) {
    this.cartService.addToCart({
      productId: item.id,
      quantity: 1,

    }).subscribe(response => {
      console.log(response)
    })
  }
}
