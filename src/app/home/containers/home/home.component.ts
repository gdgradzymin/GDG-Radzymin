import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContentfulService } from '../../../services/contentful.service';
import { GdgHomeContent } from '../../../models/gdg-home-content.model';
import { Observable, Subscription } from 'rxjs';
import { SettingsService, Lang } from '../../../services/settings.service';
import { GdgContactInfo } from '../../../models/gdg-contact-info.model';
import { faMeetup } from '@fortawesome/fontawesome-free-brands';
import { TranslateService } from '@ngx-translate/core';
import { MetatagsService } from '../../../services/metatags.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  homeItems$: Observable<GdgHomeContent[]>;
  contactInfo$: Observable<GdgContactInfo>;
  langSubscription: Subscription;
  pageDescSub: Subscription;
  pageTitleSub: Subscription;
  pageKeywordsSub: Subscription;

  faMeetup = faMeetup;

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
          .get('homepagedesc')
          .subscribe((desc: string) => {
            this.meta.updateMetaDesc(desc);
          });

        this.pageTitleSub = this.translate
          .get('homepagetitle')
          .subscribe((t: string) => {
            this.meta.updateTitle(t);
          });

        this.pageKeywordsSub = this.translate
          .get('homepagekeywords')
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
