import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, order } from '../data-types';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  totalPrice: number;
  cartData: cart[] | undefined;
  orderMsg: string | undefined;
  constructor(private product: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.product.currentCart().subscribe((result) => {
      let price = 0;
      this.cartData = result;
      result.forEach((item) => {
        console.log('item cart', item.price);
        if (item.quantity && !isNaN(item.price) && !isNaN(item.quantity)) {
          price = price + +item.price * +item.quantity;
        }
      });
      if (!isNaN(price)) {
        this.totalPrice = price + price / 10 + 100 - price / 10;
        const total = parseFloat(this.totalPrice.toFixed(2));
        this.totalPrice = total
        console.log('this.totalPrice', this.totalPrice);
      }
    });
  }

  orderNow(data: { email: string; address: string; contact: string }) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (this.totalPrice) {
      let orderData: order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id: undefined,
      };

      this.cartData?.forEach((item) => {
        setTimeout(() => {
          item.id && this.product.deleteCartItems(item.id);
        }, 700);
      });

      this.product.orderNow(orderData).subscribe((result) => {
        if (result) {
          this.orderMsg = 'Order has been placed';
          setTimeout(() => {
            this.orderMsg = undefined;
            this.router.navigate(['/my-orders']);
          }, 4000);


        }
      });
    }
  }
}


// update the noOfOrders to that products when order placed