import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {OrdersService} from "../_services/orders.service";
import {Order} from "./order.model";
import {Cart} from "../cart/cart.model";
import {ModalComponent} from "../modal/modal.component";
import {DetailModalComponent} from "../detail-modal/detail-modal.component";
import {MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  @ViewChild('myModal') myModal: ElementRef;
  modalRef: MdbModalRef<DetailModalComponent> | null = null;
  order: Order | any
  cart: Cart

  constructor(private orderService: OrdersService, private modalService: MdbModalService) {
  }

  ngOnInit(): void {
    this.orderService.getMyOrders().subscribe((result) => {
      if (result) {
        this.order = result;
      }
    })
  }
  openModalReal() {
    this.modalRef = this.modalService.open(DetailModalComponent)
  }
}
