import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, priceSummary } from '../data-types';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  cartData: cart[] | undefined;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }
  constructor(private product: ProductService, private router: Router) { }

  ngOnInit(): void {
    console.log("Helllllloooo")
   this.loadDetails()

  }

  removeToCart(cartId:number|undefined){
    cartId && this.cartData && this.product.removeToCart(cartId)
    .subscribe((result)=>{
      this.loadDetails();
    })
  }

  loadDetails() {
    this.product.currentCart().subscribe((result) => {
      this.cartData = result;
      console.warn(this.cartData);
      let price = 0;
      result.forEach((item: any) => {
        console.log("Item quantity:", item.quantity);
        console.log("Item price:", item.price);
        if (item.quantity && item.price && !isNaN(item.quantity) && !isNaN(item.price)) { // Check if both quantity and price are defined and valid numbers
          price += (parseFloat(item.price) * parseInt(item.quantity)); // Convert strings to numbers
        }
      });
  
      console.log("Total price before discounts and tax:", price);
  
      // Calculate price summary
      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price + (price / 10) + 100 - (price / 10);
  
      console.log("this.priceSummary", this.priceSummary);
  
      if (!this.cartData.length) {
        this.router.navigate(['/']);
      }
  
    });
  }
  



  checkout() {
    this.router.navigate(['/checkout'])
  }

}
