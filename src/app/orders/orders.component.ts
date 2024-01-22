import {Component, OnInit} from '@angular/core';
import {OrdersService} from "../_services/orders.service";
import {Order} from "./order.model";
import {Cart} from "../cart/cart.model";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  order: Order | any
  cart: Cart

  constructor(private orderService: OrdersService) {
  }

  ngOnInit(): void {
    this.orderService.getMyOrders().subscribe((result) => {
      if (result) {
        this.order = result;
        console.log(result)
      }
    })
  }

}
