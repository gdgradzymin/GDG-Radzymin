import { Component, OnInit, OnDestroy } from "@angular/core";
import { ContentfulService } from "../../../services/contentful.service";
import { Observable, Subscription, Subject } from "rxjs";
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
import { takeUntil } from "rxjs/operators";

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
  team: GdgTeamMember[] = [];
  destroySubject$: Subject<void> = new Subject();

  constructor(
    private contentful: ContentfulService,
    private settings: SettingsService,
    private meta: MetatagsService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.settings
      .getCurrentLang()
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((lang: Lang) => {
        // it's time to change reload content
        this.translate
          .get("teampagedesc")
          .pipe(takeUntil(this.destroySubject$))
          .subscribe((desc: string) => {
            this.meta.updateMetaDesc(desc);
          });

        this.translate
          .get("teampagetitle")
          .pipe(takeUntil(this.destroySubject$))
          .subscribe((title: string) => {
            this.meta.updateTitle(title);
          });

        this.translate
          .get("teampagekeywords")
          .pipe(takeUntil(this.destroySubject$))
          .subscribe((k: string) => {
            this.meta.updateMetaKeywords(k);
          });
        this.loadTeamMembers();
      });
    // this.contentful.logTeamMembers();
    this.loadTeamMembers();
    this.team$.subscribe((team: any) => {
      this.team = team;
    });
  }

  loadTeamMembers(): void {
    this.team$ = this.contentful.getTeamMembers(100);
  }

  ngOnDestroy() {
    this.destroySubject$.next();
  }
}
