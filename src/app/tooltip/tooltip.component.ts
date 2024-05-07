import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {

  constructor() { }

  @Input() text: string;
  @Input() position: 'top' | 'bottom' | 'left' | 'right' = 'top';

  ngOnInit(): void {
  }

}
