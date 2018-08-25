import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContentfulService } from '../../../services/contentful.service';
import { Observable, Subscription } from 'rxjs';
import { GdgTeamMember } from '../../../models/gdg-team-member.model';
import { SettingsService, Lang } from '../../../services/settings.service';
import {
  trigger,
  transition,
  style,
  query,
  stagger,
  animate
} from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';
import { MetatagsService } from '../../../services/metatags.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', style({ opacity: 0, transform: 'translateX(-100%)' }), {
          optional: true
        }),
        query(
          ':enter',
          stagger('300ms', [
            animate(
              '800ms 200ms ease-out',
              style({ opacity: 1, transform: 'translateY(0)' })
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
  teamSub: Subscription;
  pageDescSub: Subscription;
  pageTitleSub: Subscription;
  pageKeywordsSub: Subscription;
  langSubscription: Subscription;

  constructor(
    private contentful: ContentfulService,
    private settings: SettingsService,
    private meta: MetatagsService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.langSubscription = this.settings
      .getCurrentLang()
      .subscribe((lang: Lang) => {
        // it's time to change reload content
        this.pageDescSub = this.translate
          .get('teampagedesc')
          .subscribe((desc: string) => {
            this.meta.updateMetaDesc(desc);
          });

        this.pageTitleSub = this.translate
          .get('teampagetitle')
          .subscribe((title: string) => {
            this.meta.updateTitle(title);
          });

        this.pageKeywordsSub = this.translate
          .get('teampagekeywords')
          .subscribe((k: string) => {
            this.meta.updateMetaKeywords(k);
          });
        this.loadTeamMembers();
      });
    this.contentful.logTeamMembers();
    this.loadTeamMembers();
    this.team$.subscribe((team: any) => {
      this.team = team;
      console.log('team from sub: ', this.team);
    });
  }

  loadTeamMembers(): void {
    this.team$ = this.contentful.getTeamMembers(100);
  }

  ngOnDestroy() {
    if (this.teamSub) {
      this.teamSub.unsubscribe();
    }
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }

    if (this.pageDescSub) {
      this.pageDescSub.unsubscribe();
    }

    if (this.pageTitleSub) {
      this.pageTitleSub.unsubscribe();
    }

    if (this.pageKeywordsSub) {
      this.pageKeywordsSub.unsubscribe();
    }
  }
}
