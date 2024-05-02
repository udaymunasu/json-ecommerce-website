import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

const routes: Routes = [
  {
    component: HomeComponent,
    path: '',
  },
  {
    component: HomeComponent,
    path: 'home',
  },
  {
    component: ProductDetailsComponent,
    path: 'details/:productId',
  },
  {
    component: CartPageComponent,
    path: 'cart-page',
  },
  {
    component: UserAuthComponent,
    path: 'user-auth',
  },
  {
    component: CheckoutComponent,
    path: 'checkout',
  },
  {
    component: MyOrdersComponent,
    path: 'my-orders',
  },
  {
    path: 'customer',
    loadChildren: () =>
      import('./customer/customer.module').then((m) => m.CustomerModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'seller',
    loadChildren: () =>
      import('./seller/seller.module').then((m) => m.SellerModule),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
