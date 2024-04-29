import { trigger, transition, style, animate } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { product } from '../data-types';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class CarouselComponent implements OnInit {

  constructor() { }

  @Input() slides: any;
  @Input() slideStep: number = 300;
  @Input() interval: number = 5000; // Default interval: 5 seconds
  currentPosition: number = 0;
  totalSlides: number = 0;
  intervalId: any;

  ngOnInit(): void {
    this.totalSlides = this.slides.length;
    this.startSlider();
  }

  ngOnDestroy(): void {
    this.stopSlider();
  }

  startSlider(): void {
    this.intervalId = setInterval(() => {
      this.slide('right');
    }, this.interval);
  }

  stopSlider(): void {
    clearInterval(this.intervalId);
  }

  slide(direction: 'left' | 'right'): void {
    const slideWidth = this.slideStep;
    const maxPosition = -(this.totalSlides - 1) * slideWidth;

    if (direction === 'left') {
      this.currentPosition += slideWidth;
      if (this.currentPosition > 0) {
        this.currentPosition = maxPosition;
      }
    } else {
      this.currentPosition -= slideWidth;
      if (this.currentPosition < maxPosition) {
        this.currentPosition = 0;
      }
    }
  }
}
