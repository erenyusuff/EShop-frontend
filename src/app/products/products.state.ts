import { Action, Selector, State, StateContext } from '@ngxs/store';
import {Product} from "./products.model";
import {AddProduct, GetProducts} from "./products.action";
import {ProductsComponent} from "./products.component";
import {ProductService} from "../_services/product.service";
import {Injectable} from "@angular/core";



export class ProductStateModel {
  products: Product[];


  constructor() {
  }
}


@Injectable()
@State<ProductStateModel>({
  name: 'products',
  defaults: {
    products: []
  }
})
export class ProductState {

  constructor(private readonly productService: ProductService) {
  }


  @Selector()
  static getProducts(state: ProductStateModel) {
    return state.products;
  }


  // @Action(AddProduct)
  // add({getState, patchState }: StateContext<ProductStateModel>, { payload }: AddProduct) {
  //   const state = getState();
  //   patchState({
  //     products: [...state.products, payload]
  //   });
  // }
  @Action(GetProducts)
  add({ patchState }: StateContext<ProductStateModel>, {categoryName}: GetProducts) {

    this.productService.productList(categoryName).subscribe((result: any) => {
      if (result) {
        patchState({
          products : result.data
        });
      }
    })
  }
}
