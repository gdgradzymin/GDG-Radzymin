import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentfulService } from '../../../services/contentful.service';
import { flatMap, switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events$: Observable<any>;
  eventsSub: Event[] = [];

  constructor(private contentful: ContentfulService) {}

  ngOnInit() {
    this.contentful.logContent('2IKTXNxxdCO4gwOGsAkooC');
    this.contentful.logEvents();
    // this.events$ = this.contentful.getContent('2IKTXNxxdCO4gwOGsAkooC');
    this.events$ = this.contentful.getEvents(2);
    this.events$
      .subscribe((events: any) => {
        this.eventsSub = events;
        console.log('events from sub: ', this.eventsSub);
      });
  }
}
