import { Component, OnInit } from '@angular/core';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { product } from 'src/app/data-types';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss']
})
export class SellerHomeComponent implements OnInit {

  productList: undefined | product[];
  productMessage: undefined | string;
  icon = faTrash;
  iconEdit=faEdit;

  toggleProductCateory: boolean = true;
  noOfProducts: any;

  categoryList: any;
  noOfcategories: any;

  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.list();
    this.getCategoryList();
  }

  toggleCategory() {
    this.toggleProductCateory = !this.toggleProductCateory
  }

  deleteProduct(id: number) {
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = 'Product is deleted';

        this.list();
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }

  list() {
    this.product.productList().subscribe((result) => {
      if (result) {
        this.productList = result;
        this.noOfProducts = this.productList.length;
        console.log(" this.productList",  this.productList)
      }
    });
  }

  deleteCategory(id: number) {
    this.product.deleteCategory(id).subscribe((result) => {
      if (result) {
        this.productMessage = 'Product is deleted';

        this.list();
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }

  getCategoryList() {
    this.product.getCategoryList().subscribe((result) => {
      if (result) {
        this.categoryList = result;
        this.noOfProducts = this.categoryList.length;
        console.log(" this.categoryList",  this.categoryList)
      }
    });
  }
}
