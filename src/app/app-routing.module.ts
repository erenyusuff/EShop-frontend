import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {BoardUserComponent} from './board-user/board-user.component';
import {BoardModeratorComponent} from './board-moderator/board-moderator.component';
import {BoardAdminComponent} from './admin/board-admin/board-admin.component';
import {ProductsComponent} from "./products/products.component";
import {CartComponent} from "./cart/cart.component";
import {SuccessComponent} from "./success/success.component";
import {OrdersComponent} from "./orders/orders.component";
import {StatisticComponent} from "./statistic/statistic.component";
import {SearchComponent} from "./search/search.component";
import {ModalComponent} from "./modal/modal.component";
import {OrderAdminComponent} from "./admin/order-admin/order-admin.component";
import {AllOrdersComponent} from "./admin/all-orders/all-orders.component";
import {ProductAdminComponent} from "./admin/product-admin/product-admin.component";
import {UserAdminComponent} from "./admin/user-admin/user-admin.component";


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'user', component: BoardUserComponent},
  {path: 'mod', component: BoardModeratorComponent},
  {path: 'admin', component: BoardAdminComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'products/:categoryName', component: ProductsComponent},
  {path: 'cart', component: CartComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'bought', component: SuccessComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'statistics', component: StatisticComponent},
  {path: 'search', component: SearchComponent},
  {path: 'modal', component: ModalComponent},
  {path: 'admin/orders', component: OrderAdminComponent},
  {path: 'admin/all-orders', component: AllOrdersComponent},
  {path: 'admin/products', component: ProductAdminComponent},
  {path: 'admin/users', component: UserAdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
