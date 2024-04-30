import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/data-types';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.scss'],
})
export class SellerAddProductComponent implements OnInit {


  constructor(private product: ProductService) {}


  addProductMessage: string | undefined;

  // image upload: 
  imageUrl: string | ArrayBuffer | null = null;
  imageString: string | null = null;


  ngOnInit(): void {}

 


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
      this.convertToBase64(file);
    };

    reader.readAsDataURL(file);
  }

  convertToBase64(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageString = reader.result as string;
    };
    reader.onerror = (error) => {
      console.error('Error: ', error);
    };
    reader.readAsDataURL(file);
  }

  submit(data: product) {
    data.image = this.imageString;
    this.product.addProduct(data).subscribe((result) => {
      console.log("result", result);
      if (result) {
        this.addProductMessage = 'Product is added successfully';
      }
    });

    setTimeout(() => {
      this.addProductMessage = undefined;
    }, 3000);
  }
}
