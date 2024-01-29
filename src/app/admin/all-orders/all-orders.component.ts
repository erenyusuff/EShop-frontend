import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import {Order} from "../../orders/order.model";
import {Cart} from "../../cart/cart.model";
import {OrdersService} from "../../_services/orders.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.css'
})
export class AllOrdersComponent {
  fileName = 'ExcelSheet.xlsx';
  order: any
  cart: Cart
  constructor(private orderService: OrdersService) {
  }
  isSubMenuOpen: boolean = false;

  toggleSubMenu() {
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }
  ngOnInit(): void {

    this.orderService.getAllOrders().subscribe((result) => {
      if (result) {
        this.order = result.data;
      }
    })
  }
  exportexcel() {
    let data = document.getElementById('table-data');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /*save to file*/
    XLSX.writeFile(wb, this.fileName);
  }
}
