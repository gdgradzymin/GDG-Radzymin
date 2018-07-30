import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ContentfulService } from '../../../services/contentful.service';
import { flatMap, switchMap, map, filter } from 'rxjs/operators';
import { GdgEvent } from '../../../models/gdg-event.model';
import { SettingsService, Lang } from '../../../services/settings.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, OnDestroy {
  events$: Observable<GdgEvent[]>;
  events: Event[] = [];
  eventsSub: Subscription;
  gdgRadzyminOnly = false;
  showPastEvents = true;
  sortAsc = false;
  langSubscription: Subscription;

  constructor(
    private contentful: ContentfulService,
    private settings: SettingsService
  ) {
    this.langSubscription = this.settings
      .getCurrentLang()
      .subscribe((lang: Lang) => {
        // it's time to change reload content
        this.loadEvents();
      });
  }

  ngOnInit() {
    this.loadEvents();
    this.eventsSub = this.events$.subscribe((events: any) => {
      this.events = events;
      // console.log('events from sub: ', this.events);
    });
  }

  loadEvents() {
    this.events$ = this.contentful.getEvents(
      100,
      this.showPastEvents,
      this.gdgRadzyminOnly,
      this.sortAsc
    );
  }

  ngOnDestroy() {
    if (this.eventsSub) {
      this.eventsSub.unsubscribe();
    }
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }
}
