import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from "@angular/core";
import { GdgHomeContent } from "../models/gdg-home-content.model";
import { Observable, Subject } from "rxjs";
import { SettingsService, Metatags } from "../services/settings.service";
import { GdgContactInfo } from "../models/gdg-contact-info.model";
import { faMeetup } from "@fortawesome/fontawesome-free-brands";
import { MetatagsService } from "../services/metatags.service";
import { takeUntil, switchMap, skip } from "rxjs/operators";
import { StateService } from "../services/state.service";
import { ActivatedRoute, Data } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
  homeItems$: Observable<GdgHomeContent[]>;
  contactInfo$: Observable<GdgContactInfo>;
  destroySubject$: Subject<void> = new Subject();

  faMeetup = faMeetup;

  constructor(
    private state: StateService,
    private settings: SettingsService,
    private meta: MetatagsService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.data
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((data: Data) => {
        this.meta.updateMetaDesc(data.metatags.desc);
        this.meta.updateTitle(data.metatags.title);
        this.meta.updateMetaKeywords(data.metatags.keywords);
      });

    this.settings
      .getCurrentLang()
      .pipe(
        takeUntil(this.destroySubject$),
        skip(1),
        switchMap(() => {
          return this.settings.getMetatags("home");
        })
      )
      .subscribe((metatags: Metatags) => {
        this.meta.updateMetaDesc(metatags.desc);
        this.meta.updateTitle(metatags.title);
        this.meta.updateMetaKeywords(metatags.keywords);
      });

      this.homeItems$ = this.state.getHomeItems();
      this.contactInfo$ = this.state.getContactInfo();
  }

  ngOnDestroy() {
    this.destroySubject$.next();
  }
}
