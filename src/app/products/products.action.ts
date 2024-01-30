import {Product} from "./products.model";

export class AddProduct {
  static readonly type = '[Product] Add';

  constructor(public payload: Product) {
  }
}

export class GetProducts {
  static readonly type = '[Product] Get Products';

  constructor(public categoryName: string | null ) {
  }
}
