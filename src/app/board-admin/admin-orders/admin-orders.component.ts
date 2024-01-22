import {Component} from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {Order} from "../../orders/order.model";
import {Cart} from "../../cart/cart.model";
import {OrdersService} from "../../_services/orders.service";
import {CommonModule} from "@angular/common";

/**
 * @title Drag&Drop connected sorting group
 */
@Component({
  selector: 'admin-orders',
  templateUrl: 'admin-orders.component.html',
  styleUrls: ['admin-orders.component.css'],
  standalone: true,
  imports: [CdkDrag, CdkDropList, CdkDropListGroup, CommonModule]
})
export class AdminOrdersComponent {
  order: Order[]
  cart: Cart
  paid: string
  prepare: string

  constructor(private orderService: OrdersService) {
  }

  ngOnInit(): void {

    this.orderService.getAllOrders().subscribe((result) => {
      if (result) {
        this.order = result;
        console.log(result)


      }
    })
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
