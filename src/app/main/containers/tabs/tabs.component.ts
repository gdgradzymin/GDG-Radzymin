import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy } from "@angular/core";
import { Subscription } from "rxjs";
import {
  trigger,
  style,
  state,
  transition,
  animate
} from "@angular/animations";
import { filter } from "rxjs/operators";
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: "app-tabs",
  templateUrl: "./tabs.component.html",
  styleUrls: ["./tabs.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger("tabsState", [
      state(
        "normal1",
        style({
          opacity: 1,
          transform: "translateY(0px)"
        })
      ),
      state(
        "hidden1",
        style({
          opacity: 1,
          transform: "translateY(-150px)"
        })
      ),
      transition("normal1 => hidden1", animate(300)),
      transition("hidden1 => normal1", animate(600))
    ])
  ]
})
export class TabsComponent implements OnInit, OnDestroy {
  activeLinkIndex = 0;
  routerSubscription: Subscription;
  tabsState = "normal1";
  @Input() activeLinkIdx;

  @Input() routerState: string;

  @Input() routeLinks: any[];

  constructor(private router: Router) {
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
    if (url.endsWith("devfest")) {
      this.activeLinkIndex = 4;
    } else if (url.endsWith("home")) {
      this.activeLinkIndex = 0;
    } else if (url.endsWith("events")) {
      this.activeLinkIndex = 1;
    } else if (url.endsWith("team")) {
      this.activeLinkIndex = 2;
    } else if (url.endsWith("blog") || url.startsWith("/blog/")) {
      this.activeLinkIndex = 3;
    } else {
      // this.activeLinkIndex = 0;
    }
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
