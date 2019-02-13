import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from "@angular/core";
import { Observable, Subscription, combineLatest, Subject } from "rxjs";
import { ContentfulService } from "../../../services/contentful.service";
import { GdgEvent } from "../../../models/gdg-event.model";
import { SettingsService, Lang } from "../../../services/settings.service";
import {
  trigger,
  style,
  transition,
  animate,
  stagger,
  query
} from "@angular/animations";
import { TranslateService } from "@ngx-translate/core";
import { MetatagsService } from "../../../services/metatags.service";
import { mergeMap, takeUntil } from "rxjs/operators";
import { StateService } from "~/app/services/state.service";

@Component({
  selector: "app-events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger("listAnimation", [
      transition("* => *", [
        query(":enter", style({ opacity: 0, transform: "translateY(-50px)" }), {
          optional: true
        }),
        query(
          ":enter",
          stagger("300ms", [
            animate(
              "800ms 200ms ease-out",
              style({ opacity: 1, transform: "translateY(0)" })
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

  gdgRadzyminOnly: boolean;
  showPastEvents: boolean;
  sortAsc: boolean;

  destroySubject$: Subject<void> = new Subject();

  constructor(
    private state: StateService,
    private settings: SettingsService,
    private meta: MetatagsService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    const currentLang$ = this.settings
      .getCurrentLang()
      .pipe(takeUntil(this.destroySubject$));

    currentLang$
      .pipe(
        takeUntil(this.destroySubject$),
        mergeMap(() => {
          return combineLatest(
            this.translate
              .get("eventspagedesc")
              .pipe(takeUntil(this.destroySubject$)),
            this.translate
              .get("eventspagetitle")
              .pipe(takeUntil(this.destroySubject$)),
            this.translate
              .get("eventspagekeywords")
              .pipe(takeUntil(this.destroySubject$))
          );
        })
      )
      .subscribe((translations: Array<string>) => {
        this.meta.updateMetaDesc(translations[0]);
        this.meta.updateTitle(translations[1]);
        this.meta.updateMetaKeywords(translations[2]);

      });

      this.events$ = this.state.getFilteredEvents();

      this.state.getEventsFilterGdgRadzyminOnly().pipe(
        takeUntil(this.destroySubject$)
      ).subscribe(
        (gdgRadzyminOnly: boolean) => {
          this.gdgRadzyminOnly = gdgRadzyminOnly;
        }
      );

      this.state.getEventsFilterShowPastEvents().pipe(
        takeUntil(this.destroySubject$)
      ).subscribe(
        (showPastEvents: boolean) => {
          this.showPastEvents = showPastEvents;
        }
      );

      this.state.getEventsFilterSortAsc().pipe(
        takeUntil(this.destroySubject$)
      ).subscribe(
        (sortAsc: boolean) => {
          this.sortAsc = sortAsc;
        }
      );

  }

  changeFilter1(gdgRadzyminOnly: boolean): void {
    this.state.setEventsFilterGdgRadzyminOnly(gdgRadzyminOnly);
  }

  changeFilter2(showPastEvents: boolean): void {
    this.state.setEventsFilterShowPastEvents(showPastEvents);
  }

  changeFilter3(sortAsc: boolean): void {
    this.state.setEventsFilterSortAsc(sortAsc);
  }

  ngOnDestroy() {
    this.destroySubject$.next();
  }
}
