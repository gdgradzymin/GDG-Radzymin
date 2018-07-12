import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamRoutingModule } from './team-routing.module';
import { TeamComponent } from './containers/team/team.component';

@NgModule({
  imports: [
    CommonModule,
    TeamRoutingModule
  ],
  declarations: [TeamComponent]
})
export class TeamModule { }
