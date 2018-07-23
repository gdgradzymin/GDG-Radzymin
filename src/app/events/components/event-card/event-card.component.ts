import { Component, OnInit, Input } from '@angular/core';
import { GdgEvent } from '../../../models/gdg-event.model';
import { faCalendarAlt, faClock } from '@fortawesome/fontawesome-free-regular';
import { faMeetup } from '@fortawesome/fontawesome-free-brands';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {
  @Input() event: GdgEvent;

  faCalendarAlt = faCalendarAlt;
  faClock = faClock;
  faMeetup = faMeetup;

  constructor() {}

  ngOnInit() {}

  getCardColorCss(): {} {
    if (this.event && this.event.isOrganizerGdgRadzymin) {
      return { 'mat-card-header-gdg-radzymin': true };
    } else {
      return { 'mat-card-header-other': true };
    }
  }
}
