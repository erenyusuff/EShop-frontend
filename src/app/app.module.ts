import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {BoardAdminComponent} from './admin/board-admin/board-admin.component';
import {BoardModeratorComponent} from './board-moderator/board-moderator.component';
import {BoardUserComponent} from './board-user/board-user.component';
import {httpInterceptorProviders} from './_helpers/http.interceptor';
import {CommonModule} from "@angular/common";
import {ProductsComponent} from "./products/products.component";
import {CartComponent} from "./cart/cart.component";
import {SuccessComponent} from './success/success.component';
import {OrdersComponent} from './orders/orders.component';
import {StatisticComponent} from './statistic/statistic.component';
import {SearchComponent} from './search/search.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ModalComponent} from "./modal/modal.component";
import {ProductAdminComponent} from "./admin/product-admin/product-admin.component";
import {MdbModalModule} from "mdb-angular-ui-kit/modal";
import {Modal2Component} from "./modal2/modal2.component";
import {DashboardAdminComponent} from "./admin/dashboard-admin/dashboard-admin.component";
import {NgxsModule} from "@ngxs/store";
import {NgxsStoragePluginModule} from "@ngxs/storage-plugin";
import {ProductState} from "./products/products.state";
import {OrdersState} from "./orders/orders.state";
import {
  DxButtonModule, DxCalendarModule,
  DxDataGridModule,
  DxDateBoxModule,
  DxDropDownBoxModule,
  DxSelectBoxModule
} from "devextreme-angular";
import {DxoDetailsComponent, DxoMasterDetailComponent, DxoMasterDetailModule} from "devextreme-angular/ui/nested";
import {AllOrdersComponent} from "./admin/all-orders/all-orders.component";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProductsComponent,
    CartComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    SuccessComponent,
    OrdersComponent,
    StatisticComponent,
    SearchComponent,
    ModalComponent,
    ProductAdminComponent,
    Modal2Component,
    DashboardAdminComponent,
    AllOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    NgbModule,
    MdbModalModule,
    DxButtonModule,
    DxDataGridModule,
    DxDateBoxModule,
    DxCalendarModule,
    DxDropDownBoxModule,
    DxSelectBoxModule,
    DxoMasterDetailModule,
    NgxsModule.forRoot([
      ProductState, OrdersState
    ]),
    NgxsStoragePluginModule.forRoot({
        key: [ProductState, OrdersState],
      },
    ),
    // NgxsReduxDevtoolsPluginModule.forRoot(),
    // NgxsLoggerPluginModule.forRoot()
  ],
  providers: [httpInterceptorProviders],
  exports: [
    BoardAdminComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
