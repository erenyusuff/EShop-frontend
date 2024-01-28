import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
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
import {UserAdminComponent} from "../user-admin/user-admin.component";

/**
 * @title Drag&Drop connected sorting group
 */
@Component({
  selector: 'order-admin',
  templateUrl: 'order-admin.component.html',
  styleUrls: ['order-admin.component.css'],
  standalone: true,
  imports: [CdkDrag, CdkDropList, CdkDropListGroup, CommonModule]
})
export class OrderAdminComponent implements OnInit {
  order: Order[];
  cart: Cart;
  grouped: any;

  constructor(
    private orderService: OrdersService,
  ) {
  }

  isSubMenuOpen: boolean = false;

  toggleSubMenu() {
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }

  statuses = ['waiting', 'preparing', 'shipping']

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe((result): any => {
      if (result) {
        this.order = result;
        // let grouped: any = this.order.reduce(
        //   (result: any, currentValue: any) => {
        //     (result[currentValue['status']] = result[currentValue['status']] || []).push(currentValue);
        //      return result;
        //   }, {});
        const grouped = (_.groupBy(this.order, 'status'))

        console.log('group', grouped)
        this.grouped = grouped;
      }
    })
  }

  drop(event: CdkDragDrop<any>, status: string) {
    console.log(':::event', event);
    console.log(':::stat', status);
    console.log(':: moved element', event.previousContainer.data[event.previousIndex]);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      const movedItem = event.container.data[event.currentIndex];
      this.changeStatus(movedItem, status)
      console.log(':: moved element list',);

    }

  }

  changeStatus(moved: Order, status: string) {

    const id = moved.id;
    this.orderService.updateOrder({
      status,
      id: id
    }).subscribe()
  }

  protected readonly group = group;
  protected readonly JSON = JSON;
  protected readonly Object = Object;
}
