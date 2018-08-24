import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ContentfulService } from '../../../services/contentful.service';
import { flatMap, switchMap, map, filter } from 'rxjs/operators';
import { GdgEvent } from '../../../models/gdg-event.model';
import { SettingsService, Lang } from '../../../services/settings.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  group,
  stagger,
  keyframes,
  query
} from '@angular/animations';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', style({ opacity: 0, transform: 'translateY(-50px)' }), {
          optional: true
        }),
        query(
          ':enter',
          stagger('300ms', [
            animate(
              '800ms 200ms ease-out',
              style({ opacity: 1, transform: 'translateY(0)' })
            )
          ]),
          { optional: true }
        )
      ])
    ])
  ]
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
    private settings: SettingsService,
    private title: Title,
    private meta: Meta,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.loadEvents();
    this.langSubscription = this.settings
      .getCurrentLang()
      .subscribe((lang: Lang) => {
        // it's time to change reload content
        this.title.setTitle(
          this.translate.instant('eventspagetitle')
        );
        this.meta.updateTag({
          name: 'description',
          content: this.translate.instant('eventspagedesc')
        });
        this.loadEvents();
      });
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
