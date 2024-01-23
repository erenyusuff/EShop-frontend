import {ChangeDetectorRef, Component} from '@angular/core';
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
import {group} from "@angular/animations";
import _ from "lodash";

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
  order: Order[];
  cart: Cart;
  paid: string;
  grouped: any;

  constructor(
    private orderService: OrdersService,
    private cdRef: ChangeDetectorRef
  ) {
  }

  statuses = ['paid', 'preparing', 'waiting']

  ngOnInit(): void {

    this.orderService.getAllOrders().subscribe((result): any => {
      if (result) {
        this.order = result;

        let grouped: any = this.order.reduce(
          (result: any, currentValue: any) => {
            (result[currentValue['status']] = result[currentValue['status']] || []).push(currentValue);
             return result;
          }, {});
        // const grouped = (_.groupBy(this.order, 'status'))
       this.grouped = grouped;
      }
    })
  }

  drop(event: CdkDragDrop<any>) {
    console.log('event', event);
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

  changeStatus() {

  }

  protected readonly group = group;
  protected readonly JSON = JSON;
  protected readonly Object = Object;
}
