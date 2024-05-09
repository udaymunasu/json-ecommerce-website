import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-card-carousel',
  templateUrl: './card-carousel.component.html',
  styleUrls: ['./card-carousel.component.scss'],
})
export class CardCarouselComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() items: any[] = [];
  @Input() itemWidth: number = 250; // Default item width
  @Input() transitionDuration: number = 300; // Default transition duration
  @Input() autoPlay: boolean = false; // Default auto play setting
  @Input() scrollBar: boolean = true; // Default Scrollbar setting
  @Input() dotsBar: boolean = true; // Default dotsBar setting
  @Input() autoPlayInterval: number = 3000; // Default auto play interval

  swipeStartX: number;
  swipeThreshold = 50; // Minimum distance to recognize a swipe (in pixels)
  autoPlayIntervalId: any;
  firstVisibleIndex = 0;
  lastIndex = 0;

  @ViewChild('carouselContainer') carouselContainer: ElementRef<HTMLElement>;
  position: number;

  ngOnInit(): void {
    this.calculateLastIndex();
    if (this.autoPlay) {
      this.startAutoPlay();
    }

    console.log("this.items", this.items);
  }

  ngAfterViewInit(): void {
    this.adjustItemWidth();
    this.updateScrollbar();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  calculateLastIndex() {
    if (this.carouselContainer?.nativeElement) {
      const containerWidth = this.carouselContainer.nativeElement.clientWidth;
      const itemsPerPage = Math.floor(containerWidth / this.itemWidth); // Include partially visible items
      this.lastIndex = Math.max(0, this.items.length - itemsPerPage - 5);
    }
  }

  adjustItemWidth() {
    const element = this.carouselContainer?.nativeElement;
    if (element) {
      const containerWidth = element.offsetWidth;
      const itemsPerView = Math.floor(containerWidth / this.itemWidth);
      this.itemWidth = containerWidth / itemsPerView;
      this.calculateLastIndex();
    }
  }

  visibleItems(): number {
    const element = this.carouselContainer?.nativeElement;
    let containerWidth = 0; // Initialize with 0
    if (element) {
      containerWidth = element.offsetWidth;
    }
    return Math.floor(containerWidth / this.itemWidth);
  }

  prev() {
    if (this.firstVisibleIndex > 0) {
      this.firstVisibleIndex--;
    } else {
      this.firstVisibleIndex = this.lastIndex;
    }
    this.position = -this.firstVisibleIndex * this.itemWidth;
    this.updateScrollbar();
  }

  next() {
    if (this.firstVisibleIndex < this.lastIndex) {
      this.firstVisibleIndex++;
    } else {
      this.firstVisibleIndex = 0;
    }
    this.position = -this.firstVisibleIndex * this.itemWidth;
    this.updateScrollbar();
  }

  goToSlide(index: number) {
    if (index === this.lastIndex) {
      this.firstVisibleIndex = Math.max(0, this.items.length - 10);
      this.position = -this.firstVisibleIndex * this.itemWidth;
    } else {
      this.firstVisibleIndex = index;
      this.position = -this.firstVisibleIndex * this.itemWidth;
      if (this.position < -this.lastIndex * this.itemWidth) {
        this.position = -this.lastIndex * this.itemWidth;
      }
    }
    this.updateScrollbar();
  }

  updateScrollbar() {
    if (this.carouselContainer) {
        const visibleItemsCount = this.visibleItems();
        const totalItems = this.items.length;
        const containerWidth = this.carouselContainer.nativeElement.offsetWidth;
        const thumbWidth = Math.min((visibleItemsCount / totalItems) * 100, (containerWidth / totalItems) * 100);
        const thumbPosition = (this.firstVisibleIndex / (totalItems - visibleItemsCount)) * (100 - thumbWidth);
        
        this.carouselContainer.nativeElement.style.setProperty(
            '--thumb-position',
            `${thumbPosition}%`
        );

        this.carouselContainer.nativeElement.style.setProperty(
            '--thumb-width',
            `${thumbWidth}%`
        );
    }
}
  

  startAutoPlay() {
    this.autoPlayIntervalId = setInterval(() => {
      this.next();
    }, this.autoPlayInterval);
  }

  stopAutoPlay() {
    clearInterval(this.autoPlayIntervalId);
  }
}
