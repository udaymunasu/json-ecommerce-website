import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConnectableObservable } from 'rxjs';
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
      const filterWithThese = this.productData.category;
      const relatedProducts = this.allProducts.filter((product: any) => {
        const prodCategories = Array.isArray(product.category)
          ? product.category : [product.category]
          return prodCategories.some(category => filterWithThese.includes(category))

      });
      console.log(' this.relatedProducts  ////////', relatedProducts);
      this.relatedProducts = relatedProducts

      // product.category.split(',').map((category: any) => category.trim());

      // const filterFrom = Array.isArray(this.productData.category) ?  Array.isArray(this.productData.category).forEach(data => console.log("data......", data))
      // prodCat.some(data =>  data)
      // console.log('prodCat  ,data.category', );

      //  console.log(" prodCat.includes(this.productData.category.forEach(data => data))",  prodCat.includes())
    });
// 
    console.log(' this.relatedProducts', this.relatedProducts);
  }

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
