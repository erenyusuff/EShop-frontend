import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {OrdersService} from "../_services/orders.service";
import {Order} from "./order.model";
import {Cart} from "../cart/cart.model";
import {ModalComponent} from "../modal/modal.component";
import {DetailModalComponent} from "../detail-modal/detail-modal.component";
import {MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";
import {GetProducts} from "../products/products.action";
import {Select, Store} from "@ngxs/store";
import {ProductState} from "../products/products.state";
import {Observable} from "rxjs";
import {Product} from "../products/products.model";
import {OrdersState} from "./orders.state";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  @ViewChild('myModal') myModal: ElementRef;
  modalRef: MdbModalRef<DetailModalComponent> | null = null;
  order: Order[] | any
  cart: Cart
  a: any


  constructor(private orderService: OrdersService, private modalService: MdbModalService, private route: ActivatedRoute, private store: Store) {
  }
  ngOnInit(): void {
    this.orderService.getMyOrders().subscribe((result) => {
      if (result) {
        this.order = result;
      }
    })
  }
//   ngOnInit(): void {
//     this.a = this.route.snapshot.paramMap.get("page");
//
//     this.store.dispatch(new GetProducts(this.a));
// console.log(this.a)
//     this.orders$
//       .subscribe((orders) => {
//         if (orders) {
//           this.order = orders;
//           console.log(this.order)
//         }
//       });
//   }

  openModalReal() {
    this.modalRef = this.modalService.open(DetailModalComponent)
  }
}
