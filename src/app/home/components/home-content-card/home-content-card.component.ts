import { Component, OnInit, Input } from '@angular/core';
import { GdgHomeContent } from '../../../models/gdg-home-content.model';

@Component({
  selector: 'app-home-content-card',
  templateUrl: './home-content-card.component.html',
  styleUrls: ['./home-content-card.component.scss']
})
export class HomeContentCardComponent implements OnInit {
  @Input()
  item: GdgHomeContent;
  @Input()
  lp: number;

  constructor() {}

  ngOnInit() {}

  getCardColorCss(i: number): {} {
    const r = i % 5;
    switch (r) {
      case 1:
        return { 'content-white': true };
      case 2:
        return { 'content-green': true };
      case 3:
        return { 'content-yellow': true };
      case 4:
        return { 'content-red': true };
      case 0:
        return { 'content-blue': true };
      default:
        return { 'content-white': true };
    }
  }

  isEven(i: number): boolean {
    const r = i % 2;
    if (r === 0) {
      return true;
    } else {
      return false;
    }
  }
}
