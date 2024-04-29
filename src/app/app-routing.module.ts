import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CustomerComponent } from './customer/customer.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    component: LoginComponent,
    path: 'login',
  },
  {
    component: SignupComponent,
    path: 'signup',
  },
  {
    component: HomeComponent,
    path: 'home',
  },
  { path: 'customer', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'seller', loadChildren: () => import('./seller/seller.module').then(m => m.SellerModule) },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
