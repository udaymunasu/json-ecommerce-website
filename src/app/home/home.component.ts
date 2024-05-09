import { Component, OnInit } from '@angular/core';
import { product } from '../data-types';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  carouselConfig = {
    itemWidth: 300, // Change the width of each carousel item
    transitionDuration: 500, // Change transition duration
    autoPlay: true, // Auto play carousel
    autoPlayInterval: 3000 // Auto play interval in milliseconds
  };


  slideWidth: number = 300;

  popularProducts:undefined|product[];
  allProducts:{ [category: string]: any[] } = {};
  trendyProducts:undefined | product[];
   constructor(private product:ProductService) {}
 
   ngOnInit(): void {
     this.product.productList().subscribe((data)=>{
       this.allProducts=this.organizeProductsByCategory(data);
       console.log(" this.allProducts",  this.allProducts)
     })

     this.product.popularProducts().subscribe((data) => {
       this.popularProducts = data
     })
 
     this.product.trendyProducts().subscribe((data)=>{
       this.trendyProducts=data;
     })
   }



   organizeProductsByCategory(products: any[]) {
    const categorizedProducts: { [category: string]: any[] } = {};

    products.forEach(product => {
      if (Array.isArray(product.category)) {
        product.category.forEach(category => {
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

}
