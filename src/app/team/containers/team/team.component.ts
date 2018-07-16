import { Component, OnInit } from '@angular/core';
import { ContentfulService } from '../../../services/contentful.service';
import { Observable } from 'rxjs';
import { GdgTeamMember } from '../../../models/gdg-team-member.model';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  team$: Observable<GdgTeamMember[]>;
  team: GdgTeamMember[] = [];

  constructor(private contentful: ContentfulService ) { }

  ngOnInit() {
    this.contentful.logTeamMembers();
    this.team$ = this.contentful.getTeamMembers(100);
    this.team$
    .subscribe((team: any) => {
      this.team = team;
      console.log('team from sub: ', this.team);
    });
  }

}
