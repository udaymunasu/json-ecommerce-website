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
  cartData: cart[] | undefined | any;
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
    const user = localStorage.getItem('user');
    const userId = user ? JSON.parse(user).id : null;
    
    if (!userId || !this.totalPrice || !this.cartData || this.cartData.length === 0) {
      return; // Exit if userId is null, totalPrice is missing, or cartData is empty
    }
  
    const orderData: order = {
      ...data,
      totalPrice: this.totalPrice,
      userId,
      id: undefined,
    };
  
    // Place order
    this.product.orderNow(orderData).subscribe((result) => {
      if (result) {
        this.orderMsg = 'Order has been placed';
        setTimeout(() => {
          this.orderMsg = undefined;
          this.router.navigate(['/my-orders']);
        }, 4000);
  
        // Update product data
        this.cartData.forEach((item) => {
          if (item.productId) {
            this.product.getProduct(item.productId).subscribe((product: any) => {
              if (product) {
                product.noOfTimesOrdered = (product.noOfTimesOrdered || 0) + 1;
                this.product.updateProduct(product).subscribe(() => {
                  console.log(`Product ${product.id} updated with noOfTimesOrdered`);
                });
              }
            });
          }
        });
      }
    });
  }
  
}


// update the noOfOrders to that products when order placed