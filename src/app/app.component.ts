import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectorRef,
  AfterContentChecked,
  Inject
} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Router, RouterState, NavigationEnd } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { routerTransitionTrigger } from "./main/animations/route-animations";
import { SettingsService, Lang } from "./services/settings.service";
import { GdgContactInfo } from "./models/gdg-contact-info.model";
import { ContentfulService } from "./services/contentful.service";
import { Meta } from "@angular/platform-browser";
import { DOCUMENT } from "@angular/platform-browser";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [routerTransitionTrigger]
})
export class AppComponent implements OnInit, OnDestroy, AfterContentChecked {
  isHandsetPortrait$: Observable<boolean>;
  routerState: RouterState;
  routerSubscription: Subscription;
  langSubscription: Subscription;
  url$: Observable<string>;
  urlState$: Observable<string>;
  routeLinks: any[];
  activeLinkIndex = 0;
  langs: Lang[] = [];
  selectedLang: string;
  contactInfo$: Observable<GdgContactInfo>;

  navTabsVisible: boolean;
  menuBtnVisible: boolean;
  goBackBtnVisible: boolean;
  goBackTo: string;

  constructor(
    private translate: TranslateService,
    private router: Router,
    public settings: SettingsService,
    private contentful: ContentfulService,
    private cdRef: ChangeDetectorRef,
    private meta: Meta,
    @Inject(DOCUMENT) private _document: any
  ) {
    this.langs = this.settings.getLanguages();
    this.routeLinks = [
      {
        icon: "home",
        link: "./home",
        label: "home",
        index: 0,
        iconClass: { "icon-home": true }
      },
      {
        icon: "event",
        link: "./events",
        label: "events",
        index: 1,
        iconClass: { "icon-events": true }
      },
      {
        icon: "supervised_user_circle",
        link: "./team",
        label: "team",
        index: 2,
        iconClass: { "icon-team": true }
      },
      {
        icon: "chrome_reader_mode",
        link: "./blog",
        label: "blog",
        index: 3,
        iconClass: { "icon-blog": true }
      },
      {
        icon: "adb",
        link: "./devfest",
        label: "devfest",
        index: 0,
        iconClass: { "icon-adb": true }
      },
    ];

    this.meta.addTag({ name: "description", content: "GDG Radzymin" });
    this.meta.addTag({
      name: "keywords",
      content: "GDG, Radzymin, Google Developers Group"
    });
    this.meta.addTag({ name: "author", content: "Sebastian Denis" });
  }

  ngOnInit() {
    const userLang = navigator.language;
    const userLangs = navigator.languages;
    this.settings.setCurrentLangByNavigatorLang(userLang, userLangs.slice());
    this.url$ = this.settings.getUrl();
    this.urlState$ = this.settings.getUrlState();

    this.langSubscription = this.settings
      .getCurrentLang()
      .subscribe((lang: Lang) => {
        // this language will be used as a fallback when a translation isn't found in the current language
        this.translate.setDefaultLang(lang.code);
        // the lang to use, if the lang isn't available, it will use the current loader to get them
        this.translate.use(lang.code);
        this.selectedLang = lang.code;
        this._document.documentElement.lang = lang.code;
      });

    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // this.url = event.url;
        this.settings.setUrl(event.url);
        this.settings.setUrlState(event.url);
        this.activeLinkIndexResolver(event.url);
      });

    this.contactInfo$ = this.contentful.getContactInfo();
  }

  ngAfterContentChecked() {
    this.settings.getNavTabsVisible().subscribe((data: boolean) => {
      this.navTabsVisible = data;
    });

    this.settings.getGoBackBtnVisible().subscribe((data: boolean) => {
      this.goBackBtnVisible = data;
    });

    this.settings.getMenuBtnVisible().subscribe((data: boolean) => {
      this.menuBtnVisible = data;
    });

    this.settings.getGoBackTo().subscribe((data: string) => {
      this.goBackTo = data;
    });
    this.cdRef.detectChanges();
  }

  onRadzyminLogoClick() {
    this.router.navigateByUrl("/home");
  }

  // getState(): string {
  //   if (this.url && this.url !== '/') {
  //     const blogPostRegex = /blog\/.+/;
  //     if (blogPostRegex.test(this.url)) {
  //       return 'blog-post';
  //     }
  //     return this.url.substr(1);
  //   } else {
  //     return 'home';
  //   }
  // }

  swipeLeft() {
    this.swipeResolver("left");
  }

  swipedRight() {
    this.swipeResolver("right");
  }

  private swipeResolver(type: string) {
    const blogPostRegex = /blog\/.+/;
    const url = this.router.routerState.snapshot.url;
    if (type === "left") {
      if (url.endsWith("home")) {
        this.router.navigateByUrl("/events");
      } else if (url.endsWith("events")) {
        this.router.navigateByUrl("/team");
      } else if (url.endsWith("team")) {
        this.router.navigateByUrl("/blog");
      }  else if (url.endsWith("blog")) {
        this.router.navigateByUrl("/devfest");
      } else if (blogPostRegex.test(url)) {
        // do nothing
        return;
      } else if (url.endsWith("devfest")) {
        this.router.navigateByUrl("/home");
      } else {
        // from home
        this.router.navigateByUrl("/events");
      }
    } else {
      // swipe right
      if (url.endsWith("home")) {
        this.router.navigateByUrl("/devfest");
      } else if (url.endsWith("events")) {
        this.router.navigateByUrl("/home");
      } else if (url.endsWith("team")) {
        this.router.navigateByUrl("/events");
      } else if (blogPostRegex.test(url)) {
        // do nothing
        return;
      } else if (url.endsWith("blog")) {
        this.router.navigateByUrl("/team");
      } else if (url.endsWith("devfest")) {
        this.router.navigateByUrl("/blog");
      } else {
        this.router.navigateByUrl("/devfest");
      }
    }
  }

  onLangChange(select: any) {
    select.close();
    this.settings.setCurrentLangByLangCode(this.selectedLang);
  }

  private activeLinkIndexResolver(url: string) {
    if (url.endsWith("home")) {
      this.activeLinkIndex = 0;
    } else if (url.endsWith("events")) {
      this.activeLinkIndex = 1;
    } else if (url.endsWith("team")) {
      this.activeLinkIndex = 2;
    } else if (url.endsWith("blog")) {
      this.activeLinkIndex = 3;
    } else if (url.endsWith("devfest")) {
      this.activeLinkIndex = 4;
    } else {
      this.activeLinkIndex = 0;
    }
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }
}
