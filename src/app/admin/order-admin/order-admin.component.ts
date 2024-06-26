import {Component, OnInit} from '@angular/core';
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
  selector: 'order-admin',
  templateUrl: 'order-admin.component.html',
  styleUrls: ['order-admin.component.css'],
  standalone: true,
  imports: [CdkDrag, CdkDropList, CdkDropListGroup, CommonModule]
})
export class OrderAdminComponent implements OnInit {
  order: any
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
    // const take = 20
    this.orderService.getAllOrders().subscribe((result): any => {
      if (result) {
        this.order = result;
        // let grouped: any = this.order.reduce(
        //   (result: any, currentValue: any) => {
        //     (result[currentValue['status']] = result[currentValue['status']] || []).push(currentValue);
        //      return result;
        //   }, {});
        const grouped = (_.groupBy(this.order.data, 'status'))
        this.grouped = grouped;
        this.statuses.map(i => {
          this.grouped[i] = this.grouped[i] ? this.grouped[i] : [];
        })
        console.log('group', this.grouped)
      }
    })
  }

  drop(event: CdkDragDrop<any>, status: string) {

    console.log(':::event: ', event);
    console.log(':::status: ', status);
    console.log(':::moved element: ', event.previousContainer.data[event.previousIndex]);
    if (event.previousContainer === event.container) {
      console.log('ayni container')
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log('farkli container')
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      const movedItem = event.container.data[event.currentIndex];
      this.changeStatus(movedItem, status)
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
