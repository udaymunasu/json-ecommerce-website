import { Component, OnInit } from '@angular/core';
import { order } from '../data-types';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
})
export class MyOrdersComponent implements OnInit {
  orderData: order[] | undefined;
  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.getOrderList();
  }
  cancelOrder(orderId: number | undefined) {
    orderId &&
      this.product.cancelOrder(orderId).subscribe((result) => {
        if (result) {
          this.getOrderList();
        }
      });
  }
  getOrderList() {
    this.product.orderList().subscribe((result) => {
      this.orderData = result;
    });
  }
}
