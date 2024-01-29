import {Component, OnInit} from '@angular/core';
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {ModalComponent} from "../modal/modal.component";
import {OrdersService} from "../_services/orders.service";
import {Cart, CartProducts, Product} from "../cart/cart.model";
import {Order} from "../orders/order.model";

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrl: './detail-modal.component.css'
})
export class DetailModalComponent implements OnInit{
  order: any
  cart: any
  cartProducts: any[]
  product: any
  constructor(public modalRef: MdbModalRef<ModalComponent>, private orderService: OrdersService) {}

  ngOnInit(): void {
    this.orderService.getMyOrders().subscribe((result) => {
      console.log(result)
      if (result) {
        this.order = result;
      }
    })
  }


}
