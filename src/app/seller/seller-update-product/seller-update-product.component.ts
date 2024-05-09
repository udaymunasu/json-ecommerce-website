import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from 'src/app/data-types';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.scss'],
})
export class SellerUpdateProductComponent implements OnInit {
  productData: undefined | product | any;
  productForm: FormGroup;
  productMessage: undefined | string;
  productId: string | null; // Variable to store product ID

  imageUrl: string | ArrayBuffer | null = null;
  imageString: string | null = null;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: [''],
      price: [''],
      category: [''],
      color: [''],
      description: [''],
      brand: [''],
      material: [''],
      image: ['']
    });

    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.productService.getProduct(this.productId)
        .subscribe((product: any) => {
          this.productData = product;
          this.patchFormWithProductData();
        });
    }
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  submit() {
    console.log("this.categoryItems", this.categoryItems)
    this.productForm.get('category')?.setValue(this.categoryItems);
  
    let data = this.productForm.value;
    console.log("data", data)
    if (this.productData) {
      data.id = this.productData.id;
    }
    this.productService.updateProduct(data).subscribe((result) => {
      if (result) {
        this.productMessage = 'Product has been updated';
        setTimeout(() => {
          this.productMessage = undefined;
        }, 3000);
        this.router.navigate(['seller/seller-home']);
      }
    });
  }

  categoryInputArrayMode: boolean = false;
  patchFormWithProductData() {
    this.productForm.patchValue({
      name: this.productData?.name || '',
      price: this.productData?.price || '',
      color: this.productData?.color || '',
      description: this.productData?.description || '',
      brand: this.productData?.brand || '',
      material: this.productData?.material || '',
      image: this.productData?.image || '',
      category: this.productData?.category || ''
    });

    this.categoryInputArrayMode = Array.isArray(this.productData?.category) &&
      this.productData.category.length > 1;
  }

  categoryItems: string[] = [];

  addCategory(event: Event) {
    event.preventDefault(); // Prevent form submission
    const newCategory = this.productForm.get('category')?.value.trim();
    if (newCategory !== '') {
      this.categoryItems.push(newCategory);
      this.productForm.get('category')?.setValue(''); // Clear the input field
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = (e: any) => {
      const img = new Image();
      img.src = e.target.result;
  
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
  
        // Set canvas dimensions to the scaled size
        const maxWidth = 800; // Adjust this according to your requirement
        const maxHeight = 600; // Adjust this according to your requirement
        let width = img.width;
        let height = img.height;
  
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }
  
        canvas.width = width;
        canvas.height = height;
  
        // Draw image on canvas
        ctx?.drawImage(img, 0, 0, width, height);
  
        // Convert canvas to base64 string
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7); // Adjust quality as needed
  
        this.imageString = compressedBase64;
        // Update form value
        this.productForm.patchValue({
          image: compressedBase64, // Convert image to base64 string
        });
  
        console.log('this.imageString ', this.imageString );
      };
    };
  
    reader.readAsDataURL(file);
  }
  

  get categoryControls() {
    return this.productForm.get('category') as FormArray;
  }
}
