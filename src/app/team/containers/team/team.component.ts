import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from "@angular/core";
import { Observable, Subject } from "rxjs";
import { GdgTeamMember } from "../../../models/gdg-team-member.model";
import { SettingsService, Metatags } from "../../../services/settings.service";
import {
  trigger,
  transition,
  style,
  query,
  stagger,
  animate
} from "@angular/animations";
import { MetatagsService } from "../../../services/metatags.service";
import { takeUntil, switchMap } from "rxjs/operators";
import { StateService } from "~/app/services/state.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-team",
  templateUrl: "./team.component.html",
  styleUrls: ["./team.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    private state: StateService,
    private settings: SettingsService,
    private meta: MetatagsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((metatags: Metatags) => {
        this.meta.updateMetaDesc(metatags.desc);
        this.meta.updateTitle(metatags.title);
        this.meta.updateMetaKeywords(metatags.keywords);
      });

    this.settings
      .getCurrentLang()
      .pipe(
        takeUntil(this.destroySubject$),
        switchMap(() => {
          return this.settings.getMetatags("team");
        })
      )
      .subscribe((metatags: Metatags) => {
        this.meta.updateMetaDesc(metatags.desc);
        this.meta.updateTitle(metatags.title);
        this.meta.updateMetaKeywords(metatags.keywords);
      });
    this.team$ = this.state.getTeamMembers();
  }

  ngOnDestroy() {
    this.destroySubject$.next();
  }
}
