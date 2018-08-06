import { Component, OnInit, Input } from '@angular/core';
import { GdgTeamMember } from '../../../models/gdg-team-member.model';

@Component({
  selector: 'app-author-card',
  templateUrl: './author-card.component.html',
  styleUrls: ['./author-card.component.scss']
})
export class AuthorCardComponent implements OnInit {

  @Input() author: GdgTeamMember;

  constructor() { }

  ngOnInit() {
  }

}
