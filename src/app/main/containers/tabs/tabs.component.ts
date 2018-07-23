import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  trigger,
  style,
  state,
  transition,
  animate
} from '@angular/animations';
import { filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  animations: [
    trigger('tabsState', [
      state(
        'normal1',
        style({
          opacity: 1,
          transform: 'translateY(0px)'
        })
      ),
      state(
        'hidden1',
        style({
          opacity: 1,
          transform: 'translateY(-150px)'
        })
      ),
      transition('normal1 => hidden1', animate(300)),
      transition('hidden1 => normal1', animate(600))
    ])
  ]
})
export class TabsComponent implements OnInit, OnDestroy {
  routeLinks: any[];
  activeLinkIndex = -1;
  routerSubscription: Subscription;
  tabsState = 'normal1';

  @Input() routerState: string;

  constructor( private router: Router) {
    this.routeLinks = [
      {
        icon: 'home',
        link: './',
        label: 'home',
        index: 0
      },
      {
        icon: 'event',
        link: './events',
        label: 'events',
        index: 1
      },
      {
        icon: 'supervised_user_circle',
        link: './team',
        label: 'team',
        index: 2
      },
      {
        icon: 'supervised_user_circle',
        link: './blog',
        label: 'blog',
        index: 3
      }
    ];
   }

  ngOnInit() {

    this.activeLinkIndex = 0;
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.activeLinkIndexResolver(event.url);
      });
  }

  onClick(i: number) {
    this.activeLinkIndex = i;
  }

  private activeLinkIndexResolver(url: string) {
    // console.log('activateLinkIndexResolver: ', url);
    // let onElement: any;
    if (url.endsWith('home')) {
      this.activeLinkIndex = 0;
      // if(this.renderer.selectRootElement('a#tab-link-0')){
      //   onElement = this.renderer.selectRootElement('a#tab-link-0');
      // }
    } else if (url.endsWith('events')) {
      this.activeLinkIndex = 1;
      // if(this.renderer.selectRootElement('a#tab-link-1')){
      //   onElement = this.renderer.selectRootElement('a#tab-link-1');
      // }
    } else if (url.endsWith('team')) {
      this.activeLinkIndex = 2;
      // if(this.renderer.selectRootElement('a#tab-link-2')){
      //   onElement = this.renderer.selectRootElement('a#tab-link-2');
      // }
    } else {
      this.activeLinkIndex = 0;
    }

    // if(onElement){
    //   setTimeout(() => onElement.focus(), 0);
    // }
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

}
