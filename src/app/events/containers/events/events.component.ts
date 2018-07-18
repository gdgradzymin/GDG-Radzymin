import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ContentfulService } from '../../../services/contentful.service';
import { flatMap, switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, OnDestroy {
  events$: Observable<any>;
  events: Event[] = [];
  eventsSub: Subscription;

  constructor(private contentful: ContentfulService) {}

  ngOnInit() {
    this.contentful.logContent('2IKTXNxxdCO4gwOGsAkooC');
    this.contentful.logEvents();
    // this.events$ = this.contentful.getContent('2IKTXNxxdCO4gwOGsAkooC');
    this.events$ = this.contentful.getEvents(2);
    this.eventsSub = this.events$.subscribe((events: any) => {
      this.events = events;
      console.log('events from sub: ', this.events);
    });
  }

  ngOnDestroy() {
    if (this.eventsSub) {
      this.eventsSub.unsubscribe();
    }
  }
}
