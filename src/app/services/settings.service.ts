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
    const l: Lang = this.langs.find(
      item => item.locale === locale
    );
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
}
