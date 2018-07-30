import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContentfulService } from '../../../services/contentful.service';
import { Observable, Subscription } from 'rxjs';
import { GdgTeamMember } from '../../../models/gdg-team-member.model';
import { SettingsService, Lang } from '../../../services/settings.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit, OnDestroy {
  team$: Observable<GdgTeamMember[]>;
  team: GdgTeamMember[] = [];
  teamSub: Subscription;
  langSubscription: Subscription;

  constructor(
    private contentful: ContentfulService,
    private settings: SettingsService
  ) {
    this.langSubscription = this.settings
      .getCurrentLang()
      .subscribe((lang: Lang) => {
        // it's time to change reload content
        this.loadTeamMembers();
      });
  }

  ngOnInit() {
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
  }
}
