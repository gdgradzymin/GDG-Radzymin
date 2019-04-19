import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from "@angular/core";
import { SettingsService, Metatags } from "../../../services/settings.service";
import { MetatagsService } from "../../../services/metatags.service";
import { Observable, Subject } from "rxjs";
import { GdgDevFest } from "../../../models/gdg-devfest.model";
import { GdgContactInfo } from "../../../models/gdg-contact-info.model";
import { GdgDevFestEventItem } from "../../../models/gdg-devfest-event-item.model";
import { GdgDevFestSpeaker } from "../../../models/gdg-devfest-speaker.model";
import { takeUntil, switchMap, skip } from "rxjs/operators";
import { StateService } from "../../../services/state.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-devfest",
  templateUrl: "./devfest.component.html",
  styleUrls: ["./devfest.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevFestComponent implements OnInit, OnDestroy {
  devFests$: Observable<GdgDevFest[]>;
  devFestEventItems$: Observable<Array<GdgDevFestEventItem>>;
  devFestSpeakers$: Observable<Array<GdgDevFestSpeaker>>;
  contactInfo$: Observable<GdgContactInfo>;

  urlState$: Observable<string>;
  destroySubject$: Subject<void> = new Subject();

  constructor(
    private state: StateService,
    private settings: SettingsService,
    private meta: MetatagsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data
    .pipe(takeUntil(this.destroySubject$))
    .subscribe((metatags: Metatags) => {
      this.meta.updateMetaDesc(metatags.desc);
      this.meta.updateTitle(metatags.title);
      this.meta.updateMetaKeywords(metatags.keywords);
    });

    this.settings
      .getCurrentLang()
      .pipe(
        takeUntil(this.destroySubject$),
        skip(1),
        switchMap(() => {
          return this.settings.getMetatags("devfest");
        })
      )
      .subscribe((metatags: Metatags) => {
        this.meta.updateMetaDesc(metatags.desc);
        this.meta.updateTitle(metatags.title);
        this.meta.updateMetaKeywords(metatags.keywords);
      });

    this.loadDevFests();
    this.urlState$ = this.settings.getUrlState();
    this.contactInfo$ = this.state.getContactInfo();
  }

  loadDevFests() {
    this.devFests$ = this.state.getDevFests();
    this.devFestEventItems$ = this.state.getDevFestEventItems();
    this.devFestSpeakers$ = this.state.getDevFestSpeakers();
  }

  ngOnDestroy() {
    this.destroySubject$.next();
  }
}
