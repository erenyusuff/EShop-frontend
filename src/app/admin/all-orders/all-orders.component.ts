import {Component, OnInit, ViewChild} from '@angular/core';
import * as XLSX from 'xlsx';
import {Order} from "../../orders/order.model";
import {Cart} from "../../cart/cart.model";
import {OrdersService} from "../../_services/orders.service";
import {CommonModule} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {GetProducts} from "../../products/products.action";
import {Select, Store} from "@ngxs/store";
import {OrdersState} from "../../orders/orders.state";
import {lastValueFrom, Observable} from "rxjs";
import {GetOrders} from "../../orders/orders.action";
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { exportDataGrid } from 'devextreme/excel_exporter';
import {HttpClient, HttpParams} from "@angular/common/http";
import CustomStore from "devextreme/data/custom_store";
import {DxDataGridComponent} from "devextreme-angular";
@Component({
  selector: 'app-all-orders',
  standalone: false,
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.css'
})
export class AllOrdersComponent implements OnInit {
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;

  orders: any
  ordersTest: any
  meta: any
  cart: Cart
  productData: any
  a: any
  @Select(OrdersState.getOrders)
  orders$: Observable<Order[]>;


  constructor(private orderService: OrdersService, private route: ActivatedRoute, private store: Store, httpClient: HttpClient) {
    const isNotEmpty = (value: any) => (value !== undefined && value !== null && value !== '');

    this.ordersTest = new CustomStore({
      key: 'id',
      async load(loadOptions: any) {
        const url = 'http://localhost:8081/api/orders/all';

        const paramNames = [
          'skip', 'take', 'requireTotalCount', 'requireGroupCount',
          'sort', 'filter', 'totalSummary', 'group', 'groupSummary',
        ];

        let params = new HttpParams();

        paramNames
          .filter((paramName) => isNotEmpty(loadOptions[paramName]))
          .forEach((paramName) => {
            params = params.set(paramName, JSON.stringify(loadOptions[paramName]));
          });
        try {
          const result: any = await lastValueFrom(httpClient.get(url, { params }));
          return {
            data: result.data,
            totalCount: result.totalCount,
            summary: result.summary,
            groupCount: result.groupCount,
          };

        } catch (err) {
          throw new Error('Data Loading Error');
        }
      },
    });
  }


  isSubMenuOpen: boolean = false;

  toggleSubMenu() {
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }

  log1(e: any) {
    console.log(e)
  }
  // ngOnInit(): any {
  //   this.a = this.route.snapshot.paramMap.get("page")
  //   console.log(this.a)
  //   this.orderService.getAllOrdersPaged(this.a).subscribe((result: any) => {
  //     if (result) {
  //       this.order = result.data;
  //     }
  //   })
  //   return this.order
  // }

  ngOnInit(): void {
    this.a = this.route.snapshot.paramMap.get("page");
    this.store.dispatch(new GetOrders(this.a));
    this.orders$
      .subscribe((orders: any, ): any => {
        if (orders) {
          this.orders = orders.data;
        }
      });
  }
  onExporting(e: any | null) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('orders');

    exportDataGrid({
      component: e.component,
      worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      this.store.dispatch(new GetOrders(this.a));
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
      });
    });
  }

}

