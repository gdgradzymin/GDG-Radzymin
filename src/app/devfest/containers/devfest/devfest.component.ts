import { Component, OnInit, OnDestroy } from "@angular/core";
import { ContentfulService } from "../../../services/contentful.service";
import { SettingsService, Lang } from "../../../services/settings.service";
import { MetatagsService } from "../../../services/metatags.service";
import { TranslateService } from "@ngx-translate/core";
import { Observable, Subscription, Subject } from "rxjs";
import { GdgDevFest } from "../../../models/gdg-devfest.model";
import { GdgContactInfo } from "../../../models/gdg-contact-info.model";
import { GdgDevFestEventItem } from "../../../models/gdg-devfest-event-item.model";
import { GdgDevFestSpeaker } from "../../../models/gdg-devfest-speaker.model";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-devfest",
  templateUrl: "./devfest.component.html",
  styleUrls: ["./devfest.component.scss"]
})
export class DevFestComponent implements OnInit, OnDestroy {
  devFests$: Observable<GdgDevFest[]>;
  devFestEventItems$: Observable<Array<GdgDevFestEventItem>>;
  devFestSpeakers$: Observable<Array<GdgDevFestSpeaker>>;
  contactInfo$: Observable<GdgContactInfo>;

  urlState$: Observable<string>;
  destroySubject$: Subject<void> = new Subject();

  constructor(
    private contentful: ContentfulService,
    private settings: SettingsService,
    private meta: MetatagsService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.settings
      .getCurrentLang()
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((lang: Lang) => {
        // it's time to change reload content
        this.translate
          .get("devfestpagedesc")
          .pipe(takeUntil(this.destroySubject$))
          .subscribe((desc: string) => {
            this.meta.updateMetaDesc(desc);
          });

        this.translate
          .get("devfestpagetitle")
          .pipe(takeUntil(this.destroySubject$))
          .subscribe((t: string) => {
            this.meta.updateTitle(t);
          });

        this.translate
          .get("devfestpagekeywords")
          .pipe(takeUntil(this.destroySubject$))
          .subscribe((k: string) => {
            this.meta.updateMetaKeywords(k);
          });

        this.loadDevFests();
      });

    this.urlState$ = this.settings.getUrlState();
    // this.contentful.logHomeContent();
    this.loadDevFests();
    this.contactInfo$ = this.contentful.getContactInfo();
  }

  loadDevFests() {
    this.devFests$ = this.contentful.getDevFests(1, true, true);
    this.devFestEventItems$ = this.contentful.getGdgDevFestEventItems(100);
    this.devFestSpeakers$ = this.contentful.getGdgDevFestSpeakers(100);
    // this.contentful.logHomeContent();
  }

  ngOnDestroy() {
    this.destroySubject$.next();
  }
}
