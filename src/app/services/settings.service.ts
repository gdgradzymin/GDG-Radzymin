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

  getLanguages(): Lang[] {
    return this.langs.slice();
  }

  setCurrentLang(langCode: string): void {
    const l: Lang = this.langs.find(
      item => item.code === langCode.toLowerCase()
    );
    if (l) {
      this.lang$.next(l);
    }
  }

  getCurrentLang(): Observable<Lang> {
    return this.lang$.asObservable();
  }
}
