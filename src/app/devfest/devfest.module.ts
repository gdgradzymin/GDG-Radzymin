import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { MaterialModule } from "../material/material.module";
import { DevFestComponent } from "./containers/devfest/devfest.component";
import { DevfestDescComponent } from "./components/devfest-desc/devfest-desc.component";
import { DevfestShareComponent } from "./components/devfest-share/devfest-share.component";
import { TimerComponent } from "./components/timer/timer.component";
import { DevfestTitleComponent } from './components/devfest-title/devfest-title.component';
import { DevfestSpeakersComponent } from './components/devfest-speakers/devfest-speakers.component';
import { DevfestAgendaComponent } from './components/devfest-agenda/devfest-agenda.component';
import { DevfestPartnersComponent } from './components/devfest-partners/devfest-partners.component';
import { DevfestSpeakerComponent } from './components/devfest-speaker/devfest-speaker.component';
import { DevfestScheduleComponent } from './components/devfest-schedule/devfest-schedule.component';
import { DevfestScheduleItemComponent } from './components/devfest-schedule-item/devfest-schedule-item.component';


@NgModule({
  imports: [CommonModule, SharedModule, MaterialModule],
  exports: [],
  declarations: [DevFestComponent, DevfestDescComponent, DevfestShareComponent, TimerComponent, DevfestTitleComponent, DevfestSpeakersComponent, DevfestAgendaComponent, DevfestPartnersComponent, DevfestSpeakerComponent, DevfestScheduleComponent, DevfestScheduleItemComponent]
})
export class DevFestModule {}
