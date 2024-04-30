import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerComponent } from './seller.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';


@NgModule({
  declarations: [
    SellerComponent,
    SellerAuthComponent,
    SellerHomeComponent,
    SellerAddProductComponent,
    SellerUpdateProductComponent
  ],
  imports: [
    CommonModule,
    SellerRoutingModule,
    FormsModule, ReactiveFormsModule,
  ]
})
export class SellerModule { }
