import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from "@angular/core";
import { SettingsService } from "../../../services/settings.service";
import { MetatagsService } from "../../../services/metatags.service";
import { TranslateService } from "@ngx-translate/core";
import { Observable, Subject, combineLatest } from "rxjs";
import { GdgDevFest } from "../../../models/gdg-devfest.model";
import { GdgContactInfo } from "../../../models/gdg-contact-info.model";
import { GdgDevFestEventItem } from "../../../models/gdg-devfest-event-item.model";
import { GdgDevFestSpeaker } from "../../../models/gdg-devfest-speaker.model";
import { takeUntil, mergeMap } from "rxjs/operators";
import { StateService } from "~/app/services/state.service";

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
              .get("devfestpagedesc")
              .pipe(takeUntil(this.destroySubject$)),
            this.translate
              .get("devfestpagetitle")
              .pipe(takeUntil(this.destroySubject$)),
            this.translate
              .get("devfestpagekeywords")
              .pipe(takeUntil(this.destroySubject$))
          );
        })
      )
      .subscribe((translations: Array<string>) => {
        this.meta.updateMetaDesc(translations[0]);
        this.meta.updateTitle(translations[1]);
        this.meta.updateMetaKeywords(translations[2]);
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
