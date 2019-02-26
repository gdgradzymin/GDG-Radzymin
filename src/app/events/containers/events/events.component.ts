import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { GdgEvent } from "../../../models/gdg-event.model";
import { SettingsService, Metatags } from "../../../services/settings.service";
import {
  trigger,
  style,
  transition,
  animate,
  stagger,
  query
} from "@angular/animations";
import { MetatagsService } from "../../../services/metatags.service";
import { takeUntil, switchMap } from "rxjs/operators";
import { StateService } from "~/app/services/state.service";
import { ActivatedRoute } from "@angular/router";

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
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.data
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((metatags: Metatags) => {
        this.meta.updateMetaDesc(metatags.desc);
        this.meta.updateTitle(metatags.title);
        this.meta.updateMetaKeywords(metatags.keywords);
      });

    const currentLang$ = this.settings
      .getCurrentLang()
      .pipe(takeUntil(this.destroySubject$));

    currentLang$
      .pipe(
        takeUntil(this.destroySubject$),
        switchMap(() => {
          return this.settings.getMetatags("events");
        })
      )
      .subscribe((metatags: Metatags) => {
        this.meta.updateMetaDesc(metatags.desc);
        this.meta.updateTitle(metatags.title);
        this.meta.updateMetaKeywords(metatags.keywords);

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
