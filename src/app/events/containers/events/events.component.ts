import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ContentfulService } from '../../../services/contentful.service';
import { GdgEvent } from '../../../models/gdg-event.model';
import { SettingsService, Lang } from '../../../services/settings.service';
import {
  trigger,
  style,
  transition,
  animate,
  stagger,
  query
} from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';
import { MetatagsService } from '../../../services/metatags.service';

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
  pageDescSub: Subscription;
  pageTitleSub: Subscription;
  pageKeywordsSub: Subscription;

  constructor(
    private contentful: ContentfulService,
    private settings: SettingsService,
    private meta: MetatagsService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.loadEvents();
    this.langSubscription = this.settings
      .getCurrentLang()
      .subscribe((lang: Lang) => {
        // it's time to change reload content
        this.pageDescSub = this.translate
          .get('eventspagedesc')
          .subscribe((desc: string) => {
            this.meta.updateMetaDesc(desc);
          });

        this.pageTitleSub = this.translate
          .get('eventspagetitle')
          .subscribe((title: string) => {
            this.meta.updateTitle(title);
          });

        this.pageKeywordsSub = this.translate
          .get('eventspagekeywords')
          .subscribe((k: string) => {
            this.meta.updateMetaKeywords(k);
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
    if (this.pageDescSub) {
      this.pageDescSub.unsubscribe();
    }
    if (this.pageTitleSub) {
      this.pageTitleSub.unsubscribe();
    }

    if (this.pageKeywordsSub) {
      this.pageKeywordsSub.unsubscribe();
    }
  }
}
