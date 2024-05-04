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
  allProducts:undefined|product[];
  trendyProducts:undefined | product[];
   constructor(private product:ProductService) {}
 
   ngOnInit(): void {
     this.product.productList().subscribe((data)=>{
       this.allProducts=data;
     })

     this.product.popularProducts().subscribe((data) => {
       this.popularProducts = data
     })
 
     this.product.trendyProducts().subscribe((data)=>{
       this.trendyProducts=data;
     })
   }

}
