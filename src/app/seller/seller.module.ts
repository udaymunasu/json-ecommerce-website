import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerComponent } from './seller.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SellerHomeComponent } from './seller-home/seller-home.component';


@NgModule({
  declarations: [
    SellerComponent,
    SellerAuthComponent,
    SellerHomeComponent
  ],
  imports: [
    CommonModule,
    SellerRoutingModule,
    FormsModule, ReactiveFormsModule,
  ]
})
export class SellerModule { }
