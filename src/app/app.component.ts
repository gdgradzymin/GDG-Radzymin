import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, RouterState, NavigationEnd } from '@angular/router';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { routerTransitionTrigger } from './main/animations/route-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransitionTrigger]
})
export class AppComponent {
  isHandsetPortrait$: Observable<boolean>;
  routerState: RouterState;
  routerSubscription: Subscription;
  url: string;

  constructor(
    private translate: TranslateService,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('en');
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use('en');

    this.isHandsetPortrait$ = this.breakpointObserver
      .observe(Breakpoints.HandsetPortrait)
      .pipe(map(result => result.matches));

    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.url = event.url;
      //  console.log('router url: ', this.url);
      });
  }

  getState(): string {
    if (this.url && this.url !== '/') {
      return this.url.substr(1);
    } else {
      return 'home';
    }
  }
}
