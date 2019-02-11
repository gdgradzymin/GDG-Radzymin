import { Component, OnInit, OnDestroy } from "@angular/core";
import { ContentfulService } from "../../../services/contentful.service";
import { Observable, Subscription, Subject, combineLatest } from "rxjs";
import { GdgTeamMember } from "../../../models/gdg-team-member.model";
import { SettingsService, Lang } from "../../../services/settings.service";
import {
  trigger,
  transition,
  style,
  query,
  stagger,
  animate
} from "@angular/animations";
import { TranslateService } from "@ngx-translate/core";
import { MetatagsService } from "../../../services/metatags.service";
import { takeUntil, mergeMap } from "rxjs/operators";

@Component({
  selector: "app-team",
  templateUrl: "./team.component.html",
  styleUrls: ["./team.component.scss"],
  animations: [
    trigger("listAnimation", [
      transition("* => *", [
        query(":enter", style({ opacity: 0, transform: "translateX(-100%)" }), {
          optional: true
        }),
        query(
          ":enter",
          stagger("300ms", [
            animate(
              "800ms 200ms ease-out",
              style({ opacity: 1, transform: "translateY(0)" })
            )
          ]),
          { optional: true }
        )
      ])
    ])
  ]
})
export class TeamComponent implements OnInit, OnDestroy {
  team$: Observable<GdgTeamMember[]>;
  destroySubject$: Subject<void> = new Subject();

  constructor(
    private contentful: ContentfulService,
    private settings: SettingsService,
    private meta: MetatagsService,
    private translate: TranslateService
  ) {}

  ngOnInit() {

    const currentLang$ = this.settings
    .getCurrentLang()
    .pipe(takeUntil(this.destroySubject$));

  currentLang$
    .pipe(
      takeUntil(this.destroySubject$),
      mergeMap(() => {
        return combineLatest(
          this.translate
            .get("teampagedesc")
            .pipe(takeUntil(this.destroySubject$)),
          this.translate
            .get("teampagetitle")
            .pipe(takeUntil(this.destroySubject$)),
          this.translate
            .get("teampagekeywords")
            .pipe(takeUntil(this.destroySubject$))
        );
      })
    )
    .subscribe((translations: Array<string>) => {
      this.meta.updateMetaDesc(translations[0]);
      this.meta.updateTitle(translations[1]);
      this.meta.updateMetaKeywords(translations[2]);
      this.loadTeamMembers();
    });

  }

  loadTeamMembers(): void {
    this.team$ = this.contentful.getTeamMembers(100);
  }

  ngOnDestroy() {
    this.destroySubject$.next();
  }
}
