import {Order} from "./order.model";
import {Injectable} from "@angular/core";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {OrdersService} from "../_services/orders.service";
import { GetOrders } from "./orders.action";
import {ActivatedRoute} from "@angular/router";

export class OrdersStateModel {
  orders: Order[]

  constructor() {
  }
}

@Injectable()
@State<OrdersStateModel>({
  name: 'orders',
  defaults: {
    orders: []
  }
})
export class OrdersState {
  constructor(private readonly orderService: OrdersService, private route: ActivatedRoute) {
  }

  a: any

  @Selector()
  static getOrders(state: OrdersStateModel) {
    return state.orders
  }

  @Action(GetOrders)
  add({patchState}: StateContext<OrdersStateModel>, {page}: GetOrders) {
    this.orderService.getAllOfOrders().subscribe((result: any) => {
      console.log(result.data)
      if (result) {
        patchState({
          orders: result.data,
        });
      }
    })
  }
}
