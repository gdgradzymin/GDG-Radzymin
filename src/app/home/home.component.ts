import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from "@angular/core";
import { ContentfulService } from "../services/contentful.service";
import { GdgHomeContent } from "../models/gdg-home-content.model";
import { Observable, Subscription, Subject, forkJoin } from "rxjs";
import { SettingsService, Lang } from "../services/settings.service";
import { GdgContactInfo } from "../models/gdg-contact-info.model";
import { faMeetup } from "@fortawesome/fontawesome-free-brands";
import { TranslateService } from "@ngx-translate/core";
import { MetatagsService } from "../services/metatags.service";
import { combineLatest } from "rxjs";
import {
  takeUntil,
  mergeMap,
} from "rxjs/operators";
import { StateService } from "../services/state.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
  homeItems$: Observable<GdgHomeContent[]>;
  contactInfo$: Observable<GdgContactInfo>;
  destroySubject$: Subject<void> = new Subject();

  faMeetup = faMeetup;

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
              .get("homepagedesc")
              .pipe(takeUntil(this.destroySubject$)),
            this.translate
              .get("homepagetitle")
              .pipe(takeUntil(this.destroySubject$)),
            this.translate
              .get("homepagekeywords")
              .pipe(takeUntil(this.destroySubject$))
          );
        })
      )
      .subscribe((translations: Array<string>) => {
        this.meta.updateMetaDesc(translations[0]);
        this.meta.updateTitle(translations[1]);
        this.meta.updateMetaKeywords(translations[2]);
        this.homeItems$ = this.state.getHomeItems();
        this.contactInfo$ = this.state.getContactInfo();
      });
  }

  ngOnDestroy() {
    this.destroySubject$.next();
  }
}
