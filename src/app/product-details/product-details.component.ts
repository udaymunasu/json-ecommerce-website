import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product, cart } from '../data-types';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | product | any;
  productQuantity: number = 1;
  removeCart = false;
  cartData: product | undefined;
  relatedProducts: any;

  allProducts: any;
  constructor(
    private activeRoute: ActivatedRoute,
    private product: ProductService
  ) {}

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    console.warn(productId);
    productId &&
      this.product.getProduct(productId).subscribe((result) => {
        this.productData = result;
        console.log('  this.productData ', this.productData);
        let cartData = localStorage.getItem('localCart');
        if (productId && cartData) {
          let items = JSON.parse(cartData);
          items = items.filter(
            (item: product) => productId === item.id.toString()
          );
          if (items.length) {
            this.removeCart = true;
          } else {
            this.removeCart = false;
          }
        }

        let user = localStorage.getItem('user');
        if (user) {
          let userId = user && JSON.parse(user).id;
          this.product.getCartList(userId);

          this.product.cartData.subscribe((result) => {
            let item = result.filter(
              (item: product) =>
                productId?.toString() === item.productId?.toString()
            );
            if (item.length) {
              this.cartData = item[0];
              this.removeCart = true;
            }
          });
        }
      });

    this.getAllproducts();
  }

  getAllproducts() {
    this.product.productList().subscribe((data) => {
      this.allProducts = data;
      this.relatedProducts = this.allProducts.forEach((data: any) => {
        // data.category = this.productData.category
        // console.log("data.category", typeof data.category)

        if (typeof data.category === 'object') {
          // data.catgeory.hasValues(this.productData.category);
          Object.values(data.category).includes(this.productData.category);
        } else {
          data.category = this.productData.category;
        }
      });
      // this.allProducts.filter((data: any) => {
      //   if (Array(data.category)) {
      //     data.category = this.productData.category;
      //   }
      // });
    });

    console.log(' this.relatedProducts', this.relatedProducts);
  }

  // this.relatedProducts =  this.productData.filter(data => data.category === )

  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }

  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.product.localAddToCart(this.productData);
        this.removeCart = true;
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartData: any = {
          ...this.productData,
          productId: this.productData.id,
          userId,
        };
        delete cartData.id;
        this.product.addToCart(cartData).subscribe((result) => {
          if (result) {
            this.product.getCartList(userId);
            this.removeCart = true;
          }
        });
      }
    }
  }
  removeToCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this.product.removeItemFromCart(productId);
    } else {
      console.warn('cartData', this.cartData);

      this.cartData &&
        this.product.removeToCart(this.cartData.id).subscribe((result) => {
          let user = localStorage.getItem('user');
          let userId = user && JSON.parse(user).id;
          this.product.getCartList(userId);
        });
    }
    this.removeCart = false;
  }

  getRelatedProducts() {}
}
