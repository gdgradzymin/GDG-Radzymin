import { Component, OnInit, OnDestroy } from "@angular/core";
import { ContentfulService } from "~/app/services/contentful.service";
import { SettingsService, Lang } from "~/app/services/settings.service";
import { MetatagsService } from "~/app/services/metatags.service";
import { TranslateService } from "@ngx-translate/core";
import { Observable, Subscription } from "rxjs";
import { GdgDevFest } from "~/app/models/gdg-devfest.model";
import { GdgContactInfo } from "~/app/models/gdg-contact-info.model";

@Component({
  selector: "app-devfest",
  templateUrl: "./devfest.component.html",
  styleUrls: ["./devfest.component.css"]
})
export class DevFestComponent implements OnInit, OnDestroy {

  devFests$: Observable<GdgDevFest[]>;
  contactInfo$: Observable<GdgContactInfo>;
  langSubscription: Subscription;
  pageDescSub: Subscription;
  pageTitleSub: Subscription;
  pageKeywordsSub: Subscription;
  urlState$: Observable<string>;


  constructor(
    private contentful: ContentfulService,
    private settings: SettingsService,
    private meta: MetatagsService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.langSubscription = this.settings
      .getCurrentLang()
      .subscribe((lang: Lang) => {
        // it's time to change reload content
        this.pageDescSub = this.translate
          .get("devfestpagedesc")
          .subscribe((desc: string) => {
            this.meta.updateMetaDesc(desc);
          });

        this.pageTitleSub = this.translate
          .get("devfestpagetitle")
          .subscribe((t: string) => {
            this.meta.updateTitle(t);
          });

        this.pageKeywordsSub = this.translate
          .get("devfestpagekeywords")
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
    // this.contentful.logHomeContent();
  }

  ngOnDestroy() {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }

    if (this.pageTitleSub) {
      this.pageTitleSub.unsubscribe();
    }

    if (this.pageKeywordsSub) {
      this.pageKeywordsSub.unsubscribe();
    }
  }

}
