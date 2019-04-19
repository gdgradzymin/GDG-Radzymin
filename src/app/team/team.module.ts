import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamRoutingModule } from './team-routing.module';
import { TeamComponent } from './containers/team/team.component';
import { SharedModule } from '../shared/shared.module';
import { TeamMemberComponent } from './components/team-member/team-member.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [
    CommonModule,
    TeamRoutingModule,
    SharedModule,
    MaterialModule
  ],
  declarations: [TeamComponent, TeamMemberComponent]
})
export class TeamModule { }
