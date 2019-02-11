import { Component, OnInit, OnDestroy } from "@angular/core";
import { ContentfulService } from "../services/contentful.service";
import { GdgHomeContent } from "../models/gdg-home-content.model";
import { Observable, Subscription, Subject } from "rxjs";
import { SettingsService, Lang } from "../services/settings.service";
import { GdgContactInfo } from "../models/gdg-contact-info.model";
import { faMeetup } from "@fortawesome/fontawesome-free-brands";
import { TranslateService } from "@ngx-translate/core";
import { MetatagsService } from "../services/metatags.service";
import { takeUntil } from "rxjs/operators";

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
    this.settings
      .getCurrentLang()
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((lang: Lang) => {
        // it's time to change reload content
        this.translate
          .get("homepagedesc")
          .pipe(takeUntil(this.destroySubject$))
          .subscribe((desc: string) => {
            this.meta.updateMetaDesc(desc);
          });

        this.translate
          .get("homepagetitle")
          .pipe(takeUntil(this.destroySubject$))
          .subscribe((t: string) => {
            this.meta.updateTitle(t);
          });

        this.translate
          .get("homepagekeywords")
          .pipe(takeUntil(this.destroySubject$))
          .subscribe((k: string) => {
            this.meta.updateMetaKeywords(k);
          });

        this.loadHomeItems();
      });

    // this.contentful.logHomeContent();
    this.loadHomeItems();
    this.contactInfo$ = this.contentful.getContactInfo();
  }

  loadHomeItems() {
    this.homeItems$ = this.contentful.getHomeContent(100, true, true);
    // this.contentful.logHomeContent();
  }

  ngOnDestroy() {
    this.destroySubject$.next();
  }
}
