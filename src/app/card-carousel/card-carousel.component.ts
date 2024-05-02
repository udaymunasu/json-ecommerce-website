import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-card-carousel',
  templateUrl: './card-carousel.component.html',
  styleUrls: ['./card-carousel.component.scss'],
})
export class CardCarouselComponent implements OnInit, OnDestroy {
  

  @Input() items: any;

  position: number = 0;
  itemWidth: number = 220; // Adjust as needed (card width + margin)
  lastIndex: number;

  constructor(private elementRef: ElementRef) {}

  @ViewChild('carousel', { static: true }) carousel: ElementRef;

  ngOnInit(): void {
    console.log(
      "card carousel",this.items)
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

  
