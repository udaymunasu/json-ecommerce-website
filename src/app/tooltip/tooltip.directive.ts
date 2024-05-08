import { Directive, ElementRef, Input, HostListener, Renderer2, ComponentFactoryResolver, ViewContainerRef, ComponentRef, Injector } from '@angular/core';
import { TooltipComponent } from './tooltip.component';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  @Input() appTooltip: string;
  @Input() tooltipPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';
  private tooltipComponentRef: ComponentRef<TooltipComponent> | null = null;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private viewContainerRef: ViewContainerRef
  ) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.showTooltip();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hideTooltip();
  }

  private showTooltip() {
    if (!this.tooltipComponentRef) {
      const factory = this.resolver.resolveComponentFactory(TooltipComponent);
      this.tooltipComponentRef = this.viewContainerRef.createComponent(
        factory,
        0,
        this.injector,
        []
      );
      this.tooltipComponentRef.instance.text = this.appTooltip;
      this.tooltipComponentRef.instance.position = this.tooltipPosition;

      const tooltipElement = this.tooltipComponentRef.location.nativeElement;
      document.body.appendChild(tooltipElement);

      this.updateTooltipPosition();

      window.addEventListener('scroll', this.updateTooltipPosition);
      window.addEventListener('resize', this.updateTooltipPosition);
    }
  }

  private hideTooltip() {
    if (this.tooltipComponentRef) {
      this.tooltipComponentRef.destroy();
      this.tooltipComponentRef = null;

      window.removeEventListener('scroll', this.updateTooltipPosition);
      window.removeEventListener('resize', this.updateTooltipPosition);
    }
  }

  private updateTooltipPosition = () => {
    if (this.tooltipComponentRef) {
      const tooltipElement = this.tooltipComponentRef.location.nativeElement;
      const elementRect = this.elementRef.nativeElement.getBoundingClientRect();
      const tooltipRect = tooltipElement.getBoundingClientRect();
      const offset = 10; // Offset from the element

      let top: number, left: number;

      switch (this.tooltipPosition) {
        case 'top':
          top = elementRect.top - tooltipRect.height - offset;
          left = elementRect.left + (elementRect.width - tooltipRect.width) / 2;
          break;
        case 'bottom':
          top = elementRect.bottom + offset;
          left = elementRect.left + (elementRect.width - tooltipRect.width) / 2;
          break;
        case 'left':
          top = elementRect.top + (elementRect.height - tooltipRect.height) / 2;
          left = elementRect.left - tooltipRect.width - offset;
          break;
        case 'right':
          top = elementRect.top + (elementRect.height - tooltipRect.height) / 2;
          left = elementRect.right + offset;
          break;
        default:
          top = elementRect.top - tooltipRect.height - offset;
          left = elementRect.left + (elementRect.width - tooltipRect.width) / 2;
      }

      tooltipElement.style.position = 'absolute'; // Set position to absolute
      tooltipElement.style.top = `${top}px`;
      tooltipElement.style.left = `${left}px`;
    }
  }
}
