import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContentfulService } from '../../../services/contentful.service';
import { Observable, Subscription } from 'rxjs';
import { GdgTeamMember } from '../../../models/gdg-team-member.model';



@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit, OnDestroy {
  team$: Observable<GdgTeamMember[]>;
  team: GdgTeamMember[] = [];
  teamSub: Subscription;


  constructor(
    private contentful: ContentfulService
  ) {}

  ngOnInit() {
    this.contentful.logTeamMembers();
    this.team$ = this.contentful.getTeamMembers(100);
    this.team$.subscribe((team: any) => {
      this.team = team;
      console.log('team from sub: ', this.team);
    });
  }

  ngOnDestroy() {
    if (this.teamSub) {
      this.teamSub.unsubscribe();
    }
  }
}
