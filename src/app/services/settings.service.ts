import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, combineLatest, pipe, of } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { switchMap, mergeMap } from "rxjs/operators";

export enum Locales {
  PL = "pl",
  EN = "en-US"
}

export interface Lang {
  code: string;
  name: string;
  locale: string;
}

export interface LangMap {
  langNavigatorCode: string;
  locale: Locales;
}

export interface Metatags {
  desc: string;
  title: string;
  keywords: string;
}

@Injectable({
  providedIn: "root"
})
export class SettingsService {
  private readonly langs: Lang[] = [
    {
      code: "pl",
      name: "polish",
      locale: Locales.PL
    },
    {
      code: "en",
      name: "english",
      locale: Locales.EN
    }
  ];

  private readonly langsMap: LangMap[] = [
    {
      langNavigatorCode: "pl",
      locale: Locales.PL
    },
    {
      langNavigatorCode: "pl-pl",
      locale: Locales.PL
    },
    {
      langNavigatorCode: "en",
      locale: Locales.EN
    },
    {
      langNavigatorCode: "en-gb",
      locale: Locales.EN
    },
    {
      langNavigatorCode: "en-US",
      locale: Locales.EN
    }
  ];

  private lang$ = new BehaviorSubject<Lang>(this.langs[0]);

  private navTabsVisible$ = new BehaviorSubject<boolean>(true);
  private goBackBtnVisible$ = new BehaviorSubject<boolean>(false);
  private goBackTo$ = new BehaviorSubject<string>("home");
  private menuBtnVisible$ = new BehaviorSubject<boolean>(true);

  private url$ = new BehaviorSubject<string>("/");
  private urlState$ = new BehaviorSubject<string>("home");

  private readonly defaultLocale = Locales.EN;

  constructor(private translate: TranslateService) {}

  getLocale(): string {
    return this.lang$.value.locale;
  }

  getLangCode(): string {
    return this.lang$.value.code;
  }

  getLanguages(): Lang[] {
    return this.langs.slice();
  }

  setCurrentLangByLangCode(langCode: string): void {
    const l: Lang = this.langs.find(
      item => item.code === langCode.toLowerCase()
    );
    if (l) {
      this.lang$.next(l);
    }
  }

  setCurrentLangByNavigatorLang(
    langFromNavigator: string,
    langsArrayFromNavigator: string[]
  ): void {
    // first try to search using langFromNavigator
    if (langFromNavigator && langFromNavigator.length > 0) {
      const locale = this.searchLangsMap(langFromNavigator);
      if (locale) {
        this.setCurrentLangByLocale(locale);
        return;
      }
    }

    // if not found try with the langs array
    if (langsArrayFromNavigator && langsArrayFromNavigator.length > 0) {
      let itemFound = false;
      langsArrayFromNavigator.forEach((item: string) => {
        const locale = this.searchLangsMap(item);
        if (locale && !itemFound) {
          this.setCurrentLangByLocale(locale);
          itemFound = true;
        }
      });
      if (itemFound) {
        return;
      }
    }

    // if nothing was found set to default
    this.setCurrentLangByLocale(this.defaultLocale);
  }

  private searchLangsMap(l: string): string {
    // returns locale from langsMap
    let mapping: LangMap = null;
    mapping = this.langsMap.find(
      (item: LangMap) =>
        item.langNavigatorCode.toLowerCase() === l.toLowerCase()
    );

    if (mapping) {
      return mapping.locale;
    } else {
      return null;
    }
  }

  setCurrentLangByLocale(locale: string): void {
    const l: Lang = this.langs.find(item => item.locale === locale);
    if (l) {
      this.lang$.next(l);
    }
  }

  getLocaleByLangCode(langCode: string): string {
    const l: Lang = this.langs.find(
      item => item.code === langCode.toLowerCase()
    );
    if (l) {
      return l.locale;
    } else {
      return this.getLocale();
    }
  }

  getCurrentLang(): Observable<Lang> {
    return this.lang$.asObservable();
  }

  getNavTabsVisible(): Observable<boolean> {
    return this.navTabsVisible$.asObservable();
  }

  setNavTabsVisible(isVisible: boolean): void {
    this.navTabsVisible$.next(isVisible);
  }

  getGoBackBtnVisible(): Observable<boolean> {
    return this.goBackBtnVisible$.asObservable();
  }

  setGoBackBtnVisible(isVisible: boolean): void {
    this.goBackBtnVisible$.next(isVisible);
  }

  getGoBackTo(): Observable<string> {
    return this.goBackTo$.asObservable();
  }

  setGoBackTo(routeToGo: string): void {
    this.goBackTo$.next(routeToGo);
  }

  getMenuBtnVisible(): Observable<boolean> {
    return this.menuBtnVisible$.asObservable();
  }

  setMenuBtnVisible(isVisible: boolean): void {
    this.menuBtnVisible$.next(isVisible);
  }

  getUrl(): Observable<string> {
    return this.url$.asObservable();
  }

  setUrl(url: string): void {
    this.url$.next(url);
  }

  getUrlState(): Observable<string> {
    return this.urlState$.asObservable();
  }

  setUrlState(url: string) {
    this.urlState$.next(this.getState(url));
  }

  getUrlStateValue(): string {
    return this.urlState$.getValue();
  }

  private getState(url: string): string {
    if (url && url !== "/") {
      const blogPostRegex = /blog\/.+/;
      if (blogPostRegex.test(url)) {
        return "blog-post";
      }
      return url.substr(1);
    } else {
      return "home";
    }
  }

  resetNavigation(): void {
    this.goBackBtnVisible$.next(false);
    this.navTabsVisible$.next(true);
    this.goBackTo$.next("home");
    this.menuBtnVisible$.next(true);
  }

  getMetatags(path: string): Observable<Metatags> {
    const combined = combineLatest(
      this.translate.get(path.toLowerCase() + "pagedesc"),
      this.translate.get(path.toLowerCase() + "pagetitle"),
      this.translate.get(path.toLowerCase() + "pagekeywords")
    );

    return combined.pipe(
      switchMap((translations: string[]) => {
        return of({
          desc: translations[0],
          title: translations[1],
          keywords: translations[2]
        } as Metatags);
      })
    );
  }
}
