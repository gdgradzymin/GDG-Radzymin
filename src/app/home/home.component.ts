import { Component, OnInit, OnDestroy } from "@angular/core";
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
  concatMap,
  merge,
  mergeMap,
  switchMap,
  concat,
  withLatestFrom
} from "rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit, OnDestroy {
  homeItems$: Observable<GdgHomeContent[]>;
  contactInfo$: Observable<GdgContactInfo>;
  destroySubject$: Subject<void> = new Subject();

  faMeetup = faMeetup;

  constructor(
    private contentful: ContentfulService,
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
        this.loadHomeItems();
        this.contactInfo$ = this.contentful.getContactInfo();
      });
  }

  loadHomeItems() {
    this.homeItems$ = this.contentful.getHomeContent(100, true, true);
    // this.contentful.logHomeContent();
  }

  ngOnDestroy() {
    this.destroySubject$.next();
  }
}
