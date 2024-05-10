import { Component, OnInit } from '@angular/core';
import { product } from '../data-types';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  crouselImages = [
    {
      image: 'assets/carousel/biggestsale.jpg',
      name: 'biggestsale',
    },
    {
      image: 'assets/carousel/bigsavingdays.jpg',
      name: 'bigsavingdays',
    },
    {
      image: 'assets/carousel/bigDiwalisale.jpg',
      name: 'coffesaledays',
    },
    {
      image: 'assets/carousel/dovesupersaver.jpeg',
      name: 'dovesupersaver',
    },
    {
      image: 'assets/carousel/laptopoffer.png',
      name: 'laptopoffer',
    },
    {
      image: 'assets/carousel/masalaoffer.jpg',
      name: 'masalaoffer',
    },
    {
      image: 'assets/carousel/caroes.jpg',
      name: 'caroes',
    },
    {
      image: 'assets/carousel/bigsavingdays.jpg',
      name: 'biggestsavingdays',
    },
    {
      image: 'assets/carousel/sbibanneroffer.jpg',
      name: 'sbibanneroffer',
    },
  ];

  colors = ['Red', 'Blue', 'Green'];
  sizes = ['Small', 'Medium', 'Large'];
  categories = ['Electronics', 'Clothing', 'Books'];

  slideWidth: number = 300;

  popularProducts: undefined | product[];
  allProducts: { [category: string]: any[] } = {};
  trendyProducts: undefined | product[];
  constructor(private product: ProductService) {}

  products: any;
  filteredProducts: any;

  ngOnInit(): void {
    this.product.productList().subscribe((data) => {
      this.products = data;
      this.allProducts = this.organizeProductsByCategory(data);
      console.log(' this.allProducts', this.allProducts);
    });

    this.product.popularProducts().subscribe((data) => {
      this.popularProducts = data;
    });

    this.product.trendyProducts().subscribe((data) => {
      this.trendyProducts = data;
    });
  }

  organizeProductsByCategory(products: any[]) {
    const categorizedProducts: { [category: string]: any[] } = {};

    products.forEach((product) => {
      if (Array.isArray(product.category)) {
        product.category.forEach((category) => {
          if (!categorizedProducts[category]) {
            categorizedProducts[category] = [];
          }
          categorizedProducts[category].push(product);
        });
      } else if (typeof product.category === 'string') {
        const category = product.category;
        if (!categorizedProducts[category]) {
          categorizedProducts[category] = [];
        }
        categorizedProducts[category].push(product);
      }
    });

    return categorizedProducts;
  }

  applyFilters() {
    const selectedColor = (
      document.querySelector('input[name="color"]:checked') as HTMLInputElement
    )?.value;
    const selectedSize = (
      document.querySelector('input[name="size"]:checked') as HTMLInputElement
    )?.value;
    const selectedCategories = Array.from(
      document.querySelectorAll('input[name="category"]:checked')
    ).map((checkbox: any) => checkbox.value);

    this.filteredProducts = this.products.filter((product) => {
      return (
        (!selectedColor || product.color === selectedColor) &&
        (!selectedSize || product.size === selectedSize) &&
        (selectedCategories.length === 0 ||
          product.category.some((cat) => selectedCategories.includes(cat)))
      );
    });

    console.log("this.filteredProducts", this.filteredProducts)
  }
}
