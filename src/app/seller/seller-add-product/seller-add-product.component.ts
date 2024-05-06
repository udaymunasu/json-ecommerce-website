import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { product } from 'src/app/data-types';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.scss'],
})
export class SellerAddProductComponent implements OnInit {
  constructor(private product: ProductService, private fb: FormBuilder) {}

  addProductForm: FormGroup;
  addCategoryForm: FormGroup;

  addProductMessage: string | undefined;

  // image upload:
  imageUrl: string | ArrayBuffer | null = null;
  imageString: string | null = null;

  categoryItems: string[] = [];
  toggleProductCateory: boolean;

  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.addProductForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      category: [''],
      color: ['', Validators.required],
      description: ['', Validators.required],
      image: [''],
    });

    this.addCategoryForm = this.fb.group({
      name: [''],
      image: [''],
    });
  }

  toggleCategory() {
    this.toggleProductCateory = !this.toggleProductCateory;
  }

  createCategory() {
    console.log('category added', this.addCategoryForm.value);
    const formData = {
      ...this.addCategoryForm.value,
      category: this.categoryItems,
    };
    if (formData) {
      this.product.addCategory(formData).subscribe((result) => {
        console.log('result', result);
        if (result) {
          this.addProductMessage = 'Product is added successfully';
          this.addProductForm.reset();
        }
      });
    } else {
      this.addProductMessage = 'Product Fill all values';
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
      this.addProductForm.patchValue({
        image: reader.result, // Convert image to base64 string
      });
      console.log('Selected Image:', reader.result);
    };

    reader.readAsDataURL(file);
  }

  submit() {
    const formData = {
      ...this.addProductForm.value,
      category: this.categoryItems,
    };
    if (formData) {
      this.product.addProduct(formData).subscribe((result) => {
        console.log('result', result);
        if (result) {
          this.addProductMessage = 'Product is added successfully';
          this.addProductForm.reset();
        }
      });
    } else {
      this.addProductMessage = 'Product Fill all values';
    }

    setTimeout(() => {
      this.addProductMessage = undefined;
    }, 3000);
  }

  addCategory(event: Event) {
    event.preventDefault(); // Prevent form submission
    const newCategory = this.addProductForm.get('category')?.value.trim();
    if (newCategory !== '') {
      this.categoryItems.push(newCategory);
      this.addProductForm.get('category')?.setValue(''); // Clear the input field
    }
  }
}
