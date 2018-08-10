import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Lang {
  code: string;
  name: string;
  locale: string;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private readonly langs: Lang[] = [
    {
      code: 'pl',
      name: 'polish',
      locale: 'pl'
    },
    {
      code: 'en',
      name: 'english',
      locale: 'en-US'
    }
  ];

  private lang$ = new BehaviorSubject<Lang>(this.langs[0]);

  private navTabsVisible$ = new BehaviorSubject<boolean>(true);
  private goBackBtnVisible$ = new BehaviorSubject<boolean>(false);
  private goBackTo$ = new BehaviorSubject<string>('home');
  private menuBtnVisible$ = new BehaviorSubject<boolean>(true);

  private url$ = new BehaviorSubject<string>('/');
  private urlState$ = new BehaviorSubject<string>('home');

  constructor() {}

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
    if (url && url !== '/') {
      const blogPostRegex = /blog\/.+/;
      if (blogPostRegex.test(url)) {
        return 'blog-post';
      }
      return url.substr(1);
    } else {
      return 'home';
    }
  }

  resetNavigation(): void {
    this.goBackBtnVisible$.next(false);
    this.navTabsVisible$.next(true);
    this.goBackTo$.next('home');
    this.menuBtnVisible$.next(true);
  }
}
