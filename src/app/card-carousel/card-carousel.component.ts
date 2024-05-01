import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-card-carousel',
  templateUrl: './card-carousel.component.html',
  styleUrls: ['./card-carousel.component.scss'],
})
export class CardCarouselComponent implements OnInit, OnDestroy {
  items = [
    { image: 'https://www.filmibeat.com/wimg/desktop/2012/12/13548612746596.jpg', name: 'Product 1', price: '$10' },
    { image: 'https://cdn.shopify.com/s/files/1/0011/8367/8476/products/Truck2_1400x.png?v=1662789388', name: 'Product 2', price: '$20' },
    { image: 'https://cdn1.smartprix.com/rx-iiFm2GL4O-w1200-h1200/noise-colorfit-ultra.jpg', name: 'Product 3', price: '$30' },
    { image: 'https://images.pexels.com/photos/2066896/pexels-photo-2066896.jpeg?auto=compress&cs=tinysrgb&w=400', name: 'Product 4', price: '$40' },
    { image: 'https://images.pexels.com/photos/17362823/pexels-photo-17362823/free-photo-of-two-elegant-men-in-suits.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', name: 'Product 5', price: '$50' },
    { image: 'https://img.freepik.com/free-vector/climate-control-poster-with-air-conditioning-technology-symbols-realistic-illustration_1284-29136.jpg?w=740&t=st=1698487604~exp=1698488204~hmac=4a6e6355d17faa546af689d37c5e6e0cc3e8e93282a3bcf1b2a6533e9a2ce687', name: 'Product 6', price: '$60' },
    { image: 'https://images.pexels.com/photos/6933852/pexels-photo-6933852.jpeg?auto=compress&cs=tinysrgb&w=600', name: 'Product 7', price: '$70' },
    { image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHN8ZW58MHx8MHx8&w=1000&q=80', name: 'Product 8', price: '$80' },
    { image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHN8ZW58MHx8MHx8&w=1000&q=80', name: 'Product 9', price: '$90' },
    { image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHN8ZW58MHx8MHx8&w=1000&q=80', name: 'Product 10', price: '$100' },
    // Add more items as needed
  ];

  position: number = 0;
  itemWidth: number = 220; // Adjust as needed (card width + margin)
  lastIndex: number;

  constructor(private elementRef: ElementRef) {}

  @ViewChild('carousel', { static: true }) carousel: ElementRef;

  ngOnInit(): void {
    this.calculateLastIndex();
    this.adjustItemWidth();
  }

  ngOnDestroy(): void {
    // Clean up any subscriptions, timers, etc. if needed
  }

  calculateLastIndex() {
    this.lastIndex = Math.max(0, this.items.length - this.visibleItems());
  }

  adjustItemWidth() {
    const element = this.elementRef.nativeElement as HTMLElement;
    const containerWidth = element.offsetWidth;
    const itemsPerView = Math.floor(containerWidth / this.itemWidth);
    this.itemWidth = containerWidth / itemsPerView;
  }

  visibleItems(): number {
    const element = this.elementRef.nativeElement as HTMLElement;
    const containerWidth = element.offsetWidth;
    return Math.floor(containerWidth / this.itemWidth);
  }

  next() {
    if (this.position > -this.lastIndex * this.itemWidth) {
      this.position -= this.itemWidth * this.visibleItems();
    } else {
      this.position = 0;
    }
  }

  prev() {
    if (this.position < 0) {
      this.position += this.itemWidth * this.visibleItems();
    } else {
      this.position = -this.lastIndex * this.itemWidth;
    }
  }
}

  
