import {
  trigger,
  transition,
  style,
  animate,
  animation,
  useAnimation,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { product } from '../data-types';

export const fadeIn = animation([
  style({ transform: 'translateX(100%)' }), // start state
  animate('300ms ease-in', style({ transform: 'translateX(0%)' })),
]);

export const fadeOut = animation([
  style({ transform: 'translateX(0%)' }), // start state

  animate('300ms ease-out', style({ transform: 'translateX(-100%)' })),
]);

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [useAnimation(fadeIn)]),
      transition('* => void', [useAnimation(fadeOut)]),
    ]),
  ],
})
export class CarouselComponent implements OnInit {
  constructor() {}

  @Input() slides: any;
  @Input() slideStep: number = 300;
  @Input() interval: number = 5000; // Default interval: 5 seconds
  currentPosition: number = 0;
  totalSlides: number = 0;
  intervalId: any;

  ngOnInit(): void {
    this.totalSlides = this.slides.length;
    this. startAutoPlay()
  }

  ngOnDestroy(): void {}

  currentSlide = 0;

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.slides.length - 1 : previous;
    // console.log('previous clicked, new current slide is: ', this.currentSlide);
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.slides.length ? 0 : next;
    // console.log('next clicked, new current slide is: ', this.currentSlide);
  }

  startAutoPlay() {
     setInterval(() => {
      this.onNextClick();
    },2000);
  }
}
